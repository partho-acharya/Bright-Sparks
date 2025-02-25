// About Slider 1 (Auto Slider)
let sliderCurrentIndex = 0;
let autoSlideInterval;  // To handle the auto-slide interval
let isUserInteracting = false; // To track if the user is interacting with the slider

const slides = document.querySelectorAll('.slider img');
const slider = document.querySelector('.slider');
const totalSlides = Math.min(slides.length, 22); // Limit total slides to 22
const slideWidth = slides.length ? slides[0].clientWidth : 0; // Get the width of the first slide

// Move the slide by the given direction (left or right)
function moveSlide(direction) {
    sliderCurrentIndex = (sliderCurrentIndex + direction + totalSlides) % totalSlides; // Ensure it wraps around
    slider.style.transform = `translateX(-${sliderCurrentIndex * slideWidth}px)`; // Move the slider to the current index
}

// Start auto sliding the slider
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        moveSlide(1);  // Move slider forward by 1 every 4 seconds
    }, 4000);
}

// Stop the auto-slide when user interacts
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Restart auto slide after 1 second timeout when user interacts (e.g., on arrow click)
function restartAutoSlide() {
    stopAutoSlide(); // Stop any current interval
    setTimeout(() => startAutoSlide(), 1000); // Start a new interval after 1 second delay
}

// Manual arrow click to move the slider
const arrowicons = document.querySelectorAll(".sliderCon i");
arrowicons.forEach(icon => {
    icon.addEventListener("click", () => {
        stopAutoSlide(); // Stop auto-slide on user interaction
        moveSlide(icon.id === "left" ? -1 : 1); // Move left or right
        restartAutoSlide(); // Restart auto-slide after 1 second
    });
});

// Recalculate slide width on window resize to ensure responsiveness
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout); // Clear previous resize event if resizing rapidly
    resizeTimeout = setTimeout(() => {
        const slideWidth = slides.length ? slides[0].clientWidth : 0; // Recalculate slide width
        if (slideWidth > 0) {
            // Adjust the slider position after resize
            slider.style.transform = `translateX(-${sliderCurrentIndex * slideWidth}px)`;
        }
    }, 200); // Wait 200ms after resizing stops
});

// Start auto-slide on page load
startAutoSlide();






// explore slider

const slider1 = document.querySelector(".slider1");
const firstImg = slider1.querySelectorAll("img")[0];
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