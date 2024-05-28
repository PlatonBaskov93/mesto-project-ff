const cardsList = document.querySelector('.places__list'),
      editProfilePopup = document.querySelector(`.popup_type_edit`),
      newCardPopup = document.querySelector(`.popup_type_new-card`),
      imagePopup = document.querySelector(`.popup_type_image`),
      editProfileButton = document.querySelector(`.profile__edit-button`),
      newCardButton = document.querySelector(`.profile__add-button`),
      userName = document.querySelector(`.profile__title`),
      userDescription = document.querySelector(`.profile__description`),
      closePopupButtons = Array.from(document.querySelectorAll(`.popup__close`));


  const createCard = (cardTitleText, cardImageLink, deleteCard, likeCard, openImagePopup) => {

  const cardTemplate = document.querySelector('#card-template').content,
        card = cardTemplate.querySelector('.card').cloneNode(true),
        cardTitle = card.querySelector('.card__title'),
        cardImage = card.querySelector('.card__image'),
        cardDeleteButton = card.querySelector('.card__delete-button'),
        cardLikeButton = card.querySelector(`.card__like-button`);

  cardTitle.textContent = cardTitleText;
  cardImage.src = cardImageLink;
  cardImage.alt = `Иллюстрация карточки. На картинке изображен ${cardTitleText}.`;
  cardDeleteButton.addEventListener('click', () => deleteCard(card));
  
  cardImage.addEventListener('click', () => openImagePopup(cardImage));
  cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton));
   
  return card;
};


const deleteCard = (card) => {
  card.remove();
};

const renderCards = (initialArr) => {
  initialArr.forEach((item) => {
    cardsList.append(createCard(item.name, item.link, deleteCard, likeCard, openImagePopup));
  });
};



function openPopup(popup) {
  popup.classList.add(`popup_is-opened`);
  popup.addEventListener('mousedown', closePopupByMouse);
  document.addEventListener('keydown', closePopupByKey);
};
  
function closePopup(popup){
  popup.classList.remove(`popup_is-opened`);
  popup.removeEventListener('mousedown', closePopupByMouse);
  document.removeEventListener('keydown', closePopupByKey);
};
  
function closePopupByMouse(evt) {
  if(evt.target.classList.contains('popup_is-opened')) {
    closePopup(evt.target);
  }
};
  
function closePopupByKey(evt) {
  if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  };
};

function openImagePopup(image) {
   imagePopup.querySelector('.popup__image').src = image.src;
   imagePopup.querySelector('.popup__caption').textContent = image.alt;
   openPopup(imagePopup)
}

closePopupButtons.forEach((button)=>{
  const nearestPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(nearestPopup));
})

editProfileButton.addEventListener('click', () => {
editProfilePopup.querySelector(`.popup__input_type_name`).value = userName.textContent;
editProfilePopup.querySelector(`.popup__input_type_description`).value = userDescription.textContent;
openPopup(editProfilePopup);
});

newCardButton.addEventListener('click', () => openPopup(newCardPopup));

const editProfileForm = document.querySelector(`form[name='edit-profile']`),
      addPlaceForm = document.querySelector(`form[name='new-place']`);

function submitProfile(evt) {
  evt.preventDefault();
  let nameInput = evt.target.querySelector(`input[name='name']`).value;
  let descriptionInput = evt.target.querySelector(`input[name='description']`).value;
  userName.textContent = nameInput;
  userDescription.textContent = descriptionInput;
  closePopup(editProfilePopup);
}

function submitNewPlace(evt) {
evt.preventDefault();
  let placeInput = evt.target.querySelector(`input[name='place-name']`).value;
  let linkInput = evt.target.querySelector(`input[name='link']`).value;
  console.log(placeInput)
  console.log(linkInput)
  cardsList.prepend(createCard(placeInput, linkInput, deleteCard, likeCard, openImagePopup));
  evt.target.reset();
  closePopup(newCardPopup);
}

function likeCard(likeButton) {
  likeButton.classList.toggle(`card__like-button_is-active`)
}

editProfileForm.addEventListener('submit', submitProfile); 
addPlaceForm.addEventListener('submit', submitNewPlace); 

renderCards(initialCards);