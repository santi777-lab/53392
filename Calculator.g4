grammar Calculator;


program
    : statement* EOF
    ;

statement
    : ifStatement
    | assignmentStatement
    | consoleStatement
    ;

ifStatement
    : 'if' '(' expression ')' block ('else' block)?
    ;

block
    : '{' statement* '}'
    ;

assignmentStatement
    : Identifier '=' expression ';'
    ;

consoleStatement
    : 'console' '.' 'log' '(' expression ')' ';'
    ;

expression
    : term (('+' | '-') term)*
    ;

term
    : Identifier
    | Number
    | '(' expression ')'
    ;

Identifier
    : Letter (Letter | Digit | '_')*
    ;

Number
    : Digit+
    ;

fragment Letter
    : [a-zA-Z]
    ;

fragment Digit
    : [0-9]
    ;

WS
    : [ \t\r\n]+ -> skip
    ;