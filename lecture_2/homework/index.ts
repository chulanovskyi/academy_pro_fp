import * as R from 'ramda';
import { IMatrixItem, Matrix } from './models';

console.clear();

const mapIndexed = R.addIndex(R.map);

const getSquareRoot = (n: number): number => Math.pow(n, 1 / 2);

const countMatrixItems = (size: number): number => size ** 2;

const generateNumbers = (count: number): number[] => R.times(R.identity, count);

const numbersToChunks = (nums: number[]): number[][] =>
  R.splitEvery(getSquareRoot(nums.length), nums);

const numbersToItems = (matrix: number[][]) =>
  mapIndexed(
    (row: number[], rowIdx: number) =>
      mapIndexed(
        (item: number, itemIdx: number) => ({
          id: item,
          position: item + 1,
          column: rowIdx,
          row: itemIdx
        }),
        row
      ),
    matrix
  ) as Matrix;

const correctItemsMeta = (matrix: Matrix) =>
  mapIndexed(
    (row: IMatrixItem[], rowIdx: number) =>
      mapIndexed(
        (item: IMatrixItem, itemIdx: number) => ({
          id: item.id,
          row: itemIdx,
          column: rowIdx,
          position: item.position
        }),
        row
      ),
    matrix
  ) as Matrix;

const rearrangeMatrix = (matrix: Matrix, newCol: number, newRow: number, item: IMatrixItem) => {
  // Item lens, mutates original
  const rowLens = R.lensIndex(newRow);
  const colLens = R.lensIndex(newCol);
  const targetPosition =
    R.view<number, IMatrixItem>(colLens, R.view<Matrix, number>(rowLens, matrix)).position - 1; // adjust real position
  // <<<---

  const flat = R.flatten<IMatrixItem>(matrix);
  const withoutItem = R.without<IMatrixItem>([item], flat);
  const deployItem = R.insert<IMatrixItem>(targetPosition, item, withoutItem);
  const resetPosition = mapIndexed(
    (item: IMatrixItem, idx) => ({ ...item, position: idx + 1 }),
    deployItem
  );
  const newMatrix = R.splitEvery(3, resetPosition) as Matrix;
  return correctItemsMeta(newMatrix);
};

// for printing
const mapIds = (matrix: Matrix) => R.map(row => R.map(item => `id: ${item.id}`, row), matrix);

const printMatrix = (matrix: Matrix) => {
  const separator = ' | ';
  const joinWithSeparator = (content: string[], s: string = separator) => content.join(s);
  const singleRows = R.map(joinWithSeparator, R.transpose(mapIds(matrix)));

  R.forEach(console.log, singleRows);
  console.log('___');
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

const newColumn = 2;
const newRow = 2;
const item = squareMatrix[0][0];

const newMatrix = rearrangeMatrix(squareMatrix, newColumn, newRow, item);

printMatrix(newMatrix);
