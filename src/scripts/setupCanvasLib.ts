import { CanvasLib } from "@andreadev/canvas-lib";
import { PanZoomPlugin } from "@andreadev/canvas-lib/dist/modules/pan-zoom-plugin";
import { View } from "./views/abstract";
import { GalaxyView } from "./views/galaxy";
import { SystemView } from "./views/system";
import { ParsedData } from "es-data-parser";
import { SpriteList } from "./game-functions/sprites";

const views: Record<string, View | null>= {
    galaxy: null,
    system: null,
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

export async function setCurrentView(lib: CanvasLib, viewName: string) {
    if (!(viewName in views)) {
        throw new Error(`'${viewName}' is not a valid view.`);
    }

    for (let name of Object.keys(views)) {
        document.body.classList.remove(`active-${name}`);
    }
    document.body.classList.add(`active-${viewName}`);

    let view = views[viewName]!;

    // Deactivate the previous view
    await currentView?.deactivate(lib);

    // Reset zoom and panning
    let panZoomPlug = lib.getPlugin(PanZoomPlugin)!;
    panZoomPlug.currentZoom = 1;
    panZoomPlug.cameraOffset = {x: 0, y: 0};

    // Set the new view
    currentView = view;
    await currentView.activate(lib);

    await lib.paint();
}

export async function filesLoaded(lib: CanvasLib, sprites: SpriteList, data: ParsedData) {
    let systemView = new SystemView(data, sprites, lib); 

    views.system = systemView;
    views.galaxy = new GalaxyView(data, sprites, lib);

    await setCurrentView(lib, 'galaxy');

    await lib.paint();
}
