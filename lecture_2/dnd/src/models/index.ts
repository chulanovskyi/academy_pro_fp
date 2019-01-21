import { MouseEvent, RefObject } from 'react';

export interface ITile {
  id: number;
  row: number;
  column: number;
  position: number;
}

export type Matrix = ITile[][];

export type ClickEvent = MouseEvent | Event;
export type DivNode = RefObject<HTMLDivElement>;
export type Action = () => void;
