// PAGINATION

let resultsNumberRange = document.querySelector(".results-number-range");
let resultsNumberAll = document.querySelector(".results-number-all");
let addToCartButton;
// setTimeout(displayList(filterResult,list_element,itemsPerPage,currentPage),1000);
async function displayList(wrapper, rows_per_page, page) {
  filterResult = await getProducts();
  wrapper.innerHTML = "";

  let start = rows_per_page * page - rows_per_page;
  let end = start + rows_per_page;
  paginatedItems = filterResult.slice(start, end);

  resultsNumberAll.innerHTML = filterResult.length;
  resultsNumberRange.innerHTML = `${start + 1} - ${end <= filterResult.length ? end : filterResult.length}`;

  for (let i = 0; i < paginatedItems.length; i++) {
    let item_element = document.createElement("div");
    item_element.innerHTML = `<div class="product-card">
    <img src="${paginatedItems[i].image}" onmouseover="this.src='${paginatedItems[i].imageHover}'" onmouseout="this.src='${paginatedItems[i].image}'" alt="${paginatedItems[i].name}" class="product-card-background">
    <div class="favorite-icon"><i class="far fa-heart"></i></div>
    <div class="product-card-data">
        <p class="product-title">${paginatedItems[i].description}</p>
        <p class="product-price">${paginatedItems[i].price}</p>
    </div>
    <div class="add-to-cart" id="${paginatedItems[i].id}">
        <img src="cart.png" alt="cart" class="product-cart">
        <p class="add-to-cart-text">Add to cart</p>
    </div>
    </div>`;
    wrapper.appendChild(item_element);
  }
  countBrands();
  countSizes();
  countCategories();
  addToCartButton = document.querySelectorAll(".add-to-cart");
  addToCartButton.forEach((e) => {
    e.addEventListener("click", cartHandler);
  });
}

async function SetupPagination(wrapper, rows_per_page) {
  filterResult = await getProducts();
  wrapper.innerHTML = "";

  let page_count = Math.ceil(filterResult.length / rows_per_page);
  for (let i = 1; i < page_count + 1; i++) {
    let btn = PaginationButton(i, filterResult);
    wrapper.appendChild(btn);
  }
}

function PaginationButton(page, items) {
  let button = document.createElement("button");
  page < 10 ? (button.innerText = "0" + page) : (button.innerText = page);

  if (currentPage == page) button.classList.add("active");

  button.addEventListener("click", function () {
    currentPage = page;
    displayList(list_element, itemsPerPage, currentPage);
    let current_btn = document.querySelector(".pagenumbers button.active");
    current_btn.classList.remove("active");
    button.classList.add("active");
  });

  return button;
}

displayList(list_element, itemsPerPage, currentPage);
SetupPagination(pagination_element, itemsPerPage);
