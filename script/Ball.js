const BALL_ORIGIN = new Vector2(25, 25);

function Ball(position) {
  this.position = position;
  this.velocity = new Vector2();
}


Ball.prototype.update = function() {

  this.position.addTo(this.velocity);
}

Ball.prototype.draw = function() {
  Canvas.drawImage(sprites.whiteBall, this.position, BALL_ORIGIN);
}


Ball.prototype.shoot = function(power, rotation) {
  // console.log("Ball Shoot");
  this.velocity = new Vector2(Math.cos(rotation), Math.sin(rotation));
}
