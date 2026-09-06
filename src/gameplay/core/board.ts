import { Bit, BitField } from "../common/bitfield";
import { MoveDirection } from "./manipulation";
import { FallingPiece } from "./piece";

export class Board {
    private readonly playfield: BitField;

    public constructor(
        public readonly width: number,
        public readonly height: number
    ) {
        this.playfield = new BitField(width, height, Bit.Zero);
    }

    public isFree(x: number, y: number): boolean {
        return this.playfield.indexAt(x, y) == Bit.Zero;
    }

    public isOccupied(x: number, y: number): boolean {
        return this.playfield.indexAt(x, y) == Bit.One;
    }

    public touchesFrame(piece: FallingPiece, direction: MoveDirection) { switch (direction) {
        case MoveDirection.Down: return piece.y == 0;
        case MoveDirection.Left: return piece.x + direction == 0;
        case MoveDirection.Right: return piece.x + direction + piece.tetromino[piece.facing].width == this.width - 1;
    }}

    public touchesBlock(piece: FallingPiece, direction: MoveDirection) {
        const tetromino = piece.tetromino[piece.facing];
        const maxX = tetromino.width - 1;
        const maxY = tetromino.height - 1;
        switch (direction) {
            case MoveDirection.Down: return this.playfield.mask([piece.x, piece.y + maxY - 1],
                tetromino.slice([0, maxY], [maxX, maxY])
            )
            case MoveDirection.Left: return this.playfield.mask([piece.x - 1, piece.y],
                tetromino.slice([0, 0], [0, maxY])
            )
            case MoveDirection.Right: return this.playfield.mask([piece.x + maxX + 1, piece.y],
                tetromino.slice([maxX, 0], [maxX, maxY])
            )
        }
    }
}