let cars = [];
let selectedBrand = "Liberty Walk";
let searchQuery = "";
let currentCarIndex = 0;
let currentImageIndex = 0;
let currentCar = null;

const brandTitle = document.getElementById("brand-title");
const searchInput = document.getElementById("search-input");
const clearBtn = document.getElementById("clear-search");
const cardContainer = document.getElementById("card-container");
const noResults = document.getElementById("no-results");
const modal = document.getElementById("modal");
const modalBackdrop = document.getElementById("modal-backdrop");
const modalClose = document.getElementById("modal-close");
const modalImage = document.getElementById("modal-image");
const modalTitulo = document.getElementById("modal-titulo");
const modalNomeCar = document.getElementById("modal-nomeCar");
const modalMarcaCar = document.getElementById("modal-marcaCar");
const modalMarcaBodyKit = document.getElementById("modal-marcaBodyKit");
const modalLinkBodyKit = document.getElementById("modal-pagina");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const carouselDots = document.getElementById("carousel-dots");

async function loadData() {
  try {
    const response = await fetch("data.json");
    cars = await response.json();
    renderCards();
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  }
}

function toggleBrand() {
  const containerImgOwner = document.getElementById("containerImgOwner");
  const brand = document.getElementById("brand");
  const owner = document.getElementById("owner");
  const nameOwner = document.getElementById("nameOwner");

  selectedBrand =
    selectedBrand === "Liberty Walk" ? "Rocket Bunny" : "Liberty Walk";
  brandTitle.textContent = selectedBrand;
  searchQuery = "";
  searchInput.value = "";

  if (selectedBrand === "Rocket Bunny") {
    document.body.classList.add("rb-theme");
    owner.setAttribute("src", "img/keiMiura.png");
    containerImgOwner.setAttribute("class", "img-side keiMiura");
    brand.setAttribute("src", "img/logoRB4.png");
    nameOwner.textContent = "Kei Miura";
    modalLinkBodyKit.textContent = "Rocket Bunny"
  } else {
    document.body.classList.remove("rb-theme");
    owner.setAttribute("src", "img/wataruKato.png");
    containerImgOwner.setAttribute("class", "img-side wataruKato");
    brand.setAttribute("src", "img/logoLB3.png");
    nameOwner.textContent = "Wataru Kato";
    modalLinkBodyKit.textContent = "Liberty Walk"
  }

  renderCards();
}

function filterCars() {
  return cars.filter((car) => {
    const matchesBrand = car.marcaBodyKit === selectedBrand;
    const matchesSearch =
      searchQuery === "" ||
      car.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.nomeCar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.marcaCar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.marcaBodyKit.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBrand && matchesSearch;
  });
}

function renderCards() {
  const filteredCars = filterCars();

  if (filteredCars.length === 0) {
    cardContainer.innerHTML = "";
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";
  cardContainer.innerHTML = "";

  filteredCars.forEach((car, index) => {
    const card = createCard(car, index);
    cardContainer.appendChild(card);
  });
}

function createCard(car, index) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
        <div class="card-image-container">
            <img src="${car.foto1}" alt="${car.titulo}" class="card-image">
        </div>
        
        <div class="card-overlay">
            <button class="card-button">Saiba Mais</button>
        </div>
        
        <div class="card-info">
            <h3 class="card-title">${car.titulo}</h3>
        </div>
    `;

  card.querySelector(".card-button").addEventListener("click", (e) => {
    e.stopPropagation();
    openModal(car);
  });

  card.addEventListener("click", () => {
    openModal(car);
  });

  return card;
}

function openModal(car) {
  currentCar = car;
  currentImageIndex = 0;

  modalTitulo.textContent = car.titulo;
  modalNomeCar.textContent = car.nomeCar;
  modalMarcaCar.textContent = car.marcaCar;
  modalMarcaBodyKit.textContent = car.bodyKitPartes;
  modalLinkBodyKit.setAttribute('href', car.bodyKitLink);

  updateCarouselImage();
  createCarouselDots();

  modal.style.display = "block";
  modalBackdrop.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.style.display = "none";
  modalBackdrop.style.display = "none";
  document.body.style.overflow = "auto";
  currentCar = null;
}

function updateCarouselImage() {
  if (!currentCar) return;

  const images = [currentCar.foto1, currentCar.foto2];
  modalImage.src = images[currentImageIndex];
  modalImage.alt = currentCar.titulo;

  updateCarouselDots();
}

function createCarouselDots() {
  if (!currentCar) return;

  const images = [currentCar.foto1, currentCar.foto2];
  carouselDots.innerHTML = "";

  images.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = `carousel-dot ${
      index === currentImageIndex ? "active" : ""
    }`;
    carouselDots.appendChild(dot);
  });
}

function updateCarouselDots() {
  const dots = carouselDots.querySelectorAll(".carousel-dot");
  dots.forEach((dot, index) => {
    if (index === currentImageIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function nextImage() {
  if (!currentCar) return;
  const images = [currentCar.foto1, currentCar.foto2];
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateCarouselImage();
}

function prevImage() {
  if (!currentCar) return;
  const images = [currentCar.foto1, currentCar.foto2];
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateCarouselImage();
}

brandTitle.addEventListener("click", toggleBrand);

searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderCards();
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  searchQuery = "";
  renderCards();
});

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  nextImage();
});

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  prevImage();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (modal.style.display === "block") {
    if (e.key === "ArrowRight") {
      nextImage();
    } else if (e.key === "ArrowLeft") {
      prevImage();
    }
  }
});

loadData();
