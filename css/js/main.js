// ==================== ПЕРЕВОДЫ ====================
const translations = {
  ru: {
    nav_home: "Главная", nav_about: "О себе", nav_skills: "Навыки",
    nav_education: "Образование", nav_projects: "Проекты", nav_contact: "Контакты",
    greeting: "Привет, я", tagline: "Frontend-разработчик | создаю современные веб-приложения",
    hire_me: "Связаться", about_title: "О себе",
    about_text1: "Я фронтенд-разработчик с более чем 4-летним опытом создания адаптивных и производительных веб-интерфейсов. Люблю решать сложные задачи и учиться новому.",
    about_text2: "Работал над проектами в сфере e-commerce, fintech и edtech. Постоянно совершенствую свои навыки и делюсь опытом с сообществом.",
    skills_title: "Навыки", edu_title: "Образование", projects_title: "Проекты",
    contact_title: "Форма обратной связи", proj1: "Приложение погоды с OpenWeather API",
    proj2: "Управление задачами с аутентификацией", proj3: "Каталог товаров, корзина",
    form_name: "Имя *", form_phone: "Телефон * +7XXXXXXXXXX",
    form_email: "Email *", form_question: "Ваш вопрос *",
    send_btn: "Отправить", footer: "Все права защищены.",
    404text: "Страница не найдена. Вернуться на главную.",
    name_required: "Введите имя", phone_invalid: "Введите корректный номер телефона",
    email_invalid: "Введите корректный email", question_required: "Введите вопрос",
    success_msg: "Спасибо! Ваше сообщение отправлено"
  },
  en: {
    nav_home: "Home", nav_about: "About", nav_skills: "Skills",
    nav_education: "Education", nav_projects: "Projects", nav_contact: "Contact",
    greeting: "Hi, I'm", tagline: "Frontend developer | building modern web apps",
    hire_me: "Contact me", about_title: "About Me",
    about_text1: "Frontend developer with 4+ years of experience building responsive web interfaces.",
    about_text2: "Worked on projects in e-commerce, fintech and edtech.",
    skills_title: "Skills", edu_title: "Education", projects_title: "Projects",
    contact_title: "Contact Form", proj1: "Weather app with OpenWeather API",
    proj2: "Task manager with authentication", proj3: "Product catalog with cart",
    form_name: "Full Name *", form_phone: "Phone * +7XXXXXXXXXX",
    form_email: "Email *", form_question: "Your question *",
    send_btn: "Submit", footer: "All rights reserved.",
    404text: "Page not found. Back to home.",
    name_required: "Name is required", phone_invalid: "Enter valid phone number",
    email_invalid: "Enter valid email", question_required: "Question is required",
    success_msg: "Thank you! Your message has been sent"
  }
};

let currentLang = 'ru';

// Обновление языка на странице
function updateLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[lang][key];
      } else {
        el.innerText = translations[lang][key];
      }
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) el.placeholder = translations[lang][key];
  });
  document.getElementById('langText').innerText = lang === 'ru' ? 'EN' : 'RU';
  const themeTextSpan = document.getElementById('themeText');
  if (themeTextSpan) {
    const isDark = document.body.classList.contains('dark');
    themeTextSpan.innerText = isDark ? (lang === 'ru' ? 'Тёмная' : 'Dark') : (lang === 'ru' ? 'Светлая' : 'Light');
  }
}

// Определение языка браузера
function getBrowserLang() {
  return navigator.language.startsWith('ru') ? 'ru' : 'en';
}

// ==================== ТЕМА ====================
function applyTheme(theme) {
  if (theme === 'dark') document.body.classList.add('dark');
  else document.body.classList.remove('dark');
  localStorage.setItem('theme', theme);
  const themeTextSpan = document.getElementById('themeText');
  if (themeTextSpan) {
    themeTextSpan.innerText = theme === 'dark' ? (currentLang === 'ru' ? 'Тёмная' : 'Dark') : (currentLang === 'ru' ? 'Светлая' : 'Light');
  }
}

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  applyTheme(savedTheme || getSystemTheme());
}

// ==================== PDF ====================
function downloadPDF() {
  window.print();
}

// ==================== ВАЛИДАЦИЯ ФОРМЫ ====================
function validatePhone(phone) {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8')) || digits.length === 10;
}

function validateEmail(email) {
  return /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email);
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  // Очистка ошибок
  document.querySelectorAll('.error-msg').forEach(el => el.innerText = '');
  
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const question = document.getElementById('question').value.trim();
  const statusMsg = document.getElementById('formStatus');
  
  let isValid = true;
  
  if (!name) {
    document.getElementById('nameError').innerText = translations[currentLang].name_required;
    isValid = false;
  }
  if (!validatePhone(phone)) {
    document.getElementById('phoneError').innerText = translations[currentLang].phone_invalid;
    isValid = false;
  }
  if (!validateEmail(email)) {
    document.getElementById('emailError').innerText = translations[currentLang].email_invalid;
    isValid = false;
  }
  if (!question) {
    document.getElementById('questionError').innerText = translations[currentLang].question_required;
    isValid = false;
  }
  
  if (isValid) {
    console.log('Форма отправлена:', { name, phone, email, question });
    statusMsg.innerText = translations[currentLang].success_msg;
    statusMsg.style.color = '#22c55e';
    document.getElementById('feedbackForm').reset();
    setTimeout(() => statusMsg.innerText = '', 3000);
  }
}

// ==================== 404 ОБРАБОТЧИК ====================
function handleRouting() {
  const hash = window.location.hash.substring(1);
  const validSections = ['home', 'about', 'skills', 'education', 'projects', 'contact'];
  const notFoundDiv = document.getElementById('notFoundPage');
  const mainSections = document.querySelectorAll('main section');
  
  if (hash && !validSections.includes(hash)) {
    mainSections.forEach(sec => sec.style.display = 'none');
    notFoundDiv.style.display = 'block';
  } else {
    mainSections.forEach(sec => sec.style.display = '');
    notFoundDiv.style.display = 'none';
    if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
  }
}

// ==================== ИНИЦИАЛИЗАЦИЯ ====================
document.addEventListener('DOMContentLoaded', () => {
  // Язык
  currentLang = getBrowserLang();
  updateLanguage(currentLang);
  
  // Тема
  initTheme();
  
  // Кнопки
  document.getElementById('themeToggle').addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
  });
  
  document.getElementById('langToggle').addEventListener('click', () => {
    const newLang = currentLang === 'ru' ? 'en' : 'ru';
    updateLanguage(newLang);
  });
  
  document.getElementById('downloadPDF').addEventListener('click', downloadPDF);
  
  // Форма
  document.getElementById('feedbackForm').addEventListener('submit', handleFormSubmit);
  
  // Роутинг 404
  window.addEventListener('hashchange', handleRouting);
  handleRouting();
  
  // Кнопка "на главную" на 404
  const backHome = document.getElementById('backHome');
  if (backHome) {
    backHome.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = 'home';
    });
  }
});
