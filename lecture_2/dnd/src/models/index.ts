export interface ITile {
  id: number;
  row: number;
  column: number;
  position: number;
}

export type Matrix = ITile[][];
