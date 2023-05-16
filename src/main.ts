import { parse } from './src/parse';
import { filesLoaded, initCanvasLib } from './src/setupCanvasLib';
import { openDirectory } from './utils';
import { CanvasLib } from '@andreadev/canvas-lib';
import { bindUI } from './src/ui';

let lib: CanvasLib | null = null;

async function initApp() {
    const filesInfo = await openDirectory();

    const data = await parse(filesInfo);

    let canvas = document.getElementById('viewer') as HTMLCanvasElement;

    lib = initCanvasLib(canvas);
    
    filesLoaded(lib, data);

    bindUI(lib);
};

// Bind open project button
document.getElementById('select-file')?.addEventListener('click', () => {
    initApp();
});
