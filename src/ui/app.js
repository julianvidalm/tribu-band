import { SET } from "../data/setlist.js";
import { trad } from "../lib/notation.js";
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
let modo="b", notac="en", esc=1, vista="indice", actual=null, verLetra=true, picker=false;

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
      const eq=(modo!=="b"&&tb&&tb!==t)?'<span class="eq">'+trad(tb, notac)+'</span>':'';
      return '<span class="c'+(i>0?" sec2":"")+'">'+trad(t, notac)+eq+'</span>';
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
  document.getElementById("volver").classList.add("oculto");
  document.getElementById("marca").innerHTML='LA <span>TRIBU</span>';
  document.getElementById("main").innerHTML=
    '<div class="hero"><h1>26 temas.<br>Primera guitarra y requinto.</h1>'
    +'<p>26 temas · primera guitarra y requinto. Tocá uno para abrirlo solo.<br><br>'+'Los tres modos son para cuando <b>acompañás</b>. Cuando llevás la melodía, lo que importa es el bloque de escala al final de cada tema y la nota sobre qué hace el requinto ahí.<br>'
    +'<b>Básico</b> — acordes abiertos en primera posición.<br>'
    +'<b>Tríadas</b> — tres notas sobre las cuerdas 3ª, 2ª y 1ª. El skank de ska y reggae: agudo, seco, deja libre todo el registro del bajo.<br>'
    +'<b>Avanzado</b> — séptimas, novenas y trecenas en cajas de cuatro cuerdas, elegidas según el género de cada tema.<br><br>'
    +'Los dos últimos indican la zona del mástil donde vive el tema. La armonía es la misma en los tres: cambia cuántas notas tocás y cuáles.</p></div>'
    +'<div class="indice">'+SET.map(function(s){
      const ctx=trCtx(s);
      const kk=s.k==="?"?"?":trad(ctx.k.split(" ")[0], notac)+(ctx.tr?'<small>orig. '+trad(s.k.split(" ")[0], notac)+'</small>':'');
      return '<div class="item '+(s.v==="dud"?"dud":"")+'" data-n="'+s.n+'">'
        +'<span class="num">'+String(s.n).padStart(2,"0")+'</span>'
        +'<span><span class="tt">'+s.t+'</span><span class="aa">'+s.a+'</span></span>'
        +'<span class="kk">'+kk+'</span></div>';
    }).join("")+'</div>'
    +'<footer><b>Cómo agregar la letra.</b> El archivo trae un hueco de letra en cada sección, vacío. '
    +'Abrí el .html con cualquier editor de texto, buscá el campo <code>l:</code> de la sección y pegá '
    +'entre los acentos graves el bloque copiado de un sitio de acordes, sin tocar los espacios. '
    +'El archivo separa solo las líneas de acordes de las de letra.<br><br>'
    +'<b>Diagramas.</b> Barra blanca gruesa arriba = cejuela. Número turquesa a la izquierda = traste donde arranca la caja. '
    +'<span style="color:var(--turquesa)">○</span> cuerda al aire · <span style="color:#6B5049">×</span> cuerda que no suena. '
    +'Las × no son opcionales: en las tríadas suenan solo tres cuerdas. Si dejás sonar las graves, pisás al bajo y se pierde el motivo de tocarlas arriba.<br><br>'+'<b>El nombre turquesa</b> al lado de cada acorde es el <b>acorde básico equivalente</b>. Si en medio del tema no te sale una posición, tocá ese y no se cae nada: la función armónica es la misma, solo pierde el color.<br><br>'+'<b>Nombres con barra.</b> <code>F/C</code> es Fa con Do como nota más grave: la misma tríada con las notas en otro orden. Aparecen mucho en modo Tríadas porque son justamente lo que permite encadenar acordes sin mover la mano.<br><br>'+'<b>Modo Avanzado.</b> Muchos de esos acordes van <b>sin fundamental</b> — el <code>A7</code> avanzado no toca ningún La. No es un error: la fundamental la pone el bajo, y vos aportás las notas que definen el color (tercera, séptima, novena).<br><br>'
    +'<b>Transportar.</b> Tocá la etiqueta del tono dentro de un tema y elegí en qué tono tocarlo. Cambian los acordes, los diagramas, la escala y las líneas de acordes de la letra; no es una cejilla.<br><br>'
    +'<span style="color:var(--turquesa)">verificado</span> = contrastado con transcripciones publicadas · '
    +'<span style="color:var(--amarillo)">por oído</span> = reconstruido, revisar con la banda · '
    +'<span style="color:var(--rojo)">sin identificar</span> = falta confirmar artista y versión.</footer>';

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
    g+='<button class="'+cls+'" data-pc="'+pc+'">'+trad(keyName(pc,mode), notac)+'</button>';
  }
  const foot=ctx.tr
    ? '<span>'+trad(keyName(sel,mode), notac)+' = '+(ctx.tr>0?"+":"")+ctx.tr+' semitonos</span>'
      +'<button class="btn" data-reset="1">Volver a '+trad(tok, notac)+'</button>'
    : '<span>tono original</span>';
  return '<div class="picker"><div class="h">Tocar en</div><div class="grid">'+g+'</div><div class="foot">'+foot+'</div></div>';
}

function vistaCancion(n, keepScroll){
  if(actual!==n) picker=false;
  vista="song"; actual=n;
  const s=SET.find(function(x){return x.n===n;});
  const ctx=trCtx(s);
  document.getElementById("volver").classList.remove("oculto");
  document.getElementById("marca").innerHTML=String(s.n).padStart(2,"0")+' · '+s.t;

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

  const prev=SET.find(function(x){return x.n===n-1;});
  const next=SET.find(function(x){return x.n===n+1;});
  const pickable=s.k!=="?";
  const tonoTag=pickable
    ? '<span class="tag tono pick" id="tono">'+trad(ctx.k.split(" ")[0], notac)+(ctx.tr?' <small>'+(ctx.tr>0?"+":"")+ctx.tr+'</small>':'')+' ▾</span>'
    : "";

  document.getElementById("main").innerHTML='<section class="song">'
    +'<div class="cab"><span class="num">'+String(s.n).padStart(2,"0")+'</span>'
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
    +'<div id="escSong">'+escalaHTML(s.n, notac, ctx.tr)+'</div>'
    +'<div class="nav">'
    +(prev?'<a data-go="'+prev.n+'">← '+String(prev.n).padStart(2,"0")+'<small>'+prev.t+'</small></a>':'<a data-go="0">← Índice<small>volver a la lista</small></a>')
    +(next?'<a class="sig" data-go="'+next.n+'">'+String(next.n).padStart(2,"0")+' →<small>'+next.t+'</small></a>':'<a class="sig" data-go="0">Índice →<small>volver a la lista</small></a>')
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

  document.getElementById("panelLbl").innerHTML=String(s.n).padStart(2,"0")+' · <b>'+s.t+'</b>'
    +(ctx.tr?' <span style="color:var(--turquesa)">· en '+trad(ctx.k.split(" ")[0], notac)+'</span>':'')
    +(modo!=="b"&&zonaDe(s)&&!ctx.tr?' <span style="color:var(--turquesa)">· '+zonaDe(s)+'</span>':'');
  document.getElementById("strip").innerHTML=s.secs.length
    ? acordesDe(s, ctx).map(function(par){
        const eq=(modo!=="b"&&par[1]&&par[1]!==par[0])?'<div class="eq">= '+trad(par[1], notac)+'</div>':'';
        return '<div class="dg"><div class="nm">'+trad(par[0], notac)+'</div>'+eq+diagramaDe(par[0])+'</div>';
      }).join("")
    : '<div style="color:var(--gris);font-size:13px">Sin acordes todavía.</div>';
  document.getElementById("escPanel").innerHTML=escalaHTML(s.n, notac, ctx.tr);
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
document.getElementById("nEn").onclick=function(){ notac="en";
  document.getElementById("nEn").classList.add("on");
  document.getElementById("nEs").classList.remove("on"); repintar(); };
document.getElementById("nEs").onclick=function(){ notac="es";
  document.getElementById("nEs").classList.add("on");
  document.getElementById("nEn").classList.remove("on"); repintar(); };
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

vistaIndice(); medirBarra();
