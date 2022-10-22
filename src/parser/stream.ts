import Token from "../lexer/token";

export default class TokenStream {
	public index: number = 0;

	constructor(private tokens: Token[]) {}

	public peek(lookahead: number = 0) {
		return this.tokens[this.index + lookahead];
	}

	public consume() {
		return this.tokens[this.index++];
	}

	public isLast() {
		return this.index === this.tokens.length - 1;
	}

	public isEnd() {
		return this.index === this.tokens.length;
	}
}