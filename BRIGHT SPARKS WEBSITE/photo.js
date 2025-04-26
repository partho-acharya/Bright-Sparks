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








//drag slider bottom



const slider1 = document.querySelector(".slider1");
const firstImg = slider1.querySelectorAll("img")[2];
const arrowIcons = document.querySelectorAll(".sliderCon i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcon = () => { //showing and hiding prev/next icon acccording to slider1 scroll left value
    let scrollWidth = slider1.scrollWidth - slider1.clientWidth; //getting max scrollbar width
    arrowIcons[0].style.display = slider1.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = slider1.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value

        // if clicked icon is left reduce width value from the slider1 scroll left else add to it
        slider1.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcon(), 60); //calling showhide icon after 60ms
    });
});

const autoSlide = () => {
    //if their is no image left to scroll then return from hear
    if (slider1.scrollLeft == (slider1.scrollWidth - slider1.clientWidth)) return;

    positionDiff = Math.abs(positionDiff); // making positiondiff value of positive
    let firstImgWidth = firstImg.clientWidth + 14;

    // getting different vaiue that need to add or reduce from slider1 left to take middle image centre
    let valDifference = firstImgWidth - positionDiff;

    if (slider1.scrollLeft > prevScrollLeft) { //if user is scrolling to the right
        return slider1.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    //if user is scrolling to the left
    slider1.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

// updating global varible value on mouse down event
const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = slider1.scrollLeft;
}


//scrolling image / carousel to left according to mouse pointer
const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    slider1.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    slider1.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcon();
}

const dragStop = () => {
    isDragStart = false;
    slider1.classList.remove("dragging");

    if (!isDragging) return;
    isDragging = false;
    autoSlide();
}

slider1.addEventListener("mousedown", dragStart);
slider1.addEventListener("touchstart", dragStart);

slider1.addEventListener("mousemove", dragging);
slider1.addEventListener("touchmove", dragging);

slider1.addEventListener("mouseup", dragStop);
slider1.addEventListener("mouseleave", dragStop);
slider1.addEventListener("touchend", dragStop);

