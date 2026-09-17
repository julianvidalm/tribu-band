/* ==========================================================================
   CÓMO AGREGAR LA LETRA DE UN TEMA
   --------------------------------------------------------------------------
   Cada sección tiene un campo  l:  vacío. Copiá el bloque desde cualquier
   sitio de acordes (lacuerda, cifraclub, acordesweb) y pegalo TAL CUAL entre
   los acentos graves ` `, respetando los espacios. Ejemplo del formato:

     l:`C           G
   Primera línea de la letra
   F           G
   Segunda línea de la letra`

   El archivo detecta solo cuáles líneas son de acordes (las pinta amarillas)
   y cuáles son de letra. No toques la alineación: los espacios son los que
   ponen cada acorde encima de su sílaba.
   ========================================================================== */

/* ============ SETLIST ============ */
export const SET=[
{n:1,t:"El Inti Sol",a:"Julio Víctor González",k:"Am",bpm:"≈100",st:"Andino",v:"ok",zt:"trastes 5–8",za:"trastes 3–5",
 forma:"Intro en Am → Verso (8 frases) → Coro “oohh” (C–G–Am) → Verso → Coro → Coda",
 rol:"El verso son dos acordes: <b>Am y G</b>, o sea i–♭VII. <b>No hay sensible</b> — nunca aparece el Sol#, y por eso el tema no resuelve nunca, gira. Eso es lo que le da el carácter andino, no el ritmo. El coro se abre con un <b>C</b> antes del G (C–G–Am, según la cifra de la banda): es el único momento en que la armonía se mueve, así que el «oohh» tiene que sonar más grande ahí.<br><br>Con tan poca armonía, todo el peso está en la melodía y en la dinámica. Si llevás la primera, construí por registro — empezá abajo y subí en cada vuelta.",
 secs:[
  {n:"Intro",x:"×2",c:"2 compases",b:"Am | Am",t:"Am/C | Am/C",g:"Am7 | Am7",l:""},
  {n:"Verso",x:"×8 frases",c:"2 compases por frase",b:"G | Am",t:"G/D | Am/C",g:"Gadd9 | Am7",l:`Am                       G
yo soy el hijo del inti sol
                            Am
de la pacha mama y del inti sol
                            G
yo soy hermano del pueblo coya
                           Am
del inca hermano y del aymara
                           G
es José Gabriel, José Gabriel
                            Am
el condorcanqui y el gran Tupac
                             G
es el Tupac Amaru el gran Tupac
                             Am
y son mis hermanos cordilleranos`},
  {n:"Coro",x:"×2",c:"4 compases",b:"C | G | Am | Am",t:"C | G/D | Am/C | Am/C",g:"Cadd9 | Gadd9 | Am7 | Am7",l:`C            G
oohh oohh oohhh
Am
oohh oohh oohhh`}
 ]},
{n:2,t:"Loca",a:"Chico Trujillo",k:"Dm",bpm:"≈97",st:"Cumbia chilena",v:"ok",zt:"trastes 3–8",za:"trastes 2–7",
 forma:"Intro punteada → Verso → Estribillo → Verso 2 → Estribillo → Solo → Estribillo final",
 rol:"<b>El punteo de la intro es tuyo.</b> Vive alrededor de los trastes 10-12 en las tres primeras cuerdas. Lo que estás tocando encima es un <b>descenso cromático en el bajo</b>: Re → Do# → Do → Si, mientras el acorde sigue siendo Rem. Ese movimiento es el gancho del tema; si lo tocás como cuatro acordes sueltos se pierde. Pensalo como una sola línea que baja.",
 secs:[
  {n:"Intro / Verso",x:"×2",c:"4 compases",cue:"“Loca, loca, loca…”",b:"Dm  Dmmaj7 | Dm7  Dm6 | Gm | A7",t:"Dm  Dmmaj7 | Dm7  Dm6 | Gm/D | A7",g:"Dm  Dmmaj7 | Dm7  Dm6 | Gm7 | A7b9",l:`Dm
Loca, loca, loca,
             Gm                         A7
te volviste loca y disparaste frente a mí.
                    Dm
Que te habías enamorado hace unos años sin decirme nada,
                Gm               A7
entonces la emoción confirma el sentimiento.

Me muero por saber que paso contigo,
en todos estos años en que no nos vimos.
Me muero por saber que paso en tu cama,
necesito esa cara de vulgaridad en mi cama,
la que pregunta por ti, la que me dice porque ...`},
  {n:"Estribillo",x:"×2",c:"6 compases",cue:"“Qué mala suerte en el amor…”",b:"Gm | A7 | Dm  Dmmaj7 | Dm7  Dm6 | Gm | A7",t:"Gm/D | A7 | Dm  Dmmaj7 | Dm7  Dm6 | Gm/D | A7",g:"Gm7 | A7b9 | Dm  Dmmaj7 | Dm7  Dm6 | Gm7 | A7b9",l:`Gm                           A7
Que mala suerte en el amor y buena suerte en el juego
Dm                       Dmmaj7               Dm7                   Dm6
Y si al final lo que hay que vivir, lo que hay que soñar, hay que vivirlo
Gm                       A7
Te vuelvo a dar gracias, te vuelvo a dar gracias.`}
 ]},
{n:3,t:"Yo Tomo",a:"Bersuit Vergarabat · «Libertinaje», 1998",k:"Am",bpm:"≈145",st:"Rock / murga",v:"ok",zt:"trastes 3–8",za:"trastes 0–5",
 forma:"Intro con power chords → Verso ×2 → Estribillo → Verso → Estribillo → Solo → Estribillo hasta el final",
 rol:"La intro son <b>quintas (power chords), no acordes completos</b>: A5–D5 alternando, con distorsión y sin tercera. Ahí no hay armonía que definir, es puro riff. En el verso pasás a acordes normales. El solo va sobre Am–Dm–E: escala menor de La, y sobre el Mi subís el Sol a Sol#.",
 secs:[
  {n:"Intro",x:"×2",c:"4 compases",b:"A5  D5 | A5  D5 | A5  D5 | E5",t:"A5  D5 | A5  D5 | A5  D5 | E5",g:"A5  D5 | A5  D5 | A5  D5 | E5",l:""},
  {n:"Verso",x:"×2 coplas",c:"4 compases",cue:"“¿Quién sos? ¿Cómo sos?…”",b:"Am | Dm | E | Am  E",t:"Am/C | Dm | E/B | Am/C  E/B",g:"Am7 | Dm7 | E7b9 | Am7  E7b9",l:`Am
Quien sos, cómo sos, cuando venís,
Dm
cuando llegaste, cuando te vas
E                            Am            E
por que te fuiste, quien se cagó (¡no fui yo!)

Am
Que hora es, que vamos a comer,
     Dm
por que me miras, que te debo yo,
    E                            Am    E
deja ese salame, llevate este jamón

Por qué no te morís,  por que no te matas
de que te reís, no se por que lloras
quien te vendió esa cara,  por que la compre yo

No se si me querés, no se si me engañas,
no se si volveré, no se si volverás
tá todo bien, está todo mal

Por qué no te dormis, por que no laburas,
yo te mantengo y no te bañas
o te lavas los “piese” o te los lavo yo

Cuanto querés, cuanto me das
cuanto tenés, cuanto cobras
quien es el boludo, o el boludo soy yo`},
  {n:"Estribillo",x:"×4",c:"2 compases",cue:"“Tomo para no enamorarme…”",b:"Am  E | E  Am",t:"Am/C  E/B | E/B  Am/C",g:"Am7  E7b9 | E7b9  Am7",l:`Am                E
Tomo para no enamorarme
      E              Am
me enamoro para no tomar
Am                 E
tomo para no enamorarme
       M             Am
me enamoro para no tomar`}
 ]},
{n:4,t:"Poco a Poco",a:"Los Tekis",k:"C / Am",bpm:"≈150",st:"Huayno",v:"ok",zt:"trastes 3–8",za:"trastes 0–5",
 forma:"Intro de quena o charango → Verso ×2 → Instrumental → Verso → empalme con Cariñito",
 rol:"Huayno <b>bimodal</b>: las frases arrancan en Do mayor y caen en La menor. No es un error de transcripción, es cómo funciona el género — el mismo material suena alegre al empezar y melancólico al terminar. Si hacés el requinto, la melodía de quena está en la pentatónica de La menor y es casi literal.",
 secs:[
  {n:"Verso",x:"×2",c:"5 compases",cue:"“Poco, poco a poco me has querido…”",b:"C  G | C | G  C | D  C | Am",t:"C  G/D | C | G/D  C | D  C | Am/C",g:"Cadd9  Gadd9 | Cadd9 | Gadd9  Cadd9 | Dadd9  Cadd9 | Am7",l:` C                   G      C
poco poco a poco me has querido
               G    C
poco apoco me has amado
                 D       C
y al final todo has cambiado
                    Am
las cositas de mi amor. x2`}
 ]},
{n:5,t:"Flor de un Día",a:"Savia Andina · «El Minero», 1980",k:"Em",bpm:"≈87",st:"Andino boliviano",v:"oido",zt:"trastes 2–8",za:"trastes 1–7",
 forma:"Intro de quena → Verso ×2 → Parte mayor → Verso → Parte mayor → Coda",
 rol:"El tono Mi menor está confirmado por análisis del audio; <b>la estructura la reconstruí de oído y hay que revisarla</b>. La melodía es de quena y charango: si la doblás en requinto, tocá <b>una octava abajo de la quena</b> o se pelean. Frases largas, sin adornos.",
 secs:[
  {n:"Verso",x:"×2",c:"4 compases",b:"Em | Bm | Em | Bm",t:"Em/B | Bm | Em/B | Bm",g:"Em9 | Bm7 | Em9 | Bm7",l:""},
  {n:"Parte mayor",x:"×2",c:"4 compases",b:"C | D | G | Em",t:"C | D | G/D | Em/B",g:"Cadd9 | Dadd9 | Gadd9 | Em9",l:""}
 ]},
{n:6,t:"Ojos Azules",a:"Gilberto Rojas · 1947",k:"Am",bpm:"≈120",st:"Taquirari / huayno",v:"ok",zt:"trastes 1–5",za:"trastes 0–5",
 forma:"Intro instrumental → Estrofa ×3 (la última repite la primera) → Coda acelerada",
 rol:"Tono y estructura verificados con la guitarra contra la transcripción de Inti-Illimani; solo la intro y la coda siguen siendo de oído. Dato: <b>es boliviana y originalmente un taquirari</b>, no un huayno peruano. La melodía principal es de quena y cae casi entera en la pentatónica de La menor: si la doblás en requinto, notas separadas y sin vibrato.",
 secs:[
  {n:"Estrofa",x:"×3, la última repite la primera",c:"8 compases · cada pareado ×2",cue:"“Ojos azules no llores…”",b:"Am | C | E7 | Am | G7 | C | E7 | Am",t:"Am/C | C | E7 | Am/C | G7 | C | E7 | Am/C",g:"Am7 | Cadd9 | E7b9 | Am7 | G13 | Cadd9 | E7b9 | Am7",l:`Am                C
Ojos azules no llores,
      E7            Am
No llores ni te enamores.     2x

     G7              C
Llorarás cuando me vaya,
       E7             Am
Cuando remedio ya no haya.    2x

Am                   C
Tú me juraste quererme,
      E7          Am
Quererme toda la vida.        2x

     G7                C
No pasaron dos, tres días,
         E7         Am
Tú te alejas y me dejas.      2x

Am               C
En una copa de vino
      E7          Am
Quisiera tomar veneno,        2x

    G7           C
Veneno para matarme,
    E7             Am
Veneno para olvidarte.        2x`}
 ]},
{n:7,t:"Gimme the Power",a:"Molotov",k:"Am",bpm:"≈100",st:"Rap rock",v:"ok",zt:"trastes 3–8",za:"trastes 0–5",
 forma:"Intro → Verso rapeado → Coro → Verso → Coro → Puente → Coro hasta el final",
 rol:"Cuatro acordes en bucle: <b>cadencia andaluza</b> (i–VII–VI–V). Como primera guitarra, el riff de octavas y los rellenos entre frases rapeadas son tuyos. El modo avanzado sobra acá: en rock crudo, básicos o quintas.",
 secs:[
  {n:"Todo el tema",x:"en bucle",c:"4 compases",b:"Am | G | F | E7",t:"Am/C | G/D | F/C | E7",g:"Am7 | Gadd9 | Fadd9 | E7b9",l:`     Am                  G  
 LA POLICIA TE ESTA EXTORSIONANDO,
     F             E 
 PERO ELLOS VIVEN DE LO QUE TU ESTAS PAGANDO,
   Am                     G  
 SI TE TRATAN COMO UN DELINCUENTE,
     F                 E 
 NO ES TU CULPA DALE GRACIAS AL REGENTE.
    Am                        G  
 AY QUE ARRANCAR EL PROBLEMA DE RAIZ,
    F                 E 
 Y SACAR AL GOBIERNO DE NUESTRO PAIS,
    Am                       G  
 A LA GENTE QUE ESTA EN LA BUROCRACIA,
     F              E 
 A ESA GENTE QUE LE GUSTA LA MIGAJA,
    Am                     G  
 YO POR ESO ME QUEJO Y ME QUEJO,
      F                           E 
 POR QUE AQUÍ ES DONDE VIVO YO YA NO SOY UN PENDEJO,
     Am                        G  
 QUE NO HUACHA LOS GUSTOS DEL GOBIERNO,
    F                       E 
 HAY PERSONAS QUE SE ESTAN ENRIQUECIENDO
     Am                 G  
 GENTE QUE VIVE EN LA POBREZA
       F                      E 
 Y NADIE HACE NADA POR QUE A NADIE LE INTERESA
     Am                   G  
 Y ESA GENTE DE ARRIBA TE DETESTA
        F                     E 
 HAY MAS GENTE QUE QUIERE QUE CAIGA EN SUS CABEZAS
     Am              G  
 Y LE DAS MAS PODER AL PODER
      F                 E 
 MAS DURO TE VAN A VENIR A COGER
     Am                  G  
 POR QUE FUIMOS POTENCIA MUDIAL
         F                E 
 SOMOS POBRES NOS MANEJAN MAL.

    Am                   G  
 DAME DAME DAME TODO EL POWER
     F                  E 
 PARA QUE LE DEMOS EN LA MADRE
    Am                  G  
 GIMI GIMI GIMI TODO EL PODER
     F                  E 
 SOLO HAY QUIEN COME RUN THE JODER

      Am                           G  
 POR QUE NO NACIMOS DONDE NO HAY QUE COMER
       F                       E 
 NO HAY POR QUE PREGUNTARNOS COMO LE VAMOS A HACER
     Am                    G  
 SI NOS PINTAN COMO UNOS HUEVONES
     F                     E 
 NO LO SOMOS VIVA MEXICO CABRONES
     Am                  G  
 QUE SE SIENTA EL PODER MEXICANO
      F                    E 
 QUE SE SIENTA TODOS JUNTOS COMO HERMANOS
     Am                       G  
 POR QUE SOMOS MAS JALAMOS MÁS PAREJO
     F                        E 
 POR QUE ESTAR SIGUIENDO A UNA BOLA DE PENDEJOS
    Am                   G  
 QUE NOS LLEVAN POR DONDE LES CONVIENE
      F                 E 
 Y ES NUESTRO SUDOR LO QUE LOS MANTIENE
     Am                    G  
 LOS MANTIENE COMIENDO PAN CALIENTE
     F             E 
 ESE PAN ES EL PAN DE NUESTRA GENTE.`}
 ]},
{n:8,t:"Ya se ha Muerto mi Abuelo",a:"—",k:"?",bpm:"?",st:"Huayno",v:"dud",zt:"",za:"",forma:"",
 dud:"Es un huayno conocido pero circula en varias versiones y tonos distintos. Decime qué grupo tocan ustedes como referencia.",rol:"",secs:[]},
{n:9,t:"La Piragua",a:"José Barros",k:"Dm",bpm:"≈100",st:"Cumbia colombiana",v:"ok",zt:"trastes 3–7",za:"trastes 2–7",
 forma:"Coro instrumental → Verso → Coro → Verso → Coro → Solo de gaita → Coro final",
 rol:"Cumbia clásica colombiana. En el original la melodía la lleva la <b>gaita</b>: si la hacés en requinto, es una línea larga y sin adornos. El verso se mueve más de lo que parece — el bloque <b>C7–F</b> te saca de Rem hacia Fa mayor por dos compases, y ahí la melodía se abre.",
 secs:[
  {n:"Coro",x:"×2",c:"4 compases",cue:"“La piragua, la piragua…”",b:"Dm | C | Dm | C",t:"Dm | C | Dm | C",g:"Dm7 | Cadd9 | Dm7 | Cadd9",l:`Dm  C Dm        C  Dm
La piragua, la piragua,
    C  Dm    C  Dm
la piragua, la piragua...`},
  {n:"Verso",x:"×4 coplas",c:"8 compases",cue:"“Me contaron los abuelos…”",b:"Dm  A7 | Dm | C7 | F | C7 | F | Dm  A7 | Dm",t:"Dm  A7 | Dm | C7 | F/C | C7 | F/C | Dm  A7 | Dm",g:"Dm7  A7b9 | Dm7 | C9 | Fadd9 | C9 | Fadd9 | Dm7  A7b9 | Dm7",l:`      Dm        A7               Dm
Me contaron lo abuelos que hace tiempo,
                C7            F
navegaba en el Cesar una piragua,
                C7            F
que partia del Banco viejo puerto
       Dm       A7           Dm
a las playas de amor en Chimichagua.

                  A7              Dm
Zapoteando el vendaval se estremecia
                C7           F
e impasible desafiaba la tormenta,
                     C7           F
y un ejercito de estrellas la seguia
     Dm          A7          Dm
tachonandola de luz y de leyenda.

         A7                    Dm
Era la piragua de Guillermo Cubillos,
         A7             Dm
era la piragua, era la piragua. (2x)

Dm                 A7           Dm
Doce bogas con la piel color majagua
                C7                 F
y con ellos el temible Pedro Albundia,
                     C7              F
en las noches a los remos le arrancaban
     Dm        A7              Dm
un melodico rugir de hermosa cumbia.

Dm                    A7          Dm
Doce sombras, ahora viejos ya no reman,
                  C7             F
ya no cruje el maderamen en el agua,
                  C7              F
solo quedan los recuerdos en la arena
       Dm       A7          Dm
donde yace dormitando la piragua.`}
 ]},
{n:10,t:"Lamento Boliviano",a:"Enanitos Verdes",k:"Em",bpm:"≈125",st:"Rock",v:"ok",zt:"trastes 2–5",za:"trastes 1–7",
 forma:"Intro → Verso ×2 → Puente → Coro ×2 → Solo → Puente → Coro ×2",
 rol:"Cuatro acordes que no cambian nunca, <b>ni siquiera en el solo</b>. Eso te deja todo el espacio: el solo del disco vive en la pentatónica de Mi menor entre el traste 12 y el nut. El B7 del cuarto compás es el único punto donde la armonía empuja — apoyate ahí para cerrar las frases.",
 secs:[
  {n:"Verso",x:"×2",c:"4 compases",cue:"“Me quieren agitar…”",b:"Em | Bm | Am | Em  B7",t:"Em/B | Bm | Am/C | Em/B  B",g:"Em9 | Bm7 | Am7 | Em9  B7b9",l:`     Em
Me quieren agitar
me incitan a gritar
 Bm7
soy como una roca
palabras no me tocan
  Am7
adentro hay un volcan
que pronto va a estallar
Em                   B7
yo quiero estar tranquilo

Em
Es mi situacion
una desolacion
Bm7
soy como un lamento
lamento boliviano
        Am7
que un dia empezo
y no va a terminar
Em            B7
ya nadie hace dan~o`},
  {n:"Puente",x:"×1",c:"4 compases",b:"Em | Bm | Am | Em  B7",t:"Em/B | Bm | Am/C | Em/B  B",g:"Em9 | Bm7 | Am7 | Em9  B7b9",l:""},
  {n:"Estribillo",x:"×2",c:"4 compases",cue:"“Y yo estoy aquí…”",b:"Em | Bm | Am | Em  B7",t:"Em/B | Bm | Am/C | Em/B  B",g:"Em9 | Bm7 | Am7 | Em9  B7b9",l:`           Em
Y hoy estoy aqui
           Bm7
borracho y loco
   A#m7 Am7
y mi corazon idiota
               Em               B7
siempre brillara (siempre brillara)
          Em
Y yo te amare
             Bm7
te amare por siempre
     A#m7  Am7
nena no te peines en la cama
          Em
que los viajantes
           B7
se van a atrasar`}
 ]},
{n:11,t:"El Cóndor Pasa",a:"Daniel Alomía Robles · 1913",k:"Em",bpm:"lento → ≈130",st:"Yaraví + cachua",v:"ok",zt:"trastes 7–10",za:"trastes 3–7",
 forma:"Tema (lento, libre) → Tema (a tempo) → Verso con Do → Tema → Verso → Tema hasta el final. Todo instrumental.",
 rol:"<b>Tono y acordes confirmados con la banda en el ensayo: Mi menor, con Em–G–D, y el verso pasa por Do.</b> Cada frase cierra con el dominante, <b>B7 → Em</b>, en la segunda mitad del último compás: es lo que hace que la vuelta a Em suene a llegada y no a repetición (las transcripciones populares en Em cierran todas las frases con ese B7; la versión en Rem hace lo mismo con A7). Es todo instrumental, así que la melodía es tuya de punta a punta. La parte lenta es casi recitada: notas largas, sin vibrato, silencios entre frases. En la parte rápida, corcheas parejas y secas, que es como fraseá la quena.<br><br>Reparto por compases, B7 de cierre y los tres modos <b>verificados con la guitarra</b>.<br><br><b>Modo Avanzado, pensado para rasguearlo funky:</b> todo vive entre los trastes 3 y 7, en cuatro cuerdas, con la 6ª (y a veces la 5ª) apagada. Em9 y Gmaj7 ponen el color; C, D y B7 van <b>limpios</b>, en tríadas altas (C en 5-5-5-3, D en 7-7-7-5, el B7 con el bajo en Fa# en 4-4-4-5), porque en un yaraví las sextas, novenas y la b9 suenan a otro género. Gmaj7 → D es un solo dedo: la cejilla del 7 se queda. Rasgueo en semicorcheas con la muñeca suelta, <b>apagando con la mano izquierda entre acento y acento</b>: los golpes mudos son el groove, los acordes son solo los acentos. Como el tema es lento, subdividí en 16 y acentuá el 2 y el 4; no aceleres el pulso, engordá la subdivisión. Si querés todavía más seco, el modo Tríadas hace lo mismo con tres cuerdas.",
 secs:[
  {n:"Tema",x:"×2 · la primera lenta",c:"4 compases",cue:"B7 en la segunda mitad del último compás",b:"Em | G | D | B7  Em",t:"Em/B | G/D | D | B  Em/B",g:"Em9 | Gmaj7 | D | B7/F#  Em9",l:""},
  {n:"Verso",x:"×2",c:"4 compases",cue:"acá entra el Do",b:"C | G | D | B7  Em",t:"C | G/D | D | B  Em/B",g:"C | Gmaj7 | D | B7/F#  Em9",l:""}
 ]},
{n:12,t:"Amor Acuático (La Sirena)",a:"Segundo Rosero",k:"Em",bpm:"?",st:"Cumbia rocolera",v:"ok",zt:"trastes 7–10",za:"trastes 7–10",
 forma:"Intro → Verso («Mar adentro») → Verso («Porque yo sé») → Intro → Coro («Un ave María») ×2 → «Yo aquí me encontré» / «Mira lo que me encontré» ×3 → «Qué chévere» → Intro y repetir",
 rol:"Cumbia rocolera ecuatoriana en Mi menor: <b>Em–G–B7</b> en el verso y el coro se abre a <b>Do mayor</b>. La intro es la frase instrumental que vuelve entre partes; si la hacés en requinto, es la misma escala que el resto del tema.<br><br><b>Arreglo de la banda</b> (cifra del repertorio): en «guía mi camino» va un <b>D</b> antes del G: <i>(D) guía mi ca-mi-(G)-no</i>. Y después del coro la vuelta es <b>G–B–Em</b> tres veces, con <b>Si mayor</b>, no Si menor: es el dominante sin séptima, y es lo que empuja de vuelta a Em. Letra de la transcripción de lacuerda; acordes y estructura <b>verificados con la guitarra</b>.",
 secs:[
  {n:"Intro",x:"×1 · vuelve entre partes",c:"8 compases",b:"Em | G | C | G | C | G | B7 | Em",t:"Em/B | G/D | C | G/D | C | G/D | B | Em/B",g:"Em9 | Gadd9 | Cadd9 | Gadd9 | Cadd9 | Gadd9 | B7b9 | Em9",l:""},
  {n:"Verso",x:"×2",c:"4 compases",cue:"«Mar adentro me voy»",b:"Em | G | B7 | Em",t:"Em/B | G/D | B | Em/B",g:"Em9 | Gadd9 | B7b9 | Em9",l:`Em
Mar adentro me voy
               G
en busca de amores, de un amor acuático
B7          Em
llamado sirena

  Em
//Porque yo sé que este amor
               G
no sabe de engaños, nada de traiciones
B7              Em
solo mil encantos//`},
  {n:"Coro",x:"×2",c:"4 compases",cue:"«Un ave María vuela, vuela»",b:"C | C | D  G | G",t:"C | C | D  G/D | G/D",g:"Cadd9 | Cadd9 | Dadd9  Gadd9 | Gadd9",l:`   C                           D           G
//Un ave María vuela vuela, guía mi cami no//`},
  {n:"«Yo aquí me encontré» / «Mira lo que me encontré»",x:"×3",c:"4 compases",b:"G | B | Em | Em",t:"G/D | B | Em/B | Em/B",g:"Gadd9 | B7 | Em9 | Em9",l:`   G                          B        Em
//yo aquí me encontré una bella sirena//
  G                      B                  Em
//Mira lo que me encontré, mira lo que me encontré//`},
  {n:"«Qué chévere»",x:"×1",c:"4 compases",b:"Em | G | Em | G",t:"Em/B | G/D | Em/B | G/D",g:"Em9 | Gadd9 | Em9 | Gadd9",l:`  Em                                  G
Que chévere que chévere que chévere papá
Em                                    G
Que chévere que chévere que chévere mamá`}
 ]},
{n:13,t:"Cariñito",a:"Los Hijos del Sol",k:"Am",bpm:"≈100",st:"Cumbia peruana",v:"ok",zt:"trastes 3–6",za:"trastes 0–5",
 forma:"Intro punteada → Verso → “Ay cariño” → Estribillo → repetir todo",
 rol:"<b>El punteo de este tema es de los más reconocibles de la cumbia peruana y te toca a vos.</b> Vive en la pentatónica de La menor, con el sonido característico de guitarra limpia con delay corto y mucho ataque. Tocá con púa cerca del puente y dejá que la percusión sostenga el groove.",
 secs:[
  {n:"Intro / Verso",x:"×2",c:"4 compases",b:"Am | C  E7 | Am | Am",t:"Am/C | C  E7 | Am/C | Am/C",g:"Am7 | Cmaj7  E7b9 | Am7 | Am7",l:`Am          C             E            Am
lloro por quererte, por amarte y por besarte
 Am          C             E           Am
sufro por quererte, por amarte y por besarte`},
  {n:"Puente",x:"×1",c:"4 compases",cue:"“Ay cariño, ay mi vida”",b:"F | C | F | C",t:"F/C | C | F/C | C",g:"Fadd9 | Cadd9 | Fadd9 | Cadd9",l:`F       C     F        C
ay... cariño ay... mi vida`},
  {n:"Estribillo",x:"×2",c:"4 compases",cue:"“Nunca pero nunca…”",b:"E7 | Am | G  C | E7  Am",t:"E7 | Am/C | G/D  C | E7  Am/C",g:"E7b9 | Am7 | Gadd9  Cmaj7 | E7b9  Am7",l:` E             Am
nunca... pero nunca
  G       C    E   Am
me abandones cariñito`}
 ]},
{n:14,t:"La Selva Amazónica",a:"Los Mirlos / versión de Chicha Libre",k:"Gm",bpm:"≈115",st:"Chicha / cumbia amazónica",v:"oido",zt:"trastes 3–8",za:"trastes 3–7",
 forma:"Riff de guitarra → Riff con variación → Estribillo cantado → Riff → Solo de órgano → Riff final",
 rol:"<b>Casi seguro es «Sonido Amazónico» de Los Mirlos</b>, que Chicha Libre versionó: la frase “en la selva amazónica no hay primavera” es de ahí. Y es <b>el tema más importante del set para vos</b>: la canción <i>es</i> el riff de guitarra, no los acordes. Vive alrededor de los trastes 3 a 6, con wah y reverb de resorte. Los dos acordes están solo para sostenerlo.<br><br>La armonía la reconstruí de oído: verificá con la banda antes del ensayo.",
 secs:[
  {n:"Riff / todo el tema",x:"en bucle",c:"2 compases",b:"Gm | D7",t:"Gm/D | D7",g:"Gm7 | D7b9",l:""}
 ]},
{n:15,t:"Escogió mi Corazón",a:"—",k:"?",bpm:"?",st:"?",v:"dud",zt:"",za:"",forma:"",
 dud:"No la identifiqué. Pasame el artista.",rol:"",secs:[]},
{n:16,t:"Moliendo Café",a:"Hugo Blanco · 1958",k:"Am",bpm:"≈120",st:"Orquídea / joropo",v:"ok",zt:"trastes 1–8",za:"trastes 0–5",
 forma:"Intro instrumental → Verso ×2 → Estribillo → «Moliendo café» (Am–G–F–E7) → Verso → Estribillo → «Moliendo café» → Coda",
 rol:"Venezolana, ritmo <b>orquídea</b> — invento de Hugo Blanco mezclando joropo y música cubana. El verso encadena <b>dos dominantes secundarios</b>: A7 empuja a Dm, G7 empuja a C. Si llevás la melodía, esos dos compases son donde hay que subir el Do a Do# y el Fa a Fa#; el resto es La menor plano.<br><br>Estribillo y salida según la cifra de la banda: el estribillo va <b>Dm → G7 → C</b> y para en <b>E7</b>, y «moliendo café» es la bajada <b>Am–G–F–E7</b>, la cadencia andaluza, que resuelve a Am.",
 secs:[
  {n:"Verso",x:"×2",c:"5 compases",cue:"“Cuando la tarde languidece…”",b:"Am | A7  Dm | G7  C | F  E7 | Am",t:"Am/C | A7  Dm | G7  C | F/C  E7 | Am/C",g:"Am7 | A7b9  Dm7 | G13  Cadd9 | Fadd9  E7b9 | Am7",l:`           Am
cuando la tarde languidese

renacen las sombras

y en la quietud los cafetales
              Dm
vuelven a sentir

echas tristón canción de amor
               Am
de la vieja molienda
            F            E
que en el letargo de la noche
          Am
parecen gemir`},
  {n:"Estribillo",x:"×2",c:"4 compases",cue:"“Una pena de amor…”",b:"Dm | Dm | G7  C | E7",t:"Dm | Dm | G7  C | E7",g:"Dm7 | Dm7 | G13  Cadd9 | E7b9",l:`Dm
una pena de amor, una tristeza
Dm                     G7           C
lleva el zambo Manuel, en su amargura
                E7
pasa incansable la noche`},
  {n:"«Moliendo café»",x:"×1 · después de cada estribillo",c:"4 compases",b:"Am  G | F  E7 | Am | Am",t:"Am/C  G/D | F/C  E7 | Am/C | Am/C",g:"Am7  Gadd9 | Fadd9  E7b9 | Am7 | Am7",l:`Am      G   F   E7   Am
moliendo café`}
 ]},
{n:17,t:"Señora Chichera",a:"Tradicional boliviana · versión Inti-Illimani",k:"Am",bpm:"?",st:"Huayno / carnaval",v:"ok",zt:"trastes 5–8",za:"trastes 0–5",
 forma:"Intro (Am–Em ×2) → Estrofa sobre Am → Estrofa C–Em–Am → Puente → Quechua ×2 (la segunda con una vuelta más) → Puente → Estrofa sobre Am → Estrofa C–Em–Am → Puente → «Lailailai» sobre el puente",
 rol:"<b>La banda la toca en La menor</b> (cifra del repertorio: C–Em–Am), dos semitonos arriba de la versión de Inti-Illimani, y con el quinto grado <b>menor</b>: Em, no E7. Sin sensible, el tema no «resuelve», gira, como el Inti Sol. No metas el Sol# por costumbre.<br><br>La gracia está en que la <b>misma letra se canta dos veces con dos armonías distintas</b>: primero clavada sobre Am (casi un pedal, como la cantan a capela), y después con el movimiento C → Em → Am que la abre. No adelantes el C en la primera pasada: ese contraste es el arreglo. El puente <b>C | Em | Am</b> es la frase instrumental que separa todas las partes y sobre la que va el «lailailai» final. Estructura y letra de la transcripción de Inti-Illimani en lacuerda.",
 secs:[
  {n:"Intro",x:"×2",c:"4 compases",b:"Am | Em | Am | Em",t:"Am/C | Em/B | Am/C | Em/B",g:"Am7 | Em7 | Am7 | Em7",l:""},
  {n:"Estrofa sobre Am",x:"×1 · toda sobre Am",c:"2 compases por frase",b:"Am | Am",t:"Am/C | Am/C",g:"Am7 | Am7",l:`Am
Señora chichera
Véndeme chichita
Señora chichera
Véndeme chichita
Si no tiene chicha
Cualquiera cosita
Huila palomita`},
  {n:"Estrofa C–Em–Am",x:"×3 frases + «Huila palomita»",c:"2 compases por frase",b:"C | Em  Am",t:"C | Em/B  Am/C",g:"Cadd9 | Em7  Am7",l:`C
Señora chichera
Em       Am
Véndeme chichita
C
Señora chichera
Em       Am
Véndeme chichita
C
Si no tiene chicha
Em            Am
Cualquiera cosita
Huila palomita`},
  {n:"Puente",x:"entre partes y al final",c:"3 compases",cue:"al final: «Lailailailai…»",b:"C | Em | Am",t:"C | Em/B | Am/C",g:"Cadd9 | Em7 | Am7",l:""},
  {n:"Estrofa en quechua",x:"×2 · la segunda con una vuelta más",c:"2 compases por frase",b:"C | Em  Am",t:"C | Em/B  Am/C",g:"Cadd9 | Em7  Am7",l:`C
Chihuanku chihuanku
Em         Am
Machayku chihuanku
C
Chihuanku chihuanku
Em         Am
Machayku chihuanku
C
China jampahatua
Em          Am
Kasayku chihuanku
Huila palomita`}
 ]},
{n:18,t:"Carnavalito + Reina de Cumbias",a:"El Humahuaqueño / Celso Piña",k:"Em",bpm:"≈130 → ≈95",st:"Carnavalito → cumbia",v:"ok",zt:"trastes 7–10",za:"trastes 0–5",
 forma:"Humahuaqueño (en Em / G): Verso ×2 → Estribillo ×2 → Coda ×2 → empalme → Reina de Cumbias (en Am) en bucle",
 rol:"<b>Tonos de la banda:</b> el Humahuaqueño va en <b>Mi menor / Sol mayor</b> y Reina de Cumbias en <b>La menor</b>. O sea que el empalme <b>sube una cuarta</b>: el Em del carnavalito pasa a ser el iv de la cumbia. El corte puede ser en seco igual — cambiás tempo, groove y caés en C–Am — pero avisá con la mirada, porque el bajo tiene que saltar de Mi a La.<br><br>El Humahuaqueño va rápido en 2/4 y vive en el relativo mayor: el verso es C–D–G y solo el estribillo cierra en B7–Em. Reina de Cumbias baja a cumbia rebajada sobre C | Am. La melodía del carnavalito es de quena: si la hacés en requinto, notas cortas y separadas, nada de ligados. Acordes de la cifra del repertorio de la banda.",
 secs:[
  {n:"Humahuaqueño · verso",x:"×2",c:"4 compases",cue:"“Llegando está el carnaval…”",b:"C  D | G | C  D | G",t:"C  D | G/D | C  D | G/D",g:"Cadd9  Dadd9 | Gadd9 | Cadd9  Dadd9 | Gadd9",l:`   C               D
Llegando está el carnaval
      G
quebradeño mi cholitay`},
  {n:"Humahuaqueño · estribillo",x:"×2",c:"4 compases",cue:"“Fiesta de la quebrada…”",b:"G  D | G  D | G  B7 | Em",t:"G/D  D | G/D  D | G/D  B | Em/B",g:"Gadd9  Dadd9 | Gadd9  Dadd9 | Gadd9  B7b9 | Em9",l:`G                D
Fiesta de la quebrada
G                 D
humahuaqueña para cantar
G                 B7
erke charango y bombo
Em
carnavalito para bailar`},
  {n:"Humahuaqueño · coda",x:"×2",c:"3 compases",cue:"“Quebradeño, humahuaqueñito”",b:"Em  B7 | Em  B7 | Em",t:"Em/B  B | Em/B  B | Em/B",g:"Em9  B7b9 | Em9  B7b9 | Em9",l:`Em         B7   Em      B7    Em
Quebradeño Humahuaqueñito`},
  {n:"Reina de Cumbias",x:"en bucle · en Am",c:"2 compases",b:"C | Am",t:"C | Am/C",g:"Cadd9 | Am7",l:""}
 ]},
{n:19,t:"La Negra Tomasa",a:"Guillermo Rodríguez Fiffe",k:"Dm",bpm:"≈88",st:"Guaracha",v:"oido",zt:"trastes 3–7",za:"trastes 5–7",
 forma:"Intro → Verso ×2 → Coro “ay ay ay” → Verso → Coro hasta el final",
 rol:"Guaracha cubana de 1938, popularizada en rock por Caifanes. Dos acordes todo el tema, así que el interés está en el fraseo. Sobre el <b>A7</b> tenés Do# y Si♭ disponibles: esas dos notas son la diferencia entre sonar a salsa y sonar a rock en menor.",
 secs:[
  {n:"Verso",x:"×4",c:"4 compases",b:"Dm | A7 | Dm | A7",t:"Dm | A7 | Dm | A7",g:"Dm7 | A7b9 | Dm7 | A7b9",l:`   Dm                               A
Estoy tan enamorado de la negra Tomasa,
                                    Dm
Que cuando se va de casa, triste me pongo.
                                   A
Estoy tan enamorado de la negra Tomasa,
                             Dm
Que cuando se va de casa, triste me pongo.

 Dm                                A
Estoy tan enamorado de mi negra preciosa
                                    Dm
Que cuando se va de casa triste me pongo.
                                   A
Estoy tan enamorado de mi negra preciosa
                                   Dm
Que cuando se va de casa triste me pongo.`},
  {n:"Coro “ay ay ay”",x:"×2",c:"4 compases",b:"Dm | Bb | A7 | Dm",t:"Dm | Bb/D | A7 | Dm",g:"Dm7 | Bbmaj7 | A7b9 | Dm7",l:` C   A#  A
Ay! Ay! Ay!

             A                    Dm
Esa negra linda que me tiene loco,
         A            Dm
Que me come poquito a poco.
            A                     Dm
Esa negra linda que me tiene loco,
         A            Dm
Que me come poquito a poco.

              A
La-ra-ra, la-ra-ra,
              Dm
la-ra-ra, la-ra-ra.
          A               Dm
Mi negra linda nunca me dejes.`}
 ]},
{n:20,t:"Baila Baila Negra",a:"Sajama",k:"Am",bpm:"?",st:"Cumbia",v:"ok",zt:"trastes 3–6",za:"trastes 0–5",
 forma:"Verso ×2 → Estribillo ×2 → «Baila negra, baila así» ×2 → repetir desde el verso",
 rol:"Dos acordes, <b>Am y E</b>, y una cumbia que se sostiene con el ritmo. La única decisión armónica es <b>cuándo cae el E</b>: en el verso entra a mitad del segundo compás (sobre «cintura») y no vuelve a Am hasta «bailar». Si te adelantás, la frase se cae. Acordes de la partitura de la banda.",
 secs:[
  {n:"Verso",x:"×2",c:"4 compases",cue:"«Baila, baila negra»",b:"Am | Am  E | E | E  Am",t:"Am/C | Am/C  E/B | E/B | E/B  Am/C",g:"Am7 | Am7  E7b9 | E7b9 | E7b9  Am7",l:`Am          Am
Baila Baila negra
    Am        E
Ay mueve la cintura
      E          E
Que a mí me da locura
    E           Am
De verte así bailar`},
  {n:"Estribillo",x:"×2",c:"4 compases",cue:"«Con tu movimiento»",b:"Am | E | E | Am",t:"Am/C | E/B | E/B | Am/C",g:"Am7 | E7b9 | E7b9 | Am7",l:`           Am                   E
Con tu movimiento me voy a morir
           E                    Am
Con tu movimiento me vas a matar`},
  {n:"Remate",x:"×2",c:"2 compases",cue:"«Baila negra, baila así»",b:"E | Am",t:"E/B | Am/C",g:"E7b9 | Am7",l:`      E          Am
Baila negra, baila así`}
 ]},
{n:21,t:"El Acuartillado",a:"—",k:"?",bpm:"?",st:"?",v:"dud",zt:"",za:"",forma:"",
 dud:"No la identifiqué, y tampoco estoy seguro de la grafía del título. Pasame el artista.",rol:"",secs:[]},
{n:22,t:"El Toro Pinto",a:"—",k:"?",bpm:"?",st:"?",v:"dud",zt:"",za:"",forma:"",
 dud:"No la identifiqué con certeza. Pasame el artista.",rol:"",secs:[]},
{n:23,t:"Rosa María",a:"Los Moonlights",k:"A",bpm:"?",st:"Cumbia",v:"oido",zt:"trastes 4–7",za:"trastes 2–7",
 forma:"Intro (vuelta del verso) → Verso → Coro",
 dud:"Transcripción publicada en lacuerda, pero su autor aclara que la sacó de oído. Falta confirmar con la grabación la cantidad de compases por frase, el tempo y el orden de las repeticiones.",
 rol:"Tres acordes en La mayor: <b>A, E y D</b>, o sea I–V–IV. El verso hace dos vueltas cortas A–E–A y después dos vueltas D–A–E–A; el coro alterna E y A. Como primera guitarra, la melodía de cumbia va en la pentatónica mayor de La.",
 secs:[
  {n:"Intro",x:"×1",c:"vuelta completa del verso, instrumental",b:"A | E | A | A | E | A | D | A | E | A | D | A | E | A",t:"A/C# | E/B | A/C# | A/C# | E/B | A/C# | D | A/C# | E/B | A/C# | D | A/C# | E/B | A/C#",g:"Aadd9 | E9 | Aadd9 | Aadd9 | E9 | Aadd9 | Dadd9 | Aadd9 | E9 | Aadd9 | Dadd9 | Aadd9 | E9 | Aadd9",l:""},
  {n:"Verso",x:"×1 por verso",c:"14 compases",cue:"“Rosa María se fue a la playa…”",b:"A | E | A | A | E | A | D | A | E | A | D | A | E | A",t:"A/C# | E/B | A/C# | A/C# | E/B | A/C# | D | A/C# | E/B | A/C# | D | A/C# | E/B | A/C#",g:"Aadd9 | E9 | Aadd9 | Aadd9 | E9 | Aadd9 | Dadd9 | Aadd9 | E9 | Aadd9 | Dadd9 | Aadd9 | E9 | Aadd9",l:`A                                          E                 A
Rosa María se fue a la playa, se fue a la playa, se fue a bañar
A                                          E                 A
Rosa María se fue a la playa, se fue a la playa, se fue a bañar
D                                A
Y cuando estaba sentadita en la arena
                  E                       A
Me decía con su boquita "Vente vamos a bailar"
D                                A
Y cuando estaba sentadita en la arena
                  E                       A
Me decía con su boquita "Vente vamos a bailar"`},
  {n:"Coro",x:"×4",c:"2 compases",cue:"“Rosa María, baila mi cumbia…”",b:"E | A",t:"E/B | A/C#",g:"E9 | Aadd9",l:`E                     A
Rosa María, baila mi cumbia mamá`}
 ]},
{n:24,t:"María Teresa",a:"Los 50 de Joselito",k:"Ebm",bpm:"?",st:"Cumbia",v:"oido",zt:"trastes 4–8",za:"trastes 1–6",
 forma:"Punteo → Estrofa → Coro “Con el negrito Vicente” → Punteo → Estrofa → Coro → Punteo → Estrofa → Coro",
 dud:"Acordes y letra según la transcripción de cifraclub. Falta confirmar con la grabación la cantidad de compases por frase y qué armonía va debajo del punteo de la intro (la fuente no lo indica, por eso esa sección no lleva acordes).",
 rol:"Dos acordes en todo el tema: <b>Ebm y Db</b>, o sea i–♭VII, la misma relación que El Camaleón. <b>El punteo tabulado es tuyo</b> y vuelve al inicio de cada estrofa: vive en la 1ª y 2ª cuerda entre los trastes 4 y 14. Cifraclub lo escribe como D#m y C#; acá va como Ebm y Db, que es la grafía usual de la tonalidad.",
 secs:[
  {n:"Punteo",x:"al inicio de cada estrofa",c:"ver tab",b:"",t:"",g:"",l:`E|-11-11-11-11-11-14-11--6-6-------|
B|-11-11-11-11-11-------7----9-7-6-|

E|-6-6-6-6-6-10-6--4-4---------|
B|----------------6----7-6-4---|

E|-------------------------11----6-6------|
B|-12h11-11-11-12h11-11-11---11-7---9-7-6-|

E|-6-6-6-6-6-10-6-6s7-6-4-----------|
B|------------------------7-6-4-----|

E|--4-4------|
B|-6----7-6-|

E|---11-11-13-14--|
B|-11-------------|
Estos punteos se dan al inicio de cada estrofa.`},
  {n:"Estrofa",x:"×2 por estrofa",c:"compases por confirmar",cue:"“María Teresa tiene ganas de cumbanchar…”",b:"Ebm | Db | Ebm",t:"Ebm | Db | Ebm",g:"Ebm9 | Dbadd9 | Ebm9",l:` Ebm                             Db
Maria teresa tiene ganas de cumbanchar
                                      Ebm
Cuando suena la orquesta empieza a revolear x2

Ebm                              Db
Maria teresa baila merengue apambichao
                                      Ebm
Tambien baila guaracha guandango y currulao x2

Ebm                                      Db
Cuando suena el merengue el mambo y el danzon
                                      Ebm
Maria se vuelve ausente en medio del salón x2`},
  {n:"Coro",x:"×4",c:"compases por confirmar",cue:"“Con el negrito Vicente…”",b:"Db | Ebm",t:"Db | Ebm",g:"Dbadd9 | Ebm9",l:`                 Db                   Ebm
Con el negrito Vicente que la sabe manejar
                 Db                      Ebm
Con el compadre clemente ese si la hace sudar
                 Db                        Ebm
Con el negrito Mendoza que es ciclón pa’ guarachar
                      Db                     Ebm
Con don Virgilio el pecoso que goloso pa’ rumbear`}
 ]},
{n:25,t:"El Ratón",a:"Cheo Feliciano · Fania",k:"Am",bpm:"≈94",st:"Salsa",v:"ok",zt:"trastes 3–8",za:"trastes 0–6",
 forma:"Intro → Verso largo → Puente → Coro / montuno → Solos → Coro hasta el final",
 rol:"El verso tiene el truco del tema: <b>C7 → B7 → B♭7, tres dominantes bajando cromáticamente</b> antes de volver al Lam. No son acordes de paso, es la armonía. Como primera guitarra podés doblar esa bajada con las terceras y séptimas en vez de rasguear los acordes enteros — así se oye el movimiento.",
 secs:[
  {n:"Verso",x:"×8 frases",c:"2 compases",cue:"“Mi gato se está quejando…”",b:"Am  C7 | B7  Bb7",t:"Am/C  C7 | B7  Bb7",g:"Am7  C9 | B7  Bb7",l:`Mi gato se está quejando 
porque no puede vacilar
si donde quiera que se mete
su gata lo va a buscar
de noche brinca la berja 
que esta detras de mi casa
a ver si puede fugarse
sin que ella lo pueda ver
y no tan pronto, no tan pronto está de fiesta
silvestre felino tiene que echar a correr
esto si serio mi amigo
oye que lio, que lio se va a formar
cuando mi gatito sepa
y es tan simple la razón
que el que a su gata le cuenta
que el que a su gata le cuenta
no es nada más que un raton, un ratón`},
  {n:"Puente",x:"×1",c:"4 compases",b:"Am | F | Em | E7",t:"Am/C | F/C | Em/B | E7",g:"Am7 | Fadd9 | Em7 | E7b9",l:""},
  {n:"Coro / montuno",x:"muchas veces",c:"4 compases",cue:"“De cualquier maya sale un ratón…”",b:"Am | Dm | E7 | Am",t:"Am/C | Dm | E7 | Am/C",g:"Am7 | Dm7 | E7b9 | Am7",l:`Am          C/G     Bm7b5     E7  
De cualquier maya sale un ratón oye (bis)

Am            C/G        
Echale semilla a la maraca pa´que suene
Bm7b5             E7    
Cha cu cha currucucha cu cha (4 veces)`}
 ]},
{n:26,t:"El Camaleón",a:"Widinson",k:"Cm",bpm:"≈115",st:"Tecnocumbia ecuatoriana",v:"oido",zt:"trastes 6–8",za:"trastes 1–5",
 forma:"Intro de teclado → Verso → Estribillo → Verso → Estribillo → Solo → Estribillo",
 rol:"Dos acordes en todo el tema: <b>Cm y B♭</b>, o sea i–♭VII. Eso significa que <b>no hay sensible</b> — nunca aparece el Si natural — y por eso suena modal y no resuelve nunca. Todo el interés está en la melodía. Si hacés el requinto, esa línea es el tema: el acompañamiento es solo colchón.<br><br><b>Verificá el tono con la banda:</b> las transcripciones circulan en Cm y en Ebm, un tono y medio de diferencia. Puse Cm, que es lo que da el análisis del audio.",
 secs:[
  {n:"Todo el tema",x:"en bucle",c:"2 compases",cue:"“El camaleón cambia de colores…”",b:"Cm | Bb",t:"Cm/Eb | Bb/D",g:"Cm9 | Bb",l:`El camaleón, cambia de colores
no se según, la ocasión
el arco iris también cambia de colores
no se según... la estación
así cambiará mi destino
mi amor cuando tu regreses
así cambiará mi destino
mi amor cuando tu regreses

Sea verde, que sea rojo, sea amarillo
cualquier color, puede ser menos el gris
Sea verde, que sea rojo, sea amarillo
cualquier color, puede ser menos el gris
porque grises fueron los días que yo viví
cuando te perdí mi amor
porque grises fueron los días que yo viví
cuando te perdí mi amor

Para ti papá, cuando te perdí mi amor
Para ti papá, cuando te perdí mi amor`}
 ]},
{n:27,t:"La Guaneña",a:"Tradicional de Nariño · versión Chimizapagua",k:"Em",bpm:"≈100 (negra con puntillo)",st:"Bambuco sureño · 6/8",v:"ok",zt:"trastes 7–10",za:"trastes 0–5",
 forma:"A ×2 → B ×2 (cantadas, C–G–B7–Em) → C ×2 (instrumental, G–B7–Em) → vuelta con la siguiente copla → Coda Em–B7",
 rol:"Bambuco en <b>6/8</b>, no cumbia: el acompañamiento va en dos pulsos de tres corcheas y cada tanto cruza a tres negras (hemiola). Eso es lo primero que hay que sentir, antes que los acordes.<br><br><b>Tono de la banda: Mi menor</b> (cifra del repertorio). Y ojo con el arranque: la frase cantada <b>empieza en C</b>, el sexto grado, no en la tónica: <b>C | G | B7 | Em</b>. La frase instrumental de quena se queda en <b>G | G | B7 | Em</b>. Son cuatro frases de cuatro compases que se repiten; las coplas se cantan sobre A y B y la C es la respuesta instrumental. El reparto por compases dentro de cada frase es mío, contrastado con la partitura de Carlos H. Motta.",
 secs:[
  {n:"A",x:"×2",c:"4 compases",cue:"«Guay que sí, guay que no»",b:"C | G | B7 | Em",t:"C | G/D | B | Em/B",g:"Cadd9 | Gadd9 | B7b9 | Em9",l:`C                  G
Guay que sí, guay que no
B7                 Em
la Guaneña me engañó`},
  {n:"B",x:"×2",c:"4 compases",cue:"«Por un peso y cuatro reales»",b:"C | G | B7 | Em",t:"C | G/D | B | Em/B",g:"Cadd9 | Gadd9 | B7b9 | Em9",l:`C                     G
Por un peso y cuatro reales
B7                 Em
con tal que la quiera yo`},
  {n:"C · instrumental",x:"×2",c:"4 compases",cue:"respuesta de quena",b:"G | G | B7 | Em",t:"G/D | G/D | B | Em/B",g:"Gadd9 | Gadd9 | B7b9 | Em9",l:""},
  {n:"Coda",x:"×1",c:"4 compases",b:"Em  B7 | Em  B7 | Em  B7 | Em",t:"Em/B  B | Em/B  B | Em/B  B | Em/B",g:"Em9  B7b9 | Em9  B7b9 | Em9  B7b9 | Em9",l:""}
 ]},
{n:28,t:"La Danza de los Mirlos",a:"Los Mirlos · 1973",k:"Am",bpm:"≈92",st:"Cumbia amazónica · instrumental",v:"ok",zt:"trastes 5–8",za:"trastes 0–5",
 forma:"A ×4 → B ×2 → C ×3 → A ×4 → B ×2 → C ×3 → D ×4 → E ×4 → A ×4 → B ×2 → C ×3 → Coda (dobles cuerdas Sol→La y se va bajando)",
 rol:"<b>Todo el tema es la primera guitarra: cinco frases de dos compases que se repiten en un orden fijo, y el resto acompaña.</b> Debajo de A, B y C el bajo hace <b>Am | E7</b>; debajo de D y E cambia a <b>Am | G</b>. Ese cambio de bajo es la única «modulación» del tema y es lo que hace que D y E suenen a otra parte aunque sigan en La menor.<br><br>La forma es tres bloques iguales <b>A–B–C</b> con el bloque agudo <b>D–E</b> metido entre el segundo y el tercero. Contá las vueltas: A cuatro, B dos, C tres, siempre. En la última C de cada bloque, la frase se acorta para volver a A. Las frases A, B y C viven en las cuerdas 5ª a 3ª en primera posición; D y E saltan a los trastes 8 a 12. Guitarra limpia, con delay corto o reverb de resorte: el sonido es parte del tema. Transcripción de lacuerda (Los Mirlos y la versión de Damas Gratis), forma confirmada por el tab de bajo y <b>verificada con la guitarra</b>.",
 secs:[
  {n:"A · riff principal",x:"×4",c:"2 compases por vuelta",cue:"arranca sobre la 5ª al aire",b:"Am | E7",t:"Am/C | E7",g:"Am7 | E7b9",l:`e|--------------------------------|
B|--------------------------------|
G|--------------------------------|
D|-----------0h2-2-2-2---0--------|
A|-0-0-0-0-3-----------2----------|
E|--------------------------------|  ×4`},
  {n:"B",x:"×2",c:"2 compases por vuelta",b:"Am | E7",t:"Am/C | E7",g:"Am7 | E7b9",l:`e|--------------------------------|
B|--------0-0-0-0h3---------------|
G|-1---1------------0-3-----------|
D|---2------------------2---------|  ×2`},
  {n:"C",x:"×3 · la última acortada para volver a A",c:"2 compases por vuelta",b:"Am | E7",t:"Am/C | E7",g:"Am7 | E7b9",l:`e|---------------------------------|
B|--------0-3-2-1-0----------------|
G|--1---1-----------3-1-0-3-1-0----|
D|----2-------------------------2--|  ×3`},
  {n:"D · frase aguda",x:"×4",c:"2 compases por vuelta",cue:"el bajo pasa a Am | G",b:"Am | G",t:"Am/C | G/D",g:"Am7 | Gadd9",l:`e|----------8-10/12-12-12----10-8-------|
B|--10---10---------------12------10----|
G|-----9--------------------------------|  ×4`},
  {n:"E",x:"×4 · la última termina subiendo al traste 15",c:"2 compases por vuelta",b:"Am | G",t:"Am/C | G/D",g:"Am7 | Gadd9",l:`e|-----------------------------------|
B|----------1------------------------|
G|--2-2-2-2---2-0-0-0-0-4-2----------|  ×4`},
  {n:"Coda",x:"hasta que baje el volumen",c:"2 compases por vuelta",cue:"dobles cuerdas Sol → La",b:"Am | G",t:"Am/C | G/D",g:"Am7 | Gadd9",l:`B|-1------3-3-3---3---3/5-5-5---5--------5--|
G|-2------------3---3---------5---5------5--|`}
 ]}
];
