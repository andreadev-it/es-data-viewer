import { ParsedData, SystemObject } from "es-data-parser";
import { PanZoomPlugin } from "@andreadev/canvas-lib/dist/modules/pan-zoom-plugin";
import { View } from "./abstract";
import { CanvasLib } from "@andreadev/canvas-lib";
import { System } from "es-data-parser";
import { distanceFromSystem } from "../game-functions/system";
import { renderSystemSelection, renderSystemPin, renderSystemLinks, renderSystemName } from "../game-functions/system";
import { renderGalaxy } from "../game-functions/galaxy";
import { SpriteList } from "../game-functions/sprites";
import { RenderingProp } from "@andreadev/canvas-lib/dist/main";


export class GalaxyView extends EventTarget implements View {

    shouldRenderNames = true;
    shouldRenderLinks = true;
    shouldRenderDots  = true;
    shouldRenderGalaxies = true;
    shouldRenderWormholeLinks = true;
    shouldRenderHiddenWormholes = false;
    currentlySelected: System | null = null;
    systemLinksCache: Set<string> = new Set();
    savedZoom: number = 1;
    savedPosition = {x: 0, y: 0};

    constructor(private esData: ParsedData, private spriteList: SpriteList, private canvasLib: CanvasLib) { 
        super();

        this.esData = esData;
        this.canvasLib.canvas.addEventListener('pointerdown', this.onCanvasClick.bind(this));
    }

    async activate(lib: CanvasLib) {
        document.getElementById('toggle-galaxies')?.addEventListener('change', this.toggleGalaxies.bind(this))
        document.getElementById('toggle-pins')?.addEventListener('change', this.toggleDots.bind(this))
        document.getElementById('toggle-names')?.addEventListener('change', this.toggleNames.bind(this))
        document.getElementById('toggle-links')?.addEventListener('change', this.toggleLinks.bind(this))
        document.getElementById('toggle-wormholes')?.addEventListener('change', this.toggleWormholes.bind(this))
        document.getElementById('toggle-hidden-wormholes')?.addEventListener('change', this.toggleHiddenWormholes.bind(this))

        this.buildSystemLinksCache();

        await this.preloadGalaxySprites();

        lib.addLayer('galaxies', 0);
        lib.addLayer('links', 1);
        lib.addLayer('wormhole-links', 2);
        lib.addLayer('systems', 3);

        lib.on('galaxies', this.renderGalaxies.bind(this));
        lib.on('links', this.renderLinks.bind(this));
        lib.on('wormhole-links', this.renderWormholeLinks.bind(this));
        lib.on('systems', this.renderSystems.bind(this));

        // Reset lib zoom and position as when the view was left
        let panZoomPlug = lib.getPlugin(PanZoomPlugin)!;
        panZoomPlug.currentZoom = this.savedZoom;
        panZoomPlug.cameraOffset = this.savedPosition;
    }

    async deactivate(lib: CanvasLib) {
        // Removing event listeners will not work because of "bind"
        // document.getElementById('toggle-galaxies')?.removeEventListener('change', this.toggleGalaxies)
        // document.getElementById('toggle-pins')?.addEventListener('change', this.toggleDots)
        // document.getElementById('toggle-names')?.addEventListener('change', this.toggleNames)
        // document.getElementById('toggle-links')?.addEventListener('change', this.toggleLinks)
        lib.removeLayer('galaxies');
        lib.removeLayer('links');
        lib.removeLayer('wormhole-links');
        lib.removeLayer('systems');

        let panZoomPlug = lib.getPlugin(PanZoomPlugin)!;
        this.savedZoom = panZoomPlug.currentZoom;
        this.savedPosition = panZoomPlug.cameraOffset;
    }

    toggleNames(e: Event) {
        this.shouldRenderNames = (<HTMLInputElement>e.target).checked; 
        this.canvasLib.paint();
    }
    toggleLinks(e: Event) {
        this.shouldRenderLinks = (<HTMLInputElement>e.target).checked; 
        this.canvasLib.paint();
    }
    toggleDots(e: Event) {
        this.shouldRenderDots = (<HTMLInputElement>e.target).checked; 
        this.canvasLib.paint();
    }
    toggleGalaxies(e: Event) {
        this.shouldRenderGalaxies = (<HTMLInputElement>e.target).checked; 
        this.canvasLib.paint();
    }
    toggleWormholes(e: Event) {
        this.shouldRenderWormholeLinks = (<HTMLInputElement>e.target).checked; 
        this.canvasLib.paint();
    }
    toggleHiddenWormholes(e: Event) {
        this.shouldRenderHiddenWormholes = (<HTMLInputElement>e.target).checked; 
        this.canvasLib.paint();
    }

    onCanvasClick(e: PointerEvent) {
        if (e.button !== 0) return;

        let panZoomPlugin = this.canvasLib.getPlugin(PanZoomPlugin);
        if (!panZoomPlugin) return;

        let point = panZoomPlugin.screenToLocalPoint(e.clientX, e.clientY);

        let closest: System | null = null;
        let closestDistance = 10000; // High number
        let minimumDistance = 10;
        let ctx = this.canvasLib.canvas.getContext('2d');
        if (ctx) {
            minimumDistance = PanZoomPlugin.fixedNumber(10, ctx);
        }

        for (let system of this.esData.starSystems.values()) {
            let d = distanceFromSystem(system, point);
            if (d > minimumDistance) continue;

            if (!closest || d < closestDistance) {
                closest = system;
                closestDistance = d;
            }
        }

        if (!closest) {
            this.removeSelection();
            return;
        }

        this.selectSystem(closest);
    }

    removeSelection() {
        if (!this.currentlySelected) return;

        this.currentlySelected.isSelected = false;
        this.currentlySelected = null;

        this.canvasLib.paint();
    }

    selectSystem(system: System) {
        this.currentlySelected = system;
        this.updateStarSystemInfo(system);

        let systemList = <HTMLSelectElement> document.getElementById('system-selection');
        systemList.value = system.name;
        
        this.canvasLib.paint();
    }

    updateStarSystemInfo(system: System) {
        document.querySelector('#system-name .value')!.textContent = system.name;
        document.querySelector('#system-position .value')!.textContent = `${system.position.x}, ${system.position.y}`;
        document.querySelector('#system-government .value')!.textContent = system.government;
        document.querySelector('#system-attributes .value')!.textContent = system.attributes.join(', ');
    }

    buildSystemLinksCache() {
        this.systemLinksCache = new Set();
        for (let system of this.esData.starSystems.values()) {
            for (let linked of system.links) {
                let linkTxt = `${system.name}___${linked}`;
                let reverseLinkTxt = `${linked}___${system.name}`;

                if (this.systemLinksCache.has(reverseLinkTxt)) continue;

                this.systemLinksCache.add(linkTxt);
            }
        }
    }

    async preloadGalaxySprites() {
        for (let galaxy of this.esData.galaxies.values()) {
            let spriteFile = this.spriteList.sprites.get(galaxy.sprite);
            if (!spriteFile) continue;

            await this.spriteList.load(galaxy.sprite, spriteFile);
        }
    }

    async renderGalaxies({ context }: RenderingProp) {
        if (!this.esData) return;

        // Draw all galaxies
        if (this.shouldRenderGalaxies) {
            for (let galaxy of this.esData.galaxies.values()) {
                await renderGalaxy(galaxy, this.spriteList, context);
            }
        }
    }

    async renderLinks({ context }: RenderingProp) {
        if (!this.esData || !this.shouldRenderLinks) return;

        // Draw all links
        context.lineWidth = PanZoomPlugin.fixedNumber(1, context);
        context.strokeStyle = 'rgba(255,255,255,0.2)';
        for (let link of this.systemLinksCache.values()) {
            let [originName, targetName] = link.split('___');

            let origin = this.esData.starSystems.get(originName);
            let target = this.esData.starSystems.get(targetName);

            if (!target || !origin)
                continue;

            context.beginPath();
            context.moveTo(origin.position.x, origin.position.y);

            context.lineTo(target.position.x, target.position.y);
            context.stroke();
        }
    }

    async renderWormholeLinks({ context }: RenderingProp) {
        if (!this.esData || !this.shouldRenderWormholeLinks) return;

        // Draw all links
        context.lineWidth = PanZoomPlugin.fixedNumber(1, context);
        context.strokeStyle = 'rgba(100,100,255,0.5)';
        for (let wormhole of this.esData.wormholes.values()) {
            if (!wormhole.isMappable && !this.shouldRenderHiddenWormholes) continue;

            for (let link of wormhole.links) {
                let [originName, targetName] = link;

                let origin = this.esData.starSystems.get(originName);
                let target = this.esData.starSystems.get(targetName);

                if (!target || !origin)
                    continue;

                context.beginPath();
                context.moveTo(origin.position.x, origin.position.y);

                context.lineTo(target.position.x, target.position.y);
                context.stroke();
            }
        }
    }

    async renderSystems({ context }: RenderingProp) {
        if (!this.esData) return;

        // Draw all systems
        for (let system of this.esData.starSystems.values()) {
            if (this.currentlySelected == system)
                renderSystemSelection(system, context);

            if (this.shouldRenderDots) {
                renderSystemPin(system, context);
            }

            if (this.shouldRenderNames) {
                renderSystemName(system, context);
            }
        }
    }
}
