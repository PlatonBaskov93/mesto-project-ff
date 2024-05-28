
const cardTemplate = document.querySelector(`#card-template`).content;

function createCard(cardTitleText, cardImageLink, deleteCard, likeCard, openImagePopup){

    const card = cardTemplate.querySelector(`.card`).cloneNode(true),
          cardTitle = card.querySelector(`.card__title`),
          cardImage = card.querySelector(`.card__image`),
          cardDeleteButton = card.querySelector(`.card__delete-button`),
          cardLikeButton = card.querySelector(`.card__like-button`);
  
    cardTitle.textContent = cardTitleText;
    cardImage.src = cardImageLink;
    cardImage.alt = `Иллюстрация карточки. На картинке изображен ${cardTitleText}.`;
    cardDeleteButton.addEventListener(`click`, () => deleteCard(card));
    
    cardImage.addEventListener(`click`, () => openImagePopup(cardImage));
    cardLikeButton.addEventListener(`click`, () => likeCard(cardLikeButton));
     
    return card;
  };
  
  function deleteCard(card) {
    card.remove();
  };
  
  function likeCard(likeButton) {
    likeButton.classList.toggle(`card__like-button_is-active`)
  }

  export {createCard, deleteCard, likeCard}