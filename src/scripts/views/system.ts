import { ParsedData, System } from "es-data-parser";
import { View } from "./abstract";
import { SpriteList } from "../game-functions/sprites";
import { CanvasLib } from "@andreadev/canvas-lib";
import { RenderingProp } from "@andreadev/canvas-lib/dist/main";
import { renderObject, renderObjectOrbit } from "../game-functions/object";

export class SystemView extends EventTarget implements View {
    system: System | null = null;
    shouldRenderOrbits = true;
    shouldRenderObjects = true;

    constructor(private esData: ParsedData, private spriteList: SpriteList, private canvasLib: CanvasLib) {
        super();

        this.esData = esData;
        this.canvasLib = canvasLib;
    }

    async setSystem(systemName: string) {
        if (!this.esData.starSystems.has(systemName)) {
            throw new Error("System name not found");
        }

        this.system = this.esData.starSystems.get(systemName)!;

        await this.preloadObjectsSprites();
    }

    async activate(lib: CanvasLib) {
        document.getElementById('toggle-orbits')?.addEventListener('change', this.toggleOrbits.bind(this));
        document.getElementById('toggle-objects')?.addEventListener('change', this.toggleObjects.bind(this));

        let systemList = <HTMLSelectElement> document.getElementById('system-selection');
        systemList.addEventListener('change', (e) => {
            let systemName = (<HTMLSelectElement>e.target).selectedOptions[0]?.value;
            this.setSystem(systemName);
            lib.paint();
        });

        if (systemList.value != '-') {
            this.setSystem(systemList.value);
        }

        await this.preloadObjectsSprites();

        lib.addLayer('background', 0);
        lib.addLayer('boundaries', 1);
        lib.addLayer('objects', 2);

        lib.on('objects', this.renderOrbits.bind(this));
        lib.on('objects', this.renderObjects.bind(this));
    }

    async deactivate(lib: CanvasLib) {
        lib.removeLayer('background');
        lib.removeLayer('boundaries');
        lib.removeLayer('objects');
    }

    async preloadObjectsSprites() {
        if (!this.system) return;

        for (let object of this.system.objects.values()) {
            if (!object.sprite) continue;

            let spriteFile = this.spriteList.sprites.get(object.sprite.name);
            if (!spriteFile) continue;

            await this.spriteList.load(object.sprite.name, spriteFile);
        }
    }

    toggleOrbits(e: Event) {
        this.shouldRenderOrbits = (<HTMLInputElement>e.target).checked;
        this.canvasLib.paint();
    }

    toggleObjects(e: Event) {
        this.shouldRenderObjects = (<HTMLInputElement>e.target).checked;
        this.canvasLib.paint();
    }

    async renderOrbits({ context }: RenderingProp) {
        if (!this.esData || !this.system) return;

        if (!this.shouldRenderOrbits) return;

        context.strokeStyle = 'blue';
        for (let object of this.system.objects.values()) {
            await renderObjectOrbit(object, context);
        }
        // reset to default
        context.strokeStyle = '#000';
    }

    async renderObjects({ context }: RenderingProp) {
        if (!this.esData || !this.system) return;

        if (!this.shouldRenderObjects) return;

        for (let object of this.system.objects.values()) {
            await renderObject(object, this.spriteList, context);
        }
    }
}
