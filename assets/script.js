// Assigns corresponding value to price based on Net quantity
function checkForm() {
  orderQty = document.orderForm.quantity;
  if (orderQty.value == 1) {
    document.orderForm.price.value = "₦20,000";
    return true;
  }
  if (orderQty.value == 2) {
    document.orderForm.price.value = "₦35,000";
    return true;
  }
  if (orderQty.value == 3) {
    document.orderForm.price.value = "₦45,000";
    return true;
  }
  if (orderQty.value == 4) {
    document.orderForm.price.value = "₦60,000";
    return true;
  }
}

// Carousel Auto-Loop Logic
const track = document.getElementById("carouselTrack");
const items = document.querySelectorAll(".testimonial-item");
let currentIndex = 0;

function moveCarousel() {
  const itemWidth = items[0].getBoundingClientRect().width;
  currentIndex++;

  // Reset when we reach the end
  // To make it infinitely smooth, we calculate how many items are visible
  const visibleItems =
    window.innerWidth < 600 ? 1 : window.innerWidth < 1000 ? 2 : 3;

  if (currentIndex > items.length - visibleItems) {
    currentIndex = 0;
  }

  track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

// Slide every 5 seconds
setInterval(moveCarousel, 5000);

// Fix: Recalculate on window resize to avoid alignment issues
window.addEventListener("resize", () => {
  track.style.transform = `translateX(0)`;
  currentIndex = 0;
});

// Gallery Carousel Logic
const galleryTrack = document.getElementById("galleryTrack");
const galleryItems = document.querySelectorAll(".gallery-item");
let galleryIndex = 0;

function updateGallery() {
  const width = galleryItems[0].clientWidth;
  galleryTrack.style.transform = `translateX(-${galleryIndex * width}px)`;
}

function moveGallery(step) {
  galleryIndex += step;

  if (galleryIndex >= galleryItems.length) {
    galleryIndex = 0; // Loop back to start
  } else if (galleryIndex < 0) {
    galleryIndex = galleryItems.length - 1; // Loop to end
  }

  updateGallery();
}

// Auto-loop every 5 seconds
let galleryInterval = setInterval(() => moveGallery(1), 5000);

// Pause auto-loop when user interacts with buttons
document.querySelectorAll(".gallery-prev, .gallery-next").forEach((btn) => {
  btn.addEventListener("click", () => {
    clearInterval(galleryInterval);
    galleryInterval = setInterval(() => moveGallery(1), 5000);
  });
});

// Sync on resize
window.addEventListener("resize", updateGallery);
