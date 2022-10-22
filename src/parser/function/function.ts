import Block from "../node/block";
import { SymbolTable } from "../value/symbol";
import { Value } from "../value/value";
import Parameter from "./parameter";
import Prototype from "./prototype";

export default class Function extends Prototype {
	constructor(public name: string, public params: Parameter[], public blockOrRunnable: Block | ((localSymbols: SymbolTable, ...params: Value<any>[]) => any)) {
		super(name, params);
	}
}