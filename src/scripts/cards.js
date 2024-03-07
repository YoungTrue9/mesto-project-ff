export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const cardTemplate = document.querySelector('#card-template').content; // без этой переменной не работают функции
//Создание карточки
export function createCard(name,link,removeCard, likeCard, openImagePopup){
    const cardElement=cardTemplate.querySelector('.card').cloneNode(true)
    //Передача информации о карточки
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name;  
     
    
    const buttonLike = cardElement.querySelector('.card__like-button') // от card находим класс с лайком
    buttonLike.addEventListener('click', likeCard)


    const deleteButton = cardElement.querySelector('.card__delete-button') // при нажатие на кнопку 'удалить' будет срабатывать openImagePopup
    deleteButton.addEventListener('click', removeCard);


    const cardImage = cardElement.querySelector('.card__image')
    cardImage.addEventListener('click', openImagePopup) // при нажатие на карточку будет срабатывать openImagePopup

    return cardElement;
}

//лайк карточки
export function likeCard(event){
    event.target.classList.toggle('card__like-button_is-active') // при клике добавляем новый класс
}

// Удаление карточки
export function removeCard(event){
    const cardElement = event.target.closest('.card');
    cardElement.remove();
}

