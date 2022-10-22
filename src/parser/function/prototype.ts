import Parameter from "./parameter";
import Node from "./../node/node";

export default class Prototype extends Node {
	constructor(public name: string, public params: Parameter[]) {
		super();
	}
}