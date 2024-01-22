import {settings} from "../settings";

export enum BlockType {
    sky = 'skyblue',
    dirt = 'sienna',
    copper = '#B87333',
    silver = 'silver',
    gold = 'goldenrod',
}

export class Block {
    canvas: HTMLElement;
    type: BlockType
    x: number;
    y: number;
    element = document.createElement('div');

    constructor(canvas: HTMLElement, x: number, y: number, type: BlockType = BlockType.dirt) {
        this.canvas = canvas;
        this.type = type;
        this.x = x;
        this.y = y;
        this.initBlock();
        canvas.appendChild(this.element);
    }

    initBlock() {
        this.element.style.position = 'absolute'
        this.element.style.width = `${settings.blockWidth}px`;
        this.element.style.height = `${settings.blockHeight}px`;
        this.element.style.background = this.type;
    }

    mine() {
        this.type = BlockType.sky;
        this.element.style.background = 'skyblue';
    }

    draw(playerX: number, playerY: number) {
        const viewWidth = settings.viewWidth;
        const viewHeight = settings.viewHeight;

        let drawPositionX;
        let drawPositionY;

        if (playerX < viewWidth / 2) {
            drawPositionX = this.x;
        } else if (playerX > (settings.gameWidth - (viewWidth / 2))) {
            drawPositionX = this.x - (settings.gameWidth - (viewWidth));
        } else {
            drawPositionX = this.x - (playerX - (viewWidth / 2));
        }
        if (playerY < viewHeight / 2) {
            drawPositionY = this.y;
        } else if (playerY > (settings.gameHeight - (viewHeight / 2))) {
            drawPositionY = this.y - (settings.gameHeight - (viewHeight));
        } else {
            drawPositionY = this.y - (playerY - (viewHeight / 2));
        }

        this.element.style.top = `${drawPositionY}px`;
        this.element.style.left = `${drawPositionX}px`;
    }
}