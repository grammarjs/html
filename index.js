
/**
 * Module dependencies.
 */

var Token = require('languagejs-token');
var Grammar = require('grammarjs-grammar');
var grammar = new Grammar('markup');
var expression = grammar.expression;
var value = Token.value;
var passthrough = Token.passthrough;
var slice = [].slice;

/**
 * Expose `grammar`.
 */

module.exports = grammar;

/**
 * Start.
 */

expression('markup')
  .match(':tag*', passthrough);

/**
 * Tag.
 */

expression('tag')
  .match(':tag.block', passthrough)
  //.match(':tag.inline', passthrough);

/**
 * Block Tag.
 */

expression('tag.block')
  .match(
    ':tag.begin',
    ':tag?',
    ':tag.end',
    ':ws',
     passthrough);

/**
 * Inline tag.
 */

expression('tag.inline')
  .match(':tag.begin', passthrough);

/**
 * Open tag.
 */

expression('tag.begin')
  .match(
    ':tag.punctuation.bracket.begin',
    ':ws',
    ':tag.name',
    ':ws',
    ':tag.attribute*',
    ':ws',
    ':tag.punctuation.bracket.end',
    passthrough);

/**
 * Tag punctuation.
 */

expression('tag.punctuation.bracket.begin')
  .match('<', value);

expression('tag.punctuation.bracket.end')
  .match('>', value);

expression('tag.punctuation.bracket.close.begin')
  .match('</', value);

expression('tag.punctuation.bracket.close.end')
  .match('/>', value);

/**
 * Tag name.
 */

expression('tag.name')
  .match(/[\w:-]+/, value);

/**
 * Tag attribute.
 */

expression('tag.attribute')
  .match(
    ':tag.attribute.name',
    ':ws',
    ':tag.attribute.operator',
    ':ws',
    ':tag.attribute.value',
    ':ws',
    passthrough);

/**
 * Attribute name.
 */

expression('tag.attribute.name')
  .match(/[\w:-]+/, value);

/**
 * Attribute value.
 */

expression('tag.attribute.value')
  .match(
    ':string.quote.double',
    ':tag.attribute.value.expression',
    ':string.quote.double',
    passthrough)
  .match(
    ':string.quote.single',
    ':tag.attribute.value.expression',
    ':string.quote.single',
    passthrough)
  .match(
    ':tag.attribute.value.expression',
    passthrough);

/**
 * Double quotes.
 */

expression('string.quote.double')
  .match('"', value);

/**
 * Single quote.
 */

expression('string.quote.single')
  .match("'", value);

/**
 * Attribute expression.
 */

expression('tag.attribute.value.expression')
  .match(/[^<"'>]+/, value);

/**
 * Close tag.
 */

expression('tag.end')
  .match(
    ':tag.punctuation.bracket.close.begin',
    ':ws',
    ':tag.name',
    ':ws',
    ':tag.punctuation.bracket.end',
    passthrough);

/**
 * Text element.
 */

expression('text')
  .match(/[^<>]+/, value);

/**
 * Comment.
 */

expression('comment')
  .match(
    ':comment.punctuation.bracket.begin',
    ':comment.content',
    ':comment.punctuation.bracket.end',
    passthrough);
  //.match('<!--', /[\w\W]*/, '-->', function($1, $2, $3){
  // requires lookahead

/**
 * Comment opening bracket.
 */

expression('comment.punctuation.bracket.begin')
  .match('<!--', value);

/**
 * Comment closing bracket.
 */

expression('comment.punctuation.bracket.end')
  .match('-->', value);

/**
 * Comment content.
 */

expression('comment.content')
  .match(/[a-z\s]*/, value);

/**
 * Cdata.
 */

expression('tag.cdata')
  .match(
    ':tag.cdata.begin',
    ':tag.cdata.content',
    ':tag.cdata.end',
    value);

expression('tag.cdata.begin')
  .match('<![CDATA[', value);

expression('tag.cdata.content')
  .match(/[\w\W]*/, value);

expression('tag.cdata.end')
  .match(']]>', value);

/**
 * HTML entity.
 */

expression('string.entity')
  .match('&', /#?/, /[\da-z]{1,8}/, ';', value);

/**
 * Top of HTML file.
 */

expression('tag.prolog')
  .match(
    ':tag.prolog.begin',
    ':tag.prolog.content',
    ':tag.prolog.end',
    value);

expression('tag.prolog.begin')
  .match('<?', value);

expression('tag.prolog.content')
  .match(/.+/, value);

expression('tag.prolog.end')
  .match('?>', value);

/**
 * Doctype.
 */

expression('tag.doctype.name')
  .match('doctype', value)
  .match('DOCTYPE', value);

/**
 * Operator.
 */

expression('tag.attribute.operator')
  .match('=', value);

/**
 * Whitespace.
 */

expression('ws')
  .match(/[\s]*/, value);