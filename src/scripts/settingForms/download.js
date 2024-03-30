
function renderLoading(isLoading, button, initialText = "Сохранить", loadingText = "Сохранение...") {
    if (isLoading) {
      button.textContent = loadingText; //сохранение...
    } else {
      button.textContent = initialText; //сохранить
    }
  }
  
  export function handleSubmit(request, evt, loadingText = "Сохранение...") {
    evt.preventDefault();
  
    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    renderLoading(true, submitButton, initialText, loadingText);
  
    request()
      .then(() => {
        evt.target.reset();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        renderLoading(false, submitButton, initialText, loadingText); 
      });
  }