var colors = require('colors'); // https://www.npmjs.com/package/colors


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

class field{
    #h;
    #w;
    #arr;
    constructor(height, width){
        this.#h = height;
        this.#w = width;
        this.#arr = new Array(h);
        for (var i=0;i<h;i++){
            this.#arr[i] = new Array(w);
            for (var j=0;j<w;j++){
                this.#arr[i][j] = getRandomIntInclusive(0, 1);
            }
        }
    }
    print_arr(){
        for (var i=0;i<h;i++){
            for (var j=0;j<w;j++){
                if (this.#arr[i][j] == 1){
                    process.stdout.write('  '.bgBlue);
                }
                else{
                    process.stdout.write('  ');
                }
            }
            process.stdout.write('\n');
        }
    }


    
}

//print_arr(arr);
var a = new field(25, 25);
a.print_arr();


