
var navLinks = document.getElementById("navLinks");

function showMenu() {
    navLinks.style.right = "0";
}

function hideMenu() {
    navLinks.style.right = "-190px";
}


// nav scroll color start
// header fixed jquery

$(window).on("scroll", function () {
    if ($(window).scrollTop()) {
        $('nav').addClass('black');
    } else {
        $('nav').removeClass('black');
    }
});
// nav scroll color end

// whatsapp floot Btn start
// Add click animation
const whatsappBtn = document.querySelector('.whatsapp-btn');

whatsappBtn.addEventListener('click', function (e) {
    e.preventDefault();

    // Add click animation
    this.style.transform = 'scale(0.9)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);

    // Open WhatsApp after animation
    setTimeout(() => {
        window.open(this.href, '_blank');
    }, 300);
});

// Optional: Hide button when printing
window.addEventListener('beforeprint', () => {
    whatsappBtn.style.display = 'none';
});
window.addEventListener('afterprint', () => {
    whatsappBtn.style.display = 'flex';
});
// whatsapp floot Btn end

