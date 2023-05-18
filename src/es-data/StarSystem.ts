import { Line } from "es-data-parser/structures";
import { PanZoomPlugin } from "@andreadev/canvas-lib/dist/modules/pan-zoom-plugin";
import { Drawable, Point, BoundingClientRect } from "@andreadev/canvas-lib/dist/modules/drawables";
import { ParsedData } from "./ParsedData";
import { Color } from "./Color";
import { SystemObject } from "./Object";

export type SystemLink = [Point, Point];

export const starSystemsMap = new Map<string, StarSystem>();

export class StarSystem implements Drawable {
    name: string;
    position: Point;
    links: string[] = [];
    government: string = "";
    esData: ParsedData;
    attributes: string[] = [];
    objects: SystemObject[] = [];
    isSelected = false;

    static fromLine(data: ParsedData, dataLine: Line) {
        if (dataLine.tokens[0] != 'system') {
            throw new Error("Not a system");
        }

        const name = dataLine.tokens[1];
        let pos: Point = {x:0, y:0};
        let foundPos = false;
        let links: string[] = [];
        let government = "";
        let attributes: string[] = [];
        const objects: SystemObject[] = [];
        for (let child of dataLine.children) {
            switch (child.tokens[0]) {
                // Extract the position
                case 'pos':
                    pos = {
                        x: parseInt(child.tokens[1]),
                        y: parseInt(child.tokens[2])
                    };
                    foundPos = true;
                    break;
                // Extract the links
                case 'link':
                    links.push(child.tokens[1]);
                    break;
                // Set the system government
                case 'government':
                    government = child.tokens[1];
                    break;
                // Save a list of attributes
                case 'attributes':
                    attributes = child.tokens.slice(1);
                    break;
                // Parse the objects in the system
                case 'object':
                    objects.push(SystemObject.fromLine(data, child));
            }
        }

        if (!foundPos) {
            throw new Error("No position found for this system");
        }

        const system = new StarSystem(data, name, pos);
        system.links = links;
        system.government = government;
        system.attributes = attributes;
        system.objects = objects;
        
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

    distanceFrom(point: Point): number {
        let distance = Math.sqrt(
            Math.pow(this.position.x - point.x, 2) +
            Math.pow(this.position.y - point.y, 2)
        );

        return distance;
    }

    render(ctx: CanvasRenderingContext2D) {
        this.renderSelection(ctx);
        this.renderLinks(ctx);
        this.renderDot(ctx);
        this.renderName(ctx);
    }

    renderSelection(ctx: CanvasRenderingContext2D) {
        if (!this.isSelected) return;

        ctx.beginPath();
        ctx.fillStyle = 'rgba(100,100,255,0.2)';
        ctx.strokeStyle = 'darkblue';
        ctx.lineWidth = PanZoomPlugin.fixedNumber(1, ctx);
        let width = PanZoomPlugin.fixedNumber(15, ctx);
        ctx.ellipse(
            this.position.x,
            this.position.y,
            width,
            width,
            0, 0, 2 * Math.PI
        );
        ctx.fill();
        ctx.stroke();
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
