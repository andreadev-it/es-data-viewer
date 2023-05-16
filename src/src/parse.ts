import { ParsedData } from "../es-data/ParsedData";
import { StarSystem } from "../es-data/StarSystem";
import { Galaxy } from "../es-data/Galaxies";
import { FileRoot } from "es-data-parser/dist/structures";
import { parseFile } from "es-data-parser";
import { Color } from "../es-data/Color";
import { Government } from "../es-data/Government";
import { PlanetDetails } from "../es-data/Planet";
import { WormholeDetails } from "../es-data/Wormhole";


export async function parse(files: File[]) {
    const parsedData = new ParsedData();
    const roots: FileRoot[] = [];

    for (let file of files) {
        if (
            file.webkitRelativePath.match(/^([^\/]+\/)?data\//) !== null) {
            let fileroot = await parseFile(file, file.webkitRelativePath);

            roots.push(fileroot);

            for (let child of fileroot.children) {
                if (child.tokens[0] == 'system') {
                    parsedData.addStarSystem(StarSystem.fromLine(parsedData, child));
                }
                else if (child.tokens[0] == 'galaxy') {
                    const galaxy = Galaxy.fromLine(parsedData, child)
                    await galaxy.loadImage();
                    parsedData.addGalaxy(galaxy);
                }
                else if (child.tokens[0] == 'color') {
                    parsedData.addColor(Color.fromLine(child));
                }
                else if (child.tokens[0] == 'government') {
                    parsedData.addGovernment(Government.fromLine(parsedData, child));
                }
                else if (child.tokens[0] == 'planet') {
                    parsedData.addPlanet(PlanetDetails.fromLine(parsedData, child));
                }
                else if (child.tokens[0] == 'wormhole') {
                    parsedData.addWormhole(WormholeDetails.fromLine(parsedData, child));
                }
            }
        }
        else if (file.webkitRelativePath.includes('/images/')) {
            let relativePath = file.webkitRelativePath.split('/images/')[1];

            // remove extension (i.e. .png) from relative path
            relativePath = relativePath.split('.')[0];

            if (
                relativePath.at(-1) == '+' ||
                relativePath.at(-1) == '~' ||
                relativePath.at(-1) == '-'
            ) {
                relativePath = relativePath.slice(0, -1);
            }

            if (!relativePath) continue;

            parsedData.addSprite(relativePath, file);
        }
    }

    console.log(parsedData);
    return parsedData;
}
