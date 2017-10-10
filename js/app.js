
// Create cards varible & create match cards to these cards,
// The name of the icon should match to Font Awsome icon name
var cards = ["bell", "camera", "car", "bolt", "heart", "star", "rocket", "usd"];
var cardsWithMatch = [];

for (i = 0; i < cards.length; i++) {
  cardsWithMatch.push(cards[i]);
  cardsWithMatch.push(cards[i] + " match");
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
  var card = $('<li class="card back--visible"></div>');
  var icon = $('<div class="card__front"><i class="fa fa-' + cardsWithMatch[i] +'" aria-hidden="true"></i></div>')
  deck.append(card);
  card.append(icon);
}

$('.card').click(function() {
  $(this).toggleClass('back--visible')
})
