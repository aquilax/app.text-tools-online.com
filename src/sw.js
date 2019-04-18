/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.0/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "images/icon_128.png",
    "revision": "ad3043f8768346ac12e8d64c3a5f9177"
  },
  {
    "url": "images/icon_256.png",
    "revision": "1142eb80c6a54d0df88377ec81cb56e8"
  },
  {
    "url": "images/icon_512.png",
    "revision": "a0dbb4187adabda7cbb224accb3fc6fa"
  },
  {
    "url": "images/og.png",
    "revision": "8080036cab6c15be8d9c21cdfbc3a5d0"
  },
  {
    "url": "index.html",
    "revision": "9210c30364c4076212d2be7cf87790d2"
  },
  {
    "url": "js/app.js",
    "revision": "3613a645f8e675f9ef7cda6f1bb920a5"
  },
  {
    "url": "js/worker.js",
    "revision": "603382e203908b9fb8f4d9ae2895a788"
  },
  {
    "url": "manifest.json",
    "revision": "649b7448d1e0de3af134f60081fd4719"
  },
  {
    "url": "/?utm_source=homescreen",
    "revision": "eacf331f0ffc35d4b482f1d15a887d3b"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
