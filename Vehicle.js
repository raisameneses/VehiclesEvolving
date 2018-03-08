/***********************************************************************
 * Circle - Helper to draw
 **********************************************************************/
var Circle = function (centerX, centerY, circleRadius) {
  this.center = new Vector(centerX, centerY);
  this.radius = circleRadius;
  this.mass = 10;  //Test different numbers.. this can be passed.
}
/***********************************************************************
 * Main Vehicle code
 **********************************************************************/
var AutonomousVehicle = function (game, light) {  
    this.game = game;     
    this.ctx = game.ctx; //graphics mngr
    this.lightSource = light; //target

    this.angle = Math.PI;  
    this.radius  = ((this.game.ctx.canvas.height) / 50);  
    this.position = new Circle(100, 100, this.radius );  //Update the circle in every iteration
    this.sensors = this.initSensors(); 
    this.sensor_brightness =  this.detectBrightness(); 
    this.Genome;
    this.direction = this.anglePosition(this.angle); 
    this.acceleration = .5;
    this.angularAcceleration = .5;  

    this.fitness = 0; 
  }  

AutonomousVehicle.prototype.init = function(){
  this.Genome = [];
  for (var i = 1 ; i < 10; i++) {
      this.Genome[i] = [];
      for (var j = 1; j < 13; j++) {
          this.Genome[i][j] =  Math.random() * 2 - 1;
      }
  }
}

AutonomousVehicle.prototype.initNoWeights = function(){
  this.Genome = [];
  for (var i = 1 ; i < 10; i++) {
      this.Genome[i] = [];
      for (var j = 1; j < 13; j++) {
          this.Genome[i][j] =  0;
      }
  }
}

AutonomousVehicle.prototype.updateGenome = function(genome){
      //this.Genome = genome;
      var weights = [];
      weights = genome; 
      for (var i = 1 ; i < 10; i++) {
          for (var j = 1; j < 13; j++) {
            this.Genome[i][j] = weights[i][j];
          }
      }
}


    //Crates a vector on a given angle of the circle, with respect to the circle's position
    AutonomousVehicle.prototype.anglePosition = function (SensorAngle){
      var x = this.position.center.vectorX + (this.radius * Math.sin(SensorAngle));
      var y = this.position.center.vectorY + (this.radius * Math.cos(SensorAngle)); 
      return new Vector(x, y); 
  }
  AutonomousVehicle.prototype.initSensors = function(){
    var sensor = [];
    for(var i = 1; i < 13; i++){
        var sensorAngle = ((Math.PI * i) / 6);
        sensor[i] = (this.anglePosition(sensorAngle + this.angle));
    }
    return sensor;
  }
  AutonomousVehicle.prototype.detectBrightness = function(){
    var brightness = [];
    for(var i = 1; i < 13; i++){ 
        var sensorDistance = this.sensors[i].distance(this.lightSource.lightLocation)        
        brightness[i] = (this.lightSource.luminosity / Math.pow(sensorDistance, 2)) *100; 
    }

    return brightness;
  }

  
  AutonomousVehicle.prototype.fitnessFunction = function(){
    var fitness
    var distance = this.position.center.distance(this.lightSource.lightLocation);  
    fitness = (1/Math.pow(distance, 2)) * 1000000; 
    return fitness 
  }
  //Is this updating I don't think so?? 
  AutonomousVehicle.prototype.update = function () { 
    //this.init();
   
    var neuralN = new NeuralNetwork(this.sensor_brightness, this.Genome)
    var wheels = neuralN.feedforward();
    var force;
    var rightWheel = wheels[1]; 
    var leftWheel = wheels[2]; 
    // console.log("right wheel")
    // console.log(rightWheel)
    // console.log("left wheel")
    // console.log(leftWheel)
    if(rightWheel > leftWheel){
        force = (rightWheel * this.acceleration);
    } else {
        force = (leftWheel  * this.acceleration);
    }
   //* this.angularAcceleration
    var torque = (rightWheel -  leftWheel ); 
    this.angle += torque;
    this.direction = this.anglePosition(this.angle);

    var dX =  (this.direction.vectorX - this.position.center.vectorX) * force;
    var dY =  (this.direction.vectorY - this.position.center.vectorY) * force;

    this.position.center.vectorX += dX ;
    this.position.center.vectorY += dY;
    this.fitness = this.fitnessFunction() 
    this.sensors = this.initSensors(); 
    this.sensor_brightness =  this.detectBrightness(); 

   
    // console.log(this.position.center)
    // for(var i = 1; i < this.sensor_brightness.length; i++){
    //   console.log(this.sensor_brightness[i])
    // }
  }
  
  AutonomousVehicle.prototype.draw = function () {  
    this.ctx.lineWidth = 3;
    this.makeCircle(this.position.center.vectorX, this.position.center.vectorY, this.radius, 'red');
    this.ctx.moveTo(this.position.center.vectorX, this.position.center.vectorY);
    this.ctx.lineTo( this.direction.vectorX, this.direction.vectorY); 
    this.ctx.stroke();
  }
  AutonomousVehicle.prototype.makeCircle = function(x, y, size, color) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, size, 0, 2 * Math.PI)
    this.ctx.closePath();
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

//############.....M  A  I  N.....#################

// var ASSET_MANAGER = new AssetManager();
// ASSET_MANAGER.queueDownload("./img/960px-Blank_Go_board.png");
// ASSET_MANAGER.downloadAll(function () {
//   console.log("Asser Manager and Game.");
//   var canvas = document.getElementById('gameWorld');
//   var ctx = canvas.getContext('2d');
//   var gameEngine = new GameEngine();   
//   gameEngine.init(ctx);   
//   var light = new LightSource(gameEngine);
//   var vehicle = new AutonomousVehicle(gameEngine, light);
//   gameEngine.addEntity(light);
//   gameEngine.addEntity(vehicle);
//   gameEngine.start();
// });