import * as R from 'ramda';
import { ITile, Matrix } from 'models';

const mapIndexed = R.addIndex(R.map);

const countMatrixItems = R.curry((size: number) => size ** 2);

const generateNumbers: (count: number) => number[] = count => R.times(R.identity, count);

const numbersToChunks: (nums: number[], chunkSize: number) => number[][] = (nums, chunkSize) =>
  R.splitEvery(chunkSize, nums);

type INumbersToTiles = (squareMatrix: number[][]) => ITile[][];
export const numbersToTiles: INumbersToTiles = (squareMatrix: number[][]) =>
  mapIndexed(
    (col, colIdx) =>
      mapIndexed(
        (item, itemIdx) => ({
          id: item,
          position: (item as number) + 1,
          column: colIdx,
          row: itemIdx
        }),
        col as number[]
      ),
    squareMatrix
  ) as Matrix;

export const createMatrix = (size: number) =>
  R.pipe(
    countMatrixItems(size),
    generateNumbers,
    nums => numbersToChunks(nums, size),
    numbersToTiles
  );

export const rearrangeMatrix = (table: Matrix, newCol: number, newRow: number, tile: ITile) => null;
