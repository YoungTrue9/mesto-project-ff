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
    document.addEventListener('keydown', closePopupEsc) // вешаем обработчик закрытия 
};

// закрытие модального окна без аргументов
export function closeModal(modal) {
    modal.classList.remove("popup_is-opened");  // удаляем из карточки
    document.removeEventListener('keydown', closePopupEsc) // снимаем обработчик закрытия 
}

// Функция закрытия попап по оверлею
export const handleCloseByOverlayClick = function (evt) {
    if (evt.target.classList.contains('popup_is-opened')) { // проверяем наличие класса у evt.target через contains
        closeModal(evt.target);
      } 
  };
