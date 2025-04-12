document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.custom-carousel').forEach(carousel => {
    const images = carousel.querySelector('.carousel-images');
    let currentIndex = 0;

    images.style.transform = 'translateX(0)';

    carousel.querySelector('.prev').addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.children.length) % images.children.length;
      images.style.transform = `translateX(-${currentIndex * 100}%)`;
    });

    carousel.querySelector('.next').addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.children.length;
      images.style.transform = `translateX(-${currentIndex * 100}%)`;
    });
  });
});
