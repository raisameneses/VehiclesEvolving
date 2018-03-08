var Population = function (game, light) {
    this.game = game;
    this.light_source = light;
    this.populationSize = 15; 
    this.lifeCycle = 100;    
    this.poolLength = (30/100) * this.populationSize; //10%
    this.generation = 0;
    this.population =[];
    this.totalTime = 10; 
    this.elapsedTime = 0;
    this.currentCar = 1;
    this.current_car_fitness = 0;   
    this.createPopulation();  
  }
 
  Population.prototype.createPopulation = function(){
      //this.population = [];
      for(let i = 1; i <= this.populationSize; i++){
        this.population[i] = new AutonomousVehicle(this.game, this.light_source); 
      } 
      for(let j = 1; j <= this.populationSize; j++){
          this.population[j].init();  
          this.game.addEntity(this.population[this.currentCar])
        }   
  }

  Population.prototype.update = function(){     
    if(this.generation < this.lifeCycle){       
    this.elapsedTime += this.game.clockTick;     
       if (this.elapsedTime > this.totalTime){  
            this.current_car_fitness = this.population[this.currentCar].fitness          
            this.game.entities[2].removeFromWorld = true; 
            this.currentCar++    
            if(this.currentCar <= this.populationSize){  
              this.game.addEntity(this.population[this.currentCar])   
            }
            this.elapsedTime = 0;
        }
         else if(this.currentCar == this.populationSize){           
          this.current_car_fitness = this.population[this.currentCar].fitness 
           //Let's select the best genomes to pass down to the new generation           
            var bestGenome = this.retainBest(this.population) //returns the best performing vehicles
            var newGenome = this.crossover(this.population) //Crossover
            for(var j = 1; j < newGenome.length; j++){ //Mutate             
                var mutate = Math.random()            
                if(mutate > 0.5) {
                  console.log("I mutated!!!!")
                  this.mutate(newGenome[j])
                }
            }  
            //Create new generation of vehicles
            for(let newGeneration = 1; newGeneration <= this.populationSize; newGeneration++){
              this.population[newGeneration] = new AutonomousVehicle(this.game, this.light_source); 
            }  
            //Initialize the Genome         
            for(var i = 1; i <= this.populationSize; i++){
              this.population[i].initNoWeights()
            } 
             //Retain the best performing vehicles
             for(var b = 1; b < 5; b++){
              var random = Math.floor(Math.random() * (4)) + 1;  
              // console.log(b)
              // console.log(bestGenome[b])
              // console.log(this.population[b])
              this.population[b].updateGenome(bestGenome[b].Genome) 
            }
            //Give the rest of the vehicles a new genome based on crossover
            for(var p = 5; p <= this.populationSize; p++){
              var random = Math.floor(Math.random() * (newGenome.length - 1)) + 1;  
              this.population[p].updateGenome(newGenome[random]) 
            }
             //Next round
             this.generation++                         
             this.currentCar =  1;  
            console.log(this.generation)
            for(var i = 1; i <= this.populationSize; i++){
              console.log(this.population[i].Genome)
            } 
               
        } 
    } 
 } 


  Population.prototype.draw = function(){
    this.game.ctx.font = "bold 20px Arial";
    this.game.ctx.fillStyle = "white";
    this.game.ctx.fillText("Elapsed Time  :   " + this.elapsedTime,400,50);
    this.game.ctx.fillText("Vehicle Number: " + this.currentCar,400,70);
    this.game.ctx.fillText("Generation    : " + this.generation,400,90);
    this.game.ctx.fillText("Prev Fitness: " + this.current_car_fitness,400,110);
  }

  

Population.prototype.mutate = function(weights){
      for (var i = 1 ; i <  10; i++) {
        for (var j = 1; j < 13; j++) {
          weights[i][j] += Math.random() * 2 - 1;
        }
    }
  }
  function mySorter(a, b){
    return (b.fitness - a.fitness)
   
  }  
  //returns an array with the top performing vehicles. 
  Population.prototype.retainBest = function(currentPopulation){
     var all_vehicles = [];
     var top_5 = [];
     for(var i = 1; i < currentPopulation.length; i++){
      all_vehicles[i] = currentPopulation[i];
     }
     all_vehicles.sort(mySorter)
     for(var j = 1; j < 5; j++){
       top_5[j] = all_vehicles[j];
     }
     return top_5;
  }
  //returns an array contining the genome 
  //that will be used for the next generation
  Population.prototype.crossover = function(currentPopulation){
    var randomMother
    var randomFather
    currentPopulation.sort(mySorter);  //Array of vehicles
    //FOR DEBUGGING 
    for(var p = 1; p < currentPopulation.length - 1; p++){
      console.log(currentPopulation[p].fitness)
    }
    var crossed_genome = []; //used to hold genome for crossover
    var mother = []
    var father = []
    var poolLimit = Math.floor(this.poolLength)
   //Mix up mother and father genome from the best genome pool
    for(var p = 1; p <= poolLimit; p++){
      randomMother = Math.floor(Math.random() * (poolLimit)) + 1;      
      randomFather = Math.floor(Math.random() * (poolLimit)) + 1;
      console.log("Mother's fitness")
      console.log(currentPopulation[randomMother].fitness)
      mother[p] = currentPopulation[randomMother].Genome 
      console.log("Father's fitness")
      console.log(currentPopulation[randomFather].fitness)   
      father[p] = currentPopulation[randomFather].Genome
      var mother_or_father =  Math.round(Math.random());
      for(var i = 1; i < 10; i++){
          if(mother_or_father == 0){
            crossed_genome[p] = father[p]; 
          } else{
            crossed_genome[p] = mother[p];
          }     
       }         
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