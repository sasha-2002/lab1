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