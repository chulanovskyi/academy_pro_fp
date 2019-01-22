(function() {
  const rootNode = document.getElementById('root');

  const createTag = tag => document.createElement(tag);
  const appendToNode = (node, item) => node.appendChild(item);
  const applyStyle = node => (v, k) => (node.style[k] = v);

  const createDiv = styles => {
    const div = createTag('div');
    R.forEachObjIndexed(applyStyle(div), styles);
    return div;
  };

  const createInputWithLabel = (label, inputName) => {
    const labelNode = createTag('label');
    const inputNode = createTag('input');

    labelNode.setAttribute('for', inputName);
    labelNode.style.margin = '5px';
    labelNode.innerText = label;

    inputNode.setAttribute('name', inputName);
    inputNode.setAttribute('id', inputName);
    labelNode.appendChild(inputNode);

    return labelNode;
  };

  const createButton = (title, onClick) => {
    const buttonNode = createTag('button');
    buttonNode.innerText = title;
    buttonNode.addEventListener('click', onClick);
    buttonNode.style.width = 'fit-content';
    return buttonNode;
  };

  const colInput = createInputWithLabel('New column:', 'col');
  const rowInput = createInputWithLabel('New row:', 'row');
  const itemInput = createInputWithLabel('Item id:', 'item');
  const confirmButton = createButton('Rearrange', () => rearrangeMatrix());

  const controlsContainer = createDiv({
    display: 'flex',
    flexDirection: 'column'
  });

  appendToNode(controlsContainer, colInput);
  appendToNode(controlsContainer, rowInput);
  appendToNode(controlsContainer, itemInput);
  appendToNode(controlsContainer, confirmButton);
  appendToNode(rootNode, controlsContainer);

  const tableContainer = createDiv();

  const tableNode = createTag('table');

  appendToNode(tableContainer, tableNode);
  appendToNode(rootNode, tableContainer);

  /* matrix helpers */
  const mapIndexed = R.addIndex(R.map);
  const getNumberRoot = num => Math.pow(num, 1 / 2);

  const countMatrixItems = size => size ** 2;

  const generateNumbers = count => R.times(R.identity, count);

  const numbersToChunks = nums => R.splitEvery(getNumberRoot(nums.length), nums);

  const numbersToItems = squareMatrix =>
    mapIndexed(
      (col, colIdx) =>
        mapIndexed(
          (item, itemIdx) => ({
            id: item,
            position: item + 1,
            column: colIdx,
            row: itemIdx
          }),
          col
        ),
      squareMatrix
    );

  const rearrangeMatrix = (matrix, newCol, newRow, item) => console.log('ok');
  /* --- */

  const fillTable = (table, matrix) => {};

  // public static void main
  const createSquareMatrix = R.pipe(
    countMatrixItems,
    generateNumbers,
    numbersToChunks,
    numbersToItems
  );
  const squareMatrix = createSquareMatrix(3);
  // ---
})();
