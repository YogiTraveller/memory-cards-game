
// Create cards varible & create match cards to these cards,
// The name of the icon should match to Font Awsome icon name
let cards = ["bell", "camera", "car", "bolt", "heart", "star", "rocket", "usd"];
let cardsWithMatch = [];
var moves = 0;
let openCards = [];
let lastTwo = [];

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

// shuffle all cards
shuffle(cardsWithMatch);

// Create HTML for cardsWithMatch

var deck = $('.deck');

for (i = 0; i < cardsWithMatch.length; i++) {
  var card = $('<li class="card ' + cardsWithMatch[i] + '" ></div>');
  var icon = $('<i class="fa fa-' + cardsWithMatch[i] + '" aria-hidden="true"></i>')
  deck.append(card);
  card.append(icon);
}

// Add clicked card to openCards

let cardsCreated = document.getElementsByTagName('li');


$( ".deck" ).on( "click", "li", onClick);

function onClick(e) {
  countMoves();
  pushToOpen(e);
  console.log(openCards);


  if (openCards.length % 2 == 0 && openCards.length !== 0) {
    if (compareCards(e) !== true) {

      removeFromOpen();
      setTimeout(function() {addNotMatchClass();}, 200);
      setTimeout(function() {removeOpenClass();}, 1000);

    } else {
      addMatchClass();
      removeOpenClass();
      removeListener(e);

    }

  } else {

  }

  console.log(moves)
}

function pushToOpen(e) {
  openCards.push(e.target.className);
  e.target.className += " open";
}

function removeFromOpen() {
  openCards.splice(-2, 2);
}


function removeOpenClass() {
  var d = $('.open');
  d.removeClass('open');
  d.removeClass('not-match');
}

function removeListener(e) {
  $( ".deck" ).off( "click", ".match", onClick);
}


function compareCards(e) {
  lastTwo = openCards.splice(-2, 2);
  if (lastTwo[0] === lastTwo[1]) {
    return true;
  }
  return false;
}

function addMatchClass() {
  var d = $('.open');
  d.addClass('match');
}

function addNotMatchClass() {
  var d = $('.open');
  d.addClass('not-match');
}


function countMoves() {
    moves += 1;
    document.getElementById("clicks").innerHTML = moves;
};






/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
