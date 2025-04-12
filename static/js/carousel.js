function moveCarousel(carousel, direction) {
  const images = carousel.querySelector('.carousel-images');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const slideCount = slides.length;
  let currentIndex = parseInt(images.dataset.currentIndex || 0);

  currentIndex += direction;
  if (currentIndex >= slideCount) currentIndex = 0;
  if (currentIndex < 0) currentIndex = slideCount - 1;

  images.style.transform = `translateX(-${currentIndex * 100}%)`;
  images.dataset.currentIndex = currentIndex;
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.custom-carousel').forEach(carousel => {
    const images = carousel.querySelector('.carousel-images');
    images.dataset.currentIndex = 0;
    images.style.transform = 'translateX(0)';
  });
});
