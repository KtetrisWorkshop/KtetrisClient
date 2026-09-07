export class Matrix<T> {
    public readonly width: number;
    public readonly height: number;

    public constructor(
        public readonly data: T[][]
    ) { 
        this.height = data.length;
        this.width = data.at(0)!.length;
    }

    public toString() {
        return this.data.map((row) => row.join(" ")).join("\n");
    }
}