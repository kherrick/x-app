import "@material/web/all.js";

const tagName = "x-app";

export const xApp = {
  tagName,
  [tagName]: class extends HTMLElement {
    constructor() {
      super();
    }

    setup() {
      // :root aside md-list-item-padding
      globalThis.document.documentElement.style.setProperty(
        "--aside-md-list-item-padding",
        "0"
      );

      const xAppShadowRoot =
        globalThis.document.querySelector("x-app").shadowRoot;

      if (xAppShadowRoot) {
        // shell
        const shell = xAppShadowRoot.querySelector("#shell");
        if (shell) {
          shell.style.flexGrow = "1";
          shell.style.flexDirection = "row-reverse";
        }

        // aside
        const aside = xAppShadowRoot.querySelector("#menu");
        if (aside) {
          aside.classList.remove("open");

          aside.style.backgroundColor = "var(--x-ml-aside-background-color)";
          aside.style.maxWidth = "50%";
          aside.style.textAlign = "initial";
          aside.style.flex = "initial";

          const menuButton = this.shadowRoot.getElementById("menu-button");

          menuButton.style.display = "flex";
          menuButton.querySelector("a").setAttribute("tabindex", "-1");
          menuButton.addEventListener("click", () =>
            this.handleMenuButton(aside)
          );

          const matchMedia = globalThis.matchMedia("(min-width: 768px)");
          matchMedia.addEventListener("change", this.handleMediaQuery(aside));
        }

        // aside md-list-item [slot="start"]
        xAppShadowRoot
          .querySelectorAll('aside md-list-item [slot="start"]')
          .forEach((el) => {
            el.style.display = "initial";
          });

        // aside md-list-item [slot="headline"]
        xAppShadowRoot
          .querySelectorAll('aside md-list-item [slot="headline"]')
          .forEach((el) => {
            el.style.marginLeft = "initial";
          });
      }
    }

    // sidebar toggle functionality
    handleMenuButton(sidebar) {
      sidebar.classList.toggle("open");
    }

    // responsive behavior
    handleMediaQuery(sidebar) {
      return ({ matches }) => {
        if (matches) {
          sidebar.classList.add("open");
        } else {
          sidebar.classList.remove("open");
        }
      };
    }

    connectedCallback() {
      console.log(`${tagName} connected`);

      this.setup();
    }
  },
};

if (!customElements.get(tagName)) {
  customElements.define(tagName, xApp[xApp.tagName]);
}
