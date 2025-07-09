let bannerIndex = 1; // Start at 1 because we'll clone slides
const bannerCarousel = document.getElementById("banner-carousel");
const bannerSlides = document.querySelectorAll(".banner-slide");
const totalBannerImages = bannerSlides.length;

// Clone first and last slides for infinite effect
const firstClone = bannerSlides[0].cloneNode(true);
const lastClone = bannerSlides[totalBannerImages - 1].cloneNode(true);
bannerCarousel.appendChild(firstClone);
bannerCarousel.insertBefore(lastClone, bannerSlides[0]);

// Update CSS to accommodate cloned slides
bannerCarousel.style.transform = `translateX(${-bannerIndex * 100}vw)`;

function moveBannerSlide(direction) {
  bannerIndex += direction;
  bannerCarousel.style.transition = "transform 0.5s ease-in-out";
  bannerCarousel.style.transform = `translateX(${-bannerIndex * 100}vw)`;
}

// Reset position when reaching cloned slides
bannerCarousel.addEventListener("transitionend", () => {
  if (bannerIndex === 0) {
    bannerCarousel.style.transition = "none";
    bannerIndex = totalBannerImages;
    bannerCarousel.style.transform = `translateX(${-bannerIndex * 100}vw)`;
  } else if (bannerIndex === totalBannerImages + 1) {
    bannerCarousel.style.transition = "none";
    bannerIndex = 1;
    bannerCarousel.style.transform = `translateX(${-bannerIndex * 100}vw)`;
  }
});