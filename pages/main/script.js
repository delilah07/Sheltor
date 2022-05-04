import {
  burgerMenu,
  generatePetSlide,
  shuffle,
  generateModal,
} from "../../assets/js/script.js";
import pets from "../../assets/js/petsList.js";

const sliderList = document.querySelector(".friends__slides");
let slidesVisibleNumber =
  document.documentElement.clientWidth >= 1280
    ? 3
    : document.documentElement.clientWidth >= 768
    ? 2
    : 1;

// burger menu
burgerMenu();

//generate pet cards
const newPets = shuffle([...pets]);
const createList = function () {
  newPets.forEach((pet) => {
    sliderList.insertAdjacentHTML("beforeend", generatePetSlide(pet));
  });
  if (sliderList.childElementCount % slidesVisibleNumber) createList();
};
createList();
console.log(sliderList.childElementCount);

// generate popup for pet
generateModal(pets);

// slider
const slides = document.querySelectorAll(".frieds__slide");
sliderList.style.right = 0;
let displacement = 0;

const slideRight = function () {
  displacement += slidesVisibleNumber * slides[0].clientWidth;
  if (displacement >= slides[0].clientWidth * slides.length) {
    displacement = 0;
  }
  sliderList.style.right = `${displacement}px`;
};

const slideLeft = function () {
  displacement -= slidesVisibleNumber * slides[0].clientWidth;
  if (displacement < 0) {
    displacement =
      slides[0].clientWidth * (slides.length - slidesVisibleNumber);
  }
  sliderList.style.right = `${displacement}px`;
};

const sliderBtns = document.querySelectorAll(".friends__arrow");
sliderBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (btn.classList.contains("friends__next")) slideRight();
    if (btn.classList.contains("friends__prev")) slideLeft();
  });
});

// resize viewport
window.addEventListener("resize", function () {
  burgerMenu();
  sliderList.innerHTML = "";
  slidesVisibleNumber =
    document.documentElement.clientWidth >= 1280
      ? 3
      : document.documentElement.clientWidth >= 768
      ? 2
      : 1;
  createList();
  console.log(displacement);
  displacement = 0;
});
