import { range } from "fp-ts/NonEmptyArray";
import { clamp } from "fp-ts/Ord";
import { Matrix } from "./matrix";
import { Ord } from "fp-ts/number";

export const enum Bit { Zero = 0, One = 1 }
export type BitSpan = number;

export class BitField {
    public constructor(
        public readonly width: number,
        public readonly height: number,
        public readonly bits: BitSpan,
    ) {
        this.size = height * width;
    }

    public readonly size: number;

    public static readonly Empty = new BitField(0, 0, Bit.Zero);

    public isZero(): boolean {
        return this.bits == Bit.Zero;
    }

    private position(x: number, y: number) {
        return x + y * this.width;
    }

    public indexAt(x: number, y: number): Bit {
        const mask = (Bit.One << this.position(x, y));
        return (this.bits & mask) == 0 ? Bit.Zero : Bit.One;
    }

    private window([x0, y0]: [number, number], [x1, y1]: [number, number]) {
        x0 = clamp(Ord)(0, this.width - 1)(x0);
        y0 = clamp(Ord)(0, this.height - 1)(y0);
        x1 = clamp(Ord)(0, this.width - 1)(x1);
        y1 = clamp(Ord)(0, this.height - 1)(y1);

        if (x0 > x1) {
            [x0, x1] = [x1, x0];
        }
        if (y0 > y1) {
            [y0, y1] = [y1, y0];
        }
        return [x0, y0, x1, y1];
    }

    public slice([x0, y0]: [number, number], [x1, y1]: [number, number]): BitField {
        [x0, y0, x1, y1] = this.window([x0, y0], [x1, y1]);
        const width = x1 - x0 + 1;
        const height = y1 - y0 + 1;

        const masking = (Bit.One << width) - 1;
        
        const bitSpan = range(y0, y1).reverse().map((y) => {
            const maskedOff = this.position(x0, y);
            return (this.bits & (masking << maskedOff)) >> maskedOff;
        }).reduce((prev, curr) =>
            (prev << width) | curr,
            Bit.Zero
        );
        return new BitField(width, height, bitSpan);
    }

    public mask([x, y]: readonly [number, number], field: BitField): BitField {
        const masked = this.slice([x, y], [x + field.width - 1, y + field.height - 1]);
        const masking = field.slice([0, 0], [masked.width - 1, masked.height - 1]);
        return new BitField(masked.width, masked.height, (masked.bits & masking.bits));
    }

    public toMatrix(): Matrix<Bit> {
        const data = range(0, this.height - 1).reverse().map((y) =>
            range(0, this.width - 1).reverse().map((x) => this.indexAt(x, y))
        );
        return new Matrix(this.width, this.height, data);
    }
}

export function matrixToBitField(matrix: Matrix<Bit>): BitField {
    const bitSpan = matrix.data.flat()
        .reduce((bits, b) => (bits << 1) | b, Bit.Zero);
    return new BitField(matrix.width, matrix.height, bitSpan);
}