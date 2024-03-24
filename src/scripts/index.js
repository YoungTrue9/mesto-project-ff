
import '../pages/index.css';
import {initialCards} from './cards.js';
// import {closePopupEsc} from './modal.js';
import {createCard,likeCard,removeCard} from './card.js'
import {openModal,closeModal,handleCloseByOverlayClick} from './modal.js'
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

const imagePopUp = document.querySelector(".popup_type_image"); // попап картинок 

const imageDescription = imagePopUp.querySelector(".popup__caption"); // описание под картинкой

const modalImage = imagePopUp.querySelector(".popup__image"); // сама картинка достаем из попап



// открытия картинки на весь экран
function openImagePopup(event){
    modalImage.alt = event.target.alt 
    modalImage.src = event.target.src
    imageDescription.textContent = event.target.alt
    openModal(imagePopUp)
}

//Вывод через цикл карточек 
initialCards.forEach(function(element){
    cardsContainer.append(createCard(element.name, element.link, removeCard, likeCard, openImagePopup))
})

//Здесь мы берем данные для заполнения карточки
const formCreateCard = document.querySelector('.popup_type_new-card .popup__form')
const nameInput = formCreateCard.querySelector('.popup__input_type_card-name')
const linkInput = formCreateCard.querySelector('.popup__input_type_url')



//форма в которую попадают значения и закрытие самой карточки информации о пользователи 
formCreateCard.addEventListener('submit', function (evt){
    evt.preventDefault(); //удаляем стандарт



    const nameValue = nameInput.value; //передача информации имени
    const linkValue = linkInput.value; //передача информации картинки

    const newCard = createCard(nameValue, linkValue, removeCard, likeCard, openImagePopup); // рендор карточки с информацией

    cardsContainer.prepend(newCard);
    formCreateCard.reset();
    closeModal(addCardPopup) //закрываем новую карточку
})


// Получение кнопки открытия меню информации о человеке.
const openEditProfilePopupButton = document.querySelector('.profile__edit-button');


// Получение модального окна в котором происходят изменения информации о человеке.
const popupTypeEdit = document.querySelector('.popup_type_edit');


// Кнопка добавления карточки
const contentAddButton = document.querySelector('.profile__add-button')


// Попап добавления карточки
const addCardPopup = document.querySelector('.popup_type_new-card')

// // ---- Здесь я делаю универсальную функцию нажатия вне зоны карточек чтобы они закрывались ----
const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
    // находим кнопку закрытия
    const closeButton = popup.querySelector('.popup__close')

    // вешаем обработчик закрытия по клику на кнопку
    closeButton.addEventListener('click', () => closeModal(popup))

    // вешаем обработчик закрытия кликом по оверлею
    popup.addEventListener('mousedown', handleCloseByOverlayClick) 
}) 

// //----------------------------------------------------------------------------------------------




// Редактировани карточки по клику о человеке.
openEditProfilePopupButton.addEventListener('click', function() {
    nameInputs.value = profileTitle.textContent; 
    jobInputs.value = profileJob.textContent; 
    openModal(popupTypeEdit)

});


// Редактировани карточки по клику о месте.
contentAddButton.addEventListener('click', function() {
    openModal(addCardPopup)
});



//Форма редактирования профиля
const editProfileForm = document.forms['edit-profile'];
const nameInputs =editProfileForm.name;
const jobInputs = editProfileForm.description;
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const popupEditProfile = document.querySelector('.popup_type_edit');


//Редактирование профиля - (здесь происходит СОХРАНЕНИЕ данных которые мы ввели, а точнее их вывод.)
function handleEditProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInputs.value;
    profileJob.textContent = jobInputs.value;
    closeModal(popupEditProfile);
}

//Обработчик формы редактирования профиля
editProfileForm.addEventListener('submit', handleEditProfileForm);






const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');
const buttonElement = document.querySelector('.popup__button')

const inputElement = document.querySelectorAll('.popup__input')


// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const validationConfig = { //классы для привязки
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }; 


//Показываем ошибочку
const profileInputError = (formElement, nameInput, validationConfig, errorMessage) => {
    const profileError = formElement.querySelector(`.${nameInput.id}-error`);
    console.log(profileError)
    inputElement.classList.add(validationConfig.inputErrorClass);
    profileError.textContent = errorMessage;
    profileError.classList.add(validationConfig.errorClass);
};


//Удаляем ошибочку
const profileHideInputError  = (formElement, inputElement, validationConfig) => {
    const profileError = formElement.querySelector(`.${nameInput.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    profileError.classList.remove(validationConfig.errorClass);
    profileError.textContent = ''
};

const isValidProfile = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.patternMismatch) {
        // встроенный метод setCustomValidity принимает на вход строку
        // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorProfile);
  } else {
        // если передать пустую строку, то будут доступны
        // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  }

//Сток браузерные сообщения
  if (!inputElement.validity.valid) {
    profileInputError(
        formElement,
        inputElement,
        validationConfig,
        inputElement.validationMessage
    );
  } else {
    profileHideInputError(formElement, inputElement, validationConfig);
  }
}; 

//поиск всех полей и форм
const setEventListeners = (formElementProfile) => {
    const inputList = Array.from(formElementProfile.querySelectorAll('.form__input'));
    inputList.forEach((formInput) => {
        formInput.addEventListener('input', () => {
            isValidProfile(formElementProfile, formInput);
            toggleButtonState(inputList, buttonElement);
      });
    });
  }; 

  //Поиск всех форм
const enableValidation = (validationConfig) => {
    const formElementList = Array.from(
      document.querySelectorAll(validationConfig.formSelector)
    );
  
    formElementList.forEach((formElement) => {
      setEventListeners(formElement, validationConfig);
    });
    
  };
  enableValidation(validationConfig);


  
