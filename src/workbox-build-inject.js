const { injectManifest } = require("workbox-build");

let workboxConfig = {
  globDirectory: "dist",
  globPatterns: ["*.js", "*.css", "favicon.ico", "index.html"],
  swSrc: "src/service-worker.js",
  swDest: "dist/service-worker.js",
  // Custom size limit
  maximumFileSizeToCacheInBytes: 4 * 1024 * 1024
};

injectManifest(workboxConfig).then(({ count, size }) => {
  console.log(
    `Generated ${workboxConfig.swDest}, which will precache ${count} files, totaling ${size} bytes.`
  );
});
