const imageContainer = document.getElementById("imageContainer");
const loader = document.getElementById("loader");
let photosArray = [];
const count = 10;
const apiKey = "eqjmy_U9MHsKULRVMjtXhK0MIOD15YdBUyub_q8jSyk";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Create Elelments for links and photos
function displayPhotos() {
  photosArray.forEach((photo) => {
    // Create <a> to links to unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.link.html);
    item.setAttribute("target", "_blank");
    // create <img> for photos
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_desription);
    // put <img> inside <a>, then put both inside image
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from UNSPLASH API
async function getphotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json;
    // console.log(photosArray);
  } catch (e) {
    console.log(e);
  }
}

getphotos();
