// Assign corresponding value to price based on Urima quantity
function checkForm() {
  const form = document.orderForm;

  if (!form) {
    return false;
  }

  const orderQty = form.quantity.value;
  const submitBtn = form.orderBtn;
  let priceValue = 0;

  if (orderQty === "1") {
    priceValue = 22500;
  } else if (orderQty === "2") {
    priceValue = 40000;
  } else if (orderQty === "3") {
    priceValue = 55000;
  } else if (orderQty === "4") {
    priceValue = 68000;
  } else {
    alert("Please select a quantity");
    return false;
  }

  const quantityValue = parseInt(orderQty, 10);

  // Assign the formatted price to the hidden form field for the backend.
  form.price.value = "₦" + priceValue.toLocaleString();

  // Save order data for the confirmation page.
  sessionStorage.setItem("user_email", form.email.value);
  sessionStorage.setItem("user_phone", form.phone.value);
  sessionStorage.setItem("order_price", String(priceValue));
  sessionStorage.setItem("order_quantity", String(quantityValue));

  // Meta Pixel Tracking (AdToCart)
  if (typeof fbq === "function" && priceValue > 0) {
    console.log("Meta Pixel installed. Firing AdToCart event");

    fbq("track", "AdToCart", {
      content_name: "Urima Guard",
      content_ids: ["UG-01"],
      value: priceValue,
      currency: "NGN",
      num_items: quantityValue,
    });
  }

  // TikTok Tracking (AddToCart)
  if (typeof ttq !== "undefined" && priceValue > 0) {
    console.log("TikTok Pixel installed. Firing AddToCart event");

    ttq.track("AddToCart", {
      contents: [
        {
          content_id: "UG-01",
          content_name: "Urima Guard",
          quantity: quantityValue,
          price: priceValue,
        },
      ],
      value: priceValue,
      currency: "NGN",
    });
  }

  // Disable the button to prevent multiple submissions.
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = "PROCESSING...";
    submitBtn.style.opacity = "0.7";
    submitBtn.style.cursor = "not-allowed";
  }

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
