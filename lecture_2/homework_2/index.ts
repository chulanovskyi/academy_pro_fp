import * as R from 'ramda';

interface IMatrixItem {
  id: number;
  position: number;
  column: number;
  row: number;
}

type Matrix = IMatrixItem[][];

const mapIndexed = R.addIndex(R.map);
const forEachIndexed = R.addIndex(R.forEach);
const getNumberRoot = (n: number) => Math.pow(n, 1 / 2);

const countMatrixItems = (size: number) => size ** 2;

const generateNumbers = (count: number) => R.times(R.identity, count);

const numbersToChunks = (nums: number[]) => R.splitEvery(getNumberRoot(nums.length), nums);

const numbersToItems = (matrix: number[][]) =>
  mapIndexed(
    (col: number[], colIdx: number) =>
      mapIndexed(
        (item: number, itemIdx: number) => ({
          id: item,
          position: item + 1,
          column: colIdx,
          row: itemIdx
        }),
        col
      ),
    matrix
  ) as Matrix;

const rearrangeMatrix = (matrix, newCol, newRow, item) => console.log('ok');
/* --- */

const printMatrix = (matrix: Matrix) => {
  const separator = ' | ';
  const outSeparator = (content: string) => `| ${content} |`;
  const joinWithSeparator = (content: any[]) => content.join(separator);

  const columnsToRows = mapIndexed(
    (col: IMatrixItem[], colIdx) => mapIndexed((item, itemIdx) => matrix[itemIdx][colIdx], col),
    matrix
  );

  console.log(columnsToRows);
};

// go
const createSquareMatrix = R.pipe(
  countMatrixItems,
  generateNumbers,
  numbersToChunks,
  numbersToItems
);
const squareMatrix = createSquareMatrix(3);
printMatrix(squareMatrix);
