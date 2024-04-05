var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var _gameOver = false;

function nextSequence() {
  level++;

  $("h1").text("Level " + level);

  var randomNumber = Math.floor((Math.random() * 10) % 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  nextButton(randomChosenColour);
}

function nextButton(idName) {
  $("#" + idName)
    .fadeOut()
    .fadeIn();
  playerAudio(idName);
}

function playerAudio(musicName) {
  var audio = new Audio("sounds/" + musicName + ".mp3");
  audio.play();
}

function animatePress(buttonSelect) {
  $(buttonSelect).addClass("pressed ");
  setTimeout(function () {
    $(buttonSelect).removeClass("pressed");
  }, 100);
}

function checkAswer(currentLevel) {
  var isClickRight =
    gamePattern[currentLevel] == userClickedPattern[currentLevel];

  if (isClickRight == true) {
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(function () {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  $(".btn").off("click");
  $("body").addClass("game-over");
  $("h1").text("Game Over, Press Any Key to Restart");
  playerAudio("wrong");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  _gameOver = true;
}

function startOver() {
  _gameOver = false;
  gamePattern = [];
  level = 0;
  userClickedPattern = [];
  $(".btn").on("click", function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(this);
    playerAudio(this.id);
    checkAswer(userClickedPattern.length - 1);
  });
}

$(".btn").on("click", function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  animatePress(this);
  playerAudio(this.id);
  checkAswer(userClickedPattern.length - 1);
});

$(document).on("keydown", function () {
  if (level == 0) {
    nextSequence();
  } else if (_gameOver == true) {
    startOver();
  }
});
