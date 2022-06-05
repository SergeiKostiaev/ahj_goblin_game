import goblin from '../img/goblin.png';
import GamePlay from './gameplay';
import cursors from './cursors';

export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.timerId = null;
  }

  init() {
    this.gamePlay.drawUi();
    this.startRandom();

    this.gamePlay.cells.forEach((cell) => {
      cell.addEventListener('mousedown', (event) => {
        event.preventDefault();
        const imgInCell = cell.querySelector('img');

        if (imgInCell) {
          this.gamePlay.setHitNumber(Number.parseInt(this.gamePlay.getHitNumber(), 10) + 1);
          this.gamePlay.setCursor(cursors.hammer);
          imgInCell.remove();
          setTimeout(() => this.gamePlay.setCursor(cursors.auto), 200);
        }
      });
    });
  }

  startRandom() {
    const imgEl = document.createElement('img');
    imgEl.src = goblin;
    let randomIndex;

    this.timerId = setInterval(() => {
      for (const cell of this.gamePlay.cells) {
        const imgCell = cell.querySelector('img');
        if (imgCell) {
          imgCell.remove();
          this.gamePlay.setMissNumber(Number.parseInt(this.gamePlay.getMissNumber(), 10) + 1);
        }
      }

      if (Number.parseInt(this.gamePlay.getMissNumber(), 10) === 5) {
        this.gameRestart();
        return;
      }

      const randomNumber = GameController.getRandomInt(0, (this.gamePlay.cells.length - 1));

      if (randomNumber === randomIndex) {
        if (randomNumber === this.gamePlay.cells.length - 1) {
          randomIndex -= 1;
        } else {
          randomIndex += 1;
        }
      } else {
        randomIndex = randomNumber;
      }

      this.gamePlay.cells[randomIndex].append(imgEl);
    }, 1000);
  }

  gameRestart() {
    this.gamePlay.setMissNumber(0);
    this.gamePlay.setHitNumber(0);
    this.gamePlay.deselectAll();
    clearInterval(this.timerId);
    GamePlay.showMessage('Игра окончена!');
    this.startRandom();
  }

  static getRandomInt(min, max) {
    const min0 = Math.ceil(min);
    const max0 = Math.floor(max);
    return Math.floor(Math.random() * (max0 - min0) + min0);
  }
}
