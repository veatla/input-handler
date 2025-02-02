import RGBA from "./rgba";

export default class Color {
    private rgba: RGBA;

    constructor(data: RGBA) {
        if (data instanceof RGBA) {
            this.rgba = data;
        } else {
            throw new Error("Expected color in argument");
        }
    }

    isOpaque(): boolean {
        return this.rgba.a === 1;
    }

    private _toString?: string;
    toString(): string {
        if (!this._toString) {
            this._toString = Color.formatToCSS(this);
        }
        return this._toString;
    }

	static formatToCSS(color: Color): string {
		if (color.isOpaque()) {
			return Color.formatHex(color);
		}

		return this.formatRGBA(color);
	}
	static formatRGBA(color: Color): string {
        return `rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, ${+(color.rgba.a).toFixed(2)})`;
    }

	static _toTwoDigitHex(n: number): string {
		const r = n.toString(16);
		return r.length !== 2 ? '0' + r : r;
	}

	static formatHex(color: Color): string {
		return `#${this._toTwoDigitHex(color.rgba.r)}${this._toTwoDigitHex(color.rgba.g)}${this._toTwoDigitHex(color.rgba.b)}`;
	}

    equals(other: Color | null): boolean {
        if (!other) return false;
        if (!RGBA.equals(this.rgba, other.rgba)) return false;
        return true;
        // return HSLA.equals(this.hsla, other.hsla) && HSVA.equals(this.hsva, other.hsva);
    }
}
