
window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".for-col-mar-pad");

  function loadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cartItems) {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }

  function renderCart() {
    const cartItems = loadCart();
    container.innerHTML = `
      <div class="hid-item-inline">
        <p class="col-span-2">Item</p>
        <p>Quantity</p>
        <p>Total</p>
      </div>
    `;

    cartItems.forEach((item, index) => {
      const html = `
        <div class="grid-5-in-row">
          <div class="grid-2-with-price">
            <div class="card-in-bor">
              <div class="pos-rel-for-img">
                <img src="${item.image}" alt="${item.title}">
              </div>
            </div>
            <div>
              <h3 class="maj-h30">${item.title}</h3>
              <h3 class="mar-20-col-h30">
                <span>${item.price}</span>
              </h3>
              <small style="color: rgb(113,116,120); font-size: 10px;">Inclusive of all taxes</small>
            </div>
          </div>
          <div class="inc-quan-minus">
            <div class="for-minus-low" data-index="${index}">-</div>
            <div class="flex-col-2">
              <div class="fbg-white-one-two">
                <input class="inp-for-num" type="text" disabled value="${item.quantity}">
              </div>
            </div>
            <div class="for-plus-high" data-index="${index}">+</div>
          </div>
          <div class="hid-bl-change-price">${item.price}</div>
          <div class="cro-remove" data-index="${index}" style="cursor:pointer; color: #690bbd; font-weight:600;">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="hei-wid-rem" style="width:18px; height:18px; vertical-align: middle;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path>
            </svg>
            Remove
          </div>
        </div>
      `;
      container.insertAdjacentHTML("beforeend", html);
    });
  }

  // Handle clicks with event delegation
  container.addEventListener("click", (event) => {
    const target = event.target;

    // Remove item
    if (target.closest(".cro-remove")) {
      const index = target.closest(".cro-remove").getAttribute("data-index");
      let cartItems = loadCart();
      cartItems.splice(index, 1);
      saveCart(cartItems);
      renderCart();
    }

    // Increase quantity
    else if (target.closest(".for-plus-high")) {
      const index = target.closest(".for-plus-high").getAttribute("data-index");
      let cartItems = loadCart();
      cartItems[index].quantity++;
      saveCart(cartItems);
      renderCart();
    }

    // Decrease quantity
    else if (target.closest(".for-minus-low")) {
      const index = target.closest(".for-minus-low").getAttribute("data-index");
      let cartItems = loadCart();
      if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        saveCart(cartItems);
        renderCart();
      }
    }
  });

  renderCart();
});


