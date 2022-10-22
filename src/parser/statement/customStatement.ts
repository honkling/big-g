import Block from "../node/block";
import { SymbolTable } from "../value/symbol";
import { Statement, StatementType } from "./statement";

export default class CustomStatement extends Statement {
	constructor(public runnable: (statement: Statement) => any, public parent?: Block | undefined) {
		super(StatementType.CUSTOM, parent);
	}
}