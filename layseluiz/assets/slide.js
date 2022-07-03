var slidesLeft = document.querySelectorAll('#slideshow-left .slide-item');
var slidesRight = document.querySelectorAll('#slideshow-right .slide-item');
var currentSlide = 0;
setInterval(nextSlide,5000);

function nextSlide() {
    slidesLeft[currentSlide].className = 'slide-item';
    slidesRight[currentSlide].className = 'slide-item';
    currentSlide = (currentSlide+1)%slidesLeft.length;
    slidesLeft[currentSlide].className = 'slide-item show';
    slidesRight[currentSlide].className = 'slide-item show';
}