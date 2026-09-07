/* ============ LETRAS ============ */
export function escapeHtml(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}

/* Detecta si una línea es de acordes (solo cifrados y espacios) */
export const RE_AC=/^[\s]*(?:[A-G][#b]?(?:maj|m|min|dim|aug|sus|add)?[0-9#b\/A-Gsu]*[\s\-\|]*)+$/;

export function isChordLine(line){ return RE_AC.test(line); }

export function letraHTML(txt){
  if(!txt) return "";
  return txt.split("\n").map(function(li){
    if(li.trim()==="") return '<span class="lt"> </span>';
    if(isChordLine(li)) return '<span class="ac">'+escapeHtml(li)+'</span>';
    return '<span class="lt">'+escapeHtml(li)+'</span>';
  }).join("\n");
}
