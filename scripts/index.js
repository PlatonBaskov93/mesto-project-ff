const createCards = (cardsArr, deleteCard) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const createdCards = [];

  cardsArr.forEach((item) => {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    card.querySelector('.card__title').textContent = item.name;
    card.querySelector('.card__image').src = item.link;
    card.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    createdCards.push(card);
  })

  return createdCards;
}

const deleteCard = (evt) => {
  evt.target.parentElement.remove();
}

const renderCards = () => {
  const cardsList = document.querySelector('.places__list');
  const cardsToRender = createCards(initialCards, deleteCard);
  cardsToRender.forEach((item) => {
    cardsList.append(item);
  });

}

renderCards();