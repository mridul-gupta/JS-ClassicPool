const BALL_ORIGIN = new Vector2(25, 25);
const BALL_DIAMETER = 38;

function Ball(position, color) {
  this.position = position;
  this.velocity = new Vector2();
  this.moving = false;
  this.sprite = getBallSpritByColor(color);
}


Ball.prototype.update = function() {

  this.position.addTo(this.velocity.mult(DELTA));
  this.velocity = this.velocity.mult(0.97);

  if (this.velocity.length() < 5) {
    this.velocity = new Vector2();
    this.moving = false;
  }
}

Ball.prototype.draw = function() {
  Canvas.drawImage(this.sprite, this.position, BALL_ORIGIN);
}


Ball.prototype.shoot = function(power, rotation) {
  // console.log("Ball Shoot");
  this.velocity = new Vector2(power * Math.cos(rotation), power * Math.sin(rotation));
  this.moving = true;
}


Ball.prototype.collideWith = function(ball) {

  // Find a normal Vector2
  const n = this.position.subtract(ball.position);

  // Find distance
  const dist = n.length();

  if (dist > BALL_DIAMETER) {
    return; // No collision.
  }

  //console.log (this.position, ball.position, dist, BALL_DIAMETER);
  //console.log ('collision detected');


  // Step 1: Find unit normal Vector2
  const un = n.mult(1/n.length());

  // Step 2: Find unit tangent Vector2
  const ut = new Vector2(-un.y, un.x);

  // Step 3: Project velocities onto the unit normal and unit tangent vectors
  const v1n = un.dot(this.velocity);
  const v1t = ut.dot(this.velocity);
  const v2n = un.dot(ball.velocity);
  const v2t = ut.dot(ball.velocity);


  // Step 4: Find new normal velocities
  let v1nTag = v2n;
  let v2nTag = v1n;

  // Step 5: convert scalar velocities to vectors
  v1nTag = un.mult(v1nTag);
  const v1tTag = un.mult(v1t);
  v2nTag = un.mult(v2nTag);
  const v2tTag = un.mult(v2t);

  //Step 6: update velocities
  this.velocity = v1nTag.add(v1tTag);
  ball.velocity = v2nTag.add(v2tTag);

  this.moving = true;
  ball.moving = true;

}
