document.getElementById('startClick').addEventListener("click", start);

function start(){
  let form = document.getElementById('startForm');
  let userName= form.userName.value;
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
  if (corrector==1) form.onsubmit = newGame(userName);
}

function newGame(userName) {
  document.getElementById('startPanel').remove();
  myShips=[
    [11,13,15,17,21,23,25,31,33,41],
    [1,1,1,1,2,2,2,3,3,4]
  ];
  enemyShips=[
    [11,13,15,17,21,23,25,31,33,41],
    [1,1,1,1,2,2,2,3,3,4]
  ];
  let mySea= accommodation();
  let myBattleGround = new BattleGround(mySea);
  let myBG = myBattleGround.renderMyBG();

  let enemySea= accommodation();
  let enemyBattleGround = new BattleGround(enemySea);
  let enemyBG = enemyBattleGround.renderEnemyBG();
  document.body.innerHTML+=renderGameField(userName, myBG, enemyBG, enemyShips);
  document.getElementById("myBG").style.pointerEvents = "none";
  let shipID;
  document.getElementById('enemyBG').onclick= function(event) {
    shipID=shot(enemySea, event.target.id.slice(10), enemyShips);

  }

}

function shot(enemySea, i, enemyShips) {

  if (enemySea[i]=='') {
    document.getElementById(`enemyCell-${i}`).classList.remove("startCell");
    document.getElementById(`enemyCell-${i}`).classList.add("shotEmptyCell");
    document.getElementById(`enemyCell-${i}`).style.pointerEvents = "none";
  } else {
    if (enemySea[i] % 2 == 1) {
        document.getElementById(`enemyCell-${i}`).classList.remove("startCell");
        document.getElementById(`enemyCell-${i}`).classList.add("shotShipCell");
        document.getElementById(`enemyCell-${i}`).style.pointerEvents = "none";
    }
    else {
      document.getElementById(`enemyCell-${i}`).classList.remove("startCell");
      document.getElementById(`enemyCell-${i}`).classList.add("shotEmptyCell");
      document.getElementById(`enemyCell-${i}`).style.pointerEvents = "none";

    }
  }
  let shipID;
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
    for (var m = 0; m < 100; m++) {
      if (enemySea[m]==enemyShips[0][shipID]){
        document.getElementById(`enemyCell-${m}`).classList.remove("shotShipCell");
        document.getElementById(`enemyCell-${m}`).classList.remove("startCell");
        document.getElementById(`enemyCell-${m}`).classList.add("deadShipCell");
        document.getElementById(`enemyCell-${m}`).style.pointerEvents = "none";
      }
      if (enemySea[m]==(enemyShips[0][shipID]+1)){
        document.getElementById(`enemyCell-${m}`).classList.remove("startCell");
        document.getElementById(`enemyCell-${m}`).classList.add("shotEmptyCell");
        document.getElementById(`enemyCell-${m}`).style.pointerEvents = "none";
      }
      targetNear=enemySea[m].length/2;
      for (var x = 0; x < targetNear; x++) {
        if (enemySea[m].substring(x*2,x*2+2)==(enemyShips[0][shipID]+1)){
          document.getElementById(`enemyCell-${m}`).classList.remove("startCell");
          document.getElementById(`enemyCell-${m}`).classList.add("shotEmptyCell");
          document.getElementById(`enemyCell-${m}`).style.pointerEvents = "none";
        }
      }
    }

  }
  return shipID;
}
