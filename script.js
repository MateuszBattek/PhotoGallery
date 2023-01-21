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

// let random_photos_numbers = [];
// for (let i = 0; i < 8; i++) {
//     let random_photo = Math.floor(Math.random() * 31 + 1);
//     let photo_not_included = false;
//     do {
//         if (!random_photos_numbers.includes(random_photo))
//             random_photos_numbers.push(random_photo);
//         else photo_not_included = true;
//     } while (photo_not_included)

// }


for (let i = 0; i < 2; i++) {
    let row = document.createElement("div");
    row.classList.add("gallery-row");

    // for (let j = 4 * i; j < 4 * i + 4; j++) {
    //     let img = document.createElement("img");
    //     img.classList.add("gallery-image");
    //     img.src = "./min-pictures/" + random_photos_numbers[j] + ".jpg";
    //     img.alt = "Zdjęcie " + random_photos_numbers[j];

    //     img.onclick = () => displayImage("./gallery-pictures/" + random_photos_numbers[j] + ".jpg");

    //     row.appendChild(img);
    // }

    for (let j = i * 6 + 1; j <= (i + 1) * 6; j++) {
        let img = document.createElement("img");
        img.classList.add("gallery-image");
        img.src = "./min-pictures/" + j + ".jpg";
        img.alt = "Zdjęcie " + j;

        img.onclick = () => displayImage("./gallery-pictures/" + j + ".jpg");

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