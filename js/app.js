
// Create cards varible & create match cards to these cards,
// The name of the icon should match to Font Awsome icon name
//
let cards = ["bell", "camera", "car", "bolt", "heart", "star", "rocket", "usd"];
let cardsWithMatch = [];
var moves = 0;
let openCards = [];
let cardsCreated = document.getElementsByTagName('li');
let deck = $('.deck');


// generate cardsWithMatch array
for (i = 0; i < cards.length; i++) {
  cardsWithMatch.push(cards[i]);
  cardsWithMatch.push(cards[i]);
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

shuffle(cardsWithMatch);
generateCards();
addListenerToAllCards();

/// create HTML for all cards from cardsWithMatch array
function generateCards() {
  for (var i = 0; i < cardsWithMatch.length; i++) {
    var card = $('<li class="card ' + cardsWithMatch[i] + '" ></div>');
    var icon = $('<i class="fa fa-' + cardsWithMatch[i] + '" aria-hidden="true"></i>')
    deck.append(card);
    card.append(icon);
  }
}


// addListenerToAllCards - observe for click on card
function addListenerToAllCards (){
  for (var i = 0; i < cardsCreated.length; i++) {
      cardsCreated[i].addEventListener('click', onClick, false);
  }
}
// remove Listener from open cards, to avoid double click on the same card
function removeListenerFromOpenCards (){
  let openCardsClass = document.getElementsByClassName('open');
  for (var i = 0; i < openCardsClass.length; i++) {
      openCardsClass[i].removeEventListener('click', onClick, false);
  }
}

// add listener back
function addListenerToOpenCards (){
  let openCardsClass = document.getElementsByClassName('open');
  for (var i = 0; i < openCardsClass.length; i++) {
      openCardsClass[i].addEventListener('click', onClick, false);
  }
}


// what happens when user clicks on card
function onClick(e) {

  countMoves();
  starRating();
  pushToOpen(e); /// push to OpenCards array
  addOpenClass(e);
  /// removeEventListener from open cards
  removeListenerFromOpenCards();


  /// check if two cards are open if yes compare and then do smthg
  if (openCards.length % 2 === 0 && openCards.length !== 0) {
    compareCards();
   }

  /// what happens if all cards match
  if (openCards.length === cardsWithMatch.length) {
      youAreTheWinner();
  }
}


// function to compare cards and do some action when they match and they dont
function compareCards() {
  var curretOpenCards = Array.from(document.getElementsByClassName('open'));
  lastTwo = openCards.slice(0,2);

  if (lastTwo[0] === lastTwo[1]) {
    console.log(true);
    addMatchClass();
    removeOpenClass();
  } else {
    console.log(false);
    removeFromOpen();
    curretOpenCards.forEach(addNotMatchClass);
    curretOpenCards.forEach(addListenerToOpenCards);
    curretOpenCards.forEach(removeNotMatchClass);
    curretOpenCards.forEach(removeOpenClass);
  }
}

// push to openCards array
function pushToOpen(e) {
  openCards.unshift(e.target.className);
}

// removes first two strings from openCards array
function removeFromOpen() {
  openCards.splice(0, 2);
}

// to flip card, open class is added in HTML
function addOpenClass(e) {
  e.target.className += ' open'
}

// to hide card open class is removed with setTimeout function to allow animation to finish
function removeOpenClass() {
  var d = $('.open');
  setTimeout(function() {d.removeClass('open')}, 900);
}

// when two cards match add class match
function addMatchClass() {
  var d = $('.open');
  d.addClass('match');
}

// when two cards do not match add clas not-match to HTML
function addNotMatchClass() {
  var d = $('.open');
    setTimeout(function() {d.addClass('not-match');}, 300);
}

// remove that not-match class with setTimeout
function removeNotMatchClass() {
  var d = $('.open');
    setTimeout(function() {d.removeClass('not-match');}, 901);
}

// clear all classes
function clearClasses() {
  var d = $('.card');
  d.removeClass('match open not-match');
}

// remove all cards
function removeCards() {
  var d = $('.card');
  d.remove();
}

// function for star ratings based on moves
function starRating(){
  if (moves === 24) {
    $('.stars i:nth-child(3)').replaceWith('<i class="fa fa-star-o" aria-hidden="true"></i>')
  } else if (moves === 48) {
    $('.stars i:nth-child(2)').replaceWith('<i class="fa fa-star-o" aria-hidden="true"></i>')
  } else {

  }
  let finalStarRating = document.getElementsByClassName('fa-star');
  document.getElementById("stars-final").innerHTML = finalStarRating.length;
}

// function to display star rating on Congratulations screen
function resetStarRating() {
  let stars = 3;
  let starsFull = document.getElementsByClassName('fa-star');

  for (let x = stars - starsFull.length; x < starsFull.length; x++){
    $('.stars i:nth-child(' + x +')').replaceWith('<i class="fa fa-star" aria-hidden="true"></i>')
  }
}

// display Congratulations
function youAreTheWinner() {
  var winnerPanel = document.getElementById('winner-panel');
  setTimeout(function() {winnerPanel.className += " open";}, 605);
}

// count moves and replace HTML
function countMoves() {
    moves += 1;
    document.getElementById("clicks").innerHTML = moves;
    document.getElementById("clicks-final").innerHTML = moves;
};



// all what is needed to reset game
let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetGame, false);


function resetGame() {
  moves = 0;
  openCards = [];
  lastTwo = [];

  document.getElementById("clicks").innerHTML = moves;

  clearClasses();
  shuffle(cardsWithMatch);
  removeCards();
  generateCards();
  addListenerToAllCards();
  resetStarRating();

  var winnerPanel = document.getElementById('winner-panel');
  winnerPanel.classList.remove('open')

}
