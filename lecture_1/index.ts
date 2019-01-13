const input = [
  { name: 'TV', price: 300, date: '2018-10-10' },
  { name: 'laptop', price: 600, date: '2018-10-12' },
  { name: 'PC', price: 800, date: '2018-09-05' },
  { name: 'owen', price: 300 },
  { name: 'Camera', price: 500, date: '2018-03-03' },
  { name: 'Fridge', price: 1000, date: '2018-12-11' },
  { name: 'table', price: 150, date: '2018-12-10' },
  { name: 'Sofa', price: 400, date: '2018-12-10' },
  { name: 'chair', date: '2018-09-10' },
  { name: 'Window', price: 300, date: '2018-05-05' }
];

interface IOrder {
  name?: string;
  price?: string | number;
  date?: string;
}

interface IOrders {
  orders: IOrder[];
}

interface IOrdersTable {
  orders: {
    [date: string]: IOrder[];
  };
}

interface ICapitalizeField {
  object: object;
  field: string;
}

interface Array<T> {
  fill(value: T): Array<T>;
}

const isNoEmptyFields = (order: IOrder) => !!(order.name && order.price && order.date);
const getDateValue = (date: string) => new Date(date).valueOf();

const capitalize = (name: string = '') => name.charAt(0).toUpperCase() + name.slice(1);
const capitalizeFieldValue = ({ object, field }: ICapitalizeField) => {
  const newObj = { ...object };
  newObj[field] = capitalize(object[field]);
  return newObj;
};

const capitalizeOrderNames = ({ orders }: IOrders) =>
  orders && orders.map(object => capitalizeFieldValue({ object, field: 'name' }));

const validate = ({ orders }: IOrders) =>
  orders.reduce(
    (result, order) => {
      isNoEmptyFields(order) ? result.valid.push(order) : result.invalid.push(order);
      return result;
    },
    { valid: [], invalid: [] }
  );

const sortOrdersByDate = ({ orders }: IOrders) => {
  const sorted = [...orders].sort((a, b) => getDateValue(a.date) - getDateValue(b.date));
  return { orders, sorted };
};

const formatOrdersPrice = ({ orders }: IOrders) =>
  orders.reduce(
    (result, order) => {
      const newObj = { ...order };
      newObj.price = `$${order.price}`;
      result.formatted.push(newObj);
      return result;
    },
    { orders, formatted: [] }
  );

const combineOrdersByDate = ({ orders }: IOrders) =>
  orders.reduce(
    (result, order) => {
      result.combined[order.date]
        ? result.combined[order.date].push(order)
        : (result.combined[order.date] = [order]);
      return result;
    },
    { orders, combined: {} }
  );

const getMaxRows = ({ orders }: IOrdersTable) =>
  Math.max(...Object.keys(orders).map(date => orders[date].length));

const getNameAndPrice = (order: IOrder) => `${order.name} - ${order.price}`;

const printTable = ({ orders }: IOrdersTable) => {
  const separator = ' | ';
  const emptyCell = '---';
  const outSeparator = (content: string) => `| ${content} |`;
  const joinWithSeparator = content => content.join(separator);

  const maxRows = getMaxRows({ orders });
  const iterator = [...Array(maxRows)].fill(null);
  const resultTable = Object.keys(orders).reduce(
    (table, date) => {
      const purchases = orders[date];
      table.headers.push(date);
      table.separators.push(emptyCell);
      iterator.map((_, row) => {
        const order = purchases[row];
        const nameAndPrice = order ? getNameAndPrice(order) : emptyCell;
        table.rows[row] ? table.rows[row].push(nameAndPrice) : (table.rows[row] = [nameAndPrice]);
      });
      return table;
    },
    { headers: [], separators: [], rows: [] }
  );
  console.log('## Output\n');
  console.log(outSeparator(joinWithSeparator(resultTable.headers)));
  console.log(outSeparator(joinWithSeparator(resultTable.separators)));
  resultTable.rows.map(row => console.log(outSeparator(joinWithSeparator(row))));
  console.log();
};

const printIncorrect = ({ orders }: IOrders) => {
  console.log('### Incorrect rows\n');
  orders.map(order => console.log(`${JSON.stringify(order)},`));
};

const validated = validate({ orders: input });
const sorted = sortOrdersByDate({ orders: validated.valid });
const formatPrice = formatOrdersPrice({ orders: sorted.sorted });
const capitalized = capitalizeOrderNames({ orders: formatPrice.formatted });
const combined = combineOrdersByDate({ orders: capitalized });
printTable({ orders: combined.combined });
printIncorrect({ orders: validated.invalid });
