export default class Range {
    readonly start_selected_line!: number;
    readonly start_selected_column!: number;

    readonly end_selected_line!: number;
    readonly end_selected_column!: number;

    constructor(start_line: number, start_column: number, end_line: number, end_column: number) {
        this.start_selected_line = start_line;
        this.start_selected_column = start_column;

        this.end_selected_line = end_line;
        this.end_selected_column = end_column;
    }

    static is_empty(range: Range) {
        if (range.end_selected_column !== range.start_selected_column) return false;
        if (range.end_selected_line !== range.start_selected_line) return false;
        return true;
    }

    public is_empty() {
        return Range.is_empty(this);
    }
}
