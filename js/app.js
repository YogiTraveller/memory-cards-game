
// Create cards varible & create match cards to these cards
var cards = ["bell", "camera", "car", "bolt", "heart", "star", "rocket", "usd"];
var cardsWithMatch = [];

for (i = 0; i < cards.length; i++) {
  cardsWithMatch.push(cards[i]);
  cardsWithMatch.push(cards[i] + "-match");
};

console.log(cards);
console.log(cardsWithMatch);




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
