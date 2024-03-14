
## Setup

1. Inicia un proyecto de NodeJS, instala `express` y crea un archivo `index.js` vacío.

## Almacenamiento de mensajes

### Parte 1

Utiliza tu servidor para almacenar mensajes en un array. Cada vez que un usuario haga una petición `POST /mensaje` el servidor debe almacenar el mensaje en un array, guardar un `.json` con el array y devolver un mensaje de éxito.
La estructura del `.json` puede ser simple:

```json
[
    "mensaje 1",
    "mensaje 2",
    "mensaje 3"
]
```

### Parte 2

Una vez puedas almacenar correctamente los mensajes, crea una ruta `GET /mensajes` que devuelva el array completo de mensajes en formato JSON.

El formato de la respuesta puede ser el siguiente:
```json
{
    "mensajes": [
        "mensaje 1",
        "mensaje 2",
        "mensaje 3"
    ],
    "status": "success"
}
```

### Parte 3

Crea una ruta `GET /mensaje/:id` que devuelva el mensaje con el id especificado en la url.

### Parte 4

Crea una ruta `GET /` que devuelva un formulario para enviar mensajes. El formulario debe enviar los mensajes a la ruta `POST /mensaje` y mostrar los mensajes almacenados en la ruta `GET /mensajes`.

## Nodemon
1. Instala `nodemon` como una dependencia de desarrollo y configura nodemon para reiniciar el servidor automáticamente cuando tengas cambios en los siguientes archivos:
    - .html
    - .css
    - .js
    - .json
    - .njk

## Hola!
1. Crea una ruta que responda a la petición `GET /saludo` y devuelva un mensaje de bienvenida

2. Haz que la ruta del paso anterior capture el `nombre` de la `url query`, de forma que cuando el usuario visite la ruta `GET /saludo?nombre=juan` devuelva un mensaje de bienvenida personalizado.

## Random
1. Crea una ruta que responda a la petición `GET /random` y devuelva un objeto JSON con los siguientes valores aleatorios:
    - `randomNumber`: un número aleatorio entre 0 y 1.
    - `randomBoolean`: un valor booleano aleatorio.
    - `randomRange100`: un número aleatorio entre 0 y 100.
    - `randomRange255`: un número aleatorio entre 0 y 255.

## ¿Que dia es hoy?
1. Crea una ruta que responda a la petición `GET /fecha` con la fecha actual.

## 1337C0D3
1. Crea una ruta que responda a la peticion `GET /1337`.
2. La ruta debe capturar por `url query` el valor `mensaje` y mostrarlo en `1337 5P34K`:
```plaintext
a => 4
e => 3
o => 0
s => 5
t => 7
l => 1
z => 2
b => 8
g => 9
q => 9
```  
Ejemplos:
- `/1337?mensaje=hola` => `h0l4`
- `/1337?mensaje=lorem ipsum dolor est` => `l0r3m ip5um d010r 357`
- `/1337?mensaje=ke pasa illo` => `k3 p454 i110`

## Diccionario toki pona > español

1. Crea una ruta que responda a la peticion `GET /diccionario/:palabra` y muestre la traducción de la palabra en `toki pona` a `español`.

Tienes un archivo `diccionario.json` ya listo con la siguiente estructura en la raiz del proyecto:
```json
{
  "palabra en toki pona": "palabra en español"
}
```

Si el usuario llama a la ruta `GET /diccionario/moku` debería devolver el siguiente json:
```json
{
    "esp" : "moku",
    "tokipona" : ["comer", "beber", "comida"],

}
```

