var colors = require('colors'); // https://www.npmjs.com/package/colors
var blessed = require('blessed'); // https://www.npmjs.com/package/blessed
//var s = require(__dirname + '/elements.js');

function get_random_number(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
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
                this.#arr[i][j] = get_random_number(0, max_) == 1? 1 : 0;
            }
        }
    }
    print_arr(){
        for (var i=0;i<this.#h;i++){
            for (var j=0;j<this.#w;j++){
                if (this.#arr[i][j] == 1){ // alive
                    process.stdout.write('  '.bgGreen);
                }
                else{ // dead
                    process.stdout.write('  ');
                }
            }
            process.stdout.write('\n');
        }
    }
    #check(n, m){
        if (n >= 0 && n < this.#h && m >= 0 && m < this.#w){
            return true;
        }
        return false;
    }
    #define_point(height, width){ 
        var result = 0;
        // по часові з -1 -1
        // [-1][-1] [-1][0] [-1][+1]
        //  [0][-1] [0][0]  [0][+1]
        // [+1][-1] [+1][0] [+1][+1]
        var height_1 = [height-1, height-1, height-1, height, height+1,height+1,height+1,height];
        var width_1 = [ width-1,  width,    width+1,  width+1,width+1, width,   width-1, width-1];

        for(var i=0; i < 8 && this.#check(height_1[i], width_1[i]); i++){
            result += this.#arr[height_1[i]][width_1[i]];
            
        }
        
        if (this.#arr[height][width] == 1 && result <= 1){
            return 0;
        }
        else if (this.#arr[height][width] == 0 && result == 3){
            return 1;
        }
        else if (this.#arr[height][width] == 1 && result >= 4){
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
        for (var i=0;i<this.#h;i++){
            for (var j=0;j<this.#w;j++){
                arr2_temp[i][j] = this.#define_point(i, j);
            }
        }
        this.#arr = Object.assign([], arr2_temp);
    }   
}
function sleep(milliseconds) {
    const date = Date.now();
    let current_date = null;
    do {
      current_date = Date.now();
    } while (current_date - date < milliseconds);
}
function main(){
    var max_ = 3; // 1 - 50%, 2 - 33%, 3 - 25%, .......
    var a = new Field(25, 25, max_);
    
    a.print_arr();
    sleep(2000);
    while(true){
        a.update_field();
        a.print_arr();
        sleep(200);
        console.clear();
    }
}

//main();


var screen = blessed.screen({
    smartCSR: true
});

screen.title = 'game';

var bg_box = blessed.box({
    top: 'center',
    left: 'center',
    width: '120%',
    height: '120%',
    tags: true,
    style: {
        bg: 'green'
    }
});

var main_field_box = blessed.box({
    top: 'center',
    left: 'left',
    width: '70%',
    height: '95%',
    tags: true,
    style: {
        bg: 'black'
    }
});

var form_1 = blessed.form({
    parent: screen,
    keys: true, 
    top: '5%',
    left: '70%',
    width: '30%',
    height: '95%',
    tags: true,
    style: {
        bg: 'red'
    }
});

var input_1 = blessed.textarea({
    top: '5%',
    left: '5%',
    width: '50%',
    height: '10%',
    colors: 'black',
    inputOnFocus: true,
    content: '3',
    tags: true,
    style: {
        bg: 'black',
        fg: 'white',
        focus: {
            bg: 'blue'
          }   
    }
});
var input_2 = blessed.textarea({
    top: '20%',
    left: '5%',
    width: '50%',
    height: '10%',
    colors: 'black',
    inputOnFocus: true,
    content: '200',
    tags: true,
    style: {
        bg: 'black',
        fg: 'white',
        focus: {
            bg: 'blue'
          }   
    }
});

var button_1 = blessed.button({
    parent: form_1,
    mouse: true,
    keys: true,
    shrink: true,
    top: '5%',
    left: '70%',
    width: '20%',
    height: '10%',
    name: 'cancel',
    tags: true,
    content: 'Fill',
    style: {
        bg: 'white',
        fg: 'black',
        focus: {
            bg: 'blue'
          }           
    }    
});
var button_2 = blessed.button({
    top: '20%',
    left: '70%',
    width: '20%',
    height: '10%',
    inputOnFocus: true,
    tags: true,
    content: 'HAND',
    style: {
        bg: 'white',
        fg: 'black',
        focus: {
            bg: 'blue'
          },               
    }
});
var button_3 = blessed.button({
    top: '35%',
    left: '70%',
    width: '20%',
    height: '10%',
    inputOnFocus: true,
    tags: true,
    content: 'Stop',
    style: {
        bg: 'white',
        fg: 'black',
        focus: {
            bg: 'blue'
          },               
    }
});
var button_4 = blessed.button({
    top: '50%',
    left: '70%',
    width: '20%',
    height: '10%',
    inputOnFocus: true,
    tags: true,
    content: 'Step',
    style: {
        bg: 'white',
        fg: 'black',
        focus: {
            bg: 'blue'
          },               
    }
});
var button_5 = blessed.button({
    top: '65%',
    left: '70%',
    width: '20%',
    height: '10%',
    inputOnFocus: true,
    tags: true,
    content: 'Start',
    style: {
        bg: 'white',
        fg: 'black',
        focus: {
            bg: 'blue'
          },               
    }
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
});


button_1.on('press', function() {
    return process.exit(0);
    
  });
  button_2.on('press', function() {
    return process.exit(0);
    
  });

screen.append(bg_box);
screen.append(main_field_box);
screen.append(form_1);
form_1.append(input_1);
form_1.append(input_2);
form_1.append(button_1);
form_1.append(button_2);
form_1.append(button_3);
form_1.append(button_4);
form_1.append(button_5);



//button_1.focus();
screen.render();