
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

/* ==========================flot tools start */

// JavaScript - Updated with website redirection
document.addEventListener('DOMContentLoaded', function() {
    const toolsBtn = document.querySelector('.floating-tools-btn');
    const toolsPanel = document.querySelector('.tools-panel');
    const closeBtn = document.querySelector('.close-panel');
    let panelActive = false;
    
    // Show panel on hover
    toolsBtn.addEventListener('mouseenter', function() {
      if (!panelActive) {
        toolsPanel.classList.add('active');
      }
    });
    
    // Keep panel open when clicked
    toolsBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      panelActive = !panelActive;
      toolsPanel.classList.toggle('active', panelActive);
    });
    
    // Close panel when clicking close button
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      panelActive = false;
      toolsPanel.classList.remove('active');
    });
    
    // Close panel when clicking outside
    document.addEventListener('click', function() {
      if (panelActive) {
        panelActive = false;
        toolsPanel.classList.remove('active');
      }
    });
    
    // Prevent panel from closing when clicking inside it
    toolsPanel.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });
  
  function visitToolsWebsite() {
    // Redirect to brightwebs.com with smooth transition
    document.body.style.opacity = '0.8';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(function() {
      window.location.href = 'https://brightswebs.com';
    }, 300);
    
    // Optional: Track the click event
    console.log('Navigating to brightswebs.com');
    // You can add analytics here like:
    // ga('send', 'event', 'Button', 'Click', 'Visit Tools Website');
  }
/* ==========================flot tools end */