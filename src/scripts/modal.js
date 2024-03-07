// Функция закрытия через попап ESC 
export function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
      const activePopup = document.querySelector('.popup_is-opened');
      closeModal(activePopup);
    }
}

// Функция открытия попап. (окно)
export function openModal(popup){
    popup.classList.add('popup_is-opened')
    popup.classList.toggle('popup_is-animated') //toggle для снятия класса
    document.addEventListener('keydown', closePopupEsc)
    document.addEventListener("mousedown", setOverlayListener);
};

// закрытие модального окна без аргументов
export function closeModal() {
    document.querySelector(".popup_is-opened").classList.toggle("popup_is-opened");
}

// Функция закрытия попап по оверлею
export const setOverlayListener = function (evt) {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (evt.target === openedPopup) {
      closeModal(openedPopup);
    }
  };

export function closePopupByClick(evt){
    if(evt.target.classList.contains('popup_is-opened')){
        closeModal(evt.target)
    }
    else if(evt.target.classList.contains('popup__close')){
        closeModal(evt.target)
    }
}  