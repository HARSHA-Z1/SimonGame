var start=false;
var level=0;
var enable_click=false;
var ind=0;
colors=["red","blue","green","yellow"];
pattern=[];
user_pattern=[];


document.addEventListener("keypress",function(){
    if(start==false){
        start=true;
        seq();
    }
});

$(".btn").on("click",function(){
    if(start==true && enable_click==true){
        var user_click=this.getAttribute("id");
        user_pattern.push(user_click);
        console.log(ind,user_pattern);
        //console.log(user_pattern);
        animatePress(user_click);
        playsound(user_click);
        check();
    }
});

function seq(){
    setTimeout(function(){
    enable_click=false;
    ind=0;
    incLevel();
    var rand=Math.floor(Math.random()*4);
    pattern.push(colors[rand]);
    console.log(pattern);
    animatePress(colors[rand]);
    playsound(colors[rand]);
    
    enable_click=true;
    },500);
    //console.log(user_Clicked);
}

function check(){
    if(user_pattern[ind]==pattern[ind]){    
        if(ind==pattern.length-1){
            ind=0;
            enable_click=false;
            user_pattern=[];
            seq();
        }
        else{
            ind++;
        }
    }
    else{
        enable_click=false;
        start=false;
        level=0;
        user_pattern=[];
        pattern=[];
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");},100);
        
             $("#level-title").text("Press any key to restart");
        playsound("wrong");
    }
}


function playsound(col){
    var audio = new Audio("./sounds/"+col+".mp3");
    audio.play();
}

function animatePress(col){
    $("."+col).addClass("pressed");
    setTimeout(function(){
        $("."+col).removeClass("pressed");},100);
}

function incLevel(){
    $("#level-title").text("Level " + ++level);
}


