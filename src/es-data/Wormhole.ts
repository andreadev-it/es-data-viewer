import { Color } from "./Color";
import { ParsedData } from "./ParsedData";
import { Line } from "es-data-parser/structures";

export class WormholeDetails {
    isMappable = false;
    links: [string, string][] = [];
    color: Color | string = "";

    constructor(private esData: ParsedData, public name: string) {}

    static fromLine(data: ParsedData, dataLine: Line) {
        if (dataLine.tokens[0] != 'wormhole') {
            throw new Error("Not a wormhole");
        }

        const name = dataLine.tokens[1];

        let mappable = false;
        let color: Color | string = "";
        let links: [string, string][] = [];

        for (let child of dataLine.children) {
            switch (child.tokens[0]) {
                case 'color':
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
                    break;

                case 'link':
                    links.push(
                        [ child.tokens[1], child.tokens[2] ]
                    );
                    break;
                case 'mappable':
                    mappable = true;
                    break;
            }
        }

        const wormhole = new WormholeDetails(data, name);
        wormhole.isMappable = mappable;
        wormhole.color = color;
        wormhole.links = links;

        return wormhole;
    }
}
