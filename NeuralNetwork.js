const num_hidden = 7;
const num_output = 3; 

 var NeuralNetwork = function(input, weights){
       this.genome = weights;
       this.input = input;

    }

 NeuralNetwork.prototype.feedforward = function(){
        //Array of hidden layers:
        var hiddenLayer = [];
        var hidden_output = [];
        for(var hidden = 1; hidden < num_hidden; hidden++){          
            hiddenLayer[hidden] = new Neuron(this.input, this.genome[hidden]); 
        }       
        //Multiply weights by inputs:
        for(var hid_out = 1; hid_out < num_hidden; hid_out++){  
            hidden_output[hid_out] =  hiddenLayer[hid_out].output; 
        }
             
        var outputLayer = [];
        var wheels = [];
        var gene  = 7; 
        for(var out = 1; out < num_output; out++){
            outputLayer[out] = new Neuron(hidden_output, this.genome[gene]); 
            gene++
        }
        //Activation function:
        for(var activate = 1; activate < num_output; activate++){
            wheels[activate] = outputLayer[activate].output;
        }     
      
        return wheels; 
  }

  NeuralNetwork.prototype.updateGenome = function(weights_updated){
        this.genome = weights_updated;
  }

  NeuralNetwork.prototype.updateInputs = function(input_updated){
        this.input = input_updated;
}






