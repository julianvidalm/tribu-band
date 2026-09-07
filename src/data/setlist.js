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
 forma:"Intro en Am → Verso (8 frases) → Coro “oohh” → Verso → Coro → Coda",
 rol:"Dos acordes en todo el tema: <b>Am y G</b>, o sea i–♭VII. <b>No hay sensible</b> — nunca aparece el Sol#, y por eso el tema no resuelve nunca, gira. Eso es lo que le da el carácter andino, no el ritmo.<br><br>Con solo dos acordes, todo el peso está en la melodía y en la dinámica: el coro sube en intensidad sin cambiar la armonía. Si llevás la primera, construí por registro — empezá abajo y subí en cada vuelta.",
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
  {n:"Coro",x:"×2",c:"2 compases",b:"G | Am",t:"G/D | Am/C",g:"Gadd9 | Am7",l:`             G
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
o te lavas los piese o te los lavo yo

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
{n:6,t:"Ojos Azules",a:"Gilberto Rojas · 1947",k:"Am",bpm:"≈120",st:"Taquirari / huayno",v:"oido",zt:"trastes 3–8",za:"trastes 0–5",
 forma:"Intro instrumental → Verso ×2 → Estribillo → Verso → Estribillo → Coda acelerada",
 rol:"El tono La menor está confirmado, la estructura la reconstruí de oído. Dato: <b>es boliviana y originalmente un taquirari</b>, no un huayno peruano. La melodía principal es de quena y cae casi entera en la pentatónica de La menor: si la doblás en requinto, notas separadas y sin vibrato.",
 secs:[
  {n:"Verso",x:"×2",c:"4 compases",b:"Am | G | C | E7",t:"Am/C | G/D | C | E7",g:"Am7 | Gadd9 | Cadd9 | E7b9",l:`Am       C         Am       C      E7      Am
ojos azules no llores no llores ni te enamores

  F           C  F  G C  F   G  E7             Am
lloraras cuando me vaya cuando remedio ya no haya

Am          C       Am       C    E7    Am
tu me juraste quererme quererme toda la vida

F           C  F  G C     F  G  E7            Am
no pasaron dos tres dias tu te alejas y me dejas

Am        C      Am       C    E7      Am
en una copa de vino quisiera tomar veneno

 F        C  F G  C   F G E7            Am
veneno para matarme ,veneno para olvidarte`},
  {n:"Estribillo",x:"×2",c:"4 compases",b:"Am | E7 | Am | Am",t:"Am/C | E7 | Am/C | Am/C",g:"Am7 | E7b9 | Am7 | Am7",l:""}
 ]},
{n:7,t:"Gimme the Power",a:"Molotov",k:"Am",bpm:"≈100",st:"Rap rock",v:"ok",zt:"trastes 3–8",za:"trastes 0–5",
 forma:"Intro → Verso rapeado → Coro → Verso → Coro → Puente → Coro hasta el final",
 rol:"Cuatro acordes en bucle: <b>cadencia andaluza</b> (i–VII–VI–V). Como primera guitarra, el riff de octavas y los rellenos entre frases rapeadas son tuyos. El modo avanzado sobra acá: en rock crudo, básicos o quintas.",
 secs:[
  {n:"Todo el tema",x:"en bucle",c:"4 compases",b:"Am | G | F | E",t:"Am/C | G/D | F/C | E/B",g:"Am7 | Gadd9 | Fadd9 | E7b9",l:`     Am                  G  
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
{n:11,t:"El Cóndor Pasa",a:"Daniel Alomía Robles · 1913",k:"Am",bpm:"lento → ≈130",st:"Yaraví + cachua",v:"oido",zt:"trastes 3–8",za:"trastes 0–5",
 forma:"Yaraví (lento, libre) → Cachua (rápido) → Cachua hasta el final",
 rol:"Reconstruido de oído — <b>confirmame cuál arreglo hacen</b>. La andina instrumental va en La menor con dos tempos (yaraví lento y cachua rápida); la de Simon & Garfunkel va en Mi menor y es un solo tempo. Si llevás la melodía, la parte lenta es casi recitada: notas largas, sin vibrato, y silencios largos entre frases.",
 secs:[
  {n:"Yaraví (lento)",x:"×2",c:"4 compases · rubato",b:"Am | C | G | Am",t:"Am/C | C | G/D | Am/C",g:"Am7 | Cadd9 | Gadd9 | Am7",l:""},
  {n:"Cachua (rápido)",x:"×4",c:"4 compases",b:"C | G | C | Am",t:"C | G/D | C | Am/C",g:"Cadd9 | Gadd9 | Cadd9 | Am7",l:""}
 ]},
{n:12,t:"La Sirena",a:"—",k:"?",bpm:"?",st:"?",v:"dud",zt:"",za:"",forma:"",
 dud:"Hay varias: una cumbia sonidera, un carnaval andino y otras. Pasame el artista.",rol:"",secs:[]},
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
  {n:"Estribillo",x:"×2",c:"4 compases",cue:"“Nunca pero nunca…”",b:"E7 | Am | C  E7 | Am",t:"E7 | Am/C | C  E7 | Am/C",g:"E7b9 | Am7 | Cmaj7  E7b9 | Am7",l:` E             Am
nunca... pero nunca
       C     E   Am
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
 forma:"Intro instrumental → Verso ×2 → Estribillo → Verso → Estribillo → Coda",
 rol:"Venezolana, ritmo <b>orquídea</b> — invento de Hugo Blanco mezclando joropo y música cubana. El verso encadena <b>dos dominantes secundarios</b>: A7 empuja a Dm, G7 empuja a C. Si llevás la melodía, esos dos compases son donde hay que subir el Do a Do# y el Fa a Fa#; el resto es La menor plano.",
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
  {n:"Estribillo",x:"×2",c:"4 compases",cue:"“Una pena de amor…”",b:"Dm  Am | Dm  Am | F | E7",t:"Dm  Am/C | Dm  Am/C | F/C | E7",g:"Dm7  Am7 | Dm7  Am7 | Fadd9 | E7b9",l:`Dm                        Am
una pena de  amor,una tristeza
Dm                             Am
lleva el sambo manuel, en su amargura
F
pasa incansables la noche
            E
moliendo café`}
 ]},
{n:17,t:"Señora Chichera",a:"—",k:"?",bpm:"?",st:"?",v:"dud",zt:"",za:"",forma:"",
 dud:"No la identifiqué. Suena a saya o caporal boliviano. Pasame el artista.",rol:"",secs:[]},
{n:18,t:"Carnavalito + Reina de Cumbias",a:"El Humahuaqueño / Celso Piña",k:"Am",bpm:"≈130 → ≈95",st:"Carnavalito → cumbia",v:"ok",zt:"trastes 3–8",za:"trastes 0–5",
 forma:"Humahuaqueño: Verso ×2 → Estribillo ×2 → Coda → empalme → Reina de Cumbias en bucle",
 rol:"<b>Los dos están en La menor: el empalme es directo, sin modulación.</b> Eso es suerte y hay que aprovecharlo — el corte puede ser en seco, solo cambiando el tempo y el groove. El Humahuaqueño va rápido en 2/4; Reina de Cumbias baja a cumbia rebajada. La melodía del carnavalito es de quena: si la hacés en requinto, notas cortas y separadas, nada de ligados.",
 secs:[
  {n:"Humahuaqueño · verso",x:"×2",c:"4 compases",cue:"“Llegando está el carnaval…”",b:"Am  F | G7  C | Am  F | G7  C",t:"Am/C  F/C | G7  C | Am/C  F/C | G7  C",g:"Am7  Fadd9 | G13  Cadd9 | Am7  Fadd9 | G13  Cadd9",l:`   Am                F
Llegando esta el carnaval
      G7         C
quebradeño mi cholitay`},
  {n:"Humahuaqueño · estribillo",x:"×2",c:"4 compases",cue:"“Fiesta de la quebrada…”",b:"Am  C | E7  Am | C  Am | E7  Am",t:"Am/C  C | E7  Am/C | C  Am/C | E7  Am/C",g:"Am7  Cadd9 | E7b9  Am7 | Cadd9  Am7 | E7b9  Am7",l:`Am               C
Fiesta de la quebrada
       E7            Am
humahuaqueña para cantar
        C       Am
erke charango y bombo
       E7           Am
carnavalito para bailar`},
  {n:"Humahuaqueño · coda",x:"×2",c:"2 compases",cue:"“Quebradeño, humahuaqueñito”",b:"F  G7 | C",t:"F/C  G7 | C",g:"Fadd9  G13 | Cadd9",l:`F           G7          C
Quebradeño Humahuaqueñito`},
  {n:"Reina de Cumbias",x:"en bucle",c:"2 compases",b:"Am | E7",t:"Am/C | E7",g:"Am7 | E7b9",l:""}
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
Que me come poquito a poco.`}
 ]},
{n:20,t:"Baila Negra",a:"Sajama",k:"?",bpm:"?",st:"?",v:"dud",zt:"",za:"",forma:"",
 dud:"Grupo identificado, pero no encontré transcripción publicada ni análisis del audio. No te la voy a inventar. Mandame un link de YouTube o decime el tono y los acordes que usan y la armo con todo lo demás.",rol:"",secs:[]},
{n:21,t:"El Acuartillado",a:"—",k:"?",bpm:"?",st:"?",v:"dud",zt:"",za:"",forma:"",
 dud:"No la identifiqué, y tampoco estoy seguro de la grafía del título. Pasame el artista.",rol:"",secs:[]},
{n:22,t:"El Toro Pinto",a:"—",k:"?",bpm:"?",st:"?",v:"dud",zt:"",za:"",forma:"",
 dud:"No la identifiqué con certeza. Pasame el artista.",rol:"",secs:[]},
{n:23,t:"Rosa María",a:"—",k:"?",bpm:"?",st:"?",v:"dud",zt:"",za:"",forma:"",
 dud:"Hay varias con ese nombre. Pasame el artista.",rol:"",secs:[]},
{n:24,t:"María Teresa",a:"Los 50 de Joselito",k:"?",bpm:"?",st:"Cumbia",v:"dud",zt:"",za:"",forma:"",
 dud:"Grupo identificado, pero no hay transcripción publicada que pueda contrastar. Mandame un link o el tono y la armo.",rol:"",secs:[]},
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
  {n:"Todo el tema",x:"en bucle",c:"2 compases",cue:"“El camaleón cambia de colores…”",b:"Cm | Bb",t:"Cm/Eb | Bb/D",g:"Cm9 | Bb",l:`C#                      A#

El camaleón, cambia de colores
      C#        A#
no se según, la ocasión
      C#                       A#
el arco iris también cambia de colores
      C#              A#
no se según... la estación
así cambiará mi destino
                   C#
mi amor cuando tu regreses
      A#
así cambiará mi destino
                  C#
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
 ]}
];
