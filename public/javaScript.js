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

    // Contact form submission (AJAX) with validation and feedback
    $('.contact-form').submit(function (e) {
        e.preventDefault();
        var name = $('input[name="name"]').val().trim();
        var email = $('input[name="email"]').val().trim();
        var message = $('textarea[name="message"]').val().trim();
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Simple validation
        if (!name || !email || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        if (!emailPattern.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        var form = $(this);
        var formData = form.serialize();

        $.ajax({
            url: '/contact',
            type: 'POST',
            data: formData,
            success: function (response) {
                showFormMessage(response.message, 'success');
                form[0].reset();
            },
            error: function (xhr, status, error) {
                showFormMessage('Failed to send message. Please try again later.', 'error');
                console.error('Error:', error);
            }
        });
    });

    // Helper function to show feedback messages
    function showFormMessage(message, type) {
        var msgDiv = $('#form-message');
        if (!msgDiv.length) {
            msgDiv = $('<div id="form-message"></div>');
            $('.contact-form').prepend(msgDiv);
        }
        msgDiv.text(message)
            .removeClass('success error')
            .addClass(type)
            .fadeIn();

        setTimeout(function () {
            msgDiv.fadeOut();
        }, 4000);
    }
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