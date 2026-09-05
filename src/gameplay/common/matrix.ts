export class Matrix<T> {
    width: number;
    height: number;
    data: T[][];
    public constructor(width: number, height: number, data: T[][]) {
        this.width = width;
        this.height = height;
        this.data = data;
    }

    public toString() {
        return this.data.map((row) => row.join(" ")).join("\n");
    }
}