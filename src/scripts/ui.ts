import { CanvasLib } from "@andreadev/canvas-lib";
import { PanZoomPlugin } from "@andreadev/canvas-lib/dist/modules/pan-zoom-plugin";
import { ParsedData } from "es-data-parser";
import { setCurrentView } from "./setupCanvasLib";

export function bindUI(lib: CanvasLib, data: ParsedData) {
    // Setup event listeners for the UI
    document.getElementById('zoom-in')?.addEventListener('click', () => {
        const panZoomPlugin = lib.getPlugin(PanZoomPlugin);

        if (!panZoomPlugin) return;

        panZoomPlugin.zoom(0.2);
    });

    document.getElementById('zoom-out')?.addEventListener('click', () => {
        const panZoomPlugin = lib.getPlugin(PanZoomPlugin);

        if (!panZoomPlugin) return;

        panZoomPlugin.zoom(-0.2);
    });

    document.getElementById('galaxy-tab')?.addEventListener('click', () => {
        setCurrentView(lib, 'galaxy');
    });

    document.getElementById('system-tab')?.addEventListener('click', () => {
        setCurrentView(lib, 'system');
    });

    document.getElementById('missions-tab')?.addEventListener('click', () => {
        setCurrentView(lib, 'missions');
    });
}
