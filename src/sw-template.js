if (typeof importScripts === "function") {
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");
    workbox.core.skipWaiting();

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

    // Set up App Shell-style routing, so that all navigation requests
    // are fulfilled with your index.html shell. Learn more at
    // https://developers.google.com/web/fundamentals/architecture/app-shell
    const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
    workbox.precaching.registerRoute(
      // Return false to exempt requests from being fulfilled by index.html.
      ({ request, url }) => {
        // If this isn't a navigation, skip.
        if (request.mode !== "navigate") {
          return false;
        } // If this is a URL that starts with /_, skip.

        if (url.pathname.startsWith("/_")) {
          return false;
        } // If this looks like a URL for a resource, because it contains // a file extension, skip.

        if (url.pathname.match(fileExtensionRegexp)) {
          return false;
        } // Return true to signal that we want to use the handler.

        return true;
      },
      workbox.precaching.createHandlerBoundToURL(
        process.env.PUBLIC_URL + "/index.html"
      )
    );

    /* custom cache rules */
    workbox.routing.registerRoute(
      new workbox.routing.NavigationRoute(
        new workbox.strategies.NetworkFirst({
          cacheName: "PRODUCTION"
        })
      )
    );
  } else {
    // console.log('Workbox could not be loaded. No Offline support');
  }
}
