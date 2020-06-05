document.getElementById('startClick').addEventListener("click", start);

function start(){
/*  document.body.innerHTM=`
    <div id="startPanel" class="startPanelShadow">
      <div class="startPanel">
        <p class="startPanel__greeting" >Ты начинаешь увлекательное приключение в роли адмирала флотилии во время великого морского сражения в балтийском море.<br> Для начала боевых действий введи свое имя  и нажми «НАЧАТЬ»!</p>
        <form id="startForm" name="startForm" class="startPanel__form" method="post">
          <input id="userName" type="text" autofocus required placeholder="Введите имя" maxlength="15" title="От 1 до 15 символов!" required name="userName" class="startPanel__nameInput">
          <input id="startClick" type="submit" value="НАЧАТЬ!" class="startPanel__nameButton">
        </form>
      </div>
    </div>`;*/
  let form = document.getElementById('startForm');
  let userName = form.userName.value;
  let corrector=1;
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
  if (corrector==1) {
    form.onsubmit = newGame(userName);
    document.getElementById('startPanel').remove();
  }
}

function newGame(userName) {
  let myShipsCount=10;
  let myShips=[
    [11,13,15,17,21,23,25,31,33,41],
    [1,1,1,1,2,2,2,3,3,4]
  ];
  let enemyShipsCount=10;
  let enemyShips=[
    [11,13,15,17,21,23,25,31,33,41],
    [1,1,1,1,2,2,2,3,3,4]
  ];
  let moveFlag=false;
  let mySea= accommodation();
  let myBattleGround = new BattleGround(mySea);
  let myBG = myBattleGround.renderMyBG();

  let enemySea= accommodation();
  let enemyBattleGround = new BattleGround(enemySea);
  let enemyBG = enemyBattleGround.renderEnemyBG();
  document.body.innerHTML+=renderGameField(userName, myBG, enemyBG, enemyShips);
  document.getElementById("myBG").style.pointerEvents = "none";
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


function loseGame(userName) {
  document.body.innerHTML='';
  newGame(userName);
}

function enemyShot(mySea, myShips, myShipsCount) {

  let liters=['А','Б','В','Г','Д','Е','Ж','З','И','К'];
  let attack=false;
  let enemyAttack='';
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

        if (mySea[enemyAttack] % 2 == 1) {
          for (let j = 0; j < 10; j++) {
            if (mySea[enemyAttack]==myShips[0][j]){
              shipID=j;
              break;
            }
          }
          myShips[1][shipID]--;
        }

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




//функция обработки удара игрока
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
  return {shipID:shipID,
          moveFlag:moveFlag};
}

function debagText(string) {
  let bebagString=`${string}\n${document.getElementById('debagArea').value}`;
  document.getElementById('debagArea').value=bebagString;
}
