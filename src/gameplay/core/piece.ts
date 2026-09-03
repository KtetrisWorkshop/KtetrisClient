import { range } from "fp-ts/NonEmptyArray";

// 各个种类方块四个方向的编码，高16位编码旋转掩码，低16位编码形状扫描码
const pieceTable = [
  [0xee206c00, 0x66e04620, 0x8ee006c0, 0xecc08c40], //S
  [0xe660c600, 0x2ee02640, 0xee800c60, 0xcce04c80], //Z
  [0xecc088c0, 0xee20e800, 0x66e06220, 0x8ee002e0], //L
  [0x2ee02260, 0xcce008e0, 0xee80c880, 0xe660e200], //J
  [0x7fcc4444, 0xef330f00, 0x33fe2222, 0xccf700f0], //I
  [0xcc00cc00, 0xcc00cc00, 0xcc00cc00, 0xcc00cc00], //O
  [0xe620e400, 0x26e02620, 0x8ce004e0, 0xec808c80], //T
];

export type Matrix = number[][];

export function matrixToString(matrix: Matrix) {
  return matrix.map((row) => row.join(" ")).join("\n");
}

export function getShape(type: number, dir: number): Matrix {
  return toMatrix(pieceTable[type][dir] & 0x0000ffff, type);
}

export function getRotateMask(type: number, dir: number): Matrix {
  return toMatrix((pieceTable[type][dir] >> 16) & 0x0000ffff, type);
}

function toMatrix(code: number, block: number): Matrix {
  return range(0, 3).map((r) =>
    range(0, 3).map((c) => (code & (1 << (15 - (r * 4 + c))) ? block : 0)),
  );
}
