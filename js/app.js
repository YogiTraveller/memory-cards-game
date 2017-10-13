
// Create cards varible & create match cards to these cards,
// The name of the icon should match to Font Awsome icon name
//
let cards = ["bell", "camera", "car", "bolt", "heart", "star", "rocket", "usd"];
let cardsWithMatch = [];

// generate cardsWithMatch array
for (i = 0; i < cards.length; i++) {
  cardsWithMatch.push(cards[i]);
  cardsWithMatch.push(cards[i]);
};

var moves = 0;
let openCards = [];
let matches = 0;
let cardsWithMatchQTY = cardsWithMatch.length;
let deck = $('.deck');




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
  $("#timer").timer();
}

// what happens when user clicks on card
var addCardListener = function() {
  deck.find('.card:not(.match, .open)').on('click' , function() {
    var $this = $(this);
    var card = $this.html();
    openCards.push(card)
    $this.addClass('open');
    starRating();
    /// check if two cards are open if yes compare and then do smthg
    if (openCards.length > 1) {
      // function to compare cards and do some action when they match and they dont

        if (openCards[0] === openCards[1]) {
          console.log(true);
          deck.find('.open').addClass('match');
          setTimeout(function () { deck.find('.open').removeClass('open'); }, 500);
          deck.find('.match').off('click');
          openCards = [];
          matches++;
          moves++;
          countMoves();

        } else {
          console.log(false);
          openCards = [];
          setTimeout(function () { deck.find('.open').addClass('not-match'); }, 200);
          setTimeout(function () { deck.find('.open').removeClass('not-match'); }, 500);
          setTimeout(function () { deck.find('.open').removeClass('open'); }, 701);
          moves++;
          countMoves();

        }
     }

    /// what happens if all cards match
    if (matches === cardsWithMatchQTY / 2 ) {
        youAreTheWinner();
    }
  });
};

function youAreTheWinner() {
  var winnerPanel = $('#winner-panel');
  setTimeout(function() {winnerPanel.addClass('open')}, 605);
  var finalTime = $('#timer').html();
  $('#final-time').html(finalTime);
  $("#timer").timer('pause');
  starRating()

}

function countMoves() {
    console.log("tyle ruchow" + moves);
    $('#clicks').text(moves);
    $("#clicks-final").text(moves);
};

// function for star ratings based on moves
function starRating(){
  if (moves === 20) {
    $('.stars i:nth-child(3)').addClass('fa-star-o').removeClass('fa-star')
  } else if (moves === 30) {
    $('.stars i:nth-child(2)').addClass('fa-star-o').removeClass('fa-star')
  } else if (moves === 40) {
    $('.stars i:nth-child(1)').addClass('fa-star-o').removeClass('fa-star')
  }
  let finalStarRating = $('.stars .fa-star').length;
  $("#stars-final").html(finalStarRating);
}

// function to display star rating on Congratulations screen
function resetStarRating() {
  let stars = 3;
  let starsNotFull = $('.fa-star-o');

  $('.stars i').addClass('fa-star').removeClass('fa-star-o');
}

// all what is needed to reset game
let resetButton = $('#reset');
resetButton.on('click', resetGame);


function resetGame() {
  moves = 0;
  matches = 0;
  openCards = [];
  $('#clicks').html(moves);
  deck.empty();
  resetStarRating();
  initGame();
  $("#timer").timer('remove');
  $("#timer").timer();
  var winnerPanel = $('#winner-panel');
  winnerPanel.removeClass('open')

}


initGame();
