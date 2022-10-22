import Node from "../node/node";

export class Value<T> extends Node {
	constructor(public value: T | null) {
		super();
	}
}

export class NamedValue<T> extends Value<T> {
	constructor(public name: string, public value: T) {
		super(value);
	}
}

export class PartialValue<T> extends Value<T> {
	constructor(public symbolName: string) {
		super(null);
	}
}