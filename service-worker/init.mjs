import { Workbox } from "https://esm.run/workbox-window";

globalThis.isLocalhost = globalThis.location.host === "localhost:3001";

if ("serviceWorker" in navigator && !globalThis.isLocalhost) {
  const serviceWorkerFile = "service-worker.js";

  const wb = new Workbox(
    `${globalThis.document.querySelector("base").href}${serviceWorkerFile}`
  );

  wb.addEventListener("waiting", (event) => {
    if (confirm("A new version is available. Update now?")) {
      wb.messageSkipWaiting();
    }
  });

  wb.addEventListener("controlling", () => {
    globalThis.location.reload();
  });

  wb.register();
}
