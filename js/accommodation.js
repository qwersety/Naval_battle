// функция формирования массива игрового поля с расставленными на нем боевыми кораблями
// создается массив из 100 чисел (аналог игрового поля 100 ячеек)
// каждая ячейка заполняется числом, где 0- пустое место, 1,3,5,7 - однопалубники 2,4,6,8- их оружение
// 21,23,25 - двупалубники, 22,24,26 - их окружение, 31,33 - трехпулубники, 32,34 их окружение
// 41 - четырехпалубник, 42 - его окружение
function accommodation() {
  let sea=[];
  for (let i=0; i<=99; i++){
      sea[i]="";
  }
  battleship(sea, 4, 1);
  battleship(sea, 3, 1);
  battleship(sea, 3, 2);
  battleship(sea, 2, 1);
  battleship(sea, 2, 2);
  battleship(sea, 2, 3);
  battleship(sea, 1, 1);
  battleship(sea, 1, 2);
  battleship(sea, 1, 3);
  battleship(sea, 1 ,4);
  return(sea);
}

//функция предложения расположения корабля
function shipPlase(sharacter) {
  // направление постройки катера, где 1-верх, 2-право, 3-низ, 4 -лево
  let directionSum=[0,-10,1,10,-1]
  let startPosition=randomInteger(0,99);
  let direction=randomInteger(1,4);
  /*console.log("direction 1 - "+direction);*/
  while (startPosition+directionSum[direction]*(sharacter-1)<0 || startPosition+directionSum[direction]*(sharacter-1)>99
  || (Math.trunc((startPosition+directionSum[direction]*(sharacter-1))/10)!=Math.trunc(startPosition/10))&&(direction==4) ||
  (Math.trunc((startPosition+directionSum[direction]*(sharacter-1))/10)!=Math.trunc(startPosition/10))&&(direction==2))
  {
    direction+=1;
    if (direction==5) direction=1;
  }
/*  console.log("direction 2 - "+direction);
  console.log("startPosition - "+startPosition);
  console.log("endPosition - "+(startPosition+directionSum[direction]*3));*/
  return{
        startPosition: startPosition,
        direction: direction,
        directionSum: directionSum
  };
}

  // выставление на поле 4 палубное судно и объявление зоны вокруг него
  function battleship(sea, sharacter, number) {
    for (var i = 0; i < 1000; i++) {
      /*console.log("vvod"+sharacter);*/
      let accept=0;
      let shipPlaseObj= new shipPlase(sharacter);
      let startP = shipPlaseObj.startPosition;
      let iterat= shipPlaseObj.directionSum[shipPlaseObj.direction];
      for (let i=0; i<sharacter; i++) {
        if (sea[startP+iterat*i]=="") {
          accept+=1;
          /*console.log(accept+"/"+sharacter);*/
        }
      }
      if (accept==sharacter) {
      /*  console.log("accept");
        console.log("-----");*/

        for (let i=0; i<sharacter; i++) {
          sea[startP+iterat*i]=sharacter*10+number*2-1;
          /*console.log(startP+iterat*i);*/
        }

        if ((((startP-iterat)%10)!=9)&&(shipPlaseObj.direction==2))
          sea[startP-iterat]+=sharacter*10+number*2;

        if ((((startP-iterat)%10)!=0)&&(shipPlaseObj.direction==4))
          sea[startP-iterat]+=sharacter*10+number*2;

        if ((((startP+iterat*sharacter)%10)!=9)&&(shipPlaseObj.direction==4))
          sea[startP+iterat*sharacter]+=sharacter*10+number*2;

        if ((((startP+iterat*sharacter)%10)!=0)&&(shipPlaseObj.direction==2))
          sea[startP+iterat*sharacter]+=sharacter*10+number*2;

        if ((shipPlaseObj.direction==3)||(shipPlaseObj.direction==1)){
          sea[startP+iterat*sharacter]+=sharacter*10+number*2;
          sea[startP-iterat]+=sharacter*10+number*2;
        }


        for (let i=-1; i<sharacter+1; i++) {
          if ((shipPlaseObj.direction==1|| shipPlaseObj.direction==3)&&(startP%10==9||startP%10==0)) {
            if ((shipPlaseObj.direction==1)&&(startP%10==0))
              sea[startP+iterat*i+1]+=sharacter*10+number*2;
            if ((shipPlaseObj.direction==3)&&(startP%10==0))
              sea[startP+iterat*i+1]+=sharacter*10+number*2;
            if ((shipPlaseObj.direction==1)&&(startP%10==9))
              sea[startP+iterat*i-1]+=sharacter*10+number*2;
            if ((shipPlaseObj.direction==3)&&(startP%10==9))
              sea[startP+iterat*i-1]+=sharacter*10+number*2;
          } else
          if (shipPlaseObj.direction==1|| shipPlaseObj.direction==3)
            {
              sea[startP+iterat*i+1]+=sharacter*10+number*2;
              sea[startP+iterat*i-1]+=sharacter*10+number*2;
            }
          if (shipPlaseObj.direction==2|| shipPlaseObj.direction==4)
          if (Math.trunc((startP+iterat*i)/10)==Math.trunc(startP/10)){
            sea[startP+iterat*i+10]+=sharacter*10+number*2;
            sea[startP+iterat*i-10]+=sharacter*10+number*2;
          }
        }
        break;
      } /*console.log("deny");*/
    }


  return(sea);
}

// случайное число от min до max
function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
