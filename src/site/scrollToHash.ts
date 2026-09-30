// The element a URL's #hash names (a heading's id), scrolled into view. A hash that is not valid
// percent-encoding (a truncated link, #100%) is looked up as written.
export function scrollToHash(hash: string = window.location.hash) {
  if (!hash) return;
  let id = hash.slice(1);
  try {
    id = decodeURIComponent(id);
  } catch {
    // not percent-encoded: the id as written
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
