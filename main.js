"use strict";
$(document).ready(init);
var playersHand = [];
var playerScore = 0;
var dealersCard = [];
var dealerScore = 0;
var deltCard = []

function init(){
  initialDeal();
  $('#hit').on('click', playerHits);
  $('#hold').on('click', playerHolds);
  scoreTracker();
}




///////////////////////////////////
////Cards
//////////////////////////////////
var deck = {
  twoofhearts: 2,
  threeofhearts: 3,
  fourofhearts: 4,
  fiveofhearts: 5,
  sixofhearts: 6,
  sevenofhearts: 7,
  eightofhearts: 8,
  nineofhearts: 9,
  tenofhearts: 10,
  jackofhearts: 10,
  queenofhearts: 10,
  kingofhearts: 10,
  aceofhearts: 11,
  twoofspades: 2,
  threeofspades: 3,
  fourofspades: 4,
  fiveofspades: 5,
  sixofspades: 6,
  sevenofspades: 7,
  eightofspades: 8,
  nineofspades: 9,
  tenofspades: 10,
  jackofspades: 10,
  queenofspades: 10,
  kingofspades: 10,
  aceofspades: 11,
  twoofclubs: 2,
  threeofclubs: 3,
  fourofclubs: 4,
  fiveofclubs: 5,
  sixofclubs: 6,
  sevenofclubs: 7,
  eightofclubs: 8,
  nineofclubs: 9,
  tenofclubs: 10,
  jackofclubs: 10,
  queenofclubs: 10,
  kingofclubs: 10,
  aceofclubs: 11,
  twoofdiamonds: 2,
  threeofdiamonds: 3,
  fourofdiamonds: 4,
  fiveofdiamonds: 5,
  sixofdiamonds: 6,
  sevenofdiamonds: 7,
  eightofdiamonds: 8,
  nineofdiamonds: 9,
  tenofdiamonds: 10,
  jackofdiamonds: 10,
  queenofdiamonds: 10,
  kingofdiamonds: 10,
  aceofdiamonds: 11
}

var cards = Object.keys(deck);



  //////////////////////////////////  Used for initial deal. Send to player deck and add to player score.
  ////Shuffle...
  //////////////////////////////////

var pullCard = function() {
  console.log('pullcard started');

  var i = Math.floor((Math.random() * cards.length) );
  deltCard = cards[i] ;
  cards.splice(i,1);
  console.log('deltCard');
  return deltCard;

}

  ///////////////////////////////////  Display one card up one card down for player and dealer.
  ////initial deal
  //////////////////////////////////
function initialDeal(){
  console.log('initialDeal working')
  for(var i = 0 ; i < 2 ; i++ ) {
    pullCard(deltCard);
    playersHand.push(deltCard);
    playerScore += deck[deltCard];
    console.log("Players hand:", deltCard);
  }
  pullCard(deltCard)
  dealersCard.push(deltCard);
  dealerScore += deck[deltCard];
  console.log("dealers card", deltCard);
  console.log('initialDeal done');
};


//////////////////////////////////  Retrieve card and value, display card on board, add value to score
////player hand...
//////////////////////////////////

function playerHits() {
  console.log('button working');
  playersHand.push(deltCard);
  console.log(playersHand);
  playerScore += deck[deltCard];
  scoreTracker();

}

function scoreTracker() {
  $('.hit').text(playerScore);
  $('.hold').text(dealerScore);
  if(playerScore > 21){
    alert('you bust hahaha')
  }
}





///////////////////////////////////  Display window with final cards in play and final score
////have current score
//////////////////////////////////









///////////////////////////////////  Once player clicks done, function will display dealer card.
////Dealers moves
//////////////////////////////////
function playerHolds(){
  while(dealerScore < 18){
    pullCard();
    dealerScore += deck[deltCard];
    dealersCard.push(deltCard);
    scoreTracker();
  }if (dealerScore > playerScore && dealerScore < 22){
    scoreTracker();
    alert("hahahahaha dealer wins")
  }else{
    alert('whatever you win');
  }
}
