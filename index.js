
var navLinks = document.getElementById("navLinks");

function showMenu() {
    navLinks.style.right = "0";
}

function hideMenu() {
    navLinks.style.right = "-250px";
}



// header fixed jquery

$(window).on("scroll", function () {
    if ($(window).scrollTop()) {
        $('nav').addClass('black');
    } else {
        $('nav').removeClass('black');
    }
});

