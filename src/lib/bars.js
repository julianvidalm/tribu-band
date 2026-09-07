/* ============ COMPASES ============ */
// Single source of truth for splitting a chord string into bars.
// "G  Am | C" -> [["G","Am"],["C"]]
// "|" separates bars; whitespace separates chords inside a bar.
export function splitBars(str){
  return String(str||"").split("|").map(function(c){
    return c.trim().split(/\s+/).filter(Boolean);
  });
}
