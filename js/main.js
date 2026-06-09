// ==================== ПЕРЕВОДЫ ====================
const translations = {
  ru: {
    nav_home: "Главная",
    nav_about: "О себе",
    nav_skills: "Навыки",
    nav_education: "Образование",
    nav_projects: "Проекты",
    nav_contact: "Контакты",
    greeting: "Привет, я",
    tagline: "Студент",
    hire_me: "Связаться",
    about_title: "О себе",
    about_text1: "Я просто Вовчик",
    skills_title: "Навыки",
    edu_title: "Образование",
    projects_title: "Проекты",
    contact_title: "Форма обратной связи",
    proj2: "пока нету",
    form_name: "Имя *",
    form_phone: "Телефон * +7XXXXXXXXXX",
    form_email: "Email *",
    form_question: "Ваш вопрос *",
    send_btn: "Отправить",
    footer: "Все права защищены.",
    "404text": "Страница не найдена. Вернуться на главную.",
    name_required: "Введите имя",
    phone_invalid: "Введите корректный номер телефона (10 цифр, +7 или 8)",
    email_invalid: "Введите корректный email",
    question_required: "Введите вопрос",
    success_msg: "Спасибо! Ваше сообщение отправлено",
    theme_dark: "Тёмная",
    theme_light: "Светлая"
  },
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_skills: "Skills",
    nav_education: "Education",
    nav_projects: "Projects",
    nav_contact: "Contact",
    greeting: "Hi, I'm",
    tagline: "Student",
    hire_me: "Contact me",
    about_title: "About Me",
    about_text1: "I'm just Vovchik.",
    skills_title: "Skills",
    edu_title: "Education",
    projects_title: "Projects",
    contact_title: "Contact Form",
    proj2: "not yet.",
    form_name: "Full Name *",
    form_phone: "Phone * +7XXXXXXXXXX",
    form_email: "Email *",
    form_question: "Your question *",
    send_btn: "Submit",
    footer: "All rights reserved.",
    "404text": "Page not found. Back to home.",
    name_required: "Name is required",
    phone_invalid: "Enter valid phone number (10 digits, +7 or 8)",
    email_invalid: "Enter valid email",
    question_required: "Question is required",
    success_msg: "Thank you! Your message has been sent",
    theme_dark: "Dark",
    theme_light: "Light"
  }
};

let currentLang = 'ru';

// Функция обновления языка на странице
function updateLanguage(lang) {
  currentLang = lang;
  
  // Обновляем все элементы с data-i18n
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
  
  // Обновляем плейсхолдеры
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
  
  // Обновляем текст кнопки языка
  const langTextSpan = document.getElementById('langText');
  if (langTextSpan) {
    langTextSpan.innerText = lang === 'ru' ? 'EN' : 'RU';
  }
  
  // Обновляем текст кнопки темы
  updateThemeButtonText();
}

// Определение языка браузера
function getBrowserLang() {
  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.startsWith('ru') ? 'ru' : 'en';
}

// ==================== ТЕМА ====================
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);
  updateThemeButtonText();
}

function updateThemeButtonText() {
  const themeTextSpan = document.getElementById('themeText');
  if (themeTextSpan) {
    const isDark = document.body.classList.contains('dark');
    themeTextSpan.innerText = isDark 
      ? (currentLang === 'ru' ? 'Тёмная' : 'Dark')
      : (currentLang === 'ru' ? 'Светлая' : 'Light');
  }
}

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme(getSystemTheme());
  }
}

// ==================== PDF СКАЧИВАНИЕ ====================
function downloadPDF() {
  // Создаем временный элемент для печати только нужного контента
  const originalTitle = document.title;
  document.title = "Shelekasov_Vladimir_Resume";
  
  // Добавляем стили для печати
  const printStyles = document.createElement('style');
  printStyles.textContent = `
    @media print {
      body {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }
      .controls, .nav-links, .hero-buttons, .github-link, .contact-form button,
      #themeToggle, #langToggle, #downloadPDF, footer .toggle-btn, header .controls {
        display: none !important;
      }
      .container {
        max-width: 100%;
        padding: 0;
      }
      section {
        page-break-inside: avoid;
        padding: 20px 0;
      }
      a {
        text-decoration: none;
        color: black;
      }
      .skill-card, .project-card, .edu-card, .about-card {
        break-inside: avoid;
        border: 1px solid #ccc;
      }
    }
  `;
  document.head.appendChild(printStyles);
  
  // Вызываем печать
  window.print();
  
  // Удаляем временные стили
  setTimeout(() => {
    document.head.removeChild(printStyles);
    document.title = originalTitle;
  }, 100);
}

// ==================== ВАЛИДАЦИЯ ФОРМЫ ====================
function validatePhone(phone) {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8')) || digits.length === 10;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
  return emailRegex.test(email);
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  // Очищаем предыдущие ошибки
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
    // Логируем данные в консоль (имитация отправки)
    console.log('📝 Форма отправлена:', { name, phone, email, question });
    
    // Показываем сообщение об успехе
    statusMsg.innerText = translations[currentLang].success_msg;
    statusMsg.style.color = '#22c55e';
    
    // Очищаем форму
    document.getElementById('feedbackForm').reset();
    
    // Скрываем сообщение через 3 секунды
    setTimeout(() => {
      statusMsg.innerText = '';
    }, 3000);
  }
}

// ==================== 404 ОБРАБОТЧИК ====================
function handleRouting() {
  const hash = window.location.hash.substring(1);
  const validSections = ['home', 'about', 'skills', 'education', 'projects', 'contact', ''];
  const mainContent = document.getElementById('mainContent');
  const notFoundDiv = document.getElementById('notFoundPage');
  
  if (hash && !validSections.includes(hash)) {
    mainContent.style.display = 'none';
    notFoundDiv.style.display = 'block';
    document.querySelector('footer').style.display = 'none';
  } else {
    mainContent.style.display = 'block';
    notFoundDiv.style.display = 'none';
    document.querySelector('footer').style.display = 'block';
    if (hash) {
      const element = document.getElementById(hash);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// ==================== ИНИЦИАЛИЗАЦИЯ ====================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Инициализация языка (по умолчанию язык браузера)
  currentLang = getBrowserLang();
  updateLanguage(currentLang);
  
  // 2. Инициализация темы (по умолчанию тема браузера)
  initTheme();
  
  // 3. Кнопка переключения темы
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }
  
  // 4. Кнопка переключения языка
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const newLang = currentLang === 'ru' ? 'en' : 'ru';
      updateLanguage(newLang);
    });
  }
  
  // 5. Кнопка скачивания PDF
  const pdfBtn = document.getElementById('downloadPDF');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', downloadPDF);
  }
  
  // 6. Обработчик формы
  const form = document.getElementById('feedbackForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
  
  // 7. Роутинг для 404
  window.addEventListener('hashchange', handleRouting);
  handleRouting();
  
  // 8. Кнопка "на главную" на странице 404
  const backHome = document.getElementById('backHome');
  if (backHome) {
    backHome.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = 'home';
      handleRouting();
    });
  }
});
