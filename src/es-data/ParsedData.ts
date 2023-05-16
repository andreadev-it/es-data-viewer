import { Color } from "./Color";
import { Galaxy } from "./Galaxies";
import { Government } from "./Government";
import { PlanetDetails } from "./Planet";
import { StarSystem, SystemLink } from "./StarSystem";
import { WormholeDetails } from "./Wormhole";

export class ParsedData {
    galaxies: Map<string, Galaxy> = new Map();
    starSystems: Map<string, StarSystem> = new Map();
    colors: Map<string, Color> = new Map();
    sprites: Map<string, File> = new Map();
    governments: Map<string, Government> = new Map();
    planets: Map<string, PlanetDetails> = new Map();
    wormholes: Map<string, WormholeDetails> = new Map();
    starSystemsLinks: Set<string> = new Set();

    constructor() {}

    addGalaxy(galaxy: Galaxy) {
        this.galaxies.set(galaxy.name, galaxy);
    }

    addStarSystem(starSystem: StarSystem) {
        this.starSystems.set(starSystem.name, starSystem);
        for (let link of starSystem.links) {
            let linkedSystem = this.starSystems.get(link);
            if (linkedSystem) {
                let linkString = `${starSystem.name}___${linkedSystem.name}`;
                let reverseLinkString = `${linkedSystem.name}___${starSystem.name}`;
                if (!this.starSystems.has(reverseLinkString))
                    this.starSystemsLinks.add(linkString);
            }
        }
    }

    addSprite(path: string, sprite: File) {
        this.sprites.set(path, sprite);
    }

    addColor(color: Color) {
        this.colors.set(color.name, color);
    }

    addGovernment(gov: Government) {
        this.governments.set(gov.name, gov);
    }

    addPlanet(planet: PlanetDetails) {
        this.planets.set(planet.name, planet);
    }

    addWormhole(wormhole: WormholeDetails) {
        this.wormholes.set(wormhole.name, wormhole);
    }
}
