import {openPopup, openImagePopup, closePopup } from "./modal.js"
import {createCard, renderCards, deleteCard, likeCard} from "./card.js"
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
      addPlaceForm = document.querySelector(`form[name='new-place']`);

closePopupButtons.forEach((button)=>{
  const nearestPopup = button.closest(`.popup`);
  button.addEventListener(`click`, () => closePopup(nearestPopup));
});

editProfileButton.addEventListener(`click`, () => {
editProfilePopup.querySelector(`.popup__input_type_name`).value = userName.textContent;
editProfilePopup.querySelector(`.popup__input_type_description`).value = userDescription.textContent;
openPopup(editProfilePopup);
});

newCardButton.addEventListener(`click`, () => openPopup(newCardPopup));

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
  cardsList.prepend(createCard(placeInput, linkInput, deleteCard, likeCard, openImagePopup));
  evt.target.reset();
  closePopup(newCardPopup);
}

editProfileForm.addEventListener(`submit`, submitProfile); 
addPlaceForm.addEventListener(`submit`, submitNewPlace); 

renderCards(initialCards);

export {cardsList, imagePopup}