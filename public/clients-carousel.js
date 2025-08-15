export function startClientsCarousel() {
  const container = document.querySelector('.clients-carousel-track');
  if (!container) return;

  let scrollAmount = 0;
  const speed = 1000; // px per frame
  function animate() {
    scrollAmount += speed;
    if (scrollAmount >= container.scrollWidth / 2) {
      scrollAmount = 0;
    }
    container.scrollLeft = scrollAmount;
    requestAnimationFrame(animate);
  }
  animate();
}
