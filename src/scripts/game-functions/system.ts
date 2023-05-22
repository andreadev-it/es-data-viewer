import { System } from 'es-data-parser';
import { PanZoomPlugin } from '@andreadev/canvas-lib/dist/modules/pan-zoom-plugin';
import { Color } from 'es-data-parser';
import { Point } from 'es-data-parser';

const pinSize = 3;
const pinLineWidth = 2;
const linkColor = 'rgba(255,255,255,0.2)';
const tagNameOffset = 4;
const tagNameColor = 'rgba(255,255,255,0.3)';
const tagNameFontSize = 12;

/**
 * Calculate the distance of a point to a star system
 */
export function distanceFromSystem(system: System, position: Point): number {
    return Math.sqrt(
        Math.pow(system.position.x - position.x, 2) +
        Math.pow(system.position.y - position.y, 2)
    );
}

/**
 * Rendering function for the endless sky systems
 */
export function renderSystem(system: System, ctx: CanvasRenderingContext2D) {
    // renderSystemSelection(system, ctx);
    renderSystemLinks(system, ctx);
    renderSystemPin(system, ctx);
    renderSystemName(system, ctx);
}

export function renderSystemSelection(system: System, ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(100,100,255,0.2)';
    ctx.strokeStyle = 'darkblue';
    ctx.lineWidth = PanZoomPlugin.fixedNumber(1, ctx);
    let width = PanZoomPlugin.fixedNumber(15, ctx);
    ctx.ellipse(
        system.position.x,
        system.position.y,
        width,
        width,
        0, 0, 2 * Math.PI
    );
    ctx.fill();
    ctx.stroke();
}

export function renderSystemLinks(system: System, ctx: CanvasRenderingContext2D) {
    // Render the links
    ctx.lineWidth = PanZoomPlugin.fixedNumber(1, ctx);
    ctx.strokeStyle = linkColor;

    for (let link of system.links) {
        ctx.beginPath();
        ctx.moveTo(system.position.x, system.position.y);

        const targetSystem = system.esData.starSystems.get(link);
        if (!targetSystem)
            continue;

        ctx.lineTo(targetSystem.position.x, targetSystem.position.y);
        ctx.stroke();
    }
}

export function renderSystemPin(system: System, ctx: CanvasRenderingContext2D) {
    // Render the circle
    // Get the government color
    let color = Color.fromGovernment(system.esData, system.government)?.toString();
    if (!color) {
        color = '#aaa';
    }

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.strokeStyle = color;
    ctx.lineWidth = PanZoomPlugin.fixedNumber(pinLineWidth, ctx);
    let {width, height} = PanZoomPlugin.fixedSize(pinSize, pinSize, ctx);
    ctx.ellipse(system.position.x, system.position.y, width, height, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

export function renderSystemName(system: System, ctx: CanvasRenderingContext2D) {
    // Render the name
    let { scaleX: scale } = PanZoomPlugin.getDataFromMatrix(ctx.getTransform());
    // If it's too small to render the name, interrupt the export function
    if (scale < 0.5) {
        return;
    }

    let fontSize = PanZoomPlugin.fixedNumber(tagNameFontSize, ctx)
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = tagNameColor;
    let offset = PanZoomPlugin.fixedNumber(tagNameOffset, ctx);
    let {width, height} = PanZoomPlugin.fixedSize(pinSize, pinSize, ctx);
    ctx.fillText(system.name, system.position.x + width + offset, system.position.y + height);
}
