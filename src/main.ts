import { parseFiles } from 'es-data-parser';
import { filesLoaded, initCanvasLib } from './scripts/setupCanvasLib';
import { openDirectory } from './scripts/utils';
import { CanvasLib } from '@andreadev/canvas-lib';
import { bindUI } from './scripts/ui';
import { SpriteList } from './scripts/game-functions/sprites';

let lib: CanvasLib | null = null;

async function initApp() {
    const filesInfo = await openDirectory();

    const dataFiles = filesInfo.filter(file => file.webkitRelativePath.match(/^([^\/]*\/)?data\//) != null);

    const data = await parseFiles(dataFiles);
    const sprites = extractSprites(filesInfo);

    let canvas = document.getElementById('viewer') as HTMLCanvasElement;

    lib = initCanvasLib(canvas);
    
    filesLoaded(lib, sprites, data);

    bindUI(lib, data);
};

function extractSprites(files: File[]) {
    const spriteList = new SpriteList();
    for (let file of files) {
        if (file.webkitRelativePath.includes('images/')) {
            let spriteName = file.webkitRelativePath.split('images/')[1];
            spriteName = spriteName.replace(/([+\-~])?\.\w+$/, '');
            spriteList.sprites.set(spriteName, file);
        }
    }
    return spriteList;
}

// Bind open project button
document.getElementById('select-file')?.addEventListener('click', () => {
    initApp();
});
