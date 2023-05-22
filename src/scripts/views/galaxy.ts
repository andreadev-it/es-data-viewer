import { ParsedData, SystemObject } from "es-data-parser";
import { PanZoomPlugin } from "@andreadev/canvas-lib/dist/modules/pan-zoom-plugin";
import { View } from "./abstract";
import { CanvasLib } from "@andreadev/canvas-lib";
import { System } from "es-data-parser";
import { distanceFromSystem } from "../game-functions/system";
import { renderSystemSelection, renderSystemPin, renderSystemLinks, renderSystemName } from "../game-functions/system";
import { renderGalaxy } from "../game-functions/galaxy";
import { SpriteList } from "../game-functions/sprites";


export class GalaxyView extends EventTarget implements View {

    shouldRenderNames = true;
    shouldRenderLinks = true;
    shouldRenderDots  = true;
    shouldRenderGalaxies = true;
    shouldRenderWormholeLinks = true;
    shouldRenderHiddenWormholes = false;
    currentlySelected: System | null = null;
    systemLinksCache: Set<string> = new Set();

    constructor(private esData: ParsedData, private spriteList: SpriteList, private canvasLib: CanvasLib) { 
        super();

        this.canvasLib.canvas.addEventListener('pointerdown', this.onCanvasClick.bind(this));
    }

    async activate() {
        document.getElementById('toggle-galaxies')?.addEventListener('change', this.toggleGalaxies.bind(this))
        document.getElementById('toggle-pins')?.addEventListener('change', this.toggleDots.bind(this))
        document.getElementById('toggle-names')?.addEventListener('change', this.toggleNames.bind(this))
        document.getElementById('toggle-links')?.addEventListener('change', this.toggleLinks.bind(this))
        document.getElementById('toggle-wormholes')?.addEventListener('change', this.toggleWormholes.bind(this))
        document.getElementById('toggle-hidden-wormholes')?.addEventListener('change', this.toggleHiddenWormholes.bind(this))

        this.buildSystemLinksCache();

        await this.preloadGalaxySprites();
    }

    async deactivate() {
        // Removing event listeners will not work because of "bind"
        // document.getElementById('toggle-galaxies')?.removeEventListener('change', this.toggleGalaxies)
        // document.getElementById('toggle-pins')?.addEventListener('change', this.toggleDots)
        // document.getElementById('toggle-names')?.addEventListener('change', this.toggleNames)
        // document.getElementById('toggle-links')?.addEventListener('change', this.toggleLinks)
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
        
        this.canvasLib.paint();
    }

    updateStarSystemInfo(system: System) {
        document.querySelector('#system-name .value')!.textContent = system.name;
        document.querySelector('#system-position .value')!.textContent = `${system.position.x} - ${system.position.y}`;
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

    async preRender(ctx: CanvasRenderingContext2D) {
        if (!this.esData) return;

        // Draw all galaxies
        if (this.shouldRenderGalaxies) {
            for (let galaxy of this.esData.galaxies.values()) {
                await renderGalaxy(galaxy, this.spriteList, ctx);
            }
        }

        if (this.shouldRenderLinks) {
            // Draw all links
            ctx.lineWidth = PanZoomPlugin.fixedNumber(1, ctx);
            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            for (let link of this.systemLinksCache.values()) {
                let [originName, targetName] = link.split('___');

                let origin = this.esData.starSystems.get(originName);
                let target = this.esData.starSystems.get(targetName);

                if (!target || !origin)
                    continue;

                ctx.beginPath();
                ctx.moveTo(origin.position.x, origin.position.y);

                ctx.lineTo(target.position.x, target.position.y);
                ctx.stroke();
            }
        }

        if (this.shouldRenderWormholeLinks) {
            // Draw all links
            ctx.lineWidth = PanZoomPlugin.fixedNumber(1, ctx);
            ctx.strokeStyle = 'rgba(100,100,255,0.5)';
            for (let wormhole of this.esData.wormholes.values()) {
                if (!wormhole.isMappable && !this.shouldRenderHiddenWormholes) continue;

                for (let link of wormhole.links) {
                    let [originName, targetName] = link;

                    let origin = this.esData.starSystems.get(originName);
                    let target = this.esData.starSystems.get(targetName);

                    if (!target || !origin)
                        continue;

                    ctx.beginPath();
                    ctx.moveTo(origin.position.x, origin.position.y);

                    ctx.lineTo(target.position.x, target.position.y);
                    ctx.stroke();
                }
            }
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        if (!this.esData) return;

        // Draw all systems
        for (let system of this.esData.starSystems.values()) {
            if (this.currentlySelected == system)
                renderSystemSelection(system, ctx);

            // if (this.shouldRenderLinks) {
            //     renderSystemLinks(system, ctx);
            // }

            if (this.shouldRenderDots) {
                renderSystemPin(system, ctx);
            }

            if (this.shouldRenderNames) {
                renderSystemName(system, ctx);
            }
        }
    }

    postRender(ctx: CanvasRenderingContext2D) {

    }
}
