

//for the card slider

document.addEventListener('DOMContentLoaded', function() {
  const cardWraps = document.querySelectorAll('.card-wrap');
  const scrollAmount = 392;

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



// for banner sliding

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
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlidePosition();
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

