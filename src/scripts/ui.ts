import { CanvasLib } from "@andreadev/canvas-lib";
import { PanZoomPlugin } from "@andreadev/canvas-lib/dist/modules/pan-zoom-plugin";


export function bindUI(lib: CanvasLib) {
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

    document.getElementById('viewer')?.addEventListener('pointerdown', (e) => {
        const panZoomPlugin = lib.getPlugin(PanZoomPlugin);

        if (!panZoomPlugin) return;

        console.log(panZoomPlugin.screenToLocalPoint(e.clientX, e.clientY));
    })
}
