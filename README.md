# Sofka_challengue
Test de admisión para la liga de desarrollo Sofka


# ¿Quién quiere ser Sofkiano?


## Objetivos del Reto

- Manejo de clases u objetos a nivel de modelamiento.
- Persistencia de datos o guardado de históricos.
- Manejo de listas o colecciones y ciclos de control adecuados.
- Construir un juego de preguntas utlizando para este reto React, Redux, Node y Sequelize (PostgreSQL) (por motivación propia).
- Manejo del workflow de GIT.

## Comenzando



## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

### Instalación

Dentro de la carpeta api y client, ejecutar los siguientes comandos:

```javascript
npm install
npm start
```

En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgreSQL. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

Adicionalmente será necesario que se cree desde PostgreSQL una base de datos llamada `sofka`

El contenido de `client` fue creado usando: Create React App.

## Enunciado

La idea general es crear una aplicación en la cual se pueda jugar a un juego similar al famoso: "¿Quién quiere ser millonario?" en la cual se tienen implementadas las siguientes funcionalidades:

  - Crear Usuarios.
  - Loguear Usuarios.
  - Crear Cuestionarios: Registro de preguntas de distintos niveles o categorías.
  - Jugar a ¿Quién quiere ser Sofkiano?
  - Consultar el historial de juegos por usuario.

## Frontend

Se desarrolló una aplicación de React/Redux que contiene las siguientes pantallas/rutas:

__Pagina inicial (http://localhost:3000/landingPage)__: Landing page con la funcionalidad para crear y loguear usuarios. Cuenta además con botones para ir hacia la ruta de creación de cuestionarios, así como para dirigirse a la página de juego y finalmente, un botón para acceder a la ruta que posee el historial de juegos del usuario.

__Ruta principal (http://localhost:3000/sofka_challengue/home)__: En esta ruta, el usuario puede jugar a responder correctamente las preguntas que están almacenadas en la base de datos, que, tal como se estipuló en el reto, es de 25. Estas están divididas en 5 categorías o niveles, y al usuario se le muestra 1 pregunta por nivel escogida de manera aleatoria, y así sucesivamente hasta que conteste mal alguna pregunta, se retire o finalmente logre responder correctamente todas las preguntas. Cuando se presenta una de las tres opciones anteriores, aparece un botón que redirige al usuario al Landing Page.

__Ruta de creación de cuestionarios (http://localhost:3000/sofka_challengue/crear_cuestionario)__: En esta ruta el usuario podrá crear un cuestionario de 25 preguntas divididas en 5 niveles o categorías. Al entrar a la ruta o bien luego de haber registrado exitosamente las 5 preguntas de una categoría dada, aparecerá un botón para crear una categoría o nivel dado. Se estipuló de tal forma para que se registren las preguntas de nivel más bajo o sencillo primero, y luego las más difíciles de últimas, conforme se avanza de categoría. Hay un input para los enunciados de las preguntas así como para cada una de las opciones de respuesta, y luego, un menú desplegable para confirmar cuál de las 4 opciones es la correcta para dicha pregunta, y finalmente, un botón a través del cual se hace el envío de la información para el registro de la pregunta en la db. Una vez registradas las 5 categorías y las 25 preguntas, aparece una notificación anunciado este hecho, y luego un botón para dirigirse nuevamente a la página de inicio.

__Ruta de historial de juegos de usuario (http://localhost:3000/sofka_challengue/detalles_usuario)__: En esta ruta el usuario podrá consultar el historial de sus juegos realizados, donde se muestra la puntuación final que obtuvo en cada uno de ellos, y la ronda hasta donde llegó. Al final de esta página hay un botón para retornar a la página de inicio.

## Base de datos

La base de datos construida en PostgreSQL tiene las siguientes características:

- Una dB `sofka` con las siguientes entidades:
  - usuarios: En esta entidad quedan los registros de todos los usuarios.
  - categoria: En esta entidad están registradas cada una de las categorías creadas.
  - pregunta: En esta se registran todas las preguntas.
  - juegos: En esta se almacenan todos los juegos realizados en la aplicación.

La relación entre estas entidades es de uno a muchos entre usuarios y juegos así como entre categoría y preguntas, ya que las primeras entidades pueden tener muchas de las segundas entidades y visceversa.


## Backend

Se desarrolló un servidor en Node/Express con las siguientes rutas:

- __GET /usuarios?nombre="..."__:
  - A través de esta ruta se hace el login del usuario, a través del nombre de este.
  - Implícitamente, gracias a la relación entre la entidad usuarios y juegos, se anidan al usuario logueado los juegos que este ha realizado.

- __GET /categorias?id={idCategoria}__:
  - Con esta ruta se obtiene el detalle de una categoría en general.
  - Implícitamente, gracias a la relación entre la entidad categoria y pregunta, se anidan a la categoría obtenida las preguntas que se han registrado para este nivel.

- __POST /usuarios__:
  - Recibe los datos recolectados desde el formulario controlado creado en la ventana emergente, por body.
  - Crea un usuario en la base de datos.

- __POST /categorias__:
  - Recibe los datos recolectados desde el formulario controlado creado en la ventana emergente, por body, en la pantalla de creación de cuestionarios.
  - Crea una categoría en la base de datos.

- __POST /preguntas__:
  - Recibe los datos recolectados desde el formulario controlado por body, digitados en la pantalla de creación de cuestionarios.
  - Crea una pregunta en la base de datos.

- __POST /juegos__:
  - Recibe los datos recolectados desde la ruta de juego una vez el usuario pierde, se retira o gana un juego dado.
  - Crea un historial de dicho juego en la base de datos.

## Preguntas de ejemplo

A continuación adjunto un boceto de preguntas divididas por categorías para hacer más rápida y sencilla la implementación plena de esta aplicación:

__Categoría 1__:

1. ¿Cuál es el río más largo del mundo?

A) El río Amarillo

B) El Amazonas (Respuesta)

C) El Nilo

D) El Éufrates

2. ¿Cuál es el país con más habitantes del mundo?

A) China (Respuesta)

B) India

C) Estados Unidos

D) Rusia

3. ¿En qué año cayó el muro de Berlín?

A) 1991

B) 1985

C) 1990

D) 1989 (Respuesta)

4) ¿Cuántos años duró la Segunda Guerra Mundial?

A) 7

B) 6 (Respuesta)

C) 5

D) 4

5) ¿Cuándo empezó la Revolución Rusa?

A) 1915

B) 1916

C) 1917 (Respuesta)

D) 1918

__Categoría 2__:

1) ¿Cuál es el animal que más muertes provoca cada año?

A) Serpiente

B) Araña

C) Mosquito (Respuesta)

D) Tiburón

2) ¿Cuál fue la primera civilización humana?

A) Egipcios

B) Griegos

C) Romanos

D) Sumerios (Respuesta)

3) ¿Qué religión tiene la Torá como su libro sagrado?

A) Islam 

B) Judaísmo (Respuesta)

C) Cristianismo

D) Hinduismo

4) ¿Cuál es la luna más grande de Saturno?

A) Titán (Respuesta)

B) Juno

C) Caronte

D) Europa

5) ¿Cuántos huesos tiene el cuerpo humano?

A) 207

B) 201

C) 206 (Respuesta)

D) 205

__Categoría 3__:

1) ¿Cuál es el álbum musical más vendido de la historia?

A) Thriller, de Michael Jackson (Respuesta)

B) The Dark Side of the Moon, de Pink Floyd

C) El guardaespaldas, de Whitney Houston

D) Back in Black, de AC/DC

2) ¿Cuándo se inventó la imprenta?

A) 1485

B) 1801

C) 1440 (Respuesta)

D) 1805

3) ¿Cuál es el animal más rápido del mundo?

A) El antílope

B) El guepardo

C) El águila calva

D) El halcón peregrino (Respuesta)

4) ¿Cuál es el mineral más duro del planeta?

A) Hierro

B) Diamante (Respuesta)

C) Rubí

D) Oro

5) ¿Cuál es la ciudad más poblada del mundo?

A) Tokio (Respuesta)

B) Pekín

C) Nueva Delhi

D) Hong Kong

__Categoría 4__:

1) ¿En qué país nació Adolf Hitler?

A) Alemania

B) Austria (Respuesta)

C) Polonia

D) Suiza

2) ¿Cuál es el gas mayoritario de la atmósfera terrestre?

A) Hidrógeno

B) Oxígeno

C) Nitrógeno (Respuesta)

D) Dióxido de carbono

3) ¿Cuál es la serpiente más larga del mundo?

A) Anaconda

B) Serpiente de mar

C) Boa constrictor

D) Pitón Reticulada (Respuesta)

4) De acuerdo con la Biblia, ¿cuántos años vivió Matusalén?

A) 969 años (Respuesta)

B) 951 años

C) 935 años

D) 980 años

5) ¿Cuál es la edad del Universo?

A) 15 mil millones de años

B) 14.500 millones de años

C) 13.800 millones de años (Respuesta)

D) 13.300 millones de años

__Categoría 5__:

1) ¿Cuál es el objeto más caro del mundo?

A) Diamante

B) La Mona Lisa

C) La estación espacial internacional

D) La antimateria (Respuesta)

2) ¿A qué país pertenece Groenlandia?

A) Estados Unidos

B) Dinamarca (Respuesta)

C) Canadá

D) Islandia

3) ¿Los neurólogos creen que la corteza prefrontal del cerebro se activa cuando haces qué?

A) Tienes un ataque de pánico

B) Recuerdas un nombre

C) Entiendes una broma (Respuesta)

D) Escuchas música

4) ¿Qué género escribía predominantemente la primera persona en recibir un premio Nobel de Literatura?

A) Novela

B) Poesía (Respuesta)

C) Dramaturgia 

D) Ensayo

5) De acuerdo con la Oficina de Referencia de la Población (Population Reference Bureau). ¿Cuál es el número aproximado de personas que han vivido en la Tierra?

A) 108.000 millones (Respuesta)

B) 180.000 millones

C) 1.110.000 millones

D) 1.108.000 millones


### Sin más, espero que tú que estás leyendo esto, disfrutes mucho el juego y podamos vernos pronto en la liga de entrenamiento de desarrollo de Sofka!
