// слушатель нажатия кнопки начало
document.getElementById('startClick').addEventListener("click", start);

// основная функция, запускает работу функций построения игрового поля
function start(){
  // различные действия (проверка корректности, вывод ошибки, взятие данных) для получения имени игрока
  let form = document.getElementById('startForm');
  let userName = form.userName.value;
  let corrector=1; // можно было бы взять булеан значения, но я почему-то тогда захотел так
  let bans=["","<",">","{","}","[","]","`","/","\\","!",".",",","#","~","&","$",":","*","\'","\"","@","^","%"," "," ","  "];
  if (userName=="") corrector=0;
  for (let char of userName){
    for (let i=0;i<bans.length;i++){
      if (char==bans[i]) {
        corrector=0;
        alert("Ошибка ввода, повторите!");
        break;

      }

    }
    if (corrector==0) break;
  }
  // если коректор прошел все испытания, начинаем новую игру, добаляем на поле объекты
  if (corrector==1) {
    form.onsubmit = newGame(userName);
    // удаление стартового окна
    document.getElementById('startPanel').remove();
  }
}

// хоть функция и называется новая игра, в ней по сути сосредоточены все действия по построению и правилам игры
function newGame(userName) {
  // таких массивов 2, отслеживают живые корабли компа и игрока
  let myShipsCount=10;
  // таких массивов 2, несут в себе идентификаторы каждого корабля, отслеживаютт жизни кораблей компа и игрока
  let myShips=[
    [11,13,15,17,21,23,25,31,33,41],
    [1,1,1,1,2,2,2,3,3,4]
  ];
  let enemyShipsCount=10;
  let enemyShips=[
    [11,13,15,17,21,23,25,31,33,41],
    [1,1,1,1,2,2,2,3,3,4]
  ];
  // флаг, отлеживает может ли компьютер начать функцию своего хода
  let moveFlag=false;

  // 6 следующих строк. строятся пеменные с боевыми полями на основе массива данных accommodation
  let mySea= accommodation();
  let myBattleGround = new BattleGround(mySea);
  let myBG = myBattleGround.renderMyBG();

  let enemySea= accommodation();
  let enemyBattleGround = new BattleGround(enemySea);
  let enemyBG = enemyBattleGround.renderEnemyBG();

  //отправка всех данных на построение готового игрового поля
  document.body.innerHTML+=renderGameField(userName, myBG, enemyBG, enemyShips);
  // блокировка игрового поля игрока
  document.getElementById("myBG").style.pointerEvents = "none";
  // обработка хода игрока
  let shipEnemyID='';
  document.getElementById('enemyBG').onclick= function(event) {
    shipEnemyID=myShot(enemySea, event.target.id.slice(10), enemyShips, moveFlag);
    if (enemyShips[1][shipEnemyID.shipID]==0) {
      document.getElementById(`deckStat-${Math.trunc(enemyShips[0][shipEnemyID.shipID]/10)}`).textContent--;
      enemyShipsCount--;
      console.log(enemyShipsCount);
    }
    if (enemyShipsCount<=0) {
      alert('Вы выиграли! Начать новыую игру.');
      loseGame(userName);
    }
    // обработка хода компа, он всегда пходит после игрока (не начиает игру первый, хотя можно просто поменять флаг хода компа, можно сделать его рандомным)
    if (shipEnemyID.moveFlag==true){
      let shipMyID='';
      myShipsCount= enemyShot(mySea, myShips, myShipsCount);

    }
    if (myShipsCount<=0) {
      setTimeout(() => alert('Вы проиграли! Начать новыую игру.'), 1);
      setTimeout(() => loseGame(userName), 1);
    }
  }
}

// функция стирания игрового поля
function loseGame(userName) {
  document.body.innerHTML='';
  newGame(userName);
}

// функция хода компьютера
function enemyShot(mySea, myShips, myShipsCount) {
  // массив дял определения буквенных координат
  let liters=['А','Б','В','Г','Д','Е','Ж','З','И','К'];
  // переменная для проверки ячейки на занятость(если уже бил туда, генерируем новую)
  let attack=false;
  let enemyAttack='';
  //собственно, сам цикл подбора валидной точки удара, проверяюся параметры цели, ставится мисс пустой или раненный статус(класс)
  while (attack==false) {
    enemyAttack=randomInteger(0,99);
    if (document.getElementById(`myCell-${enemyAttack}`).classList.contains("startCell")==true ||
    document.getElementById(`myCell-${enemyAttack}`).classList.contains("startShipCell")==true) {
      let shipID='';
      let liter=liters[Math.trunc(enemyAttack/10)];
      let number=enemyAttack%10;
      debagText(`Враг атакует по точке ${liter}${number}.`);
      if (mySea[enemyAttack]=='') {
        document.getElementById(`myCell-${enemyAttack}`).classList.remove("startCell");
        document.getElementById(`myCell-${enemyAttack}`).classList.add("shotEmptyCell");
        attack=true;
      } else {
        if (mySea[enemyAttack] % 2 == 1) {
          debagText(`Враг подбил Ваш корабль!`)
          document.getElementById(`myCell-${enemyAttack}`).classList.remove("startCell");
          document.getElementById(`myCell-${enemyAttack}`).classList.add("shotShipCell");
        }
        else {
          document.getElementById(`myCell-${enemyAttack}`).classList.remove("startCell");
          document.getElementById(`myCell-${enemyAttack}`).classList.add("shotEmptyCell");
          attack=true;
        }
        // проверяем на задетость корабля, если да, меняем массив жизней кораблей
        if (mySea[enemyAttack] % 2 == 1) {
          for (let j = 0; j < 10; j++) {
            if (mySea[enemyAttack]==myShips[0][j]){
              shipID=j;
              break;
            }
          }
          myShips[1][shipID]--;
        }
        // проверка корабля на жизни, если 0, убиваем корабль, выставляем вокуг корабля поля
        if  (myShips[1][shipID]==0){
          debagText(`Враг уничтожил Ваш корабль!`);
          myShipsCount--;
          for (var m = 0; m < 100; m++) {
            if (mySea[m]==myShips[0][shipID]){
              document.getElementById(`myCell-${m}`).classList.remove("shotShipCell");
              document.getElementById(`myCell-${m}`).classList.remove("startCell");
              document.getElementById(`myCell-${m}`).classList.add("deadShipCell");
            }
            if (mySea[m]==(myShips[0][shipID]+1)){
              document.getElementById(`myCell-${m}`).classList.remove("startCell");
              document.getElementById(`myCell-${m}`).classList.add("shotEmptyCell");
            }
            targetNear=mySea[m].length/2;
            for (var x = 0; x < targetNear; x++) {
              if (mySea[m].substring(x*2,x*2+2)==(myShips[0][shipID]+1)){
                document.getElementById(`myCell-${m}`).classList.remove("startCell");
                document.getElementById(`myCell-${m}`).classList.add("shotEmptyCell");
              }
            }
          }
        }
      }
    }
  }
  return myShipsCount;
}
//бот совсем без "мозгов", обработка даных идет только на проверка стрелянных точек.
//нужно добавить обработчик попадания, при котором следующий удар должен быдет нанестись рядом с попаданием



// функция обработки удара игрока, очень похожа на ход компа, но без автоподбора точки обстрела, надо бы много собрать в общие функции
function myShot(enemySea, i, enemyShips, moveFlag) {
  let shipID;
  let liters=['А','Б','В','Г','Д','Е','Ж','З','И','К'];
  if (document.getElementById(`enemyCell-${i}`).classList.contains("startCell")==true){
    let liter=liters[Math.trunc(i/10)];
    let number=i%10;
    debagText(`Атака по точке ${liter}${number}.`);
    if (enemySea[i]=='') {
      document.getElementById(`enemyCell-${i}`).classList.remove("startCell");
      document.getElementById(`enemyCell-${i}`).classList.add("shotEmptyCell");
      moveFlag=true;
    } else {
      if (enemySea[i] % 2 == 1) {
        debagText(`Корабль врага подбит!`)
        document.getElementById(`enemyCell-${i}`).classList.remove("startCell");
        document.getElementById(`enemyCell-${i}`).classList.add("shotShipCell");
        moveFlag=false;
      }
      else {
        document.getElementById(`enemyCell-${i}`).classList.remove("startCell");
        document.getElementById(`enemyCell-${i}`).classList.add("shotEmptyCell");
        moveFlag=true;
      }
    }

    if (enemySea[i] % 2 == 1) {
      for (let j = 0; j < 10; j++) {
        if (enemySea[i]==enemyShips[0][j]){
          shipID=j;
          break;
        }
      }
      enemyShips[1][shipID]--;
    }

    if  (enemyShips[1][shipID]==0){
      debagText(`Корабль врага уничтожен!`);
      for (var m = 0; m < 100; m++) {
        if (enemySea[m]==enemyShips[0][shipID]){
          document.getElementById(`enemyCell-${m}`).classList.remove("shotShipCell");
          document.getElementById(`enemyCell-${m}`).classList.remove("startCell");
          document.getElementById(`enemyCell-${m}`).classList.add("deadShipCell");
        }
        if (enemySea[m]==(enemyShips[0][shipID]+1)){
          document.getElementById(`enemyCell-${m}`).classList.remove("startCell");
          document.getElementById(`enemyCell-${m}`).classList.add("shotEmptyCell");
        }
        targetNear=enemySea[m].length/2;
        for (var x = 0; x < targetNear; x++) {
          if (enemySea[m].substring(x*2,x*2+2)==(enemyShips[0][shipID]+1)){
            document.getElementById(`enemyCell-${m}`).classList.remove("startCell");
            document.getElementById(`enemyCell-${m}`).classList.add("shotEmptyCell");
          }
        }
      }

    }
  } else {
    debagText(`Зона уже атакована!`);
  }
  // особеность - возврат флага, для разрешения хода компу
  return {shipID:shipID,
          moveFlag:moveFlag};
}

// функция собирает и приписывает в начало textarea информации боя.
function debagText(string) {
  let bebagString=`${string}\n${document.getElementById('debagArea').value}`;
  document.getElementById('debagArea').value=bebagString;
}
