
function randomInt(n) {
    return Math.floor(Math.random() * n);
}
/***********************************************************************
 * Vector -- Helper to build Vehicle's phenotype ****
 **********************************************************************/
var Vector = function (x, y) {
    this.vectorX = x,
    this.vectorY = y
}
Vector.prototype.addVector = function (v2) {
  this.vectorX += v2.vectorX;
  this.vectorY += v2.vectorY;
}

Vector.prototype.addValue = function (value) {
  this.vectorX += value;
  this.vectorY += value;
}
Vector.prototype.subtractVector = function (v2) {
  this.vectorX -= v2.vectorX;
  this.vectorY -= v2.vectorY;
}
//Multiplies vector by another vector
Vector.prototype.MultiplyVector = function (v2) {
  this.vectorX *= v2.vectorX;
  this.vectorY *= v2.vectorY;
}
//Multiplies vector by a number, not another vector
Vector.prototype.Multiply = function (value) {
  this.vectorX *= value;
  this.vectorY *= value;
}
//Distance formula
Vector.prototype.distance = function (v2) {
  var pow1 = Math.pow((v2.vectorX - this.vectorX), 2);
  var pow2 = Math.pow((v2.vectorY - this.vectorY ), 2);
  return Math.sqrt(pow1 + pow2);
}

//Vector's magnitude, used to normalize vector
Vector.prototype.magnitude = function(){
  return Math.sqrt((this.vectorX * this.vectorX) + (this.vectorY * this.vectorY)); 
}

Vector.prototype.Sqmg = function(){
  return (this.vectorX * this.vectorX) + (this.vectorY * this.vectorY); 
}
Vector.prototype.Limit = function(max){
  if(this.Sqmg > max * max){
    this.normalize();
    this.Multiply(max); 
  }
}
Vector.prototype.normalize = function (){
  var mag = this.magnitude();
  if(mag > 0){
    this.vectorX = (this.vectorX / mag); 
    this.vectorY = (this.vectorY / mag); 
  }
}

