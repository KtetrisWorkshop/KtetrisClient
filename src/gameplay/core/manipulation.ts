import { Board } from "./board";
import { FallingPiece } from "./piece";

export const enum MoveDirection { Left = -1, Down = 0, Right = 1 }

export function move(piece: FallingPiece, direction: MoveDirection, board: Board): FallingPiece {
    if (board.touchesFrame(piece, direction) || board.touchesBlock(piece, direction)) {
        return piece;
    } else switch (direction) {
        case MoveDirection.Down: return { ...piece, y: piece.y - 1 }
        case MoveDirection.Left: return { ...piece, x: piece.x - 1 }
        case MoveDirection.Right: return { ...piece, x: piece.x + 1 }
    }
}