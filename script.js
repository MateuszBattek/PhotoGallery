const modalImage = document.getElementById("modal-image");
const modalImageImg = document.getElementById("modal-image-img");
const galleryContainer = document.getElementById("gallery-container");
const currentImages = document.getElementsByClassName("current-image");

const displayImage = (src) => {
    modalImage.style.display = "block";
    modalImageImg.src = src;
}

modalImage.addEventListener('click', function (e) {
    if (!document.getElementById('modal-image-img').contains(e.target)) {
        modalImage.style.display = "none";
    }
});

let random_photos = [];
while (random_photos.length < 8) {
    let random_number = Math.floor(Math.random() * 31) + 1;
    if (!random_photos.includes(random_number))
        random_photos.push(random_number);
}


for (let i = 0; i < 2; i++) {
    let row = document.createElement("div");
    row.classList.add("gallery-row");

    for (let j = 4 * i; j < 4 * i + 4; j++) {
        let img = document.createElement("img");
        img.classList.add("gallery-image");
        img.src = "./min-pictures/" + random_photos[j] + ".jpg";
        img.alt = "Zdjęcie " + random_photos[j];

        img.onclick = () => displayImage("./gallery-pictures/" + random_photos[j] + ".jpg");

        row.appendChild(img);
    }

    galleryContainer.appendChild(row);
}

let images = [];
for (let i = 1; i <= 5; i++) {
    images.push("./slider-pictures/zdjecie" + i + ".jpg");
}
let currentImagesIndexes = [0, 1, 2];

function prevImage() {
    currentImagesIndexes = currentImagesIndexes.map(index =>
        index > 0 ? index - 1 : 4
    );

    for (let i = 0; i < currentImagesIndexes.length; i++) {
        currentImages[i].src = images[currentImagesIndexes[i]];
    }
}
function nextImage() {
    currentImagesIndexes = currentImagesIndexes.map(index =>
        index < 4 ? index + 1 : 0
    );

    for (let i = 0; i < currentImagesIndexes.length; i++) {
        currentImages[i].src = images[currentImagesIndexes[i]];
    }
}

let clicked = 0;

function showMenu() {

    const showMenu = document.getElementById('show-menu');
    const menu = document.getElementById('menu');

    if (clicked === 0) {

        showMenu.className = 'show-menu clicked';

        menu.style.left = 0;

        clicked = 1;

    }

    else {

        showMenu.className = 'show-menu';

        menu.style.left = '-250px';

        clicked = 0;

    }

}