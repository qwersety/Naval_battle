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

  // оборачиваем все в блок
  renderGameField=composer('div', 'gameFieldID', 'gameField', renderGameField);
  return renderGameField;
}

function renderGameStat() {
  let fourDeck=composer('div', '', 'statOptions', 'четырёхпалубныe');
  let threeDeck=composer('div', '', 'statOptions', 'трёхпалубныe');
  let twoDeck=composer('div', '', 'statOptions', 'двухпалубныe');
  let oneDeck=composer('div', '', 'statOptions', 'однапалубныe');
  let dash=composer('div', '', 'statOptions', '-');
  let fourDeckStat=composer('div', 'fourDeckStat', 'statOptions', '1');
  let threeDeckStat=composer('div', 'threeDeckStat', 'statOptions', '2');
  let twoDeckStat=composer('div', 'twoDeckStat', 'statOptions', '3');
  let oneDeckStat=composer('div', 'oneDeckStat', 'statOptions', '4');
  let statText='Действующие вражеские корабли:'
  let stringGameStat='';
  stringGameStat+=composer('div', '', 'statOptionsText', statText);
  stringGameStat+=fourDeck+dash+fourDeckStat+threeDeck+dash+threeDeckStat+twoDeck+dash+twoDeckStat+oneDeck+dash+oneDeckStat;
  stringGameStat=composer('div', 'enemyState', 'enemyStat', stringGameStat);
  return stringGameStat;
}
