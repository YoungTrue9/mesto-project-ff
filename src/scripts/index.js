
import '../pages/index.css';
import {initialCards} from './cards.js';
// import {closePopupEsc} from './modal.js';
import {createCard,likeCard,removeCard} from './cards.js'
import {openModal,closeModal, closePopupByClick} from './modal.js'
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
    closeModal() // поставил без аргумента так как проще работает и не нужно несколько раз писать
})


// Получение кнопки открытия меню информации о человеке.
const openEditProfilePopupButton = document.querySelector('.profile__edit-button');


// Получение модального окна в котором происходят изменения информации о человеке.
const popupTypeEdit = document.querySelector('.popup_type_edit');


// Кнопка добавления карточки
const contentAddButton = document.querySelector('.profile__add-button')


// Попап добавления карточки
const addCardPopup = document.querySelector('.popup_type_new-card')


// Кнопка закрытия попапа КРЕСТИК
const popupCloseCross = document.querySelector('.popup__close') 
// popupCloseCross.forEach((popupCloseCross) =>{
//     popupCloseCross.addEventListener('click', (evt)=>{
//         if(evt.target.classList.contains("popup_is-opened")){
//             closeModal(evt.target)
//         }
//     })
// })

// // ---- Здесь я делаю универсальную функцию нажатия вне зоны карточек чтобы они закрывались ----
const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
    popup.addEventListener('mousedown', closePopupByClick) 
})
// //----------------------------------------------------------------------------------------------



// Редактировани карточки по клику о человеке.
openEditProfilePopupButton.addEventListener('click', function() {
    openModal(popupTypeEdit)
});


// Редактировани карточки по клику о человеке. (закрытие)
popupCloseCross.addEventListener('click', function() {
    closeModal(popupTypeEdit)
});


// Редактировани карточки по клику о месте.
contentAddButton.addEventListener('click', function() {
    openModal(addCardPopup)
});


// Редактировани карточки по клику о месте. (закрытие)
popupCloseCross.addEventListener('click', function() {
    closeModal(addCardPopup)
});

//Форма редактирования профиля
const editProfileForm = document.forms['edit-profile'];
const nameInputs =editProfileForm.name;
const jobInputs = editProfileForm.description;
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const popupEditProfile = document.querySelector('.popup_type_edit');


//Редактирование профиля
function handleEditProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInputs.value;
    profileJob.textContent = jobInputs.value;
    closeModal(popupEditProfile);
}

//Обработчик формы редактирования профиля
editProfileForm.addEventListener('submit', handleEditProfileForm);


