var image_loaded = false;
var randomNumber = -1;

function getDiceImage() {
  switch (randomNumber) {
    case 1:
      return ({
        name: "truth",
        gif: "./images/truth_compress.gif",
        start: 168,
        end: 204,
      });
    case 2:
      return ({
        name: "one_shot",
        gif: "./images/one_shot_compress.gif",
        start: 79,
        end: 117,
      });
    case 3:
      return ({
        name: "pass",
        gif: "./images/pass_compress.gif",
        start: 118,
        end: 156,
      });
    case 4:
      return ({
        name: "one_other_shot",
        gif: "./images/one_other_shot_compress.gif",
        start: 40,
        end: 78,
      });
    case 5:
      return ({
        name: "two_shots",
        gif: "./images/two_shots_compress.gif",
        start: 205,
        end: 243,
      });
    case 6:
      return ({
        name: "dare",
        gif: "./images/dare_compress.gif",
        start: 1,
        end: 39,
      });
    default:
      return ({
        name: "tap_to_start",
        gif: "./images/tap_to_start_compress.gif",
        start: 157,
        end: 167,
      });
  }
}

var diceInterval = null;
var sup1 = null;

function generateRandomNumber() {
  randomNumber = Math.floor(Math.random() * 6) + 1;
}

function change_dice() {
  if (diceInterval !== null) {
    clearInterval(diceInterval);
  }
  generateRandomNumber();
  var newDiceImage = getDiceImage();
  var newDiceImageStartFrame = newDiceImage.start;
  var newDiceImageEndFrame = newDiceImage.end - 3;

  sup1.move_to(newDiceImageStartFrame);
  sup1.play();

  diceInterval = setInterval(function() {
    if (sup1.get_current_frame() >= newDiceImageEndFrame) {
      sup1.pause();
      clearTimeout(diceInterval);
    }
  }, 0);
}

function onImageLoaded () {
  image_loaded = true;
  if (diceInterval !== null) {
    clearInterval(diceInterval);
  }
  // Hide existing loading spinner and display image instead
  document.querySelector("#dice_image_root").style.display = "block";
  document.querySelector("#dice_image_root").style.cursor = "pointer";
  document.querySelector("#dice-hider").style.display = "none";
  document.querySelector("#root").style['align-items'] = "center";
  document.querySelector(".jsgif").onclick = change_dice;

  var defaultImage = getDiceImage(); // Since dice value is -1 by default, this will return the tap to start animation
  var defaultImageStart = defaultImage.start;
  var defaultImageEnd = defaultImage.end - 3;

  sup1.move_to(defaultImageStart);
  sup1.play();

  diceInterval = setInterval(function() {
    if (sup1.get_current_frame() >= defaultImageEnd) {
      sup1.pause();
      clearTimeout(diceInterval);
    }
  }, 0);
}

window.onload = function() {
  sup1 = new SuperGif({
    loop_mode: false,
    gif: document.getElementById('dice_image_container'),
    draw_while_loading: true,
    show_progress_bar: true,
    progressbar_foreground_color: "#ff5b0f",
    progressbar_background_color: "black",
  });
  document.querySelector("#dice_image_root").style.cursor = "default";
  sup1.load(function() {
    onImageLoaded();
  });
}
