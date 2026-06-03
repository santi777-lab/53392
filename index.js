import CalculatorLexer from "./generated/CalculatorLexer.js";
import CalculatorParser from "./generated/CalculatorParser.js";
import { CustomCalculatorVisitor } from "./CustomCalculatorVisitor.js";
import antlr4 from "antlr4";
const { CharStreams, CommonTokenStream } = antlr4;
import fs from 'fs';

class CollectingErrorListener extends antlr4.error.ErrorListener {
    constructor() {
        super();
        this.errors = [];
    }

    syntaxError(recognizer, offendingSymbol, line, column, msg) {
        this.errors.push({ line, column, msg, symbol: offendingSymbol?.text });
    }
}

function tokenName(token) {
    return CalculatorLexer.symbolicNames[token.type] || CalculatorLexer.literalNames[token.type] || `Token(${token.type})`;
}

function printTokenTable(tokens) {
    console.log("\nTabla de léxemas y tokens:");
    console.log("Línea:Col\tLexema\tToken");
    for (const token of tokens) {
        if (token.type === antlr4.Token.EOF || token.type === CalculatorLexer.WS) {
            continue;
        }
        console.log(`${token.line}:${token.column}\t${token.text}\t${tokenName(token)}`);
    }
}

async function main() {
    let input;

    try {
        input = fs.readFileSync('input.txt', 'utf8');
    } catch (err) {
        console.error("No se encontró input.txt en el directorio actual.");
        return;
    }

    console.log("Entrada original:");
    console.log(input.trim());

    const inputStream = CharStreams.fromString(input);
    const lexer = new CalculatorLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    tokenStream.fill();

    printTokenTable(tokenStream.getTokens());

    const parser = new CalculatorParser(tokenStream);
    parser.removeErrorListeners();
    const syntaxErrors = new CollectingErrorListener();
    parser.addErrorListener(syntaxErrors);

    const tree = parser.program();

    if (syntaxErrors.errors.length > 0) {
        console.error("\nSe encontraron errores de sintaxis:");
        syntaxErrors.errors.forEach(err => {
            console.error(`  Línea ${err.line}, columna ${err.column}: ${err.msg}`);
        });
        return;
    }

    console.log("\nEntrada válida.");
    console.log("\nÁrbol de análisis sintáctico:");
    console.log(tree.toStringTree(parser.ruleNames));

    console.log("\nCódigo equivalente en JavaScript:");
    console.log(input.trim());

    const visitor = new CustomCalculatorVisitor();
    visitor.visit(tree);

    console.log("\nInterpretación / ejecución simulada:");
    if (visitor.output.length === 0) {
        console.log("(No se produjo ninguna salida de console.log en el programa.)");
    } else {
        visitor.output.forEach(line => console.log(line));
    }
}

main();
