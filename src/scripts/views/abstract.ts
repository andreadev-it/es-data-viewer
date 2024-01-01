import { CanvasLib } from "@andreadev/canvas-lib";

export interface View extends EventTarget {
    activate: (lib: CanvasLib) => Promise<void>;
    deactivate: (lib: CanvasLib) => Promise<void>;
}
