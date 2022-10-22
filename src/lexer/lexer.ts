import Token from "./token";
import { regexes, TokenType } from "./tokenType";

export default class Lexer {
	public index: number = 0;

	constructor(public input: string) {}

	public lex(): Token[] {
		const tokens: Token[] = [];

		while (this.index < this.input.length) {
			const token: Token = this.getNextToken();
			this.index += token.raw.length;

			if (token.type !== TokenType.COMMENT)
				tokens.push(token);
		}

		return tokens;
	}

	public getNextToken(): Token {
		for (const type of Object.values(TokenType)) {
			const regex = regexes[type];
			//console.log({ type, regex });
			const match = regex.exec(this.input.substring(this.index));
			//console.log({ match, abc: match === null });
			//console.log("b");

			if (match === null) continue;

			//console.log('a');

			return new Token(type, match[0], this.index);
		}

		throw new Error(`Unexpected token ${this.input.substring(this.index)}`);
	}
}