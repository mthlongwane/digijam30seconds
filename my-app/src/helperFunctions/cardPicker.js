function selectCard(cardItemArray) {
  const cardItemArrayLength = cardItemArray.length;

  var card = [];
  var categoryIndexTracker = [];
  var newCardItemArrayLength = cardItemArrayLength;

  while (card.length < 5) {
    // pick random number between -1 and the last index value of cardItemArray, ceil it and define randomly selected sub-array

    let randomCategoryIndex = Math.ceil(
      Math.random() * newCardItemArrayLength - 1
    );

    // tracking category index to prevent a category being used twice in one card.
    if (categoryIndexTracker.includes(randomCategoryIndex)) {
      continue;
    }
    categoryIndexTracker.push(randomCategoryIndex);

    let categoryItemsArray = cardItemArray[randomCategoryIndex].slice(1);

    // find length of randomly selected sub-array of cardItemArray

    let categoryItemsArrayLength = categoryItemsArray.length;

    // pick random number between -1 and the last index value of this sub-array cardItemArray, ceil it and define randomly selected item

    if (categoryItemsArrayLength === 0) {
      continue;
    }

    let randomIndexcategoryItemsArray = Math.ceil(
      Math.random() * categoryItemsArrayLength - 1
    );

    let cardItem = categoryItemsArray[randomIndexcategoryItemsArray];

    if (cardItem == null) {
      continue;
    }

    card.push(cardItem);

    cardItemArray[randomCategoryIndex][randomIndexcategoryItemsArray] = null;
  }
  return card;
}

module.exports = selectCard;
