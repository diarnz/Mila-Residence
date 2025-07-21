// i18next initialization and language switching functionality
let currentLanguage = localStorage.getItem('language') || 'en';

console.log('i18n.js loaded, current language:', currentLanguage);

// Function to initialize i18next
function initializeI18n() {
  if (typeof i18next === 'undefined') {
    console.error('i18next not loaded');
    return;
  }
  
  if (typeof translations === 'undefined') {
    console.error('translations not loaded');
    return;
  }

  i18next.init({
    lng: currentLanguage,
    fallbackLng: 'en',
    resources: translations,
    debug: false
  }).then(() => {
    console.log('i18next initialized successfully');
    updateContent();
    setupLanguageSwitcher();
  }).catch(error => {
    console.error('Error initializing i18next:', error);
  });
}

// Function to setup language switcher
function setupLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-btn');
  console.log('Setting up language switcher, found buttons:', langButtons.length);
  
  langButtons.forEach(btn => {
    // Remove existing event listeners
    btn.removeEventListener('click', handleLanguageClick);
    // Add new event listener
    btn.addEventListener('click', handleLanguageClick);
  });
  
  // Update active state
  updateLanguageSwitcher();
}

// Handle language button clicks
function handleLanguageClick(e) {
  e.preventDefault();
  e.stopPropagation();
  console.log('Language button clicked:', this.getAttribute('data-lang'));
  const lang = this.getAttribute('data-lang');
  changeLanguage(lang);
}

// Function to update all translatable elements
function updateContent() {
  console.log('Updating content for language:', currentLanguage);
  
  // Navigation
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = i18next.t(key);
    if (translation && translation !== key) {
      element.textContent = translation;
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    const translation = i18next.t(key);
    if (translation && translation !== key) {
      element.placeholder = translation;
    }
  });

  // Update HTML content for elements that need HTML
  document.querySelectorAll('[data-i18n-html]').forEach(element => {
    const key = element.getAttribute('data-i18n-html');
    const translation = i18next.t(key);
    if (translation && translation !== key) {
      element.innerHTML = translation;
    }
  });

  // Update document title if it has a translation key
  const titleElement = document.querySelector('title[data-i18n]');
  if (titleElement) {
    const key = titleElement.getAttribute('data-i18n');
    const translation = i18next.t(key);
    if (translation && translation !== key) {
      document.title = translation;
    }
  }

  // Update language switcher active state
  updateLanguageSwitcher();
}

// Function to update language switcher UI
function updateLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-btn');
  console.log('Found language buttons:', langButtons.length);
  
  langButtons.forEach(btn => {
    const lang = btn.getAttribute('data-lang');
    if (lang === currentLanguage) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Function to change language
function changeLanguage(lang) {
  console.log('Changing language to:', lang);
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  
  if (typeof i18next !== 'undefined') {
    i18next.changeLanguage(lang).then(() => {
      console.log('Language changed successfully to:', lang);
      updateContent();
    }).catch(error => {
      console.error('Error changing language:', error);
    });
  } else {
    console.error('i18next not available');
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, checking for i18next and translations');
  
  // Check if i18next and translations are available
  if (typeof i18next !== 'undefined' && typeof translations !== 'undefined') {
    initializeI18n();
  } else {
    // Wait a bit and try again
    setTimeout(() => {
      if (typeof i18next !== 'undefined' && typeof translations !== 'undefined') {
        initializeI18n();
      } else {
        console.error('i18next or translations still not available after timeout');
        // Fallback: just setup the language switcher
        setupLanguageSwitcher();
      }
    }, 100);
  }
});

// Also try to initialize immediately if everything is already loaded
if (typeof i18next !== 'undefined' && typeof translations !== 'undefined') {
  initializeI18n();
}

// Test function - can be called from browser console
window.testLanguageSwitch = function() {
  console.log('Testing language switch...');
  console.log('Current language:', currentLanguage);
  console.log('i18next available:', typeof i18next !== 'undefined');
  console.log('translations available:', typeof translations !== 'undefined');
  console.log('Language buttons found:', document.querySelectorAll('.lang-btn').length);
  
  // Try to change language
  const newLang = currentLanguage === 'en' ? 'sq' : 'en';
  console.log('Attempting to change to:', newLang);
  changeLanguage(newLang);
};

// Export functions for use in other scripts
window.i18nUtils = {
  changeLanguage,
  updateContent,
  currentLanguage: () => currentLanguage,
  setupLanguageSwitcher
}; 