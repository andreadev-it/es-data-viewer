class e{constructor(){this.galaxies=new Map,this.starSystems=new Map,this.colors=new Map,this.governments=new Map,this.planets=new Map,this.wormholes=new Map}addGalaxy(e){this.galaxies.set(e.name,e)}addStarSystem(e){this.starSystems.set(e.name,e)}addColor(e){this.colors.set(e.name,e)}addGovernment(e){this.governments.set(e.name,e)}addPlanet(e){this.planets.set(e.name,e)}addWormhole(e){this.wormholes.set(e.name,e)}}class t{constructor(e,t){this.tokens=e,this.indentation=t,this.children=[]}toString(){const e=[...this.tokens];let t="";for(const s of e)s.includes(" ")?s.includes('"')?t+="`"+s+"`":t+=`"${s}"`:t+=s+" ";return t}}class s extends t{constructor(e,t,s){super(e,t),this.tokens=e,this.indentation=t,this.isRoot=!0,this.filename=s}}function n(e,n=""){const i=new s([],0,n);let a=!1,o=!1,r="",l=new t([],0),h="",c=[i];for(let s=0;s<e.length;s++){const n=e[s];let i=null;if(!o||"\n"==n)switch(n){case"#":0!=h.length||a||(o=!0);break;case'"':case"`":if(a&&n==r){a=!1,0==h.length&&l.tokens.push("");break}if(!a&&0==h.length){a=!0,r=n;break}if(!a)throw new Error(`Unescaped quote in string after ${h}`);break;case"\n":if(""==h||o||l.tokens.push(h),h="",o=!1,i=new t([],0),0==l.tokens.length){l=i;continue}if(l.indentation>c.length-1)throw new Error(`Unexpected indentation for line ${l.tokens.join(" ")}`);if(l.indentation>=0&&c[l.indentation].children.push(l),l.indentation==c.length-1||(c=c.slice(0,l.indentation+1)),c.push(l),a)throw new Error(`A quote was left open near: '${h}'`);l=i;break;case" ":a?h+=" ":h.length>0&&(l.tokens.push(h),h="");break;case"\t":a||0!=l.tokens.length||0!=h.length?!a&&h.length>0?(l.tokens.push(h),h=""):h+="\t":l.indentation++;break;default:h+=n}}return i}class i{constructor(){this.name="",this.scale=1}static fromLine(e,t){if("sprite"!=t.tokens[0])throw new Error("Not a sprite");let s=new i;return s.name=t.tokens[1],t.children.length>0&&"scale"==t.children[0].tokens[0]&&(s.scale=parseFloat(t.children[0].tokens[1])),s}}class a{constructor(e){this.esData=e,this.name="",this.sprite=null,this.distance=0,this.period=0,this.offset=0,this.objects=[]}static fromLine(e,t){if("object"!=t.tokens[0])throw new Error("Not an object");const s=new a(e);s.name=2==t.tokens.length?t.tokens[1]:"";const n=[];for(let o of t.children)switch(o.tokens[0]){case"sprite":s.sprite=i.fromLine(e,o);break;case"distance":s.distance=parseFloat(o.tokens[1]);break;case"period":s.period=parseFloat(o.tokens[1]);break;case"offset":s.offset=parseInt(o.tokens[1]);break;case"object":n.push(a.fromLine(e,o))}return s.objects=n,s}}class o{constructor(){this.link=0,this.jump=0}static fromLine(e,t){if("arrival"!=t.tokens[0]&&"departure"!=t.tokens[0])throw new Error("Not a travel distance (either 'arrival' or 'departure')");let s=0,n=0;t.tokens[1]&&(s=n=parseInt(t.tokens[1]));for(let e of t.children)switch(e.tokens[0]){case"link":s=parseInt(e.tokens[1]);break;case"jump":n=parseInt(e.tokens[1])}const i=new o;return i.link=s,i.jump=n,i}}class r{constructor(){this.universal=1,this.addend=0,this.multiplier=1}static fromLine(e,t){if("ramscoop"!=t.tokens[0])throw new Error("Not a ramscoop data");let s=1,n=0,i=1;for(let e of t.children)switch(e.tokens[0]){case"universal":s=parseFloat(e.tokens[1]);break;case"addend":n=parseFloat(e.tokens[1]);break;case"multiplier":i=parseFloat(e.tokens[1])}const a=new r;return a.universal=s,a.addend=n,a.multiplier=i,a}}class l{constructor(e,t,s){this.links=[],this.government="",this.attributes=[],this.objects=[],this.inaccessible=!1,this.hidden=!1,this.shrouded=!1,this.music="",this.arrival=new o,this.departure=new o,this.ramscoop=new r,this.habitable=0,this.belt={distance:0,weight:1},this.invisibleFence=1e4,this.jumpRange=0,this.haze="",this.asteroids=[],this.minables=[],this.trades=[],this.fleets=[],this.raids=[],this.noRaid=!1,this.hazards=[],this.starfieldDensity=1,this.isSelected=!1,this.name=t,this.position=s,this.esData=e}static fromLine(e,t){if("system"!=t.tokens[0])throw new Error("Not a system");const s=t.tokens[1],n=new l(e,s,{x:0,y:0});let i=!1,h=[];const c=[];let d=[],m=[],u=[],p=[],f=[],g=[];for(let s of t.children)switch(s.tokens[0]){case"pos":n.position={x:parseInt(s.tokens[1]),y:parseInt(s.tokens[2])},i=!0;break;case"link":h.push(s.tokens[1]);break;case"government":n.government=s.tokens[1];break;case"attributes":n.attributes=s.tokens.slice(1);break;case"object":c.push(a.fromLine(e,s));break;case"arrival":n.arrival=o.fromLine(e,s);break;case"departure":n.departure=o.fromLine(e,s);break;case"inaccessible":n.inaccessible=!0;break;case"hidden":n.hidden=!0;break;case"shrouded":n.shrouded=!0;break;case"music":n.music=s.tokens[1];break;case"ramscoop":n.ramscoop=r.fromLine(e,s);break;case"habitable":n.habitable=parseInt(s.tokens[1]);break;case"belt":n.belt={distance:parseInt(s.tokens[1]),weight:s.tokens[2]?parseFloat(s.tokens[2]):1};break;case"invisible fence":n.invisibleFence=parseInt(s.tokens[1]);break;case"jump range":n.jumpRange=parseInt(s.tokens[1]);break;case"haze":n.haze=s.tokens[1];break;case"asteroids":d.push({name:s.tokens[1],count:parseInt(s.tokens[2]),energy:parseFloat(s.tokens[3])});break;case"minables":m.push({name:s.tokens[1],count:parseInt(s.tokens[2]),energy:parseFloat(s.tokens[3])});break;case"trade":u.push({commodity:s.tokens[1],cost:parseInt(s.tokens[2])});break;case"fleet":p.push({name:s.tokens[1],period:parseInt(s.tokens[2])});break;case"raid":f.push({fleet:s.tokens[1],minAttraction:parseInt(s.tokens[2]),maxAttraction:parseInt(s.tokens[3])});break;case"no raid":n.noRaid=!0;break;case"hazard":g.push({name:s.tokens[1],period:parseInt(s.tokens[2])});break;case"starfield density":n.starfieldDensity=parseFloat(s.tokens[1])}if(!i)throw new Error("No position found for this system");return n.links=h,n.objects=c,n.asteroids=d,n.minables=m,n.trades=u,n.fleets=p,n.raids=f,n.hazards=g,n}}class h{constructor(e,t,s){this.position={x:0,y:0},this.sprite="",this.name=t,this.position=s,this.esData=e}static fromLine(e,t){if("galaxy"!=t.tokens[0])throw new Error("Not a galaxy");const s=t.tokens[1];let n={x:0,y:0},i=!1,a="";for(let e of t.children)"pos"!=e.tokens[0]?"sprite"==e.tokens[0]&&(a=e.tokens[1]):(n={x:parseInt(e.tokens[1]),y:parseInt(e.tokens[2])},i=!0);if(!i)throw new Error("No position found for this system");const o=new h(e,s,n);return o.sprite=a,o}}class c{constructor(e,t,s,n,i=255){this.name=e,this.r=t,this.g=s,this.b=n,this.a=i}toString(){return 255==this.a?`rgb(${this.r}, ${this.g}, ${this.b})`:`rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`}static fromLine(e,t){let s=t.tokens[1],n=parseFloat(t.tokens[2]),i=parseFloat(t.tokens[3]),a=parseFloat(t.tokens[4]),o=255;return 6==t.tokens.length&&(o=parseFloat(t.tokens[5])),c.fromPercentages(s,n,i,a,o)}static fromPercentages(e,t,s,n,i){return new c(e,255*t,255*s,255*n,255*i)}static fromGovernment(e,t){let s=e.governments.get(t);if(!s)return null;if(s.color instanceof c)return s.color;let n=e.colors.get(s.color);return n||null}}class d{constructor(e,t){this.color="",this.esData=e,this.name=t}static fromLine(e,t){if("government"!=t.tokens[0])throw new Error("Not a government");const s=t.tokens[1];let n="";for(let e of t.children)if("color"==e.tokens[0])if(2==e.tokens.length)n=e.tokens[1];else{let e=parseFloat(t.tokens[1]),s=parseFloat(t.tokens[2]),i=parseFloat(t.tokens[3]),a=255;5==t.tokens.length&&(a=parseFloat(t.tokens[4])),n=c.fromPercentages("",e,s,i,a)}const i=new d(e,s);return i.color=n,i}}class m{constructor(e,t){this.esData=e,this.name=t,this.wormhole=""}static fromLine(e,t){if("planet"!=t.tokens[0])throw new Error("Not a planet");const s=t.tokens[1];let n="";for(let e of t.children)"wormhole"==e.tokens[0]&&(n=e.tokens[1]);let i=new m(e,s);return i.wormhole=n,i}}class u{constructor(e,t){this.esData=e,this.name=t,this.isMappable=!1,this.links=[],this.color=""}static fromLine(e,t){if("wormhole"!=t.tokens[0])throw new Error("Not a wormhole");const s=t.tokens[1];let n=!1,i="",a=[];for(let e of t.children)switch(e.tokens[0]){case"color":if(2==e.tokens.length)i=e.tokens[1];else{let e=parseFloat(t.tokens[1]),s=parseFloat(t.tokens[2]),n=parseFloat(t.tokens[3]),a=255;5==t.tokens.length&&(a=parseFloat(t.tokens[4])),i=c.fromPercentages("",e,s,n,a)}break;case"link":a.push([e.tokens[1],e.tokens[2]]);break;case"mappable":n=!0}const o=new u(e,s);return o.isMappable=n,o.color=i,o.links=a,o}}function p(t,s=null){const n=null!=s?s:new e;for(let e of t.children)"system"==e.tokens[0]?n.addStarSystem(l.fromLine(n,e)):"galaxy"==e.tokens[0]?n.addGalaxy(h.fromLine(n,e)):"color"==e.tokens[0]?n.addColor(c.fromLine(n,e)):"government"==e.tokens[0]?n.addGovernment(d.fromLine(n,e)):"planet"==e.tokens[0]?n.addPlanet(m.fromLine(n,e)):"wormhole"==e.tokens[0]&&n.addWormhole(u.fromLine(n,e));return n}function f(e){return new Promise(((t,s)=>{const n=new FileReader;n.onload=()=>{t(n.result)},n.readAsText(e)}))}async function g(t,s,i){const a=null!=i?i:new e;return p(n(await f(t),s),a),a}async function k(t){const s=new e;for(let e of t)await g(e,e.webkitRelativePath,s);return s}class y{listeners;constructor(){this.listeners=new Map}addListener(e,t){this.listeners.has(e)||this.listeners.set(e,[]),this.listeners.get(e).push(t)}removeListener(e,t){if(!this.listeners.has(e))return;let s=this.listeners.get(e),n=s.findIndex((e=>e===t));n>=0&&s.splice(n,1),this.listeners.set(e,s)}clearListeners(e){this.listeners.has(e)&&this.listeners.set(e,[])}clearAllListeners(){this.listeners.clear()}async fireEvent(e,t){if(this.listeners.has(e))for(let s of this.listeners.get(e)){let e=s(t);e instanceof Promise&&await e}}async fireEventAsync(e,t){if(!this.listeners.has(e))return;let s=[];for(let n of this.listeners.get(e)){let e=n(t);e instanceof Promise&&s.push(e)}await Promise.all(s)}fireEventSync(e,t){if(this.listeners.has(e))for(let s of this.listeners.get(e))s(t)}}class b extends y{constructor(e){super(),this.canvas=e,this.plugins=new Map,this.layers=[],this.layersActions=new y;const t=this.canvas.getContext("2d");if(null==t)throw"Could not get the context for the canvas";this.context=t}async renderCycle(){await this.paint(),window.requestAnimationFrame((()=>this.renderCycle()))}use(e,t){const s=new e(this,t);this.plugins.set(s.name,s)}getPlugin(e){for(let t of this.plugins.values())if(t instanceof e)return t}async paint(e=!0){this.prepareContext(e);const t={context:this.context};await this.layersActions.fireEvent("_prerender",t);for(let e of this.layers)await this.layersActions.fireEvent(e.name,t);await this.layersActions.fireEvent("_postrender",t)}prepareContext(e=!0){this.context.resetTransform(),e&&this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.translate(Math.floor(this.canvas.width/2),Math.floor(this.canvas.height/2))}addLayer(e,t){this.layers.push({name:e,order:t}),this.layers.sort(((e,t)=>e.order-t.order))}removeLayer(e){this.layers.splice(this.layers.findIndex((t=>t.name==e)),1),this.layersActions.clearListeners(e)}on(e,t){this.layersActions.addListener(e,t)}remove(e,t){this.layersActions.removeListener(e,t)}startRendering(){window.requestAnimationFrame((()=>this.renderCycle()))}}function v(e,t){let s,n=!1;return function(){if(n)return;const i=arguments;e.apply(this,i),clearTimeout(s),s=setTimeout((()=>n=!1),t),n=!0}}class w{constructor(e,t){var s,n,i;this.app=e,this.settings=t,this.name="PanZoom",this.currentZoom=1,this.minZoom=.1,this.maxZoom=10,this.panButton=1,this.cameraOffset={x:0,y:0},this.isPanning=!1,this.startedPanningOffset={x:0,y:0},this.startedPanningPosition={x:0,y:0},this.throttle=-1,this.bindEvents(),this.minZoom=null!==(s=t.minZoom)&&void 0!==s?s:this.minZoom,this.maxZoom=null!==(n=t.maxZoom)&&void 0!==n?n:this.maxZoom,this.throttle=null!==(i=t.throttle)&&void 0!==i?i:this.throttle,this.throttledPaint=v(this.app.paint.bind(this.app),this.throttle);t.panButton&&(this.panButton={left:0,middle:1,right:2,any:-1}[t.panButton])}bindEvents(){this.app.on("_prerender",this.transformCanvas.bind(this)),this.app.canvas.addEventListener("pointerdown",this.onPointerDown.bind(this)),this.app.canvas.addEventListener("pointerup",this.onPointerUp.bind(this)),this.app.canvas.addEventListener("pointermove",this.onPointerMove.bind(this)),this.app.canvas.addEventListener("pointerleave",this.onPointerUp.bind(this)),this.app.canvas.addEventListener("wheel",this.onScroll.bind(this))}screenToLocalPoint(e,t){let s=this.app.canvas.width/2,n=this.app.canvas.height/2,i=this.cameraOffset.x,a=this.cameraOffset.y,o=this.currentZoom;return e-=s,t-=n,e/=o,t/=o,{x:e-=i,y:t-=a}}zoom(e){this.currentZoom+=e,this.currentZoom=Math.min(Math.max(this.minZoom,this.currentZoom),this.maxZoom),this.currentZoom=Math.floor(1e3*this.currentZoom)/1e3,this.updateRender()}transformCanvas(e){e.context.scale(this.currentZoom,this.currentZoom),e.context.translate(this.cameraOffset.x,this.cameraOffset.y)}onPointerDown(e){e.button!=this.panButton&&-1!=this.panButton||(this.isPanning=!0,this.startedPanningOffset=this.cameraOffset,this.startedPanningPosition={x:e.clientX,y:e.clientY})}onPointerUp(e){this.isPanning=!1}onPointerMove(e){this.isPanning&&(this.cameraOffset={x:this.startedPanningOffset.x+(e.clientX-this.startedPanningPosition.x)/this.currentZoom,y:this.startedPanningOffset.y+(e.clientY-this.startedPanningPosition.y)/this.currentZoom},this.updateRender())}onScroll(e){this.zoom(e.deltaY/1e3)}updateRender(){this.throttle>0?this.throttledPaint():this.app.paint()}static getDataFromMatrix(e){return{scaleX:e.a,scaleY:e.d,translateX:e.e,translateY:e.f,skewX:e.b,skewY:e.c}}static fixedNumber(e,t,s="x"){let{scaleX:n,scaleY:i}=this.getDataFromMatrix(t.getTransform());return"x"==s?e*(1/n):e*(1/i)}static fixedSize(e,t,s){let{scaleX:n,scaleY:i}=this.getDataFromMatrix(s.getTransform());return{width:e*(1/n),height:t*(1/i)}}}const L=3,x=2,S=4,E="rgba(255,255,255,0.3)",P=12;function I(e,t){return Math.sqrt(Math.pow(e.position.x-t.x,2)+Math.pow(e.position.y-t.y,2))}function D(e,t){t.beginPath(),t.fillStyle="rgba(100,100,255,0.2)",t.strokeStyle="darkblue",t.lineWidth=w.fixedNumber(1,t);let s=w.fixedNumber(15,t);t.ellipse(e.position.x,e.position.y,s,s,0,0,2*Math.PI),t.fill(),t.stroke()}function R(e,t){let s=c.fromGovernment(e.esData,e.government)?.toString();s||(s="#aaa"),t.beginPath(),t.fillStyle="black",t.strokeStyle=s,t.lineWidth=w.fixedNumber(x,t);let{width:n,height:i}=w.fixedSize(L,L,t);t.ellipse(e.position.x,e.position.y,n,i,0,0,2*Math.PI),t.fill(),t.stroke()}function j(e,t){let{scaleX:s}=w.getDataFromMatrix(t.getTransform());if(s<.5)return;let n=w.fixedNumber(P,t);t.font=`${n}px Arial`,t.fillStyle=E;let i=w.fixedNumber(S,t),{width:a,height:o}=w.fixedSize(L,L,t);t.fillText(e.name,e.position.x+a+i,e.position.y+o)}async function O(e,t,s){if(""==e.sprite)return;let n=t.loadedSprites.get(e.sprite);if(!n){const s=t.sprites.get(e.sprite);if(!s)return void console.error(`Sprite ${e.sprite} not found`);n=await t.load(e.sprite,s)}s.drawImage(n,e.position.x-n.width/2,e.position.y-n.height/2)}class M extends EventTarget{constructor(e,t,s){super(),this.esData=e,this.spriteList=t,this.canvasLib=s,this.shouldRenderNames=!0,this.shouldRenderLinks=!0,this.shouldRenderDots=!0,this.shouldRenderGalaxies=!0,this.shouldRenderWormholeLinks=!0,this.shouldRenderHiddenWormholes=!1,this.currentlySelected=null,this.systemLinksCache=new Set,this.savedZoom=1,this.savedPosition={x:0,y:0},this.esData=e,this.canvasLib.canvas.addEventListener("pointerdown",this.onCanvasClick.bind(this))}async activate(e){document.getElementById("toggle-galaxies")?.addEventListener("change",this.toggleGalaxies.bind(this)),document.getElementById("toggle-pins")?.addEventListener("change",this.toggleDots.bind(this)),document.getElementById("toggle-names")?.addEventListener("change",this.toggleNames.bind(this)),document.getElementById("toggle-links")?.addEventListener("change",this.toggleLinks.bind(this)),document.getElementById("toggle-wormholes")?.addEventListener("change",this.toggleWormholes.bind(this)),document.getElementById("toggle-hidden-wormholes")?.addEventListener("change",this.toggleHiddenWormholes.bind(this)),this.buildSystemLinksCache(),await this.preloadGalaxySprites(),e.addLayer("galaxies",0),e.addLayer("links",1),e.addLayer("wormhole-links",2),e.addLayer("systems",3),e.on("galaxies",this.renderGalaxies.bind(this)),e.on("links",this.renderLinks.bind(this)),e.on("wormhole-links",this.renderWormholeLinks.bind(this)),e.on("systems",this.renderSystems.bind(this));let t=e.getPlugin(w);t.currentZoom=this.savedZoom,t.cameraOffset=this.savedPosition}async deactivate(e){e.removeLayer("galaxies"),e.removeLayer("links"),e.removeLayer("wormhole-links"),e.removeLayer("systems");let t=e.getPlugin(w);this.savedZoom=t.currentZoom,this.savedPosition=t.cameraOffset}toggleNames(e){this.shouldRenderNames=e.target.checked,this.canvasLib.paint()}toggleLinks(e){this.shouldRenderLinks=e.target.checked,this.canvasLib.paint()}toggleDots(e){this.shouldRenderDots=e.target.checked,this.canvasLib.paint()}toggleGalaxies(e){this.shouldRenderGalaxies=e.target.checked,this.canvasLib.paint()}toggleWormholes(e){this.shouldRenderWormholeLinks=e.target.checked,this.canvasLib.paint()}toggleHiddenWormholes(e){this.shouldRenderHiddenWormholes=e.target.checked,this.canvasLib.paint()}onCanvasClick(e){if(0!==e.button)return;let t=this.canvasLib.getPlugin(w);if(!t)return;let s=t.screenToLocalPoint(e.clientX,e.clientY),n=null,i=1e4,a=10,o=this.canvasLib.canvas.getContext("2d");o&&(a=w.fixedNumber(10,o));for(let e of this.esData.starSystems.values()){let t=I(e,s);t>a||(!n||t<i)&&(n=e,i=t)}n?this.selectSystem(n):this.removeSelection()}removeSelection(){this.currentlySelected&&(this.currentlySelected.isSelected=!1,this.currentlySelected=null,this.canvasLib.paint())}selectSystem(e){this.currentlySelected=e,this.updateStarSystemInfo(e),document.getElementById("system-selection").value=e.name,this.canvasLib.paint()}updateStarSystemInfo(e){document.querySelector("#system-name .value").textContent=e.name,document.querySelector("#system-position .value").textContent=`${e.position.x}, ${e.position.y}`,document.querySelector("#system-government .value").textContent=e.government,document.querySelector("#system-attributes .value").textContent=e.attributes.join(", ")}buildSystemLinksCache(){this.systemLinksCache=new Set;for(let e of this.esData.starSystems.values())for(let t of e.links){let s=`${e.name}___${t}`,n=`${t}___${e.name}`;this.systemLinksCache.has(n)||this.systemLinksCache.add(s)}}async preloadGalaxySprites(){for(let e of this.esData.galaxies.values()){let t=this.spriteList.sprites.get(e.sprite);t&&await this.spriteList.load(e.sprite,t)}}async renderGalaxies({context:e}){if(this.esData&&this.shouldRenderGalaxies)for(let t of this.esData.galaxies.values())await O(t,this.spriteList,e)}async renderLinks({context:e}){if(this.esData&&this.shouldRenderLinks){e.lineWidth=w.fixedNumber(1,e),e.strokeStyle="rgba(255,255,255,0.2)";for(let t of this.systemLinksCache.values()){let[s,n]=t.split("___"),i=this.esData.starSystems.get(s),a=this.esData.starSystems.get(n);a&&i&&(e.beginPath(),e.moveTo(i.position.x,i.position.y),e.lineTo(a.position.x,a.position.y),e.stroke())}}}async renderWormholeLinks({context:e}){if(this.esData&&this.shouldRenderWormholeLinks){e.lineWidth=w.fixedNumber(1,e),e.strokeStyle="rgba(100,100,255,0.5)";for(let t of this.esData.wormholes.values())if(t.isMappable||this.shouldRenderHiddenWormholes)for(let s of t.links){let[t,n]=s,i=this.esData.starSystems.get(t),a=this.esData.starSystems.get(n);a&&i&&(e.beginPath(),e.moveTo(i.position.x,i.position.y),e.lineTo(a.position.x,a.position.y),e.stroke())}}}async renderSystems({context:e}){if(this.esData)for(let t of this.esData.starSystems.values())this.currentlySelected==t&&D(t,e),this.shouldRenderDots&&R(t,e),this.shouldRenderNames&&j(t,e)}}const C=async()=>new Promise((e=>{const t=document.createElement("input");t.type="file",t.webkitdirectory=!0,t.addEventListener("change",(()=>{let s=Array.from(t.files);e(s)})),"showPicker"in HTMLInputElement.prototype?t.showPicker():t.click()}));function F(e){return new Promise(((t,s)=>{let n=new Image;n.onload=()=>{t(n)},n.onerror=()=>{s()},n.src=URL.createObjectURL(e)}))}class Z{sprites=new Map;loadedSprites=new Map;constructor(){}async load(e,t){let s=await F(t);return this.loadedSprites.set(e,s),s}}function N(e,t,s,n){let[i,a]=e.split(".");switch(i.at(-1)){case"+":case"~":n.globalCompositeOperation="lighter"}let o=t.width*s,r=t.height*s;n.drawImage(t,-o/2,-r/2,o,r),n.globalCompositeOperation="source-over"}async function B(e,t){t.beginPath(),t.arc(0,0,e.distance,0,2*Math.PI),t.stroke();let s=90;s+=e.offset,s*=Math.PI/180,t.rotate(s),t.translate(0,-e.distance);for(let s of e.objects)await B(s,t);t.translate(0,e.distance),t.rotate(-s)}async function $(e,t,s){if(null==e.sprite)return;let n=t.loadedSprites.get(e.sprite.name);const i=t.sprites.get(e.sprite.name);if(!i)return void console.error(`Sprite ${e.sprite} not found`);n||(n=await t.load(e.sprite.name,i));let a=90;a+=e.offset,a*=Math.PI/180,s.save(),e.distance>0&&s.rotate(a),s.translate(0,-e.distance),N(i.name,n,e.sprite.scale,s),e.distance>0&&s.rotate(-a);for(let n of e.objects)await $(n,t,s);s.restore()}class T extends EventTarget{constructor(e,t,s){super(),this.esData=e,this.spriteList=t,this.canvasLib=s,this.system=null,this.shouldRenderOrbits=!0,this.shouldRenderObjects=!0,this.esData=e,this.canvasLib=s}async setSystem(e){if(!this.esData.starSystems.has(e))throw new Error("System name not found");this.system=this.esData.starSystems.get(e),await this.preloadObjectsSprites()}async activate(e){document.getElementById("toggle-orbits")?.addEventListener("change",this.toggleOrbits.bind(this)),document.getElementById("toggle-objects")?.addEventListener("change",this.toggleObjects.bind(this));let t=document.getElementById("system-selection");t.addEventListener("change",(t=>{let s=t.target.selectedOptions[0]?.value;this.setSystem(s),e.paint()})),"-"!=t.value&&this.setSystem(t.value),await this.preloadObjectsSprites(),e.addLayer("background",0),e.addLayer("boundaries",1),e.addLayer("objects",2),e.on("objects",this.renderOrbits.bind(this)),e.on("objects",this.renderObjects.bind(this))}async deactivate(e){e.removeLayer("background"),e.removeLayer("boundaries"),e.removeLayer("objects")}async preloadObjectsSprites(){if(this.system)for(let e of this.system.objects.values()){if(!e.sprite)continue;let t=this.spriteList.sprites.get(e.sprite.name);t&&await this.spriteList.load(e.sprite.name,t)}}toggleOrbits(e){this.shouldRenderOrbits=e.target.checked,this.canvasLib.paint()}toggleObjects(e){this.shouldRenderObjects=e.target.checked,this.canvasLib.paint()}async renderOrbits({context:e}){if(this.esData&&this.system&&this.shouldRenderOrbits){e.strokeStyle="blue";for(let t of this.system.objects.values())await B(t,e);e.strokeStyle="#000"}}async renderObjects({context:e}){if(this.esData&&this.system&&this.shouldRenderObjects)for(let t of this.system.objects.values())await $(t,this.spriteList,e)}}const W={galaxy:null,system:null};let A=null;function z(e){let t=e.getBoundingClientRect();e.width=t.width,e.height=t.height;const s=new b(e);return s.use(w,{}),s}async function G(e,t){if(!(t in W))throw new Error(`'${t}' is not a valid view.`);for(let e of Object.keys(W))document.body.classList.remove(`active-${e}`);document.body.classList.add(`active-${t}`);let s=W[t];await(A?.deactivate(e));let n=e.getPlugin(w);n.currentZoom=1,n.cameraOffset={x:0,y:0},A=s,await A.activate(e),await e.paint()}async function _(e,t,s){let n=new T(s,t,e);W.system=n,W.galaxy=new M(s,t,e),await G(e,"galaxy"),await e.paint()}function q(e,t){document.getElementById("zoom-in")?.addEventListener("click",(()=>{const t=e.getPlugin(w);t&&t.zoom(.2)})),document.getElementById("zoom-out")?.addEventListener("click",(()=>{const t=e.getPlugin(w);t&&t.zoom(-.2)}));let s=document.getElementById("system-selection");for(let e of t.starSystems.keys()){let t=document.createElement("option");t.value=e,t.innerText=e,s.appendChild(t)}document.getElementById("galaxy-tab")?.addEventListener("click",(()=>{G(e,"galaxy")})),document.getElementById("system-tab")?.addEventListener("click",(()=>{G(e,"system")}))}let X=null;async function Y(){const e=await C(),t=e.filter((e=>null!=e.webkitRelativePath.match(/^([^\/]*\/)?data\//))),s=await k(t),n=function(e){const t=new Z;for(let s of e)if(s.webkitRelativePath.includes("images/")){let e=s.webkitRelativePath.split("images/")[1];e=e.replace(/([+\-~])?\.\w+$/,""),t.sprites.set(e,s)}return t}(e);let i=document.getElementById("viewer");X=z(i),_(X,n,s),q(X,s)}document.getElementById("select-file")?.addEventListener("click",(()=>{Y()}));
//# sourceMappingURL=index.2289063b.js.map
