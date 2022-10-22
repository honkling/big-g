export enum TokenType {
	// Miscellaneous
	WHITESPACE = "whitespace", // /^\s+/]
	COMMENT = "comment", // /^(\/\/.*|\/\*(.*\n?)*?\*\/)/]

	// Literals
	LITERAL_STRING = "literalString", // /^"(?:[^\\"]|\\\\|\\")*"/]
	LITERAL_INTEGER = "literalInteger", // /^\d+/]
	LITERAL_DECIMAL = "literalDecimal", // /^\d+\.\d+/]
	LITERAL_BOOLEAN = "literalBoolean", // /^(true|false|yes|no|on|off)/]

	// Operators
	OPERATOR_ADD = "operatorAdd", // /^\+/]
	OPERATOR_SUBTRACT = "operatorSubtract", // /^-/]
	OPERATOR_MULTIPLY = "operatorMultiply", // /^\*/]
	OPERATOR_DIVIDE = "operatorDivide", // /^\//]
	OPERATOR_LESSER = "operatorLesser", // /^</]
	OPERATOR_GREATER = "operatorGreater", // /^>/]
	OPERATOR_POWER = "operatorPower", // /^\^/]
	OPERATOR_EQUALS = "operatorEquals", // /^==/]
	OPERATOR_ASSIGN = "operatorAssign", // /^=/]
	OPERATOR_MODULUS = "operatorModulus", // /^%/]

	// Symbols
	SYMBOL_OPEN_PAREN = "symbolOpenParen", // /^\(/]
	SYMBOL_CLOSE_PAREN = "symbolCloseParen", // /^\)/]
	SYMBOL_OPEN_BRACKET = "symbolOpenBracket", // /^\[/]
	SYMBOL_CLOSE_BRACKET = "symbolCloseBracket", // /^\]/]
	SYMBOL_OPEN_BRACE = "symbolOpenBrace", // /^\{/]
	SYMBOL_CLOSE_BRACE = "symbolCloseBrace", // /^\}/]
	SYMBOL_PERIOD = "symbolPeriod", // /^\./]
	SYMBOL_COMMA = "symbolComma", // /^,/]
	SYMBOL_QUESTION = "symbolQuestion", // /^\?/]

	// Keywords
	KEYWORD_FUNCTION = "keywordFunction", // /^fn/]
	KEYWORD_FOR = "keywordFor", // /^for/]
	KEYWORD_WHILE = "keywordWhile", // /^while/]
	KEYWORD_IF = "keywordIf", // /^if/]
	KEYWORD_ELSE = "keywordElse", // /^else/]
	KEYWORD_ELSE_IF = "keywordElseIf", // /^elif/]
	KEYWORD_BREAK = "keywordBreak", // /^break/]
	KEYWORD_CONTINUE = "keywordContinue", // /^continue/]
	KEYWORD_RETURN = "keywordReturn", // /^return/]

	IDENTIFIER = "identifier", // /^\w+/]
}

export const regexes: {
	[key: string]: RegExp;
} = {
	// Miscellaneous
	whitespace: /^\s+/,
	comment: /^(\/\/.*|\/\*(.*\n?)*?\*\/)/,

	// Literals
	literalString: /^"(?:[^\\"]|\\\\|\\")*"/,
	literalInteger: /^\d+/,
	literalDecimal: /^\d+\.\d+/,
	literalBoolean: /^(true|false|yes|no|on|off)/,

	// Operators
	operatorAdd: /^\+/,
	operatorSubtract: /^-/,
	operatorMultiply: /^\*/,
	operatorDivide: /^\//,
	operatorLesser: /^</,
	operatorGreater: /^>/,
	operatorPower: /^\^/,
	operatorEquals: /^==/,
	operatorAssign: /^=/,
	operatorModulus: /^%/,

	// Symbols
	symbolOpenParen: /^\(/,
	symbolCloseParen: /^\)/,
	symbolOpenBracket: /^\[/,
	symbolCloseBracket: /^\]/,
	symbolOpenBrace: /^\{/,
	symbolCloseBrace: /^\}/,
	symbolPeriod: /^\./,
	symbolComma: /^,/,
	symbolQuestion: /^\?/,

	// Keywords
	keywordFunction: /^fn/,
	keywordFor: /^for/,
	keywordWhile: /^while/,
	keywordIf: /^if/,
	keywordElse: /^else/,
	keywordElseIf: /^elif/,
	keywordBreak: /^break/,
	keywordContinue: /^continue/,
	keywordReturn: /^return/,

	identifier: /^\w+/,
}