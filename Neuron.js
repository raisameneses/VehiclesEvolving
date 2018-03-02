

//receives the input and the weights
var Neuron = function (input, weight){
    this.input = input;
    this.genome = weight;
    this.multiply = this.Multiply_matrix();
    this.output = this.Sigmoid(this.multiply);
}

//Light is giving "Not a number back for some isntances.. why?"
//Genome has some "undefined too. Must be the way I'm passing it to the Neural Network"
Neuron.prototype.Multiply_matrix = function(){
    var add_matrix = 0;
    for(var i = 1; i < this.input.length; i++){
        add_matrix = add_matrix + (this.input[i] * this.genome[i]);  
    }
     return add_matrix; 
}

Neuron.prototype.Sigmoid = function(x){
    var y = 1 / (1 + Math.pow(Math.E, -x));
    return y; 
}

Neuron.prototype.Neuron_output = function(){
    var weighted_inputs = this.Multiply_matrix();
    var output = this.Sigmoid(weighted_inputs);
    return output; 
}




  