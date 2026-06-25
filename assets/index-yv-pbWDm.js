var ec=Object.defineProperty;var tc=(i,e,t)=>e in i?ec(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var M=(i,e,t)=>tc(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Vr="160",nc=0,lo=1,ic=2,ol=1,sc=2,tn=3,Mn=0,Tt=1,nn=2,rn=0,hi=1,br=2,co=3,ho=4,rc=5,Ln=100,oc=101,ac=102,uo=103,fo=104,lc=200,cc=201,hc=202,uc=203,Er=204,Tr=205,dc=206,fc=207,pc=208,mc=209,gc=210,_c=211,vc=212,xc=213,yc=214,Mc=0,Sc=1,bc=2,gs=3,Ec=4,Tc=5,wc=6,Ac=7,al=0,Cc=1,Rc=2,xn=0,Pc=1,Lc=2,Ic=3,Dc=4,Uc=5,Nc=6,ll=300,di=301,fi=302,wr=303,Ar=304,ws=306,Cr=1e3,Wt=1001,Rr=1002,yt=1003,po=1004,Ns=1005,Nt=1006,Fc=1007,Pi=1008,yn=1009,Oc=1010,Bc=1011,Wr=1012,cl=1013,mn=1014,gn=1015,on=1016,hl=1017,ul=1018,Un=1020,zc=1021,qt=1023,kc=1024,Hc=1025,Nn=1026,pi=1027,Gc=1028,dl=1029,Vc=1030,fl=1031,pl=1033,Fs=33776,Os=33777,Bs=33778,zs=33779,mo=35840,go=35841,_o=35842,vo=35843,ml=36196,xo=37492,yo=37496,Mo=37808,So=37809,bo=37810,Eo=37811,To=37812,wo=37813,Ao=37814,Co=37815,Ro=37816,Po=37817,Lo=37818,Io=37819,Do=37820,Uo=37821,ks=36492,No=36494,Fo=36495,Wc=36283,Oo=36284,Bo=36285,zo=36286,gl=3e3,Fn=3001,qc=3200,Xc=3201,_l=0,Yc=1,Ot="",ft="srgb",an="srgb-linear",qr="display-p3",As="display-p3-linear",_s="linear",Qe="srgb",vs="rec709",xs="p3",Hn=7680,ko=519,jc=512,$c=513,Kc=514,vl=515,Zc=516,Jc=517,Qc=518,eh=519,Ho=35044,Go="300 es",Pr=1035,sn=2e3,ys=2001;class kn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const mt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Hs=Math.PI/180,Lr=180/Math.PI;function Ii(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(mt[i&255]+mt[i>>8&255]+mt[i>>16&255]+mt[i>>24&255]+"-"+mt[e&255]+mt[e>>8&255]+"-"+mt[e>>16&15|64]+mt[e>>24&255]+"-"+mt[t&63|128]+mt[t>>8&255]+"-"+mt[t>>16&255]+mt[t>>24&255]+mt[n&255]+mt[n>>8&255]+mt[n>>16&255]+mt[n>>24&255]).toLowerCase()}function bt(i,e,t){return Math.max(e,Math.min(t,i))}function th(i,e){return(i%e+e)%e}function Gs(i,e,t){return(1-t)*i+t*e}function Vo(i){return(i&i-1)===0&&i!==0}function Ir(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Si(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function St(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Fe{constructor(e=0,t=0){Fe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(bt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class We{constructor(e,t,n,s,r,o,a,l,c){We.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],_=s[0],m=s[3],f=s[6],T=s[1],S=s[4],P=s[7],O=s[2],I=s[5],L=s[8];return r[0]=o*_+a*T+l*O,r[3]=o*m+a*S+l*I,r[6]=o*f+a*P+l*L,r[1]=c*_+h*T+u*O,r[4]=c*m+h*S+u*I,r[7]=c*f+h*P+u*L,r[2]=d*_+p*T+g*O,r[5]=d*m+p*S+g*I,r[8]=d*f+p*P+g*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,p=c*r-o*l,g=t*u+n*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(s*c-h*n)*_,e[2]=(a*n-s*o)*_,e[3]=d*_,e[4]=(h*t-s*l)*_,e[5]=(s*r-a*t)*_,e[6]=p*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Vs.makeScale(e,t)),this}rotate(e){return this.premultiply(Vs.makeRotation(-e)),this}translate(e,t){return this.premultiply(Vs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Vs=new We;function xl(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ms(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function nh(){const i=Ms("canvas");return i.style.display="block",i}const Wo={};function Ri(i){i in Wo||(Wo[i]=!0,console.warn(i))}const qo=new We().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Xo=new We().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Bi={[an]:{transfer:_s,primaries:vs,toReference:i=>i,fromReference:i=>i},[ft]:{transfer:Qe,primaries:vs,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[As]:{transfer:_s,primaries:xs,toReference:i=>i.applyMatrix3(Xo),fromReference:i=>i.applyMatrix3(qo)},[qr]:{transfer:Qe,primaries:xs,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Xo),fromReference:i=>i.applyMatrix3(qo).convertLinearToSRGB()}},ih=new Set([an,As]),$e={enabled:!0,_workingColorSpace:an,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!ih.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Bi[e].toReference,s=Bi[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Bi[i].primaries},getTransfer:function(i){return i===Ot?_s:Bi[i].transfer}};function ui(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ws(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Gn;class yl{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Gn===void 0&&(Gn=Ms("canvas")),Gn.width=e.width,Gn.height=e.height;const n=Gn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Gn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ms("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ui(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ui(t[n]/255)*255):t[n]=ui(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let sh=0;class Ml{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:sh++}),this.uuid=Ii(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(qs(s[o].image)):r.push(qs(s[o]))}else r=qs(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function qs(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?yl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let rh=0;class Pt extends kn{constructor(e=Pt.DEFAULT_IMAGE,t=Pt.DEFAULT_MAPPING,n=Wt,s=Wt,r=Nt,o=Pi,a=qt,l=yn,c=Pt.DEFAULT_ANISOTROPY,h=Ot){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:rh++}),this.uuid=Ii(),this.name="",this.source=new Ml(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Fe(0,0),this.repeat=new Fe(1,1),this.center=new Fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Ri("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Fn?ft:Ot),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ll)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Cr:e.x=e.x-Math.floor(e.x);break;case Wt:e.x=e.x<0?0:1;break;case Rr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Cr:e.y=e.y-Math.floor(e.y);break;case Wt:e.y=e.y<0?0:1;break;case Rr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ri("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ft?Fn:gl}set encoding(e){Ri("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Fn?ft:Ot}}Pt.DEFAULT_IMAGE=null;Pt.DEFAULT_MAPPING=ll;Pt.DEFAULT_ANISOTROPY=1;class ut{constructor(e=0,t=0,n=0,s=1){ut.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,P=(p+1)/2,O=(f+1)/2,I=(h+d)/4,L=(u+_)/4,oe=(g+m)/4;return S>P&&S>O?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=I/n,r=L/n):P>O?P<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(P),n=I/s,r=oe/s):O<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(O),n=L/r,s=oe/r),this.set(n,s,r,t),this}let T=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(u-_)/T,this.z=(d-h)/T,this.w=Math.acos((c+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class oh extends kn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ut(0,0,e,t),this.scissorTest=!1,this.viewport=new ut(0,0,e,t);const s={width:e,height:t,depth:1};n.encoding!==void 0&&(Ri("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Fn?ft:Ot),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Pt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Ml(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Xt extends oh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Sl extends Pt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=yt,this.minFilter=yt,this.wrapR=Wt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ah extends Pt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=yt,this.minFilter=yt,this.wrapR=Wt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Di{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||c!==p||h!==g){let m=1-a;const f=l*d+c*p+h*g+u*_,T=f>=0?1:-1,S=1-f*f;if(S>Number.EPSILON){const O=Math.sqrt(S),I=Math.atan2(O,f*T);m=Math.sin(m*I)/O,a=Math.sin(a*I)/O}const P=a*T;if(l=l*m+d*P,c=c*m+p*P,h=h*m+g*P,u=u*m+_*P,m===1-a){const O=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=O,c*=O,h*=O,u*=O}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+h*u+l*p-c*d,e[t+1]=l*g+h*d+c*u-a*p,e[t+2]=c*g+h*p+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"YZX":this._x=d*h*u+c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u-d*p*g;break;case"XZY":this._x=d*h*u-c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(n>a&&n>u){const p=2*Math.sqrt(1+n-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>u){const p=2*Math.sqrt(1+a-n-u);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-n-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(bt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),n*Math.sin(r),n*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,n=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Yo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Yo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Xs.copy(this).projectOnVector(e),this.sub(Xs)}reflect(e){return this.sub(Xs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(bt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Xs=new U,Yo=new Di;class Ui{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(kt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(kt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=kt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,kt):kt.fromBufferAttribute(r,o),kt.applyMatrix4(e.matrixWorld),this.expandByPoint(kt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),zi.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),zi.copy(n.boundingBox)),zi.applyMatrix4(e.matrixWorld),this.union(zi)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,kt),kt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(bi),ki.subVectors(this.max,bi),Vn.subVectors(e.a,bi),Wn.subVectors(e.b,bi),qn.subVectors(e.c,bi),ln.subVectors(Wn,Vn),cn.subVectors(qn,Wn),Tn.subVectors(Vn,qn);let t=[0,-ln.z,ln.y,0,-cn.z,cn.y,0,-Tn.z,Tn.y,ln.z,0,-ln.x,cn.z,0,-cn.x,Tn.z,0,-Tn.x,-ln.y,ln.x,0,-cn.y,cn.x,0,-Tn.y,Tn.x,0];return!Ys(t,Vn,Wn,qn,ki)||(t=[1,0,0,0,1,0,0,0,1],!Ys(t,Vn,Wn,qn,ki))?!1:(Hi.crossVectors(ln,cn),t=[Hi.x,Hi.y,Hi.z],Ys(t,Vn,Wn,qn,ki))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,kt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(kt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Kt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Kt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Kt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Kt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Kt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Kt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Kt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Kt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Kt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Kt=[new U,new U,new U,new U,new U,new U,new U,new U],kt=new U,zi=new Ui,Vn=new U,Wn=new U,qn=new U,ln=new U,cn=new U,Tn=new U,bi=new U,ki=new U,Hi=new U,wn=new U;function Ys(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){wn.fromArray(i,r);const a=s.x*Math.abs(wn.x)+s.y*Math.abs(wn.y)+s.z*Math.abs(wn.z),l=e.dot(wn),c=t.dot(wn),h=n.dot(wn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const lh=new Ui,Ei=new U,js=new U;class Cs{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):lh.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ei.subVectors(e,this.center);const t=Ei.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ei,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(js.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ei.copy(e.center).add(js)),this.expandByPoint(Ei.copy(e.center).sub(js))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Zt=new U,$s=new U,Gi=new U,hn=new U,Ks=new U,Vi=new U,Zs=new U;class bl{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Zt)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Zt.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Zt.copy(this.origin).addScaledVector(this.direction,t),Zt.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){$s.copy(e).add(t).multiplyScalar(.5),Gi.copy(t).sub(e).normalize(),hn.copy(this.origin).sub($s);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Gi),a=hn.dot(this.direction),l=-hn.dot(Gi),c=hn.lengthSq(),h=Math.abs(1-o*o);let u,d,p,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,p=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy($s).addScaledVector(Gi,d),p}intersectSphere(e,t){Zt.subVectors(e.center,this.origin);const n=Zt.dot(this.direction),s=Zt.dot(Zt)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Zt)!==null}intersectTriangle(e,t,n,s,r){Ks.subVectors(t,e),Vi.subVectors(n,e),Zs.crossVectors(Ks,Vi);let o=this.direction.dot(Zs),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;hn.subVectors(this.origin,e);const l=a*this.direction.dot(Vi.crossVectors(hn,Vi));if(l<0)return null;const c=a*this.direction.dot(Ks.cross(hn));if(c<0||l+c>o)return null;const h=-a*hn.dot(Zs);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rt{constructor(e,t,n,s,r,o,a,l,c,h,u,d,p,g,_,m){rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,h,u,d,p,g,_,m)}set(e,t,n,s,r,o,a,l,c,h,u,d,p,g,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Xn.setFromMatrixColumn(e,0).length(),r=1/Xn.setFromMatrixColumn(e,1).length(),o=1/Xn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,p=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=p+g*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=g+p*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,p=l*u,g=c*h,_=c*u;t[0]=d+_*a,t[4]=g*a-p,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=p*a-g,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,p=l*u,g=c*h,_=c*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,p=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=g*c-p,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=p*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,p=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=_-d*u,t[8]=g*u+p,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=p*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*l,p=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=o*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ch,e,hh)}lookAt(e,t,n){const s=this.elements;return At.subVectors(e,t),At.lengthSq()===0&&(At.z=1),At.normalize(),un.crossVectors(n,At),un.lengthSq()===0&&(Math.abs(n.z)===1?At.x+=1e-4:At.z+=1e-4,At.normalize(),un.crossVectors(n,At)),un.normalize(),Wi.crossVectors(At,un),s[0]=un.x,s[4]=Wi.x,s[8]=At.x,s[1]=un.y,s[5]=Wi.y,s[9]=At.y,s[2]=un.z,s[6]=Wi.z,s[10]=At.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],T=n[3],S=n[7],P=n[11],O=n[15],I=s[0],L=s[4],oe=s[8],E=s[12],w=s[1],j=s[5],ie=s[9],pe=s[13],N=s[2],X=s[6],K=s[10],te=s[14],J=s[3],Z=s[7],ae=s[11],le=s[15];return r[0]=o*I+a*w+l*N+c*J,r[4]=o*L+a*j+l*X+c*Z,r[8]=o*oe+a*ie+l*K+c*ae,r[12]=o*E+a*pe+l*te+c*le,r[1]=h*I+u*w+d*N+p*J,r[5]=h*L+u*j+d*X+p*Z,r[9]=h*oe+u*ie+d*K+p*ae,r[13]=h*E+u*pe+d*te+p*le,r[2]=g*I+_*w+m*N+f*J,r[6]=g*L+_*j+m*X+f*Z,r[10]=g*oe+_*ie+m*K+f*ae,r[14]=g*E+_*pe+m*te+f*le,r[3]=T*I+S*w+P*N+O*J,r[7]=T*L+S*j+P*X+O*Z,r[11]=T*oe+S*ie+P*K+O*ae,r[15]=T*E+S*pe+P*te+O*le,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+r*l*u-s*c*u-r*a*d+n*c*d+s*a*p-n*l*p)+_*(+t*l*p-t*c*d+r*o*d-s*o*p+s*c*h-r*l*h)+m*(+t*c*u-t*a*p-r*o*u+n*o*p+r*a*h-n*c*h)+f*(-s*a*h-t*l*u+t*a*d+s*o*u-n*o*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],T=u*m*c-_*d*c+_*l*p-a*m*p-u*l*f+a*d*f,S=g*d*c-h*m*c-g*l*p+o*m*p+h*l*f-o*d*f,P=h*_*c-g*u*c+g*a*p-o*_*p-h*a*f+o*u*f,O=g*u*l-h*_*l-g*a*d+o*_*d+h*a*m-o*u*m,I=t*T+n*S+s*P+r*O;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/I;return e[0]=T*L,e[1]=(_*d*r-u*m*r-_*s*p+n*m*p+u*s*f-n*d*f)*L,e[2]=(a*m*r-_*l*r+_*s*c-n*m*c-a*s*f+n*l*f)*L,e[3]=(u*l*r-a*d*r-u*s*c+n*d*c+a*s*p-n*l*p)*L,e[4]=S*L,e[5]=(h*m*r-g*d*r+g*s*p-t*m*p-h*s*f+t*d*f)*L,e[6]=(g*l*r-o*m*r-g*s*c+t*m*c+o*s*f-t*l*f)*L,e[7]=(o*d*r-h*l*r+h*s*c-t*d*c-o*s*p+t*l*p)*L,e[8]=P*L,e[9]=(g*u*r-h*_*r-g*n*p+t*_*p+h*n*f-t*u*f)*L,e[10]=(o*_*r-g*a*r+g*n*c-t*_*c-o*n*f+t*a*f)*L,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*p-t*a*p)*L,e[12]=O*L,e[13]=(h*_*s-g*u*s+g*n*d-t*_*d-h*n*m+t*u*m)*L,e[14]=(g*a*s-o*_*s-g*n*l+t*_*l+o*n*m-t*a*m)*L,e[15]=(o*u*s-h*a*s+h*n*l-t*u*l-o*n*d+t*a*d)*L,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,p=r*h,g=r*u,_=o*h,m=o*u,f=a*u,T=l*c,S=l*h,P=l*u,O=n.x,I=n.y,L=n.z;return s[0]=(1-(_+f))*O,s[1]=(p+P)*O,s[2]=(g-S)*O,s[3]=0,s[4]=(p-P)*I,s[5]=(1-(d+f))*I,s[6]=(m+T)*I,s[7]=0,s[8]=(g+S)*L,s[9]=(m-T)*L,s[10]=(1-(d+_))*L,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Xn.set(s[0],s[1],s[2]).length();const o=Xn.set(s[4],s[5],s[6]).length(),a=Xn.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Ht.copy(this);const c=1/r,h=1/o,u=1/a;return Ht.elements[0]*=c,Ht.elements[1]*=c,Ht.elements[2]*=c,Ht.elements[4]*=h,Ht.elements[5]*=h,Ht.elements[6]*=h,Ht.elements[8]*=u,Ht.elements[9]*=u,Ht.elements[10]*=u,t.setFromRotationMatrix(Ht),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=sn){const l=this.elements,c=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),d=(n+s)/(n-s);let p,g;if(a===sn)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===ys)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=sn){const l=this.elements,c=1/(t-e),h=1/(n-s),u=1/(o-r),d=(t+e)*c,p=(n+s)*h;let g,_;if(a===sn)g=(o+r)*u,_=-2*u;else if(a===ys)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Xn=new U,Ht=new rt,ch=new U(0,0,0),hh=new U(1,1,1),un=new U,Wi=new U,At=new U,jo=new rt,$o=new Di;class _i{constructor(e=0,t=0,n=0,s=_i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(bt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-bt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(bt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-bt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(bt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-bt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return jo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(jo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return $o.setFromEuler(this),this.setFromQuaternion($o,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_i.DEFAULT_ORDER="XYZ";class El{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let uh=0;const Ko=new U,Yn=new Di,Jt=new rt,qi=new U,Ti=new U,dh=new U,fh=new Di,Zo=new U(1,0,0),Jo=new U(0,1,0),Qo=new U(0,0,1),ph={type:"added"},mh={type:"removed"};class dt extends kn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:uh++}),this.uuid=Ii(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=dt.DEFAULT_UP.clone();const e=new U,t=new _i,n=new Di,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new rt},normalMatrix:{value:new We}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=dt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new El,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Yn.setFromAxisAngle(e,t),this.quaternion.multiply(Yn),this}rotateOnWorldAxis(e,t){return Yn.setFromAxisAngle(e,t),this.quaternion.premultiply(Yn),this}rotateX(e){return this.rotateOnAxis(Zo,e)}rotateY(e){return this.rotateOnAxis(Jo,e)}rotateZ(e){return this.rotateOnAxis(Qo,e)}translateOnAxis(e,t){return Ko.copy(e).applyQuaternion(this.quaternion),this.position.add(Ko.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Zo,e)}translateY(e){return this.translateOnAxis(Jo,e)}translateZ(e){return this.translateOnAxis(Qo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Jt.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?qi.copy(e):qi.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ti.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jt.lookAt(Ti,qi,this.up):Jt.lookAt(qi,Ti,this.up),this.quaternion.setFromRotationMatrix(Jt),s&&(Jt.extractRotation(s.matrixWorld),Yn.setFromRotationMatrix(Jt),this.quaternion.premultiply(Yn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(ph)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(mh)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Jt.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Jt.multiply(e.parent.matrixWorld)),e.applyMatrix4(Jt),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ti,e,dh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ti,fh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++){const a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}dt.DEFAULT_UP=new U(0,1,0);dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Gt=new U,Qt=new U,Js=new U,en=new U,jn=new U,$n=new U,ea=new U,Qs=new U,er=new U,tr=new U;let Xi=!1;class Vt{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Gt.subVectors(e,t),s.cross(Gt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Gt.subVectors(s,t),Qt.subVectors(n,t),Js.subVectors(e,t);const o=Gt.dot(Gt),a=Gt.dot(Qt),l=Gt.dot(Js),c=Qt.dot(Qt),h=Qt.dot(Js),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,p=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,en)===null?!1:en.x>=0&&en.y>=0&&en.x+en.y<=1}static getUV(e,t,n,s,r,o,a,l){return Xi===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Xi=!0),this.getInterpolation(e,t,n,s,r,o,a,l)}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,en)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,en.x),l.addScaledVector(o,en.y),l.addScaledVector(a,en.z),l)}static isFrontFacing(e,t,n,s){return Gt.subVectors(n,t),Qt.subVectors(e,t),Gt.cross(Qt).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Gt.subVectors(this.c,this.b),Qt.subVectors(this.a,this.b),Gt.cross(Qt).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Vt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Vt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,s,r){return Xi===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Xi=!0),Vt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}getInterpolation(e,t,n,s,r){return Vt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Vt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Vt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;jn.subVectors(s,n),$n.subVectors(r,n),Qs.subVectors(e,n);const l=jn.dot(Qs),c=$n.dot(Qs);if(l<=0&&c<=0)return t.copy(n);er.subVectors(e,s);const h=jn.dot(er),u=$n.dot(er);if(h>=0&&u<=h)return t.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(jn,o);tr.subVectors(e,r);const p=jn.dot(tr),g=$n.dot(tr);if(g>=0&&p<=g)return t.copy(r);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector($n,a);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return ea.subVectors(r,s),a=(u-h)/(u-h+(p-g)),t.copy(s).addScaledVector(ea,a);const f=1/(m+_+d);return o=_*f,a=d*f,t.copy(n).addScaledVector(jn,o).addScaledVector($n,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Tl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},dn={h:0,s:0,l:0},Yi={h:0,s:0,l:0};function nr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ce{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ft){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=$e.workingColorSpace){return this.r=e,this.g=t,this.b=n,$e.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=$e.workingColorSpace){if(e=th(e,1),t=bt(t,0,1),n=bt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=nr(o,r,e+1/3),this.g=nr(o,r,e),this.b=nr(o,r,e-1/3)}return $e.toWorkingColorSpace(this,s),this}setStyle(e,t=ft){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ft){const n=Tl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ui(e.r),this.g=ui(e.g),this.b=ui(e.b),this}copyLinearToSRGB(e){return this.r=Ws(e.r),this.g=Ws(e.g),this.b=Ws(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ft){return $e.fromWorkingColorSpace(gt.copy(this),e),Math.round(bt(gt.r*255,0,255))*65536+Math.round(bt(gt.g*255,0,255))*256+Math.round(bt(gt.b*255,0,255))}getHexString(e=ft){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.fromWorkingColorSpace(gt.copy(this),t);const n=gt.r,s=gt.g,r=gt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=$e.workingColorSpace){return $e.fromWorkingColorSpace(gt.copy(this),t),e.r=gt.r,e.g=gt.g,e.b=gt.b,e}getStyle(e=ft){$e.fromWorkingColorSpace(gt.copy(this),e);const t=gt.r,n=gt.g,s=gt.b;return e!==ft?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(dn),this.setHSL(dn.h+e,dn.s+t,dn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(dn),e.getHSL(Yi);const n=Gs(dn.h,Yi.h,t),s=Gs(dn.s,Yi.s,t),r=Gs(dn.l,Yi.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const gt=new Ce;Ce.NAMES=Tl;let gh=0;class vi extends kn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gh++}),this.uuid=Ii(),this.name="",this.type="Material",this.blending=hi,this.side=Mn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Er,this.blendDst=Tr,this.blendEquation=Ln,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ce(0,0,0),this.blendAlpha=0,this.depthFunc=gs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ko,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hn,this.stencilZFail=Hn,this.stencilZPass=Hn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==hi&&(n.blending=this.blending),this.side!==Mn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Er&&(n.blendSrc=this.blendSrc),this.blendDst!==Tr&&(n.blendDst=this.blendDst),this.blendEquation!==Ln&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==gs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ko&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Hn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Hn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Xr extends vi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=al,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const it=new U,ji=new Fe;class Mt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ho,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=gn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ji.fromBufferAttribute(this,t),ji.applyMatrix3(e),this.setXY(t,ji.x,ji.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)it.fromBufferAttribute(this,t),it.applyMatrix3(e),this.setXYZ(t,it.x,it.y,it.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)it.fromBufferAttribute(this,t),it.applyMatrix4(e),this.setXYZ(t,it.x,it.y,it.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)it.fromBufferAttribute(this,t),it.applyNormalMatrix(e),this.setXYZ(t,it.x,it.y,it.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)it.fromBufferAttribute(this,t),it.transformDirection(e),this.setXYZ(t,it.x,it.y,it.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Si(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=St(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Si(t,this.array)),t}setX(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Si(t,this.array)),t}setY(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Si(t,this.array)),t}setZ(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Si(t,this.array)),t}setW(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),n=St(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),n=St(n,this.array),s=St(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),n=St(n,this.array),s=St(s,this.array),r=St(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ho&&(e.usage=this.usage),e}}class wl extends Mt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Al extends Mt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Bt extends Mt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let _h=0;const Dt=new rt,ir=new dt,Kn=new U,Ct=new Ui,wi=new Ui,ht=new U;class zt extends kn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_h++}),this.uuid=Ii(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(xl(e)?Al:wl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new We().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Dt.makeRotationFromQuaternion(e),this.applyMatrix4(Dt),this}rotateX(e){return Dt.makeRotationX(e),this.applyMatrix4(Dt),this}rotateY(e){return Dt.makeRotationY(e),this.applyMatrix4(Dt),this}rotateZ(e){return Dt.makeRotationZ(e),this.applyMatrix4(Dt),this}translate(e,t,n){return Dt.makeTranslation(e,t,n),this.applyMatrix4(Dt),this}scale(e,t,n){return Dt.makeScale(e,t,n),this.applyMatrix4(Dt),this}lookAt(e){return ir.lookAt(e),ir.updateMatrix(),this.applyMatrix4(ir.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Kn).negate(),this.translate(Kn.x,Kn.y,Kn.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Bt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ui);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Ct.setFromBufferAttribute(r),this.morphTargetsRelative?(ht.addVectors(this.boundingBox.min,Ct.min),this.boundingBox.expandByPoint(ht),ht.addVectors(this.boundingBox.max,Ct.max),this.boundingBox.expandByPoint(ht)):(this.boundingBox.expandByPoint(Ct.min),this.boundingBox.expandByPoint(Ct.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new U,1/0);return}if(e){const n=this.boundingSphere.center;if(Ct.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];wi.setFromBufferAttribute(a),this.morphTargetsRelative?(ht.addVectors(Ct.min,wi.min),Ct.expandByPoint(ht),ht.addVectors(Ct.max,wi.max),Ct.expandByPoint(ht)):(Ct.expandByPoint(wi.min),Ct.expandByPoint(wi.max))}Ct.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)ht.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(ht));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)ht.fromBufferAttribute(a,c),l&&(Kn.fromBufferAttribute(e,c),ht.add(Kn)),s=Math.max(s,n.distanceToSquared(ht))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,s=t.position.array,r=t.normal.array,o=t.uv.array,a=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mt(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let w=0;w<a;w++)c[w]=new U,h[w]=new U;const u=new U,d=new U,p=new U,g=new Fe,_=new Fe,m=new Fe,f=new U,T=new U;function S(w,j,ie){u.fromArray(s,w*3),d.fromArray(s,j*3),p.fromArray(s,ie*3),g.fromArray(o,w*2),_.fromArray(o,j*2),m.fromArray(o,ie*2),d.sub(u),p.sub(u),_.sub(g),m.sub(g);const pe=1/(_.x*m.y-m.x*_.y);isFinite(pe)&&(f.copy(d).multiplyScalar(m.y).addScaledVector(p,-_.y).multiplyScalar(pe),T.copy(p).multiplyScalar(_.x).addScaledVector(d,-m.x).multiplyScalar(pe),c[w].add(f),c[j].add(f),c[ie].add(f),h[w].add(T),h[j].add(T),h[ie].add(T))}let P=this.groups;P.length===0&&(P=[{start:0,count:n.length}]);for(let w=0,j=P.length;w<j;++w){const ie=P[w],pe=ie.start,N=ie.count;for(let X=pe,K=pe+N;X<K;X+=3)S(n[X+0],n[X+1],n[X+2])}const O=new U,I=new U,L=new U,oe=new U;function E(w){L.fromArray(r,w*3),oe.copy(L);const j=c[w];O.copy(j),O.sub(L.multiplyScalar(L.dot(j))).normalize(),I.crossVectors(oe,j);const pe=I.dot(h[w])<0?-1:1;l[w*4]=O.x,l[w*4+1]=O.y,l[w*4+2]=O.z,l[w*4+3]=pe}for(let w=0,j=P.length;w<j;++w){const ie=P[w],pe=ie.start,N=ie.count;for(let X=pe,K=pe+N;X<K;X+=3)E(n[X+0]),E(n[X+1]),E(n[X+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Mt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const s=new U,r=new U,o=new U,a=new U,l=new U,c=new U,h=new U,u=new U;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)ht.fromBufferAttribute(e,t),ht.normalize(),e.setXYZ(t,ht.x,ht.y,ht.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*h;for(let f=0;f<h;f++)d[g++]=c[p++]}return new Mt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new zt,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],p=e(d,n);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const p=c[u];h.push(p.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ta=new rt,An=new bl,$i=new Cs,na=new U,Zn=new U,Jn=new U,Qn=new U,sr=new U,Ki=new U,Zi=new Fe,Ji=new Fe,Qi=new Fe,ia=new U,sa=new U,ra=new U,es=new U,ts=new U;class st extends dt{constructor(e=new zt,t=new Xr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Ki.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(sr.fromBufferAttribute(u,e),o?Ki.addScaledVector(sr,h):Ki.addScaledVector(sr.sub(t),h))}t.add(Ki)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$i.copy(n.boundingSphere),$i.applyMatrix4(r),An.copy(e.ray).recast(e.near),!($i.containsPoint(An.origin)===!1&&(An.intersectSphere($i,na)===null||An.origin.distanceToSquared(na)>(e.far-e.near)**2))&&(ta.copy(r).invert(),An.copy(e.ray).applyMatrix4(ta),!(n.boundingBox!==null&&An.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,An)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=o[m.materialIndex],T=Math.max(m.start,p.start),S=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let P=T,O=S;P<O;P+=3){const I=a.getX(P),L=a.getX(P+1),oe=a.getX(P+2);s=ns(this,f,e,n,c,h,u,I,L,oe),s&&(s.faceIndex=Math.floor(P/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const T=a.getX(m),S=a.getX(m+1),P=a.getX(m+2);s=ns(this,o,e,n,c,h,u,T,S,P),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=o[m.materialIndex],T=Math.max(m.start,p.start),S=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let P=T,O=S;P<O;P+=3){const I=P,L=P+1,oe=P+2;s=ns(this,f,e,n,c,h,u,I,L,oe),s&&(s.faceIndex=Math.floor(P/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const T=m,S=m+1,P=m+2;s=ns(this,o,e,n,c,h,u,T,S,P),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function vh(i,e,t,n,s,r,o,a){let l;if(e.side===Tt?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===Mn,a),l===null)return null;ts.copy(a),ts.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(ts);return c<t.near||c>t.far?null:{distance:c,point:ts.clone(),object:i}}function ns(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,Zn),i.getVertexPosition(l,Jn),i.getVertexPosition(c,Qn);const h=vh(i,e,t,n,Zn,Jn,Qn,es);if(h){s&&(Zi.fromBufferAttribute(s,a),Ji.fromBufferAttribute(s,l),Qi.fromBufferAttribute(s,c),h.uv=Vt.getInterpolation(es,Zn,Jn,Qn,Zi,Ji,Qi,new Fe)),r&&(Zi.fromBufferAttribute(r,a),Ji.fromBufferAttribute(r,l),Qi.fromBufferAttribute(r,c),h.uv1=Vt.getInterpolation(es,Zn,Jn,Qn,Zi,Ji,Qi,new Fe),h.uv2=h.uv1),o&&(ia.fromBufferAttribute(o,a),sa.fromBufferAttribute(o,l),ra.fromBufferAttribute(o,c),h.normal=Vt.getInterpolation(es,Zn,Jn,Qn,ia,sa,ra,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new U,materialIndex:0};Vt.getNormal(Zn,Jn,Qn,u.normal),h.face=u}return h}class Lt extends zt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,p=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Bt(c,3)),this.setAttribute("normal",new Bt(h,3)),this.setAttribute("uv",new Bt(u,2));function g(_,m,f,T,S,P,O,I,L,oe,E){const w=P/L,j=O/oe,ie=P/2,pe=O/2,N=I/2,X=L+1,K=oe+1;let te=0,J=0;const Z=new U;for(let ae=0;ae<K;ae++){const le=ae*j-pe;for(let xe=0;xe<X;xe++){const $=xe*w-ie;Z[_]=$*T,Z[m]=le*S,Z[f]=N,c.push(Z.x,Z.y,Z.z),Z[_]=0,Z[m]=0,Z[f]=I>0?1:-1,h.push(Z.x,Z.y,Z.z),u.push(xe/L),u.push(1-ae/oe),te+=1}}for(let ae=0;ae<oe;ae++)for(let le=0;le<L;le++){const xe=d+le+X*ae,$=d+le+X*(ae+1),se=d+(le+1)+X*(ae+1),ve=d+(le+1)+X*ae;l.push(xe,$,ve),l.push($,se,ve),J+=6}a.addGroup(p,J,E),p+=J,d+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function mi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function xt(i){const e={};for(let t=0;t<i.length;t++){const n=mi(i[t]);for(const s in n)e[s]=n[s]}return e}function xh(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Cl(i){return i.getRenderTarget()===null?i.outputColorSpace:$e.workingColorSpace}const Ss={clone:mi,merge:xt};var yh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Mh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Et extends vi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yh,this.fragmentShader=Mh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=mi(e.uniforms),this.uniformsGroups=xh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Rl extends dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=sn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Ft extends Rl{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Lr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Hs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Lr*2*Math.atan(Math.tan(Hs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Hs*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ei=-90,ti=1;class Sh extends dt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ft(ei,ti,e,t);s.layers=this.layers,this.add(s);const r=new Ft(ei,ti,e,t);r.layers=this.layers,this.add(r);const o=new Ft(ei,ti,e,t);o.layers=this.layers,this.add(o);const a=new Ft(ei,ti,e,t);a.layers=this.layers,this.add(a);const l=new Ft(ei,ti,e,t);l.layers=this.layers,this.add(l);const c=new Ft(ei,ti,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===sn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ys)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Pl extends Pt{constructor(e,t,n,s,r,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:di,super(e,t,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class bh extends Xt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];t.encoding!==void 0&&(Ri("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Fn?ft:Ot),this.texture=new Pl(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Nt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Lt(5,5,5),r=new Et({name:"CubemapFromEquirect",uniforms:mi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Tt,blending:rn});r.uniforms.tEquirect.value=t;const o=new st(s,r),a=t.minFilter;return t.minFilter===Pi&&(t.minFilter=Nt),new Sh(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const rr=new U,Eh=new U,Th=new We;class Rn{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=rr.subVectors(n,t).cross(Eh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(rr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Th.getNormalMatrix(e),s=this.coplanarPoint(rr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Cn=new Cs,is=new U;class Yr{constructor(e=new Rn,t=new Rn,n=new Rn,s=new Rn,r=new Rn,o=new Rn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=sn){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],p=s[8],g=s[9],_=s[10],m=s[11],f=s[12],T=s[13],S=s[14],P=s[15];if(n[0].setComponents(l-r,d-c,m-p,P-f).normalize(),n[1].setComponents(l+r,d+c,m+p,P+f).normalize(),n[2].setComponents(l+o,d+h,m+g,P+T).normalize(),n[3].setComponents(l-o,d-h,m-g,P-T).normalize(),n[4].setComponents(l-a,d-u,m-_,P-S).normalize(),t===sn)n[5].setComponents(l+a,d+u,m+_,P+S).normalize();else if(t===ys)n[5].setComponents(a,u,_,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Cn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Cn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Cn)}intersectsSprite(e){return Cn.center.set(0,0,0),Cn.radius=.7071067811865476,Cn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Cn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(is.x=s.normal.x>0?e.max.x:e.min.x,is.y=s.normal.y>0?e.max.y:e.min.y,is.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(is)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ll(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function wh(i,e){const t=e.isWebGL2,n=new WeakMap;function s(c,h){const u=c.array,d=c.usage,p=u.byteLength,g=i.createBuffer();i.bindBuffer(h,g),i.bufferData(h,u,d),c.onUploadCallback();let _;if(u instanceof Float32Array)_=i.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=i.SHORT;else if(u instanceof Uint32Array)_=i.UNSIGNED_INT;else if(u instanceof Int32Array)_=i.INT;else if(u instanceof Int8Array)_=i.BYTE;else if(u instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:p}}function r(c,h,u){const d=h.array,p=h._updateRange,g=h.updateRanges;if(i.bindBuffer(u,c),p.count===-1&&g.length===0&&i.bufferSubData(u,0,d),g.length!==0){for(let _=0,m=g.length;_<m;_++){const f=g[_];t?i.bufferSubData(u,f.start*d.BYTES_PER_ELEMENT,d,f.start,f.count):i.bufferSubData(u,f.start*d.BYTES_PER_ELEMENT,d.subarray(f.start,f.start+f.count))}h.clearUpdateRanges()}p.count!==-1&&(t?i.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):i.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(i.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);if(u===void 0)n.set(c,s(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,c,h),u.version=c.version}}return{get:o,remove:a,update:l}}class jr extends zt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=e/a,d=t/l,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){const T=f*d-o;for(let S=0;S<c;S++){const P=S*u-r;g.push(P,-T,0),_.push(0,0,1),m.push(S/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let T=0;T<a;T++){const S=T+c*f,P=T+c*(f+1),O=T+1+c*(f+1),I=T+1+c*f;p.push(S,P,I),p.push(P,O,I)}this.setIndex(p),this.setAttribute("position",new Bt(g,3)),this.setAttribute("normal",new Bt(_,3)),this.setAttribute("uv",new Bt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jr(e.width,e.height,e.widthSegments,e.heightSegments)}}var Ah=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ch=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Rh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ph=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lh=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Ih=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Dh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Uh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Nh=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Fh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Oh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Bh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,kh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Hh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Gh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Vh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Yh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,jh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,$h=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Kh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Zh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Jh=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Qh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,eu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,tu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,nu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,iu="gl_FragColor = linearToOutputTexel( gl_FragColor );",su=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,ru=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ou=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,au=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,lu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,cu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,hu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,uu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,du=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,pu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,mu=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,gu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_u=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,yu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Mu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Su=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,bu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Eu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Tu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,wu=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Au=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Cu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ru=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Pu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Lu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Iu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Du=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Uu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Nu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Fu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ou=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ku=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Hu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Gu=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Vu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Wu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,qu=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Xu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ju=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$u=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ku=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ju=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Qu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ed=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,td=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,nd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,id=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,sd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,rd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,od=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ad=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ld=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,cd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,hd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ud=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,dd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,fd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,pd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,md=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,gd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_d=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,yd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Md=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Sd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ed=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Td=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const wd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ad=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rd=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ld=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Id=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Dd=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Ud=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Nd=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Fd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Od=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bd=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zd=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,kd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Hd=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gd=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vd=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wd=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,qd=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xd=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Yd=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,jd=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$d=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kd=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Zd=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jd=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qd=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ef=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,tf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,nf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,rf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,of=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,He={alphahash_fragment:Ah,alphahash_pars_fragment:Ch,alphamap_fragment:Rh,alphamap_pars_fragment:Ph,alphatest_fragment:Lh,alphatest_pars_fragment:Ih,aomap_fragment:Dh,aomap_pars_fragment:Uh,batching_pars_vertex:Nh,batching_vertex:Fh,begin_vertex:Oh,beginnormal_vertex:Bh,bsdfs:zh,iridescence_fragment:kh,bumpmap_pars_fragment:Hh,clipping_planes_fragment:Gh,clipping_planes_pars_fragment:Vh,clipping_planes_pars_vertex:Wh,clipping_planes_vertex:qh,color_fragment:Xh,color_pars_fragment:Yh,color_pars_vertex:jh,color_vertex:$h,common:Kh,cube_uv_reflection_fragment:Zh,defaultnormal_vertex:Jh,displacementmap_pars_vertex:Qh,displacementmap_vertex:eu,emissivemap_fragment:tu,emissivemap_pars_fragment:nu,colorspace_fragment:iu,colorspace_pars_fragment:su,envmap_fragment:ru,envmap_common_pars_fragment:ou,envmap_pars_fragment:au,envmap_pars_vertex:lu,envmap_physical_pars_fragment:yu,envmap_vertex:cu,fog_vertex:hu,fog_pars_vertex:uu,fog_fragment:du,fog_pars_fragment:fu,gradientmap_pars_fragment:pu,lightmap_fragment:mu,lightmap_pars_fragment:gu,lights_lambert_fragment:_u,lights_lambert_pars_fragment:vu,lights_pars_begin:xu,lights_toon_fragment:Mu,lights_toon_pars_fragment:Su,lights_phong_fragment:bu,lights_phong_pars_fragment:Eu,lights_physical_fragment:Tu,lights_physical_pars_fragment:wu,lights_fragment_begin:Au,lights_fragment_maps:Cu,lights_fragment_end:Ru,logdepthbuf_fragment:Pu,logdepthbuf_pars_fragment:Lu,logdepthbuf_pars_vertex:Iu,logdepthbuf_vertex:Du,map_fragment:Uu,map_pars_fragment:Nu,map_particle_fragment:Fu,map_particle_pars_fragment:Ou,metalnessmap_fragment:Bu,metalnessmap_pars_fragment:zu,morphcolor_vertex:ku,morphnormal_vertex:Hu,morphtarget_pars_vertex:Gu,morphtarget_vertex:Vu,normal_fragment_begin:Wu,normal_fragment_maps:qu,normal_pars_fragment:Xu,normal_pars_vertex:Yu,normal_vertex:ju,normalmap_pars_fragment:$u,clearcoat_normal_fragment_begin:Ku,clearcoat_normal_fragment_maps:Zu,clearcoat_pars_fragment:Ju,iridescence_pars_fragment:Qu,opaque_fragment:ed,packing:td,premultiplied_alpha_fragment:nd,project_vertex:id,dithering_fragment:sd,dithering_pars_fragment:rd,roughnessmap_fragment:od,roughnessmap_pars_fragment:ad,shadowmap_pars_fragment:ld,shadowmap_pars_vertex:cd,shadowmap_vertex:hd,shadowmask_pars_fragment:ud,skinbase_vertex:dd,skinning_pars_vertex:fd,skinning_vertex:pd,skinnormal_vertex:md,specularmap_fragment:gd,specularmap_pars_fragment:_d,tonemapping_fragment:vd,tonemapping_pars_fragment:xd,transmission_fragment:yd,transmission_pars_fragment:Md,uv_pars_fragment:Sd,uv_pars_vertex:bd,uv_vertex:Ed,worldpos_vertex:Td,background_vert:wd,background_frag:Ad,backgroundCube_vert:Cd,backgroundCube_frag:Rd,cube_vert:Pd,cube_frag:Ld,depth_vert:Id,depth_frag:Dd,distanceRGBA_vert:Ud,distanceRGBA_frag:Nd,equirect_vert:Fd,equirect_frag:Od,linedashed_vert:Bd,linedashed_frag:zd,meshbasic_vert:kd,meshbasic_frag:Hd,meshlambert_vert:Gd,meshlambert_frag:Vd,meshmatcap_vert:Wd,meshmatcap_frag:qd,meshnormal_vert:Xd,meshnormal_frag:Yd,meshphong_vert:jd,meshphong_frag:$d,meshphysical_vert:Kd,meshphysical_frag:Zd,meshtoon_vert:Jd,meshtoon_frag:Qd,points_vert:ef,points_frag:tf,shadow_vert:nf,shadow_frag:sf,sprite_vert:rf,sprite_frag:of},fe={common:{diffuse:{value:new Ce(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new Fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ce(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ce(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new Ce(16777215)},opacity:{value:1},center:{value:new Fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},jt={basic:{uniforms:xt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:xt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Ce(0)}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:xt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Ce(0)},specular:{value:new Ce(1118481)},shininess:{value:30}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:xt([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new Ce(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:xt([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new Ce(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:xt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:xt([fe.points,fe.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:xt([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:xt([fe.common,fe.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:xt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:xt([fe.sprite,fe.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distanceRGBA:{uniforms:xt([fe.common,fe.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distanceRGBA_vert,fragmentShader:He.distanceRGBA_frag},shadow:{uniforms:xt([fe.lights,fe.fog,{color:{value:new Ce(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};jt.physical={uniforms:xt([jt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new Fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new Ce(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new Fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new Ce(0)},specularColor:{value:new Ce(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new Fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const ss={r:0,b:0,g:0};function af(i,e,t,n,s,r,o){const a=new Ce(0);let l=r===!0?0:1,c,h,u=null,d=0,p=null;function g(m,f){let T=!1,S=f.isScene===!0?f.background:null;S&&S.isTexture&&(S=(f.backgroundBlurriness>0?t:e).get(S)),S===null?_(a,l):S&&S.isColor&&(_(S,1),T=!0);const P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||T)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),S&&(S.isCubeTexture||S.mapping===ws)?(h===void 0&&(h=new st(new Lt(1,1,1),new Et({name:"BackgroundCubeMaterial",uniforms:mi(jt.backgroundCube.uniforms),vertexShader:jt.backgroundCube.vertexShader,fragmentShader:jt.backgroundCube.fragmentShader,side:Tt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(O,I,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,h.material.toneMapped=$e.getTransfer(S.colorSpace)!==Qe,(u!==S||d!==S.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=S,d=S.version,p=i.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new st(new jr(2,2),new Et({name:"BackgroundMaterial",uniforms:mi(jt.background.uniforms),vertexShader:jt.background.vertexShader,fragmentShader:jt.background.fragmentShader,side:Mn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=$e.getTransfer(S.colorSpace)!==Qe,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,p=i.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function _(m,f){m.getRGB(ss,Cl(i)),n.buffers.color.setClear(ss.r,ss.g,ss.b,f,o)}return{getClearColor:function(){return a},setClearColor:function(m,f=1){a.set(m),l=f,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,_(a,l)},render:g}}function lf(i,e,t,n){const s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},l=m(null);let c=l,h=!1;function u(N,X,K,te,J){let Z=!1;if(o){const ae=_(te,K,X);c!==ae&&(c=ae,p(c.object)),Z=f(N,te,K,J),Z&&T(N,te,K,J)}else{const ae=X.wireframe===!0;(c.geometry!==te.id||c.program!==K.id||c.wireframe!==ae)&&(c.geometry=te.id,c.program=K.id,c.wireframe=ae,Z=!0)}J!==null&&t.update(J,i.ELEMENT_ARRAY_BUFFER),(Z||h)&&(h=!1,oe(N,X,K,te),J!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(J).buffer))}function d(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function p(N){return n.isWebGL2?i.bindVertexArray(N):r.bindVertexArrayOES(N)}function g(N){return n.isWebGL2?i.deleteVertexArray(N):r.deleteVertexArrayOES(N)}function _(N,X,K){const te=K.wireframe===!0;let J=a[N.id];J===void 0&&(J={},a[N.id]=J);let Z=J[X.id];Z===void 0&&(Z={},J[X.id]=Z);let ae=Z[te];return ae===void 0&&(ae=m(d()),Z[te]=ae),ae}function m(N){const X=[],K=[],te=[];for(let J=0;J<s;J++)X[J]=0,K[J]=0,te[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:X,enabledAttributes:K,attributeDivisors:te,object:N,attributes:{},index:null}}function f(N,X,K,te){const J=c.attributes,Z=X.attributes;let ae=0;const le=K.getAttributes();for(const xe in le)if(le[xe].location>=0){const se=J[xe];let ve=Z[xe];if(ve===void 0&&(xe==="instanceMatrix"&&N.instanceMatrix&&(ve=N.instanceMatrix),xe==="instanceColor"&&N.instanceColor&&(ve=N.instanceColor)),se===void 0||se.attribute!==ve||ve&&se.data!==ve.data)return!0;ae++}return c.attributesNum!==ae||c.index!==te}function T(N,X,K,te){const J={},Z=X.attributes;let ae=0;const le=K.getAttributes();for(const xe in le)if(le[xe].location>=0){let se=Z[xe];se===void 0&&(xe==="instanceMatrix"&&N.instanceMatrix&&(se=N.instanceMatrix),xe==="instanceColor"&&N.instanceColor&&(se=N.instanceColor));const ve={};ve.attribute=se,se&&se.data&&(ve.data=se.data),J[xe]=ve,ae++}c.attributes=J,c.attributesNum=ae,c.index=te}function S(){const N=c.newAttributes;for(let X=0,K=N.length;X<K;X++)N[X]=0}function P(N){O(N,0)}function O(N,X){const K=c.newAttributes,te=c.enabledAttributes,J=c.attributeDivisors;K[N]=1,te[N]===0&&(i.enableVertexAttribArray(N),te[N]=1),J[N]!==X&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](N,X),J[N]=X)}function I(){const N=c.newAttributes,X=c.enabledAttributes;for(let K=0,te=X.length;K<te;K++)X[K]!==N[K]&&(i.disableVertexAttribArray(K),X[K]=0)}function L(N,X,K,te,J,Z,ae){ae===!0?i.vertexAttribIPointer(N,X,K,J,Z):i.vertexAttribPointer(N,X,K,te,J,Z)}function oe(N,X,K,te){if(n.isWebGL2===!1&&(N.isInstancedMesh||te.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;S();const J=te.attributes,Z=K.getAttributes(),ae=X.defaultAttributeValues;for(const le in Z){const xe=Z[le];if(xe.location>=0){let $=J[le];if($===void 0&&(le==="instanceMatrix"&&N.instanceMatrix&&($=N.instanceMatrix),le==="instanceColor"&&N.instanceColor&&($=N.instanceColor)),$!==void 0){const se=$.normalized,ve=$.itemSize,Se=t.get($);if(Se===void 0)continue;const Te=Se.buffer,Oe=Se.type,k=Se.bytesPerElement,A=n.isWebGL2===!0&&(Oe===i.INT||Oe===i.UNSIGNED_INT||$.gpuType===cl);if($.isInterleavedBufferAttribute){const C=$.data,y=C.stride,F=$.offset;if(C.isInstancedInterleavedBuffer){for(let D=0;D<xe.locationSize;D++)O(xe.location+D,C.meshPerAttribute);N.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=C.meshPerAttribute*C.count)}else for(let D=0;D<xe.locationSize;D++)P(xe.location+D);i.bindBuffer(i.ARRAY_BUFFER,Te);for(let D=0;D<xe.locationSize;D++)L(xe.location+D,ve/xe.locationSize,Oe,se,y*k,(F+ve/xe.locationSize*D)*k,A)}else{if($.isInstancedBufferAttribute){for(let C=0;C<xe.locationSize;C++)O(xe.location+C,$.meshPerAttribute);N.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let C=0;C<xe.locationSize;C++)P(xe.location+C);i.bindBuffer(i.ARRAY_BUFFER,Te);for(let C=0;C<xe.locationSize;C++)L(xe.location+C,ve/xe.locationSize,Oe,se,ve*k,ve/xe.locationSize*C*k,A)}}else if(ae!==void 0){const se=ae[le];if(se!==void 0)switch(se.length){case 2:i.vertexAttrib2fv(xe.location,se);break;case 3:i.vertexAttrib3fv(xe.location,se);break;case 4:i.vertexAttrib4fv(xe.location,se);break;default:i.vertexAttrib1fv(xe.location,se)}}}}I()}function E(){ie();for(const N in a){const X=a[N];for(const K in X){const te=X[K];for(const J in te)g(te[J].object),delete te[J];delete X[K]}delete a[N]}}function w(N){if(a[N.id]===void 0)return;const X=a[N.id];for(const K in X){const te=X[K];for(const J in te)g(te[J].object),delete te[J];delete X[K]}delete a[N.id]}function j(N){for(const X in a){const K=a[X];if(K[N.id]===void 0)continue;const te=K[N.id];for(const J in te)g(te[J].object),delete te[J];delete K[N.id]}}function ie(){pe(),h=!0,c!==l&&(c=l,p(c.object))}function pe(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:ie,resetDefaultState:pe,dispose:E,releaseStatesOfGeometry:w,releaseStatesOfProgram:j,initAttributes:S,enableAttribute:P,disableUnusedAttributes:I}}function cf(i,e,t,n){const s=n.isWebGL2;let r;function o(h){r=h}function a(h,u){i.drawArrays(r,h,u),t.update(u,r,1)}function l(h,u,d){if(d===0)return;let p,g;if(s)p=i,g="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](r,h,u,d),t.update(u,r,d)}function c(h,u,d){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{p.multiDrawArraysWEBGL(r,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function hf(i,e,t){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=r(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),f=i.getParameter(i.MAX_VARYING_VECTORS),T=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=d>0,P=o||e.has("OES_texture_float"),O=S&&P,I=o?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:T,vertexTextures:S,floatFragmentTextures:P,floatVertexTextures:O,maxSamples:I}}function uf(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new Rn,a=new We,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||n!==0||s;return s=d,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const T=r?0:n,S=T*4;let P=f.clippingState||null;l.value=P,P=h(g,d,S,p);for(let O=0;O!==S;++O)P[O]=t[O];f.clippingState=P,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const f=p+_*4,T=d.matrixWorldInverse;a.getNormalMatrix(T),(m===null||m.length<f)&&(m=new Float32Array(f));for(let S=0,P=p;S!==_;++S,P+=4)o.copy(u[S]).applyMatrix4(T,a),o.normal.toArray(m,P),m[P+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function df(i){let e=new WeakMap;function t(o,a){return a===wr?o.mapping=di:a===Ar&&(o.mapping=fi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===wr||a===Ar)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new bh(l.height/2);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class $r extends Rl{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const oi=4,oa=[.125,.215,.35,.446,.526,.582],In=20,or=new $r,aa=new Ce;let ar=null,lr=0,cr=0;const Pn=(1+Math.sqrt(5))/2,ni=1/Pn,la=[new U(1,1,1),new U(-1,1,1),new U(1,1,-1),new U(-1,1,-1),new U(0,Pn,ni),new U(0,Pn,-ni),new U(ni,0,Pn),new U(-ni,0,Pn),new U(Pn,ni,0),new U(-Pn,ni,0)];class ca{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){ar=this._renderer.getRenderTarget(),lr=this._renderer.getActiveCubeFace(),cr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=da(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ua(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ar,lr,cr),e.scissorTest=!1,rs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===di||e.mapping===fi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ar=this._renderer.getRenderTarget(),lr=this._renderer.getActiveCubeFace(),cr=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Nt,minFilter:Nt,generateMipmaps:!1,type:on,format:qt,colorSpace:an,depthBuffer:!1},s=ha(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ha(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ff(r)),this._blurMaterial=pf(r,e,t)}return s}_compileMaterial(e){const t=new st(this._lodPlanes[0],e);this._renderer.compile(t,or)}_sceneToCubeUV(e,t,n,s){const a=new Ft(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(aa),h.toneMapping=xn,h.autoClear=!1;const p=new Xr({name:"PMREM.Background",side:Tt,depthWrite:!1,depthTest:!1}),g=new st(new Lt,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(aa),_=!0);for(let f=0;f<6;f++){const T=f%3;T===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):T===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));const S=this._cubeSize;rs(s,T*S,f>2?S:0,S,S),h.setRenderTarget(s),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===di||e.mapping===fi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=da()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ua());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new st(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;rs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,or)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=la[(s-1)%la.length];this._blur(e,s-1,s,r,o)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new st(this._lodPlanes[s],c),d=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*In-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):In;m>In&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${In}`);const f=[];let T=0;for(let L=0;L<In;++L){const oe=L/_,E=Math.exp(-oe*oe/2);f.push(E),L===0?T+=E:L<m&&(T+=2*E)}for(let L=0;L<f.length;L++)f[L]=f[L]/T;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:S}=this;d.dTheta.value=g,d.mipInt.value=S-n;const P=this._sizeLods[s],O=3*P*(s>S-oi?s-S+oi:0),I=4*(this._cubeSize-P);rs(t,O,I,3*P,2*P),l.setRenderTarget(t),l.render(u,or)}}function ff(i){const e=[],t=[],n=[];let s=i;const r=i-oi+1+oa.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>i-oi?l=oa[o-i+oi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,f=1,T=new Float32Array(_*g*p),S=new Float32Array(m*g*p),P=new Float32Array(f*g*p);for(let I=0;I<p;I++){const L=I%3*2/3-1,oe=I>2?0:-1,E=[L,oe,0,L+2/3,oe,0,L+2/3,oe+1,0,L,oe,0,L+2/3,oe+1,0,L,oe+1,0];T.set(E,_*g*I),S.set(d,m*g*I);const w=[I,I,I,I,I,I];P.set(w,f*g*I)}const O=new zt;O.setAttribute("position",new Mt(T,_)),O.setAttribute("uv",new Mt(S,m)),O.setAttribute("faceIndex",new Mt(P,f)),e.push(O),s>oi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function ha(i,e,t){const n=new Xt(i,e,t);return n.texture.mapping=ws,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function rs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function pf(i,e,t){const n=new Float32Array(In),s=new U(0,1,0);return new Et({name:"SphericalGaussianBlur",defines:{n:In,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Kr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:rn,depthTest:!1,depthWrite:!1})}function ua(){return new Et({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Kr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:rn,depthTest:!1,depthWrite:!1})}function da(){return new Et({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Kr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:rn,depthTest:!1,depthWrite:!1})}function Kr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function mf(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===wr||l===Ar,h=l===di||l===fi;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new ca(i)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{const u=a.image;if(c&&u&&u.height>0||h&&u&&s(u)){t===null&&(t=new ca(i));const d=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",r),d.texture}else return null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function gf(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const s=t(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function _f(i,e,t,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)e.remove(_[m])}d.removeEventListener("dispose",o),delete s[d.id];const p=r.get(d);p&&(e.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],i.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const _=p[g];for(let m=0,f=_.length;m<f;m++)e.update(_[m],i.ARRAY_BUFFER)}}function c(u){const d=[],p=u.index,g=u.attributes.position;let _=0;if(p!==null){const T=p.array;_=p.version;for(let S=0,P=T.length;S<P;S+=3){const O=T[S+0],I=T[S+1],L=T[S+2];d.push(O,I,I,L,L,O)}}else if(g!==void 0){const T=g.array;_=g.version;for(let S=0,P=T.length/3-1;S<P;S+=3){const O=S+0,I=S+1,L=S+2;d.push(O,I,I,L,L,O)}}else return;const m=new(xl(d)?Al:wl)(d,1);m.version=_;const f=r.get(u);f&&e.remove(f),r.set(u,m)}function h(u){const d=r.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function vf(i,e,t,n){const s=n.isWebGL2;let r;function o(p){r=p}let a,l;function c(p){a=p.type,l=p.bytesPerElement}function h(p,g){i.drawElements(r,g,a,p*l),t.update(g,r,1)}function u(p,g,_){if(_===0)return;let m,f;if(s)m=i,f="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[f](r,g,a,p*l,_),t.update(g,r,_)}function d(p,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<_;f++)this.render(p[f]/l,g[f]);else{m.multiDrawElementsWEBGL(r,g,0,a,p,0,_);let f=0;for(let T=0;T<_;T++)f+=g[T];t.update(f,r,1)}}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function xf(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function yf(i,e){return i[0]-e[0]}function Mf(i,e){return Math.abs(e[1])-Math.abs(i[1])}function Sf(i,e,t){const n={},s=new Float32Array(8),r=new WeakMap,o=new ut,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,u){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const p=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=p!==void 0?p.length:0;let _=r.get(h);if(_===void 0||_.count!==g){let N=function(){ie.dispose(),r.delete(h),h.removeEventListener("dispose",N)};_!==void 0&&_.texture.dispose();const T=h.morphAttributes.position!==void 0,S=h.morphAttributes.normal!==void 0,P=h.morphAttributes.color!==void 0,O=h.morphAttributes.position||[],I=h.morphAttributes.normal||[],L=h.morphAttributes.color||[];let oe=0;T===!0&&(oe=1),S===!0&&(oe=2),P===!0&&(oe=3);let E=h.attributes.position.count*oe,w=1;E>e.maxTextureSize&&(w=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const j=new Float32Array(E*w*4*g),ie=new Sl(j,E,w,g);ie.type=gn,ie.needsUpdate=!0;const pe=oe*4;for(let X=0;X<g;X++){const K=O[X],te=I[X],J=L[X],Z=E*w*4*X;for(let ae=0;ae<K.count;ae++){const le=ae*pe;T===!0&&(o.fromBufferAttribute(K,ae),j[Z+le+0]=o.x,j[Z+le+1]=o.y,j[Z+le+2]=o.z,j[Z+le+3]=0),S===!0&&(o.fromBufferAttribute(te,ae),j[Z+le+4]=o.x,j[Z+le+5]=o.y,j[Z+le+6]=o.z,j[Z+le+7]=0),P===!0&&(o.fromBufferAttribute(J,ae),j[Z+le+8]=o.x,j[Z+le+9]=o.y,j[Z+le+10]=o.z,j[Z+le+11]=J.itemSize===4?o.w:1)}}_={count:g,texture:ie,size:new Fe(E,w)},r.set(h,_),h.addEventListener("dispose",N)}let m=0;for(let T=0;T<d.length;T++)m+=d[T];const f=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(i,"morphTargetBaseInfluence",f),u.getUniforms().setValue(i,"morphTargetInfluences",d),u.getUniforms().setValue(i,"morphTargetsTexture",_.texture,t),u.getUniforms().setValue(i,"morphTargetsTextureSize",_.size)}else{const p=d===void 0?0:d.length;let g=n[h.id];if(g===void 0||g.length!==p){g=[];for(let S=0;S<p;S++)g[S]=[S,0];n[h.id]=g}for(let S=0;S<p;S++){const P=g[S];P[0]=S,P[1]=d[S]}g.sort(Mf);for(let S=0;S<8;S++)S<p&&g[S][1]?(a[S][0]=g[S][0],a[S][1]=g[S][1]):(a[S][0]=Number.MAX_SAFE_INTEGER,a[S][1]=0);a.sort(yf);const _=h.morphAttributes.position,m=h.morphAttributes.normal;let f=0;for(let S=0;S<8;S++){const P=a[S],O=P[0],I=P[1];O!==Number.MAX_SAFE_INTEGER&&I?(_&&h.getAttribute("morphTarget"+S)!==_[O]&&h.setAttribute("morphTarget"+S,_[O]),m&&h.getAttribute("morphNormal"+S)!==m[O]&&h.setAttribute("morphNormal"+S,m[O]),s[S]=I,f+=I):(_&&h.hasAttribute("morphTarget"+S)===!0&&h.deleteAttribute("morphTarget"+S),m&&h.hasAttribute("morphNormal"+S)===!0&&h.deleteAttribute("morphNormal"+S),s[S]=0)}const T=h.morphTargetsRelative?1:1-f;u.getUniforms().setValue(i,"morphTargetBaseInfluence",T),u.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:l}}function bf(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class Il extends Pt{constructor(e,t,n,s,r,o,a,l,c,h){if(h=h!==void 0?h:Nn,h!==Nn&&h!==pi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Nn&&(n=mn),n===void 0&&h===pi&&(n=Un),super(null,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:yt,this.minFilter=l!==void 0?l:yt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Dl=new Pt,Ul=new Il(1,1);Ul.compareFunction=vl;const Nl=new Sl,Fl=new ah,Ol=new Pl,fa=[],pa=[],ma=new Float32Array(16),ga=new Float32Array(9),_a=new Float32Array(4);function xi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=fa[s];if(r===void 0&&(r=new Float32Array(s),fa[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function ot(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function at(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Rs(i,e){let t=pa[e];t===void 0&&(t=new Int32Array(e),pa[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Ef(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Tf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ot(t,e))return;i.uniform2fv(this.addr,e),at(t,e)}}function wf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ot(t,e))return;i.uniform3fv(this.addr,e),at(t,e)}}function Af(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ot(t,e))return;i.uniform4fv(this.addr,e),at(t,e)}}function Cf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ot(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),at(t,e)}else{if(ot(t,n))return;_a.set(n),i.uniformMatrix2fv(this.addr,!1,_a),at(t,n)}}function Rf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ot(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),at(t,e)}else{if(ot(t,n))return;ga.set(n),i.uniformMatrix3fv(this.addr,!1,ga),at(t,n)}}function Pf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ot(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),at(t,e)}else{if(ot(t,n))return;ma.set(n),i.uniformMatrix4fv(this.addr,!1,ma),at(t,n)}}function Lf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function If(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ot(t,e))return;i.uniform2iv(this.addr,e),at(t,e)}}function Df(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ot(t,e))return;i.uniform3iv(this.addr,e),at(t,e)}}function Uf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ot(t,e))return;i.uniform4iv(this.addr,e),at(t,e)}}function Nf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ff(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ot(t,e))return;i.uniform2uiv(this.addr,e),at(t,e)}}function Of(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ot(t,e))return;i.uniform3uiv(this.addr,e),at(t,e)}}function Bf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ot(t,e))return;i.uniform4uiv(this.addr,e),at(t,e)}}function zf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);const r=this.type===i.SAMPLER_2D_SHADOW?Ul:Dl;t.setTexture2D(e||r,s)}function kf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Fl,s)}function Hf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Ol,s)}function Gf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Nl,s)}function Vf(i){switch(i){case 5126:return Ef;case 35664:return Tf;case 35665:return wf;case 35666:return Af;case 35674:return Cf;case 35675:return Rf;case 35676:return Pf;case 5124:case 35670:return Lf;case 35667:case 35671:return If;case 35668:case 35672:return Df;case 35669:case 35673:return Uf;case 5125:return Nf;case 36294:return Ff;case 36295:return Of;case 36296:return Bf;case 35678:case 36198:case 36298:case 36306:case 35682:return zf;case 35679:case 36299:case 36307:return kf;case 35680:case 36300:case 36308:case 36293:return Hf;case 36289:case 36303:case 36311:case 36292:return Gf}}function Wf(i,e){i.uniform1fv(this.addr,e)}function qf(i,e){const t=xi(e,this.size,2);i.uniform2fv(this.addr,t)}function Xf(i,e){const t=xi(e,this.size,3);i.uniform3fv(this.addr,t)}function Yf(i,e){const t=xi(e,this.size,4);i.uniform4fv(this.addr,t)}function jf(i,e){const t=xi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function $f(i,e){const t=xi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Kf(i,e){const t=xi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Zf(i,e){i.uniform1iv(this.addr,e)}function Jf(i,e){i.uniform2iv(this.addr,e)}function Qf(i,e){i.uniform3iv(this.addr,e)}function ep(i,e){i.uniform4iv(this.addr,e)}function tp(i,e){i.uniform1uiv(this.addr,e)}function np(i,e){i.uniform2uiv(this.addr,e)}function ip(i,e){i.uniform3uiv(this.addr,e)}function sp(i,e){i.uniform4uiv(this.addr,e)}function rp(i,e,t){const n=this.cache,s=e.length,r=Rs(t,s);ot(n,r)||(i.uniform1iv(this.addr,r),at(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Dl,r[o])}function op(i,e,t){const n=this.cache,s=e.length,r=Rs(t,s);ot(n,r)||(i.uniform1iv(this.addr,r),at(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Fl,r[o])}function ap(i,e,t){const n=this.cache,s=e.length,r=Rs(t,s);ot(n,r)||(i.uniform1iv(this.addr,r),at(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Ol,r[o])}function lp(i,e,t){const n=this.cache,s=e.length,r=Rs(t,s);ot(n,r)||(i.uniform1iv(this.addr,r),at(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Nl,r[o])}function cp(i){switch(i){case 5126:return Wf;case 35664:return qf;case 35665:return Xf;case 35666:return Yf;case 35674:return jf;case 35675:return $f;case 35676:return Kf;case 5124:case 35670:return Zf;case 35667:case 35671:return Jf;case 35668:case 35672:return Qf;case 35669:case 35673:return ep;case 5125:return tp;case 36294:return np;case 36295:return ip;case 36296:return sp;case 35678:case 36198:case 36298:case 36306:case 35682:return rp;case 35679:case 36299:case 36307:return op;case 35680:case 36300:case 36308:case 36293:return ap;case 36289:case 36303:case 36311:case 36292:return lp}}class hp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Vf(t.type)}}class up{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=cp(t.type)}}class dp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const hr=/(\w+)(\])?(\[|\.)?/g;function va(i,e){i.seq.push(e),i.map[e.id]=e}function fp(i,e,t){const n=i.name,s=n.length;for(hr.lastIndex=0;;){const r=hr.exec(n),o=hr.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){va(t,c===void 0?new hp(a,i,e):new up(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new dp(a),va(t,u)),t=u}}}class ps{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);fp(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function xa(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const pp=37297;let mp=0;function gp(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function _p(i){const e=$e.getPrimaries($e.workingColorSpace),t=$e.getPrimaries(i);let n;switch(e===t?n="":e===xs&&t===vs?n="LinearDisplayP3ToLinearSRGB":e===vs&&t===xs&&(n="LinearSRGBToLinearDisplayP3"),i){case an:case As:return[n,"LinearTransferOETF"];case ft:case qr:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function ya(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+gp(i.getShaderSource(e),o)}else return s}function vp(i,e){const t=_p(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function xp(i,e){let t;switch(e){case Pc:t="Linear";break;case Lc:t="Reinhard";break;case Ic:t="OptimizedCineon";break;case Dc:t="ACESFilmic";break;case Nc:t="AgX";break;case Uc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function yp(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ai).join(`
`)}function Mp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(ai).join(`
`)}function Sp(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function bp(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function ai(i){return i!==""}function Ma(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Sa(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ep=/^[ \t]*#include +<([\w\d./]+)>/gm;function Dr(i){return i.replace(Ep,wp)}const Tp=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function wp(i,e){let t=He[e];if(t===void 0){const n=Tp.get(e);if(n!==void 0)t=He[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Dr(t)}const Ap=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ba(i){return i.replace(Ap,Cp)}function Cp(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ea(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Rp(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ol?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===sc?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===tn&&(e="SHADOWMAP_TYPE_VSM"),e}function Pp(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case di:case fi:e="ENVMAP_TYPE_CUBE";break;case ws:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Lp(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case fi:e="ENVMAP_MODE_REFRACTION";break}return e}function Ip(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case al:e="ENVMAP_BLENDING_MULTIPLY";break;case Cc:e="ENVMAP_BLENDING_MIX";break;case Rc:e="ENVMAP_BLENDING_ADD";break}return e}function Dp(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Up(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Rp(t),c=Pp(t),h=Lp(t),u=Ip(t),d=Dp(t),p=t.isWebGL2?"":yp(t),g=Mp(t),_=Sp(r),m=s.createProgram();let f,T,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ai).join(`
`),f.length>0&&(f+=`
`),T=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ai).join(`
`),T.length>0&&(T+=`
`)):(f=[Ea(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ai).join(`
`),T=[p,Ea(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==xn?"#define TONE_MAPPING":"",t.toneMapping!==xn?He.tonemapping_pars_fragment:"",t.toneMapping!==xn?xp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,vp("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ai).join(`
`)),o=Dr(o),o=Ma(o,t),o=Sa(o,t),a=Dr(a),a=Ma(a,t),a=Sa(a,t),o=ba(o),a=ba(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,f=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,T=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Go?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Go?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+T);const P=S+f+o,O=S+T+a,I=xa(s,s.VERTEX_SHADER,P),L=xa(s,s.FRAGMENT_SHADER,O);s.attachShader(m,I),s.attachShader(m,L),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function oe(ie){if(i.debug.checkShaderErrors){const pe=s.getProgramInfoLog(m).trim(),N=s.getShaderInfoLog(I).trim(),X=s.getShaderInfoLog(L).trim();let K=!0,te=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(K=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,I,L);else{const J=ya(s,I,"vertex"),Z=ya(s,L,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+pe+`
`+J+`
`+Z)}else pe!==""?console.warn("THREE.WebGLProgram: Program Info Log:",pe):(N===""||X==="")&&(te=!1);te&&(ie.diagnostics={runnable:K,programLog:pe,vertexShader:{log:N,prefix:f},fragmentShader:{log:X,prefix:T}})}s.deleteShader(I),s.deleteShader(L),E=new ps(s,m),w=bp(s,m)}let E;this.getUniforms=function(){return E===void 0&&oe(this),E};let w;this.getAttributes=function(){return w===void 0&&oe(this),w};let j=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return j===!1&&(j=s.getProgramParameter(m,pp)),j},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=mp++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=I,this.fragmentShader=L,this}let Np=0;class Fp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Op(e),t.set(e,n)),n}}class Op{constructor(e){this.id=Np++,this.code=e,this.usedTimes=0}}function Bp(i,e,t,n,s,r,o){const a=new El,l=new Fp,c=[],h=s.isWebGL2,u=s.logarithmicDepthBuffer,d=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return E===0?"uv":`uv${E}`}function m(E,w,j,ie,pe){const N=ie.fog,X=pe.geometry,K=E.isMeshStandardMaterial?ie.environment:null,te=(E.isMeshStandardMaterial?t:e).get(E.envMap||K),J=te&&te.mapping===ws?te.image.height:null,Z=g[E.type];E.precision!==null&&(p=s.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const ae=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,le=ae!==void 0?ae.length:0;let xe=0;X.morphAttributes.position!==void 0&&(xe=1),X.morphAttributes.normal!==void 0&&(xe=2),X.morphAttributes.color!==void 0&&(xe=3);let $,se,ve,Se;if(Z){const _t=jt[Z];$=_t.vertexShader,se=_t.fragmentShader}else $=E.vertexShader,se=E.fragmentShader,l.update(E),ve=l.getVertexShaderID(E),Se=l.getFragmentShaderID(E);const Te=i.getRenderTarget(),Oe=pe.isInstancedMesh===!0,k=pe.isBatchedMesh===!0,A=!!E.map,C=!!E.matcap,y=!!te,F=!!E.aoMap,D=!!E.lightMap,G=!!E.bumpMap,H=!!E.normalMap,ce=!!E.displacementMap,ne=!!E.emissiveMap,x=!!E.metalnessMap,v=!!E.roughnessMap,z=E.anisotropy>0,Q=E.clearcoat>0,ee=E.iridescence>0,V=E.sheen>0,ye=E.transmission>0,ue=z&&!!E.anisotropyMap,he=Q&&!!E.clearcoatMap,be=Q&&!!E.clearcoatNormalMap,Pe=Q&&!!E.clearcoatRoughnessMap,re=ee&&!!E.iridescenceMap,Ye=ee&&!!E.iridescenceThicknessMap,Ae=V&&!!E.sheenColorMap,Re=V&&!!E.sheenRoughnessMap,Ee=!!E.specularMap,me=!!E.specularColorMap,Ne=!!E.specularIntensityMap,Xe=ye&&!!E.transmissionMap,qe=ye&&!!E.thicknessMap,ke=!!E.gradientMap,de=!!E.alphaMap,R=E.alphaTest>0,ge=!!E.alphaHash,_e=!!E.extensions,De=!!X.attributes.uv1,Le=!!X.attributes.uv2,Ke=!!X.attributes.uv3;let Ze=xn;return E.toneMapped&&(Te===null||Te.isXRRenderTarget===!0)&&(Ze=i.toneMapping),{isWebGL2:h,shaderID:Z,shaderType:E.type,shaderName:E.name,vertexShader:$,fragmentShader:se,defines:E.defines,customVertexShaderID:ve,customFragmentShaderID:Se,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:k,instancing:Oe,instancingColor:Oe&&pe.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Te===null?i.outputColorSpace:Te.isXRRenderTarget===!0?Te.texture.colorSpace:an,map:A,matcap:C,envMap:y,envMapMode:y&&te.mapping,envMapCubeUVHeight:J,aoMap:F,lightMap:D,bumpMap:G,normalMap:H,displacementMap:d&&ce,emissiveMap:ne,normalMapObjectSpace:H&&E.normalMapType===Yc,normalMapTangentSpace:H&&E.normalMapType===_l,metalnessMap:x,roughnessMap:v,anisotropy:z,anisotropyMap:ue,clearcoat:Q,clearcoatMap:he,clearcoatNormalMap:be,clearcoatRoughnessMap:Pe,iridescence:ee,iridescenceMap:re,iridescenceThicknessMap:Ye,sheen:V,sheenColorMap:Ae,sheenRoughnessMap:Re,specularMap:Ee,specularColorMap:me,specularIntensityMap:Ne,transmission:ye,transmissionMap:Xe,thicknessMap:qe,gradientMap:ke,opaque:E.transparent===!1&&E.blending===hi,alphaMap:de,alphaTest:R,alphaHash:ge,combine:E.combine,mapUv:A&&_(E.map.channel),aoMapUv:F&&_(E.aoMap.channel),lightMapUv:D&&_(E.lightMap.channel),bumpMapUv:G&&_(E.bumpMap.channel),normalMapUv:H&&_(E.normalMap.channel),displacementMapUv:ce&&_(E.displacementMap.channel),emissiveMapUv:ne&&_(E.emissiveMap.channel),metalnessMapUv:x&&_(E.metalnessMap.channel),roughnessMapUv:v&&_(E.roughnessMap.channel),anisotropyMapUv:ue&&_(E.anisotropyMap.channel),clearcoatMapUv:he&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:be&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pe&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:re&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:Ye&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:Ae&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:Re&&_(E.sheenRoughnessMap.channel),specularMapUv:Ee&&_(E.specularMap.channel),specularColorMapUv:me&&_(E.specularColorMap.channel),specularIntensityMapUv:Ne&&_(E.specularIntensityMap.channel),transmissionMapUv:Xe&&_(E.transmissionMap.channel),thicknessMapUv:qe&&_(E.thicknessMap.channel),alphaMapUv:de&&_(E.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(H||z),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,vertexUv1s:De,vertexUv2s:Le,vertexUv3s:Ke,pointsUvs:pe.isPoints===!0&&!!X.attributes.uv&&(A||de),fog:!!N,useFog:E.fog===!0,fogExp2:N&&N.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:pe.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:xe,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&j.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ze,useLegacyLights:i._useLegacyLights,decodeVideoTexture:A&&E.map.isVideoTexture===!0&&$e.getTransfer(E.map.colorSpace)===Qe,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===nn,flipSided:E.side===Tt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:_e&&E.extensions.derivatives===!0,extensionFragDepth:_e&&E.extensions.fragDepth===!0,extensionDrawBuffers:_e&&E.extensions.drawBuffers===!0,extensionShaderTextureLOD:_e&&E.extensions.shaderTextureLOD===!0,extensionClipCullDistance:_e&&E.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()}}function f(E){const w=[];if(E.shaderID?w.push(E.shaderID):(w.push(E.customVertexShaderID),w.push(E.customFragmentShaderID)),E.defines!==void 0)for(const j in E.defines)w.push(j),w.push(E.defines[j]);return E.isRawShaderMaterial===!1&&(T(w,E),S(w,E),w.push(i.outputColorSpace)),w.push(E.customProgramCacheKey),w.join()}function T(E,w){E.push(w.precision),E.push(w.outputColorSpace),E.push(w.envMapMode),E.push(w.envMapCubeUVHeight),E.push(w.mapUv),E.push(w.alphaMapUv),E.push(w.lightMapUv),E.push(w.aoMapUv),E.push(w.bumpMapUv),E.push(w.normalMapUv),E.push(w.displacementMapUv),E.push(w.emissiveMapUv),E.push(w.metalnessMapUv),E.push(w.roughnessMapUv),E.push(w.anisotropyMapUv),E.push(w.clearcoatMapUv),E.push(w.clearcoatNormalMapUv),E.push(w.clearcoatRoughnessMapUv),E.push(w.iridescenceMapUv),E.push(w.iridescenceThicknessMapUv),E.push(w.sheenColorMapUv),E.push(w.sheenRoughnessMapUv),E.push(w.specularMapUv),E.push(w.specularColorMapUv),E.push(w.specularIntensityMapUv),E.push(w.transmissionMapUv),E.push(w.thicknessMapUv),E.push(w.combine),E.push(w.fogExp2),E.push(w.sizeAttenuation),E.push(w.morphTargetsCount),E.push(w.morphAttributeCount),E.push(w.numDirLights),E.push(w.numPointLights),E.push(w.numSpotLights),E.push(w.numSpotLightMaps),E.push(w.numHemiLights),E.push(w.numRectAreaLights),E.push(w.numDirLightShadows),E.push(w.numPointLightShadows),E.push(w.numSpotLightShadows),E.push(w.numSpotLightShadowsWithMaps),E.push(w.numLightProbes),E.push(w.shadowMapType),E.push(w.toneMapping),E.push(w.numClippingPlanes),E.push(w.numClipIntersection),E.push(w.depthPacking)}function S(E,w){a.disableAll(),w.isWebGL2&&a.enable(0),w.supportsVertexTextures&&a.enable(1),w.instancing&&a.enable(2),w.instancingColor&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),E.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.skinning&&a.enable(4),w.morphTargets&&a.enable(5),w.morphNormals&&a.enable(6),w.morphColors&&a.enable(7),w.premultipliedAlpha&&a.enable(8),w.shadowMapEnabled&&a.enable(9),w.useLegacyLights&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),E.push(a.mask)}function P(E){const w=g[E.type];let j;if(w){const ie=jt[w];j=Ss.clone(ie.uniforms)}else j=E.uniforms;return j}function O(E,w){let j;for(let ie=0,pe=c.length;ie<pe;ie++){const N=c[ie];if(N.cacheKey===w){j=N,++j.usedTimes;break}}return j===void 0&&(j=new Up(i,w,E,r),c.push(j)),j}function I(E){if(--E.usedTimes===0){const w=c.indexOf(E);c[w]=c[c.length-1],c.pop(),E.destroy()}}function L(E){l.remove(E)}function oe(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:P,acquireProgram:O,releaseProgram:I,releaseShaderCache:L,programs:c,dispose:oe}}function zp(){let i=new WeakMap;function e(r){let o=i.get(r);return o===void 0&&(o={},i.set(r,o)),o}function t(r){i.delete(r)}function n(r,o,a){i.get(r)[o]=a}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function kp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Ta(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function wa(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,d,p,g,_,m){let f=i[e];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[e]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=m),e++,f}function a(u,d,p,g,_,m){const f=o(u,d,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):t.push(f)}function l(u,d,p,g,_,m){const f=o(u,d,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):t.unshift(f)}function c(u,d){t.length>1&&t.sort(u||kp),n.length>1&&n.sort(d||Ta),s.length>1&&s.sort(d||Ta)}function h(){for(let u=e,d=i.length;u<d;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function Hp(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new wa,i.set(n,[o])):s>=r.length?(o=new wa,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Gp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new Ce};break;case"SpotLight":t={position:new U,direction:new U,color:new Ce,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new Ce,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new Ce,groundColor:new Ce};break;case"RectAreaLight":t={color:new Ce,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function Vp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Wp=0;function qp(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Xp(i,e){const t=new Gp,n=Vp(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new U);const r=new U,o=new rt,a=new rt;function l(h,u){let d=0,p=0,g=0;for(let ie=0;ie<9;ie++)s.probe[ie].set(0,0,0);let _=0,m=0,f=0,T=0,S=0,P=0,O=0,I=0,L=0,oe=0,E=0;h.sort(qp);const w=u===!0?Math.PI:1;for(let ie=0,pe=h.length;ie<pe;ie++){const N=h[ie],X=N.color,K=N.intensity,te=N.distance,J=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)d+=X.r*K*w,p+=X.g*K*w,g+=X.b*K*w;else if(N.isLightProbe){for(let Z=0;Z<9;Z++)s.probe[Z].addScaledVector(N.sh.coefficients[Z],K);E++}else if(N.isDirectionalLight){const Z=t.get(N);if(Z.color.copy(N.color).multiplyScalar(N.intensity*w),N.castShadow){const ae=N.shadow,le=n.get(N);le.shadowBias=ae.bias,le.shadowNormalBias=ae.normalBias,le.shadowRadius=ae.radius,le.shadowMapSize=ae.mapSize,s.directionalShadow[_]=le,s.directionalShadowMap[_]=J,s.directionalShadowMatrix[_]=N.shadow.matrix,P++}s.directional[_]=Z,_++}else if(N.isSpotLight){const Z=t.get(N);Z.position.setFromMatrixPosition(N.matrixWorld),Z.color.copy(X).multiplyScalar(K*w),Z.distance=te,Z.coneCos=Math.cos(N.angle),Z.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),Z.decay=N.decay,s.spot[f]=Z;const ae=N.shadow;if(N.map&&(s.spotLightMap[L]=N.map,L++,ae.updateMatrices(N),N.castShadow&&oe++),s.spotLightMatrix[f]=ae.matrix,N.castShadow){const le=n.get(N);le.shadowBias=ae.bias,le.shadowNormalBias=ae.normalBias,le.shadowRadius=ae.radius,le.shadowMapSize=ae.mapSize,s.spotShadow[f]=le,s.spotShadowMap[f]=J,I++}f++}else if(N.isRectAreaLight){const Z=t.get(N);Z.color.copy(X).multiplyScalar(K),Z.halfWidth.set(N.width*.5,0,0),Z.halfHeight.set(0,N.height*.5,0),s.rectArea[T]=Z,T++}else if(N.isPointLight){const Z=t.get(N);if(Z.color.copy(N.color).multiplyScalar(N.intensity*w),Z.distance=N.distance,Z.decay=N.decay,N.castShadow){const ae=N.shadow,le=n.get(N);le.shadowBias=ae.bias,le.shadowNormalBias=ae.normalBias,le.shadowRadius=ae.radius,le.shadowMapSize=ae.mapSize,le.shadowCameraNear=ae.camera.near,le.shadowCameraFar=ae.camera.far,s.pointShadow[m]=le,s.pointShadowMap[m]=J,s.pointShadowMatrix[m]=N.shadow.matrix,O++}s.point[m]=Z,m++}else if(N.isHemisphereLight){const Z=t.get(N);Z.skyColor.copy(N.color).multiplyScalar(K*w),Z.groundColor.copy(N.groundColor).multiplyScalar(K*w),s.hemi[S]=Z,S++}}T>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=fe.LTC_FLOAT_1,s.rectAreaLTC2=fe.LTC_FLOAT_2):(s.rectAreaLTC1=fe.LTC_HALF_1,s.rectAreaLTC2=fe.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=fe.LTC_FLOAT_1,s.rectAreaLTC2=fe.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=fe.LTC_HALF_1,s.rectAreaLTC2=fe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=d,s.ambient[1]=p,s.ambient[2]=g;const j=s.hash;(j.directionalLength!==_||j.pointLength!==m||j.spotLength!==f||j.rectAreaLength!==T||j.hemiLength!==S||j.numDirectionalShadows!==P||j.numPointShadows!==O||j.numSpotShadows!==I||j.numSpotMaps!==L||j.numLightProbes!==E)&&(s.directional.length=_,s.spot.length=f,s.rectArea.length=T,s.point.length=m,s.hemi.length=S,s.directionalShadow.length=P,s.directionalShadowMap.length=P,s.pointShadow.length=O,s.pointShadowMap.length=O,s.spotShadow.length=I,s.spotShadowMap.length=I,s.directionalShadowMatrix.length=P,s.pointShadowMatrix.length=O,s.spotLightMatrix.length=I+L-oe,s.spotLightMap.length=L,s.numSpotLightShadowsWithMaps=oe,s.numLightProbes=E,j.directionalLength=_,j.pointLength=m,j.spotLength=f,j.rectAreaLength=T,j.hemiLength=S,j.numDirectionalShadows=P,j.numPointShadows=O,j.numSpotShadows=I,j.numSpotMaps=L,j.numLightProbes=E,s.version=Wp++)}function c(h,u){let d=0,p=0,g=0,_=0,m=0;const f=u.matrixWorldInverse;for(let T=0,S=h.length;T<S;T++){const P=h[T];if(P.isDirectionalLight){const O=s.directional[d];O.direction.setFromMatrixPosition(P.matrixWorld),r.setFromMatrixPosition(P.target.matrixWorld),O.direction.sub(r),O.direction.transformDirection(f),d++}else if(P.isSpotLight){const O=s.spot[g];O.position.setFromMatrixPosition(P.matrixWorld),O.position.applyMatrix4(f),O.direction.setFromMatrixPosition(P.matrixWorld),r.setFromMatrixPosition(P.target.matrixWorld),O.direction.sub(r),O.direction.transformDirection(f),g++}else if(P.isRectAreaLight){const O=s.rectArea[_];O.position.setFromMatrixPosition(P.matrixWorld),O.position.applyMatrix4(f),a.identity(),o.copy(P.matrixWorld),o.premultiply(f),a.extractRotation(o),O.halfWidth.set(P.width*.5,0,0),O.halfHeight.set(0,P.height*.5,0),O.halfWidth.applyMatrix4(a),O.halfHeight.applyMatrix4(a),_++}else if(P.isPointLight){const O=s.point[p];O.position.setFromMatrixPosition(P.matrixWorld),O.position.applyMatrix4(f),p++}else if(P.isHemisphereLight){const O=s.hemi[m];O.direction.setFromMatrixPosition(P.matrixWorld),O.direction.transformDirection(f),m++}}}return{setup:l,setupView:c,state:s}}function Aa(i,e){const t=new Xp(i,e),n=[],s=[];function r(){n.length=0,s.length=0}function o(u){n.push(u)}function a(u){s.push(u)}function l(u){t.setup(n,u)}function c(u){t.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function Yp(i,e){let t=new WeakMap;function n(r,o=0){const a=t.get(r);let l;return a===void 0?(l=new Aa(i,e),t.set(r,[l])):o>=a.length?(l=new Aa(i,e),a.push(l)):l=a[o],l}function s(){t=new WeakMap}return{get:n,dispose:s}}class jp extends vi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=qc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class $p extends vi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Kp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Zp=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Jp(i,e,t){let n=new Yr;const s=new Fe,r=new Fe,o=new ut,a=new jp({depthPacking:Xc}),l=new $p,c={},h=t.maxTextureSize,u={[Mn]:Tt,[Tt]:Mn,[nn]:nn},d=new Et({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Fe},radius:{value:4}},vertexShader:Kp,fragmentShader:Zp}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new zt;g.setAttribute("position",new Mt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new st(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ol;let f=this.type;this.render=function(I,L,oe){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||I.length===0)return;const E=i.getRenderTarget(),w=i.getActiveCubeFace(),j=i.getActiveMipmapLevel(),ie=i.state;ie.setBlending(rn),ie.buffers.color.setClear(1,1,1,1),ie.buffers.depth.setTest(!0),ie.setScissorTest(!1);const pe=f!==tn&&this.type===tn,N=f===tn&&this.type!==tn;for(let X=0,K=I.length;X<K;X++){const te=I[X],J=te.shadow;if(J===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;s.copy(J.mapSize);const Z=J.getFrameExtents();if(s.multiply(Z),r.copy(J.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Z.x),s.x=r.x*Z.x,J.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Z.y),s.y=r.y*Z.y,J.mapSize.y=r.y)),J.map===null||pe===!0||N===!0){const le=this.type!==tn?{minFilter:yt,magFilter:yt}:{};J.map!==null&&J.map.dispose(),J.map=new Xt(s.x,s.y,le),J.map.texture.name=te.name+".shadowMap",J.camera.updateProjectionMatrix()}i.setRenderTarget(J.map),i.clear();const ae=J.getViewportCount();for(let le=0;le<ae;le++){const xe=J.getViewport(le);o.set(r.x*xe.x,r.y*xe.y,r.x*xe.z,r.y*xe.w),ie.viewport(o),J.updateMatrices(te,le),n=J.getFrustum(),P(L,oe,J.camera,te,this.type)}J.isPointLightShadow!==!0&&this.type===tn&&T(J,oe),J.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(E,w,j)};function T(I,L){const oe=e.update(_);d.defines.VSM_SAMPLES!==I.blurSamples&&(d.defines.VSM_SAMPLES=I.blurSamples,p.defines.VSM_SAMPLES=I.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new Xt(s.x,s.y)),d.uniforms.shadow_pass.value=I.map.texture,d.uniforms.resolution.value=I.mapSize,d.uniforms.radius.value=I.radius,i.setRenderTarget(I.mapPass),i.clear(),i.renderBufferDirect(L,null,oe,d,_,null),p.uniforms.shadow_pass.value=I.mapPass.texture,p.uniforms.resolution.value=I.mapSize,p.uniforms.radius.value=I.radius,i.setRenderTarget(I.map),i.clear(),i.renderBufferDirect(L,null,oe,p,_,null)}function S(I,L,oe,E){let w=null;const j=oe.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(j!==void 0)w=j;else if(w=oe.isPointLight===!0?l:a,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0){const ie=w.uuid,pe=L.uuid;let N=c[ie];N===void 0&&(N={},c[ie]=N);let X=N[pe];X===void 0&&(X=w.clone(),N[pe]=X,L.addEventListener("dispose",O)),w=X}if(w.visible=L.visible,w.wireframe=L.wireframe,E===tn?w.side=L.shadowSide!==null?L.shadowSide:L.side:w.side=L.shadowSide!==null?L.shadowSide:u[L.side],w.alphaMap=L.alphaMap,w.alphaTest=L.alphaTest,w.map=L.map,w.clipShadows=L.clipShadows,w.clippingPlanes=L.clippingPlanes,w.clipIntersection=L.clipIntersection,w.displacementMap=L.displacementMap,w.displacementScale=L.displacementScale,w.displacementBias=L.displacementBias,w.wireframeLinewidth=L.wireframeLinewidth,w.linewidth=L.linewidth,oe.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const ie=i.properties.get(w);ie.light=oe}return w}function P(I,L,oe,E,w){if(I.visible===!1)return;if(I.layers.test(L.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&w===tn)&&(!I.frustumCulled||n.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(oe.matrixWorldInverse,I.matrixWorld);const pe=e.update(I),N=I.material;if(Array.isArray(N)){const X=pe.groups;for(let K=0,te=X.length;K<te;K++){const J=X[K],Z=N[J.materialIndex];if(Z&&Z.visible){const ae=S(I,Z,E,w);I.onBeforeShadow(i,I,L,oe,pe,ae,J),i.renderBufferDirect(oe,null,pe,ae,I,J),I.onAfterShadow(i,I,L,oe,pe,ae,J)}}}else if(N.visible){const X=S(I,N,E,w);I.onBeforeShadow(i,I,L,oe,pe,X,null),i.renderBufferDirect(oe,null,pe,X,I,null),I.onAfterShadow(i,I,L,oe,pe,X,null)}}const ie=I.children;for(let pe=0,N=ie.length;pe<N;pe++)P(ie[pe],L,oe,E,w)}function O(I){I.target.removeEventListener("dispose",O);for(const oe in c){const E=c[oe],w=I.target.uuid;w in E&&(E[w].dispose(),delete E[w])}}}function Qp(i,e,t){const n=t.isWebGL2;function s(){let R=!1;const ge=new ut;let _e=null;const De=new ut(0,0,0,0);return{setMask:function(Le){_e!==Le&&!R&&(i.colorMask(Le,Le,Le,Le),_e=Le)},setLocked:function(Le){R=Le},setClear:function(Le,Ke,Ze,lt,_t){_t===!0&&(Le*=lt,Ke*=lt,Ze*=lt),ge.set(Le,Ke,Ze,lt),De.equals(ge)===!1&&(i.clearColor(Le,Ke,Ze,lt),De.copy(ge))},reset:function(){R=!1,_e=null,De.set(-1,0,0,0)}}}function r(){let R=!1,ge=null,_e=null,De=null;return{setTest:function(Le){Le?k(i.DEPTH_TEST):A(i.DEPTH_TEST)},setMask:function(Le){ge!==Le&&!R&&(i.depthMask(Le),ge=Le)},setFunc:function(Le){if(_e!==Le){switch(Le){case Mc:i.depthFunc(i.NEVER);break;case Sc:i.depthFunc(i.ALWAYS);break;case bc:i.depthFunc(i.LESS);break;case gs:i.depthFunc(i.LEQUAL);break;case Ec:i.depthFunc(i.EQUAL);break;case Tc:i.depthFunc(i.GEQUAL);break;case wc:i.depthFunc(i.GREATER);break;case Ac:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}_e=Le}},setLocked:function(Le){R=Le},setClear:function(Le){De!==Le&&(i.clearDepth(Le),De=Le)},reset:function(){R=!1,ge=null,_e=null,De=null}}}function o(){let R=!1,ge=null,_e=null,De=null,Le=null,Ke=null,Ze=null,lt=null,_t=null;return{setTest:function(Je){R||(Je?k(i.STENCIL_TEST):A(i.STENCIL_TEST))},setMask:function(Je){ge!==Je&&!R&&(i.stencilMask(Je),ge=Je)},setFunc:function(Je,vt,Yt){(_e!==Je||De!==vt||Le!==Yt)&&(i.stencilFunc(Je,vt,Yt),_e=Je,De=vt,Le=Yt)},setOp:function(Je,vt,Yt){(Ke!==Je||Ze!==vt||lt!==Yt)&&(i.stencilOp(Je,vt,Yt),Ke=Je,Ze=vt,lt=Yt)},setLocked:function(Je){R=Je},setClear:function(Je){_t!==Je&&(i.clearStencil(Je),_t=Je)},reset:function(){R=!1,ge=null,_e=null,De=null,Le=null,Ke=null,Ze=null,lt=null,_t=null}}}const a=new s,l=new r,c=new o,h=new WeakMap,u=new WeakMap;let d={},p={},g=new WeakMap,_=[],m=null,f=!1,T=null,S=null,P=null,O=null,I=null,L=null,oe=null,E=new Ce(0,0,0),w=0,j=!1,ie=null,pe=null,N=null,X=null,K=null;const te=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let J=!1,Z=0;const ae=i.getParameter(i.VERSION);ae.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(ae)[1]),J=Z>=1):ae.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(ae)[1]),J=Z>=2);let le=null,xe={};const $=i.getParameter(i.SCISSOR_BOX),se=i.getParameter(i.VIEWPORT),ve=new ut().fromArray($),Se=new ut().fromArray(se);function Te(R,ge,_e,De){const Le=new Uint8Array(4),Ke=i.createTexture();i.bindTexture(R,Ke),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ze=0;Ze<_e;Ze++)n&&(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)?i.texImage3D(ge,0,i.RGBA,1,1,De,0,i.RGBA,i.UNSIGNED_BYTE,Le):i.texImage2D(ge+Ze,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Le);return Ke}const Oe={};Oe[i.TEXTURE_2D]=Te(i.TEXTURE_2D,i.TEXTURE_2D,1),Oe[i.TEXTURE_CUBE_MAP]=Te(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Oe[i.TEXTURE_2D_ARRAY]=Te(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Oe[i.TEXTURE_3D]=Te(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),k(i.DEPTH_TEST),l.setFunc(gs),ne(!1),x(lo),k(i.CULL_FACE),H(rn);function k(R){d[R]!==!0&&(i.enable(R),d[R]=!0)}function A(R){d[R]!==!1&&(i.disable(R),d[R]=!1)}function C(R,ge){return p[R]!==ge?(i.bindFramebuffer(R,ge),p[R]=ge,n&&(R===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=ge),R===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=ge)),!0):!1}function y(R,ge){let _e=_,De=!1;if(R)if(_e=g.get(ge),_e===void 0&&(_e=[],g.set(ge,_e)),R.isWebGLMultipleRenderTargets){const Le=R.texture;if(_e.length!==Le.length||_e[0]!==i.COLOR_ATTACHMENT0){for(let Ke=0,Ze=Le.length;Ke<Ze;Ke++)_e[Ke]=i.COLOR_ATTACHMENT0+Ke;_e.length=Le.length,De=!0}}else _e[0]!==i.COLOR_ATTACHMENT0&&(_e[0]=i.COLOR_ATTACHMENT0,De=!0);else _e[0]!==i.BACK&&(_e[0]=i.BACK,De=!0);De&&(t.isWebGL2?i.drawBuffers(_e):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(_e))}function F(R){return m!==R?(i.useProgram(R),m=R,!0):!1}const D={[Ln]:i.FUNC_ADD,[oc]:i.FUNC_SUBTRACT,[ac]:i.FUNC_REVERSE_SUBTRACT};if(n)D[uo]=i.MIN,D[fo]=i.MAX;else{const R=e.get("EXT_blend_minmax");R!==null&&(D[uo]=R.MIN_EXT,D[fo]=R.MAX_EXT)}const G={[lc]:i.ZERO,[cc]:i.ONE,[hc]:i.SRC_COLOR,[Er]:i.SRC_ALPHA,[gc]:i.SRC_ALPHA_SATURATE,[pc]:i.DST_COLOR,[dc]:i.DST_ALPHA,[uc]:i.ONE_MINUS_SRC_COLOR,[Tr]:i.ONE_MINUS_SRC_ALPHA,[mc]:i.ONE_MINUS_DST_COLOR,[fc]:i.ONE_MINUS_DST_ALPHA,[_c]:i.CONSTANT_COLOR,[vc]:i.ONE_MINUS_CONSTANT_COLOR,[xc]:i.CONSTANT_ALPHA,[yc]:i.ONE_MINUS_CONSTANT_ALPHA};function H(R,ge,_e,De,Le,Ke,Ze,lt,_t,Je){if(R===rn){f===!0&&(A(i.BLEND),f=!1);return}if(f===!1&&(k(i.BLEND),f=!0),R!==rc){if(R!==T||Je!==j){if((S!==Ln||I!==Ln)&&(i.blendEquation(i.FUNC_ADD),S=Ln,I=Ln),Je)switch(R){case hi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case br:i.blendFunc(i.ONE,i.ONE);break;case co:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ho:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case hi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case br:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case co:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ho:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}P=null,O=null,L=null,oe=null,E.set(0,0,0),w=0,T=R,j=Je}return}Le=Le||ge,Ke=Ke||_e,Ze=Ze||De,(ge!==S||Le!==I)&&(i.blendEquationSeparate(D[ge],D[Le]),S=ge,I=Le),(_e!==P||De!==O||Ke!==L||Ze!==oe)&&(i.blendFuncSeparate(G[_e],G[De],G[Ke],G[Ze]),P=_e,O=De,L=Ke,oe=Ze),(lt.equals(E)===!1||_t!==w)&&(i.blendColor(lt.r,lt.g,lt.b,_t),E.copy(lt),w=_t),T=R,j=!1}function ce(R,ge){R.side===nn?A(i.CULL_FACE):k(i.CULL_FACE);let _e=R.side===Tt;ge&&(_e=!_e),ne(_e),R.blending===hi&&R.transparent===!1?H(rn):H(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),l.setFunc(R.depthFunc),l.setTest(R.depthTest),l.setMask(R.depthWrite),a.setMask(R.colorWrite);const De=R.stencilWrite;c.setTest(De),De&&(c.setMask(R.stencilWriteMask),c.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),c.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),z(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?k(i.SAMPLE_ALPHA_TO_COVERAGE):A(i.SAMPLE_ALPHA_TO_COVERAGE)}function ne(R){ie!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),ie=R)}function x(R){R!==nc?(k(i.CULL_FACE),R!==pe&&(R===lo?i.cullFace(i.BACK):R===ic?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):A(i.CULL_FACE),pe=R}function v(R){R!==N&&(J&&i.lineWidth(R),N=R)}function z(R,ge,_e){R?(k(i.POLYGON_OFFSET_FILL),(X!==ge||K!==_e)&&(i.polygonOffset(ge,_e),X=ge,K=_e)):A(i.POLYGON_OFFSET_FILL)}function Q(R){R?k(i.SCISSOR_TEST):A(i.SCISSOR_TEST)}function ee(R){R===void 0&&(R=i.TEXTURE0+te-1),le!==R&&(i.activeTexture(R),le=R)}function V(R,ge,_e){_e===void 0&&(le===null?_e=i.TEXTURE0+te-1:_e=le);let De=xe[_e];De===void 0&&(De={type:void 0,texture:void 0},xe[_e]=De),(De.type!==R||De.texture!==ge)&&(le!==_e&&(i.activeTexture(_e),le=_e),i.bindTexture(R,ge||Oe[R]),De.type=R,De.texture=ge)}function ye(){const R=xe[le];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function ue(){try{i.compressedTexImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function he(){try{i.compressedTexImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function be(){try{i.texSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Pe(){try{i.texSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function re(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ye(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ae(){try{i.texStorage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Re(){try{i.texStorage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ee(){try{i.texImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function me(){try{i.texImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ne(R){ve.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),ve.copy(R))}function Xe(R){Se.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),Se.copy(R))}function qe(R,ge){let _e=u.get(ge);_e===void 0&&(_e=new WeakMap,u.set(ge,_e));let De=_e.get(R);De===void 0&&(De=i.getUniformBlockIndex(ge,R.name),_e.set(R,De))}function ke(R,ge){const De=u.get(ge).get(R);h.get(ge)!==De&&(i.uniformBlockBinding(ge,De,R.__bindingPointIndex),h.set(ge,De))}function de(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},le=null,xe={},p={},g=new WeakMap,_=[],m=null,f=!1,T=null,S=null,P=null,O=null,I=null,L=null,oe=null,E=new Ce(0,0,0),w=0,j=!1,ie=null,pe=null,N=null,X=null,K=null,ve.set(0,0,i.canvas.width,i.canvas.height),Se.set(0,0,i.canvas.width,i.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:k,disable:A,bindFramebuffer:C,drawBuffers:y,useProgram:F,setBlending:H,setMaterial:ce,setFlipSided:ne,setCullFace:x,setLineWidth:v,setPolygonOffset:z,setScissorTest:Q,activeTexture:ee,bindTexture:V,unbindTexture:ye,compressedTexImage2D:ue,compressedTexImage3D:he,texImage2D:Ee,texImage3D:me,updateUBOMapping:qe,uniformBlockBinding:ke,texStorage2D:Ae,texStorage3D:Re,texSubImage2D:be,texSubImage3D:Pe,compressedTexSubImage2D:re,compressedTexSubImage3D:Ye,scissor:Ne,viewport:Xe,reset:de}}function em(i,e,t,n,s,r,o){const a=s.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(x,v){return p?new OffscreenCanvas(x,v):Ms("canvas")}function _(x,v,z,Q){let ee=1;if((x.width>Q||x.height>Q)&&(ee=Q/Math.max(x.width,x.height)),ee<1||v===!0)if(typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&x instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&x instanceof ImageBitmap){const V=v?Ir:Math.floor,ye=V(ee*x.width),ue=V(ee*x.height);u===void 0&&(u=g(ye,ue));const he=z?g(ye,ue):u;return he.width=ye,he.height=ue,he.getContext("2d").drawImage(x,0,0,ye,ue),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+x.width+"x"+x.height+") to ("+ye+"x"+ue+")."),he}else return"data"in x&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+x.width+"x"+x.height+")."),x;return x}function m(x){return Vo(x.width)&&Vo(x.height)}function f(x){return a?!1:x.wrapS!==Wt||x.wrapT!==Wt||x.minFilter!==yt&&x.minFilter!==Nt}function T(x,v){return x.generateMipmaps&&v&&x.minFilter!==yt&&x.minFilter!==Nt}function S(x){i.generateMipmap(x)}function P(x,v,z,Q,ee=!1){if(a===!1)return v;if(x!==null){if(i[x]!==void 0)return i[x];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+x+"'")}let V=v;if(v===i.RED&&(z===i.FLOAT&&(V=i.R32F),z===i.HALF_FLOAT&&(V=i.R16F),z===i.UNSIGNED_BYTE&&(V=i.R8)),v===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(V=i.R8UI),z===i.UNSIGNED_SHORT&&(V=i.R16UI),z===i.UNSIGNED_INT&&(V=i.R32UI),z===i.BYTE&&(V=i.R8I),z===i.SHORT&&(V=i.R16I),z===i.INT&&(V=i.R32I)),v===i.RG&&(z===i.FLOAT&&(V=i.RG32F),z===i.HALF_FLOAT&&(V=i.RG16F),z===i.UNSIGNED_BYTE&&(V=i.RG8)),v===i.RGBA){const ye=ee?_s:$e.getTransfer(Q);z===i.FLOAT&&(V=i.RGBA32F),z===i.HALF_FLOAT&&(V=i.RGBA16F),z===i.UNSIGNED_BYTE&&(V=ye===Qe?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(V=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(V=i.RGB5_A1)}return(V===i.R16F||V===i.R32F||V===i.RG16F||V===i.RG32F||V===i.RGBA16F||V===i.RGBA32F)&&e.get("EXT_color_buffer_float"),V}function O(x,v,z){return T(x,z)===!0||x.isFramebufferTexture&&x.minFilter!==yt&&x.minFilter!==Nt?Math.log2(Math.max(v.width,v.height))+1:x.mipmaps!==void 0&&x.mipmaps.length>0?x.mipmaps.length:x.isCompressedTexture&&Array.isArray(x.image)?v.mipmaps.length:1}function I(x){return x===yt||x===po||x===Ns?i.NEAREST:i.LINEAR}function L(x){const v=x.target;v.removeEventListener("dispose",L),E(v),v.isVideoTexture&&h.delete(v)}function oe(x){const v=x.target;v.removeEventListener("dispose",oe),j(v)}function E(x){const v=n.get(x);if(v.__webglInit===void 0)return;const z=x.source,Q=d.get(z);if(Q){const ee=Q[v.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&w(x),Object.keys(Q).length===0&&d.delete(z)}n.remove(x)}function w(x){const v=n.get(x);i.deleteTexture(v.__webglTexture);const z=x.source,Q=d.get(z);delete Q[v.__cacheKey],o.memory.textures--}function j(x){const v=x.texture,z=n.get(x),Q=n.get(v);if(Q.__webglTexture!==void 0&&(i.deleteTexture(Q.__webglTexture),o.memory.textures--),x.depthTexture&&x.depthTexture.dispose(),x.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(z.__webglFramebuffer[ee]))for(let V=0;V<z.__webglFramebuffer[ee].length;V++)i.deleteFramebuffer(z.__webglFramebuffer[ee][V]);else i.deleteFramebuffer(z.__webglFramebuffer[ee]);z.__webglDepthbuffer&&i.deleteRenderbuffer(z.__webglDepthbuffer[ee])}else{if(Array.isArray(z.__webglFramebuffer))for(let ee=0;ee<z.__webglFramebuffer.length;ee++)i.deleteFramebuffer(z.__webglFramebuffer[ee]);else i.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer&&i.deleteRenderbuffer(z.__webglDepthbuffer),z.__webglMultisampledFramebuffer&&i.deleteFramebuffer(z.__webglMultisampledFramebuffer),z.__webglColorRenderbuffer)for(let ee=0;ee<z.__webglColorRenderbuffer.length;ee++)z.__webglColorRenderbuffer[ee]&&i.deleteRenderbuffer(z.__webglColorRenderbuffer[ee]);z.__webglDepthRenderbuffer&&i.deleteRenderbuffer(z.__webglDepthRenderbuffer)}if(x.isWebGLMultipleRenderTargets)for(let ee=0,V=v.length;ee<V;ee++){const ye=n.get(v[ee]);ye.__webglTexture&&(i.deleteTexture(ye.__webglTexture),o.memory.textures--),n.remove(v[ee])}n.remove(v),n.remove(x)}let ie=0;function pe(){ie=0}function N(){const x=ie;return x>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+x+" texture units while this GPU supports only "+s.maxTextures),ie+=1,x}function X(x){const v=[];return v.push(x.wrapS),v.push(x.wrapT),v.push(x.wrapR||0),v.push(x.magFilter),v.push(x.minFilter),v.push(x.anisotropy),v.push(x.internalFormat),v.push(x.format),v.push(x.type),v.push(x.generateMipmaps),v.push(x.premultiplyAlpha),v.push(x.flipY),v.push(x.unpackAlignment),v.push(x.colorSpace),v.join()}function K(x,v){const z=n.get(x);if(x.isVideoTexture&&ce(x),x.isRenderTargetTexture===!1&&x.version>0&&z.__version!==x.version){const Q=x.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ve(z,x,v);return}}t.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+v)}function te(x,v){const z=n.get(x);if(x.version>0&&z.__version!==x.version){ve(z,x,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+v)}function J(x,v){const z=n.get(x);if(x.version>0&&z.__version!==x.version){ve(z,x,v);return}t.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+v)}function Z(x,v){const z=n.get(x);if(x.version>0&&z.__version!==x.version){Se(z,x,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+v)}const ae={[Cr]:i.REPEAT,[Wt]:i.CLAMP_TO_EDGE,[Rr]:i.MIRRORED_REPEAT},le={[yt]:i.NEAREST,[po]:i.NEAREST_MIPMAP_NEAREST,[Ns]:i.NEAREST_MIPMAP_LINEAR,[Nt]:i.LINEAR,[Fc]:i.LINEAR_MIPMAP_NEAREST,[Pi]:i.LINEAR_MIPMAP_LINEAR},xe={[jc]:i.NEVER,[eh]:i.ALWAYS,[$c]:i.LESS,[vl]:i.LEQUAL,[Kc]:i.EQUAL,[Qc]:i.GEQUAL,[Zc]:i.GREATER,[Jc]:i.NOTEQUAL};function $(x,v,z){if(z?(i.texParameteri(x,i.TEXTURE_WRAP_S,ae[v.wrapS]),i.texParameteri(x,i.TEXTURE_WRAP_T,ae[v.wrapT]),(x===i.TEXTURE_3D||x===i.TEXTURE_2D_ARRAY)&&i.texParameteri(x,i.TEXTURE_WRAP_R,ae[v.wrapR]),i.texParameteri(x,i.TEXTURE_MAG_FILTER,le[v.magFilter]),i.texParameteri(x,i.TEXTURE_MIN_FILTER,le[v.minFilter])):(i.texParameteri(x,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(x,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(x===i.TEXTURE_3D||x===i.TEXTURE_2D_ARRAY)&&i.texParameteri(x,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(v.wrapS!==Wt||v.wrapT!==Wt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(x,i.TEXTURE_MAG_FILTER,I(v.magFilter)),i.texParameteri(x,i.TEXTURE_MIN_FILTER,I(v.minFilter)),v.minFilter!==yt&&v.minFilter!==Nt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),v.compareFunction&&(i.texParameteri(x,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(x,i.TEXTURE_COMPARE_FUNC,xe[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const Q=e.get("EXT_texture_filter_anisotropic");if(v.magFilter===yt||v.minFilter!==Ns&&v.minFilter!==Pi||v.type===gn&&e.has("OES_texture_float_linear")===!1||a===!1&&v.type===on&&e.has("OES_texture_half_float_linear")===!1)return;(v.anisotropy>1||n.get(v).__currentAnisotropy)&&(i.texParameterf(x,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy)}}function se(x,v){let z=!1;x.__webglInit===void 0&&(x.__webglInit=!0,v.addEventListener("dispose",L));const Q=v.source;let ee=d.get(Q);ee===void 0&&(ee={},d.set(Q,ee));const V=X(v);if(V!==x.__cacheKey){ee[V]===void 0&&(ee[V]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,z=!0),ee[V].usedTimes++;const ye=ee[x.__cacheKey];ye!==void 0&&(ee[x.__cacheKey].usedTimes--,ye.usedTimes===0&&w(v)),x.__cacheKey=V,x.__webglTexture=ee[V].texture}return z}function ve(x,v,z){let Q=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Q=i.TEXTURE_3D);const ee=se(x,v),V=v.source;t.bindTexture(Q,x.__webglTexture,i.TEXTURE0+z);const ye=n.get(V);if(V.version!==ye.__version||ee===!0){t.activeTexture(i.TEXTURE0+z);const ue=$e.getPrimaries($e.workingColorSpace),he=v.colorSpace===Ot?null:$e.getPrimaries(v.colorSpace),be=v.colorSpace===Ot||ue===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const Pe=f(v)&&m(v.image)===!1;let re=_(v.image,Pe,!1,s.maxTextureSize);re=ne(v,re);const Ye=m(re)||a,Ae=r.convert(v.format,v.colorSpace);let Re=r.convert(v.type),Ee=P(v.internalFormat,Ae,Re,v.colorSpace,v.isVideoTexture);$(Q,v,Ye);let me;const Ne=v.mipmaps,Xe=a&&v.isVideoTexture!==!0&&Ee!==ml,qe=ye.__version===void 0||ee===!0,ke=O(v,re,Ye);if(v.isDepthTexture)Ee=i.DEPTH_COMPONENT,a?v.type===gn?Ee=i.DEPTH_COMPONENT32F:v.type===mn?Ee=i.DEPTH_COMPONENT24:v.type===Un?Ee=i.DEPTH24_STENCIL8:Ee=i.DEPTH_COMPONENT16:v.type===gn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),v.format===Nn&&Ee===i.DEPTH_COMPONENT&&v.type!==Wr&&v.type!==mn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),v.type=mn,Re=r.convert(v.type)),v.format===pi&&Ee===i.DEPTH_COMPONENT&&(Ee=i.DEPTH_STENCIL,v.type!==Un&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),v.type=Un,Re=r.convert(v.type))),qe&&(Xe?t.texStorage2D(i.TEXTURE_2D,1,Ee,re.width,re.height):t.texImage2D(i.TEXTURE_2D,0,Ee,re.width,re.height,0,Ae,Re,null));else if(v.isDataTexture)if(Ne.length>0&&Ye){Xe&&qe&&t.texStorage2D(i.TEXTURE_2D,ke,Ee,Ne[0].width,Ne[0].height);for(let de=0,R=Ne.length;de<R;de++)me=Ne[de],Xe?t.texSubImage2D(i.TEXTURE_2D,de,0,0,me.width,me.height,Ae,Re,me.data):t.texImage2D(i.TEXTURE_2D,de,Ee,me.width,me.height,0,Ae,Re,me.data);v.generateMipmaps=!1}else Xe?(qe&&t.texStorage2D(i.TEXTURE_2D,ke,Ee,re.width,re.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,re.width,re.height,Ae,Re,re.data)):t.texImage2D(i.TEXTURE_2D,0,Ee,re.width,re.height,0,Ae,Re,re.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Xe&&qe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ke,Ee,Ne[0].width,Ne[0].height,re.depth);for(let de=0,R=Ne.length;de<R;de++)me=Ne[de],v.format!==qt?Ae!==null?Xe?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,de,0,0,0,me.width,me.height,re.depth,Ae,me.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,de,Ee,me.width,me.height,re.depth,0,me.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?t.texSubImage3D(i.TEXTURE_2D_ARRAY,de,0,0,0,me.width,me.height,re.depth,Ae,Re,me.data):t.texImage3D(i.TEXTURE_2D_ARRAY,de,Ee,me.width,me.height,re.depth,0,Ae,Re,me.data)}else{Xe&&qe&&t.texStorage2D(i.TEXTURE_2D,ke,Ee,Ne[0].width,Ne[0].height);for(let de=0,R=Ne.length;de<R;de++)me=Ne[de],v.format!==qt?Ae!==null?Xe?t.compressedTexSubImage2D(i.TEXTURE_2D,de,0,0,me.width,me.height,Ae,me.data):t.compressedTexImage2D(i.TEXTURE_2D,de,Ee,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?t.texSubImage2D(i.TEXTURE_2D,de,0,0,me.width,me.height,Ae,Re,me.data):t.texImage2D(i.TEXTURE_2D,de,Ee,me.width,me.height,0,Ae,Re,me.data)}else if(v.isDataArrayTexture)Xe?(qe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ke,Ee,re.width,re.height,re.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,Ae,Re,re.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ee,re.width,re.height,re.depth,0,Ae,Re,re.data);else if(v.isData3DTexture)Xe?(qe&&t.texStorage3D(i.TEXTURE_3D,ke,Ee,re.width,re.height,re.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,Ae,Re,re.data)):t.texImage3D(i.TEXTURE_3D,0,Ee,re.width,re.height,re.depth,0,Ae,Re,re.data);else if(v.isFramebufferTexture){if(qe)if(Xe)t.texStorage2D(i.TEXTURE_2D,ke,Ee,re.width,re.height);else{let de=re.width,R=re.height;for(let ge=0;ge<ke;ge++)t.texImage2D(i.TEXTURE_2D,ge,Ee,de,R,0,Ae,Re,null),de>>=1,R>>=1}}else if(Ne.length>0&&Ye){Xe&&qe&&t.texStorage2D(i.TEXTURE_2D,ke,Ee,Ne[0].width,Ne[0].height);for(let de=0,R=Ne.length;de<R;de++)me=Ne[de],Xe?t.texSubImage2D(i.TEXTURE_2D,de,0,0,Ae,Re,me):t.texImage2D(i.TEXTURE_2D,de,Ee,Ae,Re,me);v.generateMipmaps=!1}else Xe?(qe&&t.texStorage2D(i.TEXTURE_2D,ke,Ee,re.width,re.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ae,Re,re)):t.texImage2D(i.TEXTURE_2D,0,Ee,Ae,Re,re);T(v,Ye)&&S(Q),ye.__version=V.version,v.onUpdate&&v.onUpdate(v)}x.__version=v.version}function Se(x,v,z){if(v.image.length!==6)return;const Q=se(x,v),ee=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,x.__webglTexture,i.TEXTURE0+z);const V=n.get(ee);if(ee.version!==V.__version||Q===!0){t.activeTexture(i.TEXTURE0+z);const ye=$e.getPrimaries($e.workingColorSpace),ue=v.colorSpace===Ot?null:$e.getPrimaries(v.colorSpace),he=v.colorSpace===Ot||ye===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const be=v.isCompressedTexture||v.image[0].isCompressedTexture,Pe=v.image[0]&&v.image[0].isDataTexture,re=[];for(let de=0;de<6;de++)!be&&!Pe?re[de]=_(v.image[de],!1,!0,s.maxCubemapSize):re[de]=Pe?v.image[de].image:v.image[de],re[de]=ne(v,re[de]);const Ye=re[0],Ae=m(Ye)||a,Re=r.convert(v.format,v.colorSpace),Ee=r.convert(v.type),me=P(v.internalFormat,Re,Ee,v.colorSpace),Ne=a&&v.isVideoTexture!==!0,Xe=V.__version===void 0||Q===!0;let qe=O(v,Ye,Ae);$(i.TEXTURE_CUBE_MAP,v,Ae);let ke;if(be){Ne&&Xe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,qe,me,Ye.width,Ye.height);for(let de=0;de<6;de++){ke=re[de].mipmaps;for(let R=0;R<ke.length;R++){const ge=ke[R];v.format!==qt?Re!==null?Ne?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,R,0,0,ge.width,ge.height,Re,ge.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,R,me,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ne?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,R,0,0,ge.width,ge.height,Re,Ee,ge.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,R,me,ge.width,ge.height,0,Re,Ee,ge.data)}}}else{ke=v.mipmaps,Ne&&Xe&&(ke.length>0&&qe++,t.texStorage2D(i.TEXTURE_CUBE_MAP,qe,me,re[0].width,re[0].height));for(let de=0;de<6;de++)if(Pe){Ne?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,re[de].width,re[de].height,Re,Ee,re[de].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,me,re[de].width,re[de].height,0,Re,Ee,re[de].data);for(let R=0;R<ke.length;R++){const _e=ke[R].image[de].image;Ne?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,R+1,0,0,_e.width,_e.height,Re,Ee,_e.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,R+1,me,_e.width,_e.height,0,Re,Ee,_e.data)}}else{Ne?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,Re,Ee,re[de]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,me,Re,Ee,re[de]);for(let R=0;R<ke.length;R++){const ge=ke[R];Ne?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,R+1,0,0,Re,Ee,ge.image[de]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,R+1,me,Re,Ee,ge.image[de])}}}T(v,Ae)&&S(i.TEXTURE_CUBE_MAP),V.__version=ee.version,v.onUpdate&&v.onUpdate(v)}x.__version=v.version}function Te(x,v,z,Q,ee,V){const ye=r.convert(z.format,z.colorSpace),ue=r.convert(z.type),he=P(z.internalFormat,ye,ue,z.colorSpace);if(!n.get(v).__hasExternalTextures){const Pe=Math.max(1,v.width>>V),re=Math.max(1,v.height>>V);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,V,he,Pe,re,v.depth,0,ye,ue,null):t.texImage2D(ee,V,he,Pe,re,0,ye,ue,null)}t.bindFramebuffer(i.FRAMEBUFFER,x),H(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,ee,n.get(z).__webglTexture,0,G(v)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,ee,n.get(z).__webglTexture,V),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Oe(x,v,z){if(i.bindRenderbuffer(i.RENDERBUFFER,x),v.depthBuffer&&!v.stencilBuffer){let Q=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(z||H(v)){const ee=v.depthTexture;ee&&ee.isDepthTexture&&(ee.type===gn?Q=i.DEPTH_COMPONENT32F:ee.type===mn&&(Q=i.DEPTH_COMPONENT24));const V=G(v);H(v)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,V,Q,v.width,v.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,V,Q,v.width,v.height)}else i.renderbufferStorage(i.RENDERBUFFER,Q,v.width,v.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,x)}else if(v.depthBuffer&&v.stencilBuffer){const Q=G(v);z&&H(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,i.DEPTH24_STENCIL8,v.width,v.height):H(v)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Q,i.DEPTH24_STENCIL8,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,x)}else{const Q=v.isWebGLMultipleRenderTargets===!0?v.texture:[v.texture];for(let ee=0;ee<Q.length;ee++){const V=Q[ee],ye=r.convert(V.format,V.colorSpace),ue=r.convert(V.type),he=P(V.internalFormat,ye,ue,V.colorSpace),be=G(v);z&&H(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,be,he,v.width,v.height):H(v)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,be,he,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,he,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function k(x,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,x),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),K(v.depthTexture,0);const Q=n.get(v.depthTexture).__webglTexture,ee=G(v);if(v.depthTexture.format===Nn)H(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,ee):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(v.depthTexture.format===pi)H(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,ee):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function A(x){const v=n.get(x),z=x.isWebGLCubeRenderTarget===!0;if(x.depthTexture&&!v.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");k(v.__webglFramebuffer,x)}else if(z){v.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[Q]),v.__webglDepthbuffer[Q]=i.createRenderbuffer(),Oe(v.__webglDepthbuffer[Q],x,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer=i.createRenderbuffer(),Oe(v.__webglDepthbuffer,x,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function C(x,v,z){const Q=n.get(x);v!==void 0&&Te(Q.__webglFramebuffer,x,x.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&A(x)}function y(x){const v=x.texture,z=n.get(x),Q=n.get(v);x.addEventListener("dispose",oe),x.isWebGLMultipleRenderTargets!==!0&&(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=v.version,o.memory.textures++);const ee=x.isWebGLCubeRenderTarget===!0,V=x.isWebGLMultipleRenderTargets===!0,ye=m(x)||a;if(ee){z.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(a&&v.mipmaps&&v.mipmaps.length>0){z.__webglFramebuffer[ue]=[];for(let he=0;he<v.mipmaps.length;he++)z.__webglFramebuffer[ue][he]=i.createFramebuffer()}else z.__webglFramebuffer[ue]=i.createFramebuffer()}else{if(a&&v.mipmaps&&v.mipmaps.length>0){z.__webglFramebuffer=[];for(let ue=0;ue<v.mipmaps.length;ue++)z.__webglFramebuffer[ue]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(V)if(s.drawBuffers){const ue=x.texture;for(let he=0,be=ue.length;he<be;he++){const Pe=n.get(ue[he]);Pe.__webglTexture===void 0&&(Pe.__webglTexture=i.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&x.samples>0&&H(x)===!1){const ue=V?v:[v];z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let he=0;he<ue.length;he++){const be=ue[he];z.__webglColorRenderbuffer[he]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[he]);const Pe=r.convert(be.format,be.colorSpace),re=r.convert(be.type),Ye=P(be.internalFormat,Pe,re,be.colorSpace,x.isXRRenderTarget===!0),Ae=G(x);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ae,Ye,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,z.__webglColorRenderbuffer[he])}i.bindRenderbuffer(i.RENDERBUFFER,null),x.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Oe(z.__webglDepthRenderbuffer,x,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ee){t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),$(i.TEXTURE_CUBE_MAP,v,ye);for(let ue=0;ue<6;ue++)if(a&&v.mipmaps&&v.mipmaps.length>0)for(let he=0;he<v.mipmaps.length;he++)Te(z.__webglFramebuffer[ue][he],x,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,he);else Te(z.__webglFramebuffer[ue],x,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);T(v,ye)&&S(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(V){const ue=x.texture;for(let he=0,be=ue.length;he<be;he++){const Pe=ue[he],re=n.get(Pe);t.bindTexture(i.TEXTURE_2D,re.__webglTexture),$(i.TEXTURE_2D,Pe,ye),Te(z.__webglFramebuffer,x,Pe,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,0),T(Pe,ye)&&S(i.TEXTURE_2D)}t.unbindTexture()}else{let ue=i.TEXTURE_2D;if((x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(a?ue=x.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ue,Q.__webglTexture),$(ue,v,ye),a&&v.mipmaps&&v.mipmaps.length>0)for(let he=0;he<v.mipmaps.length;he++)Te(z.__webglFramebuffer[he],x,v,i.COLOR_ATTACHMENT0,ue,he);else Te(z.__webglFramebuffer,x,v,i.COLOR_ATTACHMENT0,ue,0);T(v,ye)&&S(ue),t.unbindTexture()}x.depthBuffer&&A(x)}function F(x){const v=m(x)||a,z=x.isWebGLMultipleRenderTargets===!0?x.texture:[x.texture];for(let Q=0,ee=z.length;Q<ee;Q++){const V=z[Q];if(T(V,v)){const ye=x.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ue=n.get(V).__webglTexture;t.bindTexture(ye,ue),S(ye),t.unbindTexture()}}}function D(x){if(a&&x.samples>0&&H(x)===!1){const v=x.isWebGLMultipleRenderTargets?x.texture:[x.texture],z=x.width,Q=x.height;let ee=i.COLOR_BUFFER_BIT;const V=[],ye=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=n.get(x),he=x.isWebGLMultipleRenderTargets===!0;if(he)for(let be=0;be<v.length;be++)t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let be=0;be<v.length;be++){V.push(i.COLOR_ATTACHMENT0+be),x.depthBuffer&&V.push(ye);const Pe=ue.__ignoreDepthValues!==void 0?ue.__ignoreDepthValues:!1;if(Pe===!1&&(x.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),x.stencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),he&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ue.__webglColorRenderbuffer[be]),Pe===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[ye]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[ye])),he){const re=n.get(v[be]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,re,0)}i.blitFramebuffer(0,0,z,Q,0,0,z,Q,ee,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,V)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),he)for(let be=0;be<v.length;be++){t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,ue.__webglColorRenderbuffer[be]);const Pe=n.get(v[be]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,Pe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}}function G(x){return Math.min(s.maxSamples,x.samples)}function H(x){const v=n.get(x);return a&&x.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ce(x){const v=o.render.frame;h.get(x)!==v&&(h.set(x,v),x.update())}function ne(x,v){const z=x.colorSpace,Q=x.format,ee=x.type;return x.isCompressedTexture===!0||x.isVideoTexture===!0||x.format===Pr||z!==an&&z!==Ot&&($e.getTransfer(z)===Qe?a===!1?e.has("EXT_sRGB")===!0&&Q===qt?(x.format=Pr,x.minFilter=Nt,x.generateMipmaps=!1):v=yl.sRGBToLinear(v):(Q!==qt||ee!==yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),v}this.allocateTextureUnit=N,this.resetTextureUnits=pe,this.setTexture2D=K,this.setTexture2DArray=te,this.setTexture3D=J,this.setTextureCube=Z,this.rebindTextures=C,this.setupRenderTarget=y,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=D,this.setupDepthRenderbuffer=A,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=H}function tm(i,e,t){const n=t.isWebGL2;function s(r,o=Ot){let a;const l=$e.getTransfer(o);if(r===yn)return i.UNSIGNED_BYTE;if(r===hl)return i.UNSIGNED_SHORT_4_4_4_4;if(r===ul)return i.UNSIGNED_SHORT_5_5_5_1;if(r===Oc)return i.BYTE;if(r===Bc)return i.SHORT;if(r===Wr)return i.UNSIGNED_SHORT;if(r===cl)return i.INT;if(r===mn)return i.UNSIGNED_INT;if(r===gn)return i.FLOAT;if(r===on)return n?i.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===zc)return i.ALPHA;if(r===qt)return i.RGBA;if(r===kc)return i.LUMINANCE;if(r===Hc)return i.LUMINANCE_ALPHA;if(r===Nn)return i.DEPTH_COMPONENT;if(r===pi)return i.DEPTH_STENCIL;if(r===Pr)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===Gc)return i.RED;if(r===dl)return i.RED_INTEGER;if(r===Vc)return i.RG;if(r===fl)return i.RG_INTEGER;if(r===pl)return i.RGBA_INTEGER;if(r===Fs||r===Os||r===Bs||r===zs)if(l===Qe)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Fs)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Os)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Bs)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===zs)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Fs)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Os)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Bs)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===zs)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===mo||r===go||r===_o||r===vo)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===mo)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===go)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===_o)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===vo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===ml)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===xo||r===yo)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===xo)return l===Qe?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===yo)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Mo||r===So||r===bo||r===Eo||r===To||r===wo||r===Ao||r===Co||r===Ro||r===Po||r===Lo||r===Io||r===Do||r===Uo)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Mo)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===So)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===bo)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Eo)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===To)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===wo)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Ao)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Co)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Ro)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Po)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Lo)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Io)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Do)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Uo)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===ks||r===No||r===Fo)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===ks)return l===Qe?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===No)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Fo)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Wc||r===Oo||r===Bo||r===zo)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===ks)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Oo)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Bo)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===zo)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Un?n?i.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}class nm extends Ft{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class _n extends dt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const im={type:"move"};class ur{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _n,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _n,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _n,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(im)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new _n;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class sm extends kn{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,g=null;const _=t.getContextAttributes();let m=null,f=null;const T=[],S=[],P=new Fe;let O=null;const I=new Ft;I.layers.enable(1),I.viewport=new ut;const L=new Ft;L.layers.enable(2),L.viewport=new ut;const oe=[I,L],E=new nm;E.layers.enable(1),E.layers.enable(2);let w=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let se=T[$];return se===void 0&&(se=new ur,T[$]=se),se.getTargetRaySpace()},this.getControllerGrip=function($){let se=T[$];return se===void 0&&(se=new ur,T[$]=se),se.getGripSpace()},this.getHand=function($){let se=T[$];return se===void 0&&(se=new ur,T[$]=se),se.getHandSpace()};function ie($){const se=S.indexOf($.inputSource);if(se===-1)return;const ve=T[se];ve!==void 0&&(ve.update($.inputSource,$.frame,c||o),ve.dispatchEvent({type:$.type,data:$.inputSource}))}function pe(){s.removeEventListener("select",ie),s.removeEventListener("selectstart",ie),s.removeEventListener("selectend",ie),s.removeEventListener("squeeze",ie),s.removeEventListener("squeezestart",ie),s.removeEventListener("squeezeend",ie),s.removeEventListener("end",pe),s.removeEventListener("inputsourceschange",N);for(let $=0;$<T.length;$++){const se=S[$];se!==null&&(S[$]=null,T[$].disconnect(se))}w=null,j=null,e.setRenderTarget(m),p=null,d=null,u=null,s=null,f=null,xe.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",ie),s.addEventListener("selectstart",ie),s.addEventListener("selectend",ie),s.addEventListener("squeeze",ie),s.addEventListener("squeezestart",ie),s.addEventListener("squeezeend",ie),s.addEventListener("end",pe),s.addEventListener("inputsourceschange",N),_.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(P),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const se={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,se),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),f=new Xt(p.framebufferWidth,p.framebufferHeight,{format:qt,type:yn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let se=null,ve=null,Se=null;_.depth&&(Se=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=_.stencil?pi:Nn,ve=_.stencil?Un:mn);const Te={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:r};u=new XRWebGLBinding(s,t),d=u.createProjectionLayer(Te),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),f=new Xt(d.textureWidth,d.textureHeight,{format:qt,type:yn,depthTexture:new Il(d.textureWidth,d.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Oe=e.properties.get(f);Oe.__ignoreDepthValues=d.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),xe.setContext(s),xe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function N($){for(let se=0;se<$.removed.length;se++){const ve=$.removed[se],Se=S.indexOf(ve);Se>=0&&(S[Se]=null,T[Se].disconnect(ve))}for(let se=0;se<$.added.length;se++){const ve=$.added[se];let Se=S.indexOf(ve);if(Se===-1){for(let Oe=0;Oe<T.length;Oe++)if(Oe>=S.length){S.push(ve),Se=Oe;break}else if(S[Oe]===null){S[Oe]=ve,Se=Oe;break}if(Se===-1)break}const Te=T[Se];Te&&Te.connect(ve)}}const X=new U,K=new U;function te($,se,ve){X.setFromMatrixPosition(se.matrixWorld),K.setFromMatrixPosition(ve.matrixWorld);const Se=X.distanceTo(K),Te=se.projectionMatrix.elements,Oe=ve.projectionMatrix.elements,k=Te[14]/(Te[10]-1),A=Te[14]/(Te[10]+1),C=(Te[9]+1)/Te[5],y=(Te[9]-1)/Te[5],F=(Te[8]-1)/Te[0],D=(Oe[8]+1)/Oe[0],G=k*F,H=k*D,ce=Se/(-F+D),ne=ce*-F;se.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(ne),$.translateZ(ce),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert();const x=k+ce,v=A+ce,z=G-ne,Q=H+(Se-ne),ee=C*A/v*x,V=y*A/v*x;$.projectionMatrix.makePerspective(z,Q,ee,V,x,v),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}function J($,se){se===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(se.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;E.near=L.near=I.near=$.near,E.far=L.far=I.far=$.far,(w!==E.near||j!==E.far)&&(s.updateRenderState({depthNear:E.near,depthFar:E.far}),w=E.near,j=E.far);const se=$.parent,ve=E.cameras;J(E,se);for(let Se=0;Se<ve.length;Se++)J(ve[Se],se);ve.length===2?te(E,I,L):E.projectionMatrix.copy(I.projectionMatrix),Z($,E,se)};function Z($,se,ve){ve===null?$.matrix.copy(se.matrixWorld):($.matrix.copy(ve.matrixWorld),$.matrix.invert(),$.matrix.multiply(se.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(se.projectionMatrix),$.projectionMatrixInverse.copy(se.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Lr*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=$)};let ae=null;function le($,se){if(h=se.getViewerPose(c||o),g=se,h!==null){const ve=h.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let Se=!1;ve.length!==E.cameras.length&&(E.cameras.length=0,Se=!0);for(let Te=0;Te<ve.length;Te++){const Oe=ve[Te];let k=null;if(p!==null)k=p.getViewport(Oe);else{const C=u.getViewSubImage(d,Oe);k=C.viewport,Te===0&&(e.setRenderTargetTextures(f,C.colorTexture,d.ignoreDepthValues?void 0:C.depthStencilTexture),e.setRenderTarget(f))}let A=oe[Te];A===void 0&&(A=new Ft,A.layers.enable(Te),A.viewport=new ut,oe[Te]=A),A.matrix.fromArray(Oe.transform.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale),A.projectionMatrix.fromArray(Oe.projectionMatrix),A.projectionMatrixInverse.copy(A.projectionMatrix).invert(),A.viewport.set(k.x,k.y,k.width,k.height),Te===0&&(E.matrix.copy(A.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),Se===!0&&E.cameras.push(A)}}for(let ve=0;ve<T.length;ve++){const Se=S[ve],Te=T[ve];Se!==null&&Te!==void 0&&Te.update(Se,se,c||o)}ae&&ae($,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),g=null}const xe=new Ll;xe.setAnimationLoop(le),this.setAnimationLoop=function($){ae=$},this.dispose=function(){}}}function rm(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Cl(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,T,S,P){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,P)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,T,S):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Tt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Tt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const T=e.get(f).envMap;if(T&&(m.envMap.value=T,m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;const S=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*S,t(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,T,S){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*T,m.scale.value=S*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),e.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,T){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Tt&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const T=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function om(i,e,t,n){let s={},r={},o=[];const a=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(T,S){const P=S.program;n.uniformBlockBinding(T,P)}function c(T,S){let P=s[T.id];P===void 0&&(g(T),P=h(T),s[T.id]=P,T.addEventListener("dispose",m));const O=S.program;n.updateUBOMapping(T,O);const I=e.render.frame;r[T.id]!==I&&(d(T),r[T.id]=I)}function h(T){const S=u();T.__bindingPointIndex=S;const P=i.createBuffer(),O=T.__size,I=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,P),i.bufferData(i.UNIFORM_BUFFER,O,I),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,P),P}function u(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(T){const S=s[T.id],P=T.uniforms,O=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let I=0,L=P.length;I<L;I++){const oe=Array.isArray(P[I])?P[I]:[P[I]];for(let E=0,w=oe.length;E<w;E++){const j=oe[E];if(p(j,I,E,O)===!0){const ie=j.__offset,pe=Array.isArray(j.value)?j.value:[j.value];let N=0;for(let X=0;X<pe.length;X++){const K=pe[X],te=_(K);typeof K=="number"||typeof K=="boolean"?(j.__data[0]=K,i.bufferSubData(i.UNIFORM_BUFFER,ie+N,j.__data)):K.isMatrix3?(j.__data[0]=K.elements[0],j.__data[1]=K.elements[1],j.__data[2]=K.elements[2],j.__data[3]=0,j.__data[4]=K.elements[3],j.__data[5]=K.elements[4],j.__data[6]=K.elements[5],j.__data[7]=0,j.__data[8]=K.elements[6],j.__data[9]=K.elements[7],j.__data[10]=K.elements[8],j.__data[11]=0):(K.toArray(j.__data,N),N+=te.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,ie,j.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(T,S,P,O){const I=T.value,L=S+"_"+P;if(O[L]===void 0)return typeof I=="number"||typeof I=="boolean"?O[L]=I:O[L]=I.clone(),!0;{const oe=O[L];if(typeof I=="number"||typeof I=="boolean"){if(oe!==I)return O[L]=I,!0}else if(oe.equals(I)===!1)return oe.copy(I),!0}return!1}function g(T){const S=T.uniforms;let P=0;const O=16;for(let L=0,oe=S.length;L<oe;L++){const E=Array.isArray(S[L])?S[L]:[S[L]];for(let w=0,j=E.length;w<j;w++){const ie=E[w],pe=Array.isArray(ie.value)?ie.value:[ie.value];for(let N=0,X=pe.length;N<X;N++){const K=pe[N],te=_(K),J=P%O;J!==0&&O-J<te.boundary&&(P+=O-J),ie.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),ie.__offset=P,P+=te.storage}}}const I=P%O;return I>0&&(P+=O-I),T.__size=P,T.__cache={},this}function _(T){const S={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(S.boundary=4,S.storage=4):T.isVector2?(S.boundary=8,S.storage=8):T.isVector3||T.isColor?(S.boundary=16,S.storage=12):T.isVector4?(S.boundary=16,S.storage=16):T.isMatrix3?(S.boundary=48,S.storage=48):T.isMatrix4?(S.boundary=64,S.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),S}function m(T){const S=T.target;S.removeEventListener("dispose",m);const P=o.indexOf(S.__bindingPointIndex);o.splice(P,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function f(){for(const T in s)i.deleteBuffer(s[T]);o=[],s={},r={}}return{bind:l,update:c,dispose:f}}class Bl{constructor(e={}){const{canvas:t=nh(),context:n=null,depth:s=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;const p=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const f=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ft,this._useLegacyLights=!1,this.toneMapping=xn,this.toneMappingExposure=1;const S=this;let P=!1,O=0,I=0,L=null,oe=-1,E=null;const w=new ut,j=new ut;let ie=null;const pe=new Ce(0);let N=0,X=t.width,K=t.height,te=1,J=null,Z=null;const ae=new ut(0,0,X,K),le=new ut(0,0,X,K);let xe=!1;const $=new Yr;let se=!1,ve=!1,Se=null;const Te=new rt,Oe=new Fe,k=new U,A={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function C(){return L===null?te:1}let y=n;function F(b,B){for(let q=0;q<b.length;q++){const Y=b[q],W=t.getContext(Y,B);if(W!==null)return W}return null}try{const b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Vr}`),t.addEventListener("webglcontextlost",de,!1),t.addEventListener("webglcontextrestored",R,!1),t.addEventListener("webglcontextcreationerror",ge,!1),y===null){const B=["webgl2","webgl","experimental-webgl"];if(S.isWebGL1Renderer===!0&&B.shift(),y=F(B,b),y===null)throw F(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&y instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),y.getShaderPrecisionFormat===void 0&&(y.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let D,G,H,ce,ne,x,v,z,Q,ee,V,ye,ue,he,be,Pe,re,Ye,Ae,Re,Ee,me,Ne,Xe;function qe(){D=new gf(y),G=new hf(y,D,e),D.init(G),me=new tm(y,D,G),H=new Qp(y,D,G),ce=new xf(y),ne=new zp,x=new em(y,D,H,ne,G,me,ce),v=new df(S),z=new mf(S),Q=new wh(y,G),Ne=new lf(y,D,Q,G),ee=new _f(y,Q,ce,Ne),V=new bf(y,ee,Q,ce),Ae=new Sf(y,G,x),Pe=new uf(ne),ye=new Bp(S,v,z,D,G,Ne,Pe),ue=new rm(S,ne),he=new Hp,be=new Yp(D,G),Ye=new af(S,v,z,H,V,d,l),re=new Jp(S,V,G),Xe=new om(y,ce,G,H),Re=new cf(y,D,ce,G),Ee=new vf(y,D,ce,G),ce.programs=ye.programs,S.capabilities=G,S.extensions=D,S.properties=ne,S.renderLists=he,S.shadowMap=re,S.state=H,S.info=ce}qe();const ke=new sm(S,y);this.xr=ke,this.getContext=function(){return y},this.getContextAttributes=function(){return y.getContextAttributes()},this.forceContextLoss=function(){const b=D.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=D.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(b){b!==void 0&&(te=b,this.setSize(X,K,!1))},this.getSize=function(b){return b.set(X,K)},this.setSize=function(b,B,q=!0){if(ke.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=b,K=B,t.width=Math.floor(b*te),t.height=Math.floor(B*te),q===!0&&(t.style.width=b+"px",t.style.height=B+"px"),this.setViewport(0,0,b,B)},this.getDrawingBufferSize=function(b){return b.set(X*te,K*te).floor()},this.setDrawingBufferSize=function(b,B,q){X=b,K=B,te=q,t.width=Math.floor(b*q),t.height=Math.floor(B*q),this.setViewport(0,0,b,B)},this.getCurrentViewport=function(b){return b.copy(w)},this.getViewport=function(b){return b.copy(ae)},this.setViewport=function(b,B,q,Y){b.isVector4?ae.set(b.x,b.y,b.z,b.w):ae.set(b,B,q,Y),H.viewport(w.copy(ae).multiplyScalar(te).floor())},this.getScissor=function(b){return b.copy(le)},this.setScissor=function(b,B,q,Y){b.isVector4?le.set(b.x,b.y,b.z,b.w):le.set(b,B,q,Y),H.scissor(j.copy(le).multiplyScalar(te).floor())},this.getScissorTest=function(){return xe},this.setScissorTest=function(b){H.setScissorTest(xe=b)},this.setOpaqueSort=function(b){J=b},this.setTransparentSort=function(b){Z=b},this.getClearColor=function(b){return b.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor.apply(Ye,arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha.apply(Ye,arguments)},this.clear=function(b=!0,B=!0,q=!0){let Y=0;if(b){let W=!1;if(L!==null){const Me=L.texture.format;W=Me===pl||Me===fl||Me===dl}if(W){const Me=L.texture.type,we=Me===yn||Me===mn||Me===Wr||Me===Un||Me===hl||Me===ul,Ie=Ye.getClearColor(),Ue=Ye.getClearAlpha(),Ge=Ie.r,Be=Ie.g,ze=Ie.b;we?(p[0]=Ge,p[1]=Be,p[2]=ze,p[3]=Ue,y.clearBufferuiv(y.COLOR,0,p)):(g[0]=Ge,g[1]=Be,g[2]=ze,g[3]=Ue,y.clearBufferiv(y.COLOR,0,g))}else Y|=y.COLOR_BUFFER_BIT}B&&(Y|=y.DEPTH_BUFFER_BIT),q&&(Y|=y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),y.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",de,!1),t.removeEventListener("webglcontextrestored",R,!1),t.removeEventListener("webglcontextcreationerror",ge,!1),he.dispose(),be.dispose(),ne.dispose(),v.dispose(),z.dispose(),V.dispose(),Ne.dispose(),Xe.dispose(),ye.dispose(),ke.dispose(),ke.removeEventListener("sessionstart",_t),ke.removeEventListener("sessionend",Je),Se&&(Se.dispose(),Se=null),vt.stop()};function de(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function R(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const b=ce.autoReset,B=re.enabled,q=re.autoUpdate,Y=re.needsUpdate,W=re.type;qe(),ce.autoReset=b,re.enabled=B,re.autoUpdate=q,re.needsUpdate=Y,re.type=W}function ge(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function _e(b){const B=b.target;B.removeEventListener("dispose",_e),De(B)}function De(b){Le(b),ne.remove(b)}function Le(b){const B=ne.get(b).programs;B!==void 0&&(B.forEach(function(q){ye.releaseProgram(q)}),b.isShaderMaterial&&ye.releaseShaderCache(b))}this.renderBufferDirect=function(b,B,q,Y,W,Me){B===null&&(B=A);const we=W.isMesh&&W.matrixWorld.determinant()<0,Ie=Kl(b,B,q,Y,W);H.setMaterial(Y,we);let Ue=q.index,Ge=1;if(Y.wireframe===!0){if(Ue=ee.getWireframeAttribute(q),Ue===void 0)return;Ge=2}const Be=q.drawRange,ze=q.attributes.position;let nt=Be.start*Ge,wt=(Be.start+Be.count)*Ge;Me!==null&&(nt=Math.max(nt,Me.start*Ge),wt=Math.min(wt,(Me.start+Me.count)*Ge)),Ue!==null?(nt=Math.max(nt,0),wt=Math.min(wt,Ue.count)):ze!=null&&(nt=Math.max(nt,0),wt=Math.min(wt,ze.count));const ct=wt-nt;if(ct<0||ct===1/0)return;Ne.setup(W,Y,Ie,q,Ue);let $t,et=Re;if(Ue!==null&&($t=Q.get(Ue),et=Ee,et.setIndex($t)),W.isMesh)Y.wireframe===!0?(H.setLineWidth(Y.wireframeLinewidth*C()),et.setMode(y.LINES)):et.setMode(y.TRIANGLES);else if(W.isLine){let Ve=Y.linewidth;Ve===void 0&&(Ve=1),H.setLineWidth(Ve*C()),W.isLineSegments?et.setMode(y.LINES):W.isLineLoop?et.setMode(y.LINE_LOOP):et.setMode(y.LINE_STRIP)}else W.isPoints?et.setMode(y.POINTS):W.isSprite&&et.setMode(y.TRIANGLES);if(W.isBatchedMesh)et.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else if(W.isInstancedMesh)et.renderInstances(nt,ct,W.count);else if(q.isInstancedBufferGeometry){const Ve=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Ls=Math.min(q.instanceCount,Ve);et.renderInstances(nt,ct,Ls)}else et.render(nt,ct)};function Ke(b,B,q){b.transparent===!0&&b.side===nn&&b.forceSinglePass===!1?(b.side=Tt,b.needsUpdate=!0,Oi(b,B,q),b.side=Mn,b.needsUpdate=!0,Oi(b,B,q),b.side=nn):Oi(b,B,q)}this.compile=function(b,B,q=null){q===null&&(q=b),m=be.get(q),m.init(),T.push(m),q.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(m.pushLight(W),W.castShadow&&m.pushShadow(W))}),b!==q&&b.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(m.pushLight(W),W.castShadow&&m.pushShadow(W))}),m.setupLights(S._useLegacyLights);const Y=new Set;return b.traverse(function(W){const Me=W.material;if(Me)if(Array.isArray(Me))for(let we=0;we<Me.length;we++){const Ie=Me[we];Ke(Ie,q,W),Y.add(Ie)}else Ke(Me,q,W),Y.add(Me)}),T.pop(),m=null,Y},this.compileAsync=function(b,B,q=null){const Y=this.compile(b,B,q);return new Promise(W=>{function Me(){if(Y.forEach(function(we){ne.get(we).currentProgram.isReady()&&Y.delete(we)}),Y.size===0){W(b);return}setTimeout(Me,10)}D.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let Ze=null;function lt(b){Ze&&Ze(b)}function _t(){vt.stop()}function Je(){vt.start()}const vt=new Ll;vt.setAnimationLoop(lt),typeof self<"u"&&vt.setContext(self),this.setAnimationLoop=function(b){Ze=b,ke.setAnimationLoop(b),b===null?vt.stop():vt.start()},ke.addEventListener("sessionstart",_t),ke.addEventListener("sessionend",Je),this.render=function(b,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),ke.enabled===!0&&ke.isPresenting===!0&&(ke.cameraAutoUpdate===!0&&ke.updateCamera(B),B=ke.getCamera()),b.isScene===!0&&b.onBeforeRender(S,b,B,L),m=be.get(b,T.length),m.init(),T.push(m),Te.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),$.setFromProjectionMatrix(Te),ve=this.localClippingEnabled,se=Pe.init(this.clippingPlanes,ve),_=he.get(b,f.length),_.init(),f.push(_),Yt(b,B,0,S.sortObjects),_.finish(),S.sortObjects===!0&&_.sort(J,Z),this.info.render.frame++,se===!0&&Pe.beginShadows();const q=m.state.shadowsArray;if(re.render(q,b,B),se===!0&&Pe.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ye.render(_,b),m.setupLights(S._useLegacyLights),B.isArrayCamera){const Y=B.cameras;for(let W=0,Me=Y.length;W<Me;W++){const we=Y[W];no(_,b,we,we.viewport)}}else no(_,b,B);L!==null&&(x.updateMultisampleRenderTarget(L),x.updateRenderTargetMipmap(L)),b.isScene===!0&&b.onAfterRender(S,b,B),Ne.resetDefaultState(),oe=-1,E=null,T.pop(),T.length>0?m=T[T.length-1]:m=null,f.pop(),f.length>0?_=f[f.length-1]:_=null};function Yt(b,B,q,Y){if(b.visible===!1)return;if(b.layers.test(B.layers)){if(b.isGroup)q=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(B);else if(b.isLight)m.pushLight(b),b.castShadow&&m.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||$.intersectsSprite(b)){Y&&k.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Te);const we=V.update(b),Ie=b.material;Ie.visible&&_.push(b,we,Ie,q,k.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||$.intersectsObject(b))){const we=V.update(b),Ie=b.material;if(Y&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),k.copy(b.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),k.copy(we.boundingSphere.center)),k.applyMatrix4(b.matrixWorld).applyMatrix4(Te)),Array.isArray(Ie)){const Ue=we.groups;for(let Ge=0,Be=Ue.length;Ge<Be;Ge++){const ze=Ue[Ge],nt=Ie[ze.materialIndex];nt&&nt.visible&&_.push(b,we,nt,q,k.z,ze)}}else Ie.visible&&_.push(b,we,Ie,q,k.z,null)}}const Me=b.children;for(let we=0,Ie=Me.length;we<Ie;we++)Yt(Me[we],B,q,Y)}function no(b,B,q,Y){const W=b.opaque,Me=b.transmissive,we=b.transparent;m.setupLightsView(q),se===!0&&Pe.setGlobalState(S.clippingPlanes,q),Me.length>0&&$l(W,Me,B,q),Y&&H.viewport(w.copy(Y)),W.length>0&&Fi(W,B,q),Me.length>0&&Fi(Me,B,q),we.length>0&&Fi(we,B,q),H.buffers.depth.setTest(!0),H.buffers.depth.setMask(!0),H.buffers.color.setMask(!0),H.setPolygonOffset(!1)}function $l(b,B,q,Y){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;const Me=G.isWebGL2;Se===null&&(Se=new Xt(1,1,{generateMipmaps:!0,type:D.has("EXT_color_buffer_half_float")?on:yn,minFilter:Pi,samples:Me?4:0})),S.getDrawingBufferSize(Oe),Me?Se.setSize(Oe.x,Oe.y):Se.setSize(Ir(Oe.x),Ir(Oe.y));const we=S.getRenderTarget();S.setRenderTarget(Se),S.getClearColor(pe),N=S.getClearAlpha(),N<1&&S.setClearColor(16777215,.5),S.clear();const Ie=S.toneMapping;S.toneMapping=xn,Fi(b,q,Y),x.updateMultisampleRenderTarget(Se),x.updateRenderTargetMipmap(Se);let Ue=!1;for(let Ge=0,Be=B.length;Ge<Be;Ge++){const ze=B[Ge],nt=ze.object,wt=ze.geometry,ct=ze.material,$t=ze.group;if(ct.side===nn&&nt.layers.test(Y.layers)){const et=ct.side;ct.side=Tt,ct.needsUpdate=!0,io(nt,q,Y,wt,ct,$t),ct.side=et,ct.needsUpdate=!0,Ue=!0}}Ue===!0&&(x.updateMultisampleRenderTarget(Se),x.updateRenderTargetMipmap(Se)),S.setRenderTarget(we),S.setClearColor(pe,N),S.toneMapping=Ie}function Fi(b,B,q){const Y=B.isScene===!0?B.overrideMaterial:null;for(let W=0,Me=b.length;W<Me;W++){const we=b[W],Ie=we.object,Ue=we.geometry,Ge=Y===null?we.material:Y,Be=we.group;Ie.layers.test(q.layers)&&io(Ie,B,q,Ue,Ge,Be)}}function io(b,B,q,Y,W,Me){b.onBeforeRender(S,B,q,Y,W,Me),b.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),W.onBeforeRender(S,B,q,Y,b,Me),W.transparent===!0&&W.side===nn&&W.forceSinglePass===!1?(W.side=Tt,W.needsUpdate=!0,S.renderBufferDirect(q,B,Y,W,b,Me),W.side=Mn,W.needsUpdate=!0,S.renderBufferDirect(q,B,Y,W,b,Me),W.side=nn):S.renderBufferDirect(q,B,Y,W,b,Me),b.onAfterRender(S,B,q,Y,W,Me)}function Oi(b,B,q){B.isScene!==!0&&(B=A);const Y=ne.get(b),W=m.state.lights,Me=m.state.shadowsArray,we=W.state.version,Ie=ye.getParameters(b,W.state,Me,B,q),Ue=ye.getProgramCacheKey(Ie);let Ge=Y.programs;Y.environment=b.isMeshStandardMaterial?B.environment:null,Y.fog=B.fog,Y.envMap=(b.isMeshStandardMaterial?z:v).get(b.envMap||Y.environment),Ge===void 0&&(b.addEventListener("dispose",_e),Ge=new Map,Y.programs=Ge);let Be=Ge.get(Ue);if(Be!==void 0){if(Y.currentProgram===Be&&Y.lightsStateVersion===we)return ro(b,Ie),Be}else Ie.uniforms=ye.getUniforms(b),b.onBuild(q,Ie,S),b.onBeforeCompile(Ie,S),Be=ye.acquireProgram(Ie,Ue),Ge.set(Ue,Be),Y.uniforms=Ie.uniforms;const ze=Y.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(ze.clippingPlanes=Pe.uniform),ro(b,Ie),Y.needsLights=Jl(b),Y.lightsStateVersion=we,Y.needsLights&&(ze.ambientLightColor.value=W.state.ambient,ze.lightProbe.value=W.state.probe,ze.directionalLights.value=W.state.directional,ze.directionalLightShadows.value=W.state.directionalShadow,ze.spotLights.value=W.state.spot,ze.spotLightShadows.value=W.state.spotShadow,ze.rectAreaLights.value=W.state.rectArea,ze.ltc_1.value=W.state.rectAreaLTC1,ze.ltc_2.value=W.state.rectAreaLTC2,ze.pointLights.value=W.state.point,ze.pointLightShadows.value=W.state.pointShadow,ze.hemisphereLights.value=W.state.hemi,ze.directionalShadowMap.value=W.state.directionalShadowMap,ze.directionalShadowMatrix.value=W.state.directionalShadowMatrix,ze.spotShadowMap.value=W.state.spotShadowMap,ze.spotLightMatrix.value=W.state.spotLightMatrix,ze.spotLightMap.value=W.state.spotLightMap,ze.pointShadowMap.value=W.state.pointShadowMap,ze.pointShadowMatrix.value=W.state.pointShadowMatrix),Y.currentProgram=Be,Y.uniformsList=null,Be}function so(b){if(b.uniformsList===null){const B=b.currentProgram.getUniforms();b.uniformsList=ps.seqWithValue(B.seq,b.uniforms)}return b.uniformsList}function ro(b,B){const q=ne.get(b);q.outputColorSpace=B.outputColorSpace,q.batching=B.batching,q.instancing=B.instancing,q.instancingColor=B.instancingColor,q.skinning=B.skinning,q.morphTargets=B.morphTargets,q.morphNormals=B.morphNormals,q.morphColors=B.morphColors,q.morphTargetsCount=B.morphTargetsCount,q.numClippingPlanes=B.numClippingPlanes,q.numIntersection=B.numClipIntersection,q.vertexAlphas=B.vertexAlphas,q.vertexTangents=B.vertexTangents,q.toneMapping=B.toneMapping}function Kl(b,B,q,Y,W){B.isScene!==!0&&(B=A),x.resetTextureUnits();const Me=B.fog,we=Y.isMeshStandardMaterial?B.environment:null,Ie=L===null?S.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:an,Ue=(Y.isMeshStandardMaterial?z:v).get(Y.envMap||we),Ge=Y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Be=!!q.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),ze=!!q.morphAttributes.position,nt=!!q.morphAttributes.normal,wt=!!q.morphAttributes.color;let ct=xn;Y.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(ct=S.toneMapping);const $t=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,et=$t!==void 0?$t.length:0,Ve=ne.get(Y),Ls=m.state.lights;if(se===!0&&(ve===!0||b!==E)){const It=b===E&&Y.id===oe;Pe.setState(Y,b,It)}let tt=!1;Y.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==Ls.state.version||Ve.outputColorSpace!==Ie||W.isBatchedMesh&&Ve.batching===!1||!W.isBatchedMesh&&Ve.batching===!0||W.isInstancedMesh&&Ve.instancing===!1||!W.isInstancedMesh&&Ve.instancing===!0||W.isSkinnedMesh&&Ve.skinning===!1||!W.isSkinnedMesh&&Ve.skinning===!0||W.isInstancedMesh&&Ve.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ve.instancingColor===!1&&W.instanceColor!==null||Ve.envMap!==Ue||Y.fog===!0&&Ve.fog!==Me||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==Pe.numPlanes||Ve.numIntersection!==Pe.numIntersection)||Ve.vertexAlphas!==Ge||Ve.vertexTangents!==Be||Ve.morphTargets!==ze||Ve.morphNormals!==nt||Ve.morphColors!==wt||Ve.toneMapping!==ct||G.isWebGL2===!0&&Ve.morphTargetsCount!==et)&&(tt=!0):(tt=!0,Ve.__version=Y.version);let bn=Ve.currentProgram;tt===!0&&(bn=Oi(Y,B,W));let oo=!1,Mi=!1,Is=!1;const pt=bn.getUniforms(),En=Ve.uniforms;if(H.useProgram(bn.program)&&(oo=!0,Mi=!0,Is=!0),Y.id!==oe&&(oe=Y.id,Mi=!0),oo||E!==b){pt.setValue(y,"projectionMatrix",b.projectionMatrix),pt.setValue(y,"viewMatrix",b.matrixWorldInverse);const It=pt.map.cameraPosition;It!==void 0&&It.setValue(y,k.setFromMatrixPosition(b.matrixWorld)),G.logarithmicDepthBuffer&&pt.setValue(y,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&pt.setValue(y,"isOrthographic",b.isOrthographicCamera===!0),E!==b&&(E=b,Mi=!0,Is=!0)}if(W.isSkinnedMesh){pt.setOptional(y,W,"bindMatrix"),pt.setOptional(y,W,"bindMatrixInverse");const It=W.skeleton;It&&(G.floatVertexTextures?(It.boneTexture===null&&It.computeBoneTexture(),pt.setValue(y,"boneTexture",It.boneTexture,x)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}W.isBatchedMesh&&(pt.setOptional(y,W,"batchingTexture"),pt.setValue(y,"batchingTexture",W._matricesTexture,x));const Ds=q.morphAttributes;if((Ds.position!==void 0||Ds.normal!==void 0||Ds.color!==void 0&&G.isWebGL2===!0)&&Ae.update(W,q,bn),(Mi||Ve.receiveShadow!==W.receiveShadow)&&(Ve.receiveShadow=W.receiveShadow,pt.setValue(y,"receiveShadow",W.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(En.envMap.value=Ue,En.flipEnvMap.value=Ue.isCubeTexture&&Ue.isRenderTargetTexture===!1?-1:1),Mi&&(pt.setValue(y,"toneMappingExposure",S.toneMappingExposure),Ve.needsLights&&Zl(En,Is),Me&&Y.fog===!0&&ue.refreshFogUniforms(En,Me),ue.refreshMaterialUniforms(En,Y,te,K,Se),ps.upload(y,so(Ve),En,x)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(ps.upload(y,so(Ve),En,x),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&pt.setValue(y,"center",W.center),pt.setValue(y,"modelViewMatrix",W.modelViewMatrix),pt.setValue(y,"normalMatrix",W.normalMatrix),pt.setValue(y,"modelMatrix",W.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const It=Y.uniformsGroups;for(let Us=0,Ql=It.length;Us<Ql;Us++)if(G.isWebGL2){const ao=It[Us];Xe.update(ao,bn),Xe.bind(ao,bn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return bn}function Zl(b,B){b.ambientLightColor.needsUpdate=B,b.lightProbe.needsUpdate=B,b.directionalLights.needsUpdate=B,b.directionalLightShadows.needsUpdate=B,b.pointLights.needsUpdate=B,b.pointLightShadows.needsUpdate=B,b.spotLights.needsUpdate=B,b.spotLightShadows.needsUpdate=B,b.rectAreaLights.needsUpdate=B,b.hemisphereLights.needsUpdate=B}function Jl(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return O},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(b,B,q){ne.get(b.texture).__webglTexture=B,ne.get(b.depthTexture).__webglTexture=q;const Y=ne.get(b);Y.__hasExternalTextures=!0,Y.__hasExternalTextures&&(Y.__autoAllocateDepthBuffer=q===void 0,Y.__autoAllocateDepthBuffer||D.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,B){const q=ne.get(b);q.__webglFramebuffer=B,q.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(b,B=0,q=0){L=b,O=B,I=q;let Y=!0,W=null,Me=!1,we=!1;if(b){const Ue=ne.get(b);Ue.__useDefaultFramebuffer!==void 0?(H.bindFramebuffer(y.FRAMEBUFFER,null),Y=!1):Ue.__webglFramebuffer===void 0?x.setupRenderTarget(b):Ue.__hasExternalTextures&&x.rebindTextures(b,ne.get(b.texture).__webglTexture,ne.get(b.depthTexture).__webglTexture);const Ge=b.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(we=!0);const Be=ne.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Be[B])?W=Be[B][q]:W=Be[B],Me=!0):G.isWebGL2&&b.samples>0&&x.useMultisampledRTT(b)===!1?W=ne.get(b).__webglMultisampledFramebuffer:Array.isArray(Be)?W=Be[q]:W=Be,w.copy(b.viewport),j.copy(b.scissor),ie=b.scissorTest}else w.copy(ae).multiplyScalar(te).floor(),j.copy(le).multiplyScalar(te).floor(),ie=xe;if(H.bindFramebuffer(y.FRAMEBUFFER,W)&&G.drawBuffers&&Y&&H.drawBuffers(b,W),H.viewport(w),H.scissor(j),H.setScissorTest(ie),Me){const Ue=ne.get(b.texture);y.framebufferTexture2D(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_CUBE_MAP_POSITIVE_X+B,Ue.__webglTexture,q)}else if(we){const Ue=ne.get(b.texture),Ge=B||0;y.framebufferTextureLayer(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,Ue.__webglTexture,q||0,Ge)}oe=-1},this.readRenderTargetPixels=function(b,B,q,Y,W,Me,we){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ie=ne.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&we!==void 0&&(Ie=Ie[we]),Ie){H.bindFramebuffer(y.FRAMEBUFFER,Ie);try{const Ue=b.texture,Ge=Ue.format,Be=Ue.type;if(Ge!==qt&&me.convert(Ge)!==y.getParameter(y.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const ze=Be===on&&(D.has("EXT_color_buffer_half_float")||G.isWebGL2&&D.has("EXT_color_buffer_float"));if(Be!==yn&&me.convert(Be)!==y.getParameter(y.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Be===gn&&(G.isWebGL2||D.has("OES_texture_float")||D.has("WEBGL_color_buffer_float")))&&!ze){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=b.width-Y&&q>=0&&q<=b.height-W&&y.readPixels(B,q,Y,W,me.convert(Ge),me.convert(Be),Me)}finally{const Ue=L!==null?ne.get(L).__webglFramebuffer:null;H.bindFramebuffer(y.FRAMEBUFFER,Ue)}}},this.copyFramebufferToTexture=function(b,B,q=0){const Y=Math.pow(2,-q),W=Math.floor(B.image.width*Y),Me=Math.floor(B.image.height*Y);x.setTexture2D(B,0),y.copyTexSubImage2D(y.TEXTURE_2D,q,0,0,b.x,b.y,W,Me),H.unbindTexture()},this.copyTextureToTexture=function(b,B,q,Y=0){const W=B.image.width,Me=B.image.height,we=me.convert(q.format),Ie=me.convert(q.type);x.setTexture2D(q,0),y.pixelStorei(y.UNPACK_FLIP_Y_WEBGL,q.flipY),y.pixelStorei(y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),y.pixelStorei(y.UNPACK_ALIGNMENT,q.unpackAlignment),B.isDataTexture?y.texSubImage2D(y.TEXTURE_2D,Y,b.x,b.y,W,Me,we,Ie,B.image.data):B.isCompressedTexture?y.compressedTexSubImage2D(y.TEXTURE_2D,Y,b.x,b.y,B.mipmaps[0].width,B.mipmaps[0].height,we,B.mipmaps[0].data):y.texSubImage2D(y.TEXTURE_2D,Y,b.x,b.y,we,Ie,B.image),Y===0&&q.generateMipmaps&&y.generateMipmap(y.TEXTURE_2D),H.unbindTexture()},this.copyTextureToTexture3D=function(b,B,q,Y,W=0){if(S.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Me=b.max.x-b.min.x+1,we=b.max.y-b.min.y+1,Ie=b.max.z-b.min.z+1,Ue=me.convert(Y.format),Ge=me.convert(Y.type);let Be;if(Y.isData3DTexture)x.setTexture3D(Y,0),Be=y.TEXTURE_3D;else if(Y.isDataArrayTexture||Y.isCompressedArrayTexture)x.setTexture2DArray(Y,0),Be=y.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}y.pixelStorei(y.UNPACK_FLIP_Y_WEBGL,Y.flipY),y.pixelStorei(y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),y.pixelStorei(y.UNPACK_ALIGNMENT,Y.unpackAlignment);const ze=y.getParameter(y.UNPACK_ROW_LENGTH),nt=y.getParameter(y.UNPACK_IMAGE_HEIGHT),wt=y.getParameter(y.UNPACK_SKIP_PIXELS),ct=y.getParameter(y.UNPACK_SKIP_ROWS),$t=y.getParameter(y.UNPACK_SKIP_IMAGES),et=q.isCompressedTexture?q.mipmaps[W]:q.image;y.pixelStorei(y.UNPACK_ROW_LENGTH,et.width),y.pixelStorei(y.UNPACK_IMAGE_HEIGHT,et.height),y.pixelStorei(y.UNPACK_SKIP_PIXELS,b.min.x),y.pixelStorei(y.UNPACK_SKIP_ROWS,b.min.y),y.pixelStorei(y.UNPACK_SKIP_IMAGES,b.min.z),q.isDataTexture||q.isData3DTexture?y.texSubImage3D(Be,W,B.x,B.y,B.z,Me,we,Ie,Ue,Ge,et.data):q.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),y.compressedTexSubImage3D(Be,W,B.x,B.y,B.z,Me,we,Ie,Ue,et.data)):y.texSubImage3D(Be,W,B.x,B.y,B.z,Me,we,Ie,Ue,Ge,et),y.pixelStorei(y.UNPACK_ROW_LENGTH,ze),y.pixelStorei(y.UNPACK_IMAGE_HEIGHT,nt),y.pixelStorei(y.UNPACK_SKIP_PIXELS,wt),y.pixelStorei(y.UNPACK_SKIP_ROWS,ct),y.pixelStorei(y.UNPACK_SKIP_IMAGES,$t),W===0&&Y.generateMipmaps&&y.generateMipmap(Be),H.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?x.setTextureCube(b,0):b.isData3DTexture?x.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?x.setTexture2DArray(b,0):x.setTexture2D(b,0),H.unbindTexture()},this.resetState=function(){O=0,I=0,L=null,H.reset(),Ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===qr?"display-p3":"srgb",t.unpackColorSpace=$e.workingColorSpace===As?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ft?Fn:gl}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Fn?ft:an}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class am extends Bl{}am.prototype.isWebGL1Renderer=!0;class Zr{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ce(e),this.density=t}clone(){return new Zr(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class lm extends dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class zl extends vi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ce(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ca=new rt,Ur=new bl,os=new Cs,as=new U;class cm extends dt{constructor(e=new zt,t=new zl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),os.copy(n.boundingSphere),os.applyMatrix4(s),os.radius+=r,e.ray.intersectsSphere(os)===!1)return;Ca.copy(s).invert(),Ur.copy(e.ray).applyMatrix4(Ca);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=d,_=p;g<_;g++){const m=c.getX(g);as.fromBufferAttribute(u,m),Ra(as,m,l,s,e,t,this)}}else{const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=d,_=p;g<_;g++)as.fromBufferAttribute(u,g),Ra(as,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Ra(i,e,t,n,s,r,o){const a=Ur.distanceSqToPoint(i);if(a<t){const l=new U;Ur.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class Jr extends zt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new U,d=new U,p=[],g=[],_=[],m=[];for(let f=0;f<=n;f++){const T=[],S=f/n;let P=0;f===0&&o===0?P=.5/t:f===n&&l===Math.PI&&(P=-.5/t);for(let O=0;O<=t;O++){const I=O/t;u.x=-e*Math.cos(s+I*r)*Math.sin(o+S*a),u.y=e*Math.cos(o+S*a),u.z=e*Math.sin(s+I*r)*Math.sin(o+S*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(I+P,1-S),T.push(c++)}h.push(T)}for(let f=0;f<n;f++)for(let T=0;T<t;T++){const S=h[f][T+1],P=h[f][T],O=h[f+1][T],I=h[f+1][T+1];(f!==0||o>0)&&p.push(S,P,I),(f!==n-1||l<Math.PI)&&p.push(P,O,I)}this.setIndex(p),this.setAttribute("position",new Bt(g,3)),this.setAttribute("normal",new Bt(_,3)),this.setAttribute("uv",new Bt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Sn extends vi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ce(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=_l,this.normalScale=new Fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class kl extends dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ce(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class hm extends kl{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ce(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const dr=new rt,Pa=new U,La=new U;class um{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Fe(512,512),this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Yr,this._frameExtents=new Fe(1,1),this._viewportCount=1,this._viewports=[new ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Pa.setFromMatrixPosition(e.matrixWorld),t.position.copy(Pa),La.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(La),t.updateMatrixWorld(),dr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(dr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(dr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class dm extends um{constructor(){super(new $r(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class fm extends kl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.shadow=new dm}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Hl{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ia(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Ia();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Ia(){return(typeof performance>"u"?Date:performance).now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Vr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Vr);const Gl={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Ni{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const pm=new $r(-1,1,1,-1,0,1);class mm extends zt{constructor(){super(),this.setAttribute("position",new Bt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Bt([0,2,0,0,2,0],2))}}const gm=new mm;class Vl{constructor(e){this._mesh=new st(gm,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,pm)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class _m extends Ni{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Et?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ss.clone(e.uniforms),this.material=new Et({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Vl(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Da extends Ni{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class vm extends Ni{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class xm{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new Fe);this._width=n.width,this._height=n.height,t=new Xt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:on}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new _m(Gl),this.copyPass.material.blending=rn,this.clock=new Hl}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Da!==void 0&&(o instanceof Da?n=!0:o instanceof vm&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Fe);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class ym extends Ni{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ce}render(e,t,n){const s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}}const Mm={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ce(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class gi extends Ni{constructor(e,t,n,s){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new Fe(e.x,e.y):new Fe(256,256),this.clearColor=new Ce(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Xt(r,o,{type:on}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new Xt(r,o,{type:on});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const p=new Xt(r,o,{type:on});p.texture.name="UnrealBloomPass.v"+u,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),r=Math.round(r/2),o=Math.round(o/2)}const a=Mm;this.highPassUniforms=Ss.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Et({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new Fe(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new U(1,1,1),new U(1,1,1),new U(1,1,1),new U(1,1,1),new U(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Gl;this.copyUniforms=Ss.clone(h.uniforms),this.blendMaterial=new Et({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:br,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Ce,this.oldClearAlpha=1,this.basic=new Xr,this.fsQuad=new Vl(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Fe(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=gi.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=gi.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Et({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Fe(.5,.5)},direction:{value:new Fe(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new Et({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}gi.BlurDirectionX=new Fe(1,0);gi.BlurDirectionY=new Fe(0,1);const On=0,bs=[{id:0,name:"air",color:"#000000",emissive:0,opacity:0,solid:!1},{id:1,name:"stone",color:"#5b5560",emissive:0,opacity:1,solid:!0},{id:2,name:"obsidian",color:"#15101f",emissive:0,opacity:1,solid:!0},{id:3,name:"basalt",color:"#2e2630",emissive:0,opacity:1,solid:!0},{id:4,name:"magma",color:"#ff5410",emissive:.9,opacity:1,solid:!0},{id:5,name:"quartz",color:"#d8c8e0",emissive:.08,opacity:1,solid:!0},{id:6,name:"glow_lichen",color:"#5dd66a",emissive:.7,opacity:1,solid:!0,reactive:!0},{id:7,name:"wet_stone",color:"#3a3640",emissive:0,opacity:1,solid:!0},{id:8,name:"ember_rock",color:"#7a2b1a",emissive:.25,opacity:1,solid:!0},{id:9,name:"living_wood",color:"#6b4a2f",emissive:0,opacity:1,solid:!0},{id:10,name:"leaf",color:"#3f9a52",emissive:.05,opacity:1,solid:!0},{id:11,name:"water",color:"#3a7bd5",emissive:.05,opacity:.55,solid:!1},{id:12,name:"moss",color:"#4f7a3a",emissive:.03,opacity:1,solid:!0},{id:13,name:"petal",color:"#e89ac4",emissive:.2,opacity:1,solid:!0},{id:14,name:"gold_stone",color:"#e8b94a",emissive:.4,opacity:1,solid:!0},{id:15,name:"cloud_marble",color:"#e6e8f0",emissive:.15,opacity:1,solid:!0},{id:16,name:"crystal",color:"#b48ee8",emissive:.45,opacity:1,solid:!0,reactive:!0},{id:17,name:"light_construct",color:"#f4f0ff",emissive:.95,opacity:1,solid:!0},{id:18,name:"void",color:"#080510",emissive:0,opacity:1,solid:!0},{id:19,name:"nebula_gas",color:"#7b4ad5",emissive:.3,opacity:.4,solid:!1},{id:20,name:"fractal_stone",color:"#5a4a8a",emissive:.12,opacity:1,solid:!0},{id:21,name:"meditation_floor",color:"#cfc2e8",emissive:.3,opacity:1,solid:!0,reactive:!0},{id:22,name:"path_glow",color:"#9ad6c8",emissive:.55,opacity:1,solid:!0,reactive:!0}],Wl=new Map,ql=new Map;for(const i of bs)Wl.set(i.id,i),ql.set(i.name,i);function Sm(i){return Wl.get(i)??bs[0]}function Rt(i){const e=ql.get(i);if(!e)throw new Error(`Unknown block name: ${i}`);return e.id}function bm(i){return Sm(i).solid}function Em(i){const e=i.replace("#",""),t=parseInt(e,16);return[(t>>16&255)/255,(t>>8&255)/255,(t&255)/255]}function Tm(){const i=bs.reduce((n,s)=>Math.max(n,s.id),0),e=i+1,t={maxId:i,r:new Float32Array(e),g:new Float32Array(e),b:new Float32Array(e),emissive:new Float32Array(e),opacity:new Float32Array(e),opaque:new Uint8Array(e),translucent:new Uint8Array(e)};for(const n of bs){const[s,r,o]=Em(n.color);t.r[n.id]=s,t.g[n.id]=r,t.b[n.id]=o,t.emissive[n.id]=n.emissive,t.opacity[n.id]=n.opacity,t.opaque[n.id]=n.id!==On&&n.opacity>=1?1:0,t.translucent[n.id]=n.id!==On&&n.opacity<1?1:0}return t}const vn=16,Bn=64,Li=16,wm=vn*Bn*Li;function Ua(i,e){return`${i},${e}`}class li{constructor(e,t,n){M(this,"cx");M(this,"cz");M(this,"blocks");M(this,"dirty",!0);M(this,"hasContent",!1);if(this.cx=e,this.cz=t,this.blocks=n??new Uint8Array(wm),n){for(let s=0;s<n.length;s++)if(n[s]!==On){this.hasContent=!0;break}}}static index(e,t,n){return e+n*vn+t*(vn*Li)}static inBounds(e,t,n){return e>=0&&e<vn&&t>=0&&t<Bn&&n>=0&&n<Li}get(e,t,n){return li.inBounds(e,t,n)?this.blocks[li.index(e,t,n)]:On}set(e,t,n,s){li.inBounds(e,t,n)&&(this.blocks[li.index(e,t,n)]=s,s!==On&&(this.hasContent=!0),this.dirty=!0)}}const Am=`
  attribute float emissive;
  varying vec3 vColor;
  varying vec3 vNormal;
  varying float vEmissive;
  varying float vViewDist;

  void main() {
    vColor = color;
    vEmissive = emissive;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewDist = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`,Na=`
  precision highp float;
  uniform float uCoherence;
  uniform vec3 uLightDir;
  uniform vec3 uSkyColor;
  uniform vec3 uGroundColor;
  uniform vec3 uSunColor;
  uniform vec3 uFogColor;
  uniform float uFogDensity;
  uniform float uEmissiveBoost;

  varying vec3 vColor;
  varying vec3 vNormal;
  varying float vEmissive;
  varying float vViewDist;

  void main() {
    vec3 N = normalize(vNormal);

    // Hemisphere ambient: sky from above, ground bounce from below.
    float hemi = 0.5 + 0.5 * N.y;
    vec3 ambient = mix(uGroundColor, uSkyColor, hemi);

    // Directional "sun".
    float ndl = max(dot(N, normalize(uLightDir)), 0.0);
    vec3 lighting = ambient + uSunColor * ndl;

    // Coherence desaturates the world when low, makes it vivid when high.
    float lum = dot(vColor, vec3(0.299, 0.587, 0.114));
    float sat = 0.45 + 0.55 * clamp(uCoherence, 0.0, 1.0);
    vec3 base = mix(vec3(lum), vColor, sat);

    vec3 lit = base * lighting;

    // Emissive glow scales with coherence and the level's emissive boost.
    float glowScale = (0.55 + 0.9 * clamp(uCoherence, 0.0, 1.0)) * uEmissiveBoost;
    vec3 glow = base * vEmissive * glowScale;

    vec3 color = lit + glow;

    // exp2 fog.
    float f = exp(-pow(vViewDist * uFogDensity, 2.0));
    f = clamp(f, 0.0, 1.0);
    color = mix(uFogColor, color, f);

    gl_FragColor = vec4(color, 1.0);
  }
`;function Fa(i=!1){const e={uCoherence:{value:0},uLightDir:{value:new U(.4,1,.25).normalize()},uSkyColor:{value:new Ce("#2a2236")},uGroundColor:{value:new Ce("#100a18")},uSunColor:{value:new Ce("#b89cdd")},uFogColor:{value:new Ce("#0a0612")},uFogDensity:{value:.02},uEmissiveBoost:{value:1}},t=new Et({uniforms:e,vertexShader:Am,fragmentShader:Na,vertexColors:!0,transparent:i,depthWrite:!i});return i&&(t.fragmentShader=Na.replace("gl_FragColor = vec4(color, 1.0);","gl_FragColor = vec4(color, 0.55);"),t.needsUpdate=!0),t}function Cm(i){return new Worker(""+new URL("mesher.worker-5obAQS1v.js",import.meta.url).href,{type:"module",name:i?.name})}class ci{constructor(){M(this,"group",new _n);M(this,"chunks",new Map);M(this,"meshes",new Map);M(this,"worker");M(this,"palette",Tm());M(this,"opaqueMaterial",Fa(!1));M(this,"transparentMaterial",Fa(!0));M(this,"pendingKeys",new Set);this.group.name="VoxelWorld",this.worker=new Cm,this.worker.onmessage=e=>this.onMeshed(e.data)}getChunk(e,t){return this.chunks.get(Ua(e,t))}ensureChunk(e,t){const n=Ua(e,t);let s=this.chunks.get(n);return s||(s=new li(e,t),this.chunks.set(n,s)),s}static toChunkCoord(e){const t=Math.floor(e/vn),n=e-t*vn;return{c:t,l:n}}getBlock(e,t,n){if(t<0||t>=Bn)return On;const{c:s,l:r}=ci.toChunkCoord(e),{c:o,l:a}=ci.toChunkCoord(n),l=this.getChunk(s,o);return l?l.get(r,t,a):On}setBlock(e,t,n,s){if(t<0||t>=Bn)return;const{c:r,l:o}=ci.toChunkCoord(e),{c:a,l}=ci.toChunkCoord(n);this.ensureChunk(r,a).set(o,t,l,s)}isSolidAt(e,t,n){return bm(this.getBlock(e,t,n))}remeshDirty(){for(const[e,t]of this.chunks){if(!t.dirty||this.pendingKeys.has(e))continue;if(!t.hasContent){t.dirty=!1;continue}t.dirty=!1,this.pendingKeys.add(e);const n=t.blocks.slice();this.worker.postMessage({key:e,cx:t.cx,cz:t.cz,dims:[vn,Bn,Li],voxels:n,palette:this.palette},[n.buffer])}}onMeshed(e){this.pendingKeys.delete(e.key);const{cx:t,cz:n,result:s}=e;let r=this.meshes.get(e.key);r||(r={},this.meshes.set(e.key,r)),this.applyMesh(r,"opaque",s.opaque,t,n,this.opaqueMaterial),this.applyMesh(r,"transparent",s.transparent,t,n,this.transparentMaterial)}applyMesh(e,t,n,s,r,o){const a=e[t];if(n.vertexCount===0){a&&(this.group.remove(a),a.geometry.dispose(),e[t]=void 0);return}const l=new zt;if(l.setAttribute("position",new Mt(n.position,3)),l.setAttribute("normal",new Mt(n.normal,3)),l.setAttribute("color",new Mt(n.color,3)),l.setAttribute("emissive",new Mt(n.emissive,1)),l.computeBoundingSphere(),a)a.geometry.dispose(),a.geometry=l;else{const c=new st(l,o);c.position.set(s*vn,0,r*Li),c.frustumCulled=!0,c.renderOrder=t==="transparent"?1:0,this.group.add(c),e[t]=c}}setCoherence(e){this.opaqueMaterial.uniforms.uCoherence.value=e,this.transparentMaterial.uniforms.uCoherence.value=e}applyAtmosphere(e){for(const t of[this.opaqueMaterial,this.transparentMaterial])t.uniforms.uFogColor.value.set(e.fogColor),t.uniforms.uFogDensity.value=e.fogDensity,t.uniforms.uSkyColor.value.set(e.skyColor),t.uniforms.uGroundColor.value.set(e.groundColor),t.uniforms.uSunColor.value.set(e.sunColor),t.uniforms.uEmissiveBoost.value=e.emissiveBoost??1}clear(){for(const e of this.meshes.values())e.opaque&&(this.group.remove(e.opaque),e.opaque.geometry.dispose()),e.transparent&&(this.group.remove(e.transparent),e.transparent.geometry.dispose());this.meshes.clear(),this.chunks.clear(),this.pendingKeys.clear()}dispose(){this.clear(),this.worker.terminate(),this.opaqueMaterial.dispose(),this.transparentMaterial.dispose()}}const ii=new _i(0,0,0,"YXZ"),si=new U,Rm={type:"change"},Pm={type:"lock"},Lm={type:"unlock"},Oa=Math.PI/2;class Im extends kn{constructor(e,t){super(),this.camera=e,this.domElement=t,this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,this._onMouseMove=Dm.bind(this),this._onPointerlockChange=Um.bind(this),this._onPointerlockError=Nm.bind(this),this.connect()}connect(){this.domElement.ownerDocument.addEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this._onPointerlockError)}disconnect(){this.domElement.ownerDocument.removeEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this._onPointerlockError)}dispose(){this.disconnect()}getObject(){return this.camera}getDirection(e){return e.set(0,0,-1).applyQuaternion(this.camera.quaternion)}moveForward(e){const t=this.camera;si.setFromMatrixColumn(t.matrix,0),si.crossVectors(t.up,si),t.position.addScaledVector(si,e)}moveRight(e){const t=this.camera;si.setFromMatrixColumn(t.matrix,0),t.position.addScaledVector(si,e)}lock(){this.domElement.requestPointerLock()}unlock(){this.domElement.ownerDocument.exitPointerLock()}}function Dm(i){if(this.isLocked===!1)return;const e=i.movementX||i.mozMovementX||i.webkitMovementX||0,t=i.movementY||i.mozMovementY||i.webkitMovementY||0,n=this.camera;ii.setFromQuaternion(n.quaternion),ii.y-=e*.002*this.pointerSpeed,ii.x-=t*.002*this.pointerSpeed,ii.x=Math.max(Oa-this.maxPolarAngle,Math.min(Oa-this.minPolarAngle,ii.x)),n.quaternion.setFromEuler(ii),this.dispatchEvent(Rm)}function Um(){this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(Pm),this.isLocked=!0):(this.dispatchEvent(Lm),this.isLocked=!1)}function Nm(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}const ls=.3,Fm=1.7,Om=1.55,Bm=4.2,fr=9,zm=1,pr={GUT:{gravity:26,jumpSpeed:7},HEART:{gravity:16,jumpSpeed:7},HEAD:{gravity:9,jumpSpeed:6.5}},Ts=class Ts{constructor(e,t,n){M(this,"controls");M(this,"camera");M(this,"world");M(this,"feet",new U(8,40,8));M(this,"velocity",new U);M(this,"onGround",!1);M(this,"flyMode",!1);M(this,"move",{forward:!1,back:!1,left:!1,right:!1,up:!1,down:!1,jump:!1});M(this,"moveVec",{x:0,z:0});M(this,"lookEuler",new _i(0,0,0,"YXZ"));M(this,"isFocusing",!1);M(this,"isMeditating",!1);M(this,"meditationLift",0);M(this,"regime",pr.GUT);M(this,"reduceMotion",!1);M(this,"meditationListeners",[]);this.camera=e,this.world=n,this.controls=new Im(e,t),this.bindInput(),this.syncCamera()}onMeditationChange(e){this.meditationListeners.push(e)}setRegime(e){this.regime=pr[e]??pr.GUT}setReduceMotion(e){this.reduceMotion=e}spawnAt(e,t,n){this.feet.set(e,t,n),this.velocity.set(0,0,0),this.syncCamera()}get object(){return this.controls.getObject()}lock(){this.controls.lock()}unlock(){this.controls.unlock()}get isLocked(){return this.controls.isLocked}bindInput(){const e=n=>this.setKey(n.code,!0,n),t=n=>this.setKey(n.code,!1,n);document.addEventListener("keydown",e),document.addEventListener("keyup",t)}setKey(e,t,n){switch(e){case"KeyW":case"ArrowUp":this.move.forward=t;break;case"KeyS":case"ArrowDown":this.move.back=t;break;case"KeyA":case"ArrowLeft":this.move.left=t;break;case"KeyD":case"ArrowRight":this.move.right=t;break;case"Space":this.move.up=t,this.move.jump=t,n.preventDefault();break;case"ShiftLeft":case"ShiftRight":this.move.down=t;break;case"KeyF":this.isFocusing=t;break;case"KeyM":t&&this.toggleMeditation();break;case"KeyG":t&&(this.flyMode=!this.flyMode);break}}toggleMeditation(){this.isMeditating=!this.isMeditating;for(const e of this.meditationListeners)e(this.isMeditating)}setMoveVector(e,t){this.moveVec.x=e,this.moveVec.z=t}applyLook(e,t){const n=Ts.LOOK_SENSITIVITY;this.lookEuler.setFromQuaternion(this.camera.quaternion),this.lookEuler.y-=e*n,this.lookEuler.x-=t*n;const s=Math.PI/2-.02;this.lookEuler.x=Math.max(-s,Math.min(s,this.lookEuler.x)),this.camera.quaternion.setFromEuler(this.lookEuler)}setFocusing(e){this.isFocusing=e}setJump(e){this.move.jump=e,this.move.up=e}meditateToggle(){this.toggleMeditation()}boxCollides(e,t,n){const s=Math.floor(e-ls),r=Math.floor(e+ls),o=Math.floor(t),a=Math.floor(t+Fm),l=Math.floor(n-ls),c=Math.floor(n+ls);for(let h=o;h<=a;h++)for(let u=l;u<=c;u++)for(let d=s;d<=r;d++)if(this.world.isSolidAt(d,h,u))return!0;return!1}update(e){e=Math.min(e,.05);const t=this.flyMode?fr:Bm,n=new U,s=new U;this.camera.getWorldDirection(s),s.y=0,s.normalize();const r=new U().crossVectors(s,new U(0,1,0)).normalize(),o=(this.move.right?1:0)-(this.move.left?1:0)+this.moveVec.x,a=(this.move.forward?1:0)-(this.move.back?1:0)+this.moveVec.z;n.addScaledVector(s,a).addScaledVector(r,o);const l=n.length();l>1&&n.multiplyScalar(1/l);const c=this.isMeditating?0:1,h=n.multiplyScalar(t*c);if(this.flyMode){this.velocity.x=h.x,this.velocity.z=h.z;let d=0;this.move.up&&(d+=fr),this.move.down&&(d-=fr),this.velocity.y=d*c}else this.velocity.x=h.x,this.velocity.z=h.z,this.velocity.y-=this.regime.gravity*e,this.move.jump&&this.onGround&&!this.isMeditating&&(this.velocity.y=this.regime.jumpSpeed,this.onGround=!1);this.moveAxis("x",this.velocity.x*e),this.moveAxis("z",this.velocity.z*e),this.moveAxisY(this.velocity.y*e),this.feet.y<-8&&(this.feet.set(this.feet.x,40,this.feet.z),this.velocity.set(0,0,0)),this.feet.y>Bn&&(this.feet.y=Bn);const u=this.isMeditating&&!this.reduceMotion?1.2:0;this.meditationLift+=(u-this.meditationLift)*Math.min(1,e*2.5),this.syncCamera()}moveAxis(e,t){if(t===0)return;const n=this.feet[e];if(this.feet[e]=n+t,this.boxCollides(this.feet.x,this.feet.y,this.feet.z)){if(this.onGround||this.flyMode){const s=this.feet.y+zm;if(!this.boxCollides(this.feet.x,s,this.feet.z)){this.feet.y=s;return}}this.feet[e]=n,this.velocity[e]=0}}moveAxisY(e){if(e===0)return;const t=this.feet.y;this.feet.y=t+e,this.boxCollides(this.feet.x,this.feet.y,this.feet.z)?(this.feet.y=t,e<0&&(this.onGround=!0),this.velocity.y=0):e<0&&(this.onGround=!1)}syncCamera(){this.controls.getObject().position.set(this.feet.x,this.feet.y+Om+this.meditationLift,this.feet.z)}};M(Ts,"LOOK_SENSITIVITY",.004);let Nr=Ts;class Qr{constructor(e){this.data=e}static async load(e="data/aetheria-frequency-table.json"){const t="./",n=new AbortController,s=setTimeout(()=>n.abort(),1e4);let r;try{r=await fetch(`${t}${e}`,{signal:n.signal})}finally{clearTimeout(s)}if(!r.ok)throw new Error(`Failed to load frequency table: ${r.status}`);const o=await r.json();return(!Array.isArray(o.frequencies)||o.frequencies.length!==27)&&console.warn(`[Aetheria] frequency-table has ${o.frequencies?.length??0} entries; expected 27.`),new Qr(o)}get(e){const t=this.data.frequencies[e];if(!t)throw new Error(`No frequency entry at index ${e}`);return t}hz(e){return this.get(e)?.frequency_hz??0}playbackHz(e){const t=this.get(e);return t?.playback_hz||t?.frequency_hz||0}get hasRealValues(){return this.data.frequencies.some(e=>e.frequency_hz>0)}}class Ba{constructor(e,t,n=0,s="sine"){M(this,"osc");M(this,"gain");M(this,"started",!1);this.ctx=e,this.osc=e.createOscillator(),this.osc.type=s,this.osc.frequency.value=n,this.gain=e.createGain(),this.gain.gain.value=0,this.osc.connect(this.gain),this.gain.connect(t)}start(){this.started||(this.osc.start(),this.started=!0)}setFrequency(e,t=.08){if(e<=0){this.setAmplitude(0,t);return}const n=this.ctx.currentTime;this.osc.frequency.cancelScheduledValues(n),this.osc.frequency.setTargetAtTime(e,n,t)}setAmplitude(e,t=.1){const n=this.ctx.currentTime;this.gain.gain.cancelScheduledValues(n),this.gain.gain.setTargetAtTime(Math.max(0,e),n,t)}get node(){return this.gain}stop(){if(this.started){try{this.osc.stop()}catch{}this.started=!1}}}class km{constructor(e,t){M(this,"leftOsc");M(this,"rightOsc");M(this,"leftPan");M(this,"rightPan");M(this,"gain");M(this,"offset",4);M(this,"carrier",0);M(this,"started",!1);this.ctx=e,this.gain=e.createGain(),this.gain.gain.value=0,this.gain.connect(t),this.leftOsc=e.createOscillator(),this.rightOsc=e.createOscillator(),this.leftOsc.type="sine",this.rightOsc.type="sine",this.leftPan=e.createStereoPanner(),this.rightPan=e.createStereoPanner(),this.leftPan.pan.value=-1,this.rightPan.pan.value=1,this.leftOsc.connect(this.leftPan).connect(this.gain),this.rightOsc.connect(this.rightPan).connect(this.gain)}start(){this.started||(this.leftOsc.start(),this.rightOsc.start(),this.started=!0)}setOffset(e){this.offset=e,this.applyFrequencies()}setCarrier(e){this.carrier=e,this.applyFrequencies()}applyFrequencies(){const e=this.ctx.currentTime;if(this.carrier<=0){this.setAmplitude(0);return}this.leftOsc.frequency.setTargetAtTime(this.carrier,e,.08),this.rightOsc.frequency.setTargetAtTime(this.carrier+this.offset,e,.08)}setAmplitude(e,t=.2){const n=this.ctx.currentTime;this.gain.gain.setTargetAtTime(Math.max(0,e),n,t)}stop(){if(this.started){try{this.leftOsc.stop(),this.rightOsc.stop()}catch{}this.started=!1}}}function Hm(i){switch(i){case"sleep":return{min:.5,max:4};case"ambient":default:return{min:7,max:10}}}function Gm(i){return i<.5?"infra":i<=4?"delta":i<=8?"theta":i<=12?"alpha":i<=30?"beta":"gamma"}function Vm(i,e="ambient"){if(e==="schumann")return{subHz:7.83,octavesDown:0,band:"theta",mode:e};if(i<=0)return{subHz:0,octavesDown:0,band:"infra",mode:e};const t=Hm(e);let n=i,s=0;for(;n>t.max;)n/=2,s++;return n<t.min&&s>0&&(n*=2,s--),{subHz:n,octavesDown:s,band:Gm(n),mode:e}}const mr={ambient:.1,sleep:.08,schumann:.1};class Wm{constructor(e,t){M(this,"osc");M(this,"gain");M(this,"amGain");M(this,"lfo");M(this,"lfoGain");M(this,"started",!1);M(this,"mode","ambient");M(this,"state",{subHz:0,octavesDown:0,band:"infra",mode:"ambient"});this.ctx=e,this.osc=e.createOscillator(),this.osc.type="sine",this.osc.frequency.value=8,this.amGain=e.createGain(),this.amGain.gain.value=1,this.lfo=e.createOscillator(),this.lfo.type="sine",this.lfo.frequency.value=.12,this.lfoGain=e.createGain(),this.lfoGain.gain.value=.25,this.lfo.connect(this.lfoGain).connect(this.amGain.gain),this.gain=e.createGain(),this.gain.gain.value=0,this.osc.connect(this.amGain).connect(this.gain).connect(t)}start(){this.started||(this.osc.start(),this.lfo.start(),this.started=!0,this.gain.gain.setTargetAtTime(mr[this.mode],this.ctx.currentTime,1.5))}setMode(e){this.mode=e,this.gain.gain.setTargetAtTime(mr[e],this.ctx.currentTime,.5)}setFrequency(e,t=8){if(this.state=Vm(e,this.mode),this.state.subHz<=0){this.gain.gain.setTargetAtTime(0,this.ctx.currentTime,.3);return}const n=this.ctx.currentTime;this.osc.frequency.cancelScheduledValues(n),this.osc.frequency.setValueAtTime(Math.max(.5,this.osc.frequency.value),n),this.osc.frequency.exponentialRampToValueAtTime(this.state.subHz,n+t),this.started&&this.gain.gain.setTargetAtTime(mr[this.mode],n,.5)}getState(){return this.state}stop(){if(this.started){try{this.osc.stop(),this.lfo.stop()}catch{}this.started=!1}}}class qm{constructor(){M(this,"ctx");M(this,"master");M(this,"base");M(this,"binaural");M(this,"harmonics",[]);M(this,"subBass");M(this,"ambientGain");M(this,"ambientSource",null);M(this,"currentHz",0);M(this,"currentTrueHz",0);M(this,"coherence",0);M(this,"masterVolume",.6);M(this,"running",!1);const e=window.AudioContext||window.webkitAudioContext;this.ctx=new e,this.master=this.ctx.createGain(),this.master.gain.value=this.masterVolume,this.master.connect(this.ctx.destination),this.base=new Ba(this.ctx,this.master,0,"sine"),this.binaural=new km(this.ctx,this.master);for(let t=0;t<3;t++)this.harmonics.push(new Ba(this.ctx,this.master,0,"sine"));this.subBass=new Wm(this.ctx,this.master),this.ambientGain=this.ctx.createGain(),this.ambientGain.gain.value=0,this.ambientGain.connect(this.master)}async start(){if(!this.running){await this.ctx.resume(),this.base.start(),this.binaural.start();for(const e of this.harmonics)e.start();this.subBass.start(),this.startAmbientBed(),this.running=!0,this.applyMix()}}setSubBassMode(e){this.subBass.setMode(e)}getAudioState(){return{trueHz:this.currentTrueHz,carrierHz:this.currentHz,subBass:this.subBass.getState()}}setMasterVolume(e){this.masterVolume=Math.max(0,Math.min(1,e)),this.master.gain.setTargetAtTime(this.masterVolume,this.ctx.currentTime,.1)}setBinauralOffset(e){this.binaural.setOffset(e)}setFrequency(e,t){this.currentTrueHz=e,this.currentHz=t,this.base.setFrequency(t),this.binaural.setCarrier(t);const n=[2,3,5];this.harmonics.forEach((s,r)=>s.setFrequency(t>0?t*n[r]:0)),this.subBass.setFrequency(e),this.applyMix()}setCoherence(e){this.coherence=Math.max(0,Math.min(1,e)),this.applyMix()}applyMix(){if(!this.running)return;const e=this.coherence,t=this.currentHz<=0;this.base.setAmplitude(t?0:.05+.22*e);const n=t?0:Math.max(0,(e-.2)/.8)*.05;this.binaural.setAmplitude(n);const s=t?0:Math.max(0,(e-.4)/.6),r=[.12,.07,.04];this.harmonics.forEach((o,a)=>{const l=a===0&&!t?.05:0;o.setAmplitude(Math.max(l,s*r[a]))}),this.ambientGain.gain.setTargetAtTime(.06+.05*(1-e),this.ctx.currentTime,.3)}startAmbientBed(){if(this.ambientSource)return;const t=this.ctx.createBuffer(1,this.ctx.sampleRate*4,this.ctx.sampleRate),n=t.getChannelData(0);let s=0;for(let a=0;a<n.length;a++){const l=Math.random()*2-1;s=(s+.02*l)/1.02,n[a]=s*3.5}const r=this.ctx.createBufferSource();r.buffer=t,r.loop=!0;const o=this.ctx.createBiquadFilter();o.type="lowpass",o.frequency.value=600,r.connect(o).connect(this.ambientGain),r.start(),this.ambientSource=r}chime(e=432,t=.6){if(!this.running||e<=0)return;const n=this.ctx.currentTime,s=this.ctx.createOscillator(),r=this.ctx.createGain();s.type="sine",s.frequency.value=e,r.gain.setValueAtTime(0,n),r.gain.linearRampToValueAtTime(.12,n+.04),r.gain.exponentialRampToValueAtTime(1e-4,n+t),s.connect(r).connect(this.master),s.start(n),s.stop(n+t+.05)}dispose(){this.base.stop(),this.binaural.stop();for(const e of this.harmonics)e.stop();if(this.subBass.stop(),this.ambientSource)try{this.ambientSource.stop()}catch{}this.ctx.close().catch(()=>{})}}/**
 * AthenaDevice — Browser-native Muse S Athena BLE library
 *
 * Full-capability JavaScript driver for the Muse S Athena headband.
 * Supports EEG (4/8ch), PPG, fNIRS (HbO/HbR), Accelerometer, Gyroscope, Battery.
 *
 * Usage:
 *   <script src="athena-core.js"><\/script>
 *   <script>
 *     const muse = new AthenaDevice({
 *       preset: 'p1041',
 *       onEEG:        (data) => { },
 *       onPPG:        (data) => { },
 *       onFNIRS:      (data) => { },
 *       onAccGyro:    (data) => { },
 *       onBattery:    (pct)  => { },
 *       onBandPowers: (bp)   => { },
 *       onStatus:     (s)    => { },
 *       onLog:        (type, msg) => { },
 *     });
 *     await muse.connect();
 *     await muse.startStream();
 *   <\/script>
 *
 * Ported from OpenMuse (Python) by the Aetheria project.
 * Protocol reference: ATHENA_PORT_SPEC.md
 *
 * @version 2.0.0
 * @license MIT
 */(function(i){const t="273e0001-4c4d-454d-96be-f03bac821358",n="273e0013-4c4d-454d-96be-f03bac821358",s="273e0014-4c4d-454d-96be-f03bac821358",r=.08850637856314472,o=1/32768,a=610352e-10,l=-.0074768,c=8192,h={17:{name:"EEG4",type:"EEG",ch:4,spp:4,rate:256,bytes:28},18:{name:"EEG8",type:"EEG",ch:8,spp:2,rate:256,bytes:28},52:{name:"OPTICS4",type:"OPTICS",ch:4,spp:3,rate:64,bytes:30},53:{name:"OPTICS8",type:"OPTICS",ch:8,spp:2,rate:64,bytes:40},54:{name:"OPTICS16",type:"OPTICS",ch:16,spp:1,rate:64,bytes:40},71:{name:"ACCGYRO",type:"ACCGYRO",ch:6,spp:3,rate:52,bytes:36},83:{name:"UNKNOWN_53",type:"Unknown",ch:0,spp:0,rate:0,bytes:24},136:{name:"BATTERY",type:"BATTERY",ch:1,spp:1,rate:.2,bytes:-1},152:{name:"BATTERY_OLD",type:"BATTERY",ch:1,spp:1,rate:1,bytes:20}},u=["TP9","AF7","AF8","TP10","AUX1","AUX2","AUX3","AUX4"],d=["TP9","AF7","AF8","TP10"],p=["ACC_X","ACC_Y","ACC_Z","GYRO_X","GYRO_Y","GYRO_Z"],g={4:["LI_NIR","RI_NIR","LI_IR","RI_IR"],8:["LO_NIR","RO_NIR","LO_IR","RO_IR","LI_NIR","RI_NIR","LI_IR","RI_IR"],16:["LO_NIR","RO_NIR","LO_IR","RO_IR","LI_NIR","RI_NIR","LI_IR","RI_IR","LO_RED","RO_RED","LO_AMB","RO_AMB","LI_RED","RI_RED","LI_AMB","RI_AMB"]},_={660:{HbO:319.6,HbR:3226.56},730:{HbO:390,HbR:1102.2},850:{HbO:1058,HbR:691.32}},m={LO:{660:"LO_RED",730:"LO_NIR",850:"LO_IR",amb:"LO_AMB"},RO:{660:"RO_RED",730:"RO_NIR",850:"RO_IR",amb:"RO_AMB"},LI:{660:"LI_RED",730:"LI_NIR",850:"LI_IR",amb:"LI_AMB"},RI:{660:"RI_RED",730:"RI_NIR",850:"RI_IR",amb:"RI_AMB"}},f={p21:{eeg:4,optics:0,desc:"EEG4 only"},p1045:{eeg:8,optics:4,desc:"EEG8 + Optics4"},p1043:{eeg:8,optics:8,desc:"EEG8 + Optics8"},p1034:{eeg:8,optics:8,desc:"EEG8 + Optics8"},p1041:{eeg:8,optics:16,desc:"EEG8 + Optics16 (full, recommended)"}};function T(k,A,C){const y=new Uint32Array(C);for(let F=0;F<C;F++){let D=0;const G=F*A;for(let H=0;H<A;H++){const ce=G+H;k[ce>>3]>>(ce&7)&1&&(D|=1<<H)}y[F]=D}return y}function S(k,A,C){const y=A===4?4:2,F=T(k,14,A*y),D=[];for(let G=0;G<y;G++){const H=new Float64Array(A);for(let ce=0;ce<A;ce++){let ne=F[G*A+ce];C&&(ne-=c),H[ce]=ne*r}D.push(H)}return D}function P(k,A){const C=A===4?3:A===8?2:1,y=T(k,20,A*C),F=[];for(let D=0;D<C;D++){const G=new Float64Array(A);for(let H=0;H<A;H++)G[H]=y[D*A+H]*o;F.push(G)}return F}function O(k){const A=[];for(let C=0;C<3;C++){const y=new Float64Array(6);for(let F=0;F<6;F++){const D=(C*6+F)*2;let G=k[D]|k[D+1]<<8;G>=32768&&(G-=65536),y[F]=F<3?G*a:G*l}A.push(y)}return A}function I(k){return k.length<2?null:(k[0]|k[1]<<8)/256}function L(k,A){const C=new Uint8Array(k),y=[];let F=0;for(;F<C.length;){const D=C[F];if(D<14||F+D>C.length)break;y.push(oe(C.subarray(F,F+D),A)),F+=D}return y}function oe(k,A){const C={len:k[0],seq:k[1],devTime:(k[2]|k[3]<<8|k[4]<<16|k[5]<<24)>>>0,pktId:k[9],byte13:k[13],hostTime:A},y=[];let F=14;const D=h[C.pktId];if(D){const G=D.bytes===-1?k.length-F:D.bytes;F+G<=k.length&&(y.push({tag:C.pktId,name:D.name,type:D.type,idx:C.seq,data:k.slice(F,F+G)}),F+=G)}for(;F+5<k.length;){const G=k[F],H=k[F+1];F+=5;const ce=h[G];if(ce){const ne=ce.bytes===-1?k.length-F:ce.bytes;if(F+ne<=k.length)y.push({tag:G,name:ce.name,type:ce.type,idx:H,data:k.slice(F,F+ne)}),F+=ne;else break}else{y.push({tag:G,name:"UNK_0x"+G.toString(16),type:"Unknown",idx:H,data:k.slice(F)});break}}return{hdr:C,subs:y,raw:k}}function E(k,A){const C=2*Math.PI*k/A,y=Math.sin(C)/(2*Math.SQRT1_2),F=Math.cos(C),D=1+y;return{b:[(1-F)/2/D,(1-F)/D,(1-F)/2/D],a:[1,-2*F/D,(1-y)/D]}}function w(k,A){const C=2*Math.PI*k/A,y=Math.sin(C)/(2*Math.SQRT1_2),F=Math.cos(C),D=1+y;return{b:[(1+F)/2/D,-(1+F)/D,(1+F)/2/D],a:[1,-2*F/D,(1-y)/D]}}function j(k,A,C){const y=C.length,F=new Float64Array(y);let D=0,G=0,H=0,ce=0;for(let ne=0;ne<y;ne++)F[ne]=k[0]*C[ne]+k[1]*D+k[2]*G-A[1]*H-A[2]*ce,G=D,D=C[ne],ce=H,H=F[ne];return F}function ie(k,A,C){const y=j(k,A,C),F=y.length,D=new Float64Array(F);for(let ce=0;ce<F;ce++)D[ce]=y[F-1-ce];const G=j(k,A,D),H=new Float64Array(F);for(let ce=0;ce<F;ce++)H[ce]=G[F-1-ce];return H}function pe(k,A,C,y){const F=w(k,C),D=E(A,C);return ie(D.b,D.a,ie(F.b,F.a,y))}function N(k){let A=1;for(;A<k;)A<<=1;return A}function X(k,A){const C=k.length;for(let y=1,F=0;y<C;y++){let D=C>>1;for(;F&D;)F^=D,D>>=1;if(F^=D,y<F){let G=k[y];k[y]=k[F],k[F]=G,G=A[y],A[y]=A[F],A[F]=G}}for(let y=2;y<=C;y<<=1){const F=-2*Math.PI/y,D=Math.cos(F),G=Math.sin(F);for(let H=0;H<C;H+=y){let ce=1,ne=0;const x=y>>1;for(let v=0;v<x;v++){const z=H+v+x,Q=k[z]*ce-A[z]*ne,ee=k[z]*ne+A[z]*ce;k[z]=k[H+v]-Q,A[z]=A[H+v]-ee,k[H+v]+=Q,A[H+v]+=ee;const V=ce*D-ne*G;ne=ce*G+ne*D,ce=V}}}}function K(k,A){const C=N(k.length),y=new Float64Array(C),F=new Float64Array(C),D=k.length;for(let ne=0;ne<D;ne++)y[ne]=k[ne]*(.5-.5*Math.cos(2*Math.PI*ne/(D-1)));X(y,F);const G=(C>>1)+1,H=new Float64Array(G),ce=new Float64Array(G);for(let ne=0;ne<G;ne++)H[ne]=y[ne]*y[ne]+F[ne]*F[ne],ce[ne]=ne*A/C;return{psd:H,freqs:ce,N:C}}function te(k,A){if(k.length<64)return null;const{psd:C,freqs:y}=K(k,A),F={delta:[1,4],theta:[4,8],alpha:[8,13],beta:[13,30],gamma:[30,50]},D={};let G=0;for(const[H,[ce,ne]]of Object.entries(F)){let x=0;for(let v=0;v<y.length;v++)y[v]>=ce&&y[v]<ne&&(x+=C[v]);D[H]=x,G+=x}if(G>0)for(const H of Object.keys(D))D[H]/=G;return D}function J(k,A){if(k.length<64)return 0;const{psd:y,freqs:F}=K(k,A);let D=0,G=0;for(let H=0;H<F.length;H++){const ce=F[H];ce>=.5&&ce<=8&&(G+=y[H]),ce>=.6&&ce<=4&&(D+=y[H])}return G>1e-10?Math.min(1,D/G):0}function Z(k,A){const C=k.length,y=A[0].length;let F=0,D=0,G=0;for(let V=0;V<C;V++)F+=k[V][0]*k[V][0],D+=k[V][0]*k[V][1],G+=k[V][1]*k[V][1];const H=F*G-D*D;if(Math.abs(H)<1e-30)return[new Float64Array(y),new Float64Array(y)];const ce=G/H,ne=-D/H,x=F/H,v=new Float64Array(C),z=new Float64Array(C);for(let V=0;V<C;V++)v[V]=ce*k[V][0]+ne*k[V][1],z[V]=ne*k[V][0]+x*k[V][1];const Q=new Float64Array(y),ee=new Float64Array(y);for(let V=0;V<y;V++){let ye=0,ue=0;for(let he=0;he<C;he++)ye+=v[he]*A[he][V],ue+=z[he]*A[he][V];Q[V]=ye,ee[V]=ue}return[Q,ee]}function ae(k,A){const C=k.length;if(C<4)return 0;let y=0,F=0;for(let v=0;v<C;v++)y+=k[v],F+=A[v];const D=y/C,G=F/C;let H=0,ce=0,ne=0;for(let v=0;v<C;v++){const z=k[v]-D,Q=A[v]-G;H+=z*Q,ce+=z*z,ne+=Q*Q}const x=Math.sqrt(ce*ne);return x<1e-20?0:-(H/x)}function le(k,A,C){const y=g[C];if(!y)return null;const F=y.indexOf(k);if(F===-1)return null;const D=A.length,G=new Float64Array(D);for(let H=0;H<D;H++)G[H]=A[H][F];return G}function xe(k,A){const C=k.length;if(C<256)return null;const y=64,F=V=>le(V,k,A),D=(V,ye)=>{if(!V)return null;if(!ye)return V;const ue=new Float64Array(C);for(let he=0;he<C;he++)ue[he]=V[he]-ye[he];return ue},G=["LI_NIR","RI_NIR","LI_IR","RI_IR","LO_NIR","RO_NIR","LO_IR","RO_IR"],H={LI:"LI_AMB",RI:"RI_AMB",LO:"LO_AMB",RO:"RO_AMB"},ce={};for(const V of G)ce[V]=D(F(V),F(H[V.substring(0,2)]));let ne=new Float64Array(C),x=0;const v={};for(const V of G){const ye=ce[V];if(!ye)continue;let ue;try{ue=pe(.5,8,y,ye)}catch{continue}const he=J(ue,y),be=he*he;v[V]={sqi:+he.toFixed(3),weight:+be.toFixed(4)};for(let Pe=0;Pe<C;Pe++)ne[Pe]+=ue[Pe]*be;x+=be}if(x>1e-10)for(let V=0;V<C;V++)ne[V]=-ne[V]/x;const z=$(ne,y),Q=Object.values(v).map(V=>V.sqi),ee=Q.length>0?Q.reduce((V,ye)=>V+ye,0)/Q.length:0;return{bvp:Array.from(ne),sqi:+ee.toFixed(3),heartRate:z,weights:v,nChannels:Object.keys(v).length}}function $(k,A){const C=k.length;if(C<A*3)return 0;const y=Math.max(0,C-8*A),F=k.slice(y),D=[],G=Math.floor(A*.4),H=F.reduce((x,v)=>x+v,0)/F.length;for(let x=2;x<F.length-2;x++)F[x]>F[x-1]&&F[x]>F[x-2]&&F[x]>=F[x+1]&&F[x]>=F[x+2]&&F[x]>H&&(D.length===0||x-D[D.length-1]>=G)&&D.push(x);if(D.length<3)return 0;let ce=0;for(let x=1;x<D.length;x++)ce+=D[x]-D[x-1];const ne=Math.round(60*A/(ce/(D.length-1)));return ne>=40&&ne<=200?ne:0}function se(k,A){const C=k.length;if(C<640)return null;const y=64,G=3*7,H=ne=>le(ne,k,A),ce={};for(const[ne,x]of Object.entries(m)){const v=H(x.amb),z={};for(const Ae of["660","730","850"]){const Re=H(x[Ae]);if(!Re)continue;const Ee=new Float64Array(C);if(v)for(let me=0;me<C;me++)Ee[me]=Re[me]-v[me];else for(let me=0;me<C;me++)Ee[me]=Re[me];z[Ae]=Ee}const Q=Object.keys(z);if(Q.length<2)continue;const ee=[],V=[];for(const Ae of Q){const Re=z[Ae],Ee=Re.reduce((qe,ke)=>qe+ke,0)/C,me=new Float64Array(C);for(let qe=0;qe<C;qe++)me[qe]=-Math.log(Math.max(Re[qe],1e-10)/Math.max(Ee,1e-10));let Ne;try{Ne=pe(.01,.1,y,me)}catch{Ne=me}const Xe=new Float64Array(C);for(let qe=0;qe<C;qe++)Xe[qe]=Ne[qe]/G;ee.push(Xe),V.push([_[Ae].HbO,_[Ae].HbR])}const[ye,ue]=Z(V,ee),he=new Float64Array(C),be=new Float64Array(C),Pe=new Float64Array(C);for(let Ae=0;Ae<C;Ae++)he[Ae]=ye[Ae]*1e6,be[Ae]=ue[Ae]*1e6,Pe[Ae]=he[Ae]-be[Ae];const re=Math.min(C,10*y),Ye=ae(he.slice(C-re),be.slice(C-re));ce[ne]={hbo:Array.from(he),hbr:Array.from(be),hbdiff:Array.from(Pe),sqi:+Ye.toFixed(3),lastHbO:+he[C-1].toFixed(3),lastHbR:+be[C-1].toFixed(3),lastHbDiff:+Pe[C-1].toFixed(3)}}return Object.keys(ce).length>0?ce:null}function ve(k){const A=k+`
`,C=new Uint8Array(1+A.length);C[0]=C.length;for(let y=0;y<A.length;y++)C[y+1]=A.charCodeAt(y);return C}function Se(k){return new Promise(A=>setTimeout(A,k))}class Te{constructor(A={}){this._preset=A.preset||"p1041",this._dcOffset=A.dcOffset||!1,this._processInterval=A.processInterval||500,this._exportSeconds=A.exportSeconds||30,this._onEEGCb=A.onEEG||null,this._onOpticsCb=A.onOptics||null,this._onAccGyroCb=A.onAccGyro||null,this._onBatteryCb=A.onBattery||null,this._onPPGCb=A.onPPG||null,this._onFNIRSCb=A.onFNIRS||null,this._onBandPowersCb=A.onBandPowers||null,this._onStatusCb=A.onStatus||null,this._onLogCb=A.onLog||null,this._onRawPacketCb=A.onRawPacket||null,this._device=null,this._server=null,this._controlChar=null,this._eegChar=null,this._otherChar=null,this._status="disconnected",this._firmware="",this._battery=null,this._eegMode=null,this._opticsMode=null,this._opticsNumCh=0,this._counts={total:0,eeg:0,optics:0,accgyro:0,battery:0},this._eegBuf1s=Array.from({length:8},()=>[]),this._opticsBuf=[],this._exp={raw:[],eeg:[],optics:[],accgyro:[]},this._ppg=null,this._fnirs=null,this._bandPowers=null,this._processTimer=null,this._handleBLEData=this._handleBLEData.bind(this),this._handleBLEControl=this._handleBLEControl.bind(this),this._handleBLEDisconnect=this._handleBLEDisconnect.bind(this)}get status(){return this._status}get battery(){return this._battery}get firmware(){return this._firmware}get deviceName(){return this._device?this._device.name:null}get eegMode(){return this._eegMode}get opticsMode(){return this._opticsMode}get counts(){return{...this._counts}}get preset(){return this._preset}get ppg(){return this._ppg}get fnirs(){return this._fnirs}get bandPowers(){return this._bandPowers}set preset(A){this._preset=A}set dcOffset(A){this._dcOffset=!!A}async connect(){if(!navigator.bluetooth)throw new Error("Web Bluetooth not available");this._setStatus("connecting"),this._log("info","Requesting Bluetooth device...");const A=await navigator.bluetooth.requestDevice({filters:[{namePrefix:"Muse"}],optionalServices:[65165]});this._device=A,this._log("info","Selected: "+A.name),A.addEventListener("gattserverdisconnected",this._handleBLEDisconnect),this._log("info","Connecting GATT server..."),this._server=await A.gatt.connect(),this._log("info","Discovering service...");const C=await this._server.getPrimaryService(65165),[y,F,D]=await Promise.all([C.getCharacteristic(t),C.getCharacteristic(n),C.getCharacteristic(s)]);this._controlChar=y,this._eegChar=F,this._otherChar=D,y.addEventListener("characteristicvaluechanged",this._handleBLEControl),await y.startNotifications(),this._log("info","Subscribed: CONTROL"),F.addEventListener("characteristicvaluechanged",this._handleBLEData),await F.startNotifications(),this._log("info","Subscribed: EEG_DATA"),D.addEventListener("characteristicvaluechanged",this._handleBLEData),await D.startNotifications(),this._log("info","Subscribed: OTHER_DATA"),this._setStatus("connected")}async startStream(A){A&&(this._preset=A),this._setStatus("streaming"),this._startProcessing(),this._log("info","Starting stream (preset: "+this._preset+")..."),await this._sendCmd("v6"),await Se(200),await this._sendCmd("s"),await Se(200),await this._sendCmd("h"),await Se(200),await this._sendCmd(this._preset),await Se(200),await this._sendCmd("s"),await Se(200),await this._sendCmd("dc001"),await Se(50),await this._sendCmd("dc001"),await Se(50),await this._sendCmd("L1"),await Se(300),await this._sendCmd("s"),await Se(200),this._log("info","Initialization complete.")}async stopStream(){try{await this._sendCmd("h")}catch{}this._stopProcessing(),this._log("info","Stream halted."),this._status==="streaming"&&this._setStatus("connected")}async disconnect(){try{await this._sendCmd("h")}catch{}this._stopProcessing(),this._device&&this._device.gatt.connected&&this._device.gatt.disconnect()}async sendCommand(A){await this._sendCmd(A)}getExportData(){const A=this._eegMode==="EEG4"?4:8;return{exportedAt:new Date().toISOString(),libraryVersion:"2.0.0",connection:{deviceName:this.deviceName,firmware:this._firmware,preset:this._preset},channels:{eeg:A===4?d:u,optics:g[this._opticsNumCh]||[],accgyro:p},eegSamples:this._exp.eeg.map(C=>({t:+C.t.toFixed(2),ch:C.ch.map(y=>+y.toFixed(3))})),opticsSamples:this._exp.optics.map(C=>({t:+C.t.toFixed(2),ch:C.ch.map(y=>+y.toFixed(6))})),accgyroSamples:this._exp.accgyro.map(C=>({t:+C.t.toFixed(2),ch:C.ch.map(y=>+y.toFixed(6))})),battery:this._battery,processing:{ppg:this._ppg,fnirs:this._fnirs,bandPowers:this._bandPowers},rawPackets:this._exp.raw.map(C=>({t:+C.t.toFixed(2),hex:C.hex}))}}downloadExport(A){const C=this.getExportData(),y=new Blob([JSON.stringify(C,null,2)],{type:"application/json"}),F=URL.createObjectURL(y),D=document.createElement("a");D.href=F,D.download=A||"athena-"+new Date().toISOString().replace(/[:.]/g,"-")+".json",document.body.appendChild(D),D.click(),document.body.removeChild(D),URL.revokeObjectURL(F)}_handleBLEDisconnect(){this._server=null,this._controlChar=null,this._eegChar=null,this._otherChar=null,this._stopProcessing(),this._setStatus("disconnected"),this._log("info","Device disconnected.")}_handleBLEControl(A){const C=new Uint8Array(A.target.value.buffer,A.target.value.byteOffset,A.target.value.byteLength),y=new TextDecoder().decode(C);this._log("rx",y.trim());const F=y.match(/"fw"\s*:\s*"([^"]+)"/);F&&(this._firmware=F[1]);const D=y.match(/"bp"\s*:\s*([\d.]+)/);D&&(this._battery=parseFloat(D[1]),this._onBatteryCb&&this._onBatteryCb(this._battery))}_handleBLEData(A){const C=performance.now(),y=A.target.value,F=y.buffer.slice(y.byteOffset,y.byteOffset+y.byteLength);try{const D=L(F,C);for(const G of D){this._counts.total++,this._pushExp(this._exp.raw,{t:C,hex:Oe(G.raw)},C),this._onRawPacketCb&&this._onRawPacketCb(G);for(const H of G.subs)H.type==="EEG"?this._handleEEG(H,C):H.type==="OPTICS"?this._handleOptics(H,C):H.type==="ACCGYRO"?this._handleAccGyro(H,C):H.type==="BATTERY"&&this._handleBattery(H)}}catch(D){this._log("error","Parse error: "+D.message)}}_handleEEG(A,C){const y=h[A.tag];this._counts.eeg++,this._eegMode||(this._eegMode=y.name,this._log("info","EEG mode: "+y.name+" ("+y.ch+"ch)"));const F=S(A.data,y.ch,this._dcOffset),D=y.ch===4?d:u;for(const G of F){for(let H=0;H<G.length;H++)this._eegBuf1s[H].push(G[H]);this._pushExp(this._exp.eeg,{t:C,ch:Array.from(G)},C)}for(let G=0;G<this._eegBuf1s.length;G++)this._eegBuf1s[G].length>512&&(this._eegBuf1s[G]=this._eegBuf1s[G].slice(-512));this._onEEGCb&&this._onEEGCb({samples:F,labels:D,numCh:y.ch,count:this._counts.eeg})}_handleOptics(A,C){const y=h[A.tag];this._counts.optics++,this._opticsMode||(this._opticsMode=y.name,this._opticsNumCh=y.ch,this._log("info","Optics mode: "+y.name+" ("+y.ch+"ch)"),this._startProcessing());const F=P(A.data,y.ch),D=g[y.ch]||[];for(const G of F)this._opticsBuf.push(G),this._pushExp(this._exp.optics,{t:C,ch:Array.from(G)},C);this._opticsBuf.length>2e3&&(this._opticsBuf=this._opticsBuf.slice(-1920)),this._onOpticsCb&&this._onOpticsCb({samples:F,labels:D,numCh:y.ch,count:this._counts.optics})}_handleAccGyro(A,C){this._counts.accgyro++;const y=O(A.data);for(const F of y)this._pushExp(this._exp.accgyro,{t:C,ch:Array.from(F)},C);this._onAccGyroCb&&this._onAccGyroCb({samples:y,labels:p,count:this._counts.accgyro})}_handleBattery(A){this._counts.battery++;const C=I(A.data);C!==null&&(this._battery=C,this._log("info","Battery: "+C.toFixed(1)+"%"),this._onBatteryCb&&this._onBatteryCb(C))}async _sendCmd(A){if(!this._controlChar)throw new Error("Not connected");const C=ve(A);this._log("tx",A),await this._controlChar.writeValueWithoutResponse(C.buffer)}_startProcessing(){this._processTimer||(this._processTimer=setInterval(()=>this._processAll(),this._processInterval))}_stopProcessing(){this._processTimer&&(clearInterval(this._processTimer),this._processTimer=null)}_processAll(){if(this._eegBuf1s[1].length>=256){const A=te(this._eegBuf1s[1],256),C=te(this._eegBuf1s[2],256);if(A&&C){this._bandPowers={};for(const y of Object.keys(A))this._bandPowers[y]=(A[y]+C[y])/2;this._onBandPowersCb&&this._onBandPowersCb(this._bandPowers)}}if(this._opticsNumCh>0&&this._opticsBuf.length>=256){const A=xe(this._opticsBuf,this._opticsNumCh);A&&(this._ppg=A,this._onPPGCb&&this._onPPGCb(A))}if(this._opticsNumCh>=4&&this._opticsBuf.length>=640){const A=se(this._opticsBuf,this._opticsNumCh);A&&(this._fnirs=A,this._onFNIRSCb&&this._onFNIRSCb(A))}}_pushExp(A,C,y){A.push(C);const F=y-this._exportSeconds*1e3;for(;A.length>0&&A[0].t<F;)A.shift()}_setStatus(A){this._status=A,this._onStatusCb&&this._onStatusCb(A)}_log(A,C){this._onLogCb&&this._onLogCb(A,C)}static selfTest(){const A=[];function C(y,F){A.push({name:y,ok:F})}C("BitUnpack: zeros -> 0",T(new Uint8Array(28),14,16).every(y=>y===0)),C("BitUnpack: 0xFF -> 16383",T(new Uint8Array(28).fill(255),14,16).every(y=>y===16383));{const y=new Uint8Array(28);y[0]=1,C("BitUnpack: LSB set",T(y,14,16)[0]===1)}{const y=[100,200,300,400,500,600,700,800,1e3,2e3,3e3,4e3,5e3,6e3,7e3,8e3],F=new Uint8Array(28);for(let D=0;D<16;D++)for(let G=0;G<14;G++)if(y[D]>>G&1){const H=D*14+G;F[H>>3]|=1<<(H&7)}C("BitUnpack: 14-bit round-trip",T(F,14,16).every((D,G)=>D===y[G]))}{const y=[1e5,2e5,3e5,4e5,5e5,6e5,7e5,8e5,100001,200002,300003,400004,500005,600006,700007,800008],F=new Uint8Array(40);for(let D=0;D<16;D++)for(let G=0;G<20;G++)if(y[D]>>G&1){const H=D*20+G;F[H>>3]|=1<<(H&7)}C("BitUnpack: 20-bit round-trip",T(F,20,16).every((D,G)=>D===y[G]))}{const y=S(new Uint8Array(28),8,!1);C("EEG: zeros -> 0 uV",y[0].every(F=>F===0))}{const y=S(new Uint8Array(28),8,!0);C("EEG: DC offset",Math.abs(y[0][0]- -c*r)<.01)}C("Optics16: zeros -> 0",P(new Uint8Array(40),16)[0].every(y=>y===0)),C("Optics4: 3 samples",P(new Uint8Array(30),4).length===3);{const y=new Uint8Array(36);y[0]=0,y[1]=64,C("AccGyro: scale",Math.abs(O(y)[0][0]-16384*a)<1e-6)}C("Battery: decode",Math.abs(I(new Uint8Array([0,80]))-80)<.1);{const D=new Float64Array(256);for(let x=0;x<256;x++)D[x]=Math.sin(2*Math.PI*10*x/256);const{psd:G,freqs:H}=K(D,256);let ce=0,ne=0;for(let x=1;x<G.length;x++)G[x]>ce&&(ce=G[x],ne=x);C("FFT: 10 Hz peak",Math.abs(H[ne]-10)<2)}{const y=new Float64Array(256);for(let D=0;D<256;D++)y[D]=Math.sin(2*Math.PI*10*D/256);const F=te(y,256);C("BandPower: alpha dominant",F&&F.alpha>.5)}{const y=new Float64Array(100).fill(1);C("Biquad LPF: DC pass",Math.abs(ie(E(10,256).b,E(10,256).a,y)[50]-1)<.1)}{const y=[[390,1102.2],[1058,691.32]],F=390*1+1102.2*2,D=1058*1+691.32*2,[G,H]=Z(y,[[F],[D]].map(ce=>new Float64Array(ce)));C("mBLL: recovers HbO=1 HbR=2",Math.abs(G[0]-1)<.01&&Math.abs(H[0]-2)<.01)}{const y=new Float64Array(256);for(let F=0;F<256;F++)y[F]=Math.sin(2*Math.PI*1.5*F/64);C("PPG SQI: pulse signal",J(y,64)>.5)}{const y=new Float64Array([1,2,3,4,5]),F=new Float64Array([-1,-2,-3,-4,-5]);C("AntiCorr: SQI ~ 1",Math.abs(ae(y,F)-1)<.01)}return{passed:A.every(y=>y.ok),results:A}}static get PRESETS(){return{...f}}static get CHANNELS(){return{EEG_8:[...u],EEG_4:[...d],ACCGYRO:[...p],OPTICS_4:[...g[4]],OPTICS_8:[...g[8]],OPTICS_16:[...g[16]]}}static get SCALES(){return{EEG:r,OPTICS:o,ACC:a,GYRO:l,DC_OFFSET:c}}static get UUIDS(){return{SERVICE:65165,CONTROL:t,EEG_DATA:n,OTHER_DATA:s}}static get isSupported(){return typeof navigator<"u"&&!!navigator.bluetooth}}function Oe(k){return Array.from(k).map(A=>A.toString(16).padStart(2,"0").toUpperCase()).join(" ")}i.AthenaDevice=Te})(typeof window<"u"?window:typeof globalThis<"u"?globalThis:void 0);function Xl(i){let e=1;for(;e<i;)e<<=1;return e}function Fr(i,e){const t=i.length;for(let n=1,s=0;n<t;n++){let r=t>>1;for(;s&r;)s^=r,r>>=1;if(s^=r,n<s){let o=i[n];i[n]=i[s],i[s]=o,o=e[n],e[n]=e[s],e[s]=o}}for(let n=2;n<=t;n<<=1){const s=-2*Math.PI/n,r=Math.cos(s),o=Math.sin(s);for(let a=0;a<t;a+=n){let l=1,c=0;const h=n>>1;for(let u=0;u<h;u++){const d=a+u+h,p=i[d]*l-e[d]*c,g=i[d]*c+e[d]*l;i[d]=i[a+u]-p,e[d]=e[a+u]-g,i[a+u]+=p,e[a+u]+=g;const _=l*r-c*o;c=l*o+c*r,l=_}}}}function Xm(i,e){const t=i.length,n=Xl(t),s=new Float64Array(n),r=new Float64Array(n);for(let c=0;c<t;c++)s[c]=i[c]*(.5-.5*Math.cos(2*Math.PI*c/(t-1)));Fr(s,r);const o=(n>>1)+1,a=new Float64Array(o),l=new Float64Array(o);for(let c=0;c<o;c++)a[c]=s[c]*s[c]+r[c]*r[c],l[c]=c*e/n;return{psd:a,freqs:l,N:n}}function Ym(i,e,t,n){const s=i.length,r=Xl(s),o=new Float64Array(r),a=new Float64Array(r);for(let p=0;p<s;p++)o[p]=i[p];Fr(o,a);const l=Math.max(1,Math.floor(t*r/e)),c=Math.min(r>>1,Math.ceil(n*r/e)),h=new Float64Array(r),u=new Float64Array(r);for(let p=l;p<=c;p++)h[p]=2*o[p],u[p]=2*a[p];for(let p=0;p<r;p++)u[p]=-u[p];Fr(h,u);const d=new Float64Array(s);for(let p=0;p<s;p++){const g=h[p]/r,_=-u[p]/r;d[p]=Math.atan2(_,g)}return d}const za={delta:[1,4],theta:[4,8],alpha:[8,13],beta:[13,30],gamma:[30,50]};class gr{constructor(e=256){this.fs=e}analyzeChannel(e){if(e.length<64)return null;const t=e.length;let n=0;for(let c=0;c<t;c++)n+=e[c];n/=t;const s=new Float64Array(t);for(let c=0;c<t;c++)s[c]=e[c]-n;const{psd:r,freqs:o}=Xm(s,this.fs),a={},l=o.length>1?o[1]-o[0]:1;for(const[c,[h,u]]of Object.entries(za)){let d=0;for(let p=0;p<o.length;p++)o[p]>=h&&o[p]<u&&(d+=r[p]);a[c]=d*l/e.length}return a}static toBandPowerResult(e){const t=e.delta??0,n=e.theta??0,s=e.alpha??0,r=e.beta??0,o=e.gamma??0,a=t+n+s+r+o||1e-9,l=s>1e-9?n/s:0,c=o>1e-9?r/o:0;return{delta:t,theta:n,alpha:s,beta:r,gamma:o,deltaRel:t/a,thetaRel:n/a,alphaRel:s/a,betaRel:r/a,gammaRel:o/a,thetaAlphaRatio:l,betaGammaRatio:c,overallCoherence:0}}static average(e){const t=e.filter(s=>s!==null);if(t.length===0)return null;const n={};for(const s of Object.keys(za)){let r=0;for(const o of t)r+=o[s]??0;n[s]=r/t.length}return n}}const jm=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]],$m=[[4,8],[8,13]];class Km{constructor(e=256,t=.25){M(this,"smoothed",0);this.fs=e,this.smoothing=t}compute(e){if(e.length<4||e.some(o=>o.length<64))return this.smoothed;let t=0,n=0;for(const[o,a]of $m){const l=e.map(h=>Ym(h,this.fs,o,a)),c=Math.min(...l.map(h=>h.length));for(const[h,u]of jm){let d=0,p=0;for(let _=0;_<c;_++){const m=l[h][_]-l[u][_];d+=Math.cos(m),p+=Math.sin(m)}const g=Math.sqrt(d*d+p*p)/c;t+=g,n++}}const s=n>0?t/n:0,r=Math.min(1,Math.max(0,(s-.1)/.75));return this.smoothed+=(r-this.smoothed)*this.smoothing,this.smoothed}reset(){this.smoothed=0}}function ka(i,e,t){return Math.max(e,Math.min(t,i))}class Zm{constructor(){M(this,"lastIndex",-1);M(this,"stableSince",0)}classifyState(e){const t=e.thetaAlphaRatio,n=e.betaRel,s=e.gammaRel;return n+s>.55?0:n+s>.42?1:t<.6?2:t<1?3:t<1.6?4:5}mapStateToOffset(e){switch(e){case 0:return 0;case 1:return 1;case 2:return 3;case 3:return 4;case 4:return 6;case 5:return 8}}prescribe(e,t,n){const s=this.classifyState(e),r=t*9;let o=this.mapStateToOffset(s);n<.3&&(o=ka(o,0,2));const a=ka(r+o,0,26);return a===this.lastIndex?(this.stableSince=0,a):(this.stableSince++,(this.stableSince>=2||this.lastIndex<0)&&(this.lastIndex=a,this.stableSince=0),this.lastIndex)}reset(){this.lastIndex=-1,this.stableSince=0}}const Jm=(i,e,t)=>Math.max(e,Math.min(t,i)),Qm=6,eg=32,tg=3,Ha=1e-6;class ng{constructor(){M(this,"mags",[]);M(this,"baseline",null)}push(e,t,n){const s=Math.sqrt(e*e+t*t+n*n),r=performance.now();this.mags.push({t:r,m:s});const o=r-Qm*1e3;for(;this.mags.length&&this.mags[0].t<o;)this.mags.shift()}std(){if(this.mags.length<eg)return null;let e=0;for(const n of this.mags)e+=n.m;e/=this.mags.length;let t=0;for(const n of this.mags)t+=(n.m-e)*(n.m-e);return Math.sqrt(t/this.mags.length)}captureBaseline(){const e=this.std();e!=null&&(this.baseline=Math.max(e,Ha))}get hasBaseline(){return this.baseline!=null}settledness(){const e=this.std();if(e==null||this.baseline==null)return null;const t=this.baseline/Math.max(e,Ha);return Jm((t-1)/(tg-1),0,1)}}function Or(){return{delta:0,theta:0,alpha:0,beta:0,gamma:0,deltaRel:0,thetaRel:0,alphaRel:0,betaRel:0,gammaRel:0,thetaAlphaRatio:0,betaGammaRatio:0,overallCoherence:0}}const Ga=256,Va=256,ig=4,Wa=1e3,Ai=["p1041","p1042","p1044","p1035","p1043"],qa="aetheria-muse-preset";class eo{constructor(e){M(this,"device",null);M(this,"buffers",[[],[],[],[]]);M(this,"latest",null);M(this,"quality",{tp9:0,af7:0,af8:0,tp10:0});M(this,"analyzer",new gr(Ga));M(this,"coherence",new Km(Ga));M(this,"prescriber",new Zm);M(this,"stillness",new ng);M(this,"stillnessValue",0);M(this,"bands",Or());M(this,"coherenceScore",0);M(this,"prescribedIndex",0);M(this,"regime",0);M(this,"connected",!1);M(this,"timer",null);M(this,"listeners",new Map);M(this,"opticsPackets",0);M(this,"lastLog","");M(this,"calibrating",!1);M(this,"calibProgress",0);M(this,"calibUntil",0);M(this,"calibDurationMs",54e3);this.freqTable=e}static get isSupported(){return typeof navigator<"u"&&!!navigator.bluetooth}setRegime(e){this.regime=e,this.prescriber.reset()}get preset(){try{const e=localStorage.getItem(qa);if(e&&Ai.includes(e))return e}catch{}return Ai[0]}cyclePreset(){const e=Ai.indexOf(this.preset),t=Ai[(e+1)%Ai.length];try{localStorage.setItem(qa,t)}catch{}return t}async connect(){if(!eo.isSupported||!window.AthenaDevice)return console.warn("[Aetheria] Web Bluetooth unavailable — use Manual Mode."),!1;this.device&&this.disconnect(),this.opticsPackets=0,this.lastLog="";try{return this.device=new window.AthenaDevice({preset:this.preset,dcOffset:!0,processInterval:1e3,onEEG:e=>this.onEEG(e),onAccGyro:e=>this.onAccGyro(e),onOptics:e=>{this.opticsPackets=e.count},onStatus:e=>this.onStatus(e),onLog:(e,t)=>{e!=="rx"&&e!=="tx"&&(this.lastLog=t)}}),await this.device.connect(),await this.device.startStream(),this.connected=!0,this.startPipeline(),this.emit("connected"),!0}catch(e){return console.error("[Aetheria] Muse connect failed:",e),this.connected=!1,!1}}getDiagnostics(){return{preset:this.device?.preset??this.preset,opticsMode:this.device?.opticsMode??null,opticsPackets:this.device?.counts.optics??this.opticsPackets,ppgStreaming:this.device?.ppg!=null,fnirsStreaming:this.device?.fnirs!=null,lastLog:this.lastLog}}disconnect(){this.stopPipeline(),this.device&&(this.device.disconnect().catch(()=>{}),this.device=null),this.connected=!1,this.emit("disconnected")}get isConnected(){return this.connected}get connectionQuality(){const e=this.quality;return(e.tp9+e.af7+e.af8+e.tp10)/4}getChannelQuality(){return{...this.quality}}startCalibration(e=54){this.calibrating=!0,this.calibProgress=0,this.calibDurationMs=e*1e3,this.calibUntil=performance.now()+this.calibDurationMs}get isCalibrating(){return this.calibrating}get calibrationProgress(){return this.calibProgress}getLatestSample(){return this.latest}getBandPowers(){return this.bands}getCoherenceScore(){return this.coherenceScore}getStillness(){return this.stillnessValue}get hasStillness(){return this.stillness.hasBaseline}getMetrics(){const e=this.device?.ppg??null,t=this.device?.fnirs??null;return{connected:this.connected,quality:this.quality,deltaRel:this.bands.deltaRel,thetaRel:this.bands.thetaRel,alphaRel:this.bands.alphaRel,betaRel:this.bands.betaRel,gammaRel:this.bands.gammaRel,thetaAlphaRatio:this.bands.thetaAlphaRatio,betaGammaRatio:this.bands.betaGammaRatio,plvCoherence:this.coherenceScore,stillness:this.stillnessValue,heartRate:e?.heartRate??null,hbo:t?.lastHbO??null,hbr:t?.lastHbR??null,battery:this.device?.battery??null}}getPrescribedFrequencyIndex(){return this.prescribedIndex}getPrescribedFrequencyHz(){return this.freqTable.hz(this.prescribedIndex)}on(e,t){const n=this.listeners.get(e)??[];n.push(t),this.listeners.set(e,n)}emit(e,t){for(const n of this.listeners.get(e)??[])n(t)}onStatus(e){e==="disconnected"&&this.connected&&(this.connected=!1,this.stopPipeline(),this.emit("disconnected"))}onEEG(e){const t=[e.labels.indexOf("TP9"),e.labels.indexOf("AF7"),e.labels.indexOf("AF8"),e.labels.indexOf("TP10")];for(const n of e.samples)for(let s=0;s<4;s++){const r=t[s]>=0?n[t[s]]:0,o=Math.abs(r)>Wa?0:r;this.buffers[s].push(o),this.buffers[s].length>Va&&this.buffers[s].shift()}}onAccGyro(e){for(const t of e.samples)this.stillness.push(t[0]??0,t[1]??0,t[2]??0)}startPipeline(){this.timer===null&&(this.timer=window.setInterval(()=>this.process(),1e3/ig))}stopPipeline(){this.timer!==null&&(clearInterval(this.timer),this.timer=null)}process(){if(this.buffers.some(h=>h.length<Va))return;this.updateQuality();const e=this.analyzer.analyzeChannel(this.buffers[1]),t=this.analyzer.analyzeChannel(this.buffers[2]),n=gr.average([e,t]);n&&(this.bands=gr.toBandPowerResult(n)),this.stillness.hasBaseline||this.stillness.captureBaseline();const s=this.stillness.settledness();s!=null&&(this.stillnessValue+=(s-this.stillnessValue)*.4);const r=this.coherence.compute(this.buffers);this.bands.overallCoherence=r;const o=Math.abs(r-this.coherenceScore)>.001;this.coherenceScore=r;const a=this.prescriber.prescribe(this.bands,this.regime,r),l=a!==this.prescribedIndex;this.prescribedIndex=a;const c=this.buffers;if(this.latest={tp9:c[0][c[0].length-1],af7:c[1][c[1].length-1],af8:c[2][c[2].length-1],tp10:c[3][c[3].length-1],timestamp:performance.now(),quality:this.quality},this.calibrating){const h=this.calibUntil-performance.now();this.calibProgress=Math.min(1,1-h/this.calibDurationMs),h<=0&&(this.calibrating=!1,this.calibProgress=1)}this.emit("eegData",this.bands),o&&this.emit("coherenceChanged",r),l&&this.emit("frequencyChanged",a)}updateQuality(){const e=["tp9","af7","af8","tp10"];for(let t=0;t<4;t++){const n=this.buffers[t];let s=0;for(const c of n)s+=c;s/=n.length;let r=0,o=0;for(const c of n)r+=(c-s)*(c-s),(Math.abs(c)>=Wa||c===0)&&o++;const a=Math.sqrt(r/n.length);let l=0;a>2&&a<200&&(l=Math.min(1,(a-2)/30)),l*=1-Math.min(1,o/n.length),this.quality[e[t]]=l}}}class sg{constructor(){M(this,"coherence",.15);M(this,"regimeBase",0);M(this,"selectedOffset",0);M(this,"listeners",new Map);M(this,"bands",Or());M(this,"isConnected",!1);M(this,"connectionQuality",1)}setRegime(e){this.regimeBase=e*9}selectFrequency(e){const t=Math.max(0,Math.min(8,Math.round(e)));t!==this.selectedOffset&&(this.selectedOffset=t,this.emit("frequencyChanged",this.getPrescribedFrequencyIndex()))}update(e,t,n){let s;n&&!t?s=.92:t?s=.42:s=.6;const r=s>this.coherence?.18:.45,o=this.coherence;this.coherence+=(s-this.coherence)*Math.min(1,e*r);const a=this.coherence;this.bands={...Or(),alphaRel:.2+.4*a,thetaRel:.15+.3*a,betaRel:.4*(1-a),gammaRel:.1*(1-a),deltaRel:.1,thetaAlphaRatio:.5+a,betaGammaRatio:1,overallCoherence:a},Math.abs(a-o)>.001&&this.emit("coherenceChanged",a),this.emit("eegData",this.bands)}getCoherenceScore(){return this.coherence}getBandPowers(){return this.bands}getPrescribedFrequencyIndex(){return this.regimeBase+this.selectedOffset}getPrescribedFrequencyHz(){return 0}on(e,t){const n=this.listeners.get(e)??[];n.push(t),this.listeners.set(e,n)}emit(e,t){for(const n of this.listeners.get(e)??[])n(t)}}class rg{constructor(){M(this,"channels",new Map)}publish(e,t){for(const n of this.channels.get(e)??[])n(t)}subscribe(e,t){const n=this.channels.get(e)??[];return n.push(t),this.channels.set(e,n),()=>{const s=this.channels.get(e);s&&this.channels.set(e,s.filter(r=>r!==t))}}}const Xa="heart_rate",og="heart_rate_measurement";class ag{constructor(e){this.bus=e,this._status="disconnected",this._contactQuality=0,this._device=null}get status(){return this._status}get isConnected(){return this._status==="streaming"}get contactQuality(){return this._contactQuality}get ecgActive(){return!1}_setStatus(e){const t=this._status;this._status=e,this.bus.publish("Aetheria_State",{type:"sensor_status",sensor:"Polar H10",status:e,previousStatus:t})}_log(e,t="sensor"){console.log("H10:",e),this.bus.publish("Aetheria_State",{type:"log",logType:t,message:`H10: ${e}`})}async connect(){if(!(this._status==="streaming"||this._status==="connecting")){this._setStatus("connecting");try{this._device=await navigator.bluetooth.requestDevice({filters:[{namePrefix:"Polar H10"}],optionalServices:[Xa]}),this._device.addEventListener("gattserverdisconnected",()=>{this._setStatus("disconnected"),this._log("Disconnected")});const n=await(await(await this._device.gatt.connect()).getPrimaryService(Xa)).getCharacteristic(og);n.addEventListener("characteristicvaluechanged",s=>{this._parseHR(s.target.value)}),await n.startNotifications(),this._log("HR + R-R streaming"),this._setStatus("streaming")}catch(e){throw this._log("Connection failed: "+e.message,"error"),this._setStatus("error"),e}}}async disconnect(){this._device&&this._device.gatt.connected&&this._device.gatt.disconnect(),this._device=null,this._setStatus("disconnected")}_parseHR(e){const t=e.getUint8(0);let n=1,s;t&1?(s=e.getUint16(n,!0),n+=2):(s=e.getUint8(n),n+=1);const r=(t&6)===6;if(this._contactQuality=r?1:0,t&8&&(n+=2),this.bus.publish("Aetheria_RR",{hr_bpm:s,rr_ms:null,source:"polar_h10"}),t&16)for(;n+1<e.byteLength;){const o=e.getUint16(n,!0)/1024*1e3;n+=2,o>=200&&o<=2500&&(this._contactQuality=1,this.bus.publish("Aetheria_RR",{rr_ms:o,hr_bpm:s,source:"polar_h10"}))}}}const lg=45,cg=8,hg=1.5,ug=300,dg=2e3,fg=(i,e,t)=>Math.max(e,Math.min(t,i));class to{constructor(){M(this,"bus",new rg);M(this,"device");M(this,"times",[]);M(this,"rr",[]);M(this,"tAccum",0);M(this,"bpm",0);M(this,"settledness",0);M(this,"baseline",null);M(this,"baselinePending",!1);M(this,"connected",!1);M(this,"recomputeAccum",0);M(this,"listeners",new Map);this.device=new ag(this.bus),this.bus.subscribe("Aetheria_RR",e=>this.onRR(e)),this.bus.subscribe("Aetheria_State",e=>this.onState(e))}static get isSupported(){return typeof navigator<"u"&&!!navigator.bluetooth}async connect(){if(!to.isSupported)return!1;try{return await this.device.connect(),this.connected=this.device.isConnected,this.connected&&this.emit("connected"),this.connected}catch(e){return console.error("[Aetheria] Polar H10 connect failed:",e),!1}}disconnect(){this.device.disconnect().catch(()=>{}),this.connected=!1,this.emit("disconnected")}get isConnected(){return this.connected&&this.device.isConnected}get contactQuality(){return this.device.contactQuality}get heartRate(){return this.bpm}getSettledness(){return this.settledness}getRmssd(){return this.computeRmssd()}get baselineRmssd(){return this.baseline}get hasBaseline(){return this.baseline!=null}beginBaseline(){this.baseline=null,this.baselinePending=!0}captureBaseline(){const e=this.computeRmssd();e!=null&&(this.baseline=e,this.baselinePending=!1)}finalizeBaseline(){this.captureBaseline(),this.baselinePending=!1}on(e,t){const n=this.listeners.get(e)??[];n.push(t),this.listeners.set(e,n)}emit(e){for(const t of this.listeners.get(e)??[])t()}onState(e){const t=e;t?.type==="sensor_status"&&t.status==="disconnected"&&this.connected&&(this.connected=!1,this.emit("disconnected"))}onRR(e){if(typeof e.hr_bpm=="number"&&e.hr_bpm>0&&(this.bpm=e.hr_bpm),e.rr_ms==null||e.rr_ms<ug||e.rr_ms>dg)return;this.tAccum+=e.rr_ms/1e3,this.times.push(this.tAccum),this.rr.push(e.rr_ms);const t=this.tAccum-lg;for(;this.times.length&&this.times[0]<t;)this.times.shift(),this.rr.shift()}update(e){if(this.recomputeAccum+=e,this.recomputeAccum<1)return;this.recomputeAccum=0,this.baseline==null&&!this.baselinePending&&this.captureBaseline();const t=this.computeSettledness();this.settledness+=(t-this.settledness)*.4}computeRmssd(){if(this.rr.length<cg)return null;let e=0,t=0;for(let n=1;n<this.rr.length;n++){const s=this.rr[n]-this.rr[n-1];e+=s*s,t++}return t?Math.sqrt(e/t):null}computeSettledness(){const e=this.computeRmssd();return e==null||!this.baseline?this.settledness:fg((e/this.baseline-1)/(hg-1),0,1)}}class pg{constructor(e){M(this,"el");M(this,"visible",!1);this.el=document.createElement("div"),this.el.style.cssText=["position:fixed","top:8px","left:168px","z-index:50","font:11px/1.45 ui-monospace,Consolas,monospace","color:#9ad6c8","background:rgba(8,5,16,0.85)","border:1px solid rgba(154,214,200,0.25)","border-radius:6px","padding:8px 10px","min-width:260px","pointer-events:none","white-space:pre","display:none"].join(";"),e.appendChild(this.el),document.addEventListener("keydown",t=>{t.code==="Backquote"&&this.toggle()})}toggle(){this.visible=!this.visible,this.el.style.display=this.visible?"block":"none"}update(e){if(!this.visible)return;const t=(s,r=10)=>{const o=Math.round(Math.max(0,Math.min(1,s))*r);return"█".repeat(o)+"·".repeat(r-o)},n=(s,r=2)=>s==null?"—":s.toFixed(r);this.el.textContent=["AETHERIA TUNING HUD            (` hide)","",`GATE  ${t(e.settle)} ${(e.settle*100).toFixed(0)}%  via ${e.settleSource}`,`  threshold ${e.threshold.toFixed(2)}  ${e.settle>=e.threshold?"OPEN":"below"}`,`  meditate  ${e.inMeditation?"IN ":"out"}  sustain ${e.sustain.toFixed(1)}/${e.sustainReq}s`,`  dwell ${e.dwell.toFixed(0)}/${e.maxDwell}s  gate ${(e.gateProgress*100).toFixed(0)}%  locks ${e.puzzlesSolved}/${e.puzzleTotal}`,"",`POLAR ${e.polarConnected?"on ":"off"}  hr ${n(e.hr,0)} bpm`,`  rmssd ${n(e.rmssd,0)} / base ${n(e.rmssdBaseline,0)} ms  settle ${n(e.hrvSettle)}`,"",`MUSE  ${e.museConnected?"on ":"off"}  q ${e.quality.tp9.toFixed(1)} ${e.quality.af7.toFixed(1)} ${e.quality.af8.toFixed(1)} ${e.quality.tp10.toFixed(1)}`,`  still ${n(e.stillness)}  plv ${n(e.plv)}  θ/α ${n(e.thetaAlpha)}  β/γ ${n(e.betaGamma)}`,`  δ${n(e.bands.delta)} θ${n(e.bands.theta)} α${n(e.bands.alpha)} β${n(e.bands.beta)} γ${n(e.bands.gamma)}`,`  fNIRS HbO ${n(e.hbo,1)} HbR ${n(e.hbr,1)}  batt ${n(e.battery,0)}%`,"",`FREQ #${e.freqIndex} ${e.regimePos}  true ${e.trueHz.toFixed(0)}Hz`,`  felt ${e.feltHz.toFixed(1)}Hz  sub ${e.subHz.toFixed(2)}Hz ${e.subBand}`].join(`
`)}}const cs="http://www.w3.org/2000/svg";class mg{constructor(){M(this,"el");M(this,"petals",[]);M(this,"core");M(this,"progressRing");M(this,"ringCirc");M(this,"R",46);const e=document.createElementNS(cs,"svg");e.setAttribute("viewBox","0 0 140 140"),e.setAttribute("width","150"),e.setAttribute("height","150"),e.style.cssText="position:fixed;left:50%;bottom:18px;transform:translateX(-50%);overflow:visible;",this.el=e;const t=70,n=70,s=22,r=[[t,n]];for(let o=0;o<6;o++){const a=o/6*Math.PI*2-Math.PI/2;r.push([t+Math.cos(a)*s,n+Math.sin(a)*s])}for(const[o,a]of r){const l=document.createElementNS(cs,"circle");l.setAttribute("cx",String(o)),l.setAttribute("cy",String(a)),l.setAttribute("r",String(s)),l.setAttribute("fill","none"),l.setAttribute("stroke","#b48ee8"),l.setAttribute("stroke-width","1"),l.style.opacity="0",this.petals.push(l),e.appendChild(l)}this.ringCirc=2*Math.PI*this.R,this.progressRing=document.createElementNS(cs,"circle"),this.progressRing.setAttribute("cx",String(t)),this.progressRing.setAttribute("cy",String(n)),this.progressRing.setAttribute("r",String(this.R)),this.progressRing.setAttribute("fill","none"),this.progressRing.setAttribute("stroke","#9ad6c8"),this.progressRing.setAttribute("stroke-width","2"),this.progressRing.setAttribute("stroke-linecap","round"),this.progressRing.setAttribute("transform",`rotate(-90 ${t} ${n})`),this.progressRing.style.strokeDasharray=String(this.ringCirc),this.progressRing.style.strokeDashoffset=String(this.ringCirc),e.appendChild(this.progressRing),this.core=document.createElementNS(cs,"circle"),this.core.setAttribute("cx",String(t)),this.core.setAttribute("cy",String(n)),this.core.setAttribute("r","4"),this.core.setAttribute("fill","#e8e0f0"),e.appendChild(this.core)}update(e,t){const n=Math.max(0,Math.min(1,e));this.petals.forEach((s,r)=>{const o=r===0?0:(r-1)/6,a=Math.max(0,Math.min(1,(n-o)*3));s.style.opacity=String(.15+a*.85),s.setAttribute("stroke-width",String(.6+a*1.6))}),this.core.setAttribute("r",String(3+n*4)),this.core.style.filter=`drop-shadow(0 0 ${2+n*10}px #b48ee8)`,this.progressRing.style.strokeDashoffset=String(this.ringCirc*(1-Math.max(0,Math.min(1,t)))),this.progressRing.style.opacity=t>.001?"1":"0.15"}}const Ya="http://www.w3.org/2000/svg",ja={GUT:[0,40],HEART:[90,160],HEAD:[250,300]};class gg{constructor(){M(this,"el");M(this,"nodes",[]);M(this,"activeIndex",0);M(this,"t",0);const e=document.createElementNS(Ya,"svg");e.setAttribute("viewBox","0 0 220 60"),e.setAttribute("width","240"),e.setAttribute("height","64"),e.style.cssText="position:fixed;left:50%;bottom:168px;transform:translateX(-50%);overflow:visible;",this.el=e;for(let t=0;t<9;t++){const n=Math.PI-t/8*Math.PI,s=110+Math.cos(n)*100,r=52-Math.sin(n)*30,o=document.createElementNS(Ya,"circle");o.setAttribute("cx",String(s)),o.setAttribute("cy",String(r)),o.setAttribute("r","4"),o.setAttribute("fill","#444"),this.nodes.push(o),e.appendChild(o)}}setRegime(e){const[t,n]=ja[e]??ja.GUT;this.nodes.forEach((s,r)=>{const o=t+(n-t)*r/8;s.dataset.hue=String(o),s.setAttribute("fill",`hsl(${o} 60% 45%)`)})}setActive(e){this.activeIndex=(e%9+9)%9}update(e){this.t+=e;const t=.5+.5*Math.sin(this.t*4);this.nodes.forEach((n,s)=>{const r=n.dataset.hue??"0";s===this.activeIndex?(n.setAttribute("r",String(5+t*2.5)),n.setAttribute("fill",`hsl(${r} 85% ${55+t*20}%)`),n.style.filter=`drop-shadow(0 0 ${4+t*6}px hsl(${r} 90% 60%))`):(n.setAttribute("r","4"),n.setAttribute("fill",`hsl(${r} 50% 40%)`),n.style.filter="none")})}}class _g{constructor(){M(this,"el");M(this,"icon");M(this,"label");M(this,"heart");this.el=document.createElement("div"),this.el.style.cssText=["position:fixed","top:14px","right:16px","display:flex","align-items:center","gap:8px",'font:12px/1 "Segoe UI",system-ui,sans-serif',"color:#cfc2e8","opacity:0.85"].join(";"),this.icon=document.createElement("span"),this.icon.textContent="🧠",this.icon.style.cssText="font-size:18px;filter:grayscale(1);transition:filter .3s,opacity .3s;",this.label=document.createElement("span"),this.label.textContent="Manual Mode",this.heart=document.createElement("span"),this.heart.style.cssText="display:none;margin-left:10px;color:#e88ea8;",this.el.append(this.icon,this.label,this.heart)}updateHeart(e,t,n){if(!e){this.heart.style.display="none";return}this.heart.style.display="inline";const s=t>.66?" · settled":t>.33?" · settling":"";this.heart.textContent=`❤ ${n>0?Math.round(n)+" bpm":"heart"}${s}`,this.heart.style.opacity=String(.6+t*.4)}update(e,t,n=!1){if(!e){this.icon.style.filter="grayscale(1)",this.icon.style.opacity="0.6",this.label.textContent="Manual Mode";return}if(this.icon.style.opacity="1",n){this.icon.style.filter="hue-rotate(40deg)",this.label.textContent="Calibrating…";const s=performance.now()/500%2;this.icon.style.opacity=s<1?"1":"0.5";return}t>.6?(this.icon.style.filter="hue-rotate(80deg) saturate(1.4)",this.label.textContent="Muse · strong"):t>.3?(this.icon.style.filter="hue-rotate(20deg) saturate(1.3)",this.label.textContent="Muse · weak"):(this.icon.style.filter="saturate(2) brightness(0.8)",this.label.textContent="Muse · poor signal")}}const _r="http://www.w3.org/2000/svg",vg={1:[1,0],2:[0,2],3:[2,1],4:[2,2],5:[1,1],6:[0,0],7:[0,1],8:[2,0],9:[1,2]},$a={GUT:0,HEART:1,HEAD:2},Ka={GUT:"#ff5a3c",HEART:"#56c878",HEAD:"#b48ee8"},xg=17,yg=9,Mg=40,Sg=80,bg=150;class Eg{constructor(e){M(this,"el");M(this,"svg");M(this,"circles",[]);M(this,"nodes",[]);M(this,"mode","corner");M(this,"bloomIndex",-1);M(this,"bloomT",0);M(this,"currentIndex",0);M(this,"completed",new Set);M(this,"unlocked",new Set);M(this,"settledness",0);M(this,"updateAccum",0);M(this,"onSelectNode");M(this,"onToggle");this.freqTable=e,this.el=document.createElement("div"),this.el.style.cssText=["position:fixed","top:14px","left:14px","z-index:18","transition:all 0.4s ease","pointer-events:none"].join(";"),this.svg=document.createElementNS(_r,"svg"),this.svg.setAttribute("viewBox","0 0 160 220"),this.el.appendChild(this.svg),this.el.addEventListener("pointerup",t=>{const n=t.target,s=n instanceof SVGCircleElement?n.dataset.index:void 0;if(s!==void 0){const r=Number(s);if(this.mode==="hero"&&this.unlocked.has(r)){this.onSelectNode?.(r);return}}this.onToggle?.()}),this.computeNodes(),this.drawEdges(),this.drawNodes(),this.applyMode()}computeNodes(){for(let e=0;e<27;e++){const t=this.freqTable.get(e),n=$a[t.regime]??0,[s,r]=vg[t.regime_position]??[1,1],o=Sg+(s-r)*xg,a=bg+(s+r)*yg-n*Mg;this.nodes.push({index:e,x:o,y:a,regime:t.regime,isSource:!!t.is_source,isPillar:t.regime_position===5})}}line(e,t,n,s,r){const o=document.createElementNS(_r,"line");o.setAttribute("x1",String(e.x)),o.setAttribute("y1",String(e.y)),o.setAttribute("x2",String(t.x)),o.setAttribute("y2",String(t.y)),o.setAttribute("stroke",n),o.setAttribute("stroke-width",String(s)),o.setAttribute("opacity",String(r)),this.svg.appendChild(o)}drawEdges(){const e=[6,8,4,2],t=(n,s)=>this.nodes.find(r=>$a[r.regime]===n&&this.freqTable.get(r.index).regime_position===s);for(let n=0;n<3;n++)for(let s=0;s<4;s++){const r=t(n,e[s]),o=t(n,e[(s+1)%4]);r&&o&&this.line(r,o,"#6a5a8a",.6,.35)}for(const n of e)for(let s=0;s<2;s++){const r=t(s,n),o=t(s+1,n);r&&o&&this.line(r,o,"#6a5a8a",.6,.35)}for(let n=0;n<2;n++){const s=t(n,5),r=t(n+1,5);s&&r&&this.line(s,r,"#e8d24a",1.4,.8)}}drawNodes(){for(const e of this.nodes){const t=document.createElementNS(_r,"circle");t.setAttribute("cx",String(e.x)),t.setAttribute("cy",String(e.y)),t.setAttribute("r",e.isSource?"3.4":"2.6"),t.setAttribute("fill",Ka[e.regime]),t.dataset.index=String(e.index),t.style.cursor="pointer",this.circles.push(t),this.svg.appendChild(t)}}setMode(e){this.mode=e,this.applyMode()}toggleHero(){this.setMode(this.mode==="hero"?"corner":"hero")}get isHero(){return this.mode==="hero"}applyMode(){this.mode==="corner"?(this.svg.setAttribute("width","140"),this.svg.setAttribute("height","192"),this.el.style.top="14px",this.el.style.left="14px",this.el.style.transform="none",this.el.style.pointerEvents="auto",this.el.style.cursor="pointer",this.el.style.background="none",this.el.style.padding="0"):(this.svg.setAttribute("width","380"),this.svg.setAttribute("height","520"),this.el.style.top="50%",this.el.style.left="50%",this.el.style.transform="translate(-50%,-50%)",this.el.style.pointerEvents="auto",this.el.style.background="radial-gradient(circle, rgba(20,12,34,0.85), rgba(8,5,16,0.95))",this.el.style.padding="12px",this.el.style.borderRadius="16px")}setProgress(e,t,n){this.currentIndex=e,this.completed=t,this.unlocked=n}bloom(e){this.bloomIndex=e,this.bloomT=0}update(e,t){if(this.settledness=t,this.bloomIndex>=0&&(this.bloomT+=e,this.bloomT>1.2&&(this.bloomIndex=-1)),this.updateAccum+=e,!(this.updateAccum<.05&&this.bloomIndex<0)){this.updateAccum=0;for(const n of this.nodes){const s=this.circles[n.index],r=n.index===this.currentIndex,o=this.completed.has(n.index),a=this.unlocked.has(n.index);let l=n.isSource?3.4:2.6,c=a?.95:.28,h=0;if(r){const u=.3+.7*this.settledness;l+=1.6*u,h=4+8*u,c=1}else o&&(c=1,h=2);if(n.index===this.bloomIndex){const u=Math.sin(this.bloomT/1.2*Math.PI);l+=4*u,h+=14*u}s.setAttribute("r",l.toFixed(2)),s.setAttribute("opacity",c.toFixed(2)),s.style.filter=h>0?`drop-shadow(0 0 ${h.toFixed(1)}px ${Ka[n.regime]})`:"none"}}}}const hs=.5,us=1;function vr(i,e,t,n,s,r){const o=[];return o.push({dur:t,from:hs,to:us,label:"Breathe in"}),n>0&&o.push({dur:n,from:us,to:us,label:"Hold"}),o.push({dur:s,from:us,to:hs,label:"Breathe out"}),r>0&&o.push({dur:r,from:hs,to:hs,label:"Hold"}),{name:i,tint:e,phases:o}}const Za={GUT:vr("Grounding breath","#e0a06a",4,0,6,0),HEART:vr("Resonance breath","#e87aa0",5.5,0,5.5,0),HEAD:vr("Even breath","#b48ee8",4,4,4,4)};class Tg{constructor(e){M(this,"el");M(this,"ring");M(this,"label");M(this,"name");M(this,"pattern",Za.HEART);M(this,"t",0);M(this,"opacity",0);M(this,"reduceMotion",!1);this.el=document.createElement("div"),this.el.id="breathing-guide",this.el.style.cssText=["position:fixed","left:50%","top:42%","transform:translate(-50%,-50%)","pointer-events:none","z-index:14","opacity:0","transition:opacity 0.8s ease","display:flex","flex-direction:column","align-items:center","gap:14px"].join(";"),this.ring=document.createElement("div"),this.ring.style.cssText=["width:150px","height:150px","border-radius:50%","border:2px solid rgba(232,224,240,0.85)","box-shadow:0 0 38px rgba(180,142,232,0.5), inset 0 0 26px rgba(180,142,232,0.35)","background:radial-gradient(circle, rgba(180,142,232,0.18), rgba(180,142,232,0.02))"].join(";"),this.label=document.createElement("div"),this.label.style.cssText='font:300 1.15rem "Segoe UI",system-ui,sans-serif;color:#f0eaf8;letter-spacing:0.1em;text-shadow:0 1px 6px rgba(0,0,0,0.7)',this.name=document.createElement("div"),this.name.style.cssText='font:300 0.78rem "Segoe UI",sans-serif;color:#c8b8e0;opacity:0.7;letter-spacing:0.14em;text-transform:uppercase',this.el.append(this.ring,this.label,this.name),e.appendChild(this.el)}setRegime(e){const t=Za[e];t&&t!==this.pattern&&(this.pattern=t,this.t=0,this.ring.style.borderColor=t.tint,this.name.textContent=t.name)}setReduceMotion(e){this.reduceMotion=e}update(e,t){const n=t?1:0;if(this.opacity+=(n-this.opacity)*Math.min(1,e*3),this.el.style.opacity=this.opacity.toFixed(3),!t){this.opacity<.04&&(this.t=0);return}this.t+=e;const s=this.pattern.phases.reduce((u,d)=>u+d.dur,0);let r=this.t%s,o=this.pattern.phases[0];for(const u of this.pattern.phases){if(r<u.dur){o=u;break}r-=u.dur}const a=o.dur>0?r/o.dur:1,l=.5-.5*Math.cos(Math.PI*a),c=o.from+(o.to-o.from)*l,h=this.reduceMotion?.92+.04*c:c;this.ring.style.transform=`scale(${h.toFixed(3)})`,this.label.textContent=o.label}}class wg{constructor(e,t){M(this,"mandala",new mg);M(this,"arc",new gg);M(this,"status",new _g);M(this,"breathing");M(this,"cube");M(this,"subtitle");M(this,"prompt");M(this,"puzzleCount");M(this,"banner");M(this,"setupBar");M(this,"subtitleTimer",0);M(this,"subtitlesEnabled",!0);M(this,"onConnectMuse");M(this,"onManualMode");M(this,"onConnectPolar");this.root=e,e.appendChild(this.mandala.el),e.appendChild(this.arc.el),e.appendChild(this.status.el),this.breathing=new Tg(e),this.cube=new Eg(t),e.appendChild(this.cube.el),this.subtitle=this.makeCenterText("","bottom:220px","1.05rem","#e8e0f0"),this.subtitle.style.maxWidth="46rem",this.subtitle.style.textAlign="center",this.subtitle.style.lineHeight="1.5",this.prompt=this.makeCenterText("","top:50%","1.1rem","#cfc2e8"),this.prompt.style.transform="translate(-50%,-50%)",this.prompt.style.textShadow="0 0 18px rgba(180,142,232,0.6)",this.prompt.style.opacity="0",this.puzzleCount=document.createElement("div"),this.puzzleCount.style.cssText='position:fixed;top:46px;right:16px;font:12px/1 "Segoe UI",sans-serif;color:#9ad6c8;opacity:0.8;',e.appendChild(this.puzzleCount),this.banner=this.makeCenterText("","top:38%","2rem","#fff"),this.banner.style.transform="translateX(-50%)",this.banner.style.textAlign="center",this.banner.style.opacity="0",this.banner.style.fontWeight="300",this.banner.style.letterSpacing="0.12em",this.banner.style.textShadow="0 0 28px rgba(180,142,232,0.8)",this.setupBar=this.buildSetupBar(),e.appendChild(this.setupBar)}makeCenterText(e,t,n,s){const r=document.createElement("div");return r.textContent=e,r.style.cssText=["position:fixed","left:50%","transform:translateX(-50%)",t,`font:300 ${n}/1.4 "Segoe UI",system-ui,sans-serif`,`color:${s}`,"pointer-events:none","transition:opacity 0.6s ease","text-shadow:0 1px 4px rgba(0,0,0,0.8)"].join(";"),this.root.appendChild(r),r}buildSetupBar(){const e=document.createElement("div");e.className="interactive",e.style.cssText=["position:fixed","left:50%","bottom:40px","transform:translateX(-50%)","display:flex","gap:14px","pointer-events:auto","z-index:15"].join(";");const t=(o,a)=>{const l=document.createElement("button");return l.textContent=o,l.style.cssText=["padding:10px 18px","border-radius:24px","border:1px solid rgba(180,142,232,0.5)",`background:${a?"rgba(180,142,232,0.22)":"rgba(20,12,34,0.6)"}`,"color:#e8e0f0",'font:300 0.95rem "Segoe UI",sans-serif',"letter-spacing:0.05em","cursor:pointer","backdrop-filter:blur(4px)"].join(";"),l},n=t("Connect Muse",!0),s=t("Enter in Manual Mode",!1),r=t("+ Polar H10  ❤",!1);return n.addEventListener("click",()=>this.onConnectMuse?.()),s.addEventListener("click",()=>this.onManualMode?.()),r.addEventListener("click",async()=>{if(!this.onConnectPolar)return;r.textContent="Pairing…",r.disabled=!0;const o=await this.onConnectPolar();r.textContent=o?"Polar H10  ✓":"+ Polar H10  ❤",r.disabled=!1}),e.append(n,s,r),e}hideSetupBar(){this.setupBar.style.display="none"}showSetupBar(){this.setupBar.style.display="flex"}setRegime(e){this.arc.setRegime(e),this.breathing.setRegime(e)}setReduceMotion(e){this.breathing.setReduceMotion(e)}set onSelectNode(e){this.cube.onSelectNode=e}set onToggleMap(e){this.cube.onToggle=e}toggleCube(){this.cube.toggleHero()}showCubeHero(){this.cube.setMode("hero")}hideCubeHero(){this.cube.setMode("corner")}get cubeIsHero(){return this.cube.isHero}bloomNode(e){this.cube.bloom(e)}setSubtitlesEnabled(e){this.subtitlesEnabled=e,e||(this.subtitle.style.opacity="0")}speak(e){this.subtitlesEnabled&&(this.subtitle.textContent=e,this.subtitle.style.opacity="1",this.subtitleTimer=7)}showCompletion(e){this.banner.innerHTML=`<div>The node is restored</div><div style="font-size:1rem;opacity:0.7;margin-top:0.5rem">${e}</div>`,this.banner.style.opacity="1"}hideCompletion(){this.banner.style.opacity="0"}update(e,t){this.mandala.update(t.coherence,t.meditationProgress),this.arc.setActive(t.freqIndex),this.arc.update(e),this.status.update(t.connected,t.quality,t.calibrating),this.status.updateHeart(t.heartConnected,t.heartCoherence,t.bpm),this.cube.setProgress(t.levelIndex,t.completed,t.unlocked),this.cube.update(e,t.coherence),this.breathing.update(e,t.breatheGuide),this.puzzleCount.textContent=`Resonance locks: ${t.puzzlesSolved}/${t.puzzleTotal}`,this.prompt.textContent="Enter Meditation  ·  M",this.prompt.style.opacity=t.nearMeditation?"0.9":"0",this.subtitleTimer>0&&(this.subtitleTimer-=e,this.subtitleTimer<=0&&(this.subtitle.style.opacity="0"))}}function Ag(i,e){return{levelIndex:i.index,levelName:i.level_name,regime:i.regime,frequencyHz:i.frequency_hz,playbackHz:i.playback_hz||i.frequency_hz,digitalRoot:i.digital_root,therapeuticTarget:i.therapeutic_target,solfeggioNote:i.solfeggio_note,primaryColor:i.primary_color,secondaryColor:i.secondary_color,ambientColor:i.ambient_color,fogDensity:e.fogDensity??.03,worldSeed:e.worldSeed,skyPreset:e.skyPreset,baseOscillatorAmplitude:e.baseOscillatorAmplitude??.25,binauralBeatOffset:i.binaural_offset_hz,ambientSoundscape:e.ambientSoundscape??"cave",coherenceThreshold:i.coherence_threshold,sustainedSeconds:i.sustained_seconds,minDwellSeconds:e.minDwellSeconds??20,maxDwellSeconds:e.maxDwellSeconds??Math.max(90,i.sustained_seconds*2.5),numFrequencyPuzzles:e.numFrequencyPuzzles??4,numCoherenceChallenges:e.numCoherenceChallenges??1}}class Cg{constructor(e,t){M(this,"levelIndex");M(this,"config");M(this,"currentCoherence",0);M(this,"coherenceThreshold");M(this,"timeInLevel",0);M(this,"isComplete",!1);M(this,"ctx");M(this,"sustainedCoherenceTimer",0);M(this,"requiredSustainedSeconds");M(this,"inMeditationSpace",!1);M(this,"completionReported",!1);M(this,"meditationDwell",0);M(this,"minDwellSeconds");M(this,"maxDwellSeconds");M(this,"completedBy",null);M(this,"onComplete");this.config=e,this.levelIndex=e.levelIndex,this.ctx=t,this.coherenceThreshold=e.coherenceThreshold,this.requiredSustainedSeconds=e.sustainedSeconds,this.minDwellSeconds=e.minDwellSeconds,this.maxDwellSeconds=e.maxDwellSeconds}update(e,t,n,s){this.timeInLevel+=e,this.processEEGState(s,n);const r=this.playerInMeditationSpace();r&&!this.inMeditationSpace?(this.inMeditationSpace=!0,this.onMeditationSpaceEntered()):r||(this.inMeditationSpace=!1),this.inMeditationSpace&&(this.meditationDwell+=e,n>=this.coherenceThreshold?this.sustainedCoherenceTimer+=e:this.sustainedCoherenceTimer=Math.max(0,this.sustainedCoherenceTimer-e*.5)),!this.isComplete&&this.checkCompletion()&&(this.isComplete=!0,this.completionReported||(this.completionReported=!0,this.onLevelComplete(),this.onComplete?.(this)))}processEEGState(e,t){this.currentCoherence=t,this.onCoherenceChanged(t)}checkCompletion(){return!this.allPuzzlesSolved||!this.gateOpened||this.meditationDwell<this.minDwellSeconds?!1:this.sustainedCoherenceTimer>=this.requiredSustainedSeconds?(this.completedBy="settled",!0):this.meditationDwell>=this.maxDwellSeconds?(this.completedBy="ceiling",!0):!1}get meditationProgress(){return Math.min(1,this.sustainedCoherenceTimer/this.requiredSustainedSeconds)}get isInMeditationSpace(){return this.inMeditationSpace}get meditationDwellSeconds(){return this.meditationDwell}get settleSustainSeconds(){return this.sustainedCoherenceTimer}get requiredSustainSeconds(){return this.requiredSustainedSeconds}get maxDwell(){return this.maxDwellSeconds}}class Es{constructor(e){M(this,"state");this.state=e>>>0||1}next(){let e=this.state+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}range(e,t){return e+(t-e)*this.next()}int(e,t){return Math.floor(this.range(e,t+1))}pick(e){return e[this.int(0,e.length-1)]}}const fn=48,Ut=48,je=8,pn=21,ri=26;class Rg{constructor(e){this.world=e}build(e){switch(e.regime){case"HEART":return this.buildHealingGarden(e);case"HEAD":return this.buildCelestial(e);case"GUT":default:return this.buildVolcanicCore(e)}}fillBox(e,t,n,s,r,o,a){for(let l=t;l<=r;l++)for(let c=n;c<=o;c++)for(let h=e;h<=s;h++)this.world.setBlock(h,l,c,a)}standardLayout(){return{spawn:new U(8,je+1,24),meditationCenter:new U(38,je+1,24),meditationRadius:5,puzzleAnchors:[new U(6,je+1,8),new U(8,je+1,40),new U(17,je+1,14),new U(16,je+1,34)],cymaticsCenter:new U(11,je+1,24),bridge:{start:new U(pn-1,je+1,24),length:9},gate:new U(ri+4,je+1,24),floraSites:[],geometryCenter:new U(38,je+4,24),bounds:{sx:fn,sz:Ut}}}buildChamber(e,t){const n=new Es(e.worldSeed),s=Rt(t.groundTop),r=Rt(t.groundSub),o=Rt(t.wall);this.fillBox(0,0,0,fn-1,je-1,Ut-1,r),this.fillBox(0,je,0,fn-1,je,Ut-1,s),this.fillBox(pn,3,0,ri,je,Ut-1,0),t.crossing==="lava"?this.fillBox(pn,0,0,ri,2,Ut-1,Rt("magma")):this.fillBox(pn,1,0,ri,3,Ut-1,Rt("water"));const a=t.ceiling?27:je+t.rimHeight;for(let g=je+1;g<=a;g++){for(let _=0;_<fn;_++)this.world.setBlock(_,g,0,o),this.world.setBlock(_,g,Ut-1,o);for(let _=0;_<Ut;_++)this.world.setBlock(0,g,_,o),this.world.setBlock(fn-1,g,_,o)}if(t.ceiling){const g=(t.ceilingAccents??[]).map(_=>Rt(_));for(let _=0;_<Ut;_++)for(let m=0;m<fn;m++){const f=n.next(),T=g.length&&f<.1?g[Math.floor(f*10)%g.length]:o;this.world.setBlock(m,27,_,T)}}for(let g=0;g<240;g++){const _=n.int(1,fn-2),m=n.int(1,Ut-2);if(_>=pn&&_<=ri)continue;let f=n.next();for(const T of t.scatter){if(f<T.weight){const S=Rt(T.block);if(T.moundChance&&n.next()<T.moundChance){const P=n.int(1,2);for(let O=1;O<=P;O++)this.world.setBlock(_,je+O,m,S)}else this.world.setBlock(_,je,m,S);break}f-=T.weight}}const l=38,c=24,h=5,u=Rt(t.medFloor),d=Rt(t.medRing);for(let g=c-h;g<=c+h;g++)for(let _=l-h;_<=l+h;_++)Math.hypot(_-l,g-c)<=h&&this.world.setBlock(_,je+1,g,Math.hypot(_-l,g-c)<=2?u:d);for(let g=0;g<32;g++){const _=g/32*Math.PI*2,m=Math.round(l+Math.cos(_)*(h-.5)),f=Math.round(c+Math.sin(_)*(h-.5));this.world.setBlock(m,je+2,f,d)}const p=this.standardLayout();for(let g=0;g<14;g++)p.floraSites.push(new U(n.int(2,pn-2),je+1,n.int(2,Ut-3)));return p}buildVolcanicCore(e){return this.buildChamber(e,{groundTop:"basalt",groundSub:"basalt",wall:"basalt",crossing:"lava",ceiling:!0,rimHeight:0,medFloor:"meditation_floor",medRing:"quartz",ceilingAccents:["magma","glow_lichen"],scatter:[{block:"ember_rock",weight:.4},{block:"obsidian",weight:.15},{block:"glow_lichen",weight:.15,moundChance:1}]})}buildHealingGarden(e){return this.buildChamber(e,{groundTop:"moss",groundSub:"living_wood",wall:"living_wood",crossing:"water",ceiling:!1,rimHeight:3,medFloor:"cloud_marble",medRing:"gold_stone",scatter:[{block:"leaf",weight:.3,moundChance:.5},{block:"petal",weight:.2},{block:"gold_stone",weight:.08},{block:"moss",weight:.2}]})}buildCelestial(e){const t=new Es(e.worldSeed),n=Rt("fractal_stone"),s=Rt("crystal"),r=Rt("light_construct"),o=(u,d,p,g)=>{this.fillBox(u,je-1,d,p,je,g,n);for(let _=u;_<=p;_++)this.world.setBlock(_,je,d,s),this.world.setBlock(_,je,g,s);for(let _=d;_<=g;_++)this.world.setBlock(u,je,_,s),this.world.setBlock(p,je,_,s)};o(2,6,pn-1,42),o(ri+1,14,46,34);for(let u=0;u<24;u++){const d=t.int(2,fn-3),p=t.int(2,Ut-3),g=je+t.int(4,16);this.world.setBlock(d,g,p,t.next()<.5?r:s)}const a=38,l=24,c=5;for(let u=l-c;u<=l+c;u++)for(let d=a-c;d<=a+c;d++){const p=Math.hypot(d-a,u-l);p<=c&&this.world.setBlock(d,je+1,u,p<=2?r:s)}const h=this.standardLayout();for(let u=0;u<10;u++)h.floraSites.push(new U(t.int(3,pn-3),je+1,t.int(8,40)));return h}}class yi{constructor(e){M(this,"object",new _n);M(this,"tunedFrequencyIndex",-1);M(this,"reactivity",1);M(this,"currentFreqIndex",-1);M(this,"coherence",0);M(this,"resonating",!1);this.object.position.copy(e)}getResonanceStrength(e){if(this.tunedFrequencyIndex<0)return 1;const t=Math.abs(e-this.tunedFrequencyIndex);return Math.max(0,1-t/2)}onFrequencyUpdate(e,t){this.currentFreqIndex=e,this.coherence=t;const s=this.getResonanceStrength(e)*this.reactivity>.6;s&&!this.resonating?(this.resonating=!0,this.onResonance(t)):s||(this.resonating=!1)}dispose(){this.object.traverse(e=>{const t=e;t.geometry&&t.geometry.dispose();const n=t.material;Array.isArray(n)?n.forEach(s=>s.dispose()):n&&n.dispose()})}}class Pg extends yi{constructor(t,n,s,r=1){super(t);M(this,"shards",[]);M(this,"material");M(this,"solveTimer",0);M(this,"attended",!1);M(this,"solveSeconds",2.5);M(this,"solved",!1);M(this,"onSolved");this.tunedFrequencyIndex=n,this.material=new Sn({color:s,emissive:new Ce(s),emissiveIntensity:.3,roughness:.2,metalness:.1,transparent:!0,opacity:.95});const o=new Es(r),a=o.int(5,7);for(let l=0;l<a;l++){const c=o.range(.6,1.6),h=new Lt(o.range(.18,.34),c,o.range(.18,.34)),u=new st(h,this.material);u.position.set(o.range(-.5,.5),c/2,o.range(-.5,.5)),u.rotation.y=o.range(0,Math.PI),u.rotation.z=o.range(-.2,.2),this.shards.push(u),this.object.add(u)}}setAttended(t){this.attended=t}onResonance(t){}update(t,n){const s=this.getResonanceStrength(this.currentFreqIndex),r=.5+.5*Math.sin(n*(2+s*4));if(this.solved){this.material.emissiveIntensity=1.6,this.object.rotation.y+=t*.4;return}const o=this.attended||this.resonating,a=this.solveTimer/this.solveSeconds,l=o?.5+1.6*a+.2*r:.2+s*(.4+.8*this.coherence)*r;if(this.material.emissiveIntensity+=(l-this.material.emissiveIntensity)*Math.min(1,t*6),this.object.scale.setScalar(1+(o?.18*a:0)),o){const c=this.resonating?1.6:1;this.solveTimer+=t*c,this.solveTimer>=this.solveSeconds&&(this.solved=!0,this.object.scale.setScalar(1),this.onSolved?.())}else this.solveTimer=Math.max(0,this.solveTimer-t*.5)}get progress(){return Math.min(1,this.solveTimer/this.solveSeconds)}}class Lg extends yi{constructor(t,n,s,r=8){super(t);M(this,"tiles",[]);M(this,"tilePos",[]);M(this,"material");M(this,"size");M(this,"baseColor");this.size=r,this.tunedFrequencyIndex=n,this.baseColor=new Ce(s),this.material=new Sn({color:s,emissive:new Ce(s),emissiveIntensity:.2,transparent:!0,opacity:.6,roughness:.4});const o=new Lt(.9,.4,.9);for(let a=0;a<r;a++)for(let l=0;l<r;l++){const c=new st(o,this.material.clone());c.position.set(l-r/2,0,a-r/2),this.tiles.push(c),this.tilePos.push({x:l-r/2,z:a-r/2}),this.object.add(c)}}onResonance(){}update(t,n){const s=this.currentFreqIndex>=0?this.currentFreqIndex%9:0,r=1+s*.6,o=1+s*1.3%4,a=this.getResonanceStrength(this.currentFreqIndex),l=.3+.7*this.coherence,c=this.size;for(let h=0;h<this.tiles.length;h++){const{x:u,z:d}=this.tilePos[h],p=(u+c/2)/c,g=(d+c/2)/c;let _=Math.cos(o*Math.PI*p)*Math.cos(r*Math.PI*g)-Math.cos(r*Math.PI*p)*Math.cos(o*Math.PI*g);_*=l;const m=Math.sin(n*1.5+h*.1)*.1*(1-l);this.tiles[h].position.y=_*(.5+a)+m;const f=this.tiles[h].material;f.emissiveIntensity=.15+Math.abs(_)*a*1.2,f.color.copy(this.baseColor).multiplyScalar(.6+Math.abs(_))}}}class Ig extends yi{constructor(t,n,s,r,o=.5){super(n.clone());M(this,"planks",[]);M(this,"material");M(this,"threshold");M(this,"solidNow",!1);M(this,"cells",[]);this.world=t,this.threshold=o,this.tunedFrequencyIndex=-1,this.material=new Sn({color:r,emissive:new Ce(r),emissiveIntensity:.5,transparent:!0,opacity:0,roughness:.3});const a=new Lt(1,.2,1);for(let l=0;l<s;l++){const c=new st(a,this.material);c.position.set(l,0,0),this.planks.push(c),this.object.add(c),this.cells.push({x:Math.floor(n.x+l),y:Math.floor(n.y),z:Math.floor(n.z)})}}onResonance(){}update(t,n){const s=this.coherence>=this.threshold,r=s?.85:.12,o=s?t*3:t*1.1;this.material.opacity+=(r-this.material.opacity)*Math.min(1,o),this.material.emissiveIntensity=.3+.7*this.coherence,!this.solidNow&&this.material.opacity>.6?this.setSolid(!0):this.solidNow&&this.material.opacity<.35&&this.setSolid(!1)}setSolid(t){this.solidNow=t;const n=t?Rt("path_glow"):0;for(const s of this.cells)this.world.setBlock(s.x,s.y,s.z,n)}}class Dg extends yi{constructor(t,n,s=.6,r=3,o=3,a=5){super(t);M(this,"doorMat");M(this,"door");M(this,"frame");M(this,"threshold");M(this,"openTimer",0);M(this,"requiredSeconds");M(this,"opened",!1);M(this,"onOpened");M(this,"baseY");this.threshold=s,this.requiredSeconds=r,this.baseY=a/2,this.tunedFrequencyIndex=-1,this.frame=new _n;const l=new Sn({color:3024432,roughness:.9}),c=new Lt(.5,a+1,.6),h=new st(c,l);h.position.set(-o/2-.25,(a+1)/2,0);const u=new st(c,l);u.position.set(o/2+.25,(a+1)/2,0);const d=new st(new Lt(o+1.5,.6,.6),l);d.position.set(0,a+.5,0),this.frame.add(h,u,d),this.object.add(this.frame),this.doorMat=new Sn({color:n,emissive:new Ce(n),emissiveIntensity:.4,transparent:!0,opacity:.9,roughness:.25}),this.door=new st(new Lt(o,a,.35),this.doorMat),this.door.position.y=this.baseY,this.object.add(this.door)}onResonance(){}update(t,n){if(this.opened){this.door.position.y+=(this.baseY+6-this.door.position.y)*Math.min(1,t*1.5),this.doorMat.opacity+=(0-this.doorMat.opacity)*Math.min(1,t*1.5);return}const s=this.coherence,r=.9*(1-.7*s);this.doorMat.opacity+=(r-this.doorMat.opacity)*Math.min(1,t*3),this.doorMat.emissiveIntensity=.4+.9*s;const o=this.baseY+Math.max(0,s-this.threshold)*3;this.door.position.y+=(o-this.door.position.y)*Math.min(1,t*2),s>=this.threshold?(this.openTimer+=t,this.openTimer>=this.requiredSeconds&&(this.opened=!0,this.onOpened?.())):this.openTimer=Math.max(0,this.openTimer-t*.5)}get openProgress(){return Math.min(1,this.openTimer/this.requiredSeconds)}forceOpen(){this.opened||(this.opened=!0,this.onOpened?.())}}class Ug extends yi{constructor(t,n,s=2.2){super(t);M(this,"nodes",[]);M(this,"material");M(this,"targetScale",0);this.tunedFrequencyIndex=-1,this.material=new Sn({color:n,emissive:new Ce(n),emissiveIntensity:.8,transparent:!0,opacity:0,roughness:.2});const r=[new Fe(0,0)];for(let a=0;a<6;a++){const l=a/6*Math.PI*2;r.push(new Fe(Math.cos(l)*s,Math.sin(l)*s))}const o=new Lt(.18,.18,.18);for(const a of r)for(let c=0;c<12;c++){const h=c/12*Math.PI*2,u=new st(o,this.material);u.position.set(a.x+Math.cos(h)*s,0,a.y+Math.sin(h)*s),this.nodes.push(u),this.object.add(u)}this.object.scale.setScalar(.01)}onResonance(){}update(t,n){this.targetScale=Math.max(.01,(this.coherence-.3)/.55),this.targetScale=Math.min(1.2,this.targetScale);const s=this.object.scale.x+(this.targetScale-this.object.scale.x)*Math.min(1,t*2);this.object.scale.setScalar(s),this.material.opacity+=(Math.min(.9,this.coherence)-this.material.opacity)*Math.min(1,t*2),this.material.emissiveIntensity=.4+this.coherence,this.object.rotation.y+=t*(.2+this.coherence*.6)}}class Ng extends yi{constructor(t,n,s=1){super(t);M(this,"stem");M(this,"bloom");M(this,"bloomMat");M(this,"stemMat");M(this,"fullHeight");this.tunedFrequencyIndex=-1;const r=new Es(s);this.fullHeight=r.range(.8,1.8),this.stemMat=new Sn({color:5208634,roughness:.8}),this.stem=new st(new Lt(.16,this.fullHeight,.16),this.stemMat),this.stem.position.y=this.fullHeight/2,this.object.add(this.stem),this.bloomMat=new Sn({color:n,emissive:new Ce(n),emissiveIntensity:.3,roughness:.4}),this.bloom=new st(new Jr(.38,10,8,0,Math.PI*2,0,Math.PI/2),this.bloomMat),this.bloom.position.y=this.fullHeight,this.object.add(this.bloom),this.object.scale.set(1,.2,1)}onResonance(){}update(t,n){const s=.2+.8*this.coherence,r=this.object.scale.y+(s-this.object.scale.y)*Math.min(1,t*1.5);this.object.scale.set(1,r,1),this.object.rotation.z=Math.sin(n*.8+this.object.position.x)*.05*this.coherence,this.bloomMat.emissiveIntensity=.2+this.coherence*1.3;const o=.4+this.coherence*.8;this.bloom.scale.setScalar(o)}}const Fg={GUT:0,HEART:1,HEAD:2};class Og extends Cg{constructor(t,n){super(t,n);M(this,"layout");M(this,"props",[]);M(this,"crystals",[]);M(this,"gate");M(this,"builder");M(this,"gateAnnounced",!1);M(this,"postPuzzleClock",0);M(this,"gateCeilingSeconds",75);M(this,"focusHintShown",!1);M(this,"nearCrystalTime",0);M(this,"settleSpaceTime",0);M(this,"breathGuideDelay",5);this.builder=new Rg(n.world)}build(){const t=this.config;this.layout=this.builder.build(t),this.ctx.world.applyAtmosphere({fogColor:t.ambientColor,fogDensity:t.fogDensity,skyColor:t.secondaryColor,groundColor:t.ambientColor,sunColor:t.primaryColor,emissiveBoost:1}),this.ctx.player.setRegime(t.regime),this.ctx.player.spawnAt(this.layout.spawn.x+.5,this.layout.spawn.y,this.layout.spawn.z+.5);const s=(Fg[t.regime]??0)*9,r=t.primaryColor,o=t.secondaryColor;this.layout.puzzleAnchors.slice(0,t.numFrequencyPuzzles).forEach((h,u)=>{const d=s+u%9,p=new Pg(h.clone().add(new U(.5,0,.5)),d,u%2===0?r:o,t.worldSeed+u*17);p.onSolved=()=>{this.ctx.audio.chime(432*Math.pow(2,u%5/12)),this.ctx.speak(this.crystalLine())},this.crystals.push(p),this.addProp(p)});const a=new Lg(this.layout.cymaticsCenter.clone().add(new U(.5,0,.5)),t.levelIndex,o,8);this.addProp(a);const l=new Ig(this.ctx.world,this.layout.bridge.start.clone().add(new U(.5,0,.5)),this.layout.bridge.length,r,Math.max(.4,t.coherenceThreshold-.1));this.addProp(l),this.gate=new Dg(this.layout.gate.clone().add(new U(.5,0,.5)),r,t.coherenceThreshold,3),this.gate.onOpened=()=>{this.ctx.audio.chime(432),this.ctx.speak("The gate yields as you settle. The node remembers you.")},this.addProp(this.gate);const c=new Ug(this.layout.geometryCenter.clone(),o,1.8);this.addProp(c),this.layout.floraSites.forEach((h,u)=>{const d=new Ng(h.clone().add(new U(.5,0,.5)),u%3===0?r:"#5dd66a",t.worldSeed+1e3+u);this.addProp(d)}),this.ctx.audio.setBinauralOffset(t.binauralBeatOffset),this.ctx.audio.setFrequency(t.frequencyHz,t.playbackHz),this.ctx.speak(this.openingLine())}addProp(t){this.props.push(t),this.ctx.propGroup.add(t.object)}onCoherenceChanged(t){this.ctx.world.setCoherence(t),this.ctx.audio.setCoherence(t)}onFrequencyPrescribed(t){const n=this.ctx.freqTable.playbackHz(t),s=this.ctx.freqTable.hz(t);n>0&&this.ctx.audio.setFrequency(s,n)}onMeditationSpaceEntered(){this.ctx.speak("You have entered the still center. Rest your attention here.")}onLevelComplete(){this.ctx.speak(this.completionLine()),this.ctx.audio.chime(432*1.5,1.4),setTimeout(()=>this.ctx.speak("Press V to see your session metrics, or choose your next node on the cube."),5e3)}get allPuzzlesSolved(){return this.crystals.length>0&&this.crystals.every(t=>t.solved)}get gateOpened(){return this.gate?.opened??!1}playerInMeditationSpace(){const t=this.ctx.player.feet,n=this.layout.meditationCenter;return Math.hypot(t.x-(n.x+.5),t.z-(n.z+.5))<=this.layout.meditationRadius}update(t,n,s,r){if(this.ctx.player.feet.y<6){const h=this.layout.spawn;this.ctx.player.spawnAt(h.x+.5,h.y,h.z+.5)}super.update(t,n,s,r);const o=this.ctx.player.feet,a=this.ctx.player.isFocusing;let l=!1;for(const h of this.crystals){const u=h.object.position,d=Math.hypot(o.x-u.x,o.z-u.z)<3.5;h.setAttended(a&&d),d&&!h.solved&&(l=!0)}l&&!a&&!this.focusHintShown&&(this.focusHintShown=!0,this.ctx.speak("A resonance lock. Look at it and hold F to focus it open.")),this.nearCrystalTime=l?this.nearCrystalTime+t:0;const c=this.allPuzzlesSolved&&!this.gateOpened&&this.playerInMeditationSpace();this.settleSpaceTime=c?this.settleSpaceTime+t:0;for(const h of this.props)h.onFrequencyUpdate(n,s),h.update(t,this.timeInLevel);this.allPuzzlesSolved&&(this.gateAnnounced||(this.gateAnnounced=!0,this.ctx.speak("The locks are open. Cross the bridge with a steady mind and face the gate.")),this.postPuzzleClock+=t,!this.gate.opened&&this.postPuzzleClock>=this.gateCeilingSeconds&&this.gate.forceOpen())}openingLine(){return`${this.config.levelName}. ${this.config.therapeuticTarget}. Breathe. Let the field meet you where you are.`}crystalLine(){const t=this.crystals.filter(n=>!n.solved).length;return t===0?"Every lock resonates. The way forward is lit.":`A lock answers your attention. ${t} remain.`}completionLine(){return"The node is restored. A fragment of the Field settles into harmony. Rest here a moment."}dispose(){for(const t of this.props)this.ctx.propGroup.remove(t.object),t.dispose();this.props=[],this.crystals=[]}get breathingGuideActive(){return this.nearCrystalTime>=this.breathGuideDelay||this.settleSpaceTime>=this.breathGuideDelay}get gateProgress(){return this.gate?.openProgress??0}get puzzlesSolvedCount(){return this.crystals.filter(t=>t.solved).length}get puzzleTotal(){return this.crystals.length}}function Bg(i){const e=i<9?"GUT":i<18?"HEART":"HEAD",t=e==="GUT"?.03:e==="HEART"?.018:.012,n=e==="GUT"?"subterranean":e==="HEART"?"golden":"starfield",s=e==="GUT"?"cave":e==="HEART"?"garden":"void";return{levelIndex:i,worldSeed:1300+i*37,skyPreset:n,fogDensity:t,baseOscillatorAmplitude:.25,ambientSoundscape:s,numFrequencyPuzzles:3+i%3,numCoherenceChallenges:1}}class zg{constructor(){M(this,"records",[]);M(this,"cap",1e5)}push(e){this.records.push(e),this.records.length>this.cap&&this.records.shift()}get size(){return this.records.length}clear(){this.records=[]}exportJSON(){return JSON.stringify({schema:"aetheria_game_signal_log",version:"1.0",records:this.records},null,2)}download(e="aetheria-signals.json"){const t=new Blob([this.exportJSON()],{type:"application/json"}),n=URL.createObjectURL(t),s=document.createElement("a");s.href=n,s.download=e,s.click(),URL.revokeObjectURL(n)}}const Br=(i,e)=>e.some(t=>i instanceof t);let Ja,Qa;function kg(){return Ja||(Ja=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Hg(){return Qa||(Qa=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const zr=new WeakMap,xr=new WeakMap,Ps=new WeakMap;function Gg(i){const e=new Promise((t,n)=>{const s=()=>{i.removeEventListener("success",r),i.removeEventListener("error",o)},r=()=>{t(zn(i.result)),s()},o=()=>{n(i.error),s()};i.addEventListener("success",r),i.addEventListener("error",o)});return Ps.set(e,i),e}function Vg(i){if(zr.has(i))return;const e=new Promise((t,n)=>{const s=()=>{i.removeEventListener("complete",r),i.removeEventListener("error",o),i.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{n(i.error||new DOMException("AbortError","AbortError")),s()};i.addEventListener("complete",r),i.addEventListener("error",o),i.addEventListener("abort",o)});zr.set(i,e)}let kr={get(i,e,t){if(i instanceof IDBTransaction){if(e==="done")return zr.get(i);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return zn(i[e])},set(i,e,t){return i[e]=t,!0},has(i,e){return i instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in i}};function Yl(i){kr=i(kr)}function Wg(i){return Hg().includes(i)?function(...e){return i.apply(Hr(this),e),zn(this.request)}:function(...e){return zn(i.apply(Hr(this),e))}}function qg(i){return typeof i=="function"?Wg(i):(i instanceof IDBTransaction&&Vg(i),Br(i,kg())?new Proxy(i,kr):i)}function zn(i){if(i instanceof IDBRequest)return Gg(i);if(xr.has(i))return xr.get(i);const e=qg(i);return e!==i&&(xr.set(i,e),Ps.set(e,i)),e}const Hr=i=>Ps.get(i);function Xg(i,e,{blocked:t,upgrade:n,blocking:s,terminated:r}={}){const o=indexedDB.open(i,e),a=zn(o);return n&&o.addEventListener("upgradeneeded",l=>{n(zn(o.result),l.oldVersion,l.newVersion,zn(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Yg=["get","getKey","getAll","getAllKeys","count"],jg=["put","add","delete","clear"],yr=new Map;function el(i,e){if(!(i instanceof IDBDatabase&&!(e in i)&&typeof e=="string"))return;if(yr.get(e))return yr.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,s=jg.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(s||Yg.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return n&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),s&&l.done]))[0]};return yr.set(e,r),r}Yl(i=>({...i,get:(e,t,n)=>el(e,t)||i.get(e,t,n),has:(e,t)=>!!el(e,t)||i.has(e,t)}));const $g=["continue","continuePrimaryKey","advance"],tl={},Gr=new WeakMap,jl=new WeakMap,Kg={get(i,e){if(!$g.includes(e))return i[e];let t=tl[e];return t||(t=tl[e]=function(...n){Gr.set(this,jl.get(this)[e](...n))}),t}};async function*Zg(...i){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...i)),!e)return;e=e;const t=new Proxy(e,Kg);for(jl.set(t,e),Ps.set(t,Hr(e));e;)yield t,e=await(Gr.get(t)||e.continue()),Gr.delete(t)}function nl(i,e){return e===Symbol.asyncIterator&&Br(i,[IDBIndex,IDBObjectStore,IDBCursor])||e==="iterate"&&Br(i,[IDBIndex,IDBObjectStore])}Yl(i=>({...i,get(e,t,n){return nl(e,t)?Zg:i.get(e,t,n)},has(e,t){return nl(e,t)||i.has(e,t)}}));const Jg="aetheria-voxel",ds="save",il="progress",Qg=1;function fs(){return{version:Qg,levelData:Array.from({length:27},()=>({completed:!1,bestCoherence:0,completionTimeSec:0,puzzlesSolved:0,meditationMinutes:0,completedBy:null})),totalPlayTimeSec:0,levelsCompleted:0,lastPlayed:0,coherenceHistory:[],calibration:{capturedAt:null}}}class e0{constructor(){M(this,"db",null);M(this,"save",fs())}async init(){this.db=await Xg(Jg,1,{upgrade(t){t.objectStoreNames.contains(ds)||t.createObjectStore(ds)},blocking:()=>{try{this.db?.close()}catch{}}});const e=await this.db.get(ds,il);e?this.save={...fs(),...e}:(this.migrateFromLocalStorage(),await this.flush())}migrateFromLocalStorage(){try{const e=localStorage.getItem("aetheria-completed");if(!e)return;const t=JSON.parse(e);for(const n of t)this.save.levelData[n]&&(this.save.levelData[n].completed=!0);this.save.levelsCompleted=t.length}catch{}}async flush(){this.save.lastPlayed=this.now(),this.db&&await this.db.put(ds,this.save,il)}now(){return Date.now()}get data(){return this.save}get completedSet(){const e=new Set;return this.save.levelData.forEach((t,n)=>{t.completed&&e.add(n)}),e}isCompleted(e){return!!this.save.levelData[e]?.completed}async recordCompletion(e,t){const n=this.save.levelData[e];if(!n)return;const s=n.completed;n.completed=!0,n.bestCoherence=Math.max(n.bestCoherence,t.coherence),n.completionTimeSec=t.timeSec,n.puzzlesSolved=t.puzzlesSolved,n.meditationMinutes+=t.meditationMinutes,n.completedBy=t.completedBy,s||this.save.levelsCompleted++,await this.flush()}async addPlayTime(e){this.save.totalPlayTimeSec+=e,await this.flush()}async addSessionRecord(e){this.save.coherenceHistory.push(e),this.save.coherenceHistory.length>2e3&&this.save.coherenceHistory.shift(),await this.flush()}exportJSON(){return JSON.stringify({...this.save,source:"aetheria_game",schema:"aetheria_save_v1"},null,2)}async importJSON(e){const t=JSON.parse(e);this.save={...fs(),...t},await this.flush()}download(e="aetheria-save.json"){const t=new Blob([this.exportJSON()],{type:"application/json"}),n=URL.createObjectURL(t),s=document.createElement("a");s.href=n,s.download=e,s.click(),URL.revokeObjectURL(n)}async reset(){this.save=fs(),await this.flush()}}const sl={masterVolume:.6,subtitles:!0,reduceMotion:!1,reduceFlashes:!1,difficulty:"standard",renderScale:1},rl="aetheria-settings",t0={gentle:{threshold:.8,sustain:.7},standard:{threshold:1,sustain:1},deep:{threshold:1.15,sustain:1.3}};class n0{constructor(){M(this,"data");M(this,"listeners",[]);this.data=this.load()}load(){try{const e=localStorage.getItem(rl);if(e)return{...sl,...JSON.parse(e)}}catch{}return{...sl}}save(){try{localStorage.setItem(rl,JSON.stringify(this.data))}catch{}}set(e,t){this.data[e]=t,this.save();for(const n of this.listeners)n(this.data)}onChange(e){this.listeners.push(e),e(this.data)}}let Dn=null;function i0(){typeof window>"u"||(window.addEventListener("beforeinstallprompt",i=>{i.preventDefault(),Dn=i,window.dispatchEvent(new CustomEvent("aetheria:installable"))}),window.addEventListener("appinstalled",()=>{Dn=null,window.dispatchEvent(new CustomEvent("aetheria:installable"))}))}function s0(){return typeof window>"u"?!1:window.matchMedia?.("(display-mode: standalone)").matches||navigator.standalone===!0}function r0(){return!!Dn&&!s0()}async function o0(){if(!Dn)return!1;Dn.prompt();const i=await Dn.userChoice.catch(()=>null);return Dn=null,window.dispatchEvent(new CustomEvent("aetheria:installable")),i?.outcome==="accepted"}class a0{constructor(e,t,n,s,r){M(this,"overlay");M(this,"panel");M(this,"mainVisible",!1);this.root=e,this.settings=t,this.save=n,this.cb=s,this.sensors=r,this.overlay=document.createElement("div"),this.overlay.style.cssText=["position:fixed","inset:0","z-index:40","display:none","align-items:center","justify-content:center","background:radial-gradient(circle at center, rgba(20,12,34,0.78), rgba(8,5,16,0.96))","pointer-events:auto",'font-family:"Segoe UI",system-ui,sans-serif',"color:#e8e0f0"].join(";"),this.panel=document.createElement("div"),this.panel.style.cssText="min-width:320px;max-width:520px;text-align:center;",this.overlay.appendChild(this.panel),this.root.appendChild(this.overlay),window.addEventListener("aetheria:installable",()=>{this.mainVisible&&this.showMain()})}btn(e,t=!1){const n=document.createElement("button");return n.textContent=e,n.style.cssText=["display:block","width:100%","margin:8px 0","padding:12px 18px","border-radius:26px","border:1px solid rgba(180,142,232,0.5)",`background:${t?"rgba(180,142,232,0.22)":"rgba(20,12,34,0.6)"}`,"color:#e8e0f0",'font:300 1rem "Segoe UI",sans-serif',"letter-spacing:0.04em","cursor:pointer"].join(";"),n}title(){const e=document.createElement("div");return e.innerHTML='<div style="font-weight:300;letter-spacing:0.2em;font-size:2.2rem;text-transform:uppercase;text-shadow:0 0 24px rgba(180,142,232,0.5)">Aetheria</div><div style="opacity:0.65;margin:0.3rem 0 1.4rem;letter-spacing:0.08em">Resonance of the Spheres</div>',e}show(){this.overlay.style.display="flex"}hide(){this.overlay.style.display="none",this.mainVisible=!1}showMain(){this.mainVisible=!0,this.panel.innerHTML="",this.panel.appendChild(this.title());const e=this.save.data.levelsCompleted,t=this.btn(e>0?"Continue the Journey":"Enter the Field",!0);t.onclick=()=>this.cb.onEnter();const n=this.btn("How to Play");n.onclick=()=>this.showHowToPlay(()=>this.showMain());const s=this.btn("Settings");s.onclick=()=>this.showSettings(()=>this.showMain());const r=this.btn("Credits");if(r.onclick=()=>this.showCredits(()=>this.showMain()),this.panel.append(t,n,s,r),r0()){const a=this.btn("⤓ Install app");a.onclick=()=>void o0().then(()=>this.showMain()),this.panel.appendChild(a)}if(e>0){const a=document.createElement("div");a.style.cssText="margin-top:14px;opacity:0.5;font-size:0.85rem",a.textContent=`${e}/27 nodes restored · press C in the Field for the map`,this.panel.appendChild(a)}const o=document.createElement("div");o.style.cssText="margin-top:22px;opacity:0.4;font:0.78rem ui-monospace,Consolas,monospace;letter-spacing:0.1em;",o.textContent="v2.2.0",this.panel.appendChild(o),this.show()}showPause(){this.mainVisible=!1,this.panel.innerHTML="";const e=document.createElement("div");e.style.cssText="font-weight:300;letter-spacing:0.16em;font-size:1.5rem;margin-bottom:1rem",e.textContent="Paused",this.panel.appendChild(e);const t=this.btn("Resume",!0);t.onclick=()=>this.cb.onResume();const n=this.btn("Session Metrics");n.onclick=()=>this.cb.onMetrics();const s=this.btn("How to Play");s.onclick=()=>this.showHowToPlay(()=>this.showPause());const r=this.btn("Settings");r.onclick=()=>this.showSettings(()=>this.showPause());const o=this.btn("Return to Title");o.onclick=()=>this.cb.onMainMenu(),this.panel.append(t,n,s,r,o),this.panel.appendChild(this.sensorsBlock()),this.show()}sensorsBlock(){const e=document.createElement("div");e.style.cssText="margin-top:18px;padding-top:14px;border-top:1px solid rgba(180,142,232,0.18);";const t=document.createElement("div");return t.textContent="Sensors",t.style.cssText="opacity:0.5;font-size:0.78rem;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:8px;",e.appendChild(t),e.appendChild(this.sensorRow("Muse",this.sensors.museConnected(),()=>this.sensors.connectMuse(),()=>this.sensors.disconnectMuse())),e.appendChild(this.sensorRow("Polar H10",this.sensors.polarConnected(),()=>this.sensors.connectPolar(),()=>this.sensors.disconnectPolar())),e}sensorRow(e,t,n,s){const r=document.createElement("div");r.style.cssText="display:flex;align-items:center;justify-content:space-between;gap:12px;margin:7px 0;text-align:left;";const o=document.createElement("span");o.textContent=`${e}: ${t?"connected ✓":"not connected"}`,o.style.cssText=`font-size:0.92rem;${t?"color:#9ad6c8;":"opacity:0.7;"}`;const a=document.createElement("button");return a.textContent=t?"Disconnect":"Connect",a.style.cssText=["padding:6px 16px","border-radius:18px","border:1px solid rgba(180,142,232,0.4)","background:rgba(20,12,34,0.6)","color:#e8e0f0",'font:300 0.85rem "Segoe UI",sans-serif',"cursor:pointer","flex:0 0 auto"].join(";"),a.onclick=async()=>{t?(s(),this.showPause()):(a.textContent="Pairing…",a.disabled=!0,await n(),this.showPause())},r.append(o,a),r}row(e,t){const n=document.createElement("div");n.style.cssText="display:flex;align-items:center;justify-content:space-between;gap:16px;margin:10px 0;text-align:left;";const s=document.createElement("span");return s.textContent=e,s.style.cssText="font-size:0.95rem;opacity:0.85;",n.append(s,t),n}toggle(e,t){const n=document.createElement("button"),s=()=>{n.textContent=e()?"On":"Off",n.style.opacity=e()?"1":"0.55"};return n.style.cssText="padding:6px 16px;border-radius:18px;border:1px solid rgba(180,142,232,0.5);background:rgba(20,12,34,0.6);color:#e8e0f0;cursor:pointer;min-width:64px;",n.onclick=()=>{t(!e()),s()},s(),n}slider(e,t,n,s,r){const o=document.createElement("input");return o.type="range",o.min=String(e),o.max=String(t),o.step=String(n),o.value=String(s()),o.style.cssText="width:160px;accent-color:#b48ee8;",o.oninput=()=>r(parseFloat(o.value)),o}showSettings(e){this.mainVisible=!1,this.panel.innerHTML="";const t=document.createElement("div");t.style.cssText="font-weight:300;letter-spacing:0.16em;font-size:1.4rem;margin-bottom:1rem",t.textContent="Settings",this.panel.appendChild(t);const n=this.settings.data,s=(u,d)=>this.settings.set(u,d);this.panel.appendChild(this.row("Master volume",this.slider(0,1,.05,()=>n.masterVolume,u=>s("masterVolume",u)))),this.panel.appendChild(this.row("Render scale",this.slider(.5,1.5,.1,()=>n.renderScale,u=>s("renderScale",u)))),this.panel.appendChild(this.row("Subtitles",this.toggle(()=>n.subtitles,u=>s("subtitles",u)))),this.panel.appendChild(this.row("Reduce motion",this.toggle(()=>n.reduceMotion,u=>s("reduceMotion",u)))),this.panel.appendChild(this.row("Reduce flashes",this.toggle(()=>n.reduceFlashes,u=>s("reduceFlashes",u))));const r=document.createElement("select");r.style.cssText="padding:6px 12px;border-radius:14px;background:rgba(20,12,34,0.6);color:#e8e0f0;border:1px solid rgba(180,142,232,0.5);";for(const u of["gentle","standard","deep"]){const d=document.createElement("option");d.value=u,d.textContent=u[0].toUpperCase()+u.slice(1),u===n.difficulty&&(d.selected=!0),r.appendChild(d)}r.onchange=()=>s("difficulty",r.value),this.panel.appendChild(this.row("Settling depth",r));const o=document.createElement("div");o.style.cssText="display:flex;gap:8px;margin-top:14px;";const a=this.btn("Export Save");a.style.margin="0",a.onclick=()=>this.save.download();const l=this.btn("Import");l.style.margin="0",l.onclick=()=>this.importSave();const c=this.btn("Reset");c.style.margin="0",c.onclick=async()=>{confirm("Reset all progress? This cannot be undone.")&&(await this.save.reset(),e())},o.append(a,l,c),this.panel.appendChild(o);const h=this.btn("Back",!0);h.onclick=e,this.panel.appendChild(h),this.show()}importSave(){const e=document.createElement("input");e.type="file",e.accept="application/json",e.onchange=async()=>{const t=e.files?.[0];t&&(await this.save.importJSON(await t.text()),location.reload())},e.click()}showHowToPlay(e){this.mainVisible=!1,this.panel.innerHTML="";const t=document.createElement("div");t.style.cssText="font-weight:300;letter-spacing:0.16em;font-size:1.5rem;margin-bottom:0.2rem",t.textContent="How to Play";const n=document.createElement("div");n.style.cssText="opacity:0.6;font-size:0.9rem;margin-bottom:1rem;line-height:1.5",n.textContent="A contemplative journey — there is no way to lose, and no clock. You restore each node by settling, at your own pace.",this.panel.append(t,n);const s=document.createElement("div");s.style.cssText='max-height:54vh;overflow-y:auto;text-align:left;padding-right:10px;font:300 0.95rem/1.65 "Segoe UI",system-ui,sans-serif;color:#e2d9f0;';const r=(l,c)=>`<div style="margin:0 0 1.1rem"><div style="color:#c4a8ec;letter-spacing:0.08em;font-size:0.82rem;text-transform:uppercase;margin-bottom:0.35rem">${l}</div><div style="opacity:0.9">${c}</div></div>`,o=l=>`<span style="display:inline-block;min-width:2.1em;text-align:center;padding:1px 7px;margin:0 2px;border:1px solid rgba(180,142,232,0.4);border-radius:6px;background:rgba(20,12,34,0.6);font:0.82rem ui-monospace,Consolas,monospace;color:#e8e0f0">${l}</span>`;s.innerHTML=r("Your goal","Each of the 27 nodes is a place that has gone quiet. You restore it by <b>settling</b> — letting your body grow calm and steady. As you settle, the Field around you brightens, bridges form, and locks open. When a node is restored, the next opens on the map. Nothing punishes you: there are no enemies, no timers, no falling damage, no failure. If you simply spend time in a node, it will always open eventually.")+r("Moving around",`${o("W")}${o("A")}${o("S")}${o("D")} or the arrow keys to walk &nbsp;·&nbsp; <b>Mouse</b> to look &nbsp;·&nbsp; ${o("Space")} to jump / rise &nbsp;·&nbsp; ${o("Shift")} to step down. Click the window first to capture the mouse; press `+o("Esc")+" to release it and open this menu.")+r("What to do in a node",`<b>Settle.</b> Find the calm spot — often a glowing meditation dais — and press ${o("M")} to sit. The longer you stay settled, the more the node restores. You can also just stand still and breathe anywhere.<br><br><b>Resonance locks</b> (glowing crystal clusters): walk up close and <b>hold ${o("F")}</b> for about 2½ seconds to charge one open. You will see it brighten and swell as it fills — keep holding until it locks. Holding never "resets," so a pause is fine.<br><br><b>The breathing ring.</b> After a few seconds at a lock (or while settling at the gate) a soft ring fades in to <b>pace your breath</b> — follow it in and out. This slow breathing is what raises your heart-rhythm above your resting baseline, settling you so locks charge and the gate opens. It is only a guide — never required (see “The breathing patterns” below).<br><br><b>Harmonic bridges</b>: these solidify as you settle. The calmer you are, the more solid the path — then walk across. If you slip off, you are gently returned, never hurt.`)+r("The breathing patterns",'Each regime has its own pace, shown on the breathing ring with its name. Breathe along — in as the ring grows, out as it shrinks:<div style="margin-top:0.5rem;line-height:1.9"><span style="color:#e0a06a">●</span> <b>GUT — Grounding breath:</b> in for 4, out for 6. A long, slow exhale to settle and ground.<br><span style="color:#e87aa0">●</span> <b>HEART — Resonance breath:</b> in for 5½, out for 5½. The balanced ~5–6 breaths-a-minute pace that most steadies the heart.<br><span style="color:#b48ee8">●</span> <b>HEAD — Even breath:</b> in 4 · hold 4 · out 4 · hold 4. An even “box” breath for calm clarity.</div><br>The colour and pace match the node you are in. None of it is timed or scored — if a pace doesn’t suit you, breathe however feels easy; the ring is just an offer.')+r("Finding your way",`${o("M")} enter / leave meditation &nbsp;·&nbsp; <b>hold ${o("F")}</b> charge a resonance lock &nbsp;·&nbsp; ${o("C")} open the Lo Shu cube map (see all 27 nodes and your progress) &nbsp;·&nbsp; ${o("V")} your session metrics &nbsp;·&nbsp; ${o("Esc")} pause.`)+r("The frequencies",`Each node is tuned to one of the 27 Aetheria frequencies. They are <i>felt more than heard</i> — a low, grounding tone. Best on headphones or a subwoofer, but they work on any speaker. With a Muse, your own brain rhythms choose which frequency the Field tunes to. Without a headset you choose it yourself with the number keys ${o("1")}–${o("9")}.`)+r("Playing without sensors — Manual Mode",`A complete path, never a lesser one. The game reads your <b>settling from how you play</b>: holding still, slow movement, and entering meditation all deepen it. Pick frequencies with ${o("1")}–${o("9")}, hold ${o("F")} on locks, and breathe. Everything in the game is reachable this way.`)+r("Adding the Muse S Athena (EEG headband)","<b>Your brain chooses the frequency.</b> The Field listens to your brain rhythms and automatically tunes each node to meet the state you are in — you no longer pick numbers by hand. Its motion sensor also reads how physically still you are, which helps gate settling. Its optical sensors add heart rate and blood-oxygen depth to your <i>session metrics</i>. It makes the Field feel responsive to you, not just your keys.")+r("Adding the Polar H10 (heart strap)","<b>The deepest settle signal.</b> It measures your heart-rhythm variability and compares it to your own baseline from the opening breath. Slow, easy breathing raises it — and that is what most directly tells the Field you have settled, opening gates and bridges. When the Polar is connected it leads; the others support it. It is the most direct, validated read of the body settling.")+r("Using both together","The richest experience: the <b>Muse chooses</b> the frequency for where your mind is, while the <b>Polar gates</b> the settling from your heart. Every signal is recorded for your session metrics ("+o("V")+") as honest, raw data — never a grade. If a sensor drops out mid-journey, reconnect it any time from <b>Pause → Sensors</b>; the Field falls back gracefully until it returns.")+r("A gentle promise","This was made as a calm place — for veterans and anyone who needs one. Go slowly. Rest when you like. You cannot do it wrong, and every node will open in time."),this.panel.appendChild(s);const a=this.btn("Back",!0);a.style.marginTop="1rem",a.onclick=e,this.panel.appendChild(a),this.show()}showCredits(e){this.mainVisible=!1,this.panel.innerHTML='<div style="font-weight:300;letter-spacing:0.16em;font-size:1.4rem;margin-bottom:1rem">Credits</div><div style="line-height:1.9;opacity:0.85;font-size:0.95rem">Joseph (Jobo) Lewis — Creative Director / Lead Designer<br>Alisha Lewis — Narrative Director / Co-Designer<br>Aetheria Foundation — Mountain Home, Idaho<br><br>Frequencies from the Aetheria Guidebook.<br>Signal &amp; honesty guidance: Selah.<br>Built with Three.js · A = 432 Hz · made for veterans.</div>';const t=this.btn("Back",!0);t.style.marginTop="1.2rem",t.onclick=e,this.panel.appendChild(t),this.show()}}const ms=[{key:"settledness",label:"Settling (gate)",unit:"",decimals:2,color:"#9ad6c8"},{key:"heartRate",label:"Heart rate",unit:"bpm",decimals:0,color:"#e88ea8"},{key:"hrvRmssd",label:"HRV (RMSSD)",unit:"ms",decimals:0,color:"#e8a8c4"},{key:"plvCoherence",label:"EEG coherence (PLV)",unit:"",decimals:2,color:"#b48ee8"},{key:"stillness",label:"Stillness",unit:"",decimals:2,color:"#cfc2e8"},{key:"thetaAlpha",label:"Theta/Alpha (relax)",unit:"",decimals:2,color:"#7fc8e8"},{key:"betaGamma",label:"Beta/Gamma (focus)",unit:"",decimals:2,color:"#e8c87f"},{key:"alphaRel",label:"Alpha power",unit:"",decimals:2,color:"#56c878"},{key:"thetaRel",label:"Theta power",unit:"",decimals:2,color:"#50d4a0"},{key:"betaRel",label:"Beta power",unit:"",decimals:2,color:"#d4a050"},{key:"gammaRel",label:"Gamma power",unit:"",decimals:2,color:"#d47fb0"},{key:"deltaRel",label:"Delta power",unit:"",decimals:2,color:"#7f8ad4"},{key:"hbo",label:"fNIRS HbO",unit:"μM",decimals:1,color:"#e85a4a"},{key:"hbr",label:"fNIRS HbR",unit:"μM",decimals:1,color:"#4a7ae8"},{key:"battery",label:"Muse battery",unit:"%",decimals:0,color:"#9aa0b0"}];class l0{constructor(){M(this,"series",new Map);M(this,"levelIndex",0);M(this,"levelName","");M(this,"startedAt",0);M(this,"maxLen",1800);for(const e of ms)this.series.set(e.key,[])}start(e,t,n){this.levelIndex=e,this.levelName=t,this.startedAt=n;for(const s of ms)this.series.set(s.key,[])}push(e){for(const t of ms){const n=this.series.get(t.key);n.push(e[t.key]??null),n.length>this.maxLen&&n.shift()}}getSeries(e){return this.series.get(e)??[]}summary(e){const t=(this.series.get(e)??[]).filter(o=>o!=null);if(t.length===0)return{last:null,mean:null,min:null,max:null,n:0};let n=0,s=1/0,r=-1/0;for(const o of t)n+=o,o<s&&(s=o),o>r&&(r=o);return{last:t[t.length-1],mean:n/t.length,min:s,max:r,n:t.length}}get sampleCount(){return this.series.get("settledness")?.length??0}}const Mr="http://www.w3.org/2000/svg";class c0{constructor(e){M(this,"el");M(this,"body");M(this,"titleEl");M(this,"visible",!1);M(this,"onClose");M(this,"onExport");this.el=document.createElement("div"),this.el.style.cssText=["position:fixed","inset:0","z-index:42","display:none","align-items:center","justify-content:center","background:radial-gradient(circle at center, rgba(14,9,22,0.92), rgba(6,4,12,0.97))","pointer-events:auto","color:#e8e0f0",'font-family:"Segoe UI",system-ui,sans-serif'].join(";");const t=document.createElement("div");t.style.cssText="width:min(760px,92vw);max-height:88vh;display:flex;flex-direction:column;",this.titleEl=document.createElement("div"),this.titleEl.style.cssText="font-weight:300;letter-spacing:0.14em;font-size:1.4rem;text-align:center;margin-bottom:0.2rem;",this.titleEl.textContent="Session Metrics";const n=document.createElement("div");n.style.cssText="text-align:center;opacity:0.55;font-size:0.82rem;margin-bottom:1rem;",n.textContent="Measured signals — not a score. The geometry is proven; an effect on you is not claimed.",this.body=document.createElement("div"),this.body.style.cssText="overflow-y:auto;display:grid;grid-template-columns:1fr 1fr;gap:6px 18px;padding-right:6px;";const s=document.createElement("div");s.style.cssText="display:flex;gap:10px;justify-content:center;margin-top:14px;";const r=this.btn("Export Session JSON");r.onclick=()=>this.onExport?.();const o=this.btn("Close",!0);o.onclick=()=>{this.hide(),this.onClose?.()},s.append(r,o),t.append(this.titleEl,n,this.body,s),this.el.appendChild(t),e.appendChild(this.el)}btn(e,t=!1){const n=document.createElement("button");return n.textContent=e,n.style.cssText=["padding:9px 18px","border-radius:22px","border:1px solid rgba(180,142,232,0.5)",`background:${t?"rgba(180,142,232,0.22)":"rgba(20,12,34,0.6)"}`,"color:#e8e0f0",'font:300 0.92rem "Segoe UI",sans-serif',"cursor:pointer"].join(";"),n}sparkline(e,t){const r=document.createElementNS(Mr,"svg");r.setAttribute("width",String(120)),r.setAttribute("height",String(26)),r.setAttribute("viewBox","0 0 120 26");const o=e.filter(a=>a!=null);if(o.length>=2){let a=Math.min(...o),l=Math.max(...o);l-a<1e-9&&(l=a+1);const c=e.length;let h="",u=!1;e.forEach((p,g)=>{if(p==null)return;const _=g/(c-1)*118+1,m=24-(p-a)/(l-a)*22;h+=`${u?"L":"M"}${_.toFixed(1)} ${m.toFixed(1)}`,u=!0});const d=document.createElementNS(Mr,"path");d.setAttribute("d",h),d.setAttribute("fill","none"),d.setAttribute("stroke",t),d.setAttribute("stroke-width","1.3"),d.setAttribute("opacity","0.9"),r.appendChild(d)}else{const a=document.createElementNS(Mr,"text");a.setAttribute("x","2"),a.setAttribute("y","17"),a.setAttribute("fill","#6a6478"),a.setAttribute("font-size","9"),a.textContent="no signal",r.appendChild(a)}return r}render(e){this.titleEl.textContent=e.levelName?`Session Metrics · ${e.levelName}`:"Session Metrics",this.body.innerHTML="";for(const t of ms){const n=e.summary(t.key),s=document.createElement("div");s.style.cssText="display:flex;align-items:center;gap:10px;padding:5px 0;border-bottom:1px solid rgba(120,100,160,0.12);";const r=document.createElement("div");r.style.cssText="flex:1;min-width:0;";const o=a=>a==null?"—":a.toFixed(t.decimals);r.innerHTML=`<div style="font-size:0.82rem;opacity:0.85">${t.label}</div><div style="font-family:ui-monospace,Consolas,monospace;font-size:0.74rem;opacity:0.6">now ${o(n.last)}${t.unit} · avg ${o(n.mean)} · ${o(n.min)}–${o(n.max)}</div>`,s.append(r,this.sparkline(e.getSeries(t.key),t.color)),this.body.appendChild(s)}}show(e){this.render(e),this.visible=!0,this.el.style.display="flex"}hide(){this.visible=!1,this.el.style.display="none"}get isVisible(){return this.visible}}const h0=["tp9","af7","af8","tp10"],u0={tp9:"TP9",af7:"AF7",af8:"AF8",tp10:"TP10"},Sr=54;class d0{constructor(e){M(this,"el");M(this,"panel");M(this,"step","sensors");M(this,"museConnected",!1);M(this,"polarConnected",!1);M(this,"pairingMuse",!1);M(this,"pairingPolar",!1);M(this,"notice","");M(this,"calibElapsed",0);M(this,"cb");this.el=document.createElement("div"),this.el.style.cssText=["position:fixed","inset:0","z-index:41","display:none","align-items:center","justify-content:center","background:radial-gradient(circle at center, rgba(20,12,34,0.82), rgba(8,5,16,0.97))","pointer-events:auto","color:#e8e0f0",'font-family:"Segoe UI",system-ui,sans-serif'].join(";"),this.panel=document.createElement("div"),this.panel.style.cssText="width:min(440px,92vw);text-align:center;",this.el.appendChild(this.panel),e.appendChild(this.el)}btn(e,t=!1){const n=document.createElement("button");return n.textContent=e,n.style.cssText=["display:block","width:100%","margin:8px 0","padding:12px 18px","border-radius:26px","border:1px solid rgba(180,142,232,0.5)",`background:${t?"rgba(180,142,232,0.22)":"rgba(20,12,34,0.6)"}`,"color:#e8e0f0",'font:300 1rem "Segoe UI",sans-serif',"cursor:pointer"].join(";"),n}heading(e,t=""){const n=document.createElement("div");return n.innerHTML=`<div style="font-weight:300;letter-spacing:0.14em;font-size:1.4rem;margin-bottom:0.3rem">${e}</div>`+(t?`<div style="opacity:0.6;font-size:0.9rem;margin-bottom:1.1rem;line-height:1.5">${t}</div>`:""),n}open(e){this.cb=e,this.step="sensors",this.calibElapsed=0,this.notice="",this.pairingMuse=this.pairingPolar=!1,this.el.style.display="flex",this.renderSensors()}hide(){this.el.style.display="none"}get isVisible(){return this.el.style.display!=="none"}linkBtn(e){const t=document.createElement("button");return t.textContent=e,t.style.cssText=["display:inline-block","margin:0 0 10px","padding:5px 14px","border-radius:18px","border:1px solid rgba(180,142,232,0.3)","background:transparent","color:#c8b8e0","opacity:0.8",'font:300 0.82rem "Segoe UI",sans-serif',"cursor:pointer"].join(";"),t}renderSensors(){if(this.step="sensors",this.panel.innerHTML="",this.panel.appendChild(this.heading("Prepare to enter","Connect a sensor for the full experience, or enter in Manual Mode — a complete path either way.")),this.notice){const t=document.createElement("div");t.textContent=this.notice,t.style.cssText='margin:-0.4rem 0 0.9rem;color:#d4c050;font:300 0.9rem "Segoe UI",sans-serif;',this.panel.appendChild(t)}if(this.deviceRow("Muse (EEG)",this.museConnected,this.pairingMuse,async t=>{this.pairingMuse=!0,t.textContent="Pairing…",t.disabled=!0,this.museConnected=await this.cb.connectMuse(),this.pairingMuse=!1,this.museConnected||(this.notice="No Muse found — try again, or continue without it."),this.renderSensors()},()=>{this.cb.disconnectMuse(),this.museConnected=!1,this.notice="",this.renderSensors()}),this.deviceRow("Polar H10 (heart)",this.polarConnected,this.pairingPolar,async t=>{this.pairingPolar=!0,t.textContent="Pairing…",t.disabled=!0,this.polarConnected=await this.cb.connectPolar(),this.pairingPolar=!1,this.polarConnected||(this.notice="No Polar H10 found — make sure the strap is wet and snug."),this.renderSensors()},()=>{this.cb.disconnectPolar(),this.polarConnected=!1,this.notice="",this.renderSensors()}),this.museConnected||this.polarConnected){const t=this.btn("Continue",!0);t.onclick=()=>this.museConnected?this.gotoQuality():this.gotoCalibrate(),this.panel.appendChild(t)}const e=this.btn("Enter in Manual Mode");e.onclick=()=>{this.hide(),this.cb.manual()},this.panel.appendChild(e)}deviceRow(e,t,n,s,r){const o=this.btn(t?`${e}  ✓ connected`:`Connect ${e}`,!t);if(o.disabled=n,o.onclick=()=>{!t&&!n&&s(o)},this.panel.appendChild(o),t){const a=this.linkBtn("Disconnect");a.onclick=r,this.panel.appendChild(a)}}gotoQuality(){this.step="quality",this.panel.innerHTML="",this.panel.appendChild(this.heading("Signal check","Settle the band on your forehead until the four bars are green. A little movement is fine."));const e=document.createElement("div");e.id="setup-bars",e.style.cssText="display:flex;gap:10px;justify-content:center;margin:1rem 0;";for(const a of h0){const l=document.createElement("div");l.style.cssText="display:flex;flex-direction:column;align-items:center;gap:6px;width:48px;";const c=document.createElement("div");c.dataset.ch=a,c.style.cssText="width:14px;height:80px;border-radius:7px;background:#3a2f4a;position:relative;overflow:hidden;";const h=document.createElement("div");h.className="fill",h.style.cssText="position:absolute;bottom:0;left:0;right:0;height:0%;background:#e85a5a;transition:height 0.3s,background 0.3s;",c.appendChild(h);const u=document.createElement("div");u.textContent=u0[a],u.style.cssText="font:0.72rem ui-monospace,monospace;opacity:0.7;",l.append(c,u),e.appendChild(l)}this.panel.appendChild(e);const t=document.createElement("div");t.id="setup-stream",t.style.cssText="margin:0.6rem auto 0.2rem;font:0.82rem/1.8 ui-monospace,Consolas,monospace;opacity:0.85;text-align:left;display:inline-block;min-width:240px;",t.innerHTML='<div data-row="eeg">EEG signal: —</div><div data-row="optics">Optical stream: —</div><div data-row="ppg">Pulse (PPG): —</div><div data-row="fnirs">fNIRS (HbO/HbR): —</div><div data-row="polar">Polar H10: —</div>',this.panel.appendChild(t);const n=this.btn("");n.dataset.role="preset",n.style.display="none",n.style.fontSize="0.85rem",n.onclick=async()=>{const a=this.cb.cyclePreset();n.textContent=`Reconnecting on ${a}…`,n.disabled=!0,await this.cb.connectMuse(),n.disabled=!1},this.panel.appendChild(n);const s=this.btn("Begin Calibration",!0);s.onclick=()=>this.gotoCalibrate();const r=this.btn("← Back (add a sensor)");r.onclick=()=>this.renderSensors();const o=this.btn("Skip — enter now");o.onclick=()=>{this.hide(),this.cb.enter()},this.panel.append(s,r,o)}gotoCalibrate(){this.step="calibrate",this.calibElapsed=0,this.cb.startCalibration(),this.panel.innerHTML="",this.panel.appendChild(this.heading("Finding your baseline","Sit comfortably and breathe <b>normally — easy and relaxed</b>, however you are right now. Don’t pace it. This 54-second baseline simply learns your resting rhythm, so the Field can meet you where you are."));const e=document.createElement("div");e.id="setup-calib",e.style.cssText='font:300 2.4rem "Segoe UI",sans-serif;margin:1rem 0;',e.textContent=String(Sr),this.panel.appendChild(e);const t=this.btn("Skip baseline");t.onclick=()=>this.gotoReady(),this.panel.appendChild(t)}gotoReady(){this.cb.finishCalibration(),this.step="ready",this.panel.innerHTML="",this.panel.appendChild(this.heading("You're ready","The node awaits. Press C any time for the map, V for your session metrics."));const e=this.btn("Enter the Field",!0);e.onclick=()=>{this.hide(),this.cb.enter()},this.panel.appendChild(e)}reconcile(e){if(!this.pairingMuse&&e.museConnected!==this.museConnected){const t=!e.museConnected;this.museConnected=e.museConnected,t?(this.notice="Muse disconnected — power it back on, then press Connect Muse.",(this.step==="sensors"||this.step==="quality")&&this.renderSensors()):this.step==="sensors"&&this.renderSensors()}if(!this.pairingPolar&&e.polarConnected!==this.polarConnected){const t=!e.polarConnected;this.polarConnected=e.polarConnected,t&&(this.notice="Polar H10 disconnected — re-check the strap, then reconnect."),this.step==="sensors"&&this.renderSensors()}}update(e,t){if(this.reconcile(t),this.step==="quality"){const n=this.panel.querySelectorAll("[data-ch]");let s=0;n.forEach(p=>{const g=p.dataset.ch,_=t.quality[g]??0;s+=_;const m=p.querySelector(".fill");m&&(m.style.height=`${Math.round(_*100)}%`,m.style.background=_>.6?"#5ad48a":_>.3?"#d4c050":"#e85a5a")});const r=p=>this.panel.querySelector(`[data-row="${p}"]`),o="#5ad48a",a="#d4c050",l="#e88e8e",c=(p,g,_)=>{const m=r(p);m&&(m.textContent=g,m.style.color=_)},h=s/4;c("eeg",`EEG signal: ${h>.6?"strong":h>.3?"weak — reseat band":"poor — dampen/reseat"}`,h>.6?o:h>.3?a:l);const u=t.opticsPackets>0;t.museConnected?u?c("optics",`Optical stream: on ✓ ${t.opticsMode??""} (${t.opticsPackets} pkts)`,o):c("optics",`Optical stream: none on ${t.preset} — try another preset ↓`,l):c("optics","Optical stream: Muse not connected",a),c("ppg",`Pulse (PPG): ${t.ppgStreaming?`streaming ✓ ${t.hr?Math.round(t.hr)+" bpm":""}`:u?"warming up (~4 s)…":"waiting for optics"}`,t.ppgStreaming?o:u?a:l),c("fnirs",`fNIRS (HbO/HbR): ${t.fnirsStreaming?`streaming ✓ (HbO ${t.hbo?.toFixed(1)})`:u?"warming up (~10–30 s)…":"no optics — not a contact issue"}`,t.fnirsStreaming?o:u?a:l),c("polar",t.polarConnected?`Polar H10: connected ✓ ${t.hr?Math.round(t.hr)+" bpm":""}`:"Polar H10: not connected",t.polarConnected?o:a);const d=this.panel.querySelector('[data-role="preset"]');d&&!d.disabled&&(t.museConnected&&!u?(d.style.display="block",d.textContent=`Optics not flowing — switch preset (now ${t.preset})`):d.style.display="none")}else if(this.step==="calibrate"){this.calibElapsed+=e;const n=this.panel.querySelector("#setup-calib"),s=Math.max(0,Sr-this.calibElapsed);n&&(n.textContent=s>0?Math.ceil(s).toString():"✓"),(t.calibProgress>=1||this.calibElapsed>=Sr)&&this.gotoReady()}}}function f0(){return typeof window>"u"?!1:!!(navigator.maxTouchPoints>0||"ontouchstart"in window||window.matchMedia?.("(pointer: coarse)")?.matches)}const Ci=56;class p0{constructor(e,t){M(this,"el");M(this,"cb");M(this,"moveGroup");M(this,"lookZone");M(this,"topGroup");M(this,"joyBase");M(this,"joyThumb");M(this,"mapBtn");M(this,"joyId",null);M(this,"joyCenter",{x:0,y:0});M(this,"lookId",null);M(this,"lookLast",{x:0,y:0});this.cb=t,this.el=document.createElement("div"),this.el.style.cssText="position:fixed;inset:0;z-index:16;display:none;pointer-events:none;",this.lookZone=document.createElement("div"),this.lookZone.style.cssText="position:absolute;inset:0;pointer-events:auto;touch-action:none;",this.el.appendChild(this.lookZone),this.moveGroup=document.createElement("div"),this.moveGroup.style.cssText="position:absolute;inset:0;pointer-events:none;",this.el.appendChild(this.moveGroup),this.joyBase=document.createElement("div"),this.joyBase.style.cssText=["position:absolute","left:26px","bottom:30px","width:120px","height:120px","border-radius:50%","border:2px solid rgba(180,142,232,0.4)","background:rgba(20,12,34,0.35)","pointer-events:auto","touch-action:none"].join(";"),this.joyThumb=document.createElement("div"),this.joyThumb.style.cssText=["position:absolute","left:50%","top:50%","width:52px","height:52px","margin:-26px 0 0 -26px","border-radius:50%","background:rgba(180,142,232,0.5)","box-shadow:0 0 12px rgba(180,142,232,0.5)","transition:transform 0.06s linear","pointer-events:none"].join(";"),this.joyBase.appendChild(this.joyThumb),this.moveGroup.appendChild(this.joyBase);const n=this.actionButton("Focus","right:26px","bottom:118px",80,!0),s=this.actionButton("Jump","right:120px","bottom:46px",64,!0),r=this.actionButton("Meditate","right:26px","bottom:36px",76,!1);this.holdButton(n,a=>this.cb.setFocus(a)),this.holdButton(s,a=>this.cb.setJump(a)),this.tapButton(r,()=>this.cb.meditate()),this.moveGroup.append(n,s,r),this.topGroup=document.createElement("div"),this.topGroup.style.cssText="position:absolute;inset:0;pointer-events:none;",this.el.appendChild(this.topGroup),this.mapBtn=this.actionButton("Map","right:26px","top:18px",64,!1);const o=this.actionButton("⏸","right:100px","top:18px",52,!1);this.tapButton(this.mapBtn,()=>this.cb.toggleMap()),this.tapButton(o,()=>this.cb.pause()),this.topGroup.append(this.mapBtn,o),this.bindJoystick(),this.bindLook(),e.appendChild(this.el)}actionButton(e,t,n,s,r){const o=document.createElement("button");return o.textContent=e,o.style.cssText=["position:absolute",t,n,`width:${s}px`,`height:${s}px`,"border-radius:50%","border:1px solid rgba(180,142,232,0.5)","background:rgba(20,12,34,0.55)","color:#e8e0f0",`font:300 ${r?.95:.78}rem "Segoe UI",sans-serif`,"pointer-events:auto","touch-action:none","user-select:none","-webkit-user-select:none","backdrop-filter:blur(3px)"].join(";"),o}holdButton(e,t){const n=r=>{r.preventDefault(),e.style.background="rgba(180,142,232,0.4)",t(!0)},s=r=>{r.preventDefault(),e.style.background="rgba(20,12,34,0.55)",t(!1)};e.addEventListener("touchstart",n,{passive:!1}),e.addEventListener("touchend",s,{passive:!1}),e.addEventListener("touchcancel",s,{passive:!1})}tapButton(e,t){e.addEventListener("touchstart",n=>{n.preventDefault(),n.stopPropagation(),t()},{passive:!1})}bindJoystick(){const e=()=>this.joyBase.getBoundingClientRect();this.joyBase.addEventListener("touchstart",s=>{if(s.preventDefault(),this.joyId!==null)return;const r=s.changedTouches[0];this.joyId=r.identifier;const o=e();this.joyCenter={x:o.left+o.width/2,y:o.top+o.height/2},this.updateJoy(r.clientX,r.clientY)},{passive:!1});const t=s=>{if(this.joyId!==null)for(const r of Array.from(s.changedTouches))r.identifier===this.joyId&&(s.preventDefault(),this.updateJoy(r.clientX,r.clientY))},n=s=>{for(const r of Array.from(s.changedTouches))r.identifier===this.joyId&&(this.joyId=null,this.joyThumb.style.transform="translate(0px,0px)",this.cb.move(0,0))};this.joyBase.addEventListener("touchmove",t,{passive:!1}),this.joyBase.addEventListener("touchend",n,{passive:!1}),this.joyBase.addEventListener("touchcancel",n,{passive:!1})}updateJoy(e,t){let n=e-this.joyCenter.x,s=t-this.joyCenter.y;const r=Math.hypot(n,s);r>Ci&&(n=n/r*Ci,s=s/r*Ci),this.joyThumb.style.transform=`translate(${n}px,${s}px)`,this.cb.move(n/Ci,-s/Ci)}bindLook(){this.lookZone.addEventListener("touchstart",t=>{if(this.lookId!==null)return;const n=t.changedTouches[0];this.lookId=n.identifier,this.lookLast={x:n.clientX,y:n.clientY}},{passive:!1}),this.lookZone.addEventListener("touchmove",t=>{for(const n of Array.from(t.changedTouches))n.identifier===this.lookId&&(t.preventDefault(),this.cb.look(n.clientX-this.lookLast.x,n.clientY-this.lookLast.y),this.lookLast={x:n.clientX,y:n.clientY})},{passive:!1});const e=t=>{for(const n of Array.from(t.changedTouches))n.identifier===this.lookId&&(this.lookId=null)};this.lookZone.addEventListener("touchend",e,{passive:!1}),this.lookZone.addEventListener("touchcancel",e,{passive:!1})}setState(e){const t=e==="playing",n=e==="map";if(!t&&!n){this.hide();return}this.el.style.display="block",this.lookZone.style.display=t?"block":"none",this.moveGroup.style.display=t?"block":"none",this.topGroup.style.display="block",this.mapBtn.textContent=n?"Close":"Map",n&&this.resetInputs()}hide(){this.el.style.display!=="none"&&(this.el.style.display="none",this.resetInputs())}resetInputs(){this.joyId=null,this.lookId=null,this.joyThumb.style.transform="translate(0px,0px)",this.cb.move(0,0),this.cb.setFocus(!1),this.cb.setJump(!1)}}const m0={GUT:0,HEART:1,HEAD:2};function g0(i,e,t){return Promise.race([i,new Promise((n,s)=>setTimeout(()=>s(new Error(`${t} timed out after ${e}ms`)),e))])}class _0{constructor(e){M(this,"renderer");M(this,"scene",new lm);M(this,"camera");M(this,"composer");M(this,"clock",new Hl);M(this,"world",new ci);M(this,"player");M(this,"audio",new qm);M(this,"hud");M(this,"debug");M(this,"completedLevels",new Set);M(this,"unlockedLevels",new Set);M(this,"freqTable");M(this,"muse");M(this,"manual",new sg);M(this,"polar",new to);M(this,"usingMuse",!1);M(this,"level",null);M(this,"lastFreqIndex",-1);M(this,"lastFeet",new U);M(this,"playing",!1);M(this,"playStateListeners",[]);M(this,"propGroup",new _n);M(this,"starfield");M(this,"bloom");M(this,"signalLog",new zg);M(this,"logAccum",0);M(this,"settings",new n0);M(this,"save",new e0);M(this,"menus");M(this,"metrics",new l0);M(this,"metricsPanel");M(this,"setup");M(this,"touch");M(this,"lastTouchState","");M(this,"state","menu");this.opts=e,this.renderer=new Bl({canvas:e.canvas,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.camera=new Ft(75,window.innerWidth/window.innerHeight,.1,1e3)}async init(){this.resize(),window.addEventListener("resize",()=>this.resize()),this.scene.add(this.world.group),this.scene.add(this.propGroup),this.scene.add(this.camera);const e=new hm(9073344,2365488,1.15),t=new fm(14207231,.9);t.position.set(.5,1,.3),this.scene.add(e,t),this.starfield=this.makeStarfield(),this.scene.add(this.starfield);const n=new ym(this.scene,this.camera);this.bloom=new gi(new Fe(window.innerWidth,window.innerHeight),.5,.5,.82),this.composer=new xm(this.renderer),this.composer.addPass(n),this.composer.addPass(this.bloom),this.freqTable=await Qr.load(),this.hud=new wg(this.opts.hud,this.freqTable),this.hud.onSelectNode=s=>this.travelToNode(s),this.hud.onToggleMap=()=>this.toggleCube(),this.muse=new eo(this.freqTable),this.debug=new pg(this.opts.hud);try{await g0(this.save.init(),6e3,"save.init"),this.completedLevels=this.save.completedSet}catch(s){console.warn("[Aetheria] Continuing without saved progress:",s),this.completedLevels=new Set}this.recomputeUnlocked(),this.menus=new a0(this.opts.hud,this.settings,this.save,{onEnter:()=>this.enterFromMenu(),onResume:()=>this.resume(),onMainMenu:()=>this.showMainMenu(),onMetrics:()=>this.metricsPanel.show(this.metrics)},{museConnected:()=>this.muse.isConnected,polarConnected:()=>this.polar.isConnected,connectMuse:async()=>(this.usingMuse=await this.muse.connect(),this.usingMuse),connectPolar:()=>this.polar.connect(),disconnectMuse:()=>{this.muse.disconnect(),this.usingMuse=!1},disconnectPolar:()=>this.polar.disconnect()}),this.metricsPanel=new c0(this.opts.hud),this.metricsPanel.onExport=()=>this.downloadSignalLog(),this.setup=new d0(this.opts.hud),this.metricsPanel.onClose=()=>{this.state==="metrics"&&(this.state="playing",this.requestPlay())},this.settings.onChange(s=>this.applySettings(s)),this.player=new Nr(this.camera,this.renderer.domElement,this.world),this.player.controls.addEventListener("unlock",()=>this.onPointerUnlock()),this.player.controls.addEventListener("lock",()=>this.setPlaying(!0)),f0()&&(this.touch=new p0(this.opts.hud,{move:(s,r)=>this.player.setMoveVector(s,r),look:(s,r)=>this.player.applyLook(s,r),setFocus:s=>this.player.setFocusing(s),setJump:s=>this.player.setJump(s),meditate:()=>this.player.meditateToggle(),toggleMap:()=>this.toggleCube(),pause:()=>this.touchPause()})),this.hud.onConnectMuse=()=>this.connectMuse(),this.hud.onManualMode=()=>this.startManual(),this.hud.onConnectPolar=()=>this.polar.connect(),this.hud.hideSetupBar(),document.addEventListener("keydown",s=>{const r=parseInt(s.key,10);!this.usingMuse&&r>=1&&r<=9&&this.manual.selectFrequency(r-1),s.code==="KeyC"&&this.toggleCube(),s.code==="KeyV"&&this.toggleMetrics()}),this.loadLevel(this.continueIndex())}continueIndex(){for(let e=0;e<27;e++)if(this.unlockedLevels.has(e)&&!this.completedLevels.has(e))return e;return 0}loadLevel(e){this.level&&(this.level.dispose(),this.world.clear());const t=this.freqTable.get(e),n=Ag(t,Bg(e)),s=t0[this.settings.data.difficulty];n.coherenceThreshold=Math.max(.2,Math.min(.95,n.coherenceThreshold*s.threshold)),n.sustainedSeconds=Math.round(n.sustainedSeconds*s.sustain);const r=m0[n.regime];this.muse.setRegime(r),this.manual.setRegime(r),this.hud.setRegime(n.regime),this.applySky(n.regime,t.ambient_color,t.secondary_color);const o=new Og(n,{world:this.world,scene:this.scene,propGroup:this.propGroup,audio:this.audio,player:this.player,freqTable:this.freqTable,getSource:()=>this.getSource(),speak:a=>this.hud.speak(a)});o.onComplete=a=>this.onLevelComplete(a),o.build(),this.level=o,this.world.remeshDirty(),this.recomputeUnlocked(),this.metrics.start(e,n.levelName,performance.now())}recomputeUnlocked(){const e=new Set;for(let t=0;t<27;t++)(t%9===0||this.completedLevels.has(t)||this.completedLevels.has(t-1))&&e.add(t);this.level&&e.add(this.level.levelIndex),this.unlockedLevels=e}onLevelComplete(e){this.save.recordCompletion(e.levelIndex,{coherence:e.meditationProgress,timeSec:Math.round(e.timeInLevel),puzzlesSolved:e.puzzlesSolvedCount??0,meditationMinutes:e.meditationDwellSeconds/60,completedBy:e.completedBy}),this.completedLevels=this.save.completedSet,this.completedLevels.add(e.levelIndex),this.recomputeUnlocked(),this.hud.bloomNode(e.levelIndex),this.hud.showCompletion(e.config.levelName),this.state="complete",this.hud.showCubeHero(),this.player.unlock()}gotoLevel(e){this.menus.hide(),this.hud.hideCompletion(),this.hud.hideCubeHero(),this.hud.hideSetupBar(),this.loadLevel(e),this.state="playing",this.requestPlay()}travelToNode(e){this.unlockedLevels.has(e)&&(this.hud.hideCompletion(),this.hud.hideCubeHero(),this.loadLevel(e),this.state="playing",this.requestPlay())}toggleMetrics(){this.metricsPanel.isVisible?(this.metricsPanel.hide(),this.state==="metrics"&&(this.state="playing",this.requestPlay())):this.state==="playing"?(this.state="metrics",this.touch?this.setPlaying(!1):this.player.unlock(),this.metricsPanel.show(this.metrics)):(this.state==="paused"||this.state==="complete")&&this.metricsPanel.show(this.metrics)}toggleCube(){this.state!=="playing"&&this.state!=="map"||(this.hud.toggleCube(),this.hud.cubeIsHero?(this.state="map",this.touch?this.setPlaying(!1):this.player.unlock()):(this.state="playing",this.touch?this.setPlaying(!0):this.player.lock()))}makeStarfield(){const t=new Float32Array(3600);for(let o=0;o<1200;o++){const a=180+o%60,l=o*2.39996%(Math.PI*2),c=Math.acos(1-2*(o+.5)/1200);t[o*3]=24+a*Math.sin(c)*Math.cos(l),t[o*3+1]=a*Math.cos(c),t[o*3+2]=24+a*Math.sin(c)*Math.sin(l)}const n=new zt;n.setAttribute("position",new Mt(t,3));const s=new zl({color:13617407,size:1.4,sizeAttenuation:!1}),r=new cm(n,s);return r.visible=!1,r.frustumCulled=!1,r}applySettings(e){this.audio.setMasterVolume(e.masterVolume),this.hud.setSubtitlesEnabled(e.subtitles),this.hud.setReduceMotion(e.reduceMotion),this.player?.setReduceMotion(e.reduceMotion),this.bloom&&(this.bloom.strength=e.reduceFlashes?.22:.5);const t=Math.min(window.devicePixelRatio,1.5);this.renderer.setPixelRatio(t*e.renderScale),this.resize()}applySky(e,t,n){const s=e==="HEART"?n:t;this.scene.background=new Ce(s);const r=e==="GUT"?.02:e==="HEART"?.012:.008;this.scene.fog=new Zr(new Ce(t).getHex(),r),this.starfield.visible=e==="HEAD"}getSource(){return this.usingMuse&&this.muse.isConnected?this.muse:this.manual}async connectMuse(){await this.muse.connect()?(this.usingMuse=!0,this.muse.startCalibration(54)):this.hud.speak("No Muse found — entering Manual Mode. You can connect later from Settings."),this.beginPlay()}startManual(){this.usingMuse=!1,this.beginPlay()}beginPlay(){this.hud.hideSetupBar(),this.setup.hide(),this.state="playing",this.requestPlay(),this.hud.speak("For the full felt experience, use headphones or a subwoofer — these frequencies are felt more than heard.")}showMainMenu(){this.state="menu",this.hud.hideSetupBar(),this.hud.hideCompletion(),this.hud.cubeIsHero&&this.hud.hideCubeHero(),this.player?.isLocked&&this.player.unlock(),this.menus.showMain()}enterFromMenu(){this.menus.hide(),this.state="setup",this.level&&this.completedLevels.has(this.level.levelIndex)&&this.loadLevel(this.continueIndex()),this.setup.open({connectMuse:async()=>(this.usingMuse=await this.muse.connect(),this.usingMuse),connectPolar:()=>this.polar.connect(),disconnectMuse:()=>{this.muse.disconnect(),this.usingMuse=!1},disconnectPolar:()=>this.polar.disconnect(),cyclePreset:()=>this.muse.cyclePreset(),startCalibration:()=>{this.muse.startCalibration(54),this.polar.beginBaseline()},finishCalibration:()=>this.polar.finalizeBaseline(),enter:()=>this.beginPlay(),manual:()=>this.startManual()})}pause(){this.state==="playing"&&(this.state="paused",this.menus.showPause())}resume(){this.menus.hide(),this.state="playing",this.requestPlay()}onPointerUnlock(){this.setPlaying(!1),this.state==="playing"&&this.pause()}requestPlay(){this.audio.start().catch(e=>console.warn("[Aetheria] Audio start failed",e)),this.touch?this.setPlaying(!0):this.player.lock()}touchPause(){this.setPlaying(!1),this.pause()}setPlaying(e){this.playing=e;for(const t of this.playStateListeners)t(e)}onPlayStateChange(e){this.playStateListeners.push(e)}exportSignalLog(){return this.signalLog.exportJSON()}downloadSignalLog(){this.signalLog.download()}start(){this.lastFeet.copy(this.player.feet),this.renderer.setAnimationLoop(()=>this.frame())}frame(){const e=Math.min(this.clock.getDelta(),.05);this.update(e),this.composer.render()}update(e){if(this.touch&&this.state!==this.lastTouchState&&(this.lastTouchState=this.state,this.touch.setState(this.state)),this.state==="setup"&&this.setup.isVisible){const p=this.muse.getMetrics(),g=this.muse.getDiagnostics();this.setup.update(e,{quality:this.muse.getChannelQuality(),hr:this.polar.heartRate||p.heartRate,ppgStreaming:g.ppgStreaming||p.heartRate!=null,fnirsStreaming:g.fnirsStreaming||p.hbo!=null,hbo:p.hbo,museConnected:this.muse.isConnected,opticsPackets:g.opticsPackets,opticsMode:g.opticsMode,preset:g.preset,polarConnected:this.polar.isConnected,calibProgress:this.muse.calibrationProgress})}this.playing&&this.player.update(e);const t=this.player.feet.distanceTo(this.lastFeet)>.02;this.lastFeet.copy(this.player.feet);const n=this.player.isMeditating||this.isNearMeditation();this.manual.update(e,t,n),this.polar.update(e);const s=this.getSource(),r=s.getPrescribedFrequencyIndex(),o=s.getBandPowers();let a,l;if(this.polar.isConnected&&this.polar.hasBaseline?(a=this.polar.getSettledness(),l="hrv"):this.usingMuse&&this.muse.isConnected&&this.muse.hasStillness?(a=this.muse.getStillness(),l="stillness"):(a=this.manual.getCoherenceScore(),l="behaviour"),this.level&&(r!==this.lastFreqIndex&&(this.level.onFrequencyPrescribed(r),this.lastFreqIndex=r),this.level.update(e,r,a,o)),this.world.remeshDirty(),this.logAccum+=e,this.logAccum>=1&&this.level){this.logAccum=0;const p=this.freqTable.get(r),g=this.muse.getMetrics();this.metrics.push({settledness:a,heartRate:this.polar.heartRate||g.heartRate,hrvRmssd:this.polar.getRmssd(),plvCoherence:this.usingMuse?g.plvCoherence:null,stillness:this.usingMuse?g.stillness:null,thetaAlpha:this.usingMuse?g.thetaAlphaRatio:null,betaGamma:this.usingMuse?g.betaGammaRatio:null,alphaRel:this.usingMuse?g.alphaRel:null,thetaRel:this.usingMuse?g.thetaRel:null,betaRel:this.usingMuse?g.betaRel:null,gammaRel:this.usingMuse?g.gammaRel:null,deltaRel:this.usingMuse?g.deltaRel:null,hbo:g.hbo,hbr:g.hbr,battery:g.battery}),this.signalLog.push({t:Math.round(this.level.timeInLevel*1e3),source:this.usingMuse&&this.muse.isConnected?"muse":"manual",heartConnected:this.polar.isConnected,level:this.level.levelIndex,freqIndex:r,trueHz:p.frequency_hz,playbackHz:p.playback_hz??0,settleSource:l,behaviourSettling:this.manual.getCoherenceScore(),museStillness:this.usingMuse?this.muse.getStillness():0,eegCoherence:this.usingMuse?this.muse.getCoherenceScore():0,heartSettledness:this.polar.getSettledness(),fusedSettledness:a,hrvRmssd:this.polar.getRmssd(),hrvBaseline:this.polar.baselineRmssd,bpm:this.polar.heartRate,meditationDwell:this.level.meditationDwellSeconds,inMeditationSpace:this.level.isInMeditationSpace,px:this.player.feet.x,py:this.player.feet.y,pz:this.player.feet.z,advancedBy:this.level.completedBy})}const c=this.level;this.hud.update(e,{coherence:a,meditationProgress:this.level?.meditationProgress??0,freqIndex:r,connected:s.isConnected,quality:s.connectionQuality,calibrating:this.usingMuse&&this.muse.isCalibrating,nearMeditation:this.isNearMeditation(),puzzlesSolved:c?.puzzlesSolvedCount??0,puzzleTotal:c?.puzzleTotal??0,heartConnected:this.polar.isConnected,heartCoherence:this.polar.getSettledness(),bpm:this.polar.heartRate,levelIndex:this.level?.levelIndex??0,completed:this.completedLevels,unlocked:this.unlockedLevels,breatheGuide:c?.breathingGuideActive??!1});const h=this.muse.getMetrics(),u=this.audio.getAudioState(),d=this.freqTable.get(r);this.debug.update({source:this.usingMuse&&this.muse.isConnected?"muse":"manual",settleSource:l,settle:a,threshold:this.level?.coherenceThreshold??0,sustain:this.level?.settleSustainSeconds??0,sustainReq:this.level?.requiredSustainSeconds??0,dwell:this.level?.meditationDwellSeconds??0,maxDwell:this.level?.maxDwell??0,inMeditation:this.level?.isInMeditationSpace??!1,gateProgress:c?.gateProgress??0,puzzlesSolved:c?.puzzlesSolvedCount??0,puzzleTotal:c?.puzzleTotal??0,polarConnected:this.polar.isConnected,hr:this.polar.heartRate,rmssd:this.polar.getRmssd(),rmssdBaseline:this.polar.baselineRmssd,hrvSettle:this.polar.getSettledness(),museConnected:this.muse.isConnected,quality:h.quality,plv:h.plvCoherence,stillness:h.stillness,thetaAlpha:h.thetaAlphaRatio,betaGamma:h.betaGammaRatio,bands:{delta:h.deltaRel,theta:h.thetaRel,alpha:h.alphaRel,beta:h.betaRel,gamma:h.gammaRel},hbo:h.hbo,hbr:h.hbr,battery:h.battery,freqIndex:r,regimePos:`${d.regime}-${d.regime_position}`,trueHz:u.trueHz||d.frequency_hz,feltHz:u.carrierHz,subHz:u.subBass.subHz,subBand:u.subBass.band})}isNearMeditation(){return this.level?.isInMeditationSpace??!1}resize(){const e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.composer&&this.composer.setSize(e,t)}dispose(){this.renderer.setAnimationLoop(null),this.world.dispose(),this.audio.dispose(),this.muse.disconnect(),this.polar.disconnect()}}i0();async function v0(){const i=document.getElementById("scene"),e=document.getElementById("hud"),t=document.getElementById("loading"),n=document.getElementById("click-to-play");if(!i||!e)throw new Error("Aetheria: required DOM elements missing.");const s=new _0({canvas:i,hud:e});await s.init(),t.classList.add("hidden"),n.remove(),s.start(),s.showMainMenu(),window.aetheria=s}v0().catch(i=>{console.error("[Aetheria] Boot failed:",i);const e=document.getElementById("loading");e&&(e.textContent="The Field could not awaken. See console.",e.style.color="#e88e8e")});setTimeout(()=>{const i=document.getElementById("loading");!i||i.classList.contains("hidden")||(i.style.cursor="pointer",i.style.color="#e8e0f0",i.innerHTML='The Field is slow to wake.<br><span style="opacity:0.7;font-size:0.8em">Tap to reset and reload.</span>',i.onclick=async()=>{i.textContent="Resetting…";try{if("serviceWorker"in navigator){const e=await navigator.serviceWorker.getRegistrations();await Promise.all(e.map(t=>t.unregister()))}if("caches"in window){const e=await caches.keys();await Promise.all(e.map(t=>caches.delete(t)))}}catch{}location.reload()})},15e3);"serviceWorker"in navigator&&window.addEventListener("load",()=>{const i="./";navigator.serviceWorker.register(`${i}sw.js?v=2.2.0`,{scope:i}).catch(e=>console.warn("[Aetheria] SW registration failed:",e))});
//# sourceMappingURL=index-yv-pbWDm.js.map
