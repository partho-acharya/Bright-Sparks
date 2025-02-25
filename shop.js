// photo jali

let overlay = document.querySelector(".galleryOverlay");
let imgBox = document.querySelector(".imgBox");
let img = document.querySelector(".imgBox img");
let captionBox = document.querySelector(".caption");
let close = document.querySelector(".imgBox span.close-btn");
let prevArrow = document.querySelector(".prev-arrow");
let nextArrow = document.querySelector(".next-arrow");

let imgGel = document.querySelector("#imgGel");
let images = document.querySelectorAll('figure');

let currentIndex = 0;
let currentPage = 1;
const imagesPerPage = 8; // Number of images per page
const totalImages = images.length;

const totalPages = Math.ceil(totalImages / imagesPerPage);

// Show only the images for the current page
function showImagesForPage(page) {
    // Hide all images
    images.forEach(img => img.style.display = "none");

    // Calculate the starting and ending index for the current page
    const startIndex = (page - 1) * imagesPerPage;
    const endIndex = Math.min(startIndex + imagesPerPage, totalImages);

    // Show only the images for the current page
    for (let i = startIndex; i < endIndex; i++) {
        images[i].style.display = "block";
    }

    // Update page buttons' active state
    pageNumberButtons.forEach(button => {
        if (parseInt(button.dataset.page) === page) {
            button.style.backgroundColor = "#0056b3";
            button.style.fontSize = "15px";

        } else {
            button.style.backgroundColor = "#007bff";
            button.style.fontSize = "10px";
        }
    });

    // Disable Prev/Next buttons if we're on the first or last page
    prevPageButton.disabled = page === 1;
    nextPageButton.disabled = page === totalPages;
}

// Event listeners for page navigation buttons
const prevPageButton = document.querySelector(".prev-page");
const nextPageButton = document.querySelector(".next-page");
const pageNumberButtons = document.querySelectorAll(".page-number");

prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        showImagesForPage(currentPage);
    }
});

nextPageButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        showImagesForPage(currentPage);
    }
});

// Event listeners for page number buttons
pageNumberButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentPage = parseInt(button.dataset.page);
        showImagesForPage(currentPage);
    });
});

// Initially show images for the first page
showImagesForPage(currentPage);

// Event listener for image click to show lightbox
imgGel.addEventListener("click", (event) => {
    let currentImgPath = event.target.src;
    let currentCaption = event.target.getAttribute("data-caption");

    if (currentImgPath !== undefined) {
        overlay.classList.add("galleryOverlayShow");
        imgBox.classList.add("imgBoxShow");
        img.src = currentImgPath;
        captionBox.textContent = currentCaption;

        // Set currentIndex to the clicked image's index
        currentIndex = Array.from(images).indexOf(event.target);
    }
});

// Close the lightbox
close.addEventListener("click", () => {
    overlay.classList.remove("galleryOverlayShow");
    imgBox.classList.remove("imgBoxShow");
});

// Overlay click to close the lightbox
overlay.addEventListener("click", () => {
    overlay.classList.remove("galleryOverlayShow");
    imgBox.classList.remove("imgBoxShow");
});

// Left arrow navigation
prevArrow.addEventListener("click", () => {
    console.log('Prev arrow clicked');
    console.log('Current index before change:', currentIndex);
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    let newImage = images[currentIndex].querySelector('img');  // Ensure you're targeting the <img> tag
    img.src = newImage.src;
    captionBox.textContent = newImage.getAttribute("data-caption");
    console.log('Current index after change:', currentIndex);
});

// Right arrow navigation
nextArrow.addEventListener("click", () => {
    console.log('Next arrow clicked');
    console.log('Current index before change:', currentIndex);
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    let newImage = images[currentIndex].querySelector('img');  // Ensure you're targeting the <img> tag
    img.src = newImage.src;
    captionBox.textContent = newImage.getAttribute("data-caption");
    console.log('Current index after change:', currentIndex);
});



// comment

document.getElementById('commentForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting by default

    let name = document.querySelector('input[name="name"]').value;
    let email = document.querySelector('input[name="email"]').value;
    let comment = document.querySelector('textarea[name="comment"]').value;

    if (name && email && comment) {
        this.submit(); // Submit form if all fields are filled
    } else {
        alert("Please fill in all fields.");
    }
});


