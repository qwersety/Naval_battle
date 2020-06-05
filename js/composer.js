// формирование блоков (тег, данные по id  и классу, и контент)
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
//генерируем структуру дебаг монитора
function renderDebagPanel() {
  let debagString='';
  // заголовок
  debagString+=composer('p', 'debagCap', 'debagCaptoin', 'Контроль действий:');
  // вставка самой арены и первого сообщения
  debagString+=composer('textarea', 'debagArea', 'debagArea', 'Начало игры!');
  // оборачиваем все в блок
  debagString=composer('div', '', '', debagString);
  return debagString;
}

// генерируем статистику вражеского флота
function renderGameStat() {
  // создаются строки длля названия корабля, дефисы и значения (стартовые, всегда одинаковы)
  let fourDeck=composer('p', '', 'statOptions', 'четырёхпалубныe');
  let threeDeck=composer('p', '', 'statOptions', 'трёхпалубныe');
  let twoDeck=composer('p', '', 'statOptions', 'двухпалубныe');
  let oneDeck=composer('P', '', 'statOptions', 'однапалубныe');
  let dash=composer('p', '', 'statOptions', '-');
  let fourDeckStat=composer('p', 'deckStat-4', 'statOptions', '1');
  let threeDeckStat=composer('p', 'deckStat-3', 'statOptions', '2');
  let twoDeckStat=composer('p', 'deckStat-2', 'statOptions', '3');
  let oneDeckStat=composer('p', 'deckStat-1', 'statOptions', '4');
  // шапка
  let statText='Действующие вражеские корабли:'
  let stringGameStat='';
  stringGameStat+=composer('p', '', 'statOptionsText', statText);
  // соединение в общую строку
  stringGameStat+=fourDeck+dash+fourDeckStat+threeDeck+dash+threeDeckStat+twoDeck+dash+twoDeckStat+oneDeck+dash+oneDeckStat;
  // оборачиваем все в блок
  stringGameStat=composer('div', 'enemyState', 'enemyStat', stringGameStat);
  return stringGameStat;
}
