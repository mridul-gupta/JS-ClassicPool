let sprites = {};

let assetsStillLoading = 0;


function assetsLoadingLoop(callback) {

  if(assetsStillLoading) {
    requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
  } else {
    callback();
  }
}

function loadAssets(callback) {

  function loadSprite(fileName) {
    assetsStillLoading++;
    let spriteImage = new Image();

    spriteImage.src = "./assets/sprites/" + fileName;

    spriteImage.onload = function() {
      assetsStillLoading--;
    }

    spriteImage.onerror = function() {
      assetsStillLoading--;
      window.alert("loading error");
    }

    return spriteImage;
  }

  sprites.background = loadSprite('spr_background4.png');
  sprites.stick = loadSprite('spr_stick.png');
  sprites.whiteBall = loadSprite('spr_ball2.png');
  sprites.redBall = loadSprite('spr_redBall2.png');
  sprites.yellowBall = loadSprite('spr_yellowBall2.png');
  sprites.blackBall = loadSprite('spr_blackBall2.png');

  assetsLoadingLoop(callback);
}


function getBallSpritByColor(color) {
  switch(color){
    case COLOR.RED:
      return sprites.redBall;
    case COLOR.YELLOW:
      return sprites.yellowBall;
    case COLOR.WHITE:
      return sprites.whiteBall;
    case COLOR.BLACK:
      return sprites.blackBall;
    default:
      window.alert("loading error");
      return;
  }
}
