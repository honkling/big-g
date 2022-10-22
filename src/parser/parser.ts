import { SymbolTable } from "./value/symbol";
import TokenStream from "./stream";
import { TokenType } from "../lexer/tokenType";
import Function from "./function/function";
import Block from "./node/block";
import Node from "./node/node";
import { NamedValue, PartialValue, Value } from "./value/value";
import { Statement } from "./statement/statement";
import VariableAssignmentStatement from "./statement/variableAssignment";
import FunctionCallStatement from "./statement/functionCall";
import Parameter from "./function/parameter";
import FunctionDeclarationStatement from "./statement/functionDeclaration";

export default class Parser {
	constructor(private stream: TokenStream, private symbols: SymbolTable) {}

	public parseTopLevel() {
		while (!this.stream.isEnd()) {
			////console.log("Parsing statement");
			////console.log(this.stream.peek());
			////console.log(this.stream.peek(1));
			this.parseStatement(undefined).execute(this.symbols);
			////console.log(this.stream.peek());
			////console.log(this.stream.peek(1));
		}
	}

	public parseFunction(parent?: Block): Function {
		//console.log("Function starts parsing");
		this.stream.consume().expectType(TokenType.KEYWORD_FUNCTION);
		//console.log("First token is kw function");
		const name = this.stream.consume().expectType(TokenType.IDENTIFIER).raw;
		//console.log(`Got name ${name}`);

		if (this.stream.peek().type === TokenType.SYMBOL_OPEN_BRACE)
			return new Function(name, [], this.parseBlock(parent));

		this.stream.consume().expectType(TokenType.SYMBOL_OPEN_PAREN);
		////console.log("This token is symbol open paren");
		
		const params: Parameter[] = [];
		//console.log("Time to parse params");
		//console.log(this.stream.peek());
		while (this.stream.peek().type !== TokenType.SYMBOL_CLOSE_PAREN) {
			//console.log(`Parsing param`);
			//console.log(this.stream.peek());
			params.push(new Parameter(this.stream.consume().expectType(TokenType.IDENTIFIER).raw));

			if (this.stream.peek().type === TokenType.SYMBOL_COMMA)
				this.stream.consume();
		}
		//console.log("Done parsing params");
		//console.log(this.stream.peek());

		this.stream.consume().expectType(TokenType.SYMBOL_CLOSE_PAREN);
		//console.log("Token was close param");
		return new Function(name, params, this.parseBlock(parent));
	}

	public parseBlock(parent?: Block): Block {
		//console.log("Parsing block");
		this.stream.consume().expectType(TokenType.SYMBOL_OPEN_BRACE);
		//console.log("Token was open brace");

		const statements: Statement[] = [];
		//console.log("Parsing statements of block");
		while (this.stream.peek().type !== TokenType.SYMBOL_CLOSE_BRACE) {
			//console.log("Parsing statement");
			//console.log(this.stream.peek());
			statements.push(this.parseStatement(parent));
		}

		//console.log("Done parsing statements");

		this.stream.consume().expectType(TokenType.SYMBOL_CLOSE_BRACE);
		//console.log("Token was close brace");
		return new Block(statements, parent);
	}

	public parseStatement(parent?: Block): Statement {
		////console.log(this.stream.peek().type);
		////console.log(TokenType.KEYWORD_FUNCTION);
		switch (this.stream.peek().type) {
			case TokenType.KEYWORD_FUNCTION:
				//console.log("Parsing fucntion");
				//console.log(this.stream.peek());
				const fn = this.parseFunction(parent);
				//console.log(fn = this.parseFunction(parent));
				//console.log({ fn });
				//console.log("Parent symbols");
				//console.log(parent?.symbols);
				//console.log(this.symbols);
				(parent?.symbols ?? this.symbols).set(fn.name, new NamedValue(fn.name, fn));
				return new FunctionDeclarationStatement(fn);
			case TokenType.IDENTIFIER:
				switch (this.stream.peek(1).type) {
					case TokenType.OPERATOR_ASSIGN:
						// Declaring a variable.
						const variableName = this.stream.consume().raw;
						this.stream.consume();
						const variableValue = this.stream.consume().value;
						return new VariableAssignmentStatement(variableName, new Value(variableValue));
					/*case TokenType.IDENTIFIER:
					case TokenType.LITERAL_BOOLEAN:
					case TokenType.LITERAL_DECIMAL:
					case TokenType.LITERAL_INTEGER:
					case TokenType.LITERAL_STRING:*/
					case TokenType.SYMBOL_OPEN_PAREN:
						// Calling a function.
						const functionName = this.stream.consume().expectType(TokenType.IDENTIFIER).raw;
						console.log(`Parsing function call ${functionName}`);

						const fn = parent?.symbols?.get(functionName) ?? this.symbols.get(functionName);
						if (!fn || !(fn.value instanceof Function))
							throw new Error(`Tried to call a function, ${functionName}, that doesn't exist.`);

						// Parsing parameters
						const parameters: Value<any>[] = [];
						this.stream.consume().expectType(TokenType.SYMBOL_OPEN_PAREN);
						while (this.stream.peek().type !== TokenType.SYMBOL_CLOSE_PAREN) {
							const parameter = this.stream.consume();

							if (parameter.type === TokenType.IDENTIFIER) {
								// Parsing a variable as parameter.
								const { raw: variableName } = parameter;
								const value = parent?.symbols?.get(variableName) ?? this.symbols.get(variableName);

								parameters.push(new PartialValue(variableName));
								console.log({ variableName, value });
								continue;
							}

							parameters.push(new Value(parameter.value) ?? (() => {
								throw new Error(`Used a literal as parameter without value when calling ${functionName} (${parameter.raw})`);
							})());

							if (this.stream.peek().type === TokenType.SYMBOL_COMMA)
								this.stream.consume();
						}

						this.stream.consume().expectType(TokenType.SYMBOL_CLOSE_PAREN);
						return new FunctionCallStatement(fn.value, parameters, parent);





						/*//console.log("CALLING FUNCTION");
						const functionName = this.stream.consume().raw;
						//console.log(`Function ${functionName}`);
						////console.log({ parent: parent?.symbols, global: this.symbols });
						//console.log(parent?.symbols);
						//console.log(this.symbols);
						const fn: Value<Function> | undefined = parent?.symbols?.get(functionName) ?? this.symbols.get(functionName);
				
						if (!fn || !(fn.value instanceof Function))
							throw new Error(`Call to function, '${functionName}', that doesn't exist.`);

						this.stream.consume();

						const params: Value<any>[] = [];
						this.stream.consume();
						//this.stream.consume();
						while (this.stream.peek().type !== TokenType.SYMBOL_CLOSE_PAREN) {
							//console.log(`Parsing parameter for ${fn.value.name}`);
							//console.log({ fnToken: this.stream.peek() });

							if (this.stream.peek().type === TokenType.IDENTIFIER) {
								const parameterName = this.stream.consume().raw;
								//console.log("Parsing variable param\nParent symbols");

								params.push(new NamedValue(parameterName, null));
								if (this.stream.peek().type === TokenType.SYMBOL_COMMA)
									this.stream.consume();
								continue;
							}

							////console.log("param below");
							this.stream.consume();

							params.push(new Value(this.stream.consume().value ?? (() => {
								throw new Error(`Called function, '${functionName}', with weird parameter.`);
							})()));

							if (this.stream.peek().type === TokenType.SYMBOL_COMMA)
								this.stream.consume();
						}

						this.stream.consume();

						return new FunctionCallStatement(fn.value, params);*/
				}
			default:
				throw new Error("Invalid statement");
		}
	}
}