
var assert = require('assert');
var grammar = require('./index');
var Parser = require('grammarjs-recursive-parser');
var parser = new Parser(grammar);

describe('html', function(){
  it('tag.begin', function(){
    var str = '<p>';
    var val = parser.parse(str);
    var expected = { type: 'markup',
      content: [ 
        { type: 'tag.begin',
          content: 
           [ { type: 'tag.punctuation.bracket.begin', content: '<' },
             { type: 'ws', content: '' },
             { type: 'tag.name', content: 'p' },
             { type: 'ws', content: '' },
             { type: 'tag.punctuation.bracket.end', content: '>' } ] } ] };
    assert.deepEqual(val, expected);
  });

  it('tag.attribute', function(){
    var str = '<p id="content"></p><span></span>';
    var val = parser.parse(str);
    
    //console.log(JSON.stringify(val, null, 2));
  });
});