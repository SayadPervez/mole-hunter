$(document).ready(function(){
$('.sidenav').sidenav();
});

window.iterations=0;
window.allMoles = ['null','x1','x2','x3','x4','x5','x6','x7','x8','x9','x10','x11','x12'];
window.startTime = ['-','-','-','-','-','-','-','-','-','-','-','-','-'];
window.endTime = ['-','-','-','-','-','-','-','-','-','-','-','-','-'];
window.isThere = ['-','-','-','-','-','-','-','-','-','-','-','-','-'];
window.li=[];
window.score=0;
window.isPlaying=false;

function randRange(n)
{
    return((Math.floor(Math.random()*100)%n)+1);
}

function randomDelay()
{
    return(randRange(10)*200);
}

function toggle(id)
{
    console.log("toggle : "+id);
    $("#"+id).css("visibility","visible");
    window.startTime[Number(id.slice(1))] = new Date().getTime();
    window.isThere[Number(id.slice(1))] = "+";
    console.log(window.startTime);
}

function startGame()
{
    $("#startbutton").prop("disabled",true);
    window.isPlaying=true;
    if(window.iterations>=15)
        endGame();
    else
    {
        $(".mole").css("visibility","hidden");
        //while here
        rd = randomDelay();
        console.log(rd);
        setTimeout(
        () => {
            rid = randRange(12);
            toggle("x"+String(rid));
        },
        rd
        );
        window.iterations+=1;
        startGame();
    }
}

function endGame()
{
    window.iterations=0;
    console.log("timer ended !!");
    console.log("Iterations : "+String(window.iterations));
}

function gameEnded()
{
    $("#startbutton").prop("disabled",false);
    window.isPlaying=false;
    console.log("Game finally ended");
    window.endTime.forEach((x,i) => {
        if(x=="-")
            ;
        else
        {
            window.li.push(x-window.startTime[i]);
        }
    });
    temp = window.li;
    console.log(temp);
    let average = (array) => array.reduce((a, b) => a + b) / array.length;
    window.score=(average(temp)/1000);
    initialize();
    console.log(window.score);
    showScore();
}

function showScore()
{
    $("#gameview").css("display","none");
    $("#scoreview").css("display","block");
    $("#score").html("Your Average Response time is<br>"+String(window.score.toFixed(3))+" s");
}

function playAgain()
{
    $("#gameview").css("display","block");
    $("#scoreview").css("display","none");
}

function initialize()
{
    window.iterations=0;
    window.allMoles = ['null','x1','x2','x3','x4','x5','x6','x7','x8','x9','x10','x11','x12'];
    window.startTime = ['-','-','-','-','-','-','-','-','-','-','-','-','-'];
    window.endTime = ['-','-','-','-','-','-','-','-','-','-','-','-','-'];
    window.isThere = ['-','-','-','-','-','-','-','-','-','-','-','-','-'];
    window.li=[];
    window.isPlaying=false;
}

function pushed(id)
{
    window.navigator.vibrate(200);
    $("#"+id).css("visibility","hidden");
    window.endTime[Number(id.slice(1))] = new Date().getTime();
    window.isThere[Number(id.slice(1))] = "-";
    console.log(window.endTime);
    var s = new Set(window.isThere)
    if(s.size==1 && window.isPlaying)
        gameEnded();
}

function test()
{
    var s = new Set(window.isThere)
    console.log(s.size);
    //console.log(randRange(12));
}