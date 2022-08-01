//fetching data from unsplash api
const count = 50;
const apikey = 'TpyV1OiKW4JFw1tIHhuOzNePiGdtOiJHFZlTKRttbqs';
const urlapi = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

const imagecontainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready=false;
let imageloaded=0;
let totalimages=0;

let photosarray = [];

function imageloader() {
  console.log("image loaded  ");
  imageloaded++;
  if(imageloaded===totalimages){
    ready=true;
    loader.hidden=true;
  }
}
function displayphotos() {
  imageloaded=0;
  totalimages=photosarray.length;
  photosarray.forEach((photo) => {
    //creating <a> to link to unsplash
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');
    //creating <img> for photo  
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);

    img.addEventListener('load', imageloader);
    //Now we have to put <img> inside <a> and then both inside imagecontainer
    item.appendChild(img);
    imagecontainer.appendChild(item);
  });
}
async function getimages() {
  try {
    const response = await fetch(urlapi);
    photosarray = await response.json();
    displayphotos();
  } catch (error) {
    console.log(error);
  }
}
getimages();

//add event listeners for scrolling 
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready=false;
    getimages();    
  }
})