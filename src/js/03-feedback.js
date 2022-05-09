import throttle from 'lodash.throttle';

// Выполняй это задание в файлах 03-feedback.html и 03-feedback.js. Разбей его на несколько подзадач:

// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
// При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};
window.addEventListener('DOMContentLoaded', setFormValues);

const state = localStorage.getItem('feedback-form-state')
  ? JSON.parse(localStorage.getItem('feedback-form-state'))
  : {};

refs.feedbackForm.addEventListener('submit', handleSubmitForm);

refs.message.addEventListener('input', throttle(handleSetStorageState, 500));
refs.email.addEventListener('input', throttle(handleSetStorageState, 500));

function handleSubmitForm(event) {
  event.preventDefault();

  const email = refs.email.value;
  const message = refs.message.value;

  if (!email.trim() || !message.trim()) {
    return alert('Please, fill in all fields of the form');
  }

  console.log({ email, message });
  event.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}

function handleSetStorageState(event) {
  state[event.target.name] = event.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(state));
}

function setFormValues() {
  if (!localStorage.getItem('feedback-form-state')) return;

  const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (savedData.email) {
    refs.email.value = savedData.email;
  }
  if (savedData.message) {
    refs.message.value = savedData.message;
  }
}
