function openPopup(popup) {
    popup.classList.add(`popup_is-opened`);
    popup.addEventListener(`mousedown`, closePopupByMouse);
    document.addEventListener(`keydown`, closePopupByKey);
  };
    
  function closePopup(popup){
    popup.classList.remove(`popup_is-opened`);
    popup.removeEventListener(`mousedown`, closePopupByMouse);
    document.removeEventListener(`keydown`, closePopupByKey);
  };
    
  function closePopupByMouse(evt) {
    if(evt.target.classList.contains(`popup_is-opened`)) {
      closePopup(evt.target);
    }
  };
    
  function closePopupByKey(evt) {
    if(evt.key === `Escape`) {
      closePopup(document.querySelector(`.popup_is-opened`));
    };
  };

  export {openPopup, closePopup, closePopupByKey, closePopupByMouse}