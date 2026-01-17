import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export function sanitizeHTML(dirty: string) {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      "p",
      "b",
      "i",
      "strong",
      "em",
      "a",
      "ul",
      "ol",
      "li",
      "br",
      "img",
      "h1",
      "h2",
      "h3",
      "blockquote",
      "code",
      "pre",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "loading", "target", "rel"],
  });
}
