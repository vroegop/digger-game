import {Environment} from "./environment";
import {settings} from "../settings";
import {BlockType} from "../model/block";

export class Player {
    canvas: HTMLElement;

    x: number;
    y: number;
    width = settings.blockWidth - 10;
    height = settings.blockHeight - 10;
    keydown = false;
    keyup = false;
    keyleft = false;
    keyright = false;

    speedUp = 0;
    speedRight = 0;

    engineStrength = 0.03;
    engineMaxSpeed = 5;
    drillSpeed = 0.3;

    inventory: BlockType[] = [];

    playerDiv = document.createElement('div');

    constructor(canvas: HTMLElement) {
        this.canvas = canvas;
        this.x = 100;
        this.y = 200;
        this.initialize();
    }

    private initialize() {
        this.canvas.appendChild(this.playerDiv);
        this.initPlayerAppearance();
        this.setupEventListeners();
    }

    private initPlayerAppearance() {
        this.playerDiv.style.width = `${this.width}px`;
        this.playerDiv.style.height = `${this.height}px`;
        this.playerDiv.style.background = 'black';
        this.playerDiv.style.position = 'absolute';
        this.playerDiv.style.transform = 'translate(-50%, -50%)';
        this.playerDiv.style.color = 'white';
        // Looks like a chopper which is also a drill
        this.playerDiv.style.clipPath = 'polygon(0% 50%, 48% 30%, 48% 2%, 25% 2%, 25% 0%, 75% 0%, 75% 2%, 52% 2%, 52% 30%, 100% 50%, 50% 100%)';
    }

    private setupEventListeners() {
        window.addEventListener('keydown', e => this.setKey(e.key, true));
        window.addEventListener('keyup', e => this.setKey(e.key, false));
    }

    private setKey(keyCode: string, pressed: boolean) {
        switch(keyCode) {
            case 'ArrowUp': this.keyup = pressed; break;
            case 'ArrowDown': this.keydown = pressed; break;
            case 'ArrowLeft': this.keyleft = pressed; break;
            case 'ArrowRight': this.keyright = pressed; break;
        }
    }

    update(environment: Environment) {
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

    checkIfDigCompleted(environment: Environment) {
        const blocks = environment.getBlocksAroundPosition(this.x, this.y);
        if (blocks.center && blocks.center?.type !== BlockType.sky) {
            this.inventory.push(environment.mineBlock(blocks.center.x, blocks.center.y));
        }
    }

    checkTopCollision(environment: Environment) {
        if (environment.isAgainstTopBoundary(this.y, this.height)) {
            this.speedUp = 0.01;
            this.y = (settings.blockHeight / 2) + 0.01;
        } else if (environment.isTopCollision(this.x, this.y, this.width, this.height)) {
            if (this.speedUp > 0) {
                this.speedUp = -0.01;
            }
        } else if (this.keyup) {
            this.moveUp();
        }
    }

    checkBottomCollision(environment: Environment) {
        if (environment.isAgainstBottomBoundary(this.y, this.height)) {
            this.speedUp = -0.01;
            this.y = environment.boundaryY - 0.01 - (this.height / 2);
        } else if (environment.isBottomCollision(this.x, this.y, this.width, this.height)) {
            if (this.speedUp >= 0 && this.keydown) {
                this.speedUp = -this.drillSpeed;
            } else if (this.speedUp < 0) {
                this.speedUp = 0.01;
            }
        } else {
            if (!this.keyup) {
                this.fallDown();
            }
        }
    }

    checkLeftCollision(environment: Environment) {
        if (environment.isAgainstLeftBoundary(this.x, this.width)) {
            this.speedRight = 0.01;
            this.x = (this.width / 2) + 0.01;
        } else if (environment.isLeftCollision(this.x, this.y, this.width, this.height)) {
            if (this.speedRight >= 0 && this.keyleft) {
                this.speedRight = -this.drillSpeed;
            } else if (this.speedRight < 0) {
                this.speedRight = 0.01;
            }
        } else {
            if (this.keyleft) {
                this.moveLeft();
            }
        }
    }

    checkRightCollision(environment: Environment) {
        if (environment.isAgainstRightBoundary(this.x, this.width)) {
            this.speedRight = -0.01;
            this.x = environment.boundaryX - 0.01 - (this.width / 2);
        } else if (environment.isRightCollision(this.x, this.y, this.width, this.height)) {
            if (this.speedRight <= 0 && this.keyright) {
                this.speedRight = this.drillSpeed;
            } else if (this.speedRight > 0) {
                this.speedRight = -0.01;
            }
        } else {
            if (this.keyright) {
                this.moveRight();
            }
        }
    }

    slowDown() {
        if (this.speedRight > 0) {
            this.speedRight -= this.engineStrength / 2;
        } else if (this.speedRight < 0) {
            this.speedRight += this.engineStrength / 2;
        }
        if (this.speedRight > -0.05 && this.speedRight <  0.05) {
            this.speedRight = 0;
        }
    }

    draw() {
        let drawX = this.x;
        let drawY = this.y;

        if (this.x > settings.viewWidth / 2) {
            drawX = settings.viewWidth / 2;

            if (this.x > settings.gameWidth - (settings.viewWidth / 2)) {
                drawX = this.x - settings.gameWidth + settings.viewWidth;
            }
        }

        if (this.y > settings.viewHeight / 2) {
            drawY = settings.viewHeight / 2;

            if (this.y > settings.gameHeight - (settings.viewHeight / 2)) {
                drawY = this.y - settings.gameHeight + settings.viewHeight;
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
        // Braking is faster than accelerating
        if (this.speedRight > 0) {
            this.speedRight -= this.engineStrength;
        }
    }

    moveRight() {
        if (this.speedRight < this.engineMaxSpeed) {
            this.speedRight += this.engineStrength;
        }
        // Braking is faster than accelerating
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