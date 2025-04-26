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


// ==============================================product
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.affiliate-slider');
    const productCards = document.querySelectorAll('.product-card');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const dotsContainer = document.querySelector('.slider-dots');

    let currentIndex = 0;
    let cardsToShow = 5;
    let autoSlideInterval;
    let isAutoSliding = true;
    const autoSlideDelay = 5000; // 5 seconds

    // Create dots
    function createDots() {
        dotsContainer.innerHTML = '';
        const dotCount = Math.ceil(productCards.length / cardsToShow);

        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            dotsContainer.appendChild(dot);
        }
    }

    // Update dots
    function updateDots() {
        const dots = document.querySelectorAll('.slider-dot');
        const activeDotIndex = Math.floor(currentIndex / cardsToShow);

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
    }

    // Go to specific slide
    function goToSlide(slideIndex) {
        currentIndex = slideIndex * cardsToShow;
        updateSlider();
        resetAutoSlide();
    }

    // Start auto sliding
    function startAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            if (isAutoSliding) {
                nextSlide();
            }
        }, autoSlideDelay);
    }

    // Reset auto slide timer
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Pause auto sliding on hover
    function setupAutoSlidePause() {
        slider.addEventListener('mouseenter', () => {
            isAutoSliding = false;
        });

        slider.addEventListener('mouseleave', () => {
            isAutoSliding = true;
            resetAutoSlide();
        });
    }

    // Next slide
    function nextSlide() {
        const maxIndex = Math.max(productCards.length - cardsToShow, 0);
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to start
        }
        updateSlider();
    }

    // Previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            // Loop to end
            currentIndex = Math.max(productCards.length - cardsToShow, 0);
        }
        updateSlider();
    }

    function updateSlider() {
        // Calculate card width based on current responsive setting
        const card = productCards[0];
        const cardWidth = card.offsetWidth + parseInt(window.getComputedStyle(card).marginRight);

        // Calculate how many cards to show based on screen width
        if (window.innerWidth < 576) {
            cardsToShow = 1;
        } else if (window.innerWidth < 768) {
            cardsToShow = 2;
        } else if (window.innerWidth < 992) {
            cardsToShow = 3;
        } else if (window.innerWidth < 1200) {
            cardsToShow = 4;
        } else {
            cardsToShow = 5;
        }

        // Calculate max index based on visible cards
        const maxIndex = Math.max(productCards.length - cardsToShow, 0);

        // Ensure currentIndex is within bounds
        currentIndex = Math.min(currentIndex, maxIndex);
        currentIndex = Math.max(currentIndex, 0);

        // Move the slider
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;

        // Update dots
        updateDots();
    }

    // Navigation buttons
    prevBtn.addEventListener('click', function () {
        prevSlide();
        resetAutoSlide();
    });

    nextBtn.addEventListener('click', function () {
        nextSlide();
        resetAutoSlide();
    });

    // Category filtering
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            const category = this.dataset.category;

            // Filter products
            productCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            // Reset slider position
            currentIndex = 0;
            updateSlider();
            createDots();
            resetAutoSlide();
        });
    });

    // Track affiliate link clicks
    document.querySelectorAll('.product-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const url = this.getAttribute('href');

            // Here you would typically send data to your analytics platform
            console.log('Affiliate link clicked:', url);

            // Redirect after tracking (remove this in production and use actual tracking)
            setTimeout(() => {
                window.open(url, '_blank');
            }, 300);
        });
    });

    // Initialize slider and update on resize
    createDots();
    updateSlider();
    startAutoSlide();
    setupAutoSlidePause();
    window.addEventListener('resize', function () {
        updateSlider();
        createDots();
    });
});
// ==============================================product


