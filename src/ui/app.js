import { SET } from "../data/setlist.js";
import { splitBars } from "../lib/bars.js";
import { diagramaShape } from "../lib/diagram.js";
import { escalaHTML } from "../lib/scale.js";
import { letraHTML } from "../lib/lyrics.js";
import { parseNote } from "../lib/theory.js";
import {
  transposeKey, keySpelling, transposeSymbol, resolveShape, transposeLyrics,
  normalizeSemitones, keyName,
} from "../lib/transpose.js";

/* ============ ESTADO ============ */
let modo="b", esc=1, vista="indice", actual=null, verLetra=true, picker=false;

/* ============ SHOW ============ */
// The build can inline src/data/show.json as SHOW: an ordered subset of SET
// for one specific show. The position (01..N) is display only; s.n stays the
// stable id used by scales, navigation and saved transpositions.
const SHOW_DEF=(typeof SHOW!=="undefined"&&SHOW&&Array.isArray(SHOW.order))?SHOW:null;
const LISTA=SHOW_DEF
  ? SHOW_DEF.order.map(function(n){ return SET.find(function(s){ return s.n===n; }); }).filter(Boolean)
  : SET.slice();
function posDe(n){ return LISTA.findIndex(function(s){ return s.n===n; })+1; }
function num(n){ return String(posDe(n)).padStart(2,"0"); }

/* ============ TRANSPOSICIÓN ============ */
// The build inlines src/data/transposiciones.json as TRANSPOSICIONES: the
// band's agreed transposition per song. localStorage overrides it per device.
const TR_DEFAULT=(typeof TRANSPOSICIONES!=="undefined"&&TRANSPOSICIONES.songs)?TRANSPOSICIONES.songs:{};

function trDe(n){
  let v=null;
  try{ const s=localStorage.getItem("tr:"+n); if(s!==null&&s!=="") v=parseInt(s,10); }catch(e){}
  if(v===null||isNaN(v)) v=(n in TR_DEFAULT)?TR_DEFAULT[n]:0;
  return normalizeSemitones(v|0);
}

function setTr(n, v){
  try{ localStorage.setItem("tr:"+n, String(normalizeSemitones(v))); }catch(e){}
  repintar(true);
}

// Transposition context for a song: semitones and the spelling of the new key.
function trCtx(s){
  const tr=trDe(s.n);
  return { tr:tr, sp:keySpelling(transposeKey(s.k,tr)), k:transposeKey(s.k,tr) };
}

function sym(ac, ctx){
  if(!ctx.tr) return ac;
  try{ return transposeSymbol(ac, ctx.tr, ctx.sp); }catch(e){ return ac; }
}

function keyMode(k){ return /m$/.test(String(k).split(" ")[0])?"minor":"major"; }

/* ============ UTILIDADES ============ */
function chordsForMode(x){ return modo==="b"?x.b:modo==="t"?x.t:x.g; }

function barra(x, ctx){
  const act=splitBars(chordsForMode(x));
  const bas=splitBars(x.b);
  return act.map(function(a,ci){
    const b=bas[ci]||[];
    return a.map(function(ac,i){
      const t=sym(ac,ctx), tb=b[i]?sym(b[i],ctx):"";
      const eq=(modo!=="b"&&tb&&tb!==t)?'<span class="eq">'+tb+'</span>':'';
      return '<span class="c'+(i>0?" sec2":"")+'">'+t+eq+'</span>';
    }).join(" ");
  }).join('<span class="p">|</span>​');
}

function zonaDe(s){ return modo==="t"?s.zt:modo==="a"?s.za:""; }

function acordesDe(s, ctx){
  const out=[],vistos=[];
  s.secs.forEach(function(x){
    const act=splitBars(chordsForMode(x));
    const bas=splitBars(x.b);
    act.forEach(function(a,ci){
      const b=bas[ci]||[];
      a.forEach(function(ac,i){
        const t=sym(ac,ctx);
        if(vistos.indexOf(t)<0){ vistos.push(t); out.push([t,b[i]?sym(b[i],ctx):""]); }
      });
    });
  });
  return out;
}

function diagramaDe(nombre){
  let r=null;
  try{ r=resolveShape(nombre, modo); }catch(e){}
  return r?diagramaShape(r.shape):"";
}

/* ============ VISTAS ============ */
function vistaIndice(){
  vista="indice"; actual=null; picker=false;
  cerrarHoja();
  document.getElementById("volver").classList.add("oculto");
  document.getElementById("marca").innerHTML='LA <span>TRIBU</span>';
  document.getElementById("main").innerHTML=
    '<div class="hero"><h1>'+(SHOW_DEF?SHOW_DEF.name+'.<br>'+LISTA.length+' temas, en orden.':LISTA.length+' temas.<br>Primera guitarra y requinto.')+'</h1>'
    +'<p>Primera guitarra y requinto. Tocá un tema para abrirlo.</p></div>'
    +'<div class="indice">'+LISTA.map(function(s){
      const ctx=trCtx(s);
      const kk=s.k==="?"?"?":ctx.k.split(" ")[0]+(ctx.tr?'<small>orig. '+s.k.split(" ")[0]+'</small>':'');
      return '<div class="item '+(s.v==="dud"?"dud":"")+'" data-n="'+s.n+'">'
        +'<span class="num">'+num(s.n)+'</span>'
        +'<span><span class="tt">'+s.t+'</span><span class="aa">'+s.a+'</span></span>'
        +'<span class="kk">'+kk+'</span>'
        +'<span class="v '+s.v+'"></span></div>';
    }).join("")+'</div>'
    +'<footer class="leyenda"><span><i class="v ok"></i>verificado</span><span><i class="v oido"></i>por oído</span><span><i class="v dud"></i>sin identificar</span><span class="mas">Todo lo demás está en <b>?</b></span></footer>';

  document.querySelectorAll(".item").forEach(function(el){
    el.addEventListener("click",function(){ vistaCancion(+el.dataset.n); });
  });
  document.getElementById("panelLbl").innerHTML="Acordes";
  document.getElementById("strip").innerHTML='<div style="color:var(--gris);font-size:13px">Elegí un tema del índice.</div>';
  document.getElementById("escPanel").innerHTML="";
  window.scrollTo(0,0);
}

// Key picker (direction C): a grid of the 12 keys in the song's mode.
function pickerHTML(s, ctx){
  const tok=s.k.split(" ")[0];
  const mode=keyMode(tok);
  const orig=parseNote(tok.replace(/m$/,""));
  const sel=((orig+ctx.tr)%12+12)%12;
  let g='';
  for(let pc=0;pc<12;pc++){
    const cls="btn"+(pc===sel?" on":"")+(pc===orig?" orig":"");
    g+='<button class="'+cls+'" data-pc="'+pc+'">'+keyName(pc,mode)+'</button>';
  }
  const foot=ctx.tr
    ? '<span>'+keyName(sel,mode)+' = '+(ctx.tr>0?"+":"")+ctx.tr+' semitonos</span>'
      +'<button class="btn" data-reset="1">Volver a '+tok+'</button>'
    : '<span>tono original</span>';
  return '<div class="picker"><div class="h">Tocar en</div><div class="grid">'+g+'</div><div class="foot">'+foot+'</div></div>';
}

function vistaCancion(n, keepScroll){
  if(actual!==n) picker=false;
  vista="song"; actual=n;
  cerrarHoja();
  const s=SET.find(function(x){return x.n===n;});
  const ctx=trCtx(s);
  document.getElementById("volver").classList.remove("oculto");
  document.getElementById("marca").innerHTML=num(s.n)+' · '+s.t;

  const vtag=s.v==="ok"?'<span class="tag ok">verificado</span>'
           :s.v==="oido"?'<span class="tag oido">por oído</span>'
           :'<span class="tag dud">sin identificar</span>';

  const secs=s.secs.map(function(x){
    const cuerpo=x.l
      ? '<div class="letra">'+letraHTML(ctx.tr?transposeLyrics(x.l, ctx.tr, ctx.sp):x.l)+'</div>'
      : '<div class="vacio">Sin letra todavía — pegala en el campo <code style="font-family:JetBrains Mono;color:var(--amarillo)">l:</code> de esta sección dentro del archivo.</div>';
    return '<div class="sec"><div class="nom">'
      +'<span>'+x.n+'</span>'
      +'<span class="rep">'+x.x+'</span>'
      +'<span class="cps">'+x.c+'</span>'
      +(x.cue?'<span class="cue">'+x.cue+'</span>':'')
      +'</div><div class="bar">'+barra(x, ctx)+'</div>'
      +cuerpo+'</div>';
  }).join("");

  const pos=posDe(n);
  const prev=pos>1?LISTA[pos-2]:null;
  const next=pos<LISTA.length?LISTA[pos]:null;
  const pickable=s.k!=="?";
  const tonoTag=pickable
    ? '<span class="tag tono pick" id="tono">'+ctx.k.split(" ")[0]+(ctx.tr?' <small>'+(ctx.tr>0?"+":"")+ctx.tr+'</small>':'')+' ▾</span>'
    : "";

  document.getElementById("main").innerHTML='<section class="song">'
    +'<div class="cab"><span class="num">'+num(s.n)+'</span>'
    +'<h2>'+s.t+'<span class="art">'+s.a+'</span></h2></div>'
    +'<div class="meta">'
    +tonoTag
    +(zonaDe(s)&&!ctx.tr?'<span class="tag zona">'+(modo==="t"?"tríadas · ":"avanzado · ")+zonaDe(s)+'</span>':"")
    +(s.bpm!=="?"?'<span class="tag">'+s.bpm+' BPM</span>':"")
    +(s.st!=="?"?'<span class="tag">'+s.st+'</span>':"")
    +vtag+'</div>'
    +(pickable&&picker?pickerHTML(s, ctx):"")
    +(s.forma?'<div class="forma"><span class="h">Forma del tema</span>'+s.forma.replace(/→/g,'<i>→</i>')+'</div>':"")
    +(s.dud?'<div class="aviso"><b>Falta confirmar</b>'+s.dud+'</div>':"")
    +(s.rol?'<div class="rol">'+s.rol+'</div>':"")
    +'<div class="secs">'+secs+'</div>'
    +'<div id="escSong">'+escalaHTML(s.n, ctx.tr)+'</div>'
    +'<div class="nav">'
    +(prev?'<a data-go="'+prev.n+'">← '+num(prev.n)+'<small>'+prev.t+'</small></a>':'<a data-go="0">← Índice<small>volver a la lista</small></a>')
    +(next?'<a class="sig" data-go="'+next.n+'">'+num(next.n)+' →<small>'+next.t+'</small></a>':'<a class="sig" data-go="0">Índice →<small>volver a la lista</small></a>')
    +'</div></section>';

  document.querySelectorAll("[data-go]").forEach(function(a){
    a.addEventListener("click",function(){
      const g=+a.dataset.go;
      if(g===0) vistaIndice(); else vistaCancion(g);
    });
  });
  const tono=document.getElementById("tono");
  if(tono) tono.addEventListener("click",function(){ picker=!picker; vistaCancion(n, true); });
  document.querySelectorAll(".picker [data-pc]").forEach(function(b){
    b.addEventListener("click",function(){
      const orig=parseNote(s.k.split(" ")[0].replace(/m$/,""));
      picker=false;
      setTr(n, normalizeSemitones(+b.dataset.pc-orig));
    });
  });
  document.querySelectorAll(".picker [data-reset]").forEach(function(b){
    b.addEventListener("click",function(){ picker=false; setTr(n, 0); });
  });

  document.getElementById("panelLbl").innerHTML=num(s.n)+' · <b>'+s.t+'</b>'
    +(ctx.tr?' <span style="color:var(--turquesa)">· en '+ctx.k.split(" ")[0]+'</span>':'')
    +(modo!=="b"&&zonaDe(s)&&!ctx.tr?' <span style="color:var(--turquesa)">· '+zonaDe(s)+'</span>':'');
  document.getElementById("strip").innerHTML=s.secs.length
    ? acordesDe(s, ctx).map(function(par){
        const eq=(modo!=="b"&&par[1]&&par[1]!==par[0])?'<div class="eq">= '+par[1]+'</div>':'';
        return '<div class="dg"><div class="nm">'+par[0]+'</div>'+eq+diagramaDe(par[0])+'</div>';
      }).join("")
    : '<div style="color:var(--gris);font-size:13px">Sin acordes todavía.</div>';
  document.getElementById("escPanel").innerHTML=escalaHTML(s.n, ctx.tr);
  if(!keepScroll) window.scrollTo(0,0);
}

function repintar(keepScroll){
  document.body.classList.toggle("alt",modo!=="b");
  document.body.classList.toggle("sinletra",!verLetra);
  if(vista==="song"&&actual) vistaCancion(actual, keepScroll); else vistaIndice();
}

/* ============ CONTROLES ============ */
document.getElementById("volver").onclick=function(){ vistaIndice(); };
function setModo(m){
  modo=m;
  [["b","mBas"],["t","mTri"],["a","mAdv"]].forEach(function(par){
    document.getElementById(par[1]).classList.toggle("on",modo===par[0]);
  });
  repintar();
}
document.getElementById("mBas").onclick=function(){ setModo("b"); };
document.getElementById("mTri").onclick=function(){ setModo("t"); };
document.getElementById("mAdv").onclick=function(){ setModo("a"); };
document.getElementById("bLetra").onclick=function(){ verLetra=!verLetra;
  this.classList.toggle("on",verLetra);
  document.body.classList.toggle("sinletra",!verLetra); };
document.getElementById("tMas").onclick=function(){ setEsc(.1); };
document.getElementById("tMin").onclick=function(){ setEsc(-.1); };
function setEsc(d){ esc=Math.min(1.7,Math.max(.8,esc+d));
  document.documentElement.style.setProperty("--esc",esc.toFixed(2)); }

function medirBarra(){
  document.documentElement.style.setProperty("--barra",document.querySelector(".top").offsetHeight+"px");
}
window.addEventListener("resize",medirBarra);

let wl=null;
document.getElementById("wake").onclick=async function(e){
  const b=e.currentTarget;
  try{
    if(wl){ await wl.release(); wl=null; b.classList.remove("on"); b.textContent="Pantalla"; }
    else{ wl=await navigator.wakeLock.request("screen"); b.classList.add("on"); b.textContent="Encendida"; }
  }catch(err){ b.textContent="No disponible"; }
};

function hojaAbierta(){ return !document.getElementById("hoja").classList.contains("oculto"); }
function cerrarHoja(){
  if(!hojaAbierta()) return;
  document.getElementById("hoja").classList.add("oculto");
  document.getElementById("ayuda").classList.remove("on");
  document.getElementById("ayuda").setAttribute("aria-expanded","false");
}
document.getElementById("ayuda").onclick=function(){
  const abierta=hojaAbierta();
  document.getElementById("hoja").classList.toggle("oculto",abierta);
  this.classList.toggle("on",!abierta);
  this.setAttribute("aria-expanded",String(!abierta));
};
document.getElementById("hojaCerrar").onclick=function(){ cerrarHoja(); };
document.addEventListener("keydown",function(e){
  if(e.key==="Escape"&&hojaAbierta()) cerrarHoja();
});

vistaIndice(); medirBarra();
