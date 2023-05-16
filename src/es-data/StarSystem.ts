import { Line } from "es-data-parser/dist/structures";
import { PanZoomPlugin } from "@andreadev/canvas-lib/dist/modules/pan-zoom-plugin";
import { Drawable, Point, BoundingClientRect } from "@andreadev/canvas-lib/dist/modules/drawables";
import { ParsedData } from "./ParsedData";
import { Color } from "./Color";

export type SystemLink = [Point, Point];

export const starSystemsMap = new Map<string, StarSystem>();

export class StarSystem implements Drawable {
    name: string;
    position: Point;
    links: string[] = [];
    government: string = "";
    esData: ParsedData;

    static fromLine(data: ParsedData, dataLine: Line) {
        if (dataLine.tokens[0] != 'system') {
            throw new Error("Not a system");
        }

        const name = dataLine.tokens[1];
        let pos: Point = {x:0, y:0};
        let foundPos = false;
        let links: string[] = [];
        let government = "";
        for (let child of dataLine.children) {
            if (child.tokens[0] == 'pos') {
                pos = {
                    x: parseInt(child.tokens[1]),
                    y: parseInt(child.tokens[2])
                };
                foundPos = true;
                continue;
            }
            
            if (child.tokens[0] == 'link') {
                links.push(child.tokens[1]);
            }

            if (child.tokens[0] == 'government') {
                government = child.tokens[1];
            }
        }

        if (!foundPos) {
            throw new Error("No position found for this system");
        }

        const system = new StarSystem(data, name, pos);
        system.links = links;
        system.government = government;
        
        starSystemsMap.set(name, system);

        return system;
    }

    constructor(data: ParsedData, name: string, pos: Point) {
        this.name = name;
        this.position = pos;
        this.esData = data;

        starSystemsMap.set(name, this);
    }

    getBCR(): BoundingClientRect {
        return {
            top: this.position.y - 3,
            bottom: this.position.y + 3,
            left: this.position.x - 3,
            right: this.position.x + 3,
            width: 6,
            height: 6
        };
    }

    render(ctx: CanvasRenderingContext2D) {
        this.renderLinks(ctx);
        this.renderDot(ctx);
        this.renderName(ctx);
    }

    renderLinks(ctx: CanvasRenderingContext2D) {
        // Render the links
        ctx.lineWidth = PanZoomPlugin.fixedNumber(1, ctx);
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        for (let link of this.links) {
            ctx.beginPath();
            ctx.moveTo(this.position.x, this.position.y);

            const targetSystem = starSystemsMap.get(link);
            if (!targetSystem)
                continue;

            ctx.lineTo(targetSystem.position.x, targetSystem.position.y);
            ctx.stroke();
        }
    }

    renderDot(ctx: CanvasRenderingContext2D) {
        // Render the circle
        // Get the government color
        let color = Color.fromGovernment(this.esData, this.government)?.toString();
        if (!color) {
            color = '#aaa';
        }

        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.strokeStyle = color;
        ctx.lineWidth = PanZoomPlugin.fixedNumber(2, ctx);
        let {width, height} = PanZoomPlugin.fixedSize(3, 3, ctx);
        ctx.ellipse(this.position.x, this.position.y, width, height, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    renderName(ctx: CanvasRenderingContext2D) {
        // Render the name
        let { scaleX: scale } = PanZoomPlugin.getDataFromMatrix(ctx.getTransform());
        // If it's too small to render the name, interrupt the function
        if (scale < 0.5) {
            return;
        }

        let fontSize = PanZoomPlugin.fixedNumber(12, ctx)
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        let offset = PanZoomPlugin.fixedNumber(4, ctx);
        let {width, height} = PanZoomPlugin.fixedSize(3, 3, ctx);
        ctx.fillText(this.name, this.position.x + width + offset, this.position.y + height);
    }
}
