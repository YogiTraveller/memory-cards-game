
// Create cards varible & create match cards to these cards,
// The name of the icon should match to Font Awsome icon name
//
let cards = ["bell", "camera", "car", "bolt", "heart", "star", "rocket", "usd"];
let cardsWithMatch = [];
var moves = 0;
let openCards = [];
let matches = 0;
let cardsWithMatchQTY = cards.length;
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



/// create HTML for all cards from cardsWithMatch array
function generateCards() {
  for (var i = 0; i < cardsWithMatch.length; i++) {
    var card = $('<li class="card ' + cardsWithMatch[i] + '" ></div>');
    var icon = $('<i class="fa fa-' + cardsWithMatch[i] + '" aria-hidden="true"></i>')
    deck.append(card);
    card.append(icon);
  }
}

function initGame() {
  shuffle(cardsWithMatch);
  generateCards();
  addCardListener();
}

// what happens when user clicks on card
var addCardListener = function() {
  deck.find('.card:not(.match, .open)').on('click' , function() {
    var $this = $(this);
    var card = $this.html();
    openCards.push(card)
    $this.addClass('open');
    moves++;
    /// check if two cards are open if yes compare and then do smthg
    if (openCards.length > 1) {
      // function to compare cards and do some action when they match and they dont

        if (openCards[0] === openCards[1]) {
          console.log(true);
          deck.find('.open').addClass('match');
          setTimeout(function () { deck.find('.open').removeClass('open'); }, 500);

          openCards = [];
          matches++;
        } else {
          console.log(false);
          openCards = [];
          setTimeout(function () { deck.find('.open').removeClass('open'); }, 500);

        }
     }

    /// what happens if all cards match
    if (matches === cardsWithMatchQTY) {
        youAreTheWinner();
    }
  });
};

function youAreTheWinner() {
  var winnerPanel = document.getElementById('winner-panel');
  setTimeout(function() {winnerPanel.className += " open";}, 605);
}

function countMoves() {
    moves = moves / 2 ;
    $('#clicks').innerHTML = moves;
    $("#clicks-final").innerHTML = moves;
};
$("#timer").timer();
initGame();
