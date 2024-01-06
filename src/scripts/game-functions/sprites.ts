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

export function printSprite(filename: string, image: HTMLImageElement, scale: number, ctx: CanvasRenderingContext2D) {
    let [name, _] = filename.split('.');

    // additive -> lighter
    switch (name.at(-1)) {
        case '+':
        case '~':
            ctx.globalCompositeOperation = 'lighter';
    }

    let printWidth = image.width * scale;
    let printHeight = image.height * scale;

    ctx.drawImage(
        image,
        - (printWidth/2),
        - (printHeight/2),
        printWidth,
        printHeight
    );
    
    ctx.globalCompositeOperation = 'source-over';
}
