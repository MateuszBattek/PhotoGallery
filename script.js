const modalImage = document.getElementById("modal-image");
const modalImageImg = document.getElementById("modal-image-img");
const galleryContainer = document.getElementById("gallery-container");
const galleries = document.getElementsByClassName("gallery");
const toggleMenuButton = document.getElementById('toggle-menu');
const menu = document.getElementById('menu');
const sliderImagesSection = document.getElementById("slider-images-section");

for (let i = 1; i <= 5; i++) {
    let imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    let image = document.createElement("img");
    image.src = "./slider-pictures/zdjecie" + i + ".jpg";
    image.alt = "Obrazek " + i;
    image.draggable = false;
    if (i === 2) {
        image.classList.add("center-image");
    }

    imageContainer.appendChild(image);
    sliderImagesSection.appendChild(imageContainer);
}

const imageContainers = document.getElementsByClassName("image-container");

let currentSliderTransform = 0;
let currentCenterPhoto = 1;

let sliderImages = [];
for (let imageContainer of imageContainers) {
    sliderImages.push(imageContainer.children[0]);
}

let touchstartX = 0;
let touchendX = 0;
let is_moving = false;
let termSliderTransform = 0;

const setNewCenterImage = (side) => {
    let index = currentCenterPhoto;
    sliderImages[index].classList.remove("center-image");

    if (side > 0)
        index = index <= 0 ? index = 4 : index - 1;
    else
        index = index >= 4 ? index = 0 : index + 1;

    sliderImages[index].classList.add("center-image");
    currentCenterPhoto = index;
}

function switchImage(side) {
    setNewCenterImage(side);

    currentSliderTransform += side * 27;

    if (currentCenterPhoto === 0) {
        currentSliderTransform = 27;
    }
    else if (currentCenterPhoto === 4) {
        currentSliderTransform = -81;
    }
    for (let container of imageContainers) {
        container.style = `transform: translate(${currentSliderTransform}vw, 0);`;
    }
}

const moveImage = (shift) => {
    if (Math.abs(shift) >= 27) {
        switchImage(shift > 0 ? 1 : -1);
        touchstartX = touchendX;
    }
    if (shift >= 27) shift = 27;
    else if (shift <= -27) shift = -27;

    termSliderTransform = shift + currentSliderTransform;

    if (termSliderTransform < -81) termSliderTransform = -94.5;
    if (termSliderTransform > 27) termSliderTransform = 40.5;

    for (let container of imageContainers) {
        container.style = `transform: translate(${termSliderTransform}vw, 0);`;
    }
}

function prevImage() {
    switchImage(1);
}

function nextImage() {
    switchImage(-1);
}

function handleSwipe() {
    is_moving = false;
    let sliderChange = Math.floor((touchendX - touchstartX) / window.innerWidth * 100);
    if (Math.abs(sliderChange) < 5) return;
    if (sliderChange > 0) switchImage(1);
    else if (sliderChange < 0) switchImage(-1);
}

function handleMove() {
    let sliderChange = Math.floor((touchendX - touchstartX) / window.innerWidth * 100);
    moveImage(sliderChange);
}

sliderImagesSection.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
    is_moving = true;
})

sliderImagesSection.addEventListener('mousedown', e => {
    sliderImagesSection.style.cursor = "grabbing";
    touchstartX = e.screenX;
    is_moving = true;
})

document.addEventListener("touchmove", e => {
    if (!is_moving) return;
    touchendX = e.changedTouches[0].screenX;
    handleMove();
})

document.addEventListener("mousemove", e => {
    if (!is_moving) return;
    touchendX = e.screenX;
    handleMove();
})

document.addEventListener('touchend', e => {
    if (!is_moving) return;
    touchendX = e.changedTouches[0].screenX;
    handleSwipe()
})

document.addEventListener('mouseup', e => {
    sliderImagesSection.style.cursor = null;
    if (!is_moving) return;
    touchendX = e.screenX;
    handleSwipe();
})



const displayImage = (src) => {
    modalImage.style.display = "flex";
    modalImageImg.src = src;
}

modalImage.addEventListener('click', function (e) {
    if (!document.getElementById('modal-image-img').contains(e.target)) {
        modalImage.style.display = "none";
    }
});

let gallery_index = 0;
for (let gallery of galleries) {
    for (let i = 1; i <= 10; i++) {
        let photo_index = gallery_index * 10 + i;

        let gallery_item = document.createElement("div");
        gallery_item.classList.add("gallery__item");
        gallery_item.classList.add("gallery__item--" + i);

        gallery_item.onclick = () => displayImage("./gallery-pictures/" + photo_index + "w.jpg");

        let gallery_img = document.createElement("img");
        gallery_img.classList.add("gallery__img");
        gallery_img.src = "min-pictures/" + photo_index + "w.jpg";
        gallery_img.alt = "Image " + photo_index;
        gallery_img.draggable = false;

        gallery_item.appendChild(gallery_img);
        gallery.appendChild(gallery_item);
    }

    gallery_index++;
}

let clicked = 0;

function toggleMenu() {
    if (clicked === 0) {

        toggleMenuButton.classList.add("clicked");

        menu.style.left = 0;

        clicked = 1;
    }
    else {

        toggleMenuButton.classList.remove("clicked");

        menu.style.left = '-250px';

        clicked = 0;
    }
}