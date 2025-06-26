// Smooth scrolling for navigation links
$(document).ready(function () {
    $("nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });

    // Navbar scroll effect
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#mainNav').addClass('scrolled');
        } else {
            $('#mainNav').removeClass('scrolled');
        }
    });

    // Section animation on scroll
    function checkScroll() {
        $('section').each(function () {
            var sectionTop = $(this).offset().top;
            var sectionBottom = sectionTop + $(this).outerHeight();
            var scrollPosition = $(window).scrollTop() + $(window).height() * 0.8;

            if (scrollPosition > sectionTop && $(window).scrollTop() < sectionBottom) {
                $(this).addClass('visible');
            }
        });
    }
    $(window).on('load scroll', checkScroll);
    checkScroll();

    // Contact form submission (AJAX)
    $('.contact-form').submit(function (e) {
        e.preventDefault();
        var form = $(this);
        var formData = form.serialize();

        $.ajax({
            url: '/contact',
            type: 'POST',
            data: formData,
            success: function (response) {
                alert(response.message);
                form[0].reset();
            },
            error: function () {
                alert('Failed to send message. Please try again later.');
            }
        });
    });
});

// Responsive menu toggle
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menuIcon");
    const navLinks = document.getElementById("navLinks");

    if (menuIcon && navLinks) {
        menuIcon.addEventListener("click", function () {
            // Toggle both 'show' class and aria-expanded attribute
            const isExpanded = menuIcon.getAttribute('aria-expanded') === 'true';
            menuIcon.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle("show");
            // Animate the menu icon
            menuIcon.classList.toggle("open");
        });
    }
});
