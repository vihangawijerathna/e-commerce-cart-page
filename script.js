document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 10.0 },
    { id: 2, name: "Product 2", price: 20.0 },
    { id: 3, name: "Product 3", price: 30.0 },
  ];

  const cart = [];
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to Cart</button>
        `;

    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    console.log(product);
    console.log(cart);

    renderCart();
  }

  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = parseInt(e.target.getAttribute("data-index"));
      removeFromCart(index);
    }
  });

  function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `${item.name} - $${item.price.toFixed(2)}
        <button class="remove-btn" data-index="${index}">Remove</button>`;
        cartItem.classList.add("cart-item");
        cartItems.appendChild(cartItem);
        totalPriceDisplay.textContent = `Total Price: $${totalPrice.toFixed(
          2
        )}`;
      });
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
    }
  }

  checkOutBtn.addEventListener("click", () => {
    console.log(totalPriceDisplay.textContent);
    cart.length = 0;
    alert("Thank you for your purchase!");
    renderCart();
  });
});
