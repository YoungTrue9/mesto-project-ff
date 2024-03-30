import {
    openPopup,
    closePopup,
  handleOverlayClick,
  handleCloseButtonClick
} from "./modal.js";
import { createCard, handleLikes } from "./card.js";
import {
  popupsArray,
  placesList,
  editForm,
  editFormElement,
  profileEditButton,
  userNameElement,
  userJobElement,
  newCardForm,
  profileAddButton,
  avatarForm,
  avatarImage,
  deleteCardForm,
} from "./constans.js";
import { validation, clearValidation, validationConfig} from "./validation.js";
import "../pages/index.css";
import {
  getCards,
  getUser,
} from "./api.js";

import { handleCardDelete, openPopupDelete } from "./settingForms/delete.js";

import { handleAvatarFormSubmit } from "./settingForms/avatarka.js";

import { handleNewCardFormSubmit } from "./settingForms/newcards.js";

import { handleFormSubmit, setInitialEditProfileFormValues} from "./settingForms/setting.js";

validation(validationConfig);

function openImagePopup(
  cardImg,
  popupImage,
  popupImageCaption,
  buttonTypeCard
) {
  popupImage.src = cardImg.src;
  popupImage.alt = cardImg.alt;
  popupImageCaption.textContent = cardImg.alt;
  openPopup(buttonTypeCard);
}

const callbacksObject = {
  deleteCardCallback: openPopupDelete,
  openImageCallback: openImagePopup,
  handleLikesCallback: handleLikes,
};

profileEditButton.addEventListener("click", () => {
  clearValidation(editFormElement, validationConfig);
  setInitialEditProfileFormValues();
  openPopup(editForm);
});

profileAddButton.addEventListener("click", () => {
  clearValidation(newCardForm, validationConfig);
  openPopup(newCardForm);
});

avatarImage.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openPopup(avatarForm);
});

popupsArray.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  popup.addEventListener("click", handleOverlayClick);
  closeButton.addEventListener("click", handleCloseButtonClick);
});

let userId = "";
function setUserInfo(user) {
  userNameElement.textContent = user.name;
  userJobElement.textContent = user.about;
  avatarImage.setAttribute(
    "style",
    `background-image: url('${user.avatar}')`
  );
  userId = user._id;
}

export function renderCards(cards, callbacksObject, userId) {
  placesList.innerHTML = "";
  cards.forEach(card => {
    const cardElement = createCard(card, callbacksObject, userId);
    placesList.appendChild(cardElement);
  });
}

editForm.addEventListener("submit", handleFormSubmit);
newCardForm.addEventListener("submit", (event) => {
  handleNewCardFormSubmit(event, callbacksObject, userId);
});
avatarForm.addEventListener("submit", handleAvatarFormSubmit);
deleteCardForm.addEventListener("submit", handleCardDelete);

Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    setUserInfo(user);
    renderCards(cards, callbacksObject, user._id);
  })
  .catch((err) => {
    console.error("Произошла ошибка при получении данных:", err);
  });