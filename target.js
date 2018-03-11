/***********************************************************************
 * Light  = Target 
 **********************************************************************/
var LightSource = function(game){  
    this.ctx = game.ctx;
    this.radius = 40;
    this.lightLocation = new Vector((game.ctx.canvas.width / 2), (game.ctx.canvas.height / 2));
    this.luminosity = 1000; //Constant used to calculate light brightness with respect to each wheel.
  }
  LightSource.prototype.draw = function() {
    this.ctx.beginPath();
    this.ctx.arc(this.lightLocation.vectorX, this.lightLocation.vectorY, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(233, 189, 21)";
    this.ctx.fillStyle = "#FFFF00";
    this.ctx.fill();
  }
  
  LightSource.prototype.update = function() {
  }
  