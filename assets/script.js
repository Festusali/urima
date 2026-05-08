// Assigns corresponding value to price based on Net quantity
function checkForm() {
  const form = document.orderForm;
  const orderQty = form.quantity;
  const submitBtn = form.orderBtn;

  // Set prices based on quantity
  if (orderQty.value == 1) {
    form.price.value = "₦20,000";
  } else if (orderQty.value == 2) {
    form.price.value = "₦35,000";
  } else if (orderQty.value == 3) {
    form.price.value = "₦45,000";
  } else if (orderQty.value == 4) {
    form.price.value = "₦60,000";
  } else {
    alert("Please select a quantity");
    return false;
  }

  // Disable the button and change text to provide feedback
  submitBtn.disabled = true;
  submitBtn.innerText = "PROCESSING...";
  submitBtn.style.opacity = "0.7";
  submitBtn.style.cursor = "not-allowed";

  return true;
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
