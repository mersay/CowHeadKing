/**
 * Created by MercedesLo on 2017-05-11.
 */

let numberOfRows = 4;
let numberOfCardsForEachPlayer = 10;
let numberOfPlayers = 4//getRandomIntInclusive(4,10);
let playersCowHeads = Array.from({length:numberOfPlayers});
let players = Array.from({length: numberOfPlayers}, (v, i) => new Array(numberOfCardsForEachPlayer));
let cards = Array.from({length: 104}, (v, i) => v = {value: i+1, cowHeads: 0});
let rows =  Array.from({length: 4}, (v, i) => new Array(0));
let collectedCards = Array.from({length: numberOfPlayers}, (v,i) => new Array(104));//explain why 104
let round = Array.from({length: numberOfPlayers});


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

//write some best strategies

function gameStart(){
  "use strict";

  //assignCowHeads
  cards.forEach((card) => {card.cowHeads = giveCowHeads(card.value)});

  console.log("before giving cards to players,cards is",cards, "row is ", rows);

  for (var i=0; i< numberOfPlayers; i++) {
    for (var j= 0; j< numberOfCardsForEachPlayer; j++) {
      let len = cards.length;
      let rand = getRandomIntInclusive(0,len-1);
      players[i][j] = cards[rand];
      cards.splice(rand, 1);
    }
  }

  console.log("after giving cards to players,cards is",cards, "row is ", rows);

  players.forEach((arr) => arr.sort(function(a, b) { return a - b; }));

  for (var row = 0; row < numberOfRows; row++) {
    //reuse!!
    let len = cards.length;
    let rand = getRandomIntInclusive(0,len-1);
    rows[row][0]  = cards[rand];
    cards.splice(rand, 1);

  }

  console.log("after giving cards to rows,cards is",cards, "row is ", rows);


  //debug
  console.log("number of players:", numberOfPlayers, players, "cards left", cards, "rows", rows);

  //TODO:select row with less cowHeads
  //TODO:timer to select a random row

  /*

  for (var i = 0; i < numberOfCardsForEachPlayer; i++) {
    //for each player, select a random card from their hand of cards,
    for(var j= 0; j < numberOfPlayers; j++) {
      let len = players[j].length;
      let rand = getRandomIntInclusive(0,len-1);
      round[j] = players[j][rand];
      players[j].splice(rand, 1);
    }
  } */

}

function getCowHeads(cards) {
  let num = 0;
  for(let card in cards) {
    num += card.cowHeads;
  }
  return num;
}

//checkCard, not cards because it would be hard to track who used the card
function putCard(player,card) {
  console.log("rows", rows, "Card", card);
  //arr.sort(function(a, b) { return a - b; });
  //get all last card of each row out and get smallest differnce

  let smallerThanAllRows = true;
  let rowToPut = 0;
  let leastCowHeads = getCowHeads(rows[0]);
  let leastCowHeadRow = 0;
  let len = rows[rowToPut].length;
  console.log(card.value, rows[rowToPut][len-1].value);
  let difference = card.value - rows[rowToPut][len-1].value;

  for(let row in rows) {
    let len = row.length;
    if (row[len-1] < card.value) smallerThanAllRows = false;
    console.log(row[len-1].value,card.value , row[len-1].value<card.value)
    if (leastCowHeads > getCowHeads(row)) {
      console.log("found least ch row",row.key,getCowHeads(row));
      leastCowHeads = getCowHeads(row);
      leastCowHeadRow = row.key;
    }
  }

  if (smallerThanAllRows) {
    console.log("smallerthanallrows");
    playersCowHeads[player] += getCowHeads(rows[leastCowHeadRow]);
    rows[leastCowHeadRow]= [];
  } else {
    for (let row in rows) {
      let len = row.length;
      if (card.value - row[len-1].value > difference) {
        rowToPut = row.key;
        difference = card.value - row[len-1].value;
      }
    }

    if (rows[rowToPut].length == 5) {
      playersCowHeads[player] += getCowHeads(rows[rowToPut]);
      rows[rowToPut] = [];
    }
  }

  rows[rowToPut].push(card);


}

