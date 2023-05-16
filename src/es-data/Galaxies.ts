import { Line } from "es-data-parser/dist/structures";
import { ParsedData } from "./ParsedData";
import { Point } from "@andreadev/canvas-lib/dist/modules/drawables";

export class Galaxy {
    esData: ParsedData;

    name: string;
    position: Point = {x:0, y:0};
    sprite = "";
    spriteImage: HTMLImageElement | null = null;

    static fromLine(data: ParsedData, dataLine: Line) {
        if (dataLine.tokens[0] != 'galaxy') {
            throw new Error("Not a galaxy");
        }

        const name = dataLine.tokens[1];
        let pos: Point = {x:0, y:0};
        let foundPos = false;
        let sprite: string = "";
        for (let child of dataLine.children) {
            if (child.tokens[0] == 'pos') {
                pos = {
                    x: parseInt(child.tokens[1]),
                    y: parseInt(child.tokens[2])
                };
                foundPos = true;
                continue;
            }
            
            if (child.tokens[0] == 'sprite') {
                sprite = child.tokens[1];
            }
        }

        if (!foundPos) {
            throw new Error("No position found for this system");
        }

        const galaxy = new Galaxy(data, name, pos);
        galaxy.sprite = sprite;

        return galaxy;
    }

    constructor(data: ParsedData, name: string, pos: Point) {
        this.name = name;
        this.position = pos;
        this.esData = data;
    }

    loadImage(): Promise<void> {
        if (this.spriteImage) return Promise.resolve();
        if (this.sprite == '') return Promise.resolve();

        return new Promise((resolve, reject) => {
            let sprite = this.esData.sprites.get(this.sprite)

            // In case the image file isn't available
            if (!sprite) {
                resolve();
                return;
            }

            let url = URL.createObjectURL(sprite);
            let img = new Image();

            img.onload = () => {
                this.spriteImage = img;
                resolve();
            }
            
            img.onerror = () => {
                reject()
            }

            img.src = url;
            
        })
    }

    render(ctx: CanvasRenderingContext2D) {
        // Render the sprite
        if (this.sprite == '') {
            return;
        }

        if (this.spriteImage == null) {
            console.error("Sprite image used before loading!");
        }
        else {
            ctx.drawImage(
                this.spriteImage,
                this.position.x - (this.spriteImage.width / 2),
                this.position.y - (this.spriteImage.height / 2)
            );
        }
    }
}
