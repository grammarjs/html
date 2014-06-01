
var assert = require('assert');
var grammar = require('./index');
var Parser = require('grammarjs-recursive-parser');
var parser = new Parser(grammar);

describe('html', function(){
  it('tag.attribute', function(){
    var str = '<p id="content"></p><span></span>';
    var val = parser.parse(str);
    
    console.log(JSON.stringify(val, null, 2));
  });
});