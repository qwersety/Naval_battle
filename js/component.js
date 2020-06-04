class BattleGround {
  constructor (sea){
    this.sea=sea
    this.coord=['А','Б','В','Г','Д','Е','Ж','З','И','К'];
  }

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

  renderEnemyBG(){
    let battleGroundString='<div id= "enemyBG" class="battleGroundBox">';
    battleGroundString+=this.renderEnemyCells;
    battleGroundString+="</div>"
  return battleGroundString;
  }

  renderMyBG(){
    let battleGroundString='<div id= "myBG" class="battleGroundBox" >';
    battleGroundString+=this.renderMyCells;
    battleGroundString+="</div>"
  return battleGroundString;
  }
}
