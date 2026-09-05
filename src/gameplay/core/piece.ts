import { BitField } from "../common/bitfield";
import { Tetromino } from "./polyominoes";

export enum Facing { Up, Left, Down, Right }

export type Shape = BitField;

export type FallingPiece = {
  readonly x: number;
  readonly y: number;
  readonly facing: Facing;
  readonly tetromino: Tetromino;
}