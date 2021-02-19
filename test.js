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