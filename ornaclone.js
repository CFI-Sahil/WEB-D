

//for the card slider

document.addEventListener('DOMContentLoaded', function() {
  const cardWraps = document.querySelectorAll('.card-wrap');
  const scrollAmount = 298;

  cardWraps.forEach(cardWrap => {
    const leftBtn = cardWrap.querySelector('#left');
    const rightBtn = cardWrap.querySelector('#right');

    rightBtn?.addEventListener('click', () => {
      cardWrap.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });

    leftBtn?.addEventListener('click', () => {
      cardWrap.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
  });
});




//for banner sliding

const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-track .banner');
const totalSlides = slides.length;
let currentIndex = 0;
let intervalId;

function updateSlidePosition() {
  track.style.transition = 'transform 0.5s ease-in-out';
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlidePosition();
  updateDots(currentIndex); // add this
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlidePosition();
  updateDots(currentIndex); // add this
}

function startAutoPlay() {
  intervalId = setInterval(nextSlide, 3000);
}

function resetAutoPlay() {
  clearInterval(intervalId);
  startAutoPlay();
}


document.querySelector('.arrow.right').addEventListener('click', () => {
  nextSlide();
  resetAutoPlay();
});

document.querySelector('.arrow.left').addEventListener('click', () => {
  prevSlide();  
  resetAutoPlay();
});

// Start autoplay
updateSlidePosition();
startAutoPlay();


// === Pagination Logic ===
const dots = document.querySelectorAll('.carousel-pagination .dot');

// Function to update dot styling
function updateDots(index) {
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[index]) {
    dots[index].classList.add('active');
  }
}

// Dot click event listeners
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateSlidePosition();
    updateDots(index);
    resetAutoPlay();
  });
});

// Initialize dots
updateDots(currentIndex);




//for scroll in horizontal in 425px responsive

const slider = document.querySelector('.flex-set');
let isDown = false;
let startInx;
let scrollTestiLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  startInx = e.pageX - slider.offsetLeft;
  scrollTestiLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
});

slider.addEventListener('mouseup', () => {
  isDown = false;
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startInx) * 2; // scroll speed multiplier
  slider.scrollLeft = scrollTestiLeft - walk;
});

// Touch support
slider.addEventListener('touchstart', (e) => {
  startInx = e.touches[0].pageX - slider.offsetLeft;
  scrollTestiLeft = slider.scrollLeft;
});

slider.addEventListener('touchmove', (e) => {
  e.preventDefault();
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - startInx) * 2;
  slider.scrollLeft = scrollTestiLeft - walk;
});
//for scroll in horizontal in 425px responsive




//to make the testimonials slide and pop-up and auto play
const container = document.getElementById("testimonialContainer");
const cards = container.querySelectorAll(".testimonials-card");
const dotsContainer = document.getElementById("paginationDots"); // Already exists in HTML

let currentTesIndex = 0;
let autoSlide;

function updatePopupCard() {
  const containerCenter = container.scrollLeft + container.offsetWidth / 2;
  let closestCard = null;
  let closestDistance = Infinity;
  let closestIndex = 0;

  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distance = Math.abs(containerCenter - cardCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestCard = card;
      closestIndex = index;
    }
  });

  cards.forEach(card => card.classList.remove("popup-active"));
  if (closestCard) {
    closestCard.classList.add("popup-active");
  }

  // Update current index and dot colors
  currentTesIndex = closestIndex;
  const dots = document.querySelectorAll(".dot-10");
  dots.forEach(dot => dot.style.backgroundColor = "white");
  if (dots[currentTesIndex]) {
    dots[currentTesIndex].style.backgroundColor = "#6933be";
  }
}

function scrollToCard(index) {
  const total = cards.length;
  currentTesIndex = ((index % total) + total) % total; // handles both + and - overflow

  const targetCard = cards[currentTesIndex];
  container.scrollTo({
    left: targetCard.offsetLeft - (container.offsetWidth - targetCard.offsetWidth) / 2,
    behavior: "smooth"
  });

  // Update dot color immediately
  const dots = document.querySelectorAll(".dot-10");
  dots.forEach(dot => dot.style.backgroundColor = "white");
  if (dots[currentTesIndex]) {
    dots[currentTesIndex].style.backgroundColor = "#6933be";
  }
}

container.addEventListener("scroll", () => {
  requestAnimationFrame(updatePopupCard);
});


document.querySelectorAll(".dot-10").forEach((dot, index) => {
  dot.addEventListener("click", () => {
    scrollToCard(index);
  });
});

window.addEventListener("load", () => {
  updatePopupCard();
  autoSlide = setInterval(() => {
    scrollToCard(currentTesIndex + 1);
  }, 4000);
});


// its is for the dragable slide that we need in testimonials

let isDragging = false;
let startX;
let scrollLeft;

container.addEventListener('mousedown', (e) => {
  isDragging = true;
  container.classList.add('dragging'); // optional: for styling cursor
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
  clearInterval(autoSlide); // pause auto slide while dragging
});

container.addEventListener('mouseleave', () => {
  if (isDragging) {
    isDragging = false;
    container.classList.remove('dragging');
    resetAutoSlide(); // resume auto slide when drag ends
  }
});

container.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    container.classList.remove('dragging');
    resetAutoSlide(); // resume auto slide when drag ends
  }
});

container.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 2; // scroll-fast multiplier, adjust if needed
  container.scrollLeft = scrollLeft - walk;
});

