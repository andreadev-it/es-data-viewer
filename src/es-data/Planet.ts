import { ParsedData } from "./ParsedData";
import { Line } from "es-data-parser/dist/structures";
import { WormholeDetails } from "./Wormhole";

export class PlanetDetails {
    wormhole: string = "";

    constructor(private esData: ParsedData, public name: string) {}

    static fromLine(data: ParsedData, dataLine: Line) {
        if (dataLine.tokens[0] != 'planet') {
            throw new Error("Not a planet");
        }

        const name = dataLine.tokens[1];

        let wormhole: string = "";
        for (let child of dataLine.children) {
            if (child.tokens[0] == 'wormhole') {
                wormhole = child.tokens[1];
            }
        }

        let planet = new PlanetDetails(data, name);
        planet.wormhole = wormhole;

        return planet;
    }
}
