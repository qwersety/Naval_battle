//класс для формирования ячеек, расскрашивание по классам, в соотвествии с их
// данными из массива sea. В начале думал действовать по data-*, но передумал
// заполнения можно просто убрать но пусть сотаются, через f12 можно просмотреть даные по ячейке
class BattleGround {
  constructor (sea){
    this.sea=sea
    this.coord=['А','Б','В','Г','Д','Е','Ж','З','И','К'];
  }
  //заполнения ячеек игровой зоны компьютера все красим в обычную ячейку, передаем айдишники от 0 до 99
  // выставляем координатные маркеры ()буквы и цифры) вокруг игрового поля
  get renderEnemyCells(){
    let cellString='<div class="coord"></div>';
    for (let i=0; i<=9; i++){
      cellString+=`<div class="coord">${i}</div>`
    }
    cellString+='<div class="coord"></div>';
    for (let i=0; i<=9; i++){
      cellString+=`<div class="coord">${this.coord[i]}</div>`;
      for (let j=0; j<=9; j++){
        let battleCell=this.sea[i*10+j];
        cellString+=`<div class="cell startCell" id="enemyCell-${i*10+j}" data-status="${battleCell}"> </div>`;
      }
      cellString+=`<div class="coord">${this.coord[i]}</div>`;
    }
    cellString+='<div class="coord"></div>';
    for (let i=0; i<=9; i++){
      cellString+=`<div class="coord">${i}</div>`
    }
    return cellString;
  }
  //заполнения ячеек игровой зоны игрока, корабли красим в зеленый цвет (класс startShipCell)
  get renderMyCells(){
    let cellString='<div class="coord"></div>';
    for (let i=0; i<=9; i++){
      cellString+=`<div class="coord">${i}</div>`
    }
    cellString+='<div class="coord"></div>';
    for (let i=0; i<=9; i++){
      cellString+=`<div class="coord">${this.coord[i]}</div>`;
      for (let j=0; j<=9; j++){
        let battleCell=this.sea[i*10+j];
        if (battleCell % 2 == 1) cellString+=`<div class="cell startShipCell" id="myCell-${i*10+j}" data-status="${battleCell}"> </div>`;
          else cellString+=`<div class="cell startCell" id="myCell-${i*10+j}" data-status="${battleCell}"> </div>`;
      }
      cellString+=`<div class="coord">${this.coord[i]}</div>`;
    }
    cellString+='<div class="coord"></div>';
    for (let i=0; i<=9; i++){
      cellString+=`<div class="coord">${i}</div>`
    }
    return cellString;
  }

  // оборачиваем данные в блок игровой зоны компа
  renderEnemyBG(){
    let battleGroundString='<div id= "enemyBG" class="battleGroundBox">';
    battleGroundString+=this.renderEnemyCells;
    battleGroundString+="</div>"
  return battleGroundString;
  }

  // оборачиваем данные в блок игровой зоны компа
  renderMyBG(){
    let battleGroundString='<div id= "myBG" class="battleGroundBox" >';
    battleGroundString+=this.renderMyCells;
    battleGroundString+="</div>"
  return battleGroundString;
  }
}
