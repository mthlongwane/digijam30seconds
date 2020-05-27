function selectCard(cardItemArray) {
  const cardItemArrayLength = cardItemArray.length;

  var card = [];
  var categoryIndexTracker = [];
  var newCardItemArrayLength = cardItemArrayLength;

  while (card.length < 5) {
    // randomly generate index number of category we will pich from
    let randomCategoryIndex = Math.ceil(
      Math.random() * newCardItemArrayLength - 1
    );

    // check if category index exists in index tracker
    if (categoryIndexTracker.includes(randomCategoryIndex)) {
      continue;
    }

    // if not, push the index number into index tracker.
    categoryIndexTracker.push(randomCategoryIndex);

    // capture category to choose from
    let categoryItemsArray = cardItemArray[randomCategoryIndex].slice(1);

    // find length of randomly selected category

    let categoryItemsArrayLength = categoryItemsArray.length;

    // pick random number between -1 and the last index value of this sub-array cardItemArray, ceil it and define randomly selected item

    if (categoryItemsArrayLength === 0) {
      continue;
    }

    let randomIndexcategoryItemsArray = Math.ceil(
      Math.random() * categoryItemsArrayLength - 1
    );

    let cardItem = categoryItemsArray[randomIndexcategoryItemsArray];

    if (cardItem === null) {
      continue;
    }

    //prevent duplicates

    if (card.includes(cardItem)) {
      continue;
    }

    card.push(cardItem);

    cardItemArray[randomCategoryIndex][
      randomIndexcategoryItemsArray + 1
    ] = null;
  }
  return card;
}

function getCategories(array) {
  const arrayOfCategories = array.map(categoryArray => {
    if (categoryArray && categoryArray.length > 50) {
      return categoryArray[0];
    }
    return undefined;
  });
  const filteredArray = arrayOfCategories.filter(category => {
    return category !== undefined;
  });
  return filteredArray;
}

function selectCardFromCategory(array, category) {
  const arrayOfCategories = array.map(categoryArray => {
    if (
      categoryArray &&
      categoryArray.length > 50 &&
      categoryArray[0] === category
    ) {
      return categoryArray;
    }
    return undefined;
  });
  const filteredArray = arrayOfCategories.filter(category => {
    return category !== undefined;
  })[0];
  var newCardIndices = [];

  while (newCardIndices.length < 5) {
    var index = Math.ceil(Math.random() * filteredArray.length - 1);
    if (newCardIndices.includes(index)) {
      continue;
    }

    newCardIndices.push(index);
  }

  const finalSelectedArray = newCardIndices.map(index => {
    return filteredArray[index];
  });

  return finalSelectedArray;
}

module.exports = { selectCard, getCategories, selectCardFromCategory };
