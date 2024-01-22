import {Game} from "./logic/game";
import {settings} from "./settings";

class DiggerGame extends HTMLElement {
    game: Game | undefined;
    app: any;
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.render();
    }

    connectedCallback() {
        this.game = new Game(this.shadowRoot!.querySelector('#wrapper')!);

        window.addEventListener('keydown', e => {
            if (this.game && (e.key === 'p')) {
                this.game.paused = !this.game.paused;
                this.game.update();
                this.shadowRoot!.querySelector('#state')!.innerHTML = this.game?.paused ? 'Paused' : 'Playing';
            }
        });

        this.game.update();
    }

    render() {
        this.shadowRoot!.innerHTML = `
            <div id="wrapper"></div>

            <style>
                #wrapper {
                display: flex;
                overflow: hidden;
                width: ${settings.viewWidth}px;
                height: ${settings.viewHeight}px;
                position: relative;
                background: skyblue;
                transform: rotate3d(0, 0, 0, 0);
                }
            </style>
        `;
    }
}
customElements.define('digger-game', DiggerGame);