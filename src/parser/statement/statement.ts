import Block from "../node/block";
import { SymbolTable } from "../value/symbol";

export enum StatementType {
	FUNCTION_DECLARATION,
	FUNCTION_CALL,
	VARIABLE_ASSIGNMENT,
	IF,
	ELSE,
	ELIF,
	FOR_LOOP,
	WHILE_LOOP,
	BREAK,
	CONTINUE,
	RETURN,
	CUSTOM,
}

export class Statement {
	public symbols: SymbolTable = new Map();

	constructor(public type: StatementType, public parent?: Block) {}

	public execute(globalSymbols: SymbolTable): any {}
}