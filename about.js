//auto slider top 1


let sliderCurrentIndex = 0;
let autoSlideInterval; // can remove if stop auto slide

// Get slider index from sessionStorage (if it exists)
if (sessionStorage.getItem('sliderCurrentIndex')) {
    sliderCurrentIndex = parseInt(sessionStorage.getItem('sliderCurrentIndex'));
}

function moveSlide(direction) {
    const slides = document.querySelectorAll('.slider img');
    const totalSlides = Math.min(slides.length, 22); // Limit total slides to 22
    const slider = document.querySelector('.slider');
    const slideWidth = slides[0].clientWidth;

    // Update currentIndex with direction, wrapped around within the 0-totalSlides range
    sliderCurrentIndex = (sliderCurrentIndex + direction + totalSlides) % totalSlides;

    // Move the slider by the current index
    slider.style.transform = `translateX(-${sliderCurrentIndex * slideWidth}px)`;

    // Save the current slider index to sessionStorage
    sessionStorage.setItem('sliderCurrentIndex', sliderCurrentIndex);
}

// Auto-slide every 4 seconds
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        moveSlide(1); // Move slider forward by 1 every 4 seconds
    }, 3000);
}

// Stop auto-slide when user interacts (optional, if you add interaction handlers)
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Start auto-slide on page load
startAutoSlide();

// Recalculate slide width on window resize to ensure responsiveness
window.addEventListener('resize', () => {
    // Recalculate the slide width on resize if necessary
    const slides = document.querySelectorAll('.slider img');

    if (slides.length > 0) {
        const slideWidth = slides[0].clientWidth;

        // Adjust the slider position after resize (if needed)
        document.querySelector('.slider').style.transform = `translateX(-${sliderCurrentIndex * slideWidth}px)`;
    }
});

// Optional: You can add an event listener to prevent auto slide start if user scrolls or interacts with the page
window.addEventListener('scroll', () => {
    // Pause the auto-slide on scroll (if desired)
    stopAutoSlide();
});

document.querySelector('.slider').addEventListener('mouseenter', stopAutoSlide);
document.querySelector('.slider').addEventListener('mouseleave', startAutoSlide);



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

