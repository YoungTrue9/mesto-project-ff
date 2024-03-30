import { deleteCardApi } from "../api.js";
import { openPopup, closePopup } from "../modal.js";
import { deletePopup } from "../constans.js";

let selectedCard; //для работы с опреденной карточкой
let id; //для работы с опреденной карточкой 

export const openPopupDelete = (cardElement, cardId) => {
  selectedCard = cardElement;
  id = cardId;
  openPopup(deletePopup);
};


const closePopupDelete = () => {
  closePopup(deletePopup);
};


export function deleteCard(selectedCard, id) {
  deleteCardApi(id)
    .then(() => {
      selectedCard.remove();
      closePopupDelete();
    })
    .catch((err) => {
      console.error("Произошла ошибка при удалении карточки:", err);
    });
}

export function handleCardDelete(evt) {
  evt.preventDefault();
  deleteCard(selectedCard, id);
}