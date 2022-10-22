import Block from "../node/block";
import { PartialValue, Value } from "../value/value";
import { Statement, StatementType } from "./statement";
import Function from "../function/function";
import { SymbolTable } from "../value/symbol";

export default class FunctionCallStatement extends Statement {
	constructor(public fn: Function, public params: Value<any>[], public parent?: Block) {
		super(StatementType.FUNCTION_CALL, parent);
	}

	public execute(globalSymbols: SymbolTable) {
		const { blockOrRunnable, params } = this.fn;

		if (blockOrRunnable instanceof Block) {
			const block = blockOrRunnable as Block;
			console.log(globalSymbols);
			console.log(`Calling function ${this.fn.name}`);
			console.log({ params });
			params.forEach((param, index) => {
				console.log({ param ,index });
				console.log({ tP: this.params[index ]});
				if (this.params[index] instanceof PartialValue) {
					const value: PartialValue<any> = this.params[index] as PartialValue<any>;
					const name = value.symbolName;
					//console.log({ value, name });
					//console.log(block.symbols);
					//console.log(globalSymbols);
					block.symbols.set(param.name, (block.symbols.get(name) ?? globalSymbols.get(name) ?? (() => {
						throw new Error(`Used a variable that doesn't exist, ${name}, when calling function, ${this.fn.name}`);
					})()));
				} else
					block.symbols.set(param.name, this.params[index]);
			});

			console.log(`New symbols`);
			console.log(block.symbols);

			blockOrRunnable.statements.forEach((value) => value.execute(globalSymbols));
			return;
		}

		this.params.map((param) => {
			console.log({ param });

			if (param instanceof PartialValue) {
				return this.parent?.symbols?.get(param.symbolName) ?? globalSymbols.get(param.symbolName);
			}

			return param;
		});

		blockOrRunnable.apply(this, this.params);
	}
}