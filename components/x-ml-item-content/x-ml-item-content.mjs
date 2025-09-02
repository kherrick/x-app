const tagName = "x-ml-item-content";

export const xApp = {
  tagName,
  [tagName]: class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      // x-ml-item-content has no shadowroot
      const elements = this.querySelectorAll("x-postpress-code");
      requestAnimationFrame(() => {
        elements.forEach((el) => {
          if (el?.shadowRoot) {
            el.shadowRoot.querySelector("code").style.padding = "2.25rem 1rem";
          }
        });
      });
    }
  },
};

if (!customElements.get(tagName)) {
  customElements.define(tagName, xApp[xApp.tagName]);
}
