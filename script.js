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

function checkDirection() {
    let sliderChange = Math.floor((touchendX - touchstartX) / window.innerWidth * 100);
    if (Math.abs(sliderChange) >= 27) {
        sliderImages[currentCenterPhoto].classList.remove("center-image");
        if (sliderChange > 0)
            currentCenterPhoto = currentCenterPhoto <= 0 ? currentCenterPhoto = 4 : currentCenterPhoto - 1;
        else
            currentCenterPhoto = currentCenterPhoto >= 4 ? currentCenterPhoto = 0 : currentCenterPhoto + 1;

        sliderImages[currentCenterPhoto].classList.add("center-image");

        sliderChange = sliderChange > 0 ? 27 : -27;
        currentSliderTransform += sliderChange;
        if (currentCenterPhoto === 0)
            currentSliderTransform = 27;
        else if (currentCenterPhoto === 4)
            currentSliderTransform = -81;
    }
    for (let container of imageContainers) {
        container.style = `transform: translate(${currentSliderTransform}vw, 0);`;
    }
}

sliderImagesSection.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
})

sliderImagesSection.addEventListener('mousedown', e => {
    touchstartX = event.clientX;
})

sliderImagesSection.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    checkDirection()
})

sliderImagesSection.addEventListener('mouseup', e => {
    touchendX = event.clientX;
    checkDirection();
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



function prevImage() {
    sliderImages[currentCenterPhoto].classList.remove("center-image");
    currentCenterPhoto = currentCenterPhoto <= 0 ? currentCenterPhoto = 4 : currentCenterPhoto - 1;
    sliderImages[currentCenterPhoto].classList.add("center-image");
    currentSliderTransform += 27;
    if (currentCenterPhoto === 4) {
        currentSliderTransform = -81;
    }
    for (let i = 0; i < imageContainers.length; i++) {
        imageContainers[i].style = `transform: translate(${currentSliderTransform}vw, 0);`;
    }
}
function nextImage() {
    sliderImages[currentCenterPhoto].classList.remove("center-image");
    currentCenterPhoto = currentCenterPhoto >= 4 ? currentCenterPhoto = 0 : currentCenterPhoto + 1;
    sliderImages[currentCenterPhoto].classList.add("center-image");
    currentSliderTransform -= 27;
    if (currentCenterPhoto === 0) {
        currentSliderTransform = 27;
    }
    for (let i = 0; i < imageContainers.length; i++) {
        imageContainers[i].style = `transform: translate(${currentSliderTransform}vw, 0);`;
    }
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