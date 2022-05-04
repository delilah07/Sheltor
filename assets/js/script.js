const burgerMenuBtn = document.querySelector(".header__burger");
const headerWrapper = document.querySelector(".header__wrapper");
const burgerMenuList = document.querySelector(".nav-header__list");
const body = document.querySelector("body");
const popup = document.querySelector(".popup");
const popupContent = document.querySelector(".popup__content");
const popupClose = document.querySelector(".popup__close");

// burger menu

const toggleMenu = function () {
  headerWrapper.classList.toggle("show");
  body.classList.toggle("scroll-hidden");
};

export const burgerMenu = function () {
  if (document.documentElement.clientWidth < 768) {
    burgerMenuBtn.addEventListener("click", function (e) {
      toggleMenu();
    });
    document.addEventListener("click", function (e) {
      const target = e.target;
      const its_menu = target == burgerMenuList;
      const its_btnMenu = target == burgerMenuBtn;
      const menu_is_active = headerWrapper.classList.contains("show");

      if (!its_menu && !its_btnMenu && menu_is_active) {
        console.log("burger");
        toggleMenu();
      }
    });
  }
};
//
export const generatePetSlide = (pet) => `
  <div class="frieds__slide">
    ${generatePetCard(pet)}
  </div>
`;
// generate pet card
export const generatePetCard = (pet) => `
 
    <div class="pet-card" data-id="${pet.id}">
      <img
        class="pet-card__photo"
        src="${pet.img}"
        alt="${pet.type} ${pet.name}"
      />
      <div class="pet-card__name"> ${pet.name}</div>
      <button class="pet-card__btn btn btn-line-pink">
        Learn more
      </button>
    </div>

  `;

// random array
export function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// modal window
const generatePetModal = (pet, index) => `
  <div class="popup__img-wrapper">
    <img
    src="${pet[index].img}"
    alt="${pet[index].type} ${pet[index].name}"
    class="popup__img"
    />
  </div>
  <div class="popup__col">
  <h2 class="popup__title">${pet[index].name}</h2>
  <div class="popup__animal-type">
    <span class="popup__animal">${pet[index].type}</span> -
    <span class="popup__type">${pet[index].breed}</span>
  </div>
  <p class="popup__text">
  ${pet[index].description}
  </p>
  <ul class="popup__list">
    <li>Age: <span class="popup__age"> ${pet[index].age}</span></li>
    <li>
      Inoculations: <span class="popup__inoculations">${pet[
        index
      ].inoculations.join(", ")}</span>
    </li>
    <li>Diseases: <span class="popup__diseases">${pet[index].diseases.join(
      ", "
    )}</span></li>
    <li>Parasites: <span class="popup__parasites">${pet[index].parasites.join(
      ", "
    )}</span></li>
  </ul>
  </div>
`;

const toggleModalWindow = function () {
  popup.classList.toggle("active");
  body.classList.toggle("scroll-hidden");
};

export const generateModal = function (pet) {
  document.querySelectorAll(".pet-card").forEach((card) => {
    card.addEventListener("click", function (event) {
      console.log("card");
      toggleModalWindow();
      const id = +event.target.closest(".pet-card").dataset.id - 1;
      popupContent.insertAdjacentHTML("beforeend", generatePetModal(pet, id));
      console.log(pet[id]);
    });
  });
  popupClose.addEventListener("click", function () {
    toggleModalWindow();
    popupContent.innerHTML = "";
  });

  popup.addEventListener("click", function (event) {
    if (popup.classList.contains("active") && event.target === this) {
      toggleModalWindow();
      popupContent.innerHTML = "";
    }
  });
};
