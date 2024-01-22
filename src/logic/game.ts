import {Environment} from "./environment";
import {Player} from "./player";
import {BlockType} from "../model/block";

export class Game {
    environment: Environment;
    player: Player;
    canvas: HTMLElement;
    inventoryElement = document.createElement('div');

    paused = false;
    updates = 0;

    constructor(canvas: HTMLElement) {
        this.canvas = canvas;

        this.canvas.appendChild(this.inventoryElement);
        this.environment = new Environment(canvas);
        this.player = new Player(canvas);
        this.drawInventory();
    }

    update() {
        this.player.update(this.environment);
        this.environment.update(this.player.x, this.player.y);
        this.updates ++;

        if (this.updates % 5 === 1) {
            this.inventoryElement.innerHTML = `
                <p>Copper: ${this.player.inventory.filter(i => i === BlockType.copper).length}</p>
                <p>Silver: ${this.player.inventory.filter(i => i === BlockType.silver).length}</p>
                <p>Gold: ${this.player.inventory.filter(i => i === BlockType.gold).length}</p>
                <p>Score: ${this.player.inventory.reduce((total, i) => i === BlockType.gold ? total + 10 : i === BlockType.silver ? total + 5 : i === BlockType.copper ? total + 1 : total, 0)}</p>
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