import { Board } from "./board";
import { FallingPiece } from "./piece";

export function moveDown(piece: FallingPiece, board: Board): FallingPiece {
    if (board.landsOnSurface(piece)) {
        return piece;
    } else {
        return { ...piece, y: piece.y - 1 }
    }
}