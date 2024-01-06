import { SystemObject } from "es-data-parser";
import { SpriteList, printSprite } from "./sprites";

export async function renderObjectOrbit(object: SystemObject, ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(0, 0, object.distance, 0, 2 * Math.PI);
    ctx.stroke();
    
    let angle = 90;
    angle += object.offset;
    angle *= Math.PI / 180;

    ctx.rotate(angle);
    ctx.translate(0, -object.distance);

    for (let child of object.objects) {
        await renderObjectOrbit(child, ctx);
    }

    ctx.translate(0, object.distance);
    ctx.rotate(-angle);
}

export async function renderObject(object: SystemObject, spriteList: SpriteList, ctx: CanvasRenderingContext2D) {
    // Render the sprite
    if (object.sprite == null) {
        return;
    }

    let spriteImage : HTMLImageElement | undefined = spriteList.loadedSprites.get(object.sprite.name);
    const spriteFile = spriteList.sprites.get(object.sprite.name);

    if (!spriteFile) {
        console.error(`Sprite ${object.sprite} not found`);
        return;
    }

    // The sprite image isn't loaded
    if (!spriteImage) {
        spriteImage = await spriteList.load(object.sprite.name, spriteFile);
    }

    // Draw the planet/star
    let angle = 90;
    angle += object.offset;
    angle *= Math.PI / 180;

    ctx.save();
    if (object.distance > 0)
        ctx.rotate(angle);
    ctx.translate(0, -object.distance);

    printSprite(
        spriteFile.name,
        spriteImage,
        object.sprite.scale,
        ctx
    );

    if (object.distance > 0)
        ctx.rotate(-angle);

    for (let child of object.objects) {
        await renderObject(child, spriteList, ctx);
    }

    ctx.restore();
}
