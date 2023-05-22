export interface View extends EventTarget {
    render: (ctx: CanvasRenderingContext2D) => void;
    preRender: (ctx: CanvasRenderingContext2D) => void;
    postRender: (ctx: CanvasRenderingContext2D) => void;
    activate: () => Promise<void>;
    deactivate: () => Promise<void>;
}
