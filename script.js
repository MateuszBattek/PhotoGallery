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


for (let i = 0; i < 2; i++) {
    let row = document.createElement("div");
    row.classList.add("gallery-row");

    for (let j = i * 6 + 1; j <= (i + 1) * 6; j++) {
        let img = document.createElement("img");
        img.classList.add("gallery-image");
        img.src = "./gallery-pictures/gal" + j + "-min.jpg";
        img.alt = "Zdjęcie " + j;

        img.onclick = () => displayImage("./gallery-pictures/gal" + j + "-min.jpg");

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