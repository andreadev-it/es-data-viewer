import { CanvasLib } from "@andreadev/canvas-lib";
import { PanZoomPlugin } from "@andreadev/canvas-lib/dist/modules/pan-zoom-plugin";
import { View } from "./views/abstract";
import { GalaxyView } from "./views/galaxy";
import { RenderingEvent } from "@andreadev/canvas-lib/dist/main";
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

    // Setup rendering functions for the view
    const preRender = (event: RenderingEvent) => {
        currentView?.preRender(event.detail.context);
    }
    const render = async (event: RenderingEvent) => {
        currentView?.render(event.detail.context);
    }
    const postRender = async (event: RenderingEvent) => {
        currentView?.render(event.detail.context);
    }

    canvasLib.on('prerender', preRender);
    canvasLib.on('render', render);
    canvasLib.on('postrender', postRender);

    return canvasLib;
}

export async function setCurrentView(view: View) {
    await currentView?.deactivate();
    currentView = view;
    await currentView.activate();
}

export async function filesLoaded(lib: CanvasLib, sprites: SpriteList, data: ParsedData) {
    views.galaxy = new GalaxyView(data, sprites, lib);
    await setCurrentView(views.galaxy);

    lib.paint();
}
