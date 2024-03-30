import { avatarFormElement, avatarImage, avatarForm } from "../constans.js";
import { patchAvatar } from "../api.js";
import { handleSubmit } from "./download.js";
import { closePopup } from "../modal.js";

export function handleAvatarFormSubmit(event) {
  function makeRequest() {
    const avatar = avatarFormElement.elements["avatar-link"].value;
    return patchAvatar(avatar)
      .then((res) => {
        avatarImage.setAttribute("style", `background-image: url('${res.avatar}')`);
        closePopup(avatarForm);
      });
  }
  handleSubmit(makeRequest, event);
}