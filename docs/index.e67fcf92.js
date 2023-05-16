class t{galaxies=new Map;starSystems=new Map;colors=new Map;sprites=new Map;governments=new Map;starSystemsLinks=new Set;constructor(){}addGalaxy(t){this.galaxies.set(t.name,t)}addStarSystem(t){this.starSystems.set(t.name,t);for(let e of t.links){let s=this.starSystems.get(e);if(s){let e=`${t.name}___${s.name}`,n=`${s.name}___${t.name}`;this.starSystems.has(n)||this.starSystemsLinks.add(e)}}}addSprite(t,e){this.sprites.set(t,e)}addColor(t){this.colors.set(t.name,t)}addGovernment(t){this.governments.set(t.name,t)}}function e(t,e){let s,n=!1;return function(){if(n)return;const i=arguments;t.apply(this,i),clearTimeout(s),s=setTimeout((()=>n=!1),e),n=!0}}class s{constructor(t,s){var n,i,o;this.app=t,this.settings=s,this.name="PanZoom",this.currentZoom=1,this.minZoom=.1,this.maxZoom=10,this.cameraOffset={x:0,y:0},this.isPanning=!1,this.startedPanningOffset={x:0,y:0},this.startedPanningPosition={x:0,y:0},this.throttle=-1,this.bindEvents(),this.minZoom=null!==(n=s.minZoom)&&void 0!==n?n:this.minZoom,this.maxZoom=null!==(i=s.maxZoom)&&void 0!==i?i:this.maxZoom,this.throttle=null!==(o=s.throttle)&&void 0!==o?o:this.throttle,this.throttledPaint=e(this.app.paint.bind(this.app),this.throttle)}bindEvents(){this.app.on("prerender",this.transformCanvas.bind(this)),this.app.canvas.addEventListener("pointerdown",this.onPointerDown.bind(this)),this.app.canvas.addEventListener("pointerup",this.onPointerUp.bind(this)),this.app.canvas.addEventListener("pointermove",this.onPointerMove.bind(this)),this.app.canvas.addEventListener("pointerleave",this.onPointerUp.bind(this)),this.app.canvas.addEventListener("wheel",this.onScroll.bind(this))}screenToLocalPoint(t,e){let s=this.app.canvas.width/2,n=this.app.canvas.height/2,i=this.cameraOffset.x,o=this.cameraOffset.y,r=this.currentZoom;return t-=s,e-=n,t/=r,e/=r,{x:t-=i,y:e-=o}}zoom(t){this.currentZoom+=t,this.currentZoom=Math.min(Math.max(this.minZoom,this.currentZoom),this.maxZoom),this.currentZoom=Math.floor(1e3*this.currentZoom)/1e3,this.updateRender()}transformCanvas(t){t.detail.context.scale(this.currentZoom,this.currentZoom),t.detail.context.translate(this.cameraOffset.x,this.cameraOffset.y)}onPointerDown(t){this.isPanning=!0,this.startedPanningOffset=this.cameraOffset,this.startedPanningPosition={x:t.clientX,y:t.clientY}}onPointerUp(t){this.isPanning=!1}onPointerMove(t){this.isPanning&&(this.cameraOffset={x:this.startedPanningOffset.x+(t.clientX-this.startedPanningPosition.x)/this.currentZoom,y:this.startedPanningOffset.y+(t.clientY-this.startedPanningPosition.y)/this.currentZoom},this.updateRender())}onScroll(t){this.zoom(t.deltaY/1e3)}updateRender(){this.throttle>0?this.throttledPaint():this.app.paint()}static getDataFromMatrix(t){return{scaleX:t.a,scaleY:t.d,translateX:t.e,translateY:t.f,skewX:t.b,skewY:t.c}}static fixedNumber(t,e,s="x"){let{scaleX:n,scaleY:i}=this.getDataFromMatrix(e.getTransform());return"x"==s?t*(1/n):t*(1/i)}static fixedSize(t,e,s){let{scaleX:n,scaleY:i}=this.getDataFromMatrix(s.getTransform());return{width:t*(1/n),height:e*(1/i)}}}class n{constructor(t,e,s,n,i=255){this.name=t,this.r=e,this.g=s,this.b=n,this.a=i}toString(){return 255==this.a?`rgb(${this.r}, ${this.g}, ${this.b})`:`rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`}static fromLine(t){let e=t.tokens[1],s=parseFloat(t.tokens[2]),i=parseFloat(t.tokens[3]),o=parseFloat(t.tokens[4]),r=255;return 6==t.tokens.length&&(r=parseFloat(t.tokens[5])),n.fromPercentages(e,s,i,o,r)}static fromPercentages(t,e,s,i,o){return new n(t,255*e,255*s,255*i,255*o)}static fromGovernment(t,e){let s=t.governments.get(e);if(!s)return null;if(s.color instanceof n)return s.color;let i=t.colors.get(s.color);return i||null}}const i=new Map;class o{links=[];government="";static fromLine(t,e){if("system"!=e.tokens[0])throw new Error("Not a system");const s=e.tokens[1];let n={x:0,y:0},r=!1,a=[],h="";for(let t of e.children)"pos"!=t.tokens[0]?("link"==t.tokens[0]&&a.push(t.tokens[1]),"government"==t.tokens[0]&&(h=t.tokens[1])):(n={x:parseInt(t.tokens[1]),y:parseInt(t.tokens[2])},r=!0);if(!r)throw new Error("No position found for this system");const l=new o(t,s,n);return l.links=a,l.government=h,i.set(s,l),l}constructor(t,e,s){this.name=e,this.position=s,this.esData=t,i.set(e,this)}getBCR(){return{top:this.position.y-3,bottom:this.position.y+3,left:this.position.x-3,right:this.position.x+3,width:6,height:6}}render(t){this.renderLinks(t),this.renderDot(t),this.renderName(t)}renderLinks(t){t.lineWidth=s.fixedNumber(1,t),t.strokeStyle="rgba(255,255,255,0.2)";for(let e of this.links){t.beginPath(),t.moveTo(this.position.x,this.position.y);const s=i.get(e);s&&(t.lineTo(s.position.x,s.position.y),t.stroke())}}renderDot(t){let e=n.fromGovernment(this.esData,this.government)?.toString();e||(e="#aaa"),t.beginPath(),t.fillStyle="black",t.strokeStyle=e,t.lineWidth=s.fixedNumber(2,t);let{width:i,height:o}=s.fixedSize(3,3,t);t.ellipse(this.position.x,this.position.y,i,o,0,0,2*Math.PI),t.fill(),t.stroke()}renderName(t){let{scaleX:e}=s.getDataFromMatrix(t.getTransform());if(e<.5)return;let n=s.fixedNumber(12,t);t.font=`${n}px Arial`,t.fillStyle="rgba(255,255,255,0.3)";let i=s.fixedNumber(4,t),{width:o,height:r}=s.fixedSize(3,3,t);t.fillText(this.name,this.position.x+o+i,this.position.y+r)}}class r{position={x:0,y:0};sprite="";spriteImage=null;static fromLine(t,e){if("galaxy"!=e.tokens[0])throw new Error("Not a galaxy");const s=e.tokens[1];let n={x:0,y:0},i=!1,o="";for(let t of e.children)"pos"!=t.tokens[0]?"sprite"==t.tokens[0]&&(o=t.tokens[1]):(n={x:parseInt(t.tokens[1]),y:parseInt(t.tokens[2])},i=!0);if(!i)throw new Error("No position found for this system");const a=new r(t,s,n);return""!=o&&(a.sprite=o),a}constructor(t,e,s){this.name=e,this.position=s,this.esData=t}loadImage(){return this.spriteImage||""==this.sprite?Promise.resolve():new Promise(((t,e)=>{let s=this.esData.sprites.get(this.sprite);if(!s)return void t();let n=URL.createObjectURL(s),i=new Image;i.onload=()=>{this.spriteImage=i,t()},i.onerror=()=>{e()},i.src=n}))}render(t){""!=this.sprite&&(null==this.spriteImage?console.error("Sprite image used before loading!"):t.drawImage(this.spriteImage,this.position.x-this.spriteImage.width/2,this.position.y-this.spriteImage.height/2))}}class a{constructor(t,e){this.tokens=t,this.indentation=e,this.children=[]}toString(){const t=[...this.tokens];let e="";for(const s of t)s.includes(" ")?s.includes('"')?e+="`"+s+"`":e+=`"${s}"`:e+=s+" ";return e}}class h extends a{constructor(t,e,s){super(t,e),this.tokens=t,this.indentation=e,this.isRoot=!0,this.filename=s}}function l(t,e=""){const s=new h([],0,e);let n=!1,i=!1,o="",r=new a([],0),l="",c=[s];for(let e=0;e<t.length;e++){const s=t[e];let h=null;if(!i||"\n"==s)switch(s){case"#":0!=l.length||n||(i=!0);break;case'"':case"`":if(n&&s==o){n=!1,0==l.length&&r.tokens.push("");break}if(!n&&0==l.length){n=!0,o=s;break}if(!n)throw new Error(`Unescaped quote in string after ${l}`);break;case"\n":if(""==l||i||r.tokens.push(l),l="",i=!1,h=new a([],0),0==r.tokens.length){r=h;continue}if(r.indentation>c.length-1)throw new Error(`Unexpected indentation for line ${r.tokens.join(" ")}`);if(r.indentation>=0&&c[r.indentation].children.push(r),r.indentation==c.length-1||(c=c.slice(0,r.indentation+1)),c.push(r),n)throw new Error(`A quote was left open near: '${l}'`);r=h;break;case" ":n?l+=" ":l.length>0&&(r.tokens.push(l),l="");break;case"\t":n||0!=r.tokens.length||0!=l.length?!n&&l.length>0?(r.tokens.push(l),l=""):l+="\t":r.indentation++;break;default:l+=s}}return s}function c(t,e){return new Promise(((s,n)=>{const i=new FileReader;i.onload=()=>{const t=i.result;s(l(t,e))},i.readAsText(t)}))}class d{color="";static fromLine(t,e){if("government"!=e.tokens[0])throw new Error("Not a government");const s=e.tokens[1];let i="";for(let t of e.children)if("color"==t.tokens[0])if(2==t.tokens.length)i=t.tokens[1];else{let t=parseFloat(e.tokens[1]),s=parseFloat(e.tokens[2]),o=parseFloat(e.tokens[3]),r=255;5==e.tokens.length&&(r=parseFloat(e.tokens[4])),i=n.fromPercentages("",t,s,o,r)}const o=new d(t,s);return o.color=i,o}constructor(t,e){this.esData=t,this.name=e}}async function m(e){const s=new t,i=[];for(let t of e)if(null!==t.webkitRelativePath.match(/^([^\/]+\/)?data\//)){let e=await c(t,t.webkitRelativePath);i.push(e);for(let t of e.children)if("system"==t.tokens[0])s.addStarSystem(o.fromLine(s,t));else if("galaxy"==t.tokens[0]){const e=r.fromLine(s,t);await e.loadImage(),s.addGalaxy(e)}else"color"==t.tokens[0]?s.addColor(n.fromLine(t)):"government"==t.tokens[0]&&s.addGovernment(d.fromLine(s,t))}else if(t.webkitRelativePath.includes("/images/")){let e=t.webkitRelativePath.split("/images/")[1];if(e=e.split(".")[0],"+"!=e.at(-1)&&"~"!=e.at(-1)&&"-"!=e.at(-1)||(e=e.slice(0,-1)),!e)continue;s.addSprite(e,t)}return console.log(s),s}class g extends EventTarget{constructor(t){super(),this.canvas=t,this.plugins=new Map;const e=this.canvas.getContext("2d");if(null==e)throw"Could not get the context for the canvas";this.context=e}renderCycle(){this.paint(),window.requestAnimationFrame((()=>this.renderCycle()))}use(t,e){const s=new t(this,e);this.plugins.set(s.name,s)}getPlugin(t){for(let e of this.plugins.values())if(e instanceof t)return e}paint(t=!0){this.prepareContext(t);const e={context:this.context};this.preRender(e),this.render(e),this.postRender(e)}prepareContext(t=!0){this.context.resetTransform(),t&&this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.translate(Math.floor(this.canvas.width/2),Math.floor(this.canvas.height/2))}on(t,e){this.addEventListener(t,e)}startRendering(){window.requestAnimationFrame((()=>this.renderCycle()))}preRender(t){const e=new CustomEvent("prerender",{detail:t});this.dispatchEvent(e)}render(t){const e=new CustomEvent("render",{detail:t});this.dispatchEvent(e)}postRender(t){const e=new CustomEvent("postrender",{detail:t});this.dispatchEvent(e)}}class p extends EventTarget{constructor(t,e){super(),this.esData=t,this.canvasLib=e,this.shouldRenderNames=!0,this.shouldRenderLinks=!0,this.shouldRenderDots=!0,this.shouldRenderGalaxies=!0}activate(){document.getElementById("toggle-galaxies")?.addEventListener("change",this.toggleGalaxies.bind(this)),document.getElementById("toggle-pins")?.addEventListener("change",this.toggleDots.bind(this)),document.getElementById("toggle-names")?.addEventListener("change",this.toggleNames.bind(this)),document.getElementById("toggle-links")?.addEventListener("change",this.toggleLinks.bind(this))}deactivate(){}toggleNames(t){this.shouldRenderNames=t.target.checked,this.canvasLib.paint()}toggleLinks(t){this.shouldRenderLinks=t.target.checked,this.canvasLib.paint()}toggleDots(t){this.shouldRenderDots=t.target.checked,this.canvasLib.paint()}toggleGalaxies(t){this.shouldRenderGalaxies=t.target.checked,this.canvasLib.paint()}preRender(t){if(this.esData){if(this.shouldRenderGalaxies)for(let e of this.esData.galaxies.values())e.render(t);if(this.shouldRenderLinks){t.lineWidth=s.fixedNumber(1,t),t.strokeStyle="rgba(255,255,255,0.2)";for(let e of this.esData.starSystemsLinks.values()){let[s,n]=e.split("___"),i=this.esData.starSystems.get(s),o=this.esData.starSystems.get(n);o&&i&&(t.beginPath(),t.moveTo(i.position.x,i.position.y),t.lineTo(o.position.x,o.position.y),t.stroke())}}}}render(t){if(this.esData)for(let e of this.esData.starSystems.values())this.shouldRenderDots&&e.renderDot(t),this.shouldRenderNames&&e.renderName(t)}postRender(t){}}const u={galaxy:null};let f=null;function k(t){let e=t.getBoundingClientRect();t.width=e.width,t.height=e.height;const n=new g(t);n.use(s,{});return n.on("prerender",(t=>{f?.preRender(t.detail.context)})),n.on("render",(async t=>{f?.render(t.detail.context)})),n.on("postrender",(async t=>{f?.render(t.detail.context)})),n}function v(t,e){var s;u.galaxy=new p(e,t),s=u.galaxy,f?.deactivate(),f=s,f.activate(),t.paint()}const x=async()=>new Promise((t=>{const e=document.createElement("input");e.type="file",e.webkitdirectory=!0,e.addEventListener("change",(()=>{let s=Array.from(e.files);t(s)})),"showPicker"in HTMLInputElement.prototype?e.showPicker():e.click()}));let w=null;async function y(){const t=await x(),e=await m(t);let n=document.getElementById("viewer");var i;w=k(n),v(w,e),i=w,document.getElementById("zoom-in")?.addEventListener("click",(()=>{const t=i.getPlugin(s);t&&t.zoom(.2)})),document.getElementById("zoom-out")?.addEventListener("click",(()=>{const t=i.getPlugin(s);t&&t.zoom(-.2)})),document.getElementById("viewer")?.addEventListener("pointerdown",(t=>{const e=i.getPlugin(s);e&&console.log(e.screenToLocalPoint(t.clientX,t.clientY))}))}document.getElementById("select-file")?.addEventListener("click",(()=>{y()}));
//# sourceMappingURL=index.e67fcf92.js.map