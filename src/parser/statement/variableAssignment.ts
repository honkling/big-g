import Block from "../node/block";
import { SymbolTable } from "../value/symbol";
import { Value } from "../value/value";
import { Statement, StatementType } from "./statement";

export default class VariableAssignmentStatement extends Statement {
	constructor(public name: string, public value: Value<any>, public parent?: Block) {
		super(StatementType.VARIABLE_ASSIGNMENT, parent);
	}

	public execute(globalSymbols: SymbolTable) {
		//console.log(`Setting ${this.name} to ${this.value.value}`);
		//console.log(this.parent?.symbols);
		//console.log(globalSymbols);
		(this.parent?.symbols ?? globalSymbols).set(this.name, this.value);
		//console.log({ globalSymbols });
	}
}