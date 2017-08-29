/**
 * Created by MercedesLo on 2017-05-11.
 */

let numberOfRows = 4;
let numberOfCardsForEachPlayer = 10;
let numberOfPlayers = 4//getRandomIntInclusive(4,10);
let playersCowHeads = Array.from({length:numberOfPlayers},(v,i)=> 0);
let players = Array.from({length: numberOfPlayers}, (v, i) => new Array());
let cards = Array.from({length: 104}, (v, i) => v = {value: i+1, cowHeads: 0});
let rows =  Array.from({length: 4}, (v, i) => new Array(0));
let round = [];


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function giveCowHeads(num) {
  "use strict";
  if ((num % 11) == 0 && (num % 5) == 0) {
    return 7;
  } else if (num%5 == 0) {
    return 2;
  } else if (num%10 == 0) {
    return 3;
  } else if (num%11 == 0) {
    return 5;
  } else {
    return 1;
  }
}

//given cards, count total number of cowHeads
function countCowHeads(cards) {
  let num = 0;
  for(let card of cards) {
    num += card.cowHeads;
  }
  return num;
}


function findPlayerOfCard(card,orgArr){
  for (var i = 0; i < orgArr.length; i++) {
    if (orgArr[i].value == card.value) {return i;}
  }
  return -1;
}
//write some best strategies

function gameStart(){
  "use strict";

  //assignCowHeads
  cards.forEach((card) => {card.cowHeads = giveCowHeads(card.value)});

  //give cards to players
  for (var i=0; i< numberOfPlayers; i++) {
    for (var j= 0; j< numberOfCardsForEachPlayer; j++) {
      let len = cards.length;
      let rand = getRandomIntInclusive(0,len-1);
      players[i].push(cards[rand]);
      cards.splice(rand, 1);
    }
  }

  players.forEach((arr) => arr.sort(function(a, b) { return a.value - b.value; }));

  //put one card to each row
  for (var row = 0; row < numberOfRows; row++) {
    //reuse!!
    let len = cards.length;
    let rand = getRandomIntInclusive(0,len-1);
    rows[row][0]  = cards[rand];
    console.log(cards[rand]);
    cards.splice(rand, 1);

  }

  //debug
  console.log("number of players:", numberOfPlayers, players, "cards left", cards, "rows", rows,"players' cards", players);

  //TODO: select row with less cowHeads //
  //TODO: timer to select a random row
  //TODO: let player select a row if smallest

}

function playARound() {

  //for each player, select a random card from their hand of cards,
  for(var j= 0; j < numberOfPlayers; j++) {
    let len = players[j].length;
    let rand = getRandomIntInclusive(0,len-1);
    round[j] = players[j][rand];
    players[j].splice(rand, 1);
  }

  let order = round.slice();  //dont use order = round because referring to same address


  async function findOrderOfRound() {
    console.log("r",round,"o",order);
    order.sort((a,b) => {return a.value - b.value});
    for (let card of order) {
      await putCard(findPlayerOfCard(card,round) ,card)
    };
  }

  findOrderOfRound();


  //checkCard, not cards because it would be hard to track who used the card
  function putCard(player,card) {
    //arr.sort(function(a, b) { return a - b; });

    let smallerThanAllRows = false;
    let rowToPut = 0;
    //get all last card of each row out and get smallest difference
    let diffArray = [];

    for (let row of rows) {
      //get last card of every row
      diffArray.push(card.value - row.slice(-1)[0].value);
    }

    if (diffArray.filter((a,b) => a>0).length == 0) smallerThanAllRows = true;

    if (smallerThanAllRows) {

      let cowHeadsOfRows = [];
      for (let row of rows) {
        cowHeadsOfRows.push(countCowHeads(row));
      }
      rowToPut = cowHeadsOfRows.indexOf(Math.min(...cowHeadsOfRows));
      playersCowHeads[player] += countCowHeads(rows[rowToPut]);
      rows[rowToPut] = [];

    } else {

      diffArray = diffArray.map((a) => a < 0 ? 104 : a);
      rowToPut = diffArray.indexOf(Math.min(...diffArray));

      if (rows[rowToPut].length == 5) {
        playersCowHeads[player] += countCowHeads(rows[rowToPut]);
        rows[rowToPut] = [];
      }
      
    }
    rows[rowToPut].push(card);

  }


}





