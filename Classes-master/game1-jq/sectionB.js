// Variable Diclaratin
let play = true;
let objMoveSpeed = 200
let objMoveDistance = 20
let blockMoveDistance = 20
let score = 0
let missed = 0

// Generate and drop object
let objectMovementInterval = setInterval(moveObjectDown, objMoveSpeed);
generateObject();

function generateObject() {
  clearInterval(objectMovementInterval);
  let obj = '<div class="obj"></div>';
  $(".wrapper").append(obj);
  let wrapperPosition = $(".wrapper").position();
  let wrapperWidth = $(".wrapper").width();
  let objWidth = $(document).find(".obj").width();
  // Generate Random Co-ordinates for falling object
  let positionX = randomIntFromInterval(
    wrapperPosition.left,
    wrapperWidth - objWidth
  );
  $(".obj").css("left", positionX);
  $(".obj").css("top", 0);
  objectMovementInterval = setInterval(moveObjectDown, objMoveSpeed);
}
// This function generates random number between two numbers
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

$(document).keyup(function (e) {
  let keyCode = e.which;
  if (keyCode === 39) {
    moveRight();
  }

  if (keyCode === 37) {
    moveLeft();
  }

  if (keyCode === 32) {
    if (play) {
      clearInterval(objectMovementInterval);
      play = false;
    } else {
      objectMovementInterval = setInterval(moveObjectDown, objMoveSpeed);
      play = true;
    }
  }
});

function moveRight() {
  let blokcPosition = $(".block").position();
  if (blokcPosition.left < 280) {
    $(".block").css("left", blokcPosition.left + blockMoveDistance);
  }
}

function moveLeft() {
  let blokcPosition = $(".block").position();
  if (blokcPosition.left > 20) {
    $(".block").css("left", blokcPosition.left - blockMoveDistance);
  }
}

function moveObjectDown() {
  let obj = $(".obj");
  let position = obj.position();
  let objHeight = $(document).find(".obj").height();
  let blockPosition = $(document).find(".block").position();
  if (position.top + objHeight + objMoveDistance <= blockPosition.top) {
    obj.css("top", position.top + objMoveDistance);
  } else {
    checkScore()
    // Clear current falling object and create new one
    $(document).find(".obj").remove();
    generateObject();
  }
}

function checkScore(){
  let objPostion = $(document).find('.obj').position()
  let objWidth = $(document).find('.obj').width()
  let objPositionLeft = objPostion.left
  let objPositionRight = objPositionLeft + objWidth

  let blockPosition = $(document).find('.block').position()
  let blockWidth = $(document).find('.block').width()
  let blockPositionLeft = blockPosition.left
  let blockPositionRight = blockPositionLeft + blockWidth
  if(objPositionRight > blockPositionLeft && objPositionLeft < blockPositionRight){
    score++
    $('.score').html(score)
    if(score%5==0){
      objMoveSpeed -= 50
    }
  }else{
    missed ++
    if(missed > 3){
      score = 0
      missed = 0
      $('.score').html('Game Over') 
    }
  }

}