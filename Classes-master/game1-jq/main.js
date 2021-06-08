// Variable Diclaratin
let play = true;
let objMoveSpeed = 500
let objMoveDistance = 20
let blockMoveDistance = 20

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
    // Clear current falling object and create new one
    $(document).find(".obj").remove();
    generateObject();
  }
}
