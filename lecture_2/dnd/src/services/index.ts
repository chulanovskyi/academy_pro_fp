import * as R from 'ramda';
import { Matrix } from 'models';

const MATRIX_SIZE = 3;
const NUMBER_OF_ITEMS = MATRIX_SIZE ** 2;

// const addToEach = (array) => (num) => R.map(n => n + num, array);

// const splitToChunks = (chunk, array) => R.splitEvery(chunk, array);

const mapIndexed = R.addIndex(R.map);

const numbers: number[] = R.times(R.identity, NUMBER_OF_ITEMS);

// const addToNumbers = addToEach(numbers);

// const numbersPlus1 = addToNumbers(1);

const numbersToChunks: number[][] = R.splitEvery(MATRIX_SIZE, numbers);

export const matrix = mapIndexed(
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
  numbersToChunks
) as Matrix;
