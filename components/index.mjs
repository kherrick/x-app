import { styles as typescaleStyles } from "@material/web/typography/md-typescale-styles.js";

document.adoptedStyleSheets.push(typescaleStyles.styleSheet);

// declarative shadowdom polyfill
(function () {
  function supportsDeclarativeShadowDOM() {
    return HTMLTemplateElement.prototype.hasOwnProperty("shadowRoot");
  }

  function attachShadowRoots(root) {
    root
      .querySelectorAll("template[shadowrootmode]")
      .forEach((template) => {
        const mode = template.getAttribute("shadowrootmode");
        const shadowRoot = template.parentNode.attachShadow({ mode });
        shadowRoot.appendChild(template.content);
        template.remove();
        attachShadowRoots(shadowRoot);
      });
  }

  function polyfillDeclarativeShadowDOM() {
    if (!supportsDeclarativeShadowDOM()) {
      attachShadowRoots(document);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      polyfillDeclarativeShadowDOM
    );
  } else {
    polyfillDeclarativeShadowDOM();
  }
})();
