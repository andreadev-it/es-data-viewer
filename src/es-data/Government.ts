import { Line } from "es-data-parser/structures";
import { Color } from "./Color";
import { ParsedData } from "./ParsedData";

export class Government {
    esData: ParsedData;

    name: string;
    color: string | Color = "";

    static fromLine(data: ParsedData, dataLine: Line) {
        if (dataLine.tokens[0] != 'government') {
            throw new Error("Not a government");
        }

        const name = dataLine.tokens[1];

        let color: string | Color = "";

        for (let child of dataLine.children) {
            if (child.tokens[0] == 'color') {
                if (child.tokens.length == 2) {
                    color = child.tokens[1];
                }
                else {
                    let r = parseFloat(dataLine.tokens[1]);
                    let g = parseFloat(dataLine.tokens[2]);
                    let b = parseFloat(dataLine.tokens[3]);
                    let a = 255
                    if (dataLine.tokens.length == 5) {
                        a = parseFloat(dataLine.tokens[4]);
                    }
                    color = Color.fromPercentages('', r, g, b, a);
                }
            }
        }

        const government = new Government(data, name);
        government.color = color;

        return government;
    }

    constructor(data: ParsedData, name: string) {
        this.esData = data;
        this.name = name;
    }
}
