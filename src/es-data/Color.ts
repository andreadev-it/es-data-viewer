import { Line } from "es-data-parser/dist/structures";
import { ParsedData } from "./ParsedData";

export class Color {
    constructor(public name: string, public r: number, public g: number, public b: number, public a: number = 255) {}

    toString() {
        if (this.a == 255) {
            return `rgb(${this.r}, ${this.g}, ${this.b})`;
        }
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

    static fromLine(dataLine: Line) {
        let label = dataLine.tokens[1];
        let r = parseFloat(dataLine.tokens[2]);
        let g = parseFloat(dataLine.tokens[3]);
        let b = parseFloat(dataLine.tokens[4]);
        let a = 255
        if (dataLine.tokens.length == 6) {
            a = parseFloat(dataLine.tokens[5]);
        }

        return Color.fromPercentages(label, r, g, b, a);
    }

    static fromPercentages(label: string, r: number, g: number, b: number, a: number) {
        return new Color(label, r * 255, g * 255, b * 255, a * 255);
    }

    static fromGovernment(data: ParsedData, govName: string) {
        let government = data.governments.get(govName);
        if (!government) {
            return null;
        }

        if (government.color instanceof Color) {
            return government.color;
        }

        let color = data.colors.get(government.color);
        if (!color) {
            return null;
        }

        return color;
    }
}
