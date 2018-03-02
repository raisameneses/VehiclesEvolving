var Population = function (game, light) {
    this.game = game;
    this.light_source = light;
    this.populationSize = 20; 
    this.mutationRate = (5/100) * this.populationSize; ;   
    this.poolLength = (50/100) * this.populationSize; 
    this.generation = 0;
    this.population;
    this.totalTime = 2; 
    this.elapsedTime = 0;
    this.currentCar = 1;
    this.current_car_fitness = 0;   
    this.createPopulation();  
  }
 
  Population.prototype.createPopulation = function(){
      this.population = [];
      for(let i = 1; i <= this.populationSize; i++){
        this.population[i] = new AutonomousVehicle(this.game, this.light_source); 
      } 
      for(let j = 1; j <= this.populationSize; j++){
          this.population[j].init();   
          this.game.addEntity(this.population[this.currentCar])
        }          
      
  }

  Population.prototype.update = function(){  
    var fitness_results = []  //Array to store the vehicles after driving for 10 seconds     
    if(this.generation < 20){       
    this.elapsedTime += this.game.clockTick;     
          if (this.elapsedTime > this.totalTime){  
            fitness_results[this.currentCar] = this.population[this.currentCar]
            this.current_car_fitness = fitness_results[this.currentCar].fitness          
            this.game.entities[2].removeFromWorld = true; 
            console.log("Removed: " + this.currentCar)
            this.currentCar++    
            if(this.currentCar <= this.populationSize){                
              this.game.addEntity(this.population[this.currentCar])   
            }
            this.elapsedTime = 0;
        }
         if(this.currentCar > this.populationSize){
            this.generation++            
            this.currentCar =  1; 
            // this.game.addEntity(this.population[this.currentCar])  
            // console.log(this.game.entities[2]) 
            // console.log(this.game.entities[2].removeFromWorld)  
             
        } 
    } 
 } 

  Population.prototype.draw = function(){
    this.game.ctx.font = "bold 20px Arial";
    this.game.ctx.fillStyle = "white";
    this.game.ctx.fillText("Elapsed Time  :   " + this.elapsedTime,400,50);
    this.game.ctx.fillText("Vehicle Number: " + this.currentCar,400,70);
    this.game.ctx.fillText("Generation    : " + this.generation,400,90);
    this.game.ctx.fillText("Fitness       : " + this.current_car_fitness,400,110);
  }

  //TODO
Population.prototype.mutate = function(weights){
      for (var m = 1; m < weights.length; m ++) {
            weights[m] +=  Math.random();
      }
  }
  function mySorter(a, b){
    return a.fitness - b.fitness; 
  }  

  //returns an array contining the genome 
  //that will be used for the next generation
  Population.prototype.crossover_n_mutation = function(currentPopulation){
    best = currentPopulation
    best.sort(mySorter);  //Array of vehicles
    var crossed_genome = []; //used to hold genome for crossover
    var mother = []
    var father = []
   //Cross over the best genome
    for(var p = 1; p < this.poolLength; p++){
      var randomParent = Math.floor(Math.random() * (this.poolLength)) + 1;
      mother[p] = best[randomParent].Genome
      randomParent = Math.floor(Math.random() * (this.poolLength)) + 1;    
      father[p] = best[randomParent].Genome
      var mother_or_father =  Math.round(Math.random());
          if(mother_or_father == 0){
            crossed_genome[p] = father[p]; 
          }          
      crossed_genome[p] = mother[p];           
  }
    return crossed_genome
}

//############.....M  A  I  N.....#################

var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./img/960px-Blank_Go_board.png");
ASSET_MANAGER.downloadAll(function () {
  console.log("Asser Manager and Game.");
  var canvas = document.getElementById('gameWorld');
  var ctx = canvas.getContext('2d');
  var gameEngine = new GameEngine();   
  gameEngine.init(ctx);   
  var light = new LightSource(gameEngine);
  var population = new Population(gameEngine, light);
  gameEngine.addEntity(light);
  gameEngine.addEntity(population);
  gameEngine.start();
});