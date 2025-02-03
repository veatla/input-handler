export default class Position {
    constructor(public readonly line: number, public readonly column: number) {}

    from(line: number = this.line, column: number = this.column) {
        if (this.line === line && column === this.column) return this;
        return new Position(line, column);
    }
}
