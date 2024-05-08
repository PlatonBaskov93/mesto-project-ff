const cardsList = document.querySelector('.places__list');

const createCard = (cardTitleText, cardImageLink, deleteCard) => {

  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardDeleteButton = card.querySelector('.card__delete-button');

  cardTitle.textContent = cardTitleText;
  cardImage.src = cardImageLink;
  cardImage.alt = `Иллюстрация карточки. На картинке изображен ${cardTitleText}.`;
  cardDeleteButton.addEventListener('click', () => deleteCard(card));

  return card;
};

const deleteCard = (card) => {
  card.remove();
};

const renderCards = (initialArr) => {
  initialArr.forEach((item) => {
    cardsList.append(createCard(item.name, item.link, deleteCard));
  });
};

renderCards(initialCards);