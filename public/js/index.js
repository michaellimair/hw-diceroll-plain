var image_loaded = false;
var randomNumber = -1;

function getDiceImage() {
  switch (randomNumber) {
    case 1:
      return ({
        gif: "./images/truth_compress.gif"
      });
    case 2:
      return ({
        gif: "./images/one_shot_compress.gif"
      });
    case 3:
      return ({
        gif: "./images/pass_compress.gif"
      });
    case 4:
      return ({
        gif: "./images/one_other_shot_compress.gif"
      });
    case 5:
      return ({
        gif: "./images/two_shots_compress.gif"
      });
    case 6:
      return ({
        gif: "./images/dare_compress.gif"
      });
    default:
      return null;
  }
}

function generateRandomNumber() {
  randomNumber = Math.floor(Math.random() * 6) + 1;
}

function change_dice() {
  // Disable change dice while the dice is loading
  document.querySelector("#root").onclick = function () {}
  document.querySelector("#dice_image_root").style.cursor = "default";

  // Remove all elements inside the dice image container
  var rootNode = document.querySelector("#dice_image_root");
  while (rootNode.firstChild) {
    rootNode.removeChild(rootNode.lastChild);
  }

  // Display loading spinner
  document.querySelector("#spinner-container").style.display = "block";
  sup1 = null;

  setTimeout(function () {
    generateRandomNumber();
    var newDiceImage = getDiceImage();
    var newDiceImageGif = newDiceImage.gif;

    // Create new image element with the new GIF image according to the generated random number
    var imageElement = document.createElement("img");
    imageElement.src = newDiceImageGif;
    imageElement['rel:animated_src'] = newDiceImageGif;
    imageElement['rel:auto_play'] = "1";
    imageElement.width="auto";
    imageElement.height="100%";
    imageElement.id = "dice_image_container";
    document.querySelector("#dice_image_root").appendChild(imageElement);

    // Turn the newly created image element to a SuperGif object to allow manipulation
    imageElement.onload = function() {
      sup1 = new SuperGif({
        loop_mode: false,
        gif: document.getElementById('dice_image_container'),
        draw_while_loading: false
      } );
      sup1.load(onImageLoaded);
    }
  }, 100);
}

function preloadImage(url, anImageLoadedCallback){
  var img = new Image();
  img.onload = anImageLoadedCallback;
  img.src = url;
}

function preloadImages(urls, allImagesLoadedCallback){
  var loadedCounter = 0;
  var toBeLoadedNumber = urls.length;
  urls.forEach(function(url){
    preloadImage(url, function(){
        loadedCounter++;
            console.log('Number of loaded images: ' + loadedCounter);
      if(loadedCounter == toBeLoadedNumber){
        allImagesLoadedCallback();
      }
    });
  });
}

function onImageLoaded () {
  image_loaded = true;
  document.querySelector("#dice_image_root").style.display = "block";
  document.querySelector("#dice_image_root").style.cursor = "pointer";
  document.querySelector("#spinner-container").style.display = "none";
  document.querySelector(".jsgif").onclick = change_dice;
}

window.onload = function() {
  // Preload all GIF images
  preloadImages([
    "./images/tap_to_start_compress.gif",
    "./images/truth_compress.gif",
    "./images/one_shot_compress.gif",
    "./images/pass_compress.gif",
    "./images/one_other_shot_compress.gif",
    "./images/two_shots_compress.gif",
    "./images/dare_compress.gif",
  ], function () {
    var sup1 = new SuperGif({
      loop_mode: false,
      gif: document.getElementById('dice_image_container'),
      draw_while_loading: false
    });
    document.querySelector("#dice_image_root").style.cursor = "default";
    sup1.load(function() {
      onImageLoaded();
    });
  });
}
