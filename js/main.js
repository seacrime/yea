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
    about_text1: "Я просто Вовчик, увлекаюсь веб-разработкой и технологиями. Постоянно учусь новому и совершенствую свои навыки.",
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
    footer: "© 2025 Владимир Шелекасов. Все права защищены.",
    "404text": "Страница не найдена",
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
    about_text1: "I'm just Vovchik, passionate about web development and technology. Always learning new things.",
    skills_title: "Skills",
    edu_title: "Education",
    projects_title: "Projects",
    contact_title: "Contact Form",
    proj2: "not yet",
    form_name: "Full Name *",
    form_phone: "Phone * +7XXXXXXXXXX",
    form_email: "Email *",
    form_question: "Your question *",
    send_btn: "Submit",
    footer: "© 2025 Vladimir Shelekasov. All rights reserved.",
    "404text": "Page not found",
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

function updateLanguage(lang) {
  currentLang = lang;
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });
  
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
  
  const langTextSpan = document.getElementById('langText');
  if (langTextSpan) langTextSpan.innerText = lang === 'ru' ? 'EN' : 'RU';
  
  updateThemeButtonText();
}

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
  applyTheme(savedTheme || getSystemTheme());
}

// ==================== PDF ====================
function downloadPDF() {
  const originalTitle = document.title;
  document.title = "Shelekasov_Vladimir_Resume";
  
  const printStyles = document.createElement('style');
  printStyles.textContent = `
    @media print {
      body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
      .controls, .nav-links, .hero-buttons, .github-link, .contact-form button,
      #themeToggle, #langToggle, #downloadPDF, footer .toggle-btn, header .controls, #downloadPDF2 {
        display: none !important;
      }
      .container { max-width: 100%; padding: 0; }
      section { page-break-inside: avoid; padding: 20px 0; }
      a { text-decoration: none; color: black; }
      .skill-card, .project-card, .edu-card, .about-card { break-inside: avoid; border: 1px solid #ccc; }
    }
  `;
  document.head.appendChild(printStyles);
  window.print();
  setTimeout(() => {
    document.head.removeChild(printStyles);
    document.title = originalTitle;
  }, 100);
}

// ==================== ВАЛИДАЦИЯ ====================
function validatePhone(phone) {
  const digits = phone.replace(/\D/g, '');
  return (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) || digits.length === 10;
}

function validateEmail(email) {
  return /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email);
}

function handleFormSubmit(e) {
  e.preventDefault();
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
    console.log('📝 Форма отправлена:', { name, phone, email, question });
    statusMsg.innerText = translations[currentLang].success_msg;
    statusMsg.style.color = '#22c55e';
    document.getElementById('feedbackForm').reset();
    setTimeout(() => { statusMsg.innerText = ''; }, 3000);
  }
}

// ==================== РОУТИНГ 404 ====================
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
  currentLang = getBrowserLang();
  updateLanguage(currentLang);
  initTheme();
  
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }
  
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const newLang = currentLang === 'ru' ? 'en' : 'ru';
      updateLanguage(newLang);
    });
  }
  
  const pdfBtns = [document.getElementById('downloadPDF'), document.getElementById('downloadPDF2')];
  pdfBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', downloadPDF);
  });
  
  const form = document.getElementById('feedbackForm');
  if (form) form.addEventListener('submit', handleFormSubmit);
  
  window.addEventListener('hashchange', handleRouting);
  handleRouting();
  
  const backHome = document.getElementById('backHome');
  if (backHome) {
    backHome.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = 'home';
      handleRouting();
    });
  }
});
