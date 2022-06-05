import GamePlay from '../gameplay';

test('Должна выбросить исключение при container равным  null', () => {
  const expected = 'Игровой процесс не привязан к DOM';
  const gamePlay = new GamePlay(4);
  const received = () => gamePlay.checkBinding();
  expect(received).toThrow(expected);
});
