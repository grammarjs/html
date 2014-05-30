
/**
 * Module dependencies.
 */

var Grammar = require('grammarjs-grammar');
var grammar = module.exports = new Grammar('markup');
var expression = grammar.expression;

/**
 * Start.
 */

expression('markup')
  .match(':doctype?', ':tag*', function($1, $2){
    var tokens = [];
    if ($1) tokens = tokens.concat($1);
    if ($2) {
      $2.forEach(function(x){
        tokens = tokens.concat(x);
      });
    }
    return tokens;
  })
  //.match(':doctype?', ':tags', args);

/**
 * Top of HTML file.
 */

expression('prolog')
  .match(/<\?.+?\?>/);

/**
 * Doctype.
 */

expression('doctype')
  .match('<!', ':doctype-name', ':ws', /[a-z]+/, '>', function($1, $2, $3, $4, $5){
    return [
      token('punctuation', $1),
      token('doctype', $2),
      $3,
      token('meta', $4), 
      $5
    ];
  });

/**
 * Doctype tag name.
 */

expression('doctype-name')
  .match('doctype', value)
  .match('DOCTYPE', value);

/**
 * Tag.
 */

expression('tag')
  //.match(':inline-tag', value)
  .match(':open-tag', ':tag?', ':close-tag', ':ws', function($1, $2, $3, $4){
    if ($2) $1.push($2);
    $1 = $1.concat($3);
    if ($4) $1.push($4);
    return $1;
  })
  .match(':text', value)
  .match(':comment', value);

/**
 * Open tag.
 */

expression('open-tag')
  .match('<', ':ws', ':tag-name', ':ws', ':attr*', ':ws', '>', function($1, $2, $3, $4, $5, $6, $7){
    var tokens = [];
    tokens.push(token('punctuation', $1));
    if ($1) tokens.push($2);
    tokens.push($3);
    if ($4) tokens.push($4);
    if ($5) {
      $5.forEach(function(x){
        tokens = tokens.concat(x);
      });
    }
    if ($6) tokens.push($6);
    tokens.push(token('punctuation', $7));
    return tokens;
  });

/**
 * Tag name.
 */

expression('tag-name')
  .match(/[\w:-]+/, function($1){
    return token('tag', $1);
  });

/**
 * Tag attribute.
 */

expression('attr')
  .match(':attr-name', ':ws', ':equal', ':ws', ':attr-value', ':ws', function($1, $2, $3, $4, $5, $6){
    var tokens = [];
    tokens.push(token('attr', $1));
    if ($2) tokens.push($2);
    if ($4) tokens.push($4);
    tokens = tokens.concat($5);
    if ($6) tokens.push($6);
    return tokens;
  });

/**
 * Attribute name.
 */

expression('attr-name')
  .match(/[\w:-]+/, value);

/**
 * Attribute value.
 */

expression('attr-value')
  .match('"', ':attr-expression', '"', attr)
  .match("'", ':attr-expression', "'", attr)
  .match(':attr-expression', value);

/**
 * Attribute expression.
 */

expression('attr-expression')
  .match(/[^<"'>]+/, function($1){
    return token('expression', $1);
  });

/**
 * Close tag.
 */

expression('close-tag')
  .match('<', ':ws', '/', ':ws', ':tag-name', ':ws', '>', function($1, $2, $3, $4, $5, $6, $7){
    var tokens = [];
    tokens.push(token('punctuation', $1));
    if ($2) tokens.push($2);
    tokens.push(token('punctuation', $3));
    if ($4) tokens.push($4);
    tokens.push($5);
    if ($6) tokens.push($6);
    tokens.push(token('punctuation', $7));
    return tokens;
  });

/**
 * Self-closing tag.
 */

expression('inline-tag')
  .match('<', ':ws', ':attr-name', ':ws', '/', ':ws', '>');

/**
 * Text element.
 */

expression('text')
  .match(/[^<>]+/, function($1){
    return token('text', $1);
  });

/**
 * Comment.
 */

expression('comment')
  //.match('<!--', /[\w\W]*/, '-->', function($1, $2, $3){
  // requires lookahead
  .match('<!--', /[a-z\s]*/, '-->', function($1, $2, $3){
    return token('comment', $1 + $2 + $3);
  });

/**
 * Cdata.
 */

expression('cdata')
  .match(/<!\[CDATA\[[\w\W]*?]]>/i, value);

/**
 * HTML entity.
 */

expression('entity')
  .match(/\&#?[\da-z]{1,8};/i, value);

expression('equal')
  .match('=', function(val){
    return token('operator', val);
  });

/**
 * Whitespace.
 */

expression('ws')
  .match(/[\s]*/, function(val){
    if (val) return token('whitespace', val);
    return val;
  });

function token(type, val) {
  return [ type, val ];
}

function value(val) {
  return val;
}

function args() {
  var x = Array.prototype.slice.call(arguments);
  var r = [];
  for (var i = 0, n = x.length; i < n; i++) {
    r = r.concat(x[i]);
  }
  return r;
}

function attr($1, $2, $3) {
  return [
    token('punctuation', $1),
    $2,
    token('punctuation', $3),
  ];
}

function log() {
  console.log('log', arguments)
}