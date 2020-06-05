// формирование блоков
function composer(tag, id, clas, content) {
  let renderComposerString='';
  let identif='';
  if (id!='') identif+=`id=${id} `;
  if (clas!='') identif+=`class=${clas}`;
  renderComposerString+=`<${tag} ${identif}>${content}</${tag}>`
  return renderComposerString;
}


function renderGameField(name, myBG, enemyBG) {
  let renderGameField='';
  // строка для шапки
  let helloString= `Привет, ${name}! Ты попал в битву на Балтийском море, твоя задача вывести из строя все вражеские корабли. Для этого необходимо запрашивать удары по координатам врага. Удачи! `
  // рендер шапки
  renderGameField+=composer('div', 'helloBlockID', 'helloBlock', helloString);
  // названий игровых зон
  renderGameField+=composer('div', '', 'battleGroundName', 'Твоя зона');
  renderGameField+=composer('div', '', 'battleGroundName', 'Зона врага');
  // вставка игровых полей
  renderGameField+=myBG;
  renderGameField+=enemyBG;
  renderGameField+=renderGameStat();
  renderGameField+=renderDebagPanel();
  // оборачиваем все в блок
  renderGameField=composer('div', 'gameFieldID', 'gameField', renderGameField);
  return renderGameField;
}

function renderDebagPanel() {
  let debagString='';
  debagString+=composer('p', 'debagCap', 'debagCaptoin', 'Контроль действий:');
  debagString+=composer('textarea', 'debagArea', 'debagArea', 'Начало игры!');
  debagString=composer('div', '', '', debagString);
  return debagString;
}

function renderGameStat() {
  let fourDeck=composer('p', '', 'statOptions', 'четырёхпалубныe');
  let threeDeck=composer('p', '', 'statOptions', 'трёхпалубныe');
  let twoDeck=composer('p', '', 'statOptions', 'двухпалубныe');
  let oneDeck=composer('P', '', 'statOptions', 'однапалубныe');
  let dash=composer('p', '', 'statOptions', '-');
  let fourDeckStat=composer('p', 'deckStat-4', 'statOptions', '1');
  let threeDeckStat=composer('p', 'deckStat-3', 'statOptions', '2');
  let twoDeckStat=composer('p', 'deckStat-2', 'statOptions', '3');
  let oneDeckStat=composer('p', 'deckStat-1', 'statOptions', '4');
  let statText='Действующие вражеские корабли:'
  let stringGameStat='';
  stringGameStat+=composer('p', '', 'statOptionsText', statText);
  stringGameStat+=fourDeck+dash+fourDeckStat+threeDeck+dash+threeDeckStat+twoDeck+dash+twoDeckStat+oneDeck+dash+oneDeckStat;
  stringGameStat=composer('div', 'enemyState', 'enemyStat', stringGameStat);
  return stringGameStat;
}
