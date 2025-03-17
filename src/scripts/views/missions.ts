import { ParsedData } from "es-data-parser";
import { View } from "./abstract";
import { CanvasLib } from "@andreadev/canvas-lib";
import { SpriteList } from "../game-functions/sprites";
import { loadTemplate } from "../utils";
import { savefileLoad } from "./templates/missionTemplates";

interface SaveFileData {
    missions: string[];
}

export class MissionsView extends EventTarget implements View {
    private saveFileData: SaveFileData;

    constructor(private esData: ParsedData, private spriteList: SpriteList, private canvasLib: CanvasLib) {
        super();
        
        this.saveFileData = {
            missions: []
        };

        this.createAndBindUI();
    }

    createAndBindUI() {
        loadTemplate(savefileLoad, '.top-bar .middle');

        document.querySelector('#view-missions-savefile-picker input')?.addEventListener('change', this.onLoadSaveFile.bind(this));
    }

    onLoadSaveFile(_event: Event) {
        console.log("Loading save file...");
        
        let input: HTMLInputElement = document.querySelector('#view-missions-savefile-picker input')!;
        
        if (input.files == null) return;

        let file = input.files[0];

        if (file == null) return;

        let reader = new FileReader();
        reader.addEventListener('load', () => {
            let text: string = reader.result as string;
            this.parseSaveFile(text);
        });

        reader.readAsText(file);
    }

    parseSaveFile(text: string) {
        let [_, conditions] = text.split("\nconditions\n");
        let lines = conditions.split("\n");
        lines = lines.filter(line => {
            return line.includes(': offered"')
                || line.includes(': active"')
                || line.includes(': done"')
                || line.includes(': failed"')
                || line.includes(': declined"');
        });
        lines = lines.map(l => l.split('"')[1]);
        // TODO: continuare
        console.log(lines);
    }

    async activate(_lib: CanvasLib) {
        return;
    }

    async deactivate(_lib: CanvasLib) {
        return;
    }
}
