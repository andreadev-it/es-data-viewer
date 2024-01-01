import { CanvasLib } from "@andreadev/canvas-lib";
import { PanZoomPlugin } from "@andreadev/canvas-lib/dist/modules/pan-zoom-plugin";
import { View } from "./views/abstract";
import { GalaxyView } from "./views/galaxy";
import { ParsedData } from "es-data-parser";
import { SpriteList } from "./game-functions/sprites";

const views: Record<string, View | null>= {
    galaxy: null
};
let currentView: View | null = null;

export function initCanvasLib(canvas: HTMLCanvasElement) {
    // Fix canvas dimensions
    let canvasBCR = canvas.getBoundingClientRect();
    canvas.width = canvasBCR.width;
    canvas.height = canvasBCR.height;

    const canvasLib = new CanvasLib(canvas);
    canvasLib.use(PanZoomPlugin, {});

    return canvasLib;
}

export async function setCurrentView(lib: CanvasLib, view: View) {
    await currentView?.deactivate(lib);
    currentView = view;
    await currentView.activate(lib);
}

export async function filesLoaded(lib: CanvasLib, sprites: SpriteList, data: ParsedData) {
    views.galaxy = new GalaxyView(data, sprites, lib);
    await setCurrentView(lib, views.galaxy);

    await lib.paint();
}
