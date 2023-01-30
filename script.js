const modalImage = document.getElementById("modal-image");
const modalImageImg = document.getElementById("modal-image-img");
const galleryContainer = document.getElementById("gallery-container");
const currentImages = document.getElementsByClassName("current-image");
const galleries = document.getElementsByClassName("gallery");

const displayImage = (src) => {
    modalImage.style.display = "block";
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

        gallery_item.appendChild(gallery_img);
        gallery.appendChild(gallery_item);
    }

    gallery_index++;
}

// let random_photos = [];
// while (random_photos.length < 8) {
//     let random_number = Math.floor(Math.random() * 30) + 1;
//     if (!random_photos.includes(random_number))
//         random_photos.push(random_number);
// }


// for (let i = 0; i < 2; i++) {
//     let row = document.createElement("div");
//     row.classList.add("gallery-row");

//     for (let j = 4 * i; j < 4 * i + 4; j++) {
//         let img = document.createElement("img");
//         img.classList.add("gallery-image");
//         img.src = "./min-pictures/" + random_photos[j] + ".jpg";
//         img.alt = "Zdjęcie " + random_photos[j];

//         img.onclick = () => displayImage("./gallery-pictures/" + random_photos[j] + ".jpg");

//         row.appendChild(img);
//     }

//     galleryContainer.appendChild(row);
// }

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