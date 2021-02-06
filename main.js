var colors = require('colors'); // https://www.npmjs.com/package/colors


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
/*function arrayClone (arr) {
	var i, copy;
	
	if (Array.isArray(arr)) {
		copy = arr.slice(0);
		for (i = 0; i < copy.length; i++) {
			copy[i] = arrayClone(copy[i]);
		}
		return copy;
	} else if(typeof arr === 'object') {
		throw 'Cannot clone array containing an object!';
	} else {
		return arr;
	}
}*/

class Field{
    #h;
    #w;
    #arr; // field
    // 1 - alive
    // 0 - dead
    constructor(height, width, max_){
        this.#h = height;
        this.#w = width;
        this.#arr = new Array(height);
        for (var i=0;i<height;i++){
            this.#arr[i] = new Array(width);
            for (var j=0;j<width;j++){
                this.#arr[i][j] = getRandomIntInclusive(0, max_) == 1? 1 : 0;
            }
        }
    }
    print_arr(){
        for (var i=0;i<this.#h;i++){
            for (var j=0;j<this.#w;j++){
                if (this.#arr[i][j] == 1){ // alive
                    process.stdout.write('  '.bgBlue);
                }
                else{ // dead
                    process.stdout.write('  ');
                }
            }
            process.stdout.write('\n');
        }
    }
    check(n, m){
        if (n >= 0 && n < this.#h && m >= 0 && m < this.#w){
            return true;
        }
        return false;
    }
    define_point(height, width){ 
        var result = 0;
        // по часові з -1 -1
        var height_1 = [height-1, height-1, height-1, height, height+1,height+1,height+1,height];
        var width_1 = [ width-1,  width,    width+1,  width+1,width+1, width,   width-1, width-1];

        for(var i=0; i < 8 && this.check(height_1[i], width_1[i]); i++){
            result += this.#arr[height_1[i]][width_1[i]];
            
        }
        console.log(result);
        if (result <= 1){
            return 0;
        }
        else if (result == 3){
            return 1;
        }
        else if (result >= 4){
            return 0;
        }
        else if (this.#arr[height][width] == 1 && (result == 2 || result == 3)){
            return 1;
        }
        else{
            return 0;
        }
        
    }
    update_field(){
        var arr2_temp =  Object.assign([], this.#arr);
        //var arr2_temp = this.#arr.slice();
        //var arr2_temp = arrayClone(this.#arr);
        for (var i=0;i<this.#h;i++){
            for (var j=0;j<this.#w;j++){
                arr2_temp[i][j] = define_point(i, j);
            }
        }
        this.#arr = Object.assign([], arr2_temp);
    }
    
    
}
var max_ = 3; // 1 - 50%, 2 - 33%, 3 - 25%, .......
var a = new Field(25, 25, max_);
a.print_arr();
a.update_field();
a.print_arr();


