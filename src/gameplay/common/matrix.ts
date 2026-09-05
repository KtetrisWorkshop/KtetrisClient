export class Matrix<T> {
    public constructor(
        public readonly width: number,
        public readonly height: number,
        public readonly data: T[][]
    ) { }

    public toString() {
        return this.data.map((row) => row.join(" ")).join("\n");
    }
}