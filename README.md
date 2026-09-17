# La Tribu · Setlist

Guía de escenario para primera guitarra y requinto de **La Tribu** (cumbia andina,
chicha, huayno y rock latino). Se usa en el iPad, sobre el atril, durante el show.

El entregable es **un solo archivo HTML que funciona offline**: sin servidor,
sin build en tiempo de ejecución y sin dependencias externas.

## Uso en el iPad

1. Generá el archivo con `npm run build` (ver abajo) o usá el último
   `dist/setlist-la-tribu.html` que tengas a mano.
2. Copialo a la app **Archivos** del iPad (iCloud Drive o almacenamiento local)
   y abrilo tocándolo.
3. Controles de la barra superior:
   - **Básico / Tríadas / Avanzado**: misma armonía con distinta densidad. En
     Tríadas y Avanzado, el nombre turquesa al lado de cada acorde es el
     acorde básico equivalente para hacer el switch en vivo.
   - **Letra**: muestra u oculta los bloques de letra.
   - **C D E / DO RE MI**: notación americana o latina.
   - **A− / A+**: tamaño de fuente.
   - **Pantalla**: Wake Lock para que no se apague la pantalla.
4. En pantallas de 800 px o más, la vista se parte en dos columnas: contenido
   del tema a la izquierda y panel fijo de diagramas y escala a la derecha.
5. **Transportar un tema**: dentro del tema, tocá la etiqueta turquesa del tono
   y elegí en qué tono tocarlo. La grilla muestra los 12 tonos del mismo modo
   (menores para un tema en menor, mayores para uno en mayor); el original va
   con borde turquesa y el elegido en amarillo. El pie indica los semitonos y
   el botón **Volver a …** restaura el original.
   - Es una transposición real, no una cejilla: cambian los nombres de los
     acordes, los diagramas de los tres modos (el acorde básico, su tríada y su
     voicing avanzado), la caja de la escala y las líneas de acordes de la
     letra. Si la biblioteca no tiene el acorde transportado, se usa la
     digitación de la misma calidad corrida por el mástil hasta el nuevo tono.
   - La transposición elegida se guarda en el dispositivo (`localStorage`,
     por tema). En la vista previa de Archivos del iPad puede no persistir
     entre aperturas: para fijarla en el archivo, usá
     `src/data/transposiciones.json` (ver abajo).
   - Mientras un tema está transportado, la etiqueta de zona del mástil
     (`zt`/`za`) no se muestra, porque describe la posición original.

## Build

Requiere Node 18 o superior. No hay dependencias que instalar.

```sh
npm run check        # valida los datos
npm test             # corre los tests unitarios
npm run build        # check + genera dist/setlist-la-tribu.html (los 26 temas)
npm run build:show   # check + genera el archivo del show (ver «Setlist de un show»)
```

- `npm run check` (`scripts/check.js`) verifica que cada digitación dé las
  notas que promete su cifrado, que las cadenas `b`/`t`/`g` de cada sección
  estén alineadas, que todo acorde usado tenga forma en alguna biblioteca, y
  emite un reporte de notas fuera del tono por tema y del estado de
  verificación del setlist. Los tres primeros puntos son bloqueantes.
- `npm test` corre los tests con el runner nativo de Node (`node:test`):
  parser de cifrados, cálculo de notas, traste base de los diagramas, parser
  de letras y el concatenador del build.
- `npm run build` se niega a generar el archivo si el validador falla.
- Las tipografías (Archivo, Archivo Black, JetBrains Mono) van vendoreadas en
  `assets/fonts/` (subset latino, `.woff2`) y el build las incrusta en base64:
  el HTML final no hace ninguna petición de red.

Genera `dist/setlist-la-tribu.html`. El script (`build/build.js`) concatena los
módulos de `src/` en orden fijo, quita las palabras `import`/`export`, envuelve
todo en una función autoejecutable y lo inserta junto con el CSS en
`src/template.html`. Es un concatenador deliberadamente simple para que siga
compilando dentro de años con Node y nada más.

## Estructura del repo

```
setlist-la-tribu.html   HTML original, sin modificar (punto de partida histórico)
assets/fonts/            tipografías .woff2 que el build incrusta en el HTML
src/
  template.html         esqueleto de la página con los marcadores {{css}} y {{js}}
  styles.css            estilos
  data/setlist.js       SET: los 26 temas con secciones y acordes por modo
  data/chords.js        SHAPES, SHAPES_ALT, SHAPES_ADV: digitaciones por modo
  data/scales.js        ESCALAS: caja pentatónica y nota de uso por tema
  data/transposiciones.json  transposición acordada por tema, en semitonos
  lib/notation.js       traducción americana ↔ latina
  lib/bars.js           partición de una cadena de acordes en compases
  lib/diagram.js        diagramas SVG de acordes y cálculo del traste base
  lib/scale.js          diagrama SVG de la pentatónica
  lib/lyrics.js         detección de líneas de acordes en los bloques de letra
  lib/transpose.js      transposición de cifrados, digitaciones, escalas y letras
  ui/app.js             estado, vistas y controles
  lib/theory.js         notas, intervalos, parser de cifrados y comparación digitación ↔ cifrado
build/build.js          genera dist/setlist-la-tribu.html
scripts/check.js        validador de datos (npm run check)
test/                   tests unitarios (npm test)
dist/                   salida del build (no se versiona)
```

## Setlist de un show

`src/data/show.json` guarda el orden definitivo de un show, por número de tema:

```json
{ "name": "Festitook", "file": "setlist-festitook.html", "order": [11, 12, 1, 2] }
```

`npm run build:show` genera `dist/<file>` (si falta `file`, se deriva del
nombre) con **solo esos temas, en ese orden**, numerados 01..N como en el
escenario. El archivo lleva igual los 26 temas adentro: el número de tema
original sigue siendo el identificador de escalas, transposiciones guardadas y
navegación, así que la misma transposición vale en los dos archivos.

El validador (sección 7) se niega a generar el archivo si el show lista un tema
que no existe, que no tiene secciones o que sigue marcado `dud`.

## Publicar en GitHub Pages

`npm run deploy` (o `bash scripts/deploy-pages.sh`) regenera los dos archivos y
los empuja a la rama `gh-pages` de `origin`, que GitHub Pages sirve en
<https://julianvidalm.github.io/tribu-band/>: `index.html` es el show actual,
`setlist-la-tribu.html` los 26 temas. Esa rama solo contiene la salida del
build y se reescribe entera en cada deploy; el código fuente vive en `main`.
Sirve como respaldo con internet cuando el archivo local no abre en el iPad.

## Transposiciones guardadas

`src/data/transposiciones.json` guarda la transposición que la banda acordó
para cada tema, en semitonos, por número de tema:

```json
{ "songs": { "2": 2, "13": -1 } }
```

Ese ejemplo abre Loca en Em (Dm + 2) y Cariñito en G#m (Am − 1). El build
inlina el archivo en el HTML, así que el valor viaja con el archivo a cualquier
dispositivo y queda versionado en git. Un valor guardado en el dispositivo desde
el selector tiene prioridad sobre el JSON; **Volver a …** deja el tema en su
tono original en ese dispositivo.

El validador (`npm run check`, sección 6) comprueba que cada acorde de cada
tema tenga una digitación válida en los tres modos en las 12 transposiciones
posibles, así el selector nunca deja un acorde sin diagrama.

## Formato de los datos

- Digitaciones: `[6ª, 5ª, 4ª, 3ª, 2ª, 1ª]`, con `-1` = no tocar y `0` = al aire.
- Acordes de una sección: `|` separa compases; dos acordes separados por
  espacios dentro del mismo compás valen medio compás cada uno. Las cadenas
  `b`, `t` y `g` de una sección deben tener el mismo número de compases y de
  acordes por compás, porque el acorde básico equivalente se calcula por posición.
- Estado de verificación `v`: `ok` = contrastado con transcripciones publicadas,
  `oido` = reconstruido de oído y a revisar con la banda, `dud` = falta
  confirmar artista o versión (con la explicación en `dud`).
- Letras: el campo `l` acepta texto plano en el formato de los sitios de
  acordes (línea de acordes arriba, línea de letra abajo, respetando los espacios).
