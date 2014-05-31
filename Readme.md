# highlightjs-html

Syntax Highlighting for HTML.

It simply outputs a flat list of tokens which have `dot.separated.names` which get used in CSS.

> Very accurate and high-performance syntax highlighting.

## Installation

node.js:

```
$ npm install highlightjs-html
```

browser:

```
$ component install highlightjs/html
```

## Notes

- https://github.com/atom/language-html/blob/master/grammars/html.cson
- http://manual.macromates.com/en/language_grammars.html
- punctuation.definition.tag.html
- https://github.com/josh/pygments
- http://pygments.org/docs/tokens/
- https://github.com/atom/highlights
- http://stackoverflow.com/questions/4170180/what-is-the-best-way-to-define-grammars-for-a-text-editor
- http://xahlee.info/comp/syntax_highlighting_language.html
- http://stackoverflow.com/questions/7243409/syntax-highlighting-how-does-eclipse-do-it-so-fast
- could build a custom parser specific for syntax highlighting (highlight/blob/master/lib/index.js)
- https://github.com/nathansobo/treetop
- https://github.com/mjackson/citrus
- https://news.ycombinator.com/item?id=1198683
- https://news.ycombinator.com/item?id=1198683
- https://github.com/erikrose/parsimonious
- https://github.com/Rebelizer/rebelizer/blob/master/peg/html-tokenizer.peg
- https://github.com/sebble/Dot-Markup/blob/master/peg/dotmarkup.peg
- converting regexps to pegs: http://www.inf.puc-rio.br/~roberto/docs/ry10-01.pdf
- https://gist.github.com/nightscape/3372398
- http://stackoverflow.com/questions/5175840/is-html-a-context-free-language
- HTML is not defined with a grammar, instead it is defined with an SGML DTD, which is sort of a higher-level grammar.
- http://cuiwww.unige.ch/db-research/Enseignement/analyseinfo/BNFweb.html
- http://www.garshol.priv.no/download/text/bnf.html
- https://github.com/richleland/pygments-css/blob/master/github.css

```html
<pre class="editor editor-colors">
  <div class="line">
    <span class="source js">
      <span class="storage modifier js"><span>var</span></span>
      <span>&nbsp;hello&nbsp;</span>
      <span class="keyword operator js"><span>=</span></span>
      <span>&nbsp;</span>
      <span class="string quoted double js">
        <span class="punctuation definition string begin js"><span>&quot;</span></span>
        <span>world</span>
        <span class="punctuation definition string end js"><span>&quot;</span></span>
      </span>
      <span class="punctuation terminator statement js"><span>;</span></span>
    </span>
  </div>
</pre>
```

So you could do something like:

```js
function parse(grammar) {
  for (var exp in grammar.expressions) {
    if (exp.topLevel) {

    } else if (exp.helper) {

    }
  }
}
```

## Licence

MIT