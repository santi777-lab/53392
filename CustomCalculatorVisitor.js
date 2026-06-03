import CalculatorVisitor from "./generated/CalculatorVisitor.js";

export class CustomCalculatorVisitor extends CalculatorVisitor {

    constructor() {
        super();
        this.memory = new Map();
        this.output = [];
    }

    visitProgram(ctx) {
        ctx.statement().forEach(statement => this.visit(statement));
        return this.output;
    }

    visitStatement(ctx) {
        if (ctx.ifStatement()) {
            return this.visit(ctx.ifStatement());
        }
        if (ctx.assignmentStatement()) {
            return this.visit(ctx.assignmentStatement());
        }
        if (ctx.consoleStatement()) {
            return this.visit(ctx.consoleStatement());
        }
        return null;
    }

    visitIfStatement(ctx) {
        const condition = this.visit(ctx.expression());
        if (condition !== 0) {
            return this.visit(ctx.block(0));
        }

        if (ctx.block(1)) {
            return this.visit(ctx.block(1));
        }

        return null;
    }

    visitBlock(ctx) {
        let result = null;
        ctx.statement().forEach(statement => {
            result = this.visit(statement);
        });
        return result;
    }

    visitAssignmentStatement(ctx) {
        const name = ctx.Identifier().getText();
        const value = this.visit(ctx.expression());
        this.memory.set(name, value);
        return value;
    }

    visitConsoleStatement(ctx) {
        const value = this.visit(ctx.expression());
        this.output.push(`Salida: ${value}`);
        return value;
    }

    visitExpression(ctx) {
        const terms = ctx.term();
        let result = this.visit(terms[0]);
        for (let i = 1; i < terms.length; i += 1) {
            const operator = ctx.getChild(2 * i - 1).getText();
            const right = this.visit(terms[i]);
            if (operator === '+') {
                result += right;
            } else {
                result -= right;
            }
        }
        return result;
    }

    visitTerm(ctx) {
        if (ctx.Identifier()) {
            const name = ctx.Identifier().getText();
            return this.memory.has(name) ? this.memory.get(name) : 0;
        }
        if (ctx.Number()) {
            return parseInt(ctx.Number().getText(), 10);
        }
        return this.visit(ctx.expression());
    }
}
