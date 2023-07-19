const imageContainer = document.getElementById("imageContainer");
const loader = document.getElementById("loader");
let ready = false;
let imageloaded = 0;
let totalImages = 0;
let photosArray = [];
const count = 30;
const apiKey = "eqjmy_U9MHsKULRVMjtXhK0MIOD15YdBUyub_q8jSyk";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images are loaded or not
function imageLoader() {
  imageloaded++;
  if (imageloaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Create Elements for links and photos
function displayPhotos() {
  // Reset variables for new photos
  imageloaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);

    img.addEventListener("load", imageLoader);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from UNSPLASH API
async function getPhotos() {
  try {
    ready = false;
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (e) {
    console.log(e);
  }
}

// Initially load photos
getPhotos();

// Event listener for infinite scroll
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - (800 && ready)
  ) {
    ready = true; // Prevent new fetch until current batch is loaded
    loader.hidden = false; // Show loader while fetching new photos
    getPhotos();
  }
});
