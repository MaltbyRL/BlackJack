"use strict";
$(document).ready(init);
var playersHand = [];
var playersCards = [];
var playerScore = 0;
var dealersHand = [];
var dealersCards = [];
var dealerScore = 0;
var deltCard = []
var playerAces = 0;
var dealerAces = 0;
function init(){
  initialDeal();
  //$('#hit').getScript("cards/",function(){console.log("getScript working")})
  $('#hit').on('click', playerHits);
  $('#hold').on('click', playerHolds);
  $("#startOver").on('click', playAgain);
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
var deltCardimg = ""
var cardImg = ""


  //////////////////////////////////  Used for initial deal. Send to player deck and add to player score.
  ////Shuffle...
  //////////////////////////////////

var pullCard = function() {
  console.log('pullcard started');

  var i = Math.floor((Math.random() * cards.length) );
  deltCard = cards[i];
  //deltCardimg.attr('src', "'" + "cards/" + deltCard + ".png" + "'")
  deltCardimg = "'" + "/cards/" + deltCard + ".png" + "'"
  cardImg = "<img src= "+deltCardimg+" alt=" + deltCard + " >"
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
    playersCards.push(deltCardimg)
    playerScore += deck[deltCard];
    $('#playersHand').prepend(cardImg)
    console.log("Players hand:", deltCard);
    if(deck[deltCard] === 11){
        playerAces = playerAces + 1;
    }
  }
  pullCard(deltCard)
  dealersHand.push(deltCard);
  dealersCards.push("<img src="+deltCardimg+">")
  dealerScore += deck[deltCard];
  console.log("dealers card", deltCard);
  console.log('initialDeal done');
  $('#dealersHand').prepend(cardImg)
  if(deck[deltCard] === 11){
      dealerAces = dealerAces + 1
  }
};


//////////////////////////////////  Retrieve card and value, display card on board, add value to score
////player hand...
//////////////////////////////////

function playerHits() {
  console.log('button working');
  playersHand.push(deltCard);
  console.log(playersHand);
  playerScore += deck[deltCard];

  if (deck[deltCard] === 11){playerAces = playerAces + 1};

  playersCards.push("<img src="+deltCardimg+">");
  $('#playersHand').prepend(cardImg)
  scoreTracker();
}

function scoreTracker() {
  $('.hit').text("Hit");
  $('.hold').text("Hold");
  $(".playScore").text(playerScore);
  $(".dealScore").text(dealerScore);

  // $('#dealersHand').text(dealersCards);
  if(playerScore > 21 && playerAces > 0){
    playerScore = playerScore - 10;
    playerAces = playerAces - 1
  }else if(playerScore > 21){
    $("#winBox").text('You Bust AAAHhahahah... AAHahaha')

  }
}





///////////////////////////////////  Display window with final cards in play and final score
////playAgain
//////////////////////////////////
function playAgain(){
  playersHand = [];
  playersCards = [];
  playerScore = 0;
  dealersHand = [];
  dealersCards = [];
  dealerScore = 0;
  deltCard = []
  playerAces = 0;
  dealerAces = 0;
  cards = Object.keys(deck);
  $("#winBox").empty();
  $('#playersHand').empty();
  $('#dealersHand').empty();
  scoreTracker();
  initialDeal();
  scoreTracker();
}












///////////////////////////////////  Once player clicks done, function will display dealer card.
////Dealers moves
//////////////////////////////////
function playerHolds(){
  while(dealerScore < 18){
    pullCard();
    $('#dealersHand').prepend(cardImg)
    if(deck[deltCard] === 11){dealerAces = dealerAces + 1};
    dealerScore += deck[deltCard];
    dealersHand.push(deltCard);
    dealersCards.push(deltCardimg);
    scoreTracker();
  }if(dealerScore > 21 && dealerAces > 0){
    dealerScore = dealerScore - 10;
    dealerAces = dealerAces - 1
  }else if (dealerScore > playerScore && dealerScore < 22){
    scoreTracker();
    $("#winBox").text("hahahahaha dealer wins")
  }else{
    $("#winBox").text('whatever... you win');
  }
}
