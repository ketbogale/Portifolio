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

    // Show "Wait for it" message when a project card is clicked
    $('.project-card').on('click', function () {
        $('#project-message').remove();
        const msg = $('<div id="project-message">Wait for it, project is on the way!</div>');
        $('body').append(msg);
        setTimeout(() => {
            msg.fadeOut(400, function () { $(this).remove(); });
        }, 2000);
    });

    // List of common English words to avoid unnecessary API calls
    const commonWords = [
        'he','she','it','was','is','are','the','a','an','and','or','but','of','to','in','on','for','with','as','by','at','from','that','this','these','those','be','been','being','have','has','had','do','does','did','will','would','can','could','should','shall','may','might','must','not','so','if','then','than','too','very','just','right','left','up','down','out','about','over','under','again','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','only','own','same','so','than','too','very','i','you','we','they','my','your','his','her','their','our','me','him','them','us','who','whom','whose','which','what'
    ];

    // Helper: Check if a word exists in the English dictionary using Free Dictionary API
    async function isEnglishWord(word) {
        // Accept common words without API call
        if (commonWords.includes(word)) return true;
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            return response.ok;
        } catch {
            showFormMessage('You are offline. Please connect to the internet and try again.', 'error');
            throw new Error('offline');
        }
    }

    // Contact form submission (AJAX) with validation and feedback
    $('.contact-form').submit(async function (e) {
        e.preventDefault();

        // Check if user is offline FIRST
        if (!navigator.onLine) {
            showFormMessage('You are offline. Please connect to the internet and try again.', 'error');
            return;
        }

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

        // Remove punctuation and split into words
        var words = message.replace(/[.,'"\-?!:;()]/g, '').split(/\s+/);

        // Check each word using the dictionary API or local list
        for (let word of words) {
            word = word.toLowerCase().trim();
            if (word.length < 2) continue; // skip single letters and empty
            if (commonWords.includes(word)) continue;
            try {
                let exists = await isEnglishWord(word);
                if (!exists) {
                    showFormMessage('Please send the correct English words.', 'error');
                    return;
                }
            } catch (err) {
                // Already handled in isEnglishWord
                return;
            }
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
            error: function (xhr) {
                let msg = "Failed to send message. Please try again later.";
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    msg = xhr.responseJSON.message;
                }
                showFormMessage(msg, 'error');
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