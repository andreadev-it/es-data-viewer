import { Galaxy } from "es-data-parser";
import { SpriteList } from "./sprites";

export async function renderGalaxy(galaxy: Galaxy, spriteList: SpriteList, ctx: CanvasRenderingContext2D) {
    // Render the sprite
    if (galaxy.sprite == '') {
        return;
    }

    let spriteImage : HTMLImageElement | undefined = spriteList.loadedSprites.get(galaxy.sprite);

    // The sprite image isn't loaded
    if (!spriteImage) {
        const spriteFile = spriteList.sprites.get(galaxy.sprite);

        if (!spriteFile) {
            console.error(`Sprite ${galaxy.sprite} not found`);
            return;
        }

        spriteImage = await spriteList.load(galaxy.sprite, spriteFile);
    }

    ctx.drawImage(
        spriteImage,
        galaxy.position.x - (spriteImage.width / 2),
        galaxy.position.y - (spriteImage.height / 2)
    );
}
