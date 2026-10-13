// Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    let current = 0;
    
    // Initialize slider
    function reset() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.opacity = '0';
        }
    }
    
    function startSlide() {
        reset();
        slides[0].style.opacity = '1';
    }
    
    function slideLeft() {
        reset();
        slides[current - 1].style.opacity = '1';
        current--;
    }
    
    function slideRight() {
        reset();
        slides[current + 1].style.opacity = '1';
        current++;
    }
    
    // Left arrow click
    prevBtn.addEventListener('click', function() {
        if (current === 0) {
            current = slides.length;
        }
        slideLeft();
    });
    
    // Right arrow click
    nextBtn.addEventListener('click', function() {
        if (current === slides.length - 1) {
            current = -1;
        }
        slideRight();
    });
    
    // Auto slide every 5 seconds
    setInterval(function() {
        if (current === slides.length - 1) {
            current = -1;
        }
        slideRight();
    }, 5000);
    
    startSlide();

    
/* Gallery Filter JavaScript */
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

    // Contact form submission with FormSubmit
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                return false;
            }
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Submit form
            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    alert(`Thank you, ${name}! Your message has been sent. We'll contact you soon.`);
                    contactForm.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                alert('There was a problem sending your message. Please try again later.');
                console.error('Error:', error);
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message';
            });
        });
    }
    
    // Mobile menu toggle (could be added if needed)
    // const menuToggle = document.createElement('div');
    // menuToggle.className = 'menu-toggle';
    // menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    // document.querySelector('header .container').appendChild(menuToggle);
    // 
    // menuToggle.addEventListener('click', function() {
    //     document.querySelector('header nav ul').classList.toggle('active');
    // });
});

// Form validation functions
function validateForm() {
    let isValid = true;
    
    // Validate name
    const name = document.getElementById('name').value.trim();
    if (name === '') {
        showError('name', 'Please enter your name');
        isValid = false;
    } else {
        clearError('name');
    }
    
    // Validate email
    const email = document.getElementById('email').value.trim();
    if (email === '') {
        showError('email', 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email');
        isValid = false;
    } else {
        clearError('email');
    }
    
    // Validate subject
    const subject = document.getElementById('subject').value;
    if (subject === '') {
        showError('subject', 'Please select a subject');
        isValid = false;
    } else {
        clearError('subject');
    }
    
    // Validate message
    const message = document.getElementById('message').value.trim();
    if (message === '') {
        showError('message', 'Please enter your message');
        isValid = false;
    } else {
        clearError('message');
    }
    
    return isValid;
}

function showError(fieldId, message) {
    const formGroup = document.getElementById(fieldId).closest('.form-group');
    formGroup.classList.add('error');
    
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearError(fieldId) {
    const formGroup = document.getElementById(fieldId).closest('.form-group');
    formGroup.classList.remove('error');
    
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Page loader
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Audio Player Functionality
const audio = document.getElementById('anthem-audio');
const audioPlayer = document.querySelector('.audio-player');
const playPauseBtn = document.querySelector('.play-pause-btn');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');

let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        audioPlayer.classList.remove('playing');
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play();
        audioPlayer.classList.add('playing');
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}

// Update progress bar
audio.addEventListener('timeupdate', function() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = progressPercent + '%';
    
    // Update time display
    currentTimeEl.textContent = formatTime(currentTime);
    if (duration) {
        durationEl.textContent = formatTime(duration);
    }
});

// Format time as minutes:seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Reset player when audio ends
audio.addEventListener('ended', function() {
    progressBar.style.width = '0%';
    currentTimeEl.textContent = '0:00';
    audioPlayer.classList.remove('playing');
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    isPlaying = false;
});

// Download function
function downloadAnthem() {
    const link = document.createElement('a');
    link.href = audio.src;
    link.download = 'Western_Choice_Anthem.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
