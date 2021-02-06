var colors = require('colors'); // https://www.npmjs.com/package/colors


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

class Field{
    #h;
    #w;
    #arr; // field
    // 1 - alive
    // other dead
    constructor(height, width, max_){
        this.#h = height;
        this.#w = width;
        this.#arr = new Array(height);
        for (var i=0;i<height;i++){
            this.#arr[i] = new Array(width);
            for (var j=0;j<width;j++){
                this.#arr[i][j] = getRandomIntInclusive(0, max_);
            }
        }
    }
    print_arr(){
        for (var i=0;i<this.#h;i++){
            for (var j=0;j<this.#w;j++){
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
    update_field(){
        var arr2_temp = this.#arr;
        for (var i=0;i<this.#h;i++){
            for (var j=0;j<this.#w;j++){
                arr2_temp[i][j] = define_point(i , j);
            }
        }
    }
    define_point(n, m){
        var result;
        
        return result;
    }
}
var max_ = 3; // 1 - 50%, 2 - 33%, 3 - 25%, .......
var a = new Field(25, 25, max_);
a.print_arr();


