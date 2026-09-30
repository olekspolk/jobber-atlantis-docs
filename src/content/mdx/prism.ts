// Code highlighting as on the site: Prism with its default languages (markup, CSS, JavaScript), run
// over the page when a live example shows its code and when a component page changes tab. Code in
// other languages (tsx, sh) stays plain, as it does there. Only the app's own page: a prerendered
// copy's code comes highlighted.
import Prism from "prismjs";

export const highlightAll = () => Prism.highlightAllUnder(document.getElementById("root") ?? document);
