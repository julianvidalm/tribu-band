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

## Build

Requiere Node 18 o superior. No hay dependencias que instalar.

```sh
npm run check   # valida los datos
npm test        # corre los tests unitarios
npm run build   # check + genera dist/setlist-la-tribu.html
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

Genera `dist/setlist-la-tribu.html`. El script (`build/build.js`) concatena los
módulos de `src/` en orden fijo, quita las palabras `import`/`export`, envuelve
todo en una función autoejecutable y lo inserta junto con el CSS en
`src/template.html`. Es un concatenador deliberadamente simple para que siga
compilando dentro de años con Node y nada más.

## Estructura del repo

```
setlist-la-tribu.html   HTML original, sin modificar (punto de partida histórico)
src/
  template.html         esqueleto de la página con los marcadores {{css}} y {{js}}
  styles.css            estilos
  data/setlist.js       SET: los 26 temas con secciones y acordes por modo
  data/chords.js        SHAPES, SHAPES_ALT, SHAPES_ADV: digitaciones por modo
  data/scales.js        ESCALAS: caja pentatónica y nota de uso por tema
  lib/notation.js       traducción americana ↔ latina
  lib/bars.js           partición de una cadena de acordes en compases
  lib/diagram.js        diagramas SVG de acordes y cálculo del traste base
  lib/scale.js          diagrama SVG de la pentatónica
  lib/lyrics.js         detección de líneas de acordes en los bloques de letra
  ui/app.js             estado, vistas y controles
  lib/theory.js         notas, intervalos, parser de cifrados y comparación digitación ↔ cifrado
build/build.js          genera dist/setlist-la-tribu.html
scripts/check.js        validador de datos (npm run check)
test/                   tests unitarios (npm test)
dist/                   salida del build (no se versiona)
```

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
