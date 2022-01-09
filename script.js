(function () {
  const parent = document.querySelector(".range-slider");

  const priceMax = document.querySelector(".priceMax");
  const priceMin = document.querySelector(".priceMin");

  priceMax.addEventListener("input", function () {
    if (priceMax.value > 380) {
      priceMax.value = 380;
    }
  });

  priceMin.addEventListener("input", function () {
    if (priceMin.value < 0) {
      priceMin.value = 0;
    }
  });

  if (!parent) {
    return;
  }

  const rangeS = parent.querySelectorAll('input[type="range"]'),
    numberS = parent.querySelectorAll('input[type="number"]');
  let originalSliderWidth = (Math.abs(rangeS[0].value - rangeS[1].value) / rangeS[1].max) * 100 + "%";

  let originalSliderMargin = (rangeS[0].value / rangeS[1].max) * 100 + "%";
  const between = document.querySelector(".between");
  between.style.width = originalSliderWidth;
  between.style.marginLeft = originalSliderMargin;

  rangeS.forEach((el) => {
    el.oninput = () => {
      let slide1 = parseFloat(rangeS[0].value),
        slide2 = parseFloat(rangeS[1].value);

      if (slide1 > slide2) {
        [slide1, slide2] = [slide2, slide1];
      }

      numberS[0].value = slide1;
      numberS[1].value = slide2;

      let sliderWidth = (Math.abs(numberS[0].value - numberS[1].value) / numberS[1].max) * 100 + "%";

      let sliderMargin = (numberS[0].value / numberS[1].max) * 100 + "%";

      between.style.width = sliderWidth;
      between.style.marginLeft = sliderMargin;
    };
  });

  numberS.forEach((el) => {
    el.oninput = () => {
      let number1 = parseFloat(numberS[0].value),
        number2 = parseFloat(numberS[1].value);

      if (number1 > number2) {
        let tmp = number1;
        numberS[0].value = number2;
        numberS[1].value = tmp;
      }

      rangeS[0].value = number1;
      rangeS[1].value = number2;

      let sliderWidth = (Math.abs(numberS[0].value - numberS[1].value) / numberS[1].max) * 100 + "%";
      let sliderMargin = (numberS[0].value / numberS[1].max) * 100 + "%";

      between.style.width = sliderWidth;
      between.style.marginLeft = sliderMargin;
    };
  });
})();

// MOBILE FILTER SECTION START

const filterButton = document.querySelector(".aside-button");
const asideHeader = document.querySelector(".aside-header");
const asideContainer = document.querySelector(".aside-container");
const aside = document.querySelector(".aside");
const closeFilters = document.querySelector(".close-filters");
const headerBar = document.querySelector(".header-bar");

filterButton.addEventListener("click", function () {
  asideContainer.classList.toggle("aside-handler");
  aside.style.display = "flex";
  filterButton.classList.toggle("hide");
  asideHeader.classList.toggle("hide");
  headerBar.classList.toggle("hide");
});

closeFilters.addEventListener("click", function () {
  filterButton.classList.toggle("hide");
  asideHeader.classList.toggle("hide");
  aside.style.display = "none";
  asideContainer.classList.toggle("aside-handler");
  headerBar.classList.toggle("hide");
});

window.addEventListener("resize", function () {
  if (window.innerWidth < 1340) {
    aside.style.display = "none";
  } else {
    aside.style.display = "block";
  }
});

// MOBILE FILTER SECTION END

// MAIN SLIDER START

let slideIndex = 0;
const buttonPrev = document.querySelector(".prev");
const buttonNext = document.querySelector(".next");
const slides = document.querySelector(".swiper-wrapper").children;
const currentSlide = document.querySelector(".current-slide");

buttonNext.addEventListener("click", function () {
  nextSlide();
  resetTimer();
});

buttonPrev.addEventListener("click", function () {
  prevSlide();
  resetTimer();
});

function nextSlide() {
  if (slideIndex == slides.length - 1) {
    slideIndex = 0;
  } else {
    slideIndex++;
  }
  changeSlide();
}

function prevSlide() {
  if (slideIndex == 0) {
    slideIndex = slides.length - 1;
  } else {
    slideIndex--;
  }
  changeSlide();
}

function changeSlide() {
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  slides[slideIndex].classList.add("active");
  currentSlide.innerHTML = slideIndex + 1;
}

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(nextSlide, 6000);
}

let timer = setInterval(nextSlide, 6000);

let touchstartX = 0;
let touchendX = 0;

const slider = document.querySelector(".swiper-wrapper");

function handleGesture() {
  if (touchendX < touchstartX && Math.abs(touchstartX - touchendX) > 50) {
    prevSlide();
    resetTimer();
  }
  if (touchendX > touchstartX && Math.abs(touchstartX - touchendX) > 50) {
    nextSlide();
    resetTimer();
  }
}

slider.addEventListener("touchstart", (e) => {
  touchstartX = e.changedTouches[0].screenX;
});

slider.addEventListener("touchend", (e) => {
  touchendX = e.changedTouches[0].screenX;
  handleGesture();
});

// MAIN SLIDER END

// ANCHOR NAVBAR ON SCROLL START

window.onscroll = function () {
  handleNavBar();
};

const navbar = document.querySelector(".header-bar");
let sticky = navbar.offsetTop;

function handleNavBar() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

// ANCHOR NAVBAR ON SCROLL END

//   HAMBURGER MENU START

const menuElements = document.querySelectorAll(".menu-list a");
const menu = document.getElementById("menu");
const menuList = document.querySelector(".menu-list");

function toggleMenu() {
  const hasOpenedClass = menu.className.includes("menu-icon--opened");

  const closeMenu = function () {
    menu.classList.add("menu-icon--closed");
    menu.classList.remove("menu-icon--opened");
    menuList.style.left = "-574px";
  };

  if (hasOpenedClass) {
    closeMenu();
  } else {
    menu.classList.add("menu-icon--opened");
    menu.classList.remove("menu-icon--closed");
    menuList.style.left = "0";
  }
}

menuElements.forEach((e) =>
  e.addEventListener("click", function () {
    if (menu.className.includes("menu-icon--opened")) {
      menu.classList.add("menu-icon--closed");
      menu.classList.remove("menu-icon--opened");
      menuList.style.left = "-574px";
    }
  })
);

// HAMBURGER MENU END
