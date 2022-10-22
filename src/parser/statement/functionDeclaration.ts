import Block from "../node/block";
import { Statement, StatementType } from "./statement";
import Function from "../function/function";
import { SymbolTable } from "../value/symbol";
import { NamedValue } from "../value/value";

export default class FunctionDeclarationStatement extends Statement {
	constructor(public fn: Function, public parent?: Block) {
		super(StatementType.FUNCTION_DECLARATION, parent);
	}

	public execute(globalSymbols: SymbolTable) {
		(this.parent?.symbols ?? globalSymbols).set(this.fn.name, new NamedValue(this.fn.name, this.fn));
	}
}