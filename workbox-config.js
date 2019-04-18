module.exports = {
  globDirectory: "src/",
  globPatterns: ["**/*.{png,html,json,js}"],
  swDest: "src/sw.js",
  templatedURLs: {
    "/?utm_source=homescreen": "index.html"
  }
};
