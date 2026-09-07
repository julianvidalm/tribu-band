/* ============ NOTACIÓN ============ */
export const LAT={"C":"DO","C#":"DO#","Db":"REb","D":"RE","D#":"MIb","Eb":"MIb","E":"MI","F":"FA","F#":"FA#","Gb":"SOLb","G":"SOL","G#":"SOL#","Ab":"LAb","A":"LA","A#":"SIb","Bb":"SIb","B":"SI"};

// notac: "en" (C D E) | "es" (DO RE MI)
export function trad(ch, notac){
  if(notac==="en") return ch;
  const m=ch.match(/^([A-G][#b]?)(.*)$/); if(!m) return ch;
  return (LAT[m[1]]||m[1])+m[2];
}
