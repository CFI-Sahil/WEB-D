
function changeBorderColor(clickedCard) {
    // for image changing
    const newSrc = clickedCard.querySelector('img').getAttribute('src');

    const mainImage = document.querySelector('.easyZoom');
    mainImage.setAttribute('src', newSrc);

    //for changing border colour
    const allCards = document.querySelectorAll('.cur-poi-bor-round');
    allCards.forEach(card => card.classList.remove('active'));

    clickedCard.classList.add('active');
}

// this is for the jewellery tips
document.querySelectorAll('.expan-slide-cur-poi').forEach(section => {
    section.addEventListener('click', () => {
        const content = section.querySelector('.ove-flo-hid-duration');
        const iconPlus = section.querySelector('.icon-plus');
        const iconMinus = section.querySelector('.icon-minus');

        const isOpen = content.style.maxHeight === "25rem";

        content.style.maxHeight = isOpen ? "0rem" : "25rem";
        iconPlus.style.display = isOpen ? "block" : "none";
        iconMinus.style.display = isOpen ? "none" : "block";
    });
});


//this is for the swiper slide left right


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


// for zooming over img after hover

var option = {
    width: 578,
    height: 600,
    zoomWidth: 500,
    offset: { vertical: 0, horizontal: 60 },
    scale: 0.87
};

const wrapperDiv = document.querySelector('img.easyZoom').parentElement;
let zoomInstance = null;
const mainImg = wrapperDiv.querySelector('img.easyZoom');

// Function to update zoom image
function updateZoomImage(newSrc) {
  zoomImg.setAttribute('src', newSrc);

  // Re-initialize zoom if allowed
  if (window.innerWidth > 768) {
    zoomInstance = new ImageZoom(wrapperDiv, option);
  }
}

// ✅ Initial setup
if (window.innerWidth > 768) {
  zoomInstance = new ImageZoom(wrapperDiv, option);
}


  // Change image on thumbnail click
  document.querySelectorAll('.eazo').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const newSrc = thumb.getAttribute('src');

      // Remove old zoom instance
      wrapperDiv.innerHTML = `<img class="easyZoom" src="${newSrc}">`;

      // Re-initialize zoom with new image
      zoomInstance = new ImageZoom(wrapperDiv, option);

// new ImageZoom(wrapperDiv, option);

 });
  });






// for add to cart yoyoy

document.getElementById("add-to-bag-btn").addEventListener("click", function () {
    const title = document.getElementById("main-product-title").textContent.trim();
    const price = document.getElementById("main-product-price").textContent.trim();
    const image = document.getElementById("main-product-img").getAttribute("src");



    const product = {
        title,
        price,
        image,
        quantity: 1
    };

    // Save to localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Redirect to cart
    window.location.href = "cart.html";
});






// for recently viewed

document.querySelectorAll(".all_anchor").forEach(anchor => {
  anchor.addEventListener("click", () => {
    const title = anchor.getAttribute("data-title");
    const price = anchor.getAttribute("data-price");
    const image = anchor.getAttribute("data-image");
    const product = { title, price, image };

    let viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    // Remove if already viewed to avoid duplicates
    viewed = viewed.filter(item => item.title !== product.title);

    // Add to beginning
    viewed.unshift(product);

    // Limit to last 8
    if (viewed.length > 8) viewed = viewed.slice(0, 8);

    localStorage.setItem("recentlyViewed", JSON.stringify(viewed));
  });
});


//This is for card in onw row for tab view


const scrollRow = document.querySelector('.scroll-img-row');
const images = scrollRow.querySelectorAll('img');
const pagination = document.querySelector('.pagination-n-multi');

pagination.innerHTML = '';


for (let i = 0; i < 4; i++) {
  const pageBtn = document.createElement('span');

  
  if (i === 0) pageBtn.classList.add('current-page');
  pagination.appendChild(pageBtn);

  pageBtn.addEventListener('click', () => {
    scrollRow.scrollTo({
      left: images[i].offsetLeft,
      behavior: 'smooth',
    });
    pagination.querySelectorAll('span').forEach(btn => btn.classList.remove('current-page'));
    pageBtn.classList.add('current-page');
  });
}


scrollRow.addEventListener('scroll', () => {
  let scrollLeft = scrollRow.scrollLeft;
  let activeIndex = 0;
  images.forEach((img, idx) => {
    if (scrollLeft >= img.offsetLeft - img.clientWidth / 2) {
      activeIndex = idx;
    }
  });
  pagination.querySelectorAll('span').forEach((btn, i) => {
    btn.classList.toggle('current-page', i === activeIndex);
  });
});




// Open popup and set zoom image
document.querySelectorAll(".scroll-img-row img").forEach(image => {
  image.onclick = () => {
    const popup = document.querySelector('.popup-img-for-7645');
    const tile = popup.querySelector('.tile');
    const photo = tile.querySelector('.photo');
    const imgSrc = image.getAttribute('src');

    popup.style.display = 'block';
    tile.setAttribute('data-image', imgSrc);
    photo.style.backgroundImage = `url(${imgSrc})`;
    
    // Reset zoom and pan on image load
    photo.style.transform = 'scale(1) translate(0,0)';
  };
});

// Close popup on X click
document.querySelector('.popup-img-for-7645 span').onclick = () => {
  document.querySelector('.popup-img-for-7645').style.display = 'none';
};

// Close popup on outside click
window.onclick = (event) => {
  const popup = document.querySelector('.popup-img-for-7645');
  if (popup.style.display === 'block' && event.target === popup) {
    popup.style.display = 'none';
  }
};

// Zoom & drag functionality for .tile images
document.querySelectorAll('.tile').forEach(tile => {
  const photo = tile.querySelector('.photo');
  let scale = 1;
  let posX = 0;
  let posY = 0;
  let isDragging = false;
  let startX, startY;

  // Handle mouse wheel for zoom
  tile.addEventListener('wheel', e => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    scale = Math.min(4, Math.max(1, scale + delta));
    updateTransform();
  });

  // Handle mouse drag for pan
  tile.addEventListener('mousedown', e => {
    e.preventDefault();
    isDragging = true;
    startX = e.clientX - posX;
    startY = e.clientY - posY;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    posX = e.clientX - startX;
    posY = e.clientY - startY;
    updateTransform();
  });

  // Touch events for mobile pinch and drag
  let lastScale = scale;
  let initialDistance = null;

  tile.addEventListener('touchstart', e => {
    if (e.touches.length === 2) {
      initialDistance = getDistance(e.touches[0], e.touches[1]);
      lastScale = scale;
    } else if (e.touches.length === 1) {
      isDragging = true;
      startX = e.touches[0].clientX - posX;
      startY = e.touches[0].clientY - posY;
    }
  }, { passive: false });

  tile.addEventListener('touchmove', e => {
    e.preventDefault();
    if (e.touches.length === 2) {
      const currentDistance = getDistance(e.touches[0], e.touches[1]);
      scale = lastScale * (currentDistance / initialDistance);
      scale = Math.min(4, Math.max(1, scale));
      updateTransform();
    } else if (e.touches.length === 1 && isDragging) {
      posX = e.touches[0].clientX - startX;
      posY = e.touches[0].clientY - startY;
      updateTransform();
    }
  }, { passive: false });

  tile.addEventListener('touchend', e => {
    if (e.touches.length === 0) {
      isDragging = false;
    }
  });

  function updateTransform() {
    const maxX = (scale - 1) * photo.clientWidth / 2;
    const maxY = (scale - 1) * photo.clientHeight / 2;
    posX = Math.min(maxX, Math.max(-maxX, posX));
    posY = Math.min(maxY, Math.max(-maxY, posY));
    photo.style.transform = `scale(${scale}) translate(${posX / scale}px, ${posY / scale}px)`;
  }

  function getDistance(t1, t2) {
    return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
  }
});



