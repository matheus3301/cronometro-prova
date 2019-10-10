var min = 0;
var seg = 0;

function start(){
    setInterval(push(),1000);
}

function push(){
    if(seg == 60){
        seg = 0;
        min++;
    }else{
        seg++;
    }
}

function render(){
    $(".clock").html(min+":"+seg);

}
start();
