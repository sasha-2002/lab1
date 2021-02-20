var colors = require('colors'); // https://www.npmjs.com/package/colors
var blessed = require('blessed'); // https://www.npmjs.com/package/blessed


function get_random_number(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
class Field{
    #h;
    #w;
    #m;// 1 - 50%, 2 - 33%, 3 - 25%, ....... random
    #arr_current; // field
    #arr_old;
    // 1 - alive
    // 0 - dead
    constructor(height, width, max_){
        this.#h = height;
        this.#w = width;
        this.#m = max_;
        this.#arr_current = new Array(height);
        this.#arr_old = new Array(height);
        for (var i=0;i<height;i++){
            this.#arr_current[i] = new Array(width);  
            this.#arr_old[i] = new Array(width);  
        }
        this.mix();
    }
    clear(){
        main_field_box.setContent('');
        screen.render();
    }
    mix(){
        for (var i=0;i<this.#h;i++){
            for (var j=0;j<this.#w;j++){
                this.#arr_current[i][j] = get_random_number(0, this.#m) == 1? 1 : 0;
            }
        }
    }
    print_arr(){
        this.clear();
        for (var i=0;i<this.#h;i++){
            for (var j=0;j<this.#w;j++){
                if (this.#arr_current[i][j] == 1){ // alive                    
                    main_field_box.setContent(main_field_box.content + '  '.bgGreen);
                }               
                else{
                    if(typeof this.#arr_old != 'undefined'){
                        if(this.#arr_old[i][j] == 1){
                            main_field_box.setContent(main_field_box.content + '  '.bgWhite);
                        }
                        else{
                            main_field_box.setContent(main_field_box.content + '  ');
                        }
                    }
                    else{
                        main_field_box.setContent(main_field_box.content + '  ');
                    }
                    
                }
            }
            main_field_box.setContent(main_field_box.content + '\n');
        }
        screen.render();
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
            result += this.#arr_current[height_1[i]][width_1[i]];
            
        }
        
        if (this.#arr_current[height][width] == 1 && result <= 1){
            return 0;
        }
        else if (this.#arr_current[height][width] == 0 && result == 3){
            return 1;
        }
        else if (this.#arr_current[height][width] == 1 && result >= 4){
            return 0;
        }
        else if (this.#arr_current[height][width] == 1 && (result == 2 || result == 3)){
            return 1;
        }
        else{
            return 0;
        }
        
    }
    #save(){
        for (var i=0;i<this.#h;i++){ 
            for(var j=0;j<this.#w;j++){
                this.#arr_old[i][j] = this.#arr_current[i][j];
            } 
        }
        //this.#arr_old = Object.assign([], this.#arr_current); what???
    }
    update_field(){
        if(check_box_1.checked){
            this.#save();
        }
        
        var arr_temp =  Object.assign([], this.#arr_current);
        for (var i=0;i<this.#h;i++){
            for (var j=0;j<this.#w;j++){
                arr_temp[i][j] = this.#define_point(i, j);
            }
        }
        this.#arr_current = Object.assign([], arr_temp);
    }   
}


var screen = blessed.screen({
    smartCSR: true
});



var bg_box = blessed.box({
    top: 'center',
    left: 'center',
    width: '120%',
    height: '120%',
    tags: true,
    style: {
        bg: 'blue'
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
        bg: 'magenta'
    }
});

var input_1 = blessed.textarea({
    parent: form_1,
    top: '5%',
    left: '5%',
    width: '50%',
    height: '10%',
    colors: 'black',
    inputOnFocus: true,
    content: '3',
    tags: true,
    style: {
        bg: 'white',
        fg: 'black',
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
        bg: '#FFF830',
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
    content: 'Delete',
    style: {
        bg: '#FFF830',
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
        bg: '#FFF830',
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
        bg: '#FFF830',
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
        bg: '#FFF830',
        fg: 'black',
        focus: {
            bg: 'blue'
          },               
    }
});

var check_box_1 = blessed.checkbox({
    top: '20%',
    left: '5%',
    width: '25%',
    height: '5%',
    inputOnFocus: true,
    tags: true,
    content: 'OLD',
    style: {
        bg: 'green',
        fg: 'black',
        focus: {
            bg: 'blue'
          },               
    }
});

var label_1 = blessed.text({
    parent: form_1,
    top: '0%',
    left: '5%',
    width: '30%',
    height: '5%',
    colors: 'black',
    inputOnFocus: true,
    content: 'random',
    tags: true,
    style: {
        bg: '#48FFF3',
        fg: 'black',
        focus: {
            bg: 'blue'
          }   
    }
});
var label_2 = blessed.text({
    parent: form_1,
    top: '90%',
    left: '5%',
    width: '30%',
    height: '10%',
    colors: 'black',
    inputOnFocus: true,
    content: 'status',
    tags: true,
    style: {
        bg: 'white',
        fg: 'black',
        focus: {
            bg: 'blue'
          }   
    }
});
var label_3 = blessed.text({
    parent: form_1,
    top: '90%',
    left: '40%',
    width: '60%',
    height: '10%',
    colors: 'black',
    inputOnFocus: true,
    content: 'Виконав Загаєцький О. А. 3кн-19б',
    tags: true,
    style: {
        bg: 'white',
        fg: 'black',
        focus: {
            bg: 'blue'
          }   
    }
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
});

button_1.on('press', function() {//fill
    A = new Field(  parseInt(main_field_box.height), 
                    parseInt(main_field_box.width/2), 
                    input_1.value != ''? parseInt(input_1.value): 3
                    );
    A.print_arr();
});
button_2.on('press', function() {//delete
    A = new Field(0,0,0);
    A.clear();
});
button_3.on('press', function() {//stop
    clearInterval(id);
    label_2.content = 'status';
    screen.render();
});
button_4.on('press', function() {//step
    A.update_field();
    A.print_arr();
});
button_5.on('press',function() {//start
    id = setInterval(() => {
        A.update_field();
        A.print_arr();
    }, 100);
    label_2.content = 'working...';
});



screen.append(bg_box);
screen.append(main_field_box);
screen.append(form_1);
form_1.append(input_1);
form_1.append(check_box_1);
form_1.append(button_1);
form_1.append(button_2);
form_1.append(button_3);
form_1.append(button_4);
form_1.append(button_5);


form_1.append(label_1);
form_1.append(label_2);
form_1.append(label_3);


screen.title = 'game';
var A = new Field(0,0,0);
var id;





screen.render();