
var assert = require('assert');
var grammar = require('./index');
var Parser = require('grammarjs-recursive-parser');
var parser = new Parser(grammar);

describe('html', function(){
  it('tag', function(){
    var str = '<p></p>';
    var val = parser.parse(str);
    assert.equal(str, stringify(val));
  });

  describe('tag.attribute', function(){
    it('id="content"', function(){
      var str = '<p id="content"></p>';
      var val = parser.parse(str);
      assert.equal(str, stringify(val));
    });

    it('contenteditable', function(){
      var str = '<p contenteditable></p>';
      var val = parser.parse(str);
      console.log(val);
      assert.equal(str, stringify(val));
    });
  });
});

/**
 * For testing, it should generate the original string.
 *
 * @param {Token} token
 * @api public
 */

function stringify(token) {
  if (!token) return '';
  var html = [];
  if (Array.isArray(token.content)) {
    token.content.forEach(function(child){
      html.push(stringify(child));
    });
  } else if (null != token.content) {
    html.push(stringify(token.content));
  } else {
    html.push(token);
  }

  return html.join('');
}