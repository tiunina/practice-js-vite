// Якщо імейл і пароль користувача збігаються, зберігай дані з форми при сабміті
// у локальне сховище і змінюй кнопку Login на Logout і роби поля введення
// недоступними для змін.
// При перезавантаженні сторінки, якщо користувач залогінений, ми маємо бачити Logout-кнопку
// та недоступні для зміни поля з даними користувача.
// Клік по кнопці Logout повертає все до початкового вигляду і видаляє дані користувача
// З локального сховища.
// Якщо введені дані не збігаються з потрібними даними, викликати аlert і
// повідомляти про помилку.
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import icon from './img/javascript.svg';
const USER_DATA = {
  email: 'user@mail.com',
  password: 'secret',
};
const formEl = document.querySelector('.login-form');
const loginBtn = document.querySelector('.login-btn');
const inputEmail = document.querySelector("[name='email']");
const inputPassword = document.querySelector("[name='password']");

const onSubmit = event => {
  event.preventDefault();
  if (loginBtn.textContent === 'Logout') {
    formEl.reset();
    localStorage.removeItem('user-data');
    loginBtn.textContent = 'Login';
    inputEmail.removeAttribute('readonly');
    inputPassword.removeAttribute('readonly');
    return;
  }
  if (!inputEmail.value.trim() || !inputPassword.value.trim()) {
    // alert('Fill all the fields!');
    iziToast.warning({
      message: 'Fill all the fields!',
      position: 'topCenter',
      iconUrl: icon,
    });
    return;
  }

  if (
    inputEmail.value !== USER_DATA.email ||
    inputPassword.value !== USER_DATA.password
  ) {
    // alert('Wrong email or password!');
    iziToast.error({
      title: 'Error',
      message: 'Wrong email or password!',
      position: 'topCenter',
    });
    return;
  }

  localStorage.setItem(
    'user-data',
    JSON.stringify({ email: inputEmail.value, password: inputPassword.value })
  );

  loginBtn.textContent = 'Logout';

  inputEmail.setAttribute('readonly', true);
  inputPassword.setAttribute('readonly', true);
};

formEl.addEventListener('submit', onSubmit);

const localStorageData = localStorage.getItem('user-data');
if (localStorageData) {
  const parsedData = JSON.parse(localStorageData);
  inputEmail.value = parsedData.email;
  inputPassword.value = parsedData.password;
  loginBtn.textContent = 'Logout';

  inputEmail.setAttribute('readonly', true);
  inputPassword.setAttribute('readonly', true);
}

// TASK 2 Theme switcher/////

const switcher = document.querySelector('.switcher-toggle');
const onThemeSwitch = event => {
  if (event.target.checked) {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
    localStorage.setItem('theme', 'dark');

    console.log('Dark');
  } else {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');

    console.log('light');
  }
};

const localStorageTheme = localStorage.getItem('theme');
if (localStorageTheme === 'dark') {
  switcher.checked = true;
  document.body.classList.add('dark');
  document.body.classList.remove('light');
}

switcher.addEventListener('change', onThemeSwitch);
