import {Block, BlockType} from "../model/block";
import {settings} from "../settings";

export class Environment {
    canvas: HTMLElement;
    boundaryX = settings.gameWidth;
    boundaryY = settings.gameHeight;
    environmentMap: Block[][] = [];

    constructor(canvas: HTMLElement) {
        this.canvas = canvas;
        this.initEnvironmentMap();
    }

    initEnvironmentMap() {
        for (let x = 0; x < this.boundaryX + 1; x += settings.blockWidth) {
            this.environmentMap[x] = [];
            for (let y = settings.blockHeight * 6; y < this.boundaryY; y += settings.blockHeight) {
                this.environmentMap[x][y] = new Block(this.canvas, x, y, this.randomizeBlockType());
            }
        }
    }

    update(playerX: number, playerY: number) {
        // Only draw when block.x is less than settings.gameWidth away and block.y is less than settings.gameHeight away
        this.environmentMap.forEach(line =>
            line.forEach(block => {
                // Check if the block is within the defined game width and height from the player
                const isWithinGameWidth = Math.abs(block.x - playerX) < (settings.viewWidth);
                const isWithinGameHeight = Math.abs(block.y - playerY) < (settings.viewHeight);

                // Draw the block if it's within the range
                if (isWithinGameWidth && isWithinGameHeight) {
                    block.draw(playerX, playerY);
                }
            })
        );
    }

    randomizeBlockType(): BlockType {
        const random = Math.random();
        if (random < 0.05) {
            return BlockType.sky;
        }
        if (random < 0.1) {
            return BlockType.copper;
        }
        if (random < 0.13) {
            return BlockType.silver;
        }
        if (random < 0.15) {
            return BlockType.gold;
        }
        return BlockType.dirt;
    }

    mineBlock(x: number, y: number): BlockType {
        const type = this.environmentMap[x][y].type;
        this.environmentMap[x][y].mine();
        return type;
    }

    isAgainstLeftBoundary(x: number, width: number) {
        return x < (width / 2);
    }

    isAgainstRightBoundary(x: number, width: number) {
        return x > this.boundaryX - (width / 2);
    }

    isAgainstTopBoundary(y: number, height: number) {
        return y < (height / 2);
    }

    isAgainstBottomBoundary(y: number, height: number) {
        return y > this.boundaryY - (height / 2);
    }

    getBlocksAroundPosition(x: number, y: number) {
        return {
            center: this.environmentMap[x - (x % settings.blockWidth)]?.[y - (y % settings.blockHeight)],
            topLeft: this.environmentMap[(x - settings.blockWidth) - (x % settings.blockWidth)]?.[(y - settings.blockHeight) - (y % settings.blockHeight)],
            left: this.environmentMap[(x - settings.blockWidth) - (x % settings.blockWidth)]?.[(y) - (y % settings.blockHeight)],
            bottomLeft: this.environmentMap[(x - settings.blockWidth) - (x % settings.blockWidth)]?.[(y + settings.blockHeight) - (y % settings.blockHeight)],
            topRight: this.environmentMap[(x + settings.blockWidth) - (x % settings.blockWidth)]?.[(y - settings.blockHeight) - (y % settings.blockHeight)],
            right: this.environmentMap[(x + settings.blockWidth) - (x % settings.blockWidth)]?.[(y) - (y % settings.blockHeight)],
            bottomRight: this.environmentMap[(x + settings.blockWidth) - (x % settings.blockWidth)]?.[(y + settings.blockHeight) - (y % settings.blockHeight)],
            top: this.environmentMap[x - (x % settings.blockWidth)]?.[(y - settings.blockHeight) - (y % settings.blockHeight)],
            bottom: this.environmentMap[x - (x % settings.blockWidth)]?.[(y + settings.blockHeight) - (y % settings.blockHeight)],
        };
    }

    isLeftCollision(playerX: number, playerY: number, playerWidth: number, playerHeight: number) {
        const blocks = this.getBlocksAroundPosition(playerX, playerY);
        let collision = false;
        [blocks.topLeft, blocks.left, blocks.bottomLeft].forEach(block => {
            if (!block || block.type === BlockType.sky) {
                return;
            }
            const blockRight = block.x + settings.blockWidth;
            const blockTop = block.y + 2;
            const blockBottom = block.y + settings.blockHeight - 2;
            const playerLeft = playerX - (playerWidth / 2);
            const playerTop = playerY - (playerHeight / 2);
            const playerBottom = playerY + (playerHeight / 2);

            if (playerLeft < blockRight && playerTop < blockBottom && playerBottom > blockTop) {
                collision = true;
            }
        })
        return collision;
    }

    isRightCollision(playerX: number, playerY: number, playerWidth: number, playerHeight: number) {
        const blocks = this.getBlocksAroundPosition(playerX, playerY);
        let collision = false;
        [blocks.topRight, blocks.right, blocks.bottomRight].forEach(block => {
            if (!block || block.type === BlockType.sky) {
                return;
            }
            const blockLeft = block.x;
            const blockTop = block.y + 2;
            const blockBottom = block.y + settings.blockHeight - 2;
            const playerRight = playerX + (playerWidth / 2);
            const playerTop = playerY - (playerHeight / 2);
            const playerBottom = playerY + (playerHeight / 2);

            if (playerRight > blockLeft && playerTop < blockBottom && playerBottom > blockTop) {
                collision = true;
            }
        })
        return collision;
    }

    isTopCollision(playerX: number, playerY: number, playerWidth: number, playerHeight: number) {
        const blocks = this.getBlocksAroundPosition(playerX, playerY);
        let collision = false;
        [blocks.topLeft, blocks.top, blocks.topRight].forEach(block => {
            if (!block || block.type === BlockType.sky) {
                return;
            }
            const blockLeft = block.x;
            const blockRight = block.x + settings.blockWidth;
            const blockBottom = block.y + settings.blockHeight;
            const playerLeft = playerX - (playerWidth / 2);
            const playerRight = playerX + (playerWidth / 2);
            const playerTop = playerY - (playerHeight / 2);

            if (playerTop < blockBottom && playerLeft < blockRight && playerRight > blockLeft) {
                collision = true;
            }
        })
        return collision;
    }

    isBottomCollision(playerX: number, playerY: number, playerWidth: number, playerHeight: number) {
        const blocks = this.getBlocksAroundPosition(playerX, playerY);
        let collision = false;
        [blocks.bottomLeft, blocks.bottom, blocks.bottomRight].forEach(block => {
            if (!block || block.type === BlockType.sky) {
                return;
            }
            const blockLeft = block.x;
            const blockRight = block.x + settings.blockWidth;
            const blockTop = block.y;
            const playerLeft = playerX - (playerWidth / 2);
            const playerRight = playerX + (playerWidth / 2);
            const playerBottom = playerY + (playerHeight / 2);

            if (playerBottom > blockTop && playerLeft < blockRight && playerRight > blockLeft) {
                collision = true;
            }
        })
        return collision;
    }
}