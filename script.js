const modalImage = document.getElementById("modal-image");
const modalImageImg = document.getElementById("modal-image-img");

const displayImage = (src) => {
    modalImage.style.display = "block";
    modalImageImg.src = src;
}

modalImage.addEventListener('click', function (e) {
    if (!document.getElementById('modal-image-img').contains(e.target)) {
        modalImage.style.display = "none";
    }
});

let galleryContainer = document.getElementById("gallery-container");
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
let currentIndex = 0;
function prevImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    document.getElementById("current-image").src = images[currentIndex];
}
function nextImage() {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    document.getElementById("current-image").src = images[currentIndex];
}