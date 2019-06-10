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

interface IGroupedBy {
  [date: string]: IOrder[];
}

interface IGroupByField {
  (orders: IOrder[], field: string): IGroupedBy;
}

interface ICapitalizeField {
  (object: object, field: string): object;
}

interface Array<T> {
  fill(value: T): Array<T>;
}

interface IPrintTable {
  (table: { headers: string[]; separators: string[]; rows: Array<string[]> }): void;
}

const isNoEmptyFields = (order: IOrder) => !!(order.name && order.price && order.date);

const getDateValue = (date: string) => new Date(date).valueOf();

const capitalize = (name: string = '') => name.charAt(0).toUpperCase() + name.slice(1);

const capitalizeFieldValue: ICapitalizeField = (object, field) => ({
  ...object,
  [field]: capitalize(object[field])
});

const capitalizeOrderNames = (orders: IOrder[]) =>
  orders.map(order => capitalizeFieldValue(order, 'name'));

const validate = (orders: IOrder[]) =>
  orders.reduce(
    (result, order) =>
      isNoEmptyFields(order)
        ? { ...result, valid: [...result.valid, order] }
        : { ...result, invalid: [...result.invalid, order] },
    { valid: [], invalid: [] }
  );

const sortOrdersByDate = (orders: IOrder[]) =>
  [...orders].sort((a, b) => getDateValue(a.date) - getDateValue(b.date));

const formatOrdersPrice = (orders: IOrder[]) =>
  orders.map(order => ({
    ...order,
    price: `$${order.price}`
  }));

const groupByField: IGroupByField = (orders: IOrder[], by: string) =>
  orders.reduce(
    (result, order) => ({
      ...result,
      [order[by]]: result[order[by]] ? [...result[order[by]], order] : [order]
    }),
    {} as IGroupedBy
  );

const getMaxRows = (orders: IGroupedBy) =>
  Math.max(...Object.keys(orders).map(date => orders[date].length));

const getNameAndPrice = (order: IOrder) => `${order.name} - ${order.price}`;

const ordersToTable = (orders: IGroupedBy) => {
  const emptyCell = '---';
  const maxRows = getMaxRows(orders);
  const iterator = [...Array(maxRows).fill(0)];
  return Object.keys(orders).reduce(
    (table, date) => ({
      headers: [...table.headers, date],
      separators: [...table.separators, emptyCell],
      rows: iterator.map((_, i) => {
        const order = orders[date][i];
        const nameAndPrice = order ? getNameAndPrice(order) : emptyCell;
        const row = table.rows[i];
        return row ? [...row, nameAndPrice] : [nameAndPrice];
      })
    }),
    { headers: [], separators: [], rows: [] }
  );
};

const printTable: IPrintTable = ({ headers, separators, rows }) => {
  const separator = ' | ';
  const outSeparator = (content: string) => `| ${content} |`;
  const joinWithSeparator = content => content.join(separator);

  console.log('## Output\n');
  console.log(outSeparator(joinWithSeparator(headers)));
  console.log(outSeparator(joinWithSeparator(separators)));
  rows.forEach(row => console.log(outSeparator(joinWithSeparator(row))));
  console.log();
};

const printIncorrect = (orders: IOrder[]) => {
  console.log('### Incorrect rows\n');
  orders.forEach(order => console.log(`${JSON.stringify(order)},`));
};

const validated = validate(input);
const sorted = sortOrdersByDate(validated.valid);
const formatPrice = formatOrdersPrice(sorted);
const capitalized = capitalizeOrderNames(formatPrice);
const groupedByDate = groupByField(capitalized, 'date');
const ordersTable = ordersToTable(groupedByDate);

printTable(ordersTable);
printIncorrect(validated.invalid);
