/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst player_1 = __webpack_require__(/*! ./player */ \"./src/player.ts\");\nwindow.addEventListener(\"load\", function () {\n    const canvas = document.getElementById(\"canvas1\");\n    const ctx = canvas.getContext(\"2d\");\n    canvas.width = 500;\n    canvas.height = 500;\n    class Game {\n        constructor(width, height) {\n            this.width = width;\n            this.height = height;\n            this.player = new player_1.Player(this);\n        }\n        update() {\n            this.player.update();\n        }\n        draw(context) {\n            this.player.draw(context);\n        }\n    }\n    const game = new Game(canvas.width, canvas.height);\n    console.log(game);\n    function animate() {\n        ctx.clearRect(0, 0, canvas.width, canvas.height);\n        game.update();\n        if (ctx) {\n            game.draw(ctx);\n            requestAnimationFrame(animate);\n        }\n    }\n    animate();\n});\n\n\n//# sourceURL=webpack://ts_tutorial/./src/main.ts?");

/***/ }),

/***/ "./src/player.ts":
/*!***********************!*\
  !*** ./src/player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Player = void 0;\nclass Player {\n    constructor(game) {\n        this.game = game;\n        this.width = 100;\n        this.height = 91.3;\n        this.x = 0;\n        this.y = this.game.height - this.height;\n        this.image = document.getElementById(\"player\");\n    }\n    update() {\n        this.x++;\n    }\n    draw(context) {\n        context.fillStyle = \"red\";\n        context.fillRect(this.x, this.y, this.width, this.height);\n        context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);\n    }\n}\nexports.Player = Player;\n\n\n//# sourceURL=webpack://ts_tutorial/./src/player.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;