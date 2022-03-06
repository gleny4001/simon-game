const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).keypress(function (e) {
  if (!started) {
    $('#level-title').text('Level ' + level);
    nextSquence();
    started = true;
  }
});



$('.btn').click(function () {
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});


function nextSquence() {
  $('#level-title').text('Level ' + level);
  level++;
  userClickedPattern = [];

  // pick random color and apend it to an arry
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //Flash the button with chosen color
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  //Play sound that matches the color
  playSound(randomChosenColor);

}

//play sound
function playSound(name) {
  var buttonSound = new Audio('/sounds/' + name + '.mp3');
  buttonSound.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass('pressed')
  setTimeout(function () {
    $("#" + currentColor).removeClass('pressed')
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log('sucess');
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(nextSquence, 1000);
    }
  }

  else {
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200)
    $('#level-title').text('Game Over, Press Any Key to Restart');
    startOver();
  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;

}