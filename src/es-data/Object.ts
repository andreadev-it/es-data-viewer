// This class represents different kind of objects
// that you can find in a star system. 
import { ParsedData } from "./ParsedData";
import { Line } from "es-data-parser/structures";

export class SystemObject {
    name = "";
    sprite = "";
    spriteImage: HTMLImageElement | null = null;
    distance: number;
    period: number;
    offset: number = 0;
    objects: SystemObject[] = [];

    constructor(private esData: ParsedData, distance: number, period: number, offset = 0) {
        this.distance = distance;
        this.period = period;
    }

    static fromLine(data: ParsedData, dataLine: Line) {
        if (dataLine.tokens[0] != 'object') {
            throw new Error("Not an object");
        }

        const name = (dataLine.tokens.length == 2) ? dataLine.tokens[1] : "";
        let sprite = "";
        let distance = 0;
        let period = 0;
        let offset = 0;
        const objects = [];
        for (let child of dataLine.children) {
            switch (child.tokens[0]) {
                case 'sprite':
                    sprite = child.tokens[1];
                    break;
                case 'distance':
                    distance = parseFloat(child.tokens[1]);
                    break;
                case 'period':
                    period = parseFloat(child.tokens[1]);
                    break;
                case 'offset':
                    offset = parseFloat(child.tokens[1]);
                    break;
                case 'object':
                    objects.push(SystemObject.fromLine(data, child));
            }
        }

        const systemObject = new SystemObject(data, distance, period, offset);
        systemObject.name = name;
        systemObject.objects = objects;
        systemObject.sprite = sprite;

        return systemObject;
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
}
