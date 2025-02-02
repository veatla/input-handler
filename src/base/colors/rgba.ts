import { clamp } from "../numbers/clamp";

export default class RGBA {
    readonly r: number;

    readonly g: number;

    readonly b: number;

    readonly a: number;

    constructor(r = 0, g = 0, b = 0, a = 1) {
        this.r = clamp(r, 0, 255);
        this.g = clamp(g, 0, 255);
        this.b = clamp(b, 0, 255);
        this.a = clamp(a, 0, 1);
    }

    static equals(a: RGBA, b: RGBA) {
        if (a.r !== b.r) return false;
        if (a.g !== b.g) return false;
        if (a.b !== b.b) return false;
        if (a.a !== b.a) return false;
        return true;
    }
}
