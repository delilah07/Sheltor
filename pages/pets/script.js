import {
  burgerMenu,
  generatePetCard,
  shuffle,
  generateModal,
} from "../../assets/js/script.js";
import pets from "../../assets/js/petsList.js";

const petsCards = document.querySelector(".pets__cards");

const paginationWrapper = document.querySelector(".pets__pagination");
const petsArray = [];
let page = 1;

window.addEventListener("resize", function () {
  burgerMenu();
});
burgerMenu();

//generate pet cards

const createList = function () {
  if (document.documentElement.clientWidth >= 1280) {
    for (let i = 1; i <= 6; i++) {
      const newPets = shuffle([...pets]);
      newPets.forEach((pet) => {
        petsArray.push(generatePetCard(pet));
      });
    }
  } else {
    const newPets = shuffle([...pets]);
    for (let i = 1; i <= 6; i++) {
      newPets.forEach((pet) => {
        petsArray.push(generatePetCard(pet));
      });
    }
  }
  return petsArray;
};
createList(pets);

let cardsVisibleNumber =
  document.documentElement.clientWidth >= 1280
    ? 8
    : document.documentElement.clientWidth >= 768
    ? 6
    : 3;
const numPages = petsArray.length / cardsVisibleNumber;

const cardsPerPages = (
  pet,
  numerPage = page,
  qtyCards = cardsVisibleNumber
) => {
  console.log(petsArray);
  const start = (numerPage - 1) * qtyCards;
  const end = numerPage * qtyCards;
  console.log(start, end);
  const newArray = petsArray.slice(start, end);
  console.log(newArray);
  petsCards.innerHTML = `${newArray.join("")}`;
};
cardsPerPages(pets);

// pagination
const generatePagination = (numerPage = page) => {
  //if first page
  if (numerPage === 1)
    return `
    <span class="btn btn-round btn-double-arrow btn-first btn-inactive"></span>
    <span class="btn btn-round btn-arrow btn-prev btn-inactive"></span>
    <span class="btn btn-round btn-page btn-active">${numerPage}</span>
    <a href="javascript:void(0);" class="btn btn-round btn-arrow btn-next btn-line-pink" data-page="${
      numerPage + 1
    }"></a>
    <a href="javascript:void(0);" class="btn btn-round btn-double-arrow btn-last btn-line-pink" data-page="${numPages}"></a>
  `;
  // if last page
  if (numerPage === numPages)
    return `
    <a href="javascript:void(0);" class="btn btn-round btn-double-arrow btn-first btn-line-pink" data-page="${1}"></a>
    <a href="javascript:void(0);" class="btn btn-round btn-arrow btn-prev btn-line-pink" data-page="${
      numerPage - 1
    }"></a>
    <span class="btn btn-round btn-page btn-active">${numerPage}</span>
    <span class="btn btn-round btn-arrow btn-next btn-inactive"></span>
    <span class="btn btn-round btn-double-arrow btn-last btn-inactive"></a>
  `;
  if (numerPage > 1 && numerPage < numPages)
    return `
    <a href="javascript:void(0);" class="btn btn-round btn-double-arrow btn-first btn-line-pink" data-page="${1}"></a>
    <a href="javascript:void(0);" class="btn btn-round btn-arrow btn-prev btn-line-pink" data-page="${
      numerPage - 1
    }"></a>
    <span class="btn btn-round btn-page btn-active">${numerPage}</span>
    <a href="javascript:void(0);" class="btn btn-round btn-arrow btn-next btn-line-pink" data-page="${
      numerPage + 1
    }"></a>
    <a href="javascript:void(0);" class="btn btn-round btn-double-arrow btn-last btn-line-pink" data-page="${numPages}"></a>
  `;
};
paginationWrapper.insertAdjacentHTML("beforeend", generatePagination());
let paginationBtns = document.querySelectorAll(
  ".pets__pagination .btn:not(.btn-inactive)"
);

const generateNewPage = (event) => {
  const newPage = +event.target.dataset.page;
  page = newPage;
  petsCards.innerHTML = "";
  console.log(page);
  cardsPerPages(pets, page);

  paginationWrapper.innerHTML = "";
  paginationWrapper.insertAdjacentHTML("beforeend", generatePagination());

  paginationBtns = document.querySelectorAll(
    ".pets__pagination .btn:not(.btn-inactive)"
  );
  paginationBtns.forEach((btn) => {
    btn.addEventListener("click", generateNewPage);
  });

  generateModal(pets);
};

paginationBtns.forEach((btn) => {
  btn.addEventListener("click", generateNewPage);
});

// generate popup for pet
generateModal(pets);
