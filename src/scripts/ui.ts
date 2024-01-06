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

    let systemSelect = document.getElementById('system-selection')!;
    for (let systemName of data.starSystems.keys()) {
        let opt = document.createElement('option');
        opt.value = systemName;
        opt.innerText = systemName;
        systemSelect.appendChild(opt);
    }

    document.getElementById('galaxy-tab')?.addEventListener('click', () => {
        setCurrentView(lib, 'galaxy');
    });

    document.getElementById('system-tab')?.addEventListener('click', () => {
        setCurrentView(lib, 'system');
    });
}
