// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  const logoImg = document.getElementById('navbar-logo');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    if (logoImg) logoImg.src = '/assets/images/logoupd1.png';
  } else {
    navbar.classList.remove('scrolled');
    if (logoImg) logoImg.src = '/assets/images/logoupdBlack.png';
  }
});

// Hamburger menu toggle functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const mainContent = document.querySelector('.main-content');

if (hamburger && navMenu && mainContent) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    mainContent.classList.toggle('blurred');
  });
  
  navMenu.addEventListener('click', (e) => {
    if (e.target === navMenu) { // Optional: close when clicking outside menu
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      mainContent.classList.remove('blurred');
    }
  });
}

// Close menu when clicking on a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    if (hamburger) hamburger.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
    if (mainContent) mainContent.classList.remove('blurred');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    if (mainContent) mainContent.classList.remove('blurred');
  }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Show success message
    const messageDiv = document.getElementById('formMessage');
    if (messageDiv) {
      messageDiv.style.display = 'block';
      messageDiv.style.backgroundColor = '#d4edda';
      messageDiv.style.color = '#155724';
      messageDiv.style.border = '1px solid #c3e6cb';
      messageDiv.textContent = 'Thank you for your message! We will get back to you soon.';
      
      // Clear form
      this.reset();
      
      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.style.display = 'none';
      }, 5000);
    }
  });
}

// Image swap on click in Hero section
const imageContainer = document.querySelector('.image-container');
if (imageContainer) {
  imageContainer.addEventListener('click', () => {
    const image1 = document.querySelector('.image-1');
    const image2 = document.querySelector('.image-2');

    if (image1 && image2) {
      const image1Opacity = window.getComputedStyle(image1).opacity;

      if (image1Opacity === "1") {
        image1.style.opacity = "0.3";
        image2.style.opacity = "1";
        image1.style.zIndex = "1";
        image2.style.zIndex = "2";
      } else {
        image1.style.opacity = "1";
        image2.style.opacity = "0.3";
        image1.style.zIndex = "2";
        image2.style.zIndex = "1";
      }
    }
  });
}

// Image Slider for Entry Section (4 images)
let currentImageSlideIndex = 0;
const imageSlides = document.querySelectorAll('.slider-container .image-slide');
const imageDots = document.querySelectorAll('.image-slider .dot');

function showImageSlide(index, direction = 1) {
  imageSlides.forEach((slide, i) => {
    slide.classList.remove('active', 'slide-left', 'slide-right');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}

function changeImageSlide(direction) {
  const prevIndex = currentImageSlideIndex;
  currentImageSlideIndex += direction;
  if (currentImageSlideIndex >= imageSlides.length) {
    currentImageSlideIndex = 0;
  } else if (currentImageSlideIndex < 0) {
    currentImageSlideIndex = imageSlides.length - 1;
  }
  animateImageSlide(prevIndex, currentImageSlideIndex, direction);
}

function currentImageSlide(index) {
  const prevIndex = currentImageSlideIndex;
  currentImageSlideIndex = index - 1;
  const direction = (currentImageSlideIndex > prevIndex) ? 1 : -1;
  animateImageSlide(prevIndex, currentImageSlideIndex, direction);
}

function animateImageSlide(prev, next, direction) {
  if (prev === next) return;
  imageSlides.forEach((slide, i) => {
    slide.classList.remove('active', 'slide-left', 'slide-right');
  });
  imageSlides[prev].classList.add(direction > 0 ? 'slide-left' : 'slide-right');
  imageSlides[next].classList.add('active');
  imageSlides[next].classList.add(direction > 0 ? 'slide-right' : 'slide-left');
  setTimeout(() => {
    imageSlides[next].classList.remove('slide-left', 'slide-right');
  }, 500);
  imageDots.forEach(dot => dot.classList.remove('active'));
  imageDots[next].classList.add('active');
}

// Photo Tour Slider
let currentPhotoSlideIndex = 0;
const photoSlidesContainer = document.querySelectorAll('.photo-slide-container .slide');
const photoDots = document.querySelectorAll('.photo-slider .dot');

function showPhotoSlide(index, direction = 1) {
  photoSlidesContainer.forEach((slide, i) => {
    slide.classList.remove('active', 'slide-left', 'slide-right');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}

function changePhotoSlide(direction) {
  const prevIndex = currentPhotoSlideIndex;
  currentPhotoSlideIndex += direction;
  if (currentPhotoSlideIndex >= photoSlidesContainer.length) {
    currentPhotoSlideIndex = 0;
  } else if (currentPhotoSlideIndex < 0) {
    currentPhotoSlideIndex = photoSlidesContainer.length - 1;
  }
  animatePhotoSlide(prevIndex, currentPhotoSlideIndex, direction);
}

function currentPhotoSlide(index) {
  const prevIndex = currentPhotoSlideIndex;
  currentPhotoSlideIndex = index - 1;
  const direction = (currentPhotoSlideIndex > prevIndex) ? 1 : -1;
  animatePhotoSlide(prevIndex, currentPhotoSlideIndex, direction);
}

function animatePhotoSlide(prev, next, direction) {
  if (prev === next) return;
  photoSlidesContainer.forEach((slide, i) => {
    slide.classList.remove('active', 'slide-left', 'slide-right');
  });
  photoSlidesContainer[prev].classList.add(direction > 0 ? 'slide-left' : 'slide-right');
  photoSlidesContainer[next].classList.add('active');
  photoSlidesContainer[next].classList.add(direction > 0 ? 'slide-right' : 'slide-left');
  setTimeout(() => {
    photoSlidesContainer[next].classList.remove('slide-left', 'slide-right');
  }, 500);
  photoDots.forEach(dot => dot.classList.remove('active'));
  photoDots[next].classList.add('active');
}

// Scroll-triggered animations
function handleScrollAnimations() {
  const scrollElements = document.querySelectorAll('.scroll-animate');
  
  scrollElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('animate');
    }
  });
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing sliders and animations...');
  
  // Initialize scroll animations
  handleScrollAnimations();
  window.addEventListener('scroll', handleScrollAnimations);
  
  if (photoSlidesContainer.length > 0) {
    showPhotoSlide(currentPhotoSlideIndex);
    setInterval(() => {
      changePhotoSlide(1);
    }, 5000); // Changes slide every 5 seconds
  }

  if (imageSlides.length > 0) {
    showImageSlide(currentImageSlideIndex);
  }
});

// Amenities Slider Logic
(function() {
  const slider = document.getElementById('amenities-slider');
  const cards = slider ? Array.from(slider.querySelectorAll('.amenity-card')) : [];
  const prevBtn = document.getElementById('amenities-prev');
  const nextBtn = document.getElementById('amenities-next');
  const dotsContainer = document.getElementById('amenities-dots');

  // Debug logging
  console.log('Amenities slider elements:', {
    slider: !!slider,
    cards: cards.length,
    prevBtn: !!prevBtn,
    nextBtn: !!nextBtn,
    dotsContainer: !!dotsContainer
  });

  if (!slider || cards.length === 0 || !prevBtn || !nextBtn || !dotsContainer) {
    console.log('Amenities slider not initialized - missing elements');
    return;
  }

  let currentIndex = 0;
  
  function getCardWidth() {
    if (cards.length === 0) return 0;
    const card = cards[0];
    const cardStyle = window.getComputedStyle(card);
    const cardWidth = card.offsetWidth;
    const gap = parseInt(window.getComputedStyle(slider).gap || 0);
    return cardWidth + gap;
  }
  
  function getVisibleCards() {
    if (window.innerWidth <= 700) return 1;
    if (window.innerWidth <= 1000) return 2;
    return 3;
  }
  
  function updateSlider() {
    try {
      const cardWidth = getCardWidth();
      const visibleCards = getVisibleCards();
      const maxIndex = Math.max(0, cards.length - visibleCards);
      
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;
      
      slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      updateArrows(maxIndex);
      updateDots(maxIndex);
    } catch (error) {
      console.error('Error updating amenities slider:', error);
    }
  }
  
  function updateArrows(maxIndex) {
    if (!prevBtn || !nextBtn) return;
    
    prevBtn.disabled = (currentIndex === 0);
    nextBtn.disabled = (currentIndex === maxIndex);
    prevBtn.style.opacity = prevBtn.disabled ? 0.4 : 1;
    nextBtn.style.opacity = nextBtn.disabled ? 0.4 : 1;
    prevBtn.style.pointerEvents = prevBtn.disabled ? 'none' : 'auto';
    nextBtn.style.pointerEvents = nextBtn.disabled ? 'none' : 'auto';
  }
  
  function updateDots(maxIndex) {
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('span');
      dot.className = 'amenities-dot' + (i === currentIndex ? ' active' : '');
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    }
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex--;
      updateSlider();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex++;
      updateSlider();
    });
  }
  
  window.addEventListener('resize', updateSlider);
  
  // Initial setup with a small delay to ensure proper rendering
  console.log('Initializing amenities slider...');
  setTimeout(() => {
    updateSlider();
    console.log('Amenities slider initialized successfully');
  }, 100);
})();

// Apartment Layout Switcher
const apartmentBtns = document.querySelectorAll('.apartment-btn');
const apartmentItems = document.querySelectorAll('.apartment-layout-item');

apartmentBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active from all buttons
    apartmentBtns.forEach(b => b.classList.remove('active'));
    // Add active to clicked button
    btn.classList.add('active');
    // Show the corresponding layout
    const apt = btn.getAttribute('data-apartment');
    apartmentItems.forEach(item => {
      if (item.getAttribute('data-apartment') === apt) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });
});

// Apartment slider logic
function setupApartmentSlider() {
  const buttons = document.querySelectorAll('.apartment-btn');
  const items = document.querySelectorAll('.apartment-layout-item');
  let current = 0;
  function show(index) {
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
    buttons.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });
    current = index;
  }
  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => show(i));
  });
  window.changeApartmentSlide = function(dir) {
    let next = (current + dir + items.length) % items.length;
    show(next);
  };
  show(0);
}
document.addEventListener('DOMContentLoaded', setupApartmentSlider);

// Apartment button page logic
function setupApartmentButtonPages() {
  const buttons = document.querySelectorAll('.apartment-btn');
  const btnsPerPage = 4;
  let page = 0;
  function showPage(p) {
    buttons.forEach((btn, i) => {
      btn.classList.toggle('hidden', i < p * btnsPerPage || i >= (p + 1) * btnsPerPage);
    });
    page = p;
  }
  window.changeApartmentButtonPage = function(dir) {
    const maxPage = Math.floor((buttons.length - 1) / btnsPerPage);
    let next = page + dir;
    if (next < 0) next = maxPage;
    if (next > maxPage) next = 0;
    showPage(next);
  };
  showPage(0);
}
document.addEventListener('DOMContentLoaded', setupApartmentButtonPages);

// Counter animation on scroll into view
function animateCounters() {
  const countersSection = document.querySelector('.counters-red-bg');
  if (!countersSection) return;
  const counters = countersSection.querySelectorAll('.counter-number');
  let animated = false;

  function runCounter(counter) {
    const target = +counter.getAttribute('data-count');
    const duration = 1600;
    const start = 0;
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * (target - start) + start);
      counter.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    }
    requestAnimationFrame(update);
  }

  function onScroll() {
    const rect = countersSection.getBoundingClientRect();
    if (!animated && rect.top < window.innerHeight - 80) {
      animated = true;
      counters.forEach(runCounter);
      window.removeEventListener('scroll', onScroll);
    }
  }

  window.addEventListener('scroll', onScroll);
  onScroll();
}

document.addEventListener('DOMContentLoaded', animateCounters);
