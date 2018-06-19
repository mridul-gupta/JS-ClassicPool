function Stick() {
  this.position = new Vector2(400, 400);
  this.origin = new Vector2(500, 10);
}


Stick.prototype.update = function() {

  // Testing
  this.position = Mouse.position;

  if (Mouse.left.pressed)
    console.log("Left pressed");
}


Stick.prototype.draw = function() {

  Canvas.drawImage(sprites.stick, this.position, this.origin);

}
