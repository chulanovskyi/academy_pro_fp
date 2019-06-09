export interface IMatrixItem {
  id: number;
  position: number;
  column: number;
  row: number;
}

export type Matrix = IMatrixItem[][];
