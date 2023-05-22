import { loadImage } from "../utils";

export class SpriteList {
    sprites: Map<string, File> = new Map();
    loadedSprites: Map<string, HTMLImageElement> = new Map();

    constructor() {}

    async load(spriteName: string, file: File) {
        let img = await loadImage(file);
        this.loadedSprites.set(spriteName, img);
        return img;
    }
}
