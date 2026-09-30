// Code highlighting: Prism, with the languages the site's code is written in besides Prism's own
// markup, CSS and JavaScript. From the first page with documents on, each code block in the app's
// page is highlighted as it comes in: a document's, a tab's or a disclosure's as it shows, an
// example's code when shown. (A prerendered copy's code comes highlighted.)
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";

// Not over the whole document on its own as well, a frame after loading.
Prism.manual = true;

const CODE = 'code[class*="language-"]';

function highlightIn(node: Element) {
  for (const code of node.matches(CODE) ? [node] : node.querySelectorAll(CODE)) {
    if (!code.querySelector(".token")) Prism.highlightElement(code);
  }
}

const root = document.getElementById("root");
if (root) {
  highlightIn(root);
  new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) if (node instanceof Element) highlightIn(node);
    }
  }).observe(root, { childList: true, subtree: true });
}
