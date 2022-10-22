import { Statement } from "../statement/statement";
import { SymbolTable } from "../value/symbol";
import Node from "./node";

export default class Block extends Node {
	public symbols: SymbolTable = new Map();

	constructor(public readonly statements: Statement[], public parent?: Node) {
		super();
	}
}