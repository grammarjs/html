
var assert = require('assert');
var grammar = require('./index');
var Parser = require('grammarjs-recursive-parser');
var parser = new Parser(grammar);

describe('html', function(){
  it('doctype', function(){
    var val = parser.parse('<!doctype html>');
    var expected = [
      [ 'punctuation', '<!' ],
      [ 'doctype', 'doctype' ],
      [ 'whitespace', ' ' ],
      [ 'meta', 'html' ],
      [ 'punctuation', '>' ] ];
    assert.deepEqual(val, expected);
  });

  it('comment', function(){
    var val = parser.parse('<!-- hello -->');
    console.log(val)
  });

  it('tag', function(){
    var val = parser.parse('<p></p>');
    var expected = [
      [ 'punctuation', '<' ],
      [ 'whitespace', '' ],
      [ 'tag', 'p' ],
      [ 'punctuation', '>' ],
      [ 'punctuation', '<' ],
      [ 'punctuation', '/' ],
      [ 'tag', 'p' ],
      [ 'punctuation', '>' ] ];
    assert.deepEqual(val, expected);
  });

  it('tag with attributes', function(){
    var val = parser.parse('<p data-text="true" class="content"></p>');
    var expected = [
      [ 'punctuation', '<' ],
      [ 'whitespace', '' ],
      [ 'tag', 'p' ],
      [ 'whitespace', ' ' ],
      [ 'attr', 'data-text' ],
      [ 'operator', '=' ],
      [ 'punctuation', '"' ],
      [ 'expression', 'true' ],
      [ 'punctuation', '"' ],
      [ 'whitespace', ' ' ],
      [ 'attr', 'class' ],
      [ 'operator', '=' ],
      [ 'punctuation', '"' ],
      [ 'expression', 'content' ],
      [ 'punctuation', '"' ],
      [ 'punctuation', '>' ],
      [ 'punctuation', '<' ],
      [ 'punctuation', '/' ],
      [ 'tag', 'p' ],
      [ 'punctuation', '>' ]
    ];
    assert.deepEqual(val, expected);
  });

  it('tag with text', function(){
    var val = parser.parse('<p class="true">hello</p>');
    var expected = [ 
      [ 'punctuation', '<' ],
      [ 'whitespace', '' ],
      [ 'tag', 'p' ],
      [ 'whitespace', ' ' ],
      [ 'attr', 'class' ],
      [ 'operator', '=' ],
      [ 'punctuation', '"' ],
      [ 'expression', 'true' ],
      [ 'punctuation', '"' ],
      [ 'punctuation', '>' ],
      [ 'text', 'hello' ],
      [ 'punctuation', '<' ],
      [ 'punctuation', '/' ],
      [ 'tag', 'p' ],
      [ 'punctuation', '>' ] ];
    assert.deepEqual(val, expected);
  });

  it('multiple tags', function(){
    var str = ''
      + '<h1 class="true">asdf</h1>\n\n'
      + '<p></p>';

    var val = parser.parse(str);
    console.log(val);
  });

  it('html', function(){
    var html = '<!doctype html>'
      + '<!-- hello -->'
      + '<p><span></span></p>';

    var val = parser.parse(html);
    console.log(JSON.stringify(val, null, 2));
  });
});