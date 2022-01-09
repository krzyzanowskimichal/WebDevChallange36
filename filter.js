let filters = {
  color: {
    white: false,
    green: false,
    red: false,
    grey: false,
    blue: false
  },
  size: {
    small: false,
    medium: false,
    large: false
  },
  brand: {
    banshuHamono: false,
    bower: false,
    braun: false,
    elevenplus: false,
    field: false,
    henryWilson: false,
    menu: false
  },
  category: {
    living: false,
    dining: false,
    furniture: false,
    lighting: false,
    technics: false,
    accesories: false
  }
};

let sup = {
  size: {
    small: [],
    medium: [],
    large: []
  },
  brand: {
    banshuHamono: [],
    bower: [],
    braun: [],
    elevenplus: [],
    field: [],
    henryWilson: [],
    menu: []
  },
  category: {
    living: [],
    dining: [],
    furniture: [],
    lighting: [],
    technics: [],
    accesories: []
  }
};

const collectedFilters = {
  color: [],
  brand: [],
  size: [],
  category: []
};

// GET DATA

async function getProducts() {
  let url = "../data.json";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

// RESET HANDLERS

clearList = () => (document.querySelector(".result-listing").innerHTML = "");

reloadPage = () => {
  window.location.reload();
};

let paginatedItems;

const list_element = document.querySelector(".result-listing");
const pagination_element = document.getElementById("pagination");

let filterResult;

let currentPage = 1;
let itemsPerPage = 6;

async function handleFilter(temp) {
  filteredArray = await getProducts();

  clearList();

  const multiFilter = (item, condition) => {
    const filterKeys = Object.keys(collectedFilters);
    return filteredArray.filter((eachObj) => {
      return filterKeys.every((eachKey) => {
        if (!collectedFilters[eachKey].length) {
          return true;
        }
        return collectedFilters[eachKey].includes(eachObj[eachKey]);
      });
    });
  };

  filterResult = multiFilter();

  if (temp !== undefined) {
    filterResult = filterResult.filter(function (key) {
      return key.value >= priceListenerArray[0] && key.value <= priceListenerArray[1];
    });
  }

  let start = itemsPerPage * currentPage - itemsPerPage;
  let end = start + itemsPerPage;
  paginatedItems = filterResult.slice(start, end);

  if (paginatedItems.length > 0) {
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

      list_element.appendChild(item_element);
    }
    // console.log(filterResult)
    // console.log(paginatedItems)
    function Pagination(wrapper, rows_per_page) {
      wrapper.innerHTML = "";
      // currentPage = 1;
      let page_count = Math.ceil(filterResult.length / rows_per_page);
      resultsNumberAll.innerHTML = filterResult.length;
      resultsNumberRange.innerHTML = `${filterResult.length > 0 ? start + 1 : "0"} - ${
        end <= filterResult.length ? end : filterResult.length
      }`;
      for (let i = 1; i < page_count + 1; i++) {
        let btn = PaginationFilter(i, filterResult);
        wrapper.appendChild(btn);
      }
    }

    Pagination(pagination_element, itemsPerPage);
  } else {
    const noItems = document.createElement("div");
    noItems.classList.add("results-no-items");
    noItems.innerHTML = `<p class="results-no-items-text">No items matching your search criteria were found</p>
        <button class="results-no-items-button" onClick="reloadPage()">Reset filters</button>`;
    list_element.appendChild(noItems);
    resultsNumberAll.innerHTML = "0";
    resultsNumberRange.innerHTML = "0";
    pagination_element.innerHTML = "";
  }

  // console.log(paginatedItems)
  countBrands();
  countSizes();
  countCategories();
  addToCartButton = document.querySelectorAll(".add-to-cart");
  addToCartButton.forEach((e) => {
    e.addEventListener("click", cartHandler);
  });
}

function PaginationFilter(page, items) {
  let button = document.createElement("button");
  page < 10 ? (button.innerText = "0" + page) : (button.innerText = page);
  // console.log(currentPage, page)
  if (currentPage == page) button.classList.add("active");

  button.addEventListener("click", function () {
    //   let page_count = Math.ceil(filterResult.length / itemsPerPage);
    currentPage = page;
    handleFilter();
    let current_btn = document.querySelector(".pagenumbers button.active");
    // console.log(current_btn)

    current_btn.classList.remove("active");
    button.classList.add("active");
  });

  return button;
}

clearFilters = () => {
  Object.keys(sup.brand).forEach((key) => {
    sup.brand[key] = [];
  });
  Object.keys(sup.category).forEach((key) => {
    sup.category[key] = [];
  });
  Object.keys(sup.size).forEach((key) => {
    sup.size[key] = [];
  });

  if (document.querySelectorAll(".supel").length > 0) {
    document.querySelectorAll(".supel").forEach((el) => {
      el.remove();
    });
  }
};

const brandsList = document.querySelectorAll(".brand");

brandsList.forEach(function (el) {
  el.addEventListener("click", function () {
    for (let el in filters.brand) {
      if (el === this.id) {
        collectedFilters.brand.includes(this.id)
          ? collectedFilters.brand.splice(collectedFilters.brand.indexOf(this.id), 1)
          : collectedFilters.brand.push(this.id);
        filters.brand[el] = !filters.brand[el];
        this.classList.toggle("filter-on");
        currentPage = 1;
        handleFilter();
      }
    }
  });
});

countBrands = () => {
  clearFilters();
  brandsList.forEach(function (e) {
    for (i = 0; i < filterResult.length; i++) {
      if (e.id === filterResult[i].brand) {
        sup.brand[e.id].push(e.id);
      }
    }
    let createSup = document.createElement("sup");
    createSup.classList.add("supel");
    document.getElementById(e.id).appendChild(createSup);
    sup.brand[e.id].length === 0
      ? (createSup.innerHTML = "")
      : sup.brand[e.id].length < 10
      ? (createSup.innerHTML = "0" + sup.brand[e.id].length)
      : (createSup.innerHTML = sup.brand[e.id].length);
  });
};

const colorsList = document.querySelectorAll(".circle-color");

colorsList.forEach(function (el) {
  el.addEventListener("click", function () {
    for (let el in filters.color) {
      if (el === this.id) {
        collectedFilters.color.includes(this.id)
          ? collectedFilters.color.splice(collectedFilters.color.indexOf(this.id), 1)
          : collectedFilters.color.push(this.id);
        filters.color[el] = !filters.color[el];
        currentPage = 1;
        handleFilter();
      }
    }
  });
});

const sizesList = document.querySelectorAll(".size");

sizesList.forEach(function (el) {
  el.addEventListener("click", function () {
    for (let el in filters.size) {
      if (el === this.id) {
        collectedFilters.size.includes(this.id)
          ? collectedFilters.size.splice(collectedFilters.size.indexOf(this.id), 1)
          : collectedFilters.size.push(this.id);
        filters.size[el] = !filters.size[el];
        this.classList.toggle("filter-on");
        currentPage = 1;
        handleFilter();
      }
    }
  });
});

countSizes = () => {
  sizesList.forEach(function (e) {
    for (i = 0; i < filterResult.length; i++) {
      if (e.id === filterResult[i].size) {
        sup.size[e.id].push(e.id);
      }
    }
    let createSup = document.createElement("sup");
    createSup.classList.add("supel");
    document.getElementById(e.id).appendChild(createSup);
    sup.size[e.id].length === 0
      ? (createSup.innerHTML = "")
      : sup.size[e.id].length < 10
      ? (createSup.innerHTML = "0" + sup.size[e.id].length)
      : (createSup.innerHTML = sup.size[e.id].length);
  });
};

const categoriesList = document.querySelectorAll(".category");

categoriesList.forEach(function (el) {
  el.addEventListener("click", function () {
    collectedFilters.category = [];
    categoriesList.forEach((e) => e.classList.remove("filter-on"));
    for (let el in filters.category) {
      if (el === this.id) {
        collectedFilters.category.push(this.id);
        filters.category[el] = !filters.category[el];
        this.classList.add("filter-on");
        currentPage = 1;
        handleFilter();
      }
    }
  });
});

async function countCategories() {
  data = await getProducts();
  categoriesList.forEach(function (e) {
    for (i = 0; i < data.length; i++) {
      if (e.id === data[i].category) {
        sup.category[e.id].push(e.id);
      }
    }

    let createSup = document.createElement("sup");
    createSup.classList.add("supel");
    document.getElementById(e.id).appendChild(createSup);
    if (sup.category[e.id].length === 0) return (createSup.innerHTML = "");
    else if (sup.category[e.id].length < 10) return (createSup.innerHTML = "0" + sup.category[e.id].length);
    else createSup.innerHTML = sup.category[e.id].length;
  });
}

// PRICE

let priceListenerArray;
let temp = "";
document.querySelector(".filter-button").addEventListener("click", function () {
  priceListener = [];
  let priceMin = document.querySelector(".priceMin"),
    priceMax = document.querySelector(".priceMax");

  priceListener.push(priceMin.value);
  priceListener.push(priceMax.value);
  priceListenerArray = priceListener.sort(function (a, b) {
    return a - b;
  });

  // console.log(priceListenerArray)

  handleFilter(temp);
});
