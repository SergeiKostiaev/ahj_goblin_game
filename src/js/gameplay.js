/* eslint-disable no-alert */
export default class GamePlay {
  constructor(boardSize = 4) {
    this.boardSize = boardSize;
    this.container = null;
    this.boardEl = null;
    this.cells = [];
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Контейнер не является элементом "HTMLElement"');
    }
    this.container = container;
  }

  drawUi() {
    this.checkBinding();

    this.container.innerHTML = `
      <div class="board-container">
        <div class="controls">
          <div class="counter hit-counter">Попаданий:
            <div class="number hit-number">0</div>
          </div>
          <div class="counter miss-counter">Промахов:
            <div class="number miss-number">0</div>
          </div>
        </div>
        <div data-id="board" class="board"></div>
      </div>
    `;
    this.container.style.userSelect = 'none';
    this.boardEl = this.container.querySelector('[data-id=board]');
    this.boardEl.setAttribute('style', `grid-template-columns: repeat(${this.boardSize}, 1fr)`);

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell', 'map-tile');
      this.boardEl.append(cellEl);
    }

    this.cells = Array.from(this.boardEl.children);
    this.hitEl = document.querySelector('.hit-number');
    this.missEl = document.querySelector('.miss-number');
  }

  getHitNumber() {
    return this.hitEl.innerText;
  }

  setHitNumber(number) {
    this.hitEl.innerText = number;
  }

  getMissNumber() {
    return this.missEl.innerText;
  }

  setMissNumber(number) {
    this.missEl.innerHTML = number;
  }

  static showMessage(message) {
    alert(message);
  }

  deselectAll() {
    for (const cell of this.cells) {
      cell.innerHTML = '';
    }
  }

  setCursor(cursor) {
    this.boardEl.style.cursor = cursor;
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('Игровой процесс не привязан к DOM');
    }
  }
}
