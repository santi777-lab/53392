# Analizador ANTLR4 en JavaScript

Este proyecto implementa un analizador para un subconjunto reducido de JavaScript usando ANTLR4 y JavaScript.

## Contenido del repositorio

- `Calculator.g4` — gramática ANTLR para expresiones, asignaciones, `if`, `console.log` y bloques.
- `index.js` — programa principal que lee `input.txt`, genera tokens, construye el árbol sintáctico y ejecuta el programa.
- `CustomCalculatorVisitor.js` — visitor que interpreta la gramática y simula la ejecución de `console.log`.
- `generated/` — archivos generados por ANTLR4 (`CalculatorLexer.js`, `CalculatorParser.js`, etc.).
- `input.txt` — archivo de entrada principal que usa el programa.
- `valid1.txt`, `valid2.txt` — entradas válidas de prueba.
- `invalid1.txt`, `invalid2.txt` — entradas no válidas de prueba.

## Archivos de prueba

### Válidos
- `valid1.txt`
  - Asigna `x = 7;`
  - Imprime `x` por consola.
- `valid2.txt`
  - Asigna `count = 10;`
  - Evalúa un `if` con `count` verdadero.
  - Imprime `count` dentro del bloque `if`.

### No válidos
- `invalid1.txt`
  - Falta el punto y coma después de la asignación `x = 5`.
- `invalid2.txt`
  - El `if` no utiliza el bloque `{ ... }` obligatorio según la gramática.

## Cómo ejecutar

1. Instala dependencias si aún no lo has hecho:

```powershell
npm install
```

2. Ejecuta el analizador junto al archivo `input.txt` actual:

```powershell
node index.js
```

3. Para probar una entrada de ejemplo diferente, copia el archivo deseado a `input.txt` y vuelve a ejecutar:

```powershell
copy valid1.txt input.txt
node index.js
```

```powershell
copy valid2.txt input.txt
node index.js
```

```powershell
copy invalid1.txt input.txt
node index.js
```

```powershell
copy invalid2.txt input.txt
node index.js
```

## Qué muestra el programa

- Tabla de lexemas y tokens.
- Árbol de análisis sintáctico.
- Código equivalente en JavaScript.
- Interpretación simulada de `console.log`.
- Mensajes de error de sintaxis con línea y columna cuando la entrada no es válida.

## Archivos entregados

Se entrega el proyecto completo con:

- Gramática: `Calculator.g4`
- Programa principal: `index.js`
- Visitor de interpretación: `CustomCalculatorVisitor.js`
- Archivos generados ANTLR: carpeta `generated/`
- Entradas de prueba: `valid1.txt`, `valid2.txt`, `invalid1.txt`, `invalid2.txt`, `input.txt`
- Documentación: `README.md`
