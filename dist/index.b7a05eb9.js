// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"cnpQZ":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "7dd44675b7a05eb9";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"jeorp":[function(require,module,exports) {
var _esDataParser = require("es-data-parser");
var _setupCanvasLib = require("./scripts/setupCanvasLib");
var _utils = require("./scripts/utils");
var _ui = require("./scripts/ui");
var _sprites = require("./scripts/game-functions/sprites");
let lib = null;
async function initApp() {
    const filesInfo = await (0, _utils.openDirectory)();
    const dataFiles = filesInfo.filter((file)=>file.webkitRelativePath.match(/^([^\/]*\/)?data\//) != null);
    const data = await (0, _esDataParser.parseFiles)(dataFiles);
    const sprites = extractSprites(filesInfo);
    let canvas = document.getElementById("viewer");
    lib = (0, _setupCanvasLib.initCanvasLib)(canvas);
    (0, _setupCanvasLib.filesLoaded)(lib, sprites, data);
    (0, _ui.bindUI)(lib, data);
}
function extractSprites(files) {
    const spriteList = new (0, _sprites.SpriteList)();
    for (let file of files)if (file.webkitRelativePath.includes("images/")) {
        let spriteName = file.webkitRelativePath.split("images/")[1];
        spriteName = spriteName.replace(/([+\-~])?\.\w+$/, "");
        spriteList.sprites.set(spriteName, file);
    }
    return spriteList;
}
// Bind open project button
document.getElementById("select-file")?.addEventListener("click", ()=>{
    initApp();
});

},{"es-data-parser":"7eHvt","./scripts/setupCanvasLib":"hEqBo","./scripts/utils":"isRWn","./scripts/ui":"ec5tO","./scripts/game-functions/sprites":"6YijU"}],"7eHvt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "parseFile", ()=>(0, _main.parseFile));
parcelHelpers.export(exports, "parseFiles", ()=>(0, _main.parseFiles));
parcelHelpers.export(exports, "Color", ()=>(0, _color.Color));
parcelHelpers.export(exports, "Galaxy", ()=>(0, _galaxy.Galaxy));
parcelHelpers.export(exports, "Government", ()=>(0, _government.Government));
parcelHelpers.export(exports, "ParsedData", ()=>(0, _parsedData.ParsedData));
parcelHelpers.export(exports, "Planet", ()=>(0, _planet.Planet));
parcelHelpers.export(exports, "System", ()=>(0, _system.System));
parcelHelpers.export(exports, "SystemObject", ()=>(0, _systemObject.SystemObject));
parcelHelpers.export(exports, "Wormhole", ()=>(0, _wormhole.Wormhole));
var _main = require("./main");
var _color = require("./es-objects/Color");
var _galaxy = require("./es-objects/Galaxy");
var _government = require("./es-objects/Government");
var _parsedData = require("./es-objects/ParsedData");
var _planet = require("./es-objects/Planet");
var _system = require("./es-objects/System");
var _systemObject = require("./es-objects/SystemObject");
var _wormhole = require("./es-objects/Wormhole");

},{"./main":"dCwqG","./es-objects/Color":"fevHR","./es-objects/Galaxy":"63rg6","./es-objects/Government":"302R5","./es-objects/ParsedData":"hhyWd","./es-objects/Planet":"kxKap","./es-objects/System":"7BGYc","./es-objects/SystemObject":"3eLf2","./es-objects/Wormhole":"59jmQ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dCwqG":[function(require,module,exports) {
// import { parse } from "./parser";
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "parseFile", ()=>parseFile);
parcelHelpers.export(exports, "parseFiles", ()=>parseFiles);
var _parsedData = require("./es-objects/ParsedData");
var _lexer = require("./lexer");
var _parser = require("./parser");
var _utils = require("./utils");
async function parseFile(file, filename, previousData) {
    const parsedData = previousData !== null && previousData !== void 0 ? previousData : new (0, _parsedData.ParsedData)();
    let fileContent = await (0, _utils.readFile)(file);
    let data = (0, _lexer.lex)(fileContent, filename);
    (0, _parser.parse)(data, parsedData);
    return parsedData;
}
async function parseFiles(files) {
    const parsedData = new (0, _parsedData.ParsedData)();
    for (let file of files)await parseFile(file, file.webkitRelativePath, parsedData);
    return parsedData;
}

},{"./es-objects/ParsedData":"hhyWd","./lexer":"84vcG","./parser":"cdYk9","./utils":"fwZzy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hhyWd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ParsedData", ()=>ParsedData);
class ParsedData {
    constructor(){
        this.galaxies = new Map();
        this.starSystems = new Map();
        this.colors = new Map();
        this.governments = new Map();
        this.planets = new Map();
        this.wormholes = new Map();
        this.phrases = new Map();
        this.starAttributes = new Map();
        this.minables = new Map();
    }
    addGalaxy(galaxy) {
        this.galaxies.set(galaxy.name, galaxy);
    }
    addStarSystem(starSystem) {
        this.starSystems.set(starSystem.name, starSystem);
    }
    addColor(color) {
        this.colors.set(color.name, color);
    }
    addGovernment(gov) {
        this.governments.set(gov.name, gov);
    }
    addPlanet(planet) {
        this.planets.set(planet.name, planet);
    }
    addWormhole(wormhole) {
        this.wormholes.set(wormhole.name, wormhole);
    }
    addPhrase(phrase) {
        if (this.phrases.has(phrase.name)) this.phrases.get(phrase.name).push(phrase);
        else this.phrases.set(phrase.name, [
            phrase
        ]);
    }
    addStarAttribute(star) {
        this.starAttributes.set(star.name, star);
    }
    addMinable(minable) {
        this.minables.set(minable.name, minable);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"84vcG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "lex", ()=>lex);
var _structures = require("./structures");
function lex(data, filename = "") {
    const root = new (0, _structures.FileRoot)([], 0, filename);
    let isQuoteOpen = false;
    let isComment = false;
    let currentQuote = "";
    let currentLine = new (0, _structures.Line)([], 0);
    let currentToken = "";
    let parentLevels = [
        root
    ];
    for(let i = 0; i < data.length; i++){
        const c = data[i];
        let nextLine = null;
        if (isComment && c != "\n") continue;
        switch(c){
            // handle comments
            case "#":
                if (currentToken.length == 0 && !isQuoteOpen) isComment = true;
                break;
            // handle quotes
            case '"':
            case "`":
                if (isQuoteOpen && c == currentQuote) {
                    isQuoteOpen = false;
                    if (currentToken.length == 0) currentLine.tokens.push("");
                    break;
                }
                if (!isQuoteOpen && currentToken.length == 0) {
                    isQuoteOpen = true;
                    currentQuote = c;
                    break;
                }
                if (!isQuoteOpen) throw new Error(`Unescaped quote in string after ${currentToken}`);
                break;
            // handle newlines
            case "\n":
                if (currentToken != "" && !isComment) currentLine.tokens.push(currentToken);
                currentToken = "";
                isComment = false;
                nextLine = new (0, _structures.Line)([], 0);
                // ignore blank lines
                if (currentLine.tokens.length == 0) {
                    currentLine = nextLine;
                    continue;
                }
                // handle too much indentation
                if (currentLine.indentation > parentLevels.length - 1) throw new Error(`Unexpected indentation for line ${currentLine.tokens.join(" ")}`);
                // adding the line as children to its parent based on indentation
                if (currentLine.indentation >= 0) parentLevels[currentLine.indentation].children.push(currentLine);
                // adding new line as parent level for following data
                if (currentLine.indentation == parentLevels.length - 1) parentLevels.push(currentLine);
                else {
                    // if indentation is smaller then the number of parents, it means that
                    // previous deeper nested parents has ended their block, so we delete them
                    parentLevels = parentLevels.slice(0, currentLine.indentation + 1);
                    parentLevels.push(currentLine);
                }
                if (isQuoteOpen) throw new Error(`A quote was left open near: '${currentToken}'`);
                currentLine = nextLine;
                break;
            // handle spaces
            case " ":
                if (!isQuoteOpen) {
                    if (currentToken.length > 0) {
                        currentLine.tokens.push(currentToken);
                        currentToken = "";
                    }
                } else currentToken += " ";
                break;
            // handle tabs
            case "	":
                if (!isQuoteOpen && currentLine.tokens.length == 0 && currentToken.length == 0) currentLine.indentation++;
                else if (!isQuoteOpen && currentToken.length > 0) {
                    // Add tabs as token separators too to avoid the error in some official files
                    currentLine.tokens.push(currentToken);
                    currentToken = "";
                } else currentToken += "	";
                break;
            // handle other characters
            default:
                currentToken += c;
        }
    }
    return root;
}

},{"./structures":"3u9e4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3u9e4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Line", ()=>Line);
parcelHelpers.export(exports, "FileRoot", ()=>FileRoot);
class Line {
    constructor(tokens, indentation){
        this.tokens = tokens;
        this.indentation = indentation;
        this.children = [];
    }
    toString() {
        const tokensText = [
            ...this.tokens
        ];
        let text = "";
        for (const token of tokensText)if (token.includes(" ")) {
            if (token.includes('"')) text += "`" + token + "`";
            else text += `"${token}"`;
        } else text += token + " ";
        return text;
    }
}
class FileRoot extends Line {
    constructor(tokens, indentation, filename){
        super(tokens, indentation);
        this.tokens = tokens;
        this.indentation = indentation;
        this.isRoot = true;
        this.filename = filename;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cdYk9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "parse", ()=>parse);
var _parsedData = require("./es-objects/ParsedData");
var _system = require("./es-objects/System");
var _galaxy = require("./es-objects/Galaxy");
var _color = require("./es-objects/Color");
var _government = require("./es-objects/Government");
var _planet = require("./es-objects/Planet");
var _wormhole = require("./es-objects/Wormhole");
var _phrase = require("./es-objects/Phrase");
var _star = require("./es-objects/Star");
var _minable = require("./es-objects/Minable");
function parse(root, previousData = null) {
    const parsedData = previousData !== null && previousData !== void 0 ? previousData : new (0, _parsedData.ParsedData)();
    const unparsed = new Set();
    for (let child of root.children)switch(child.tokens[0]){
        case "system":
            parsedData.addStarSystem((0, _system.System).fromLine(parsedData, child));
            break;
        case "galaxy":
            parsedData.addGalaxy((0, _galaxy.Galaxy).fromLine(parsedData, child));
            break;
        case "color":
            parsedData.addColor((0, _color.Color).fromLine(parsedData, child));
            break;
        case "government":
            parsedData.addGovernment((0, _government.Government).fromLine(parsedData, child));
            break;
        case "planet":
            parsedData.addPlanet((0, _planet.Planet).fromLine(parsedData, child));
            break;
        case "wormhole":
            parsedData.addWormhole((0, _wormhole.Wormhole).fromLine(parsedData, child));
            break;
        case "phrase":
            parsedData.addPhrase((0, _phrase.Phrase).fromLine(parsedData, child));
            break;
        case "star":
            parsedData.addStarAttribute((0, _star.Star).fromLine(parsedData, child));
            break;
        case "minable":
            parsedData.addMinable((0, _minable.Minable).fromLine(parsedData, child));
            break;
        default:
            unparsed.add(child.tokens[0]);
    }
    return parsedData;
}

},{"./es-objects/ParsedData":"hhyWd","./es-objects/System":"7BGYc","./es-objects/Galaxy":"63rg6","./es-objects/Color":"fevHR","./es-objects/Government":"302R5","./es-objects/Planet":"kxKap","./es-objects/Wormhole":"59jmQ","./es-objects/Phrase":"b7MbR","./es-objects/Star":"7Yfdb","./es-objects/Minable":"4NlNT","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7BGYc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "System", ()=>System);
var _systemObject = require("./SystemObject");
var _travelDistance = require("./TravelDistance");
var _ramscoopModifier = require("./RamscoopModifier");
class System {
    constructor(data, name, pos){
        this.links = [];
        this.government = "";
        this.attributes = [];
        this.objects = [];
        this.inaccessible = false;
        this.hidden = false;
        this.shrouded = false;
        this.music = "";
        this.arrival = new (0, _travelDistance.TravelDistance)();
        this.departure = new (0, _travelDistance.TravelDistance)();
        this.ramscoop = new (0, _ramscoopModifier.RamscoopModifier)();
        this.habitable = 0;
        this.belt = {
            distance: 0,
            weight: 1
        };
        this.invisibleFence = 10000;
        this.jumpRange = 0;
        this.haze = "";
        this.asteroids = [];
        this.minables = [];
        this.trades = [];
        this.fleets = [];
        this.raids = [];
        this.noRaid = false;
        this.hazards = [];
        this.starfieldDensity = 1;
        this.isSelected = false;
        this.name = name;
        this.position = pos;
        this.esData = data;
    }
    static fromLine(data, dataLine) {
        if (dataLine.tokens[0] != "system") throw new Error("Not a system");
        const name = dataLine.tokens[1];
        const system = new System(data, name, {
            x: 0,
            y: 0
        });
        let foundPos = false;
        let links = [];
        const objects = [];
        let asteroids = [];
        let minables = [];
        let trades = [];
        let fleets = [];
        let raids = [];
        let hazards = [];
        for (let child of dataLine.children)switch(child.tokens[0]){
            // Extract the position
            case "pos":
                system.position = {
                    x: parseInt(child.tokens[1]),
                    y: parseInt(child.tokens[2])
                };
                foundPos = true;
                break;
            // Extract the links
            case "link":
                links.push(child.tokens[1]);
                break;
            // Set the system government
            case "government":
                system.government = child.tokens[1];
                break;
            // Save a list of attributes
            case "attributes":
                system.attributes = child.tokens.slice(1);
                break;
            // Parse the objects in the system
            case "object":
                objects.push((0, _systemObject.SystemObject).fromLine(data, child));
                break;
            // Parse the arrival distance
            case "arrival":
                system.arrival = (0, _travelDistance.TravelDistance).fromLine(data, child);
                break;
            // Parse the departure distance
            case "departure":
                system.departure = (0, _travelDistance.TravelDistance).fromLine(data, child);
                break;
            // Inaccessible system
            case "inaccessible":
                system.inaccessible = true;
                break;
            // Hidden system
            case "hidden":
                system.hidden = true;
                break;
            // Shrouded system
            case "shrouded":
                system.shrouded = true;
                break;
            // Music for this specific system
            case "music":
                system.music = child.tokens[1];
                break;
            // Changes to how the ramscoop works in this system
            case "ramscoop":
                system.ramscoop = (0, _ramscoopModifier.RamscoopModifier).fromLine(data, child);
                break;
            // Habitable zone
            case "habitable":
                system.habitable = parseInt(child.tokens[1]);
                break;
            // Data for the asteroid belt
            case "belt":
                system.belt = {
                    distance: parseInt(child.tokens[1]),
                    weight: child.tokens[2] ? parseFloat(child.tokens[2]) : 1
                };
                break;
            // Invisible fence distance for the NPCs
            case "invisible fence":
                system.invisibleFence = parseInt(child.tokens[1]);
                break;
            // Jump range
            case "jump range":
                system.jumpRange = parseInt(child.tokens[1]);
                break;
            // Haze sprite
            case "haze":
                system.haze = child.tokens[1];
                break;
            // Asteroid type data
            case "asteroids":
                asteroids.push({
                    name: child.tokens[1],
                    count: parseInt(child.tokens[2]),
                    energy: parseFloat(child.tokens[3])
                });
                break;
            // Mineable type data
            case "minables":
                minables.push({
                    name: child.tokens[1],
                    count: parseInt(child.tokens[2]),
                    energy: parseFloat(child.tokens[3])
                });
                break;
            // Trade info
            case "trade":
                trades.push({
                    commodity: child.tokens[1],
                    cost: parseInt(child.tokens[2])
                });
                break;
            // Fleets that will spawn
            case "fleet":
                fleets.push({
                    name: child.tokens[1],
                    period: parseInt(child.tokens[2])
                });
                break;
            // Raids coming into the system
            case "raid":
                raids.push({
                    fleet: child.tokens[1],
                    minAttraction: parseInt(child.tokens[2]),
                    maxAttraction: parseInt(child.tokens[3])
                });
                break;
            case "no raid":
                system.noRaid = true;
                break;
            // Hazards present in the system
            case "hazard":
                hazards.push({
                    name: child.tokens[1],
                    period: parseInt(child.tokens[2])
                });
                break;
            // Density of the stars in the background
            case "starfield density":
                system.starfieldDensity = parseFloat(child.tokens[1]);
                break;
        }
        if (!foundPos) throw new Error("No position found for this system");
        system.links = links;
        system.objects = objects;
        system.asteroids = asteroids;
        system.minables = minables;
        system.trades = trades;
        system.fleets = fleets;
        system.raids = raids;
        system.hazards = hazards;
        return system;
    }
}

},{"./SystemObject":"3eLf2","./TravelDistance":"ecMIU","./RamscoopModifier":"3gO3F","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3eLf2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SystemObject", ()=>SystemObject);
var _sprite = require("./Sprite");
class SystemObject {
    constructor(esData){
        this.esData = esData;
        this.name = "";
        this.sprite = null;
        this.distance = 0;
        this.period = 0;
        this.offset = 0;
        this.objects = [];
    }
    static fromLine(data, dataLine) {
        if (dataLine.tokens[0] != "object") throw new Error("Not an object");
        const systemObject = new SystemObject(data);
        systemObject.name = dataLine.tokens.length == 2 ? dataLine.tokens[1] : "";
        const objects = [];
        for (let child of dataLine.children)switch(child.tokens[0]){
            case "sprite":
                systemObject.sprite = (0, _sprite.Sprite).fromLine(data, child);
                break;
            case "distance":
                systemObject.distance = parseFloat(child.tokens[1]);
                break;
            case "period":
                systemObject.period = parseFloat(child.tokens[1]);
                break;
            case "offset":
                systemObject.offset = parseInt(child.tokens[1]);
                break;
            case "object":
                objects.push(SystemObject.fromLine(data, child));
        }
        systemObject.objects = objects;
        return systemObject;
    }
}

},{"./Sprite":"hYjyp","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hYjyp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Sprite", ()=>Sprite);
class Sprite {
    constructor(){
        this.name = "";
        this.scale = 1;
    }
    static fromLine(data, dataLine) {
        if (dataLine.tokens[0] != "sprite") throw new Error("Not a sprite");
        let sprite = new Sprite();
        sprite.name = dataLine.tokens[1];
        // check if there's a scaling for the sprite
        if (dataLine.children.length > 0) {
            if (dataLine.children[0].tokens[0] == "scale") sprite.scale = parseFloat(dataLine.children[0].tokens[1]);
        }
        return sprite;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ecMIU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TravelDistance", ()=>TravelDistance);
class TravelDistance {
    constructor(){
        this.link = 0;
        this.jump = 0;
    }
    static fromLine(data, dataLine) {
        if (dataLine.tokens[0] != "arrival" && dataLine.tokens[0] != "departure") throw new Error("Not a travel distance (either 'arrival' or 'departure')");
        let link = 0;
        let jump = 0;
        if (dataLine.tokens[1]) link = jump = parseInt(dataLine.tokens[1]);
        for (let child of dataLine.children)switch(child.tokens[0]){
            // Extract link distance
            case "link":
                link = parseInt(child.tokens[1]);
                break;
            // Extract jump distance
            case "jump":
                jump = parseInt(child.tokens[1]);
                break;
        }
        const distance = new TravelDistance();
        distance.link = link;
        distance.jump = jump;
        return distance;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3gO3F":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "RamscoopModifier", ()=>RamscoopModifier);
class RamscoopModifier {
    constructor(){
        this.universal = 1;
        this.addend = 0;
        this.multiplier = 1;
    }
    static fromLine(data, dataLine) {
        if (dataLine.tokens[0] != "ramscoop") throw new Error("Not a ramscoop data");
        let universal = 1;
        let addend = 0;
        let multiplier = 1;
        for (let child of dataLine.children)switch(child.tokens[0]){
            case "universal":
                universal = parseFloat(child.tokens[1]);
                break;
            case "addend":
                addend = parseFloat(child.tokens[1]);
                break;
            case "multiplier":
                multiplier = parseFloat(child.tokens[1]);
                break;
        }
        const ramscoop = new RamscoopModifier();
        ramscoop.universal = universal;
        ramscoop.addend = addend;
        ramscoop.multiplier = multiplier;
        return ramscoop;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"63rg6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Galaxy", ()=>Galaxy);
class Galaxy {
    constructor(data, name, pos){
        this.position = {
            x: 0,
            y: 0
        };
        this.sprite = "";
        this.name = name;
        this.position = pos;
        this.esData = data;
    }
    static fromLine(data, dataLine) {
        if (dataLine.tokens[0] != "galaxy") throw new Error("Not a galaxy");
        const name = dataLine.tokens[1];
        let pos = {
            x: 0,
            y: 0
        };
        let foundPos = false;
        let sprite = "";
        for (let child of dataLine.children){
            if (child.tokens[0] == "pos") {
                pos = {
                    x: parseInt(child.tokens[1]),
                    y: parseInt(child.tokens[2])
                };
                foundPos = true;
                continue;
            }
            if (child.tokens[0] == "sprite") sprite = child.tokens[1];
        }
        if (!foundPos) throw new Error("No position found for this system");
        const galaxy = new Galaxy(data, name, pos);
        galaxy.sprite = sprite;
        return galaxy;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fevHR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Color", ()=>Color);
class Color {
    constructor(name, r, g, b, a = 255){
        this.name = name;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    toString() {
        if (this.a == 255) return `rgb(${this.r}, ${this.g}, ${this.b})`;
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
    // The first argument is important to allow standardization across the different game objects
    static fromLine(_, dataLine) {
        let label = dataLine.tokens[1];
        let r = parseFloat(dataLine.tokens[2]);
        let g = parseFloat(dataLine.tokens[3]);
        let b = parseFloat(dataLine.tokens[4]);
        let a = 255;
        if (dataLine.tokens.length == 6) a = parseFloat(dataLine.tokens[5]);
        return Color.fromPercentages(label, r, g, b, a);
    }
    static fromPercentages(label, r, g, b, a) {
        return new Color(label, r * 255, g * 255, b * 255, a * 255);
    }
    static fromGovernment(data, govName) {
        let government = data.governments.get(govName);
        if (!government) return null;
        if (government.color instanceof Color) return government.color;
        let color = data.colors.get(government.color);
        if (!color) return null;
        return color;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"302R5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Government", ()=>Government);
var _color = require("./Color");
class Government {
    constructor(data, name){
        this.color = "";
        this.esData = data;
        this.name = name;
    }
    static fromLine(data, dataLine) {
        if (dataLine.tokens[0] != "government") throw new Error("Not a government");
        const name = dataLine.tokens[1];
        let color = "";
        for (let child of dataLine.children)if (child.tokens[0] == "color") {
            if (child.tokens.length == 2) color = child.tokens[1];
            else {
                let r = parseFloat(dataLine.tokens[1]);
                let g = parseFloat(dataLine.tokens[2]);
                let b = parseFloat(dataLine.tokens[3]);
                let a = 255;
                if (dataLine.tokens.length == 5) a = parseFloat(dataLine.tokens[4]);
                color = (0, _color.Color).fromPercentages("", r, g, b, a);
            }
        }
        const government = new Government(data, name);
        government.color = color;
        return government;
    }
}

},{"./Color":"fevHR","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kxKap":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Planet", ()=>Planet);
class Planet {
    constructor(esData, name){
        this.esData = esData;
        this.name = name;
        this.wormhole = "";
    }
    static fromLine(data, dataLine) {
        if (dataLine.tokens[0] != "planet") throw new Error("Not a planet");
        const name = dataLine.tokens[1];
        let wormhole = "";
        for (let child of dataLine.children)if (child.tokens[0] == "wormhole") wormhole = child.tokens[1];
        let planet = new Planet(data, name);
        planet.wormhole = wormhole;
        return planet;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"59jmQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Wormhole", ()=>Wormhole);
var _color = require("./Color");
class Wormhole {
    constructor(esData, name){
        this.esData = esData;
        this.name = name;
        this.isMappable = false;
        this.links = [];
        this.color = "";
    }
    static fromLine(data, dataLine) {
        if (dataLine.tokens[0] != "wormhole") throw new Error("Not a wormhole");
        const name = dataLine.tokens[1];
        let mappable = false;
        let color = "";
        let links = [];
        for (let child of dataLine.children)switch(child.tokens[0]){
            case "color":
                if (child.tokens.length == 2) color = child.tokens[1];
                else {
                    let r = parseFloat(dataLine.tokens[1]);
                    let g = parseFloat(dataLine.tokens[2]);
                    let b = parseFloat(dataLine.tokens[3]);
                    let a = 255;
                    if (dataLine.tokens.length == 5) a = parseFloat(dataLine.tokens[4]);
                    color = (0, _color.Color).fromPercentages("", r, g, b, a);
                }
                break;
            case "link":
                links.push([
                    child.tokens[1],
                    child.tokens[2]
                ]);
                break;
            case "mappable":
                mappable = true;
                break;
        }
        const wormhole = new Wormhole(data, name);
        wormhole.isMappable = mappable;
        wormhole.color = color;
        wormhole.links = links;
        return wormhole;
    }
}

},{"./Color":"fevHR","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"b7MbR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Phrase", ()=>Phrase);
var _word = require("./Word");
class Phrase {
    constructor(){
        this.name = "";
        this.pieces = [];
        this.replacements = [];
    }
    static fromLine(data, dataLine) {
        var _a;
        if (dataLine.tokens[0] != "phrase") throw new Error("Not a phrase");
        let phrase = new Phrase();
        phrase.name = (_a = dataLine.tokens[1]) !== null && _a !== void 0 ? _a : "";
        let pieces = [];
        let replacements = [];
        for (let child of dataLine.children)switch(child.tokens[0]){
            case "word":
                pieces.push((0, _word.Word).fromLine(data, child));
                break;
            case "phrase":
                pieces.push(this.phrasesNamesFromLine(child));
                break;
            case "replacements":
                replacements = this.replacementsFromLine(child);
                break;
        }
        phrase.pieces = pieces;
        phrase.replacements = replacements;
        return phrase;
    }
    static phrasesNamesFromLine(dataLine) {
        let names;
        names = dataLine.children.map((line)=>{
            var _a;
            return {
                data: line.tokens[0],
                weight: parseInt((_a = line.tokens[1]) !== null && _a !== void 0 ? _a : 1)
            };
        });
        return names;
    }
    static replacementsFromLine(dataLine) {
        let replacements;
        replacements = dataLine.children.map((line)=>{
            let from = line.tokens[0];
            let to = line.tokens[1];
            return [
                from,
                to
            ];
        });
        return replacements;
    }
}

},{"./Word":"kb52w","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kb52w":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Word", ()=>Word);
class Word {
    constructor(){
        this.texts = [];
    }
    static fromLine(data, dataLine) {
        var _a;
        if (dataLine.tokens[0] != "word") throw new Error("Not a word");
        let texts = [];
        for (let child of dataLine.children)texts.push({
            data: child.tokens[0],
            weight: parseInt((_a = child.tokens[1]) !== null && _a !== void 0 ? _a : 1)
        });
        let wordObj = new Word();
        wordObj.texts = texts;
        return wordObj;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7Yfdb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Star", ()=>Star);
class Star {
    constructor(){
        this.name = "";
        this.power = 1;
        this.wind = 1;
    }
    static fromLine(data, dataLine) {
        if (dataLine.tokens[0] != "star") throw new Error("Not a star");
        let star = new Star();
        star.name = dataLine.tokens[1];
        for (let child of dataLine.children)switch(child.tokens[0]){
            case "power":
                star.power = parseFloat(child.tokens[1]);
                break;
            case "wind":
                star.wind = parseFloat(child.tokens[1]);
                break;
        }
        return star;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4NlNT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Minable", ()=>Minable);
var _minablePayload = require("./MinablePayload");
class Minable {
    constructor(){
        this.name = "";
        this.displayName = "";
        this.noun = "Asteroid";
        this.sprite = "";
        this.hull = 0;
        this.randomHull = 0;
        this.payloads = [];
        this.explosions = [];
    }
    static fromLine(data, dataLine) {
        var _a;
        if (dataLine.tokens[0] != "minable") throw new Error("Not a minable");
        let minable = new Minable();
        minable.name = dataLine.tokens[1];
        minable.displayName = minable.name;
        let payloads = [];
        let explosions = [];
        for (let child of dataLine.children)switch(child.tokens[0]){
            case "display name":
                minable.displayName = child.tokens[1];
                break;
            case "noun":
                minable.noun = child.tokens[1];
                break;
            case "sprite":
                minable.sprite = child.tokens[1];
                break;
            case "hull":
                minable.hull = parseInt(child.tokens[1]);
                break;
            case "random hull":
                minable.randomHull = parseInt(child.tokens[1]);
                break;
            case "payload":
                payloads.push((0, _minablePayload.MinablePayload).fromLine(data, child));
                break;
            case "explode":
                explosions.push({
                    effect: child.tokens[1],
                    count: parseInt((_a = child.tokens[2]) !== null && _a !== void 0 ? _a : 1)
                });
                break;
        }
        minable.payloads = payloads;
        minable.explosions = explosions;
        return minable;
    }
}

},{"./MinablePayload":"79jzv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"79jzv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MinablePayload", ()=>MinablePayload);
class MinablePayload {
    constructor(){
        this.outfit = "";
        this.maxDrops = 1;
        this.dropRate = 0.25;
        this.toughness = 1;
    }
    static fromLine(data, dataLine) {
        if (dataLine.tokens[0] != "payload") throw new Error("Not a payload");
        let payload = new MinablePayload();
        payload.outfit = dataLine.tokens[1];
        if (dataLine.tokens[2]) payload.maxDrops = parseInt(dataLine.tokens[2]);
        for (let child of dataLine.children)switch(child.tokens[0]){
            case "max drops":
                payload.maxDrops = parseInt(child.tokens[1]);
                break;
            case "drop rate":
                payload.dropRate = parseFloat(child.tokens[1]);
                break;
            case "toughness":
                payload.toughness = parseInt(child.tokens[1]);
                break;
        }
        return payload;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fwZzy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "readFile", ()=>readFile);
function readFile(file) {
    return new Promise((resolve, _)=>{
        const reader = new FileReader();
        reader.onload = ()=>{
            resolve(reader.result);
        };
        reader.readAsText(file);
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hEqBo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initCanvasLib", ()=>initCanvasLib);
parcelHelpers.export(exports, "setCurrentView", ()=>setCurrentView);
parcelHelpers.export(exports, "filesLoaded", ()=>filesLoaded);
var _canvasLib = require("@andreadev/canvas-lib");
var _panZoomPlugin = require("@andreadev/canvas-lib/dist/modules/pan-zoom-plugin");
var _galaxy = require("./views/galaxy");
var _system = require("./views/system");
var _missions = require("./views/missions");
const views = {
    galaxy: null,
    system: null,
    missions: null
};
let currentView = null;
function initCanvasLib(canvas) {
    // Fix canvas dimensions
    let canvasBCR = canvas.getBoundingClientRect();
    canvas.width = canvasBCR.width;
    canvas.height = canvasBCR.height;
    const canvasLib = new (0, _canvasLib.CanvasLib)(canvas);
    canvasLib.use((0, _panZoomPlugin.PanZoomPlugin), {});
    return canvasLib;
}
async function setCurrentView(lib, viewName) {
    if (!(viewName in views)) throw new Error(`'${viewName}' is not a valid view.`);
    for (let name of Object.keys(views))document.body.classList.remove(`active-${name}`);
    document.body.classList.add(`active-${viewName}`);
    let view = views[viewName];
    // Deactivate the previous view
    await currentView?.deactivate(lib);
    // Reset zoom and panning
    let panZoomPlug = lib.getPlugin((0, _panZoomPlugin.PanZoomPlugin));
    panZoomPlug.currentZoom = 1;
    panZoomPlug.cameraOffset = {
        x: 0,
        y: 0
    };
    // Set the new view
    currentView = view;
    await currentView.activate(lib);
    await lib.paint();
}
async function filesLoaded(lib, sprites, data) {
    views.system = views.system ?? new (0, _system.SystemView)(data, sprites, lib);
    views.galaxy = views.galaxy ?? new (0, _galaxy.GalaxyView)(data, sprites, lib);
    views.missions = views.missions ?? new (0, _missions.MissionsView)(data, sprites, lib);
    await setCurrentView(lib, "galaxy");
    await lib.paint();
}

},{"@andreadev/canvas-lib":"hyshD","@andreadev/canvas-lib/dist/modules/pan-zoom-plugin":"5BQTv","./views/galaxy":"yrYA6","./views/system":"9LiF6","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./views/missions":"9nYt6"}],"hyshD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CanvasLib", ()=>(0, _main.CanvasLib));
var _main = require("./main");

},{"./main":"FlGcK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"FlGcK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CanvasLib", ()=>CanvasLib);
var _customEventTarget = require("@andreadev/custom-event-target");
class CanvasLib extends (0, _customEventTarget.CustomEventTarget) {
    constructor(canvas){
        super();
        this.canvas = canvas;
        this.plugins = new Map();
        this.layers = [];
        this.layersActions = new (0, _customEventTarget.CustomEventTarget)();
        const ctx = this.canvas.getContext("2d");
        if (ctx == null) throw "Could not get the context for the canvas";
        this.context = ctx;
    }
    async renderCycle() {
        await this.paint();
        window.requestAnimationFrame(()=>this.renderCycle());
    }
    use(PluginClass, settings) {
        const plugin = new PluginClass(this, settings);
        this.plugins.set(plugin.name, plugin);
    }
    getPlugin(PluginClass) {
        for (let plugin of this.plugins.values()){
            if (plugin instanceof PluginClass) return plugin;
        }
        return undefined;
    }
    /**
     * Main paint function for the canvas
     *
     * @param shouldClear If true, clear the canvas before painting
     */ async paint(shouldClear = true) {
        this.prepareContext(shouldClear);
        const prop = {
            context: this.context
        };
        await this.layersActions.fireEvent("_prerender", prop);
        for (let layer of this.layers)await this.layersActions.fireEvent(layer.name, prop);
        await this.layersActions.fireEvent("_postrender", prop);
    }
    prepareContext(shouldClear = true) {
        this.context.resetTransform();
        if (shouldClear) this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.translate(Math.floor(this.canvas.width / 2), Math.floor(this.canvas.height / 2));
    }
    /**
     * Add a new layer to handle drawing on multiple levels
     */ addLayer(name, order) {
        this.layers.push({
            name,
            order
        });
        this.layers.sort((a, b)=>a.order - b.order);
    }
    /**
     * Remove a layer
     */ removeLayer(name) {
        this.layers.splice(this.layers.findIndex((l)=>l.name == name), 1);
        this.layersActions.clearListeners(name);
    }
    /**
     * Just a utility function to make the user code less heavy
     */ on(layer, callback) {
        this.layersActions.addListener(layer, callback);
    }
    remove(layer, callback) {
        this.layersActions.removeListener(layer, callback);
    }
    startRendering() {
        window.requestAnimationFrame(()=>this.renderCycle());
    }
}

},{"@andreadev/custom-event-target":"iLa84","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iLa84":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CustomEventTarget", ()=>CustomEventTarget);
class CustomEventTarget {
    listeners;
    constructor(){
        this.listeners = new Map();
    }
    addListener(event, listener) {
        if (!this.listeners.has(event)) this.listeners.set(event, []);
        this.listeners.get(event).push(listener);
    }
    removeListener(event, listener) {
        if (!this.listeners.has(event)) return;
        let listeners = this.listeners.get(event);
        let index = listeners.findIndex((x)=>x === listener);
        if (index >= 0) listeners.splice(index, 1);
        this.listeners.set(event, listeners);
    }
    /**
     * Clear all listeners for the specified event
     */ clearListeners(event) {
        if (!this.listeners.has(event)) return;
        this.listeners.set(event, []);
    }
    /**
     * Clear all listeners for all the events
     */ clearAllListeners() {
        this.listeners.clear();
    }
    /**
     * Call all the listeners for a specific event in a synchronous way.
     * If an async listener is found, it gets awaited before continuing.
     */ async fireEvent(event, details) {
        if (!this.listeners.has(event)) return;
        for (let listener of this.listeners.get(event)){
            let val = listener(details);
            if (val instanceof Promise) await val;
        }
    }
    /**
     * Call all the listeners for a specific event in an asynchronous way.
     * All the async listeners found are awaited using Promise.all().
     */ async fireEventAsync(event, details) {
        if (!this.listeners.has(event)) return;
        let promises = [];
        for (let listener of this.listeners.get(event)){
            let ret = listener(details);
            if (ret instanceof Promise) promises.push(ret);
        }
        await Promise.all(promises);
    }
    /**
     * Call all the listeners for a specific event as if they were all
     * synchronous functions. Not recommended, since it doesn't handle
     * async at all. Only use it when all listeners are synchronous.
     */ fireEventSync(event, details) {
        if (!this.listeners.has(event)) return;
        for (let listener of this.listeners.get(event))listener(details);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5BQTv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PanZoomPlugin", ()=>PanZoomPlugin);
var _utils = require("../utils");
class PanZoomPlugin {
    constructor(app, settings){
        var _a, _b, _c;
        this.app = app;
        this.settings = settings;
        this.name = "PanZoom";
        this.currentZoom = 1;
        this.minZoom = 0.1;
        this.maxZoom = 10;
        this.panButton = 1; // Middle
        this.cameraOffset = {
            x: 0,
            y: 0
        };
        this.isPanning = false;
        this.startedPanningOffset = {
            x: 0,
            y: 0
        };
        this.startedPanningPosition = {
            x: 0,
            y: 0
        };
        this.throttle = -1;
        this.bindEvents();
        this.minZoom = (_a = settings.minZoom) !== null && _a !== void 0 ? _a : this.minZoom;
        this.maxZoom = (_b = settings.maxZoom) !== null && _b !== void 0 ? _b : this.maxZoom;
        this.throttle = (_c = settings.throttle) !== null && _c !== void 0 ? _c : this.throttle;
        this.throttledPaint = (0, _utils.throttle)(this.app.paint.bind(this.app), this.throttle);
        let mouseButtons = {
            "left": 0,
            "middle": 1,
            "right": 2,
            "any": -1
        };
        if (settings.panButton) this.panButton = mouseButtons[settings.panButton];
    }
    bindEvents() {
        this.app.on("_prerender", this.transformCanvas.bind(this));
        this.app.canvas.addEventListener("pointerdown", this.onPointerDown.bind(this));
        this.app.canvas.addEventListener("pointerup", this.onPointerUp.bind(this));
        this.app.canvas.addEventListener("pointermove", this.onPointerMove.bind(this));
        this.app.canvas.addEventListener("pointerleave", this.onPointerUp.bind(this));
        this.app.canvas.addEventListener("wheel", this.onScroll.bind(this));
    }
    screenToLocalPoint(x, y) {
        let hw = this.app.canvas.width / 2;
        let hh = this.app.canvas.height / 2;
        let tx = this.cameraOffset.x;
        let ty = this.cameraOffset.y;
        let z = this.currentZoom;
        // center
        x = x - hw;
        y = y - hh;
        // scale
        x = x / z;
        y = y / z;
        // trnaslate
        x = x - tx;
        y = y - ty;
        return {
            x,
            y
        };
    }
    zoom(amount) {
        this.currentZoom += amount;
        this.currentZoom = Math.min(Math.max(this.minZoom, this.currentZoom), this.maxZoom);
        this.currentZoom = Math.floor(this.currentZoom * 1000) / 1000;
        this.updateRender();
    }
    transformCanvas(prop) {
        prop.context.scale(this.currentZoom, this.currentZoom);
        prop.context.translate(this.cameraOffset.x, this.cameraOffset.y);
    }
    onPointerDown(e) {
        if (e.button == this.panButton || this.panButton == -1) {
            this.isPanning = true;
            this.startedPanningOffset = this.cameraOffset;
            this.startedPanningPosition = {
                x: e.clientX,
                y: e.clientY
            };
        }
    }
    onPointerUp(_) {
        this.isPanning = false;
    }
    onPointerMove(e) {
        if (this.isPanning) {
            this.cameraOffset = {
                x: this.startedPanningOffset.x + (e.clientX - this.startedPanningPosition.x) / this.currentZoom,
                y: this.startedPanningOffset.y + (e.clientY - this.startedPanningPosition.y) / this.currentZoom
            };
            this.updateRender();
        }
    }
    onScroll(e) {
        this.zoom(e.deltaY / 1000);
    }
    updateRender() {
        if (this.throttle > 0) this.throttledPaint();
        else this.app.paint();
    }
    static getDataFromMatrix(matrix) {
        return {
            scaleX: matrix.a,
            scaleY: matrix.d,
            translateX: matrix.e,
            translateY: matrix.f,
            skewX: matrix.b,
            skewY: matrix.c
        };
    }
    static fixedNumber(number, context, direction = "x") {
        let { scaleX , scaleY  } = this.getDataFromMatrix(context.getTransform());
        return direction == "x" ? number * (1 / scaleX) : number * (1 / scaleY);
    }
    static fixedSize(width, height, context) {
        let { scaleX , scaleY  } = this.getDataFromMatrix(context.getTransform());
        return {
            width: width * (1 / scaleX),
            height: height * (1 / scaleY)
        };
    }
}

},{"../utils":"6hrCB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6hrCB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "throttle", ()=>throttle);
function throttle(func, wait) {
    let timeout;
    let isThrottled = false;
    return function() {
        if (isThrottled) return;
        const context = this;
        const args = arguments;
        func.apply(context, args);
        clearTimeout(timeout);
        timeout = setTimeout(()=>isThrottled = false, wait);
        isThrottled = true;
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"yrYA6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GalaxyView", ()=>GalaxyView);
var _panZoomPlugin = require("@andreadev/canvas-lib/dist/modules/pan-zoom-plugin");
var _system = require("../game-functions/system");
var _galaxy = require("../game-functions/galaxy");
var _utils = require("../utils");
var _galaxyTemplates = require("./templates/galaxyTemplates");
class GalaxyView extends EventTarget {
    constructor(esData, spriteList, canvasLib){
        super();
        this.esData = esData;
        this.spriteList = spriteList;
        this.canvasLib = canvasLib;
        this.shouldRenderNames = true;
        this.shouldRenderLinks = true;
        this.shouldRenderDots = true;
        this.shouldRenderGalaxies = true;
        this.shouldRenderWormholeLinks = true;
        this.shouldRenderHiddenWormholes = false;
        this.currentlySelected = null;
        this.systemLinksCache = new Set();
        this.savedZoom = 1;
        this.savedPosition = {
            x: 0,
            y: 0
        };
        this.esData = esData;
        this.canvasLib.canvas.addEventListener("pointerdown", this.onCanvasClick.bind(this));
        this.createAndBindUI();
    }
    createAndBindUI() {
        (0, _utils.loadTemplate)((0, _galaxyTemplates.galaxyViewOptions), ".left-bar .middle");
        (0, _utils.loadTemplate)((0, _galaxyTemplates.systemDetails), ".right-bar .middle");
        document.getElementById("toggle-galaxies")?.addEventListener("change", this.toggleGalaxies.bind(this));
        document.getElementById("toggle-pins")?.addEventListener("change", this.toggleDots.bind(this));
        document.getElementById("toggle-names")?.addEventListener("change", this.toggleNames.bind(this));
        document.getElementById("toggle-links")?.addEventListener("change", this.toggleLinks.bind(this));
        document.getElementById("toggle-wormholes")?.addEventListener("change", this.toggleWormholes.bind(this));
        document.getElementById("toggle-hidden-wormholes")?.addEventListener("change", this.toggleHiddenWormholes.bind(this));
    }
    async activate(lib) {
        this.buildSystemLinksCache();
        await this.preloadGalaxySprites();
        lib.addLayer("galaxies", 0);
        lib.addLayer("links", 1);
        lib.addLayer("wormhole-links", 2);
        lib.addLayer("systems", 3);
        lib.on("galaxies", this.renderGalaxies.bind(this));
        lib.on("links", this.renderLinks.bind(this));
        lib.on("wormhole-links", this.renderWormholeLinks.bind(this));
        lib.on("systems", this.renderSystems.bind(this));
        // Reset lib zoom and position as when the view was left
        let panZoomPlug = lib.getPlugin((0, _panZoomPlugin.PanZoomPlugin));
        panZoomPlug.currentZoom = this.savedZoom;
        panZoomPlug.cameraOffset = this.savedPosition;
    }
    async deactivate(lib) {
        lib.removeLayer("galaxies");
        lib.removeLayer("links");
        lib.removeLayer("wormhole-links");
        lib.removeLayer("systems");
        let panZoomPlug = lib.getPlugin((0, _panZoomPlugin.PanZoomPlugin));
        this.savedZoom = panZoomPlug.currentZoom;
        this.savedPosition = panZoomPlug.cameraOffset;
    }
    toggleNames(e) {
        this.shouldRenderNames = e.target.checked;
        this.canvasLib.paint();
    }
    toggleLinks(e) {
        this.shouldRenderLinks = e.target.checked;
        this.canvasLib.paint();
    }
    toggleDots(e) {
        this.shouldRenderDots = e.target.checked;
        this.canvasLib.paint();
    }
    toggleGalaxies(e) {
        this.shouldRenderGalaxies = e.target.checked;
        this.canvasLib.paint();
    }
    toggleWormholes(e) {
        this.shouldRenderWormholeLinks = e.target.checked;
        this.canvasLib.paint();
    }
    toggleHiddenWormholes(e) {
        this.shouldRenderHiddenWormholes = e.target.checked;
        this.canvasLib.paint();
    }
    onCanvasClick(e) {
        if (e.button !== 0) return;
        let panZoomPlugin = this.canvasLib.getPlugin((0, _panZoomPlugin.PanZoomPlugin));
        if (!panZoomPlugin) return;
        let point = panZoomPlugin.screenToLocalPoint(e.clientX, e.clientY);
        let closest = null;
        let closestDistance = 10000; // High number
        let minimumDistance = 10;
        let ctx = this.canvasLib.canvas.getContext("2d");
        if (ctx) minimumDistance = (0, _panZoomPlugin.PanZoomPlugin).fixedNumber(10, ctx);
        for (let system of this.esData.starSystems.values()){
            let d = (0, _system.distanceFromSystem)(system, point);
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
    selectSystem(system) {
        this.currentlySelected = system;
        this.updateStarSystemInfo(system);
        (0, _utils.setState)({
            selectedSystem: system.name
        });
        this.canvasLib.paint();
    }
    updateStarSystemInfo(system) {
        document.querySelector("#system-name .value").textContent = system.name;
        document.querySelector("#system-position .value").textContent = `${system.position.x}, ${system.position.y}`;
        document.querySelector("#system-government .value").textContent = system.government;
        document.querySelector("#system-attributes .value").textContent = system.attributes.join(", ");
    }
    buildSystemLinksCache() {
        this.systemLinksCache = new Set();
        for (let system of this.esData.starSystems.values())for (let linked of system.links){
            let linkTxt = `${system.name}___${linked}`;
            let reverseLinkTxt = `${linked}___${system.name}`;
            if (this.systemLinksCache.has(reverseLinkTxt)) continue;
            this.systemLinksCache.add(linkTxt);
        }
    }
    async preloadGalaxySprites() {
        for (let galaxy of this.esData.galaxies.values()){
            let spriteFile = this.spriteList.sprites.get(galaxy.sprite);
            if (!spriteFile) continue;
            await this.spriteList.load(galaxy.sprite, spriteFile);
        }
    }
    async renderGalaxies({ context  }) {
        if (!this.esData) return;
        // Draw all galaxies
        if (this.shouldRenderGalaxies) for (let galaxy of this.esData.galaxies.values())await (0, _galaxy.renderGalaxy)(galaxy, this.spriteList, context);
    }
    async renderLinks({ context  }) {
        if (!this.esData || !this.shouldRenderLinks) return;
        // Draw all links
        context.lineWidth = (0, _panZoomPlugin.PanZoomPlugin).fixedNumber(1, context);
        context.strokeStyle = "rgba(255,255,255,0.2)";
        for (let link of this.systemLinksCache.values()){
            let [originName, targetName] = link.split("___");
            let origin = this.esData.starSystems.get(originName);
            let target = this.esData.starSystems.get(targetName);
            if (!target || !origin) continue;
            context.beginPath();
            context.moveTo(origin.position.x, origin.position.y);
            context.lineTo(target.position.x, target.position.y);
            context.stroke();
        }
    }
    async renderWormholeLinks({ context  }) {
        if (!this.esData || !this.shouldRenderWormholeLinks) return;
        // Draw all links
        context.lineWidth = (0, _panZoomPlugin.PanZoomPlugin).fixedNumber(1, context);
        context.strokeStyle = "rgba(100,100,255,0.5)";
        for (let wormhole of this.esData.wormholes.values()){
            if (!wormhole.isMappable && !this.shouldRenderHiddenWormholes) continue;
            for (let link of wormhole.links){
                let [originName, targetName] = link;
                let origin = this.esData.starSystems.get(originName);
                let target = this.esData.starSystems.get(targetName);
                if (!target || !origin) continue;
                context.beginPath();
                context.moveTo(origin.position.x, origin.position.y);
                context.lineTo(target.position.x, target.position.y);
                context.stroke();
            }
        }
    }
    async renderSystems({ context  }) {
        if (!this.esData) return;
        // Draw all systems
        for (let system of this.esData.starSystems.values()){
            if (this.currentlySelected == system) (0, _system.renderSystemSelection)(system, context);
            if (this.shouldRenderDots) (0, _system.renderSystemPin)(system, context);
            if (this.shouldRenderNames) (0, _system.renderSystemName)(system, context);
        }
    }
}

},{"@andreadev/canvas-lib/dist/modules/pan-zoom-plugin":"5BQTv","../game-functions/system":"Cql21","../game-functions/galaxy":"5yTkr","../utils":"isRWn","./templates/galaxyTemplates":"7W99Q","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"Cql21":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Calculate the distance of a point to a star system
 */ parcelHelpers.export(exports, "distanceFromSystem", ()=>distanceFromSystem);
/**
 * Rendering function for the endless sky systems
 */ parcelHelpers.export(exports, "renderSystem", ()=>renderSystem);
parcelHelpers.export(exports, "renderSystemSelection", ()=>renderSystemSelection);
parcelHelpers.export(exports, "renderSystemLinks", ()=>renderSystemLinks);
parcelHelpers.export(exports, "renderSystemPin", ()=>renderSystemPin);
parcelHelpers.export(exports, "renderSystemName", ()=>renderSystemName);
var _panZoomPlugin = require("@andreadev/canvas-lib/dist/modules/pan-zoom-plugin");
var _esDataParser = require("es-data-parser");
const pinSize = 3;
const pinLineWidth = 2;
const linkColor = "rgba(255,255,255,0.2)";
const tagNameOffset = 4;
const tagNameColor = "rgba(255,255,255,0.3)";
const tagNameFontSize = 12;
function distanceFromSystem(system, position) {
    return Math.sqrt(Math.pow(system.position.x - position.x, 2) + Math.pow(system.position.y - position.y, 2));
}
function renderSystem(system, ctx) {
    // renderSystemSelection(system, ctx);
    renderSystemLinks(system, ctx);
    renderSystemPin(system, ctx);
    renderSystemName(system, ctx);
}
function renderSystemSelection(system, ctx) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(100,100,255,0.2)";
    ctx.strokeStyle = "darkblue";
    ctx.lineWidth = (0, _panZoomPlugin.PanZoomPlugin).fixedNumber(1, ctx);
    let width = (0, _panZoomPlugin.PanZoomPlugin).fixedNumber(15, ctx);
    ctx.ellipse(system.position.x, system.position.y, width, width, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}
function renderSystemLinks(system, ctx) {
    // Render the links
    ctx.lineWidth = (0, _panZoomPlugin.PanZoomPlugin).fixedNumber(1, ctx);
    ctx.strokeStyle = linkColor;
    for (let link of system.links){
        ctx.beginPath();
        ctx.moveTo(system.position.x, system.position.y);
        const targetSystem = system.esData.starSystems.get(link);
        if (!targetSystem) continue;
        ctx.lineTo(targetSystem.position.x, targetSystem.position.y);
        ctx.stroke();
    }
}
function renderSystemPin(system, ctx) {
    // Render the circle
    // Get the government color
    let color = (0, _esDataParser.Color).fromGovernment(system.esData, system.government)?.toString();
    if (!color) color = "#aaa";
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.strokeStyle = color;
    ctx.lineWidth = (0, _panZoomPlugin.PanZoomPlugin).fixedNumber(pinLineWidth, ctx);
    let { width , height  } = (0, _panZoomPlugin.PanZoomPlugin).fixedSize(pinSize, pinSize, ctx);
    ctx.ellipse(system.position.x, system.position.y, width, height, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}
function renderSystemName(system, ctx) {
    // Render the name
    let { scaleX: scale  } = (0, _panZoomPlugin.PanZoomPlugin).getDataFromMatrix(ctx.getTransform());
    // If it's too small to render the name, interrupt the export function
    if (scale < 0.5) return;
    let fontSize = (0, _panZoomPlugin.PanZoomPlugin).fixedNumber(tagNameFontSize, ctx);
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = tagNameColor;
    let offset = (0, _panZoomPlugin.PanZoomPlugin).fixedNumber(tagNameOffset, ctx);
    let { width , height  } = (0, _panZoomPlugin.PanZoomPlugin).fixedSize(pinSize, pinSize, ctx);
    ctx.fillText(system.name, system.position.x + width + offset, system.position.y + height);
}

},{"@andreadev/canvas-lib/dist/modules/pan-zoom-plugin":"5BQTv","es-data-parser":"7eHvt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5yTkr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderGalaxy", ()=>renderGalaxy);
async function renderGalaxy(galaxy, spriteList, ctx) {
    // Render the sprite
    if (galaxy.sprite == "") return;
    let spriteImage = spriteList.loadedSprites.get(galaxy.sprite);
    // The sprite image isn't loaded
    if (!spriteImage) {
        const spriteFile = spriteList.sprites.get(galaxy.sprite);
        if (!spriteFile) {
            console.error(`Sprite ${galaxy.sprite} not found`);
            return;
        }
        spriteImage = await spriteList.load(galaxy.sprite, spriteFile);
    }
    ctx.drawImage(spriteImage, galaxy.position.x - spriteImage.width / 2, galaxy.position.y - spriteImage.height / 2);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"isRWn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "openDirectory", ()=>openDirectory);
parcelHelpers.export(exports, "throttle", ()=>throttle);
// Load image
parcelHelpers.export(exports, "loadImage", ()=>loadImage);
/*
 * Load an html template built with text and insert it into an
 * element by its query selector
 */ parcelHelpers.export(exports, "loadTemplate", ()=>loadTemplate);
parcelHelpers.export(exports, "setState", ()=>setState);
parcelHelpers.export(exports, "getState", ()=>getState);
const openDirectory = async ()=>{
    // Use older apis because File System Access API seems to be working unnaturally
    return new Promise((resolve)=>{
        const input = document.createElement("input");
        input.type = "file";
        input.webkitdirectory = true;
        input.addEventListener("change", ()=>{
            let files = Array.from(input.files);
            resolve(files);
        });
        if ("showPicker" in HTMLInputElement.prototype) input.showPicker();
        else input.click();
    });
};
const throttle = (fn, wait = 300)=>{
    let inThrottle;
    let lastFn;
    let lastTime;
    return function() {
        const context = this, args = arguments;
        if (!inThrottle) {
            fn.apply(context, args);
            lastTime = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(()=>{
                if (Date.now() - lastTime >= wait) {
                    fn.apply(context, args);
                    lastTime = Date.now();
                }
            }, Math.max(wait - (Date.now() - lastTime), 0));
        }
    };
};
function loadImage(file) {
    return new Promise((resolve, reject)=>{
        let img = new Image();
        img.onload = ()=>{
            resolve(img);
        };
        img.onerror = ()=>{
            reject();
        };
        img.src = URL.createObjectURL(file);
    });
}
function loadTemplate(template, parentSelector) {
    let parent = document.querySelector(parentSelector);
    if (!parent) throw new Error(`Cannot load template because parent element doesn't exists ("${parentSelector}")`);
    let templateEl = document.createElement("template");
    templateEl.innerHTML = template;
    let node = templateEl.content.firstChild?.cloneNode(true);
    parent.appendChild(node);
}
function setState(state) {
    history.pushState(state, "");
}
function getState() {
    return history.state;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7W99Q":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "galaxyViewOptions", ()=>galaxyViewOptions);
parcelHelpers.export(exports, "systemDetails", ()=>systemDetails);
const galaxyViewOptions = `<div class="container view-galaxy">
    <div class="title">
        Galaxy View
    </div>
    <div class="body vertical-stack">
        <div class="field">
            <label>
                <input id="toggle-galaxies" type="checkbox" checked> Galaxies
            </label>
        </div>
        <div class="field">
            <label>
                <input id="toggle-pins" type="checkbox" checked> System pins
            </label>
        </div>
        <div class="field">
            <label>
                <input id="toggle-names" type="checkbox" checked> System names
            </label>
        </div>
        <div class="field">
            <label>
                <input id="toggle-links" type="checkbox" checked> System links
            </label>
        </div>
        <div class="field">
            <label>
                <input id="toggle-wormholes" type="checkbox" checked> System wormholes
            </label>
        </div>
        <div class="field">
            <label>
                <input id="toggle-hidden-wormholes" type="checkbox"> Show hidden wormholes
            </label>
        </div>
    </div>
</div>`;
const systemDetails = `<div class="container view-galaxy">
    <div class="title">
        Star system info
    </div>
    <div class="body vertical-stack">
        <div id="system-name" class="field">Name: <span class="value"></span></div>
        <div id="system-position" class="field">Position (x, y): <span class="value"></span></div>
        <div id="system-government" class="field">Government: <span class="value"></span></div>
        <div id="system-attributes" class="field">Attributes: <span class="value"></span></div>
    </div>
</div>`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9LiF6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SystemView", ()=>SystemView);
var _object = require("../game-functions/object");
var _utils = require("../utils");
var _systemTemplates = require("./templates/systemTemplates");
class SystemView extends EventTarget {
    constructor(esData, spriteList, canvasLib){
        super();
        this.esData = esData;
        this.spriteList = spriteList;
        this.canvasLib = canvasLib;
        this.system = null;
        this.shouldRenderOrbits = true;
        this.shouldRenderObjects = true;
        this.esData = esData;
        this.canvasLib = canvasLib;
        this.createAndBindUI(esData, canvasLib);
    }
    createAndBindUI(esData, lib) {
        (0, _utils.loadTemplate)((0, _systemTemplates.systemViewOptions), ".left-bar .middle");
        (0, _utils.loadTemplate)((0, _systemTemplates.systemsList), ".top-bar .middle");
        document.getElementById("toggle-orbits")?.addEventListener("change", this.toggleOrbits.bind(this));
        document.getElementById("toggle-objects")?.addEventListener("change", this.toggleObjects.bind(this));
        // Add all systems to the list
        let systemSelect = document.getElementById("system-selection");
        for (let systemName of esData.starSystems.keys()){
            let opt = document.createElement("option");
            opt.value = systemName;
            opt.innerText = systemName;
            systemSelect.appendChild(opt);
        }
        systemSelect.addEventListener("change", (e)=>{
            let systemName = e.target.selectedOptions[0]?.value;
            this.setSystem(systemName);
            lib.paint();
        });
    }
    async setSystem(systemName) {
        if (!this.esData.starSystems.has(systemName)) throw new Error("System name not found");
        this.system = this.esData.starSystems.get(systemName);
        await this.preloadObjectsSprites();
    }
    async activate(lib) {
        let systemList = document.getElementById("system-selection");
        let state = (0, _utils.getState)();
        if (state?.selectedSystem) {
            this.setSystem(state.selectedSystem);
            systemList.value = state.selectedSystem;
        }
        await this.preloadObjectsSprites();
        lib.addLayer("background", 0);
        lib.addLayer("boundaries", 1);
        lib.addLayer("objects", 2);
        lib.on("objects", this.renderOrbits.bind(this));
        lib.on("objects", this.renderObjects.bind(this));
    }
    async deactivate(lib) {
        lib.removeLayer("background");
        lib.removeLayer("boundaries");
        lib.removeLayer("objects");
    }
    async preloadObjectsSprites() {
        if (!this.system) return;
        for (let object of this.system.objects.values()){
            if (!object.sprite) continue;
            let spriteFile = this.spriteList.sprites.get(object.sprite.name);
            if (!spriteFile) continue;
            await this.spriteList.load(object.sprite.name, spriteFile);
        }
    }
    toggleOrbits(e) {
        this.shouldRenderOrbits = e.target.checked;
        this.canvasLib.paint();
    }
    toggleObjects(e) {
        this.shouldRenderObjects = e.target.checked;
        this.canvasLib.paint();
    }
    async renderOrbits({ context  }) {
        if (!this.esData || !this.system) return;
        if (!this.shouldRenderOrbits) return;
        context.strokeStyle = "blue";
        for (let object of this.system.objects.values())await (0, _object.renderObjectOrbit)(object, context);
        // reset to default
        context.strokeStyle = "#000";
    }
    async renderObjects({ context  }) {
        if (!this.esData || !this.system) return;
        if (!this.shouldRenderObjects) return;
        for (let object of this.system.objects.values())await (0, _object.renderObject)(object, this.spriteList, context);
    }
}

},{"../game-functions/object":"g6grH","../utils":"isRWn","./templates/systemTemplates":"jnQIZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"g6grH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderObjectOrbit", ()=>renderObjectOrbit);
parcelHelpers.export(exports, "renderObject", ()=>renderObject);
var _sprites = require("./sprites");
async function renderObjectOrbit(object, ctx) {
    ctx.beginPath();
    ctx.arc(0, 0, object.distance, 0, 2 * Math.PI);
    ctx.stroke();
    let angle = 90;
    angle += object.offset;
    angle *= Math.PI / 180;
    ctx.rotate(angle);
    ctx.translate(0, -object.distance);
    for (let child of object.objects)await renderObjectOrbit(child, ctx);
    ctx.translate(0, object.distance);
    ctx.rotate(-angle);
}
async function renderObject(object, spriteList, ctx) {
    // Render the sprite
    if (object.sprite == null) return;
    let spriteImage = spriteList.loadedSprites.get(object.sprite.name);
    const spriteFile = spriteList.sprites.get(object.sprite.name);
    if (!spriteFile) {
        console.error(`Sprite ${object.sprite} not found`);
        return;
    }
    // The sprite image isn't loaded
    if (!spriteImage) spriteImage = await spriteList.load(object.sprite.name, spriteFile);
    // Draw the planet/star
    let angle = 90;
    angle += object.offset;
    angle *= Math.PI / 180;
    ctx.save();
    if (object.distance > 0) ctx.rotate(angle);
    ctx.translate(0, -object.distance);
    (0, _sprites.printSprite)(spriteFile.name, spriteImage, object.sprite.scale, ctx);
    if (object.distance > 0) ctx.rotate(-angle);
    for (let child of object.objects)await renderObject(child, spriteList, ctx);
    ctx.restore();
}

},{"./sprites":"6YijU","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6YijU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SpriteList", ()=>SpriteList);
parcelHelpers.export(exports, "printSprite", ()=>printSprite);
var _utils = require("../utils");
class SpriteList {
    sprites = new Map();
    loadedSprites = new Map();
    constructor(){}
    async load(spriteName, file) {
        let img = await (0, _utils.loadImage)(file);
        this.loadedSprites.set(spriteName, img);
        return img;
    }
}
function printSprite(filename, image, scale, ctx) {
    let [name, _] = filename.split(".");
    // additive -> lighter
    switch(name.at(-1)){
        case "+":
        case "~":
            ctx.globalCompositeOperation = "lighter";
    }
    let printWidth = image.width * scale;
    let printHeight = image.height * scale;
    ctx.drawImage(image, -(printWidth / 2), -(printHeight / 2), printWidth, printHeight);
    ctx.globalCompositeOperation = "source-over";
}

},{"../utils":"isRWn","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jnQIZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "systemViewOptions", ()=>systemViewOptions);
parcelHelpers.export(exports, "systemsList", ()=>systemsList);
const systemViewOptions = `<div class="container view-system">
    <div class="title">
        System View
    </div>
    <div class="body vertical-stack">
        <div class="field">
            <label>
                <input id="toggle-orbits" type="checkbox" checked> Orbits
            </label>
        </div>
        <div class="field">
            <label>
                <input id="toggle-objects" type="checkbox" checked> Planets / Stars
            </label>
        </div>
    </div>
</div>`;
const systemsList = `<div class="container view-system">
    <div class="body">
        <label>System: 
            <select id="system-selection"><option value="-">---</option></select>
        </label>
    </div>
</div>`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9nYt6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MissionsView", ()=>MissionsView);
var _utils = require("../utils");
var _missionTemplates = require("./templates/missionTemplates");
class MissionsView extends EventTarget {
    constructor(esData, spriteList, canvasLib){
        super();
        this.esData = esData;
        this.spriteList = spriteList;
        this.canvasLib = canvasLib;
        this.saveFileData = {
            missions: []
        };
        this.createAndBindUI();
    }
    createAndBindUI() {
        (0, _utils.loadTemplate)((0, _missionTemplates.savefileLoad), ".top-bar .middle");
        document.querySelector("#view-missions-savefile-picker input")?.addEventListener("change", this.onLoadSaveFile.bind(this));
    }
    onLoadSaveFile(_event) {
        console.log("Loading save file...");
        let input = document.querySelector("#view-missions-savefile-picker input");
        if (input.files == null) return;
        let file = input.files[0];
        if (file == null) return;
        let reader = new FileReader();
        reader.addEventListener("load", ()=>{
            let text = reader.result;
            this.parseSaveFile(text);
        });
        reader.readAsText(file);
    }
    parseSaveFile(text) {
        let [_, conditions] = text.split("\nconditions\n");
        let lines = conditions.split("\n");
        lines = lines.filter((line)=>{
            return line.includes(': offered"') || line.includes(': active"') || line.includes(': done"') || line.includes(': failed"') || line.includes(': declined"');
        });
        lines = lines.map((l)=>l.split('"')[1]);
        // TODO: continuare
        console.log(lines);
    }
    async activate(_lib) {
        return;
    }
    async deactivate(_lib) {
        return;
    }
}

},{"../utils":"isRWn","./templates/missionTemplates":"7SVXf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7SVXf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "savefileLoad", ()=>savefileLoad);
const savefileLoad = `<label id="view-missions-savefile-picker" class="view-missions btn label-file-picker">Load savefile
    <input type="file" accept=".txt">
</label>`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ec5tO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bindUI", ()=>bindUI);
var _panZoomPlugin = require("@andreadev/canvas-lib/dist/modules/pan-zoom-plugin");
var _setupCanvasLib = require("./setupCanvasLib");
function bindUI(lib, data) {
    // Setup event listeners for the UI
    document.getElementById("zoom-in")?.addEventListener("click", ()=>{
        const panZoomPlugin = lib.getPlugin((0, _panZoomPlugin.PanZoomPlugin));
        if (!panZoomPlugin) return;
        panZoomPlugin.zoom(0.2);
    });
    document.getElementById("zoom-out")?.addEventListener("click", ()=>{
        const panZoomPlugin = lib.getPlugin((0, _panZoomPlugin.PanZoomPlugin));
        if (!panZoomPlugin) return;
        panZoomPlugin.zoom(-0.2);
    });
    document.getElementById("galaxy-tab")?.addEventListener("click", ()=>{
        (0, _setupCanvasLib.setCurrentView)(lib, "galaxy");
    });
    document.getElementById("system-tab")?.addEventListener("click", ()=>{
        (0, _setupCanvasLib.setCurrentView)(lib, "system");
    });
    document.getElementById("missions-tab")?.addEventListener("click", ()=>{
        (0, _setupCanvasLib.setCurrentView)(lib, "missions");
    });
}

},{"@andreadev/canvas-lib/dist/modules/pan-zoom-plugin":"5BQTv","./setupCanvasLib":"hEqBo","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["cnpQZ","jeorp"], "jeorp", "parcelRequireb6d1")

//# sourceMappingURL=index.b7a05eb9.js.map
