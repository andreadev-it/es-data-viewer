import { ParsedData } from "../../es-data/ParsedData";
import { PanZoomPlugin } from "@andreadev/canvas-lib/dist/modules/pan-zoom-plugin";
import { View } from "./abstract";
import { CanvasLib } from "@andreadev/canvas-lib";
import { StarSystem } from "../../es-data/StarSystem";


export class GalaxyView extends EventTarget implements View {

    shouldRenderNames = true;
    shouldRenderLinks = true;
    shouldRenderDots  = true;
    shouldRenderGalaxies = true;
    shouldRenderWormholeLinks = true;
    shouldRenderHiddenWormholes = false;
    currentlySelected: StarSystem | null = null;

    constructor(private esData: ParsedData, private canvasLib: CanvasLib) { 
        super();

        this.canvasLib.canvas.addEventListener('pointerdown', this.onCanvasClick.bind(this));
    }

    activate() {
        document.getElementById('toggle-galaxies')?.addEventListener('change', this.toggleGalaxies.bind(this))
        document.getElementById('toggle-pins')?.addEventListener('change', this.toggleDots.bind(this))
        document.getElementById('toggle-names')?.addEventListener('change', this.toggleNames.bind(this))
        document.getElementById('toggle-links')?.addEventListener('change', this.toggleLinks.bind(this))
        document.getElementById('toggle-wormholes')?.addEventListener('change', this.toggleWormholes.bind(this))
        document.getElementById('toggle-hidden-wormholes')?.addEventListener('change', this.toggleHiddenWormholes.bind(this))
    }

    deactivate() {
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

        let closest: StarSystem | null = null;
        let closestDistance = 10000; // High number
        let minimumDistance = 10;
        let ctx = this.canvasLib.canvas.getContext('2d');
        if (ctx) {
            minimumDistance = PanZoomPlugin.fixedNumber(10, ctx);
        }

        for (let system of this.esData.starSystems.values()) {
            let d = system.distanceFrom(point);
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

    selectSystem(system: StarSystem) {

        if (this.currentlySelected)
            this.currentlySelected.isSelected = false;

        this.currentlySelected = system;
        system.isSelected = true;
        this.updateStarSystemInfo(system);
        
        this.canvasLib.paint();
    }

    updateStarSystemInfo(system: StarSystem) {
        document.querySelector('#system-name .value')!.textContent = system.name;
        document.querySelector('#system-position .value')!.textContent = `${system.position.x} - ${system.position.y}`;
        document.querySelector('#system-government .value')!.textContent = system.government;
        document.querySelector('#system-attributes .value')!.textContent = system.attributes.join(', ');
    }

    preRender(ctx: CanvasRenderingContext2D) {
        if (!this.esData) return;

        // Draw all galaxies
        if (this.shouldRenderGalaxies) {
            for (let galaxy of this.esData.galaxies.values()) {
                galaxy.render(ctx);
            }
        }

        if (this.shouldRenderLinks) {
            // Draw all links
            ctx.lineWidth = PanZoomPlugin.fixedNumber(1, ctx);
            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            for (let link of this.esData.starSystemsLinks.values()) {
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
            system.renderSelection(ctx);

            if (this.shouldRenderDots) {
                system.renderDot(ctx);
            }
            if (this.shouldRenderNames) {
                system.renderName(ctx);
            }
        }
    }

    postRender(ctx: CanvasRenderingContext2D) {

    }
}
