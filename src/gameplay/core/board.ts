import { Bit, BitField } from "../common/bitfield";
import { FallingPiece } from "./piece";

export class Board {
    private readonly playfield: BitField;

    public constructor(width: number, height: number) {
        this.playfield = new BitField(width, height, Bit.Zero);
    }

    public isFree(x: number, y: number): boolean {
        return this.playfield.indexAt(x, y) == Bit.Zero;
    }

    public isOccupied(x: number, y: number): boolean {
        return this.playfield.indexAt(x, y) == Bit.One;
    }

    public landsOnSurface(piece: FallingPiece): boolean {
        return this.playfield.mask([piece.x, piece.y], piece.tetromino[piece.facing]).isZero();
    }
}