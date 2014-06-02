
var assert = require('assert');
var grammar = require('./index');
var Parser = require('grammarjs-recursive-parser');
var parser = new Parser(grammar);

describe('html', function(){
  describe('tag', function(){
    it('tag', function(){
      var str = '<p></p>';
      assert.equal(str, compile(str));
    });
  });

  describe('tag.attribute', function(){
    it('id="content"', function(){
      var str = '<p id="content"></p>';
      assert.equal(str, compile(str));
    });

    it('contenteditable', function(){
      var str = '<p contenteditable></p>';
      assert.equal(str, compile(str));
    });

    it('data-id="id"', function(){
      var str = '<p data-id="id"></p>';
      assert.equal(str, compile(str));
    });

    it('data-id="id" class="content"', function(){
      var str = '<p data-id="id" class="content"></p>';
      assert.equal(str, compile(str));
    });

    it('class="content paragraph"', function(){
      var str = '<p class="content paragraph"></p>';
      assert.equal(str, compile(str));
    });

    it('contenteditable=true', function(){
      var str = '<p contenteditable=true></p>';
      assert.equal(str, compile(str));
    });
  });

  describe('tag.block', function(){
    it('nested', function(){
      var str = '<p><span></span></p>';
      assert.equal(str, compile(str));
    });
  });

  describe('tag.inline', function(){
    it('<input/>', function(){
      var str = '<input/>';
      assert.equal(str, compile(str));
    });

    it('<input type="text"/>', function(){
      var str = '<input type="text"/>';
      assert.equal(str, compile(str));
    });
  });
});

/**
 * Parse `str` to ast, then stringify back.
 *
 * @param {String} str
 * @return {String}
 */

function compile(str, log) {
  var ast = parser.parse(str);
  if (log) console.log(JSON.stringify(ast, null, 2));
  return stringify(ast);
}

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