import { SHAPES, SHAPES_ALT, SHAPES_ADV } from "../data/chords.js";

/* ============ DIAGRAMA SVG ============ */
const N_TRASTES=5;

// Pure: first fret shown by the diagram for a given shape.
// 1 = nut shown; otherwise the lowest fretted note when the shape does not
// fit in the first N_TRASTES frets or sits at fret 3 or higher without open strings.
export function baseFret(shape){
  const son=shape.filter(function(x){return x>0;});
  const hayAire=shape.indexOf(0)>-1;
  const min=son.length?Math.min.apply(null,son):1;
  const max=son.length?Math.max.apply(null,son):4;
  let base=1;
  if(max>N_TRASTES) base=min;
  else if(!hayAire && min>=3) base=min;
  return base;
}

export function libFor(modo){
  return (modo==="t")?SHAPES_ALT:(modo==="a")?SHAPES_ADV:SHAPES;
}

export function diagrama(nombre, modo){
  const lib=libFor(modo);
  const f=lib[nombre]||SHAPES[nombre]; if(!f) return "";
  return diagramaShape(f);
}

// Draws any fingering, library entry or not (transposed shapes come from resolveShape).
export function diagramaShape(f){
  if(!f) return "";
  const nTr=N_TRASTES;
  const base=baseFret(f);
  const W=88,H=98,x0=26,gx=52,cw=gx/5,y0=22,rh=(H-y0-10)/nTr;
  let s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" aria-hidden="true">';
  if(base===1){
    s+='<rect x="'+(x0-1.5)+'" y="'+(y0-4)+'" width="'+(gx+3)+'" height="4.5" fill="#F2EADC" rx="1"/>';
  }else{
    s+='<text x="'+(x0-7)+'" y="'+(y0+rh*0.5+4.5)+'" text-anchor="end" font-family="JetBrains Mono,monospace" font-size="13" font-weight="700" fill="#2FA69B">'+base+'</text>';
    s+='<text x="'+(x0-7)+'" y="'+(y0+rh*1.55+4)+'" text-anchor="end" font-family="Archivo,sans-serif" font-size="7.5" fill="#4E4A43">tr.</text>';
  }
  for(let i=0;i<6;i++) s+='<line x1="'+(x0+i*cw)+'" y1="'+y0+'" x2="'+(x0+i*cw)+'" y2="'+(y0+nTr*rh)+'" stroke="#413A32" stroke-width="1"/>';
  for(let j=0;j<=nTr;j++) s+='<line x1="'+x0+'" y1="'+(y0+j*rh)+'" x2="'+(x0+gx)+'" y2="'+(y0+j*rh)+'" stroke="#413A32" stroke-width="1"/>';
  f.forEach(function(fr,i){
    const cx=x0+i*cw;
    if(fr===-1){
      s+='<text x="'+cx+'" y="'+(y0-7)+'" font-size="10" text-anchor="middle" fill="#6B5049" font-family="Archivo,sans-serif">×</text>';
    }else if(fr===0){
      s+='<circle cx="'+cx+'" cy="'+(y0-10)+'" r="3.2" fill="none" stroke="#2FA69B" stroke-width="1.4"/>';
    }else{
      const pos=fr-base+1;
      if(pos>=1&&pos<=nTr) s+='<circle cx="'+cx+'" cy="'+(y0+(pos-.5)*rh)+'" r="5" fill="#F0B429"/>';
    }
  });
  return s+'</svg>';
}
