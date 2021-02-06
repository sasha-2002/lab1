var colors = require('colors'); // https://www.npmjs.com/package/colors
//console.log('    '.bgGreen);

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
var h = 25;
var w = 50;
var arr = new Array(h);
for (var i=0;i<h;i++){
    arr[i] = new Array(w);
    for (var j=0;j<w;j++){
        arr[i][j] = getRandomIntInclusive(0, 1);
    }
}


for (var i=0;i<h;i++){
    for (var j=0;j<w;j++){
        if (arr[i][j] == 1){
            process.stdout.write(' '.bgBlue);
        }
        else{
            process.stdout.write(' ');
        }
    }
    process.stdout.write('\n');

}



