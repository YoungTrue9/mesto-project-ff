
import '../pages/index.css';
import {initialCards} from './cards.js'


const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

const imagePopUp = document.querySelector(".popup_type_image"); // попап картинок 

const imageDescription = imagePopUp.querySelector(".popup__caption"); // описание под картинкой

const modalImage = imagePopUp.querySelector(".popup__image"); // сама картинка достаем из попап

//Создание карточки
function creatingCard(name,link,removeCard, likeCard, imageHandler){
    const cardElement=cardTemplate.querySelector('.card').cloneNode(true)
    //Передача информации о карточки
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name;  
     
    
    const button_like = cardElement.querySelector('.card__like-button') // от card находим класс с лайком
    button_like.addEventListener('click', likeCard)


    const deleteButton = cardElement.querySelector('.card__delete-button') // при нажатие на кнопку 'удалить' будет срабатывать imageHandler
    deleteButton.addEventListener('click', removeCard);


    const images = cardElement.querySelector('.card__image')
    images.addEventListener('click', imageHandler) // при нажатие на карточку будет срабатывать imageHandler

    return cardElement;
}

// открытия картинки на весь экран
function imageHandler(event){
    modalImage.alt = event.target.alt 
    modalImage.src = event.target.src
    imageDescription.textContent = event.target.alt
    openModal(imagePopUp)
}

//лайк карточки
function likeCard(event){
    event.target.classList.toggle('card__like-button_is-active') // при клике добавляем новый класс
}

// Удаление карточки
function removeCard(event){
    const deleteButtons = event.target.closest('.card');
    deleteButtons.remove();
}

//Вывод через цикл карточек 
initialCards.forEach(function(element){
    placesList.append(creatingCard(element.name, element.link, removeCard, likeCard, imageHandler))
})

//Здесь мы берем данные для заполнения карточки
const formInsidePopup = document.querySelector('.popup_type_new-card .popup__form')
const nameInput = formInsidePopup.querySelector('.popup__input_type_card-name')
const linkInput = formInsidePopup.querySelector('.popup__input_type_url')

//форма в которую попадают значения и закрытие самой карточки информации о пользователи 
formInsidePopup.addEventListener('submit', function (evt){
    evt.preventDefault(); //удаляем стандарт

    const nameValue = nameInput.value; //передача информации имени
    const linkValue = linkInput.value; //передача информации картинки

    const newCard = creatingCard(nameValue, linkValue, removeCard, likeCard, imageHandler); // рендор карточки с информацией

    placesList.prepend(newCard);
    formInsidePopup.reset();
    closeModal() // поставил без аргумента так как проще работает и не нужно несколько раз писать
})


// Получение кнопки открытия меню информации о человеке.
const edit_card_info_person = document.querySelector('.profile__edit-button');


// Получение модального окна в котором происходят изменения информации о человеке.
const popup_type_edit = document.querySelector('.popup_type_edit');


// Кнопка добавления карточки
const content_add_button = document.querySelector('.profile__add-button')


// Попап добавления карточки
const popup_add_button = document.querySelector('.popup_type_new-card')


// Кнопка закрытия попапа КРЕСТИК
const popup_close = document.querySelector('.popup__close') 


// Функция открытия попап. (окно)
function openModal(event){
    event.classList.add('popup_is-opened')
    event.classList.add('popup_is-animated')
    document.addEventListener('keydown', closePopupEsc)

};


// // Функция закрытия через попап ESC 
function closePopupEsc(evt) {
    if (evt.key === 'esc') {
      const activePopup = document.querySelector('.popup_is-opened');
      closeModal(activePopup);
    }
}

// ---- Здесь я делаю универсальную функцию нажатия вне зоны карточек чтобы они закрывались ----
const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if(evt.target.classList.contains('popup_is-opened')){
            closeModal(evt.target)
        }
        if(evt.target.classList.contains('popup__close')){
            closeModal(evt.target)
        }
    })  
})
//----------------------------------------------------------------------------------------------

// закрытие модального окна без аргументов
function closeModal() {
    document.querySelector(".popup_is-opened").classList.remove("popup_is-opened");
   
   }

// Редактировани карточки по клику о человеке.
edit_card_info_person.addEventListener('click', function() {
    openModal(popup_type_edit)
});


// Редактировани карточки по клику о человеке. (закрытие)
popup_close.addEventListener('click', function() {
    closeModal(popup_type_edit)
});


// Редактировани карточки по клику о месте.
content_add_button.addEventListener('click', function() {
    openModal(popup_add_button)
});


// Редактировани карточки по клику о месте. (закрытие)
popup_close.addEventListener('click', function() {
    closeModal(popup_add_button)
});

//Форма редактирования профиля
const editProfileForm = document.forms['edit-profile'];
const nameInputs = editProfileForm['name'];
const jobInputs = editProfileForm['description'];
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const popupEditProfile = document.querySelector('.popup_type_edit');

//Обработчик кнопки редактирования профиля
edit_card_info_person.addEventListener('click', function(evt) {
    nameInputs.value = profileTitle.textContent;
    jobInputs.value = profileJob.textContent;
    openModal(popupEditProfile);
});


//Редактирование профиля
function handleEditProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInputs.value;
    profileJob.textContent = jobInputs.value;
    closeModal(popupEditProfile);
}

//Обработчик формы редактирования профиля
editProfileForm.addEventListener('submit', handleEditProfileForm);


