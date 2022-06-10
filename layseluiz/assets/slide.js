var slides = document.querySelectorAll('#slideshow .slide-item');
var currentSlide = 0;
setInterval(nextSlide,5000);

function nextSlide() {
    slides[currentSlide].className = 'slide-item';
    currentSlide = (currentSlide+1)%slides.length;
    slides[currentSlide].className = 'slide-item show';
}