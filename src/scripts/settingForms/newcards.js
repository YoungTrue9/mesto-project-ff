import { postCard } from "../api.js";
import { createCard } from "../card.js";
import { closePopup } from "../modal.js";
import {
  newCardForm,
  newPlaceNameInput,
  newLinkInput,
  placesList,
} from "../constans.js";
import { handleSubmit } from "./download.js";

function renderCard(item, method = "prepend") {
  const cardElement = createCard(item, callbacks);
  cardList[method](cardElement);
}

export function handleNewCardFormSubmit(event, callbacksObject, userId) {
  function makeRequest() {
    return postCard(newPlaceNameInput.value, newLinkInput.value)
      .then((card) => {
        const newCardElement = createCard(card, callbacksObject, userId);
        placesList.prepend(newCardElement); 
        closePopup(newCardForm); 
      });
  }

  handleSubmit(makeRequest, event);
}