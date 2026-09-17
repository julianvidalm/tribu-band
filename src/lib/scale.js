import { ESCALAS } from "../data/scales.js";
import { transposeScale } from "./transpose.js";

/* ============ ESCALA PENTATÓNICA ============ */
export function escalaSVG(R,tipo,raiz){
  const men=[[R,R+3],[R,R+2],[R,R+2],[R,R+2],[R,R+3],[R,R+3]];
  const may=[[R,R+2],[R-1,R+2],[R-1,R+2],[R-1,R+1],[R,R+2],[R,R+2]];
  const sh=(tipo==="menor")?men:may;              // índice 0 = 6ª cuerda
  let lo=99,hi=0;
  sh.forEach(function(p){p.forEach(function(f){ if(f<lo)lo=f; if(f>hi)hi=f; });});
  const cells=hi-lo+1;
  const W=300,H=150,L=16,Rp=14,top=20,gap=19;
  const cw=(W-L-Rp)/cells, x2=W-Rp, yBot=top+5*gap;
  let s='<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';
  // cuerdas (arriba = 1ª)
  for(let i=0;i<6;i++){
    const y=top+i*gap;
    s+='<line x1="'+L+'" y1="'+y+'" x2="'+x2+'" y2="'+y+'" stroke="#413A32" stroke-width="'+(1+i*0.22).toFixed(2)+'"/>';
  }
  // trastes
  for(let i=0;i<=cells;i++){
    const x=L+i*cw;
    const grueso=(lo===1&&i===0);
    s+='<line x1="'+x+'" y1="'+top+'" x2="'+x+'" y2="'+yBot+'" stroke="'+(grueso?"#F2EADC":"#413A32")+'" stroke-width="'+(grueso?4:1)+'"/>';
  }
  // números de traste
  for(let i=0;i<cells;i++){
    s+='<text x="'+(L+(i+0.5)*cw)+'" y="'+(yBot+22)+'" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="11" fill="#6D675E">'+(lo+i)+'</text>';
  }
  // notas
  const raizEn={0:R,2:R+2,5:R};
  sh.forEach(function(pares,si){
    const y=top+(5-si)*gap;
    pares.forEach(function(f){
      const x=L+(f-lo+0.5)*cw;
      const esRaiz=(raizEn[si]===f);
      if(esRaiz){
        s+='<circle cx="'+x+'" cy="'+y+'" r="8.5" fill="#2FA69B"/>';
        s+='<text x="'+x+'" y="'+(y+3.6)+'" text-anchor="middle" font-family="Archivo,sans-serif" font-weight="700" font-size="9" fill="#0E1512">'+raiz+'</text>';
      }else{
        s+='<circle cx="'+x+'" cy="'+y+'" r="6.5" fill="#F0B429"/>';
      }
    });
  });
  return s+'</svg>';
}

// Shared lookup: the (possibly transposed) ESCALAS entry for song n, or null.
// tr: semitones of transposition (0 = original)
function escalaEntry(n, tr){
  const e0=ESCALAS[n]; if(!e0) return null;
  return tr?transposeScale(e0,tr):e0;
}

// Note HTML shown inside .escBlk .n — the same content escalaHTML embeds.
function escalaNotaHTML(e){
  return '<b style="color:var(--turquesa)">●</b> raíz · desde esta caja te movés por CAGED a las otras cuatro posiciones.<br><br>'+e.n;
}

export function escalaHTML(n, tr){
  const e=escalaEntry(n,tr); if(!e) return "";
  const nombre=e.r+" "+(e.t==="menor"?"menor pentatónica":"mayor pentatónica");
  return '<div class="escBlk"><div class="h">Para improvisar</div>'
    +'<div class="t">'+nombre+' · traste '+(e.t==="menor"?e.R:e.R-1)+'</div>'
    +escalaSVG(e.R,e.t,e.r)
    +'<div class="n">'+escalaNotaHTML(e)+'</div></div>';
}

// Just the note HTML for song n (see escalaHTML), or "" when there is no
// scale entry or no note.
export function escalaNota(n, tr){
  const e=escalaEntry(n,tr);
  if(!e||!e.n) return "";
  return escalaNotaHTML(e);
}
