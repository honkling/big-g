import { readFileSync, stat } from "fs";
import { join } from "path";
import { StatementType } from "./parser/statement/statement";
import Lexer from "./lexer/lexer";
import { TokenType } from "./lexer/tokenType";
import Function from "./parser/function/function";
import Parameter from "./parser/function/parameter";
import Block from "./parser/node/block";
import Parser from "./parser/parser";
import CustomStatement from "./parser/statement/customStatement";
import FunctionCallStatement from "./parser/statement/functionCall";
import FunctionDeclarationStatement from "./parser/statement/functionDeclaration";
import { Statement } from "./parser/statement/statement";
import VariableAssignmentStatement from "./parser/statement/variableAssignment";
import TokenStream from "./parser/stream";
import { SymbolTable } from "./parser/value/symbol";
import { NamedValue, PartialValue } from "./parser/value/value";
/*
function executeStatement(statement: Statement) {
	console.log(statement);
	if (statement instanceof FunctionDeclarationStatement) {
		const { name } = statement.fn;
		console.log("Statement parent symbols VVV");
		console.log(statement.parent?.symbols);
		(statement.parent?.symbols ?? symbols).set(name, new NamedValue(name, statement.fn));
		//console.log(`Declared function ${name}`);
	} else if (statement instanceof FunctionCallStatement) {
		//console.log("Let's call this function!");
		//console.log(statement);
		const blockOrRunnable = statement.fn.blockOrRunnable;
		statement.params.forEach((param, index) => {
			//console.log("Parameter!");
			//console.log({
			//	param,
			//	index,
			//});
			//console.log(statement.fn.params);
			//console.log(statement.fn.params[index]);

			if (param.value instanceof NamedValue && param.value.value === null)
				param.value = statement.parent?.symbols.get(param.value.name) ?? symbols.get(param.value.name);

			if (blockOrRunnable instanceof Block)
				blockOrRunnable.symbols.set(statement.fn.params[index].name, param.value);
		});
		if (blockOrRunnable instanceof Block)
			blockOrRunnable.statements.forEach(executeStatement);
		else
			blockOrRunnable.apply(this, [statement.params]);
		//console.log(`Called function ${statement.fn.name}`);
	} else if (statement instanceof VariableAssignmentStatement) {
		const { name, value } = statement;
		(statement.parent?.symbols ?? symbols).set(name, value)
		//console.log(`Set variable ${name} to ${value.value}`);
	} else if (statement instanceof CustomStatement) {
		statement.runnable.apply(this, [statement]);
	}
}
*/
const input = readFileSync(join(__dirname, "../spec.bg"), "utf8");
const lexer = new Lexer(input);
const symbols: SymbolTable = new Map();

symbols.set("p", new NamedValue("p", new Function("p", [new Parameter("str")], (localSymbols, obj) => {
	console.log(obj);
	console.log(obj.value);
})));

const tokens = lexer.lex().filter((t) => t.type !== TokenType.WHITESPACE);
const parser = new Parser(new TokenStream(tokens), symbols);

parser.parseTopLevel();