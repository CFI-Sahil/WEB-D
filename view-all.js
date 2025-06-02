
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
    // Categories
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
      .map(cb => cb.value.trim().toLowerCase());

    // Price ranges
    const selectedPriceRanges = Array.from(document.querySelectorAll('input[name="price"]:checked'))
      .map(cb => cb.value);

    // Discount ranges
    const selectedDiscountRanges = Array.from(document.querySelectorAll('input[name="discount"]:checked'))
      .map(cb => cb.value);

    const products = document.querySelectorAll("div.cl-dblock");

    products.forEach(product => {
      // Category filter
      const productCategory = (product.getAttribute("data-category") || "").trim().toLowerCase();
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(productCategory);

      // Price filter
      const priceElement = product.querySelector("p.text-16px");
      let productPrice = 0;
      if (priceElement) {
        const match = priceElement.textContent.match(/₹\s?(\d+)/);
        if (match) productPrice = parseInt(match[1]);
      }

      let priceMatch = selectedPriceRanges.length === 0;
      if (!priceMatch) {
        priceMatch = selectedPriceRanges.some(range => {
          const [minStr, maxStr] = range.split("-");
          const min = Number(minStr);
          const max = Number(maxStr);
          // Use min <= price < max to avoid overlap on boundaries
          return productPrice >= min && productPrice < max;
        });
      }

      // Discount filter
      const discountElement = product.querySelector("span.tex-fo");
      let productDiscount = 0;
      if (discountElement) {
        const discountMatch = discountElement.textContent.match(/(\d+)%/);
        if (discountMatch) productDiscount = parseInt(discountMatch[1]);
      }

      let discountMatch = selectedDiscountRanges.length === 0;
      if (!discountMatch) {
        discountMatch = selectedDiscountRanges.some(range => {
          const [minStr, maxStr] = range.split("-");
          const min = Number(minStr.replace("%", ""));
          const max = Number(maxStr.replace("%", ""));
          return productDiscount >= min && productDiscount <= max;
        });
      }

      const show = categoryMatch && priceMatch && discountMatch;
      product.style.display = show ? "" : "none";
    });

     // --- Show "No Products Found" Message ---
    const anyVisible = Array.from(products).some(product => product.style.display !== "none");
  document.getElementById("noProductsMessage").style.display = anyVisible ? "none" : "block";
  });