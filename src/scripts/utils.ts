export const openDirectory = async (): Promise<File[]> => {
    // Use older apis because File System Access API seems to be working unnaturally
    return new Promise((resolve) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.webkitdirectory = true;
        
        input.addEventListener('change', () => {
            let files = Array.from(input.files as FileList);
            resolve(files);
        });
        if ('showPicker' in HTMLInputElement.prototype) {
            input.showPicker();
        } else {
            input.click();
        }
    });
};

// This should probably used in the library
export const throttle = (fn: Function, wait: number = 300) => {
    let inThrottle: boolean;
    let lastFn: ReturnType<typeof setTimeout>;
    let lastTime: number;

    return function (this: any) {
        const context = this,
        args = arguments;
        if (!inThrottle) {
            fn.apply(context, args);
            lastTime = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(() => {
                if (Date.now() - lastTime >= wait) {
                    fn.apply(context, args);
                    lastTime = Date.now();
                }
            }, Math.max(wait - (Date.now() - lastTime), 0));
        }
    };
};

// Load image
export function loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => {
            resolve(img);
        }
        img.onerror = () => {
            reject();
        }
        img.src = URL.createObjectURL(file);
    });
}

/*
 * Load an html template built with text and insert it into an
 * element by its query selector
 */
export function loadTemplate(template: string, parentSelector: string) {
    let parent = document.querySelector(parentSelector);
    if (!parent) {
        throw new Error(`Cannot load template because parent element doesn't exists ("${parentSelector}")`);
    }

    let templateEl = document.createElement('template');
    templateEl.innerHTML = template;
    let node = templateEl.content.firstChild?.cloneNode(true)!;

    parent.appendChild(node);
}

export interface AppState {
    selectedSystem: string | null,
}

export function setState(state: AppState) {
    history.pushState(state, '');
}

export function getState(): AppState | null {
    return history.state;
}
