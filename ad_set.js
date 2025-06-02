
// dont touch this, it is for apply filter 


document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const applyBtn = document.getElementById('applyFilterBtn');
    
    function toggleApplyButton() {
        const isChecked = Array.from(checkboxes).some(cb => cb.checked);
        applyBtn.style.display = isChecked ? 'inline-block' : 'none';
    }
    
    checkboxes.forEach(cb => {
        cb.addEventListener('change', toggleApplyButton);
    });
});

// dont touch this, it is for apply filter 

  

document.getElementById("applyFilterBtn").addEventListener("click", function () {
  // Get selected price ranges
  const selectedPriceRanges = Array.from(document.querySelectorAll('input[name="price"]:checked'))
    .map(cb => cb.value.trim());

  // Get selected discount ranges
  const selectedDiscountRanges = Array.from(document.querySelectorAll('input[name="discount"]:checked'))
    .map(cb => cb.value.trim());

  const products = document.querySelectorAll("div.cl-dblock");

  products.forEach(product => {
    // --- Price Filtering ---
    const priceElement = product.querySelector("p.text-16px");
    let productPrice = 0;
    if (priceElement) {
      const match = priceElement.textContent.match(/₹\s?([\d,]+)/);
      if (match) productPrice = parseInt(match[1].replace(/,/g, ""));
    }

    let priceMatch = selectedPriceRanges.length === 0;
    if (!priceMatch) {
      priceMatch = selectedPriceRanges.some(range => {
        if (range.includes("and above")) {
          const min = parseInt(range);
          return productPrice >= min;
        } else {
          const [minStr, maxStr] = range.split("-");
          const min = parseInt(minStr);
          const max = parseInt(maxStr);
          return productPrice >= min && productPrice <= max;
        }
      });
    }

    // --- Discount Filtering ---
    const discountElement = product.querySelector("span.tex-fo");
    let productDiscount = 0;
    if (discountElement) {
      const discountMatch = discountElement.textContent.match(/(\d+)%/);
      if (discountMatch) productDiscount = parseInt(discountMatch[1]);
    }

    let discountMatch = selectedDiscountRanges.length === 0;
    if (!discountMatch) {
      discountMatch = selectedDiscountRanges.some(range => {
        if (range.includes("and above")) {
          const min = parseInt(range);
          return productDiscount >= min;
        } else {
          const [minStr, maxStr] = range.replace("%", "").split("-");
          const min = parseInt(minStr);
          const max = parseInt(maxStr);
          return productDiscount >= min && productDiscount <=  max;
        }
      });
    }

    const show = priceMatch && discountMatch;
    product.style.display = show ? "" : "none";
  });

  // --- Show "No Products Found" Message ---
  const anyVisible = Array.from(products).some(product => product.style.display !== "none");
  document.getElementById("noProductsMessage").style.display = anyVisible ? "none" : "block";
});
