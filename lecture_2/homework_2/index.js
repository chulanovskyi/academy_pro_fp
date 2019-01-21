(function() {
  const rootNode = document.getElementById('root');

  /* matrix helpers */
  const mapIndexed = R.addIndex(R.map);

  const countMatrixItems = size => size ** 2;

  const generateNumbers = count => R.times(R.identity, count);

  const numbersToChunks = (nums, chunkSize) => R.splitEvery(chunkSize, nums);

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

  const createMatrix = size =>
    R.pipe(
      countMatrixItems,
      generateNumbers,
      nums => numbersToChunks(nums, size),
      numbersToItems
    );

  const rearrangeMatrix = (table, newCol, newRow, tile) => null;
  /* --- */
  const m = createMatrix(3)(3);
  console.log(m);
})();
