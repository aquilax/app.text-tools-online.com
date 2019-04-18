all: sw

sw:
	workbox generateSW workbox-config.js
