import { TokenType } from "./tokenType";

export default class Token {
	public readonly value: string | number | boolean | null;
	
	constructor(
		public readonly type: TokenType,
		public readonly raw: string,
		public readonly start: number,
	) {
		switch (type) {
			case TokenType.LITERAL_INTEGER:
				this.value = parseInt(raw);
				break;
			case TokenType.LITERAL_DECIMAL:
				this.value = parseFloat(raw);
				break;
			case TokenType.LITERAL_BOOLEAN:
				this.value = ["true", "yes", "on"].includes(raw);
				break;
			case TokenType.LITERAL_STRING:
				this.value = raw.substring(1, raw.length - 1).replace(/(?!\\)\\"/, "\"");
				break;
			default:
				this.value = null;
		}
	}

	public expectType(type: string) {
		if (this.type !== type)
			throw new Error(`Expected type ${type}, but received type ${this.type} (start ${this.start})`);
		
		return this;
	}
}