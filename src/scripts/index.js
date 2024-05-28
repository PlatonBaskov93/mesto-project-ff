import '../pages/index.css'

import { openPopup, closePopup } from "./modal.js"
import { createCard, deleteCard, likeCard } from "./card.js"
import initialCards from "./cards.js"

const cardsList = document.querySelector(`.places__list`),
      editProfilePopup = document.querySelector(`.popup_type_edit`),
      newCardPopup = document.querySelector(`.popup_type_new-card`),
      imagePopup = document.querySelector(`.popup_type_image`),
      editProfileButton = document.querySelector(`.profile__edit-button`),
      newCardButton = document.querySelector(`.profile__add-button`),
      userName = document.querySelector(`.profile__title`),
      userDescription = document.querySelector(`.profile__description`),
      closePopupButtons = Array.from(document.querySelectorAll(`.popup__close`)),
      editProfileForm = document.querySelector(`form[name='edit-profile']`),
      addPlaceForm = document.querySelector(`form[name='new-place']`),
      profileNameInput = editProfilePopup.querySelector(`.popup__input_type_name`),
      profileDescriptionInput = editProfilePopup.querySelector(`.popup__input_type_description`);

function submitProfile(evt) {
  evt.preventDefault();
  const nameInput = evt.target.querySelector(`input[name='name']`).value,
        descriptionInput = evt.target.querySelector(`input[name='description']`).value;
  userName.textContent = nameInput;
  userDescription.textContent = descriptionInput;
  closePopup(editProfilePopup);
}

function submitNewPlace(evt) {
evt.preventDefault();
  const placeInput = evt.target.querySelector(`input[name='place-name']`).value,
        linkInput = evt.target.querySelector(`input[name='link']`).value;
  cardsList.prepend(createCard(placeInput, linkInput, deleteCard, likeCard, openImagePopup));
  evt.target.reset();
  closePopup(newCardPopup);
}

function renderCards(initialArr) {
  initialArr.forEach((item) => {
    cardsList.append(createCard(item.name, item.link, deleteCard, likeCard, openImagePopup));
  });
};

function openImagePopup(image) {
  imagePopup.querySelector(`.popup__image`).src = image.src;
  imagePopup.querySelector(`.popup__image`).alt = image.alt;
  imagePopup.querySelector(`.popup__caption`).textContent = image.alt;
  openPopup(imagePopup)
}

closePopupButtons.forEach((button)=>{
  const nearestPopup = button.closest(`.popup`);
  button.addEventListener(`click`, () => closePopup(nearestPopup));
});

editProfileButton.addEventListener(`click`, () => {
  profileNameInput.value = userName.textContent;
  profileDescriptionInput.value = userDescription.textContent;
  openPopup(editProfilePopup);
});

newCardButton.addEventListener(`click`, () => openPopup(newCardPopup));

editProfileForm.addEventListener(`submit`, submitProfile); 

addPlaceForm.addEventListener(`submit`, submitNewPlace); 

renderCards(initialCards);