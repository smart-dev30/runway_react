export enum CellType {
  Input,
  Text,
}

export interface ISelectCell {
  row: number | null;
  col: number | null
}