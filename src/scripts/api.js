const BASE_URL = "https://nomoreparties.co/v1/wff-cohort-9";

const apiRoutes = {
  user: "users/me",
  cards: "cards",
  likes: "likes",
};


const headers = {
  Authorization: "d2e70dd3-0080-4863-b348-4caea4b1f52f",
  "Content-Type": "application/json",
};

const checkData = (data) => {
  if (data.ok) {
    return data.json();
  } else {
    return Promise.reject(`Error: ${data.status}`);
  }
};

function request(endpoint, options) {
  return fetch(`${BASE_URL}/${endpoint}`, options).then(checkData);
}

const getCards = () => {
  return request(apiRoutes.cards, {
    method: "GET",
    headers,
  });
};

const postCard = (name, link) => {
  return request(apiRoutes.cards, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      link,
    }),
  });
};


const deleteCardApi = (id) => {
  return request(`${apiRoutes.cards}/${id}`, {
    method: "DELETE",
    headers,
  });
};

const getUser = () => {
  return request(apiRoutes.user, {
    method: "GET",
    headers,
  });
};

const patchUser = (name, about) => {
  return request(apiRoutes.user, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      name,
      about,
    }),
  });
};

const addLikeCard = (id)  => {
  return request(`${apiRoutes.cards}/${apiRoutes.likes}/${id}`, {
    method: "PUT",
    headers
  });
};

const deleteLikeCard = (id) => {
  return request(`${apiRoutes.cards}/${apiRoutes.likes}/${id}`, {
    method: "DELETE",
    headers,
  });
};

const patchAvatar = (avatar) => {
  return request(`${apiRoutes.user}/avatar`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ avatar: avatar }),
  });
};
// экспорт нужных функций
export {
  getCards,
  postCard,
  deleteCardApi,
  getUser,
  patchUser,
  addLikeCard,
  deleteLikeCard,
  patchAvatar
};