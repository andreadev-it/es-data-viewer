import { ParsedData } from "../../es-data/ParsedData";
import { PanZoomPlugin } from "@andreadev/canvas-lib/dist/modules/pan-zoom-plugin";
import { View } from "./abstract";
import { CanvasLib } from "@andreadev/canvas-lib";


export class GalaxyView extends EventTarget implements View {

    shouldRenderNames = true;
    shouldRenderLinks = true;
    shouldRenderDots  = true;
    shouldRenderGalaxies = true;
    shouldRenderWormholeLinks = true;
    shouldRenderHiddenWormholes = true;

    constructor(private esData: ParsedData, private canvasLib: CanvasLib) { super(); }

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
