/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Game: () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _model_block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);



class Game {
    environment;
    player;
    canvas;
    inventoryElement = document.createElement('div');
    paused = false;
    updates = 0;
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.appendChild(this.inventoryElement);
        this.environment = new _environment__WEBPACK_IMPORTED_MODULE_0__.Environment(canvas);
        this.player = new _player__WEBPACK_IMPORTED_MODULE_1__.Player(canvas);
        this.drawInventory();
    }
    update() {
        this.player.update(this.environment);
        this.environment.update(this.player.x, this.player.y);
        this.updates++;
        if (this.updates % 5 === 1) {
            this.inventoryElement.innerHTML = `
                <p>Copper: ${this.player.inventory.filter(i => i === _model_block__WEBPACK_IMPORTED_MODULE_2__.BlockType.copper).length}</p>
                <p>Silver: ${this.player.inventory.filter(i => i === _model_block__WEBPACK_IMPORTED_MODULE_2__.BlockType.silver).length}</p>
                <p>Gold: ${this.player.inventory.filter(i => i === _model_block__WEBPACK_IMPORTED_MODULE_2__.BlockType.gold).length}</p>
                <p>Score: ${this.player.inventory.reduce((total, i) => i === _model_block__WEBPACK_IMPORTED_MODULE_2__.BlockType.gold ? total + 10 : i === _model_block__WEBPACK_IMPORTED_MODULE_2__.BlockType.silver ? total + 5 : i === _model_block__WEBPACK_IMPORTED_MODULE_2__.BlockType.copper ? total + 1 : total, 0)}</p>
            `;
        }
        requestAnimationFrame(() => this.paused || this.update());
    }
    drawInventory() {
        this.inventoryElement.style.color = 'white';
        this.inventoryElement.style.position = 'absolute';
        this.inventoryElement.style.left = '100px';
        this.inventoryElement.style.right = '100px';
    }
}


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Environment: () => (/* binding */ Environment)
/* harmony export */ });
/* harmony import */ var _model_block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);


class Environment {
    canvas;
    boundaryX = _settings__WEBPACK_IMPORTED_MODULE_1__.settings.gameWidth;
    boundaryY = _settings__WEBPACK_IMPORTED_MODULE_1__.settings.gameHeight;
    environmentMap = [];
    constructor(canvas) {
        this.canvas = canvas;
        this.initEnvironmentMap();
    }
    initEnvironmentMap() {
        for (let x = 0; x < this.boundaryX + 1; x += _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockWidth) {
            this.environmentMap[x] = [];
            for (let y = _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockHeight * 6; y < this.boundaryY; y += _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockHeight) {
                this.environmentMap[x][y] = new _model_block__WEBPACK_IMPORTED_MODULE_0__.Block(this.canvas, x, y, this.randomizeBlockType());
            }
        }
    }
    update(playerX, playerY) {
        this.environmentMap.forEach(line => line.forEach(block => {
            const isWithinGameWidth = Math.abs(block.x - playerX) < (_settings__WEBPACK_IMPORTED_MODULE_1__.settings.viewWidth);
            const isWithinGameHeight = Math.abs(block.y - playerY) < (_settings__WEBPACK_IMPORTED_MODULE_1__.settings.viewHeight);
            if (isWithinGameWidth && isWithinGameHeight) {
                block.draw(playerX, playerY);
            }
        }));
    }
    randomizeBlockType() {
        const random = Math.random();
        if (random < 0.05) {
            return _model_block__WEBPACK_IMPORTED_MODULE_0__.BlockType.sky;
        }
        if (random < 0.1) {
            return _model_block__WEBPACK_IMPORTED_MODULE_0__.BlockType.copper;
        }
        if (random < 0.13) {
            return _model_block__WEBPACK_IMPORTED_MODULE_0__.BlockType.silver;
        }
        if (random < 0.15) {
            return _model_block__WEBPACK_IMPORTED_MODULE_0__.BlockType.gold;
        }
        return _model_block__WEBPACK_IMPORTED_MODULE_0__.BlockType.dirt;
    }
    mineBlock(x, y) {
        const type = this.environmentMap[x][y].type;
        this.environmentMap[x][y].mine();
        return type;
    }
    isAgainstLeftBoundary(x, width) {
        return x < (width / 2);
    }
    isAgainstRightBoundary(x, width) {
        return x > this.boundaryX - (width / 2);
    }
    isAgainstTopBoundary(y, height) {
        return y < (height / 2);
    }
    isAgainstBottomBoundary(y, height) {
        return y > this.boundaryY - (height / 2);
    }
    getBlocksAroundPosition(x, y) {
        return {
            center: this.environmentMap[x - (x % _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockWidth)]?.[y - (y % _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockHeight)],
            topLeft: this.environmentMap[(x - _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockWidth) - (x % _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockWidth)]?.[(y - _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockHeight) - (y % _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockHeight)],
            left: this.environmentMap[(x - _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockWidth) - (x % _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockWidth)]?.[(y) - (y % _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockHeight)],
            bottomLeft: this.environmentMap[(x - _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockWidth) - (x % _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockWidth)]?.[(y + _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockHeight) - (y % _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockHeight)],
            topRight: this.environmentMap[(x + _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockWidth) - (x % _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockWidth)]?.[(y - _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockHeight) - (y % _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockHeight)],
            right: this.environmentMap[(x + _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockWidth) - (x % _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockWidth)]?.[(y) - (y % _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockHeight)],
            bottomRight: this.environmentMap[(x + _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockWidth) - (x % _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockWidth)]?.[(y + _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockHeight) - (y % _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockHeight)],
            top: this.environmentMap[x - (x % _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockWidth)]?.[(y - _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockHeight) - (y % _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockHeight)],
            bottom: this.environmentMap[x - (x % _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockWidth)]?.[(y + _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockHeight) - (y % _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockHeight)],
        };
    }
    isLeftCollision(playerX, playerY, playerWidth, playerHeight) {
        const blocks = this.getBlocksAroundPosition(playerX, playerY);
        let collision = false;
        [blocks.topLeft, blocks.left, blocks.bottomLeft].forEach(block => {
            if (!block || block.type === _model_block__WEBPACK_IMPORTED_MODULE_0__.BlockType.sky) {
                return;
            }
            const blockRight = block.x + _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockWidth;
            const blockTop = block.y + 2;
            const blockBottom = block.y + _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockHeight - 2;
            const playerLeft = playerX - (playerWidth / 2);
            const playerTop = playerY - (playerHeight / 2);
            const playerBottom = playerY + (playerHeight / 2);
            if (playerLeft < blockRight && playerTop < blockBottom && playerBottom > blockTop) {
                collision = true;
            }
        });
        return collision;
    }
    isRightCollision(playerX, playerY, playerWidth, playerHeight) {
        const blocks = this.getBlocksAroundPosition(playerX, playerY);
        let collision = false;
        [blocks.topRight, blocks.right, blocks.bottomRight].forEach(block => {
            if (!block || block.type === _model_block__WEBPACK_IMPORTED_MODULE_0__.BlockType.sky) {
                return;
            }
            const blockLeft = block.x;
            const blockTop = block.y + 2;
            const blockBottom = block.y + _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockHeight - 2;
            const playerRight = playerX + (playerWidth / 2);
            const playerTop = playerY - (playerHeight / 2);
            const playerBottom = playerY + (playerHeight / 2);
            if (playerRight > blockLeft && playerTop < blockBottom && playerBottom > blockTop) {
                collision = true;
            }
        });
        return collision;
    }
    isTopCollision(playerX, playerY, playerWidth, playerHeight) {
        const blocks = this.getBlocksAroundPosition(playerX, playerY);
        let collision = false;
        [blocks.topLeft, blocks.top, blocks.topRight].forEach(block => {
            if (!block || block.type === _model_block__WEBPACK_IMPORTED_MODULE_0__.BlockType.sky) {
                return;
            }
            const blockLeft = block.x;
            const blockRight = block.x + _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockWidth;
            const blockBottom = block.y + _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockHeight;
            const playerLeft = playerX - (playerWidth / 2);
            const playerRight = playerX + (playerWidth / 2);
            const playerTop = playerY - (playerHeight / 2);
            if (playerTop < blockBottom && playerLeft < blockRight && playerRight > blockLeft) {
                collision = true;
            }
        });
        return collision;
    }
    isBottomCollision(playerX, playerY, playerWidth, playerHeight) {
        const blocks = this.getBlocksAroundPosition(playerX, playerY);
        let collision = false;
        [blocks.bottomLeft, blocks.bottom, blocks.bottomRight].forEach(block => {
            if (!block || block.type === _model_block__WEBPACK_IMPORTED_MODULE_0__.BlockType.sky) {
                return;
            }
            const blockLeft = block.x;
            const blockRight = block.x + _settings__WEBPACK_IMPORTED_MODULE_1__.settings.blockWidth;
            const blockTop = block.y;
            const playerLeft = playerX - (playerWidth / 2);
            const playerRight = playerX + (playerWidth / 2);
            const playerBottom = playerY + (playerHeight / 2);
            if (playerBottom > blockTop && playerLeft < blockRight && playerRight > blockLeft) {
                collision = true;
            }
        });
        return collision;
    }
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Block: () => (/* binding */ Block),
/* harmony export */   BlockType: () => (/* binding */ BlockType)
/* harmony export */ });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);

var BlockType;
(function (BlockType) {
    BlockType["sky"] = "skyblue";
    BlockType["dirt"] = "sienna";
    BlockType["copper"] = "#B87333";
    BlockType["silver"] = "silver";
    BlockType["gold"] = "goldenrod";
})(BlockType || (BlockType = {}));
class Block {
    canvas;
    type;
    x;
    y;
    element = document.createElement('div');
    constructor(canvas, x, y, type = BlockType.dirt) {
        this.canvas = canvas;
        this.type = type;
        this.x = x;
        this.y = y;
        this.initBlock();
        canvas.appendChild(this.element);
    }
    initBlock() {
        this.element.style.position = 'absolute';
        this.element.style.width = `${_settings__WEBPACK_IMPORTED_MODULE_0__.settings.blockWidth}px`;
        this.element.style.height = `${_settings__WEBPACK_IMPORTED_MODULE_0__.settings.blockHeight}px`;
        this.element.style.background = this.type;
    }
    mine() {
        this.type = BlockType.sky;
        this.element.style.background = 'skyblue';
    }
    draw(playerX, playerY) {
        const viewWidth = _settings__WEBPACK_IMPORTED_MODULE_0__.settings.viewWidth;
        const viewHeight = _settings__WEBPACK_IMPORTED_MODULE_0__.settings.viewHeight;
        let drawPositionX;
        let drawPositionY;
        if (playerX < viewWidth / 2) {
            drawPositionX = this.x;
        }
        else if (playerX > (_settings__WEBPACK_IMPORTED_MODULE_0__.settings.gameWidth - (viewWidth / 2))) {
            drawPositionX = this.x - (_settings__WEBPACK_IMPORTED_MODULE_0__.settings.gameWidth - (viewWidth));
        }
        else {
            drawPositionX = this.x - (playerX - (viewWidth / 2));
        }
        if (playerY < viewHeight / 2) {
            drawPositionY = this.y;
        }
        else if (playerY > (_settings__WEBPACK_IMPORTED_MODULE_0__.settings.gameHeight - (viewHeight / 2))) {
            drawPositionY = this.y - (_settings__WEBPACK_IMPORTED_MODULE_0__.settings.gameHeight - (viewHeight));
        }
        else {
            drawPositionY = this.y - (playerY - (viewHeight / 2));
        }
        this.element.style.top = `${drawPositionY}px`;
        this.element.style.left = `${drawPositionX}px`;
    }
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   settings: () => (/* binding */ settings)
/* harmony export */ });
class settings {
    static viewWidth = 400;
    static viewHeight = 800;
    static gameWidth = 2000;
    static gameHeight = 10000;
    static blockWidth = 50;
    static blockHeight = 50;
}


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _model_block__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);


class Player {
    canvas;
    x;
    y;
    width = _settings__WEBPACK_IMPORTED_MODULE_0__.settings.blockWidth - 10;
    height = _settings__WEBPACK_IMPORTED_MODULE_0__.settings.blockHeight - 10;
    keydown = false;
    keyup = false;
    keyleft = false;
    keyright = false;
    speedUp = 0;
    speedRight = 0;
    engineStrength = 0.03;
    engineMaxSpeed = 5;
    drillSpeed = 0.3;
    inventory = [];
    playerDiv = document.createElement('div');
    constructor(canvas) {
        this.canvas = canvas;
        this.x = 100;
        this.y = 200;
        this.initialize();
    }
    initialize() {
        this.canvas.appendChild(this.playerDiv);
        this.initPlayerAppearance();
        this.setupEventListeners();
    }
    initPlayerAppearance() {
        this.playerDiv.style.width = `${this.width}px`;
        this.playerDiv.style.height = `${this.height}px`;
        this.playerDiv.style.background = 'black';
        this.playerDiv.style.position = 'absolute';
        this.playerDiv.style.transform = 'translate(-50%, -50%)';
        this.playerDiv.style.color = 'white';
        this.playerDiv.style.clipPath = 'polygon(0% 50%, 48% 30%, 48% 2%, 25% 2%, 25% 0%, 75% 0%, 75% 2%, 52% 2%, 52% 30%, 100% 50%, 50% 100%)';
    }
    setupEventListeners() {
        window.addEventListener('keydown', e => this.setKey(e.key, true));
        window.addEventListener('keyup', e => this.setKey(e.key, false));
    }
    setKey(keyCode, pressed) {
        switch (keyCode) {
            case 'ArrowUp':
                this.keyup = pressed;
                break;
            case 'ArrowDown':
                this.keydown = pressed;
                break;
            case 'ArrowLeft':
                this.keyleft = pressed;
                break;
            case 'ArrowRight':
                this.keyright = pressed;
                break;
        }
    }
    update(environment) {
        this.x += this.speedRight;
        this.y -= this.speedUp;
        this.checkIfDigCompleted(environment);
        this.checkBottomCollision(environment);
        this.checkLeftCollision(environment);
        this.checkRightCollision(environment);
        this.checkTopCollision(environment);
        if (!this.keyright && !this.keyleft) {
            this.slowDown();
        }
        this.draw();
    }
    checkIfDigCompleted(environment) {
        const blocks = environment.getBlocksAroundPosition(this.x, this.y);
        if (blocks.center && blocks.center?.type !== _model_block__WEBPACK_IMPORTED_MODULE_1__.BlockType.sky) {
            this.inventory.push(environment.mineBlock(blocks.center.x, blocks.center.y));
        }
    }
    checkTopCollision(environment) {
        if (environment.isAgainstTopBoundary(this.y, this.height)) {
            this.speedUp = 0.01;
            this.y = (_settings__WEBPACK_IMPORTED_MODULE_0__.settings.blockHeight / 2) + 0.01;
        }
        else if (environment.isTopCollision(this.x, this.y, this.width, this.height)) {
            if (this.speedUp > 0) {
                this.speedUp = -0.01;
            }
        }
        else if (this.keyup) {
            this.moveUp();
        }
    }
    checkBottomCollision(environment) {
        if (environment.isAgainstBottomBoundary(this.y, this.height)) {
            this.speedUp = -0.01;
            this.y = environment.boundaryY - 0.01 - (this.height / 2);
        }
        else if (environment.isBottomCollision(this.x, this.y, this.width, this.height)) {
            if (this.speedUp >= 0 && this.keydown) {
                this.speedUp = -this.drillSpeed;
            }
            else if (this.speedUp < 0) {
                this.speedUp = 0.01;
            }
        }
        else {
            if (!this.keyup) {
                this.fallDown();
            }
        }
    }
    checkLeftCollision(environment) {
        if (environment.isAgainstLeftBoundary(this.x, this.width)) {
            this.speedRight = 0.01;
            this.x = (this.width / 2) + 0.01;
        }
        else if (environment.isLeftCollision(this.x, this.y, this.width, this.height)) {
            if (this.speedRight >= 0 && this.keyleft) {
                this.speedRight = -this.drillSpeed;
            }
            else if (this.speedRight < 0) {
                this.speedRight = 0.01;
            }
        }
        else {
            if (this.keyleft) {
                this.moveLeft();
            }
        }
    }
    checkRightCollision(environment) {
        if (environment.isAgainstRightBoundary(this.x, this.width)) {
            this.speedRight = -0.01;
            this.x = environment.boundaryX - 0.01 - (this.width / 2);
        }
        else if (environment.isRightCollision(this.x, this.y, this.width, this.height)) {
            if (this.speedRight <= 0 && this.keyright) {
                this.speedRight = this.drillSpeed;
            }
            else if (this.speedRight > 0) {
                this.speedRight = -0.01;
            }
        }
        else {
            if (this.keyright) {
                this.moveRight();
            }
        }
    }
    slowDown() {
        if (this.speedRight > 0) {
            this.speedRight -= this.engineStrength / 2;
        }
        else if (this.speedRight < 0) {
            this.speedRight += this.engineStrength / 2;
        }
        if (this.speedRight > -0.05 && this.speedRight < 0.05) {
            this.speedRight = 0;
        }
    }
    draw() {
        let drawX = this.x;
        let drawY = this.y;
        if (this.x > _settings__WEBPACK_IMPORTED_MODULE_0__.settings.viewWidth / 2) {
            drawX = _settings__WEBPACK_IMPORTED_MODULE_0__.settings.viewWidth / 2;
            if (this.x > _settings__WEBPACK_IMPORTED_MODULE_0__.settings.gameWidth - (_settings__WEBPACK_IMPORTED_MODULE_0__.settings.viewWidth / 2)) {
                drawX = this.x - _settings__WEBPACK_IMPORTED_MODULE_0__.settings.gameWidth + _settings__WEBPACK_IMPORTED_MODULE_0__.settings.viewWidth;
            }
        }
        if (this.y > _settings__WEBPACK_IMPORTED_MODULE_0__.settings.viewHeight / 2) {
            drawY = _settings__WEBPACK_IMPORTED_MODULE_0__.settings.viewHeight / 2;
            if (this.y > _settings__WEBPACK_IMPORTED_MODULE_0__.settings.gameHeight - (_settings__WEBPACK_IMPORTED_MODULE_0__.settings.viewHeight / 2)) {
                drawY = this.y - _settings__WEBPACK_IMPORTED_MODULE_0__.settings.gameHeight + _settings__WEBPACK_IMPORTED_MODULE_0__.settings.viewHeight;
            }
        }
        this.playerDiv.style.left = `${drawX}px`;
        this.playerDiv.style.top = `${drawY}px`;
    }
    moveUp() {
        if (this.speedUp < this.engineMaxSpeed) {
            this.speedUp += this.engineStrength;
        }
    }
    moveLeft() {
        if (this.speedRight > -this.engineMaxSpeed) {
            this.speedRight -= this.engineStrength;
        }
        if (this.speedRight > 0) {
            this.speedRight -= this.engineStrength;
        }
    }
    moveRight() {
        if (this.speedRight < this.engineMaxSpeed) {
            this.speedRight += this.engineStrength;
        }
        if (this.speedRight < 0) {
            this.speedRight += this.engineStrength;
        }
    }
    fallDown() {
        if (this.speedUp > -10) {
            this.speedUp -= 0.1;
        }
    }
}


/***/ })
/******/ 	]);
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logic_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);


class DiggerGame extends HTMLElement {
    game;
    app;
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }
    connectedCallback() {
        this.game = new _logic_game__WEBPACK_IMPORTED_MODULE_0__.Game(this.shadowRoot.querySelector('#wrapper'));
        window.addEventListener('keydown', e => {
            if (this.game && (e.key === 'p')) {
                this.game.paused = !this.game.paused;
                this.game.update();
                this.shadowRoot.querySelector('#state').innerHTML = this.game?.paused ? 'Paused' : 'Playing';
            }
        });
        this.game.update();
    }
    render() {
        this.shadowRoot.innerHTML = `
            <div id="wrapper"></div>

            <style>
                #wrapper {
                display: flex;
                overflow: hidden;
                width: ${_settings__WEBPACK_IMPORTED_MODULE_1__.settings.viewWidth}px;
                height: ${_settings__WEBPACK_IMPORTED_MODULE_1__.settings.viewHeight}px;
                position: relative;
                background: skyblue;
                transform: rotate3d(0, 0, 0, 0);
                }
            </style>
        `;
    }
}
customElements.define('digger-game', DiggerGame);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDLEdBQUcsK0NBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRywrQ0FBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLCtDQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDcEgsVUFBVSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsK0NBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRywrQ0FBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRywrQ0FBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLCtDQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDakosUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsK0NBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRywrQ0FBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRywrQ0FBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLCtDQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDL0ksS0FBSyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsK0NBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRywrQ0FBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLCtDQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDckgsV0FBVyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsK0NBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRywrQ0FBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FB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SCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFVBQVcsQ0FBQyxTQUFTLEdBQUc7Ozs7Ozs7eUJBT1osK0NBQVEsQ0FBQyxTQUFTOzBCQUNqQiwrQ0FBUSxDQUFDLFVBQVU7Ozs7OztTQU1wQyxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsY0FBYyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaWdnZXIvLi9zcmMvbG9naWMvZ2FtZS50cyIsIndlYnBhY2s6Ly9kaWdnZXIvLi9zcmMvbG9naWMvZW52aXJvbm1lbnQudHMiLCJ3ZWJwYWNrOi8vZGlnZ2VyLy4vc3JjL21vZGVsL2Jsb2NrLnRzIiwid2VicGFjazovL2RpZ2dlci8uL3NyYy9zZXR0aW5ncy50cyIsIndlYnBhY2s6Ly9kaWdnZXIvLi9zcmMvbG9naWMvcGxheWVyLnRzIiwid2VicGFjazovL2RpZ2dlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kaWdnZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2RpZ2dlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2RpZ2dlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2RpZ2dlci8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Vudmlyb25tZW50fSBmcm9tIFwiLi9lbnZpcm9ubWVudFwiO1xuaW1wb3J0IHtQbGF5ZXJ9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHtCbG9ja1R5cGV9IGZyb20gXCIuLi9tb2RlbC9ibG9ja1wiO1xuXG5leHBvcnQgY2xhc3MgR2FtZSB7XG4gICAgZW52aXJvbm1lbnQ6IEVudmlyb25tZW50O1xuICAgIHBsYXllcjogUGxheWVyO1xuICAgIGNhbnZhczogSFRNTEVsZW1lbnQ7XG4gICAgaW52ZW50b3J5RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgcGF1c2VkID0gZmFsc2U7XG4gICAgdXBkYXRlcyA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuXG4gICAgICAgIHRoaXMuY2FudmFzLmFwcGVuZENoaWxkKHRoaXMuaW52ZW50b3J5RWxlbWVudCk7XG4gICAgICAgIHRoaXMuZW52aXJvbm1lbnQgPSBuZXcgRW52aXJvbm1lbnQoY2FudmFzKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKGNhbnZhcyk7XG4gICAgICAgIHRoaXMuZHJhd0ludmVudG9yeSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIudXBkYXRlKHRoaXMuZW52aXJvbm1lbnQpO1xuICAgICAgICB0aGlzLmVudmlyb25tZW50LnVwZGF0ZSh0aGlzLnBsYXllci54LCB0aGlzLnBsYXllci55KTtcbiAgICAgICAgdGhpcy51cGRhdGVzICsrO1xuXG4gICAgICAgIGlmICh0aGlzLnVwZGF0ZXMgJSA1ID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmludmVudG9yeUVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgIDxwPkNvcHBlcjogJHt0aGlzLnBsYXllci5pbnZlbnRvcnkuZmlsdGVyKGkgPT4gaSA9PT0gQmxvY2tUeXBlLmNvcHBlcikubGVuZ3RofTwvcD5cbiAgICAgICAgICAgICAgICA8cD5TaWx2ZXI6ICR7dGhpcy5wbGF5ZXIuaW52ZW50b3J5LmZpbHRlcihpID0+IGkgPT09IEJsb2NrVHlwZS5zaWx2ZXIpLmxlbmd0aH08L3A+XG4gICAgICAgICAgICAgICAgPHA+R29sZDogJHt0aGlzLnBsYXllci5pbnZlbnRvcnkuZmlsdGVyKGkgPT4gaSA9PT0gQmxvY2tUeXBlLmdvbGQpLmxlbmd0aH08L3A+XG4gICAgICAgICAgICAgICAgPHA+U2NvcmU6ICR7dGhpcy5wbGF5ZXIuaW52ZW50b3J5LnJlZHVjZSgodG90YWwsIGkpID0+IGkgPT09IEJsb2NrVHlwZS5nb2xkID8gdG90YWwgKyAxMCA6IGkgPT09IEJsb2NrVHlwZS5zaWx2ZXIgPyB0b3RhbCArIDUgOiBpID09PSBCbG9ja1R5cGUuY29wcGVyID8gdG90YWwgKyAxIDogdG90YWwsIDApfTwvcD5cbiAgICAgICAgICAgIGA7XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5wYXVzZWQgfHwgdGhpcy51cGRhdGUoKSk7XG4gICAgfVxuXG4gICAgZHJhd0ludmVudG9yeSgpIHtcbiAgICAgICAgdGhpcy5pbnZlbnRvcnlFbGVtZW50LnN0eWxlLmNvbG9yID0gJ3doaXRlJztcbiAgICAgICAgdGhpcy5pbnZlbnRvcnlFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdGhpcy5pbnZlbnRvcnlFbGVtZW50LnN0eWxlLmxlZnQgPSAnMTAwcHgnO1xuICAgICAgICB0aGlzLmludmVudG9yeUVsZW1lbnQuc3R5bGUucmlnaHQgPSAnMTAwcHgnO1xuICAgIH1cbn0iLCJpbXBvcnQge0Jsb2NrLCBCbG9ja1R5cGV9IGZyb20gXCIuLi9tb2RlbC9ibG9ja1wiO1xuaW1wb3J0IHtzZXR0aW5nc30gZnJvbSBcIi4uL3NldHRpbmdzXCI7XG5cbmV4cG9ydCBjbGFzcyBFbnZpcm9ubWVudCB7XG4gICAgY2FudmFzOiBIVE1MRWxlbWVudDtcbiAgICBib3VuZGFyeVggPSBzZXR0aW5ncy5nYW1lV2lkdGg7XG4gICAgYm91bmRhcnlZID0gc2V0dGluZ3MuZ2FtZUhlaWdodDtcbiAgICBlbnZpcm9ubWVudE1hcDogQmxvY2tbXVtdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLmluaXRFbnZpcm9ubWVudE1hcCgpO1xuICAgIH1cblxuICAgIGluaXRFbnZpcm9ubWVudE1hcCgpIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmJvdW5kYXJ5WCArIDE7IHggKz0gc2V0dGluZ3MuYmxvY2tXaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5lbnZpcm9ubWVudE1hcFt4XSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgeSA9IHNldHRpbmdzLmJsb2NrSGVpZ2h0ICogNjsgeSA8IHRoaXMuYm91bmRhcnlZOyB5ICs9IHNldHRpbmdzLmJsb2NrSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnZpcm9ubWVudE1hcFt4XVt5XSA9IG5ldyBCbG9jayh0aGlzLmNhbnZhcywgeCwgeSwgdGhpcy5yYW5kb21pemVCbG9ja1R5cGUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUocGxheWVyWDogbnVtYmVyLCBwbGF5ZXJZOiBudW1iZXIpIHtcbiAgICAgICAgLy8gT25seSBkcmF3IHdoZW4gYmxvY2sueCBpcyBsZXNzIHRoYW4gc2V0dGluZ3MuZ2FtZVdpZHRoIGF3YXkgYW5kIGJsb2NrLnkgaXMgbGVzcyB0aGFuIHNldHRpbmdzLmdhbWVIZWlnaHQgYXdheVxuICAgICAgICB0aGlzLmVudmlyb25tZW50TWFwLmZvckVhY2gobGluZSA9PlxuICAgICAgICAgICAgbGluZS5mb3JFYWNoKGJsb2NrID0+IHtcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgYmxvY2sgaXMgd2l0aGluIHRoZSBkZWZpbmVkIGdhbWUgd2lkdGggYW5kIGhlaWdodCBmcm9tIHRoZSBwbGF5ZXJcbiAgICAgICAgICAgICAgICBjb25zdCBpc1dpdGhpbkdhbWVXaWR0aCA9IE1hdGguYWJzKGJsb2NrLnggLSBwbGF5ZXJYKSA8IChzZXR0aW5ncy52aWV3V2lkdGgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzV2l0aGluR2FtZUhlaWdodCA9IE1hdGguYWJzKGJsb2NrLnkgLSBwbGF5ZXJZKSA8IChzZXR0aW5ncy52aWV3SGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgIC8vIERyYXcgdGhlIGJsb2NrIGlmIGl0J3Mgd2l0aGluIHRoZSByYW5nZVxuICAgICAgICAgICAgICAgIGlmIChpc1dpdGhpbkdhbWVXaWR0aCAmJiBpc1dpdGhpbkdhbWVIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2suZHJhdyhwbGF5ZXJYLCBwbGF5ZXJZKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJhbmRvbWl6ZUJsb2NrVHlwZSgpOiBCbG9ja1R5cGUge1xuICAgICAgICBjb25zdCByYW5kb20gPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICBpZiAocmFuZG9tIDwgMC4wNSkge1xuICAgICAgICAgICAgcmV0dXJuIEJsb2NrVHlwZS5za3k7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmRvbSA8IDAuMSkge1xuICAgICAgICAgICAgcmV0dXJuIEJsb2NrVHlwZS5jb3BwZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmRvbSA8IDAuMTMpIHtcbiAgICAgICAgICAgIHJldHVybiBCbG9ja1R5cGUuc2lsdmVyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyYW5kb20gPCAwLjE1KSB7XG4gICAgICAgICAgICByZXR1cm4gQmxvY2tUeXBlLmdvbGQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEJsb2NrVHlwZS5kaXJ0O1xuICAgIH1cblxuICAgIG1pbmVCbG9jayh4OiBudW1iZXIsIHk6IG51bWJlcik6IEJsb2NrVHlwZSB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLmVudmlyb25tZW50TWFwW3hdW3ldLnR5cGU7XG4gICAgICAgIHRoaXMuZW52aXJvbm1lbnRNYXBbeF1beV0ubWluZSgpO1xuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG5cbiAgICBpc0FnYWluc3RMZWZ0Qm91bmRhcnkoeDogbnVtYmVyLCB3aWR0aDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB4IDwgKHdpZHRoIC8gMik7XG4gICAgfVxuXG4gICAgaXNBZ2FpbnN0UmlnaHRCb3VuZGFyeSh4OiBudW1iZXIsIHdpZHRoOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHggPiB0aGlzLmJvdW5kYXJ5WCAtICh3aWR0aCAvIDIpO1xuICAgIH1cblxuICAgIGlzQWdhaW5zdFRvcEJvdW5kYXJ5KHk6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHkgPCAoaGVpZ2h0IC8gMik7XG4gICAgfVxuXG4gICAgaXNBZ2FpbnN0Qm90dG9tQm91bmRhcnkoeTogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4geSA+IHRoaXMuYm91bmRhcnlZIC0gKGhlaWdodCAvIDIpO1xuICAgIH1cblxuICAgIGdldEJsb2Nrc0Fyb3VuZFBvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjZW50ZXI6IHRoaXMuZW52aXJvbm1lbnRNYXBbeCAtICh4ICUgc2V0dGluZ3MuYmxvY2tXaWR0aCldPy5beSAtICh5ICUgc2V0dGluZ3MuYmxvY2tIZWlnaHQpXSxcbiAgICAgICAgICAgIHRvcExlZnQ6IHRoaXMuZW52aXJvbm1lbnRNYXBbKHggLSBzZXR0aW5ncy5ibG9ja1dpZHRoKSAtICh4ICUgc2V0dGluZ3MuYmxvY2tXaWR0aCldPy5bKHkgLSBzZXR0aW5ncy5ibG9ja0hlaWdodCkgLSAoeSAlIHNldHRpbmdzLmJsb2NrSGVpZ2h0KV0sXG4gICAgICAgICAgICBsZWZ0OiB0aGlzLmVudmlyb25tZW50TWFwWyh4IC0gc2V0dGluZ3MuYmxvY2tXaWR0aCkgLSAoeCAlIHNldHRpbmdzLmJsb2NrV2lkdGgpXT8uWyh5KSAtICh5ICUgc2V0dGluZ3MuYmxvY2tIZWlnaHQpXSxcbiAgICAgICAgICAgIGJvdHRvbUxlZnQ6IHRoaXMuZW52aXJvbm1lbnRNYXBbKHggLSBzZXR0aW5ncy5ibG9ja1dpZHRoKSAtICh4ICUgc2V0dGluZ3MuYmxvY2tXaWR0aCldPy5bKHkgKyBzZXR0aW5ncy5ibG9ja0hlaWdodCkgLSAoeSAlIHNldHRpbmdzLmJsb2NrSGVpZ2h0KV0sXG4gICAgICAgICAgICB0b3BSaWdodDogdGhpcy5lbnZpcm9ubWVudE1hcFsoeCArIHNldHRpbmdzLmJsb2NrV2lkdGgpIC0gKHggJSBzZXR0aW5ncy5ibG9ja1dpZHRoKV0/LlsoeSAtIHNldHRpbmdzLmJsb2NrSGVpZ2h0KSAtICh5ICUgc2V0dGluZ3MuYmxvY2tIZWlnaHQpXSxcbiAgICAgICAgICAgIHJpZ2h0OiB0aGlzLmVudmlyb25tZW50TWFwWyh4ICsgc2V0dGluZ3MuYmxvY2tXaWR0aCkgLSAoeCAlIHNldHRpbmdzLmJsb2NrV2lkdGgpXT8uWyh5KSAtICh5ICUgc2V0dGluZ3MuYmxvY2tIZWlnaHQpXSxcbiAgICAgICAgICAgIGJvdHRvbVJpZ2h0OiB0aGlzLmVudmlyb25tZW50TWFwWyh4ICsgc2V0dGluZ3MuYmxvY2tXaWR0aCkgLSAoeCAlIHNldHRpbmdzLmJsb2NrV2lkdGgpXT8uWyh5ICsgc2V0dGluZ3MuYmxvY2tIZWlnaHQpIC0gKHkgJSBzZXR0aW5ncy5ibG9ja0hlaWdodCldLFxuICAgICAgICAgICAgdG9wOiB0aGlzLmVudmlyb25tZW50TWFwW3ggLSAoeCAlIHNldHRpbmdzLmJsb2NrV2lkdGgpXT8uWyh5IC0gc2V0dGluZ3MuYmxvY2tIZWlnaHQpIC0gKHkgJSBzZXR0aW5ncy5ibG9ja0hlaWdodCldLFxuICAgICAgICAgICAgYm90dG9tOiB0aGlzLmVudmlyb25tZW50TWFwW3ggLSAoeCAlIHNldHRpbmdzLmJsb2NrV2lkdGgpXT8uWyh5ICsgc2V0dGluZ3MuYmxvY2tIZWlnaHQpIC0gKHkgJSBzZXR0aW5ncy5ibG9ja0hlaWdodCldLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlzTGVmdENvbGxpc2lvbihwbGF5ZXJYOiBudW1iZXIsIHBsYXllclk6IG51bWJlciwgcGxheWVyV2lkdGg6IG51bWJlciwgcGxheWVySGVpZ2h0OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgYmxvY2tzID0gdGhpcy5nZXRCbG9ja3NBcm91bmRQb3NpdGlvbihwbGF5ZXJYLCBwbGF5ZXJZKTtcbiAgICAgICAgbGV0IGNvbGxpc2lvbiA9IGZhbHNlO1xuICAgICAgICBbYmxvY2tzLnRvcExlZnQsIGJsb2Nrcy5sZWZ0LCBibG9ja3MuYm90dG9tTGVmdF0uZm9yRWFjaChibG9jayA9PiB7XG4gICAgICAgICAgICBpZiAoIWJsb2NrIHx8IGJsb2NrLnR5cGUgPT09IEJsb2NrVHlwZS5za3kpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBibG9ja1JpZ2h0ID0gYmxvY2sueCArIHNldHRpbmdzLmJsb2NrV2lkdGg7XG4gICAgICAgICAgICBjb25zdCBibG9ja1RvcCA9IGJsb2NrLnkgKyAyO1xuICAgICAgICAgICAgY29uc3QgYmxvY2tCb3R0b20gPSBibG9jay55ICsgc2V0dGluZ3MuYmxvY2tIZWlnaHQgLSAyO1xuICAgICAgICAgICAgY29uc3QgcGxheWVyTGVmdCA9IHBsYXllclggLSAocGxheWVyV2lkdGggLyAyKTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllclRvcCA9IHBsYXllclkgLSAocGxheWVySGVpZ2h0IC8gMik7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJCb3R0b20gPSBwbGF5ZXJZICsgKHBsYXllckhlaWdodCAvIDIpO1xuXG4gICAgICAgICAgICBpZiAocGxheWVyTGVmdCA8IGJsb2NrUmlnaHQgJiYgcGxheWVyVG9wIDwgYmxvY2tCb3R0b20gJiYgcGxheWVyQm90dG9tID4gYmxvY2tUb3ApIHtcbiAgICAgICAgICAgICAgICBjb2xsaXNpb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gY29sbGlzaW9uO1xuICAgIH1cblxuICAgIGlzUmlnaHRDb2xsaXNpb24ocGxheWVyWDogbnVtYmVyLCBwbGF5ZXJZOiBudW1iZXIsIHBsYXllcldpZHRoOiBudW1iZXIsIHBsYXllckhlaWdodDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGJsb2NrcyA9IHRoaXMuZ2V0QmxvY2tzQXJvdW5kUG9zaXRpb24ocGxheWVyWCwgcGxheWVyWSk7XG4gICAgICAgIGxldCBjb2xsaXNpb24gPSBmYWxzZTtcbiAgICAgICAgW2Jsb2Nrcy50b3BSaWdodCwgYmxvY2tzLnJpZ2h0LCBibG9ja3MuYm90dG9tUmlnaHRdLmZvckVhY2goYmxvY2sgPT4ge1xuICAgICAgICAgICAgaWYgKCFibG9jayB8fCBibG9jay50eXBlID09PSBCbG9ja1R5cGUuc2t5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYmxvY2tMZWZ0ID0gYmxvY2sueDtcbiAgICAgICAgICAgIGNvbnN0IGJsb2NrVG9wID0gYmxvY2sueSArIDI7XG4gICAgICAgICAgICBjb25zdCBibG9ja0JvdHRvbSA9IGJsb2NrLnkgKyBzZXR0aW5ncy5ibG9ja0hlaWdodCAtIDI7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJSaWdodCA9IHBsYXllclggKyAocGxheWVyV2lkdGggLyAyKTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllclRvcCA9IHBsYXllclkgLSAocGxheWVySGVpZ2h0IC8gMik7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJCb3R0b20gPSBwbGF5ZXJZICsgKHBsYXllckhlaWdodCAvIDIpO1xuXG4gICAgICAgICAgICBpZiAocGxheWVyUmlnaHQgPiBibG9ja0xlZnQgJiYgcGxheWVyVG9wIDwgYmxvY2tCb3R0b20gJiYgcGxheWVyQm90dG9tID4gYmxvY2tUb3ApIHtcbiAgICAgICAgICAgICAgICBjb2xsaXNpb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gY29sbGlzaW9uO1xuICAgIH1cblxuICAgIGlzVG9wQ29sbGlzaW9uKHBsYXllclg6IG51bWJlciwgcGxheWVyWTogbnVtYmVyLCBwbGF5ZXJXaWR0aDogbnVtYmVyLCBwbGF5ZXJIZWlnaHQ6IG51bWJlcikge1xuICAgICAgICBjb25zdCBibG9ja3MgPSB0aGlzLmdldEJsb2Nrc0Fyb3VuZFBvc2l0aW9uKHBsYXllclgsIHBsYXllclkpO1xuICAgICAgICBsZXQgY29sbGlzaW9uID0gZmFsc2U7XG4gICAgICAgIFtibG9ja3MudG9wTGVmdCwgYmxvY2tzLnRvcCwgYmxvY2tzLnRvcFJpZ2h0XS5mb3JFYWNoKGJsb2NrID0+IHtcbiAgICAgICAgICAgIGlmICghYmxvY2sgfHwgYmxvY2sudHlwZSA9PT0gQmxvY2tUeXBlLnNreSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGJsb2NrTGVmdCA9IGJsb2NrLng7XG4gICAgICAgICAgICBjb25zdCBibG9ja1JpZ2h0ID0gYmxvY2sueCArIHNldHRpbmdzLmJsb2NrV2lkdGg7XG4gICAgICAgICAgICBjb25zdCBibG9ja0JvdHRvbSA9IGJsb2NrLnkgKyBzZXR0aW5ncy5ibG9ja0hlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllckxlZnQgPSBwbGF5ZXJYIC0gKHBsYXllcldpZHRoIC8gMik7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJSaWdodCA9IHBsYXllclggKyAocGxheWVyV2lkdGggLyAyKTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllclRvcCA9IHBsYXllclkgLSAocGxheWVySGVpZ2h0IC8gMik7XG5cbiAgICAgICAgICAgIGlmIChwbGF5ZXJUb3AgPCBibG9ja0JvdHRvbSAmJiBwbGF5ZXJMZWZ0IDwgYmxvY2tSaWdodCAmJiBwbGF5ZXJSaWdodCA+IGJsb2NrTGVmdCkge1xuICAgICAgICAgICAgICAgIGNvbGxpc2lvbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBjb2xsaXNpb247XG4gICAgfVxuXG4gICAgaXNCb3R0b21Db2xsaXNpb24ocGxheWVyWDogbnVtYmVyLCBwbGF5ZXJZOiBudW1iZXIsIHBsYXllcldpZHRoOiBudW1iZXIsIHBsYXllckhlaWdodDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGJsb2NrcyA9IHRoaXMuZ2V0QmxvY2tzQXJvdW5kUG9zaXRpb24ocGxheWVyWCwgcGxheWVyWSk7XG4gICAgICAgIGxldCBjb2xsaXNpb24gPSBmYWxzZTtcbiAgICAgICAgW2Jsb2Nrcy5ib3R0b21MZWZ0LCBibG9ja3MuYm90dG9tLCBibG9ja3MuYm90dG9tUmlnaHRdLmZvckVhY2goYmxvY2sgPT4ge1xuICAgICAgICAgICAgaWYgKCFibG9jayB8fCBibG9jay50eXBlID09PSBCbG9ja1R5cGUuc2t5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYmxvY2tMZWZ0ID0gYmxvY2sueDtcbiAgICAgICAgICAgIGNvbnN0IGJsb2NrUmlnaHQgPSBibG9jay54ICsgc2V0dGluZ3MuYmxvY2tXaWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGJsb2NrVG9wID0gYmxvY2sueTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllckxlZnQgPSBwbGF5ZXJYIC0gKHBsYXllcldpZHRoIC8gMik7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJSaWdodCA9IHBsYXllclggKyAocGxheWVyV2lkdGggLyAyKTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllckJvdHRvbSA9IHBsYXllclkgKyAocGxheWVySGVpZ2h0IC8gMik7XG5cbiAgICAgICAgICAgIGlmIChwbGF5ZXJCb3R0b20gPiBibG9ja1RvcCAmJiBwbGF5ZXJMZWZ0IDwgYmxvY2tSaWdodCAmJiBwbGF5ZXJSaWdodCA+IGJsb2NrTGVmdCkge1xuICAgICAgICAgICAgICAgIGNvbGxpc2lvbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBjb2xsaXNpb247XG4gICAgfVxufSIsImltcG9ydCB7c2V0dGluZ3N9IGZyb20gXCIuLi9zZXR0aW5nc1wiO1xuXG5leHBvcnQgZW51bSBCbG9ja1R5cGUge1xuICAgIHNreSA9ICdza3libHVlJyxcbiAgICBkaXJ0ID0gJ3NpZW5uYScsXG4gICAgY29wcGVyID0gJyNCODczMzMnLFxuICAgIHNpbHZlciA9ICdzaWx2ZXInLFxuICAgIGdvbGQgPSAnZ29sZGVucm9kJyxcbn1cblxuZXhwb3J0IGNsYXNzIEJsb2NrIHtcbiAgICBjYW52YXM6IEhUTUxFbGVtZW50O1xuICAgIHR5cGU6IEJsb2NrVHlwZVxuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG4gICAgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MRWxlbWVudCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHR5cGU6IEJsb2NrVHlwZSA9IEJsb2NrVHlwZS5kaXJ0KSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLmluaXRCbG9jaygpO1xuICAgICAgICBjYW52YXMuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICB9XG5cbiAgICBpbml0QmxvY2soKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSdcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLndpZHRoID0gYCR7c2V0dGluZ3MuYmxvY2tXaWR0aH1weGA7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHtzZXR0aW5ncy5ibG9ja0hlaWdodH1weGA7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gdGhpcy50eXBlO1xuICAgIH1cblxuICAgIG1pbmUoKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IEJsb2NrVHlwZS5za3k7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gJ3NreWJsdWUnO1xuICAgIH1cblxuICAgIGRyYXcocGxheWVyWDogbnVtYmVyLCBwbGF5ZXJZOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3Qgdmlld1dpZHRoID0gc2V0dGluZ3Mudmlld1dpZHRoO1xuICAgICAgICBjb25zdCB2aWV3SGVpZ2h0ID0gc2V0dGluZ3Mudmlld0hlaWdodDtcblxuICAgICAgICBsZXQgZHJhd1Bvc2l0aW9uWDtcbiAgICAgICAgbGV0IGRyYXdQb3NpdGlvblk7XG5cbiAgICAgICAgaWYgKHBsYXllclggPCB2aWV3V2lkdGggLyAyKSB7XG4gICAgICAgICAgICBkcmF3UG9zaXRpb25YID0gdGhpcy54O1xuICAgICAgICB9IGVsc2UgaWYgKHBsYXllclggPiAoc2V0dGluZ3MuZ2FtZVdpZHRoIC0gKHZpZXdXaWR0aCAvIDIpKSkge1xuICAgICAgICAgICAgZHJhd1Bvc2l0aW9uWCA9IHRoaXMueCAtIChzZXR0aW5ncy5nYW1lV2lkdGggLSAodmlld1dpZHRoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkcmF3UG9zaXRpb25YID0gdGhpcy54IC0gKHBsYXllclggLSAodmlld1dpZHRoIC8gMikpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGF5ZXJZIDwgdmlld0hlaWdodCAvIDIpIHtcbiAgICAgICAgICAgIGRyYXdQb3NpdGlvblkgPSB0aGlzLnk7XG4gICAgICAgIH0gZWxzZSBpZiAocGxheWVyWSA+IChzZXR0aW5ncy5nYW1lSGVpZ2h0IC0gKHZpZXdIZWlnaHQgLyAyKSkpIHtcbiAgICAgICAgICAgIGRyYXdQb3NpdGlvblkgPSB0aGlzLnkgLSAoc2V0dGluZ3MuZ2FtZUhlaWdodCAtICh2aWV3SGVpZ2h0KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkcmF3UG9zaXRpb25ZID0gdGhpcy55IC0gKHBsYXllclkgLSAodmlld0hlaWdodCAvIDIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSBgJHtkcmF3UG9zaXRpb25ZfXB4YDtcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmxlZnQgPSBgJHtkcmF3UG9zaXRpb25YfXB4YDtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIHNldHRpbmdzIHtcbiAgICBzdGF0aWMgdmlld1dpZHRoID0gNDAwO1xuICAgIHN0YXRpYyB2aWV3SGVpZ2h0ID0gODAwO1xuICAgIHN0YXRpYyBnYW1lV2lkdGggPSAyMDAwXG4gICAgc3RhdGljIGdhbWVIZWlnaHQgPSAxMDAwMFxuICAgIHN0YXRpYyBibG9ja1dpZHRoID0gNTBcbiAgICBzdGF0aWMgYmxvY2tIZWlnaHQgPSA1MFxufSIsImltcG9ydCB7RW52aXJvbm1lbnR9IGZyb20gXCIuL2Vudmlyb25tZW50XCI7XG5pbXBvcnQge3NldHRpbmdzfSBmcm9tIFwiLi4vc2V0dGluZ3NcIjtcbmltcG9ydCB7QmxvY2tUeXBlfSBmcm9tIFwiLi4vbW9kZWwvYmxvY2tcIjtcblxuZXhwb3J0IGNsYXNzIFBsYXllciB7XG4gICAgY2FudmFzOiBIVE1MRWxlbWVudDtcblxuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG4gICAgd2lkdGggPSBzZXR0aW5ncy5ibG9ja1dpZHRoIC0gMTA7XG4gICAgaGVpZ2h0ID0gc2V0dGluZ3MuYmxvY2tIZWlnaHQgLSAxMDtcbiAgICBrZXlkb3duID0gZmFsc2U7XG4gICAga2V5dXAgPSBmYWxzZTtcbiAgICBrZXlsZWZ0ID0gZmFsc2U7XG4gICAga2V5cmlnaHQgPSBmYWxzZTtcblxuICAgIHNwZWVkVXAgPSAwO1xuICAgIHNwZWVkUmlnaHQgPSAwO1xuXG4gICAgZW5naW5lU3RyZW5ndGggPSAwLjAzO1xuICAgIGVuZ2luZU1heFNwZWVkID0gNTtcbiAgICBkcmlsbFNwZWVkID0gMC4zO1xuXG4gICAgaW52ZW50b3J5OiBCbG9ja1R5cGVbXSA9IFtdO1xuXG4gICAgcGxheWVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLnggPSAxMDA7XG4gICAgICAgIHRoaXMueSA9IDIwMDtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplKCkge1xuICAgICAgICB0aGlzLmNhbnZhcy5hcHBlbmRDaGlsZCh0aGlzLnBsYXllckRpdik7XG4gICAgICAgIHRoaXMuaW5pdFBsYXllckFwcGVhcmFuY2UoKTtcbiAgICAgICAgdGhpcy5zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0UGxheWVyQXBwZWFyYW5jZSgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJEaXYuc3R5bGUud2lkdGggPSBgJHt0aGlzLndpZHRofXB4YDtcbiAgICAgICAgdGhpcy5wbGF5ZXJEaXYuc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy5oZWlnaHR9cHhgO1xuICAgICAgICB0aGlzLnBsYXllckRpdi5zdHlsZS5iYWNrZ3JvdW5kID0gJ2JsYWNrJztcbiAgICAgICAgdGhpcy5wbGF5ZXJEaXYuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0aGlzLnBsYXllckRpdi5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKC01MCUsIC01MCUpJztcbiAgICAgICAgdGhpcy5wbGF5ZXJEaXYuc3R5bGUuY29sb3IgPSAnd2hpdGUnO1xuICAgICAgICAvLyBMb29rcyBsaWtlIGEgY2hvcHBlciB3aGljaCBpcyBhbHNvIGEgZHJpbGxcbiAgICAgICAgdGhpcy5wbGF5ZXJEaXYuc3R5bGUuY2xpcFBhdGggPSAncG9seWdvbigwJSA1MCUsIDQ4JSAzMCUsIDQ4JSAyJSwgMjUlIDIlLCAyNSUgMCUsIDc1JSAwJSwgNzUlIDIlLCA1MiUgMiUsIDUyJSAzMCUsIDEwMCUgNTAlLCA1MCUgMTAwJSknO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0dXBFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHRoaXMuc2V0S2V5KGUua2V5LCB0cnVlKSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGUgPT4gdGhpcy5zZXRLZXkoZS5rZXksIGZhbHNlKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRLZXkoa2V5Q29kZTogc3RyaW5nLCBwcmVzc2VkOiBib29sZWFuKSB7XG4gICAgICAgIHN3aXRjaChrZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzogdGhpcy5rZXl1cCA9IHByZXNzZWQ7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzogdGhpcy5rZXlkb3duID0gcHJlc3NlZDsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOiB0aGlzLmtleWxlZnQgPSBwcmVzc2VkOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOiB0aGlzLmtleXJpZ2h0ID0gcHJlc3NlZDsgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoZW52aXJvbm1lbnQ6IEVudmlyb25tZW50KSB7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnNwZWVkUmlnaHQ7XG4gICAgICAgIHRoaXMueSAtPSB0aGlzLnNwZWVkVXA7XG5cbiAgICAgICAgdGhpcy5jaGVja0lmRGlnQ29tcGxldGVkKGVudmlyb25tZW50KTtcbiAgICAgICAgdGhpcy5jaGVja0JvdHRvbUNvbGxpc2lvbihlbnZpcm9ubWVudCk7XG4gICAgICAgIHRoaXMuY2hlY2tMZWZ0Q29sbGlzaW9uKGVudmlyb25tZW50KTtcbiAgICAgICAgdGhpcy5jaGVja1JpZ2h0Q29sbGlzaW9uKGVudmlyb25tZW50KTtcbiAgICAgICAgdGhpcy5jaGVja1RvcENvbGxpc2lvbihlbnZpcm9ubWVudCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmtleXJpZ2h0ICYmICF0aGlzLmtleWxlZnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2xvd0Rvd24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICB9XG5cbiAgICBjaGVja0lmRGlnQ29tcGxldGVkKGVudmlyb25tZW50OiBFbnZpcm9ubWVudCkge1xuICAgICAgICBjb25zdCBibG9ja3MgPSBlbnZpcm9ubWVudC5nZXRCbG9ja3NBcm91bmRQb3NpdGlvbih0aGlzLngsIHRoaXMueSk7XG4gICAgICAgIGlmIChibG9ja3MuY2VudGVyICYmIGJsb2Nrcy5jZW50ZXI/LnR5cGUgIT09IEJsb2NrVHlwZS5za3kpIHtcbiAgICAgICAgICAgIHRoaXMuaW52ZW50b3J5LnB1c2goZW52aXJvbm1lbnQubWluZUJsb2NrKGJsb2Nrcy5jZW50ZXIueCwgYmxvY2tzLmNlbnRlci55KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja1RvcENvbGxpc2lvbihlbnZpcm9ubWVudDogRW52aXJvbm1lbnQpIHtcbiAgICAgICAgaWYgKGVudmlyb25tZW50LmlzQWdhaW5zdFRvcEJvdW5kYXJ5KHRoaXMueSwgdGhpcy5oZWlnaHQpKSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkVXAgPSAwLjAxO1xuICAgICAgICAgICAgdGhpcy55ID0gKHNldHRpbmdzLmJsb2NrSGVpZ2h0IC8gMikgKyAwLjAxO1xuICAgICAgICB9IGVsc2UgaWYgKGVudmlyb25tZW50LmlzVG9wQ29sbGlzaW9uKHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkVXAgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZFVwID0gLTAuMDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5rZXl1cCkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlVXAoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrQm90dG9tQ29sbGlzaW9uKGVudmlyb25tZW50OiBFbnZpcm9ubWVudCkge1xuICAgICAgICBpZiAoZW52aXJvbm1lbnQuaXNBZ2FpbnN0Qm90dG9tQm91bmRhcnkodGhpcy55LCB0aGlzLmhlaWdodCkpIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWRVcCA9IC0wLjAxO1xuICAgICAgICAgICAgdGhpcy55ID0gZW52aXJvbm1lbnQuYm91bmRhcnlZIC0gMC4wMSAtICh0aGlzLmhlaWdodCAvIDIpO1xuICAgICAgICB9IGVsc2UgaWYgKGVudmlyb25tZW50LmlzQm90dG9tQ29sbGlzaW9uKHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkVXAgPj0gMCAmJiB0aGlzLmtleWRvd24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkVXAgPSAtdGhpcy5kcmlsbFNwZWVkO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNwZWVkVXAgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZFVwID0gMC4wMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5rZXl1cCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmFsbERvd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrTGVmdENvbGxpc2lvbihlbnZpcm9ubWVudDogRW52aXJvbm1lbnQpIHtcbiAgICAgICAgaWYgKGVudmlyb25tZW50LmlzQWdhaW5zdExlZnRCb3VuZGFyeSh0aGlzLngsIHRoaXMud2lkdGgpKSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkUmlnaHQgPSAwLjAxO1xuICAgICAgICAgICAgdGhpcy54ID0gKHRoaXMud2lkdGggLyAyKSArIDAuMDE7XG4gICAgICAgIH0gZWxzZSBpZiAoZW52aXJvbm1lbnQuaXNMZWZ0Q29sbGlzaW9uKHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkUmlnaHQgPj0gMCAmJiB0aGlzLmtleWxlZnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkUmlnaHQgPSAtdGhpcy5kcmlsbFNwZWVkO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNwZWVkUmlnaHQgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZFJpZ2h0ID0gMC4wMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmtleWxlZnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVMZWZ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja1JpZ2h0Q29sbGlzaW9uKGVudmlyb25tZW50OiBFbnZpcm9ubWVudCkge1xuICAgICAgICBpZiAoZW52aXJvbm1lbnQuaXNBZ2FpbnN0UmlnaHRCb3VuZGFyeSh0aGlzLngsIHRoaXMud2lkdGgpKSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkUmlnaHQgPSAtMC4wMTtcbiAgICAgICAgICAgIHRoaXMueCA9IGVudmlyb25tZW50LmJvdW5kYXJ5WCAtIDAuMDEgLSAodGhpcy53aWR0aCAvIDIpO1xuICAgICAgICB9IGVsc2UgaWYgKGVudmlyb25tZW50LmlzUmlnaHRDb2xsaXNpb24odGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3BlZWRSaWdodCA8PSAwICYmIHRoaXMua2V5cmlnaHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkUmlnaHQgPSB0aGlzLmRyaWxsU3BlZWQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3BlZWRSaWdodCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkUmlnaHQgPSAtMC4wMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmtleXJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlUmlnaHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNsb3dEb3duKCkge1xuICAgICAgICBpZiAodGhpcy5zcGVlZFJpZ2h0ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zcGVlZFJpZ2h0IC09IHRoaXMuZW5naW5lU3RyZW5ndGggLyAyO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3BlZWRSaWdodCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWRSaWdodCArPSB0aGlzLmVuZ2luZVN0cmVuZ3RoIC8gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zcGVlZFJpZ2h0ID4gLTAuMDUgJiYgdGhpcy5zcGVlZFJpZ2h0IDwgIDAuMDUpIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWRSaWdodCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KCkge1xuICAgICAgICBsZXQgZHJhd1ggPSB0aGlzLng7XG4gICAgICAgIGxldCBkcmF3WSA9IHRoaXMueTtcblxuICAgICAgICBpZiAodGhpcy54ID4gc2V0dGluZ3Mudmlld1dpZHRoIC8gMikge1xuICAgICAgICAgICAgZHJhd1ggPSBzZXR0aW5ncy52aWV3V2lkdGggLyAyO1xuXG4gICAgICAgICAgICBpZiAodGhpcy54ID4gc2V0dGluZ3MuZ2FtZVdpZHRoIC0gKHNldHRpbmdzLnZpZXdXaWR0aCAvIDIpKSB7XG4gICAgICAgICAgICAgICAgZHJhd1ggPSB0aGlzLnggLSBzZXR0aW5ncy5nYW1lV2lkdGggKyBzZXR0aW5ncy52aWV3V2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55ID4gc2V0dGluZ3Mudmlld0hlaWdodCAvIDIpIHtcbiAgICAgICAgICAgIGRyYXdZID0gc2V0dGluZ3Mudmlld0hlaWdodCAvIDI7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnkgPiBzZXR0aW5ncy5nYW1lSGVpZ2h0IC0gKHNldHRpbmdzLnZpZXdIZWlnaHQgLyAyKSkge1xuICAgICAgICAgICAgICAgIGRyYXdZID0gdGhpcy55IC0gc2V0dGluZ3MuZ2FtZUhlaWdodCArIHNldHRpbmdzLnZpZXdIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBsYXllckRpdi5zdHlsZS5sZWZ0ID0gYCR7ZHJhd1h9cHhgO1xuICAgICAgICB0aGlzLnBsYXllckRpdi5zdHlsZS50b3AgPSBgJHtkcmF3WX1weGA7XG4gICAgfVxuXG4gICAgbW92ZVVwKCkge1xuICAgICAgICBpZiAodGhpcy5zcGVlZFVwIDwgdGhpcy5lbmdpbmVNYXhTcGVlZCkge1xuICAgICAgICAgICAgdGhpcy5zcGVlZFVwICs9IHRoaXMuZW5naW5lU3RyZW5ndGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlTGVmdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3BlZWRSaWdodCA+IC10aGlzLmVuZ2luZU1heFNwZWVkKSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkUmlnaHQgLT0gdGhpcy5lbmdpbmVTdHJlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICAvLyBCcmFraW5nIGlzIGZhc3RlciB0aGFuIGFjY2VsZXJhdGluZ1xuICAgICAgICBpZiAodGhpcy5zcGVlZFJpZ2h0ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zcGVlZFJpZ2h0IC09IHRoaXMuZW5naW5lU3RyZW5ndGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlUmlnaHQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNwZWVkUmlnaHQgPCB0aGlzLmVuZ2luZU1heFNwZWVkKSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkUmlnaHQgKz0gdGhpcy5lbmdpbmVTdHJlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICAvLyBCcmFraW5nIGlzIGZhc3RlciB0aGFuIGFjY2VsZXJhdGluZ1xuICAgICAgICBpZiAodGhpcy5zcGVlZFJpZ2h0IDwgMCkge1xuICAgICAgICAgICAgdGhpcy5zcGVlZFJpZ2h0ICs9IHRoaXMuZW5naW5lU3RyZW5ndGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmYWxsRG93bigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3BlZWRVcCA+IC0xMCkge1xuICAgICAgICAgICAgdGhpcy5zcGVlZFVwIC09IDAuMTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7R2FtZX0gZnJvbSBcIi4vbG9naWMvZ2FtZVwiO1xuaW1wb3J0IHtzZXR0aW5nc30gZnJvbSBcIi4vc2V0dGluZ3NcIjtcblxuY2xhc3MgRGlnZ2VyR2FtZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBnYW1lOiBHYW1lIHwgdW5kZWZpbmVkO1xuICAgIGFwcDogYW55O1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSk7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMuZ2FtZSA9IG5ldyBHYW1lKHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignI3dyYXBwZXInKSEpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lICYmIChlLmtleSA9PT0gJ3AnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wYXVzZWQgPSAhdGhpcy5nYW1lLnBhdXNlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcjc3RhdGUnKSEuaW5uZXJIVE1MID0gdGhpcy5nYW1lPy5wYXVzZWQgPyAnUGF1c2VkJyA6ICdQbGF5aW5nJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5nYW1lLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5zaGFkb3dSb290IS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8ZGl2IGlkPVwid3JhcHBlclwiPjwvZGl2PlxuXG4gICAgICAgICAgICA8c3R5bGU+XG4gICAgICAgICAgICAgICAgI3dyYXBwZXIge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgICAgICB3aWR0aDogJHtzZXR0aW5ncy52aWV3V2lkdGh9cHg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAke3NldHRpbmdzLnZpZXdIZWlnaHR9cHg7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHNreWJsdWU7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUzZCgwLCAwLCAwLCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L3N0eWxlPlxuICAgICAgICBgO1xuICAgIH1cbn1cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZGlnZ2VyLWdhbWUnLCBEaWdnZXJHYW1lKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=