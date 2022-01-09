// ADD TO CART START

const cartContainer = document.querySelector(".cart-item-element");

const cartHandler = function () {
  for (let el in paginatedItems) {
    if (this.id == paginatedItems[el].id) {
      // console.log(this.id, paginatedItems[el].id)
      let cartContent = document.querySelectorAll(".cart-item-title");
      let ifInCart = false;
      for (i = 0; i < cartContent.length; i++) {
        if (cartContent[i].textContent == paginatedItems[el].description) {
          cartContent[i].parentElement.children[1].children[0].textContent++;
          ifInCart = true;
          showSnackbar(paginatedItems[el].description);
        }
      }
      if (ifInCart == false) {
        let cartElement = document.createElement("div");
        cartElement.classList.add("cart-item-element");
        cartElement.innerHTML = `<div class="cart-item-holder">
                <div class="cart-item-image">
                    <img src="${paginatedItems[el].imageCart}" alt="${paginatedItems[el].description}"
                        class="cart-item-image-thumbnail">
                </div>
                <div class="cart-item-data">
                    <p class="cart-item-title">${paginatedItems[el].description}</p>
                    <p class="cart-item-quantity">Quantity: <span>1</span></p>
                    <p class="cart-item-price">$<span>${paginatedItems[el].value}</span></p>
                    <i class="fas fa-times cart-item-remove" onclick="removeCartItem(this)" title="Remove"></i>
                </div>
            </div>`;
        cartContainer.appendChild(cartElement);
        showSnackbar(paginatedItems[el].description);
      }
    }
  }
  countCartTotal();
};

// ADD TO CART END

const removeCartItem = function (element) {
  element.parentElement.parentElement.parentElement.remove();
  countCartTotal();
};

const countCartTotal = function () {
  const cartItemsPrice = document.querySelectorAll(".cart-item-price");
  const cartItemsQuantity = document.querySelectorAll(".cart-item-quantity span");
  const cartItemsValue = [];

  for (i = 0; i < cartItemsPrice.length; i++) {
    cartItemsValue.push(cartItemsPrice[i].textContent.slice(1) * cartItemsQuantity[i].textContent);
  }

  const cartItemsTotal = cartItemsValue.reduce((a, b) => a + b, 0);

  document.querySelector(".cart-summary-total-value span").textContent = cartItemsTotal;

  // UPDATE NUMBER OF ITEMS IN CART

  const itemsCount = document.querySelector(".cart-content");

  if (cartItemsPrice.length > 0 && itemsCount.classList.contains("hide")) {
    itemsCount.classList.remove("hide");
  } else if (cartItemsPrice.length == 0) {
    itemsCount.classList.add("hide");
  }

  const itemsInCart = [];
  cartItemsQuantity.forEach((e) => {
    itemsInCart.push(parseFloat(e.textContent));
  });

  itemsCount.textContent = itemsInCart.reduce((a, b) => a + b, 0);

  if (itemsCount.textContent > 9) {
    itemsCount.classList.add("cart-content-over-10");
  }

  if (itemsCount.classList.contains("cart-content-over-10") && itemsCount.textContent < 10) {
    itemsCount.classList.remove("cart-content-over-10");
  }
};

const showSnackbar = function (productName) {
  const snackbar = document.querySelector(".snackbar");
  snackbar.children[0].textContent = productName;
  snackbar.classList.add("show");
  setTimeout(function () {
    snackbar.classList.remove("show");
  }, 1500);
};

const openCart = document.querySelector(".cart");
const cartItems = document.querySelector(".cart-open");
openCart.addEventListener("click", () => {
  cartItems.classList.toggle("hide");
});
