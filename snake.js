const canvas = document.getElementById("game");
const ctx=canvas.getContext("2d");

let speed=8;

let count=20;

let x=10;
let y=10;

let xv=0;
let yv=0;

let parts=[];
let tail=2;

let xfood=5;
let yfood=5;

let score=0;


class snakePart
{
    constructor(xx,yy)
    {
        this.x=xx;
        this.y=yy;
    }
}







function gameloop()
{
    change_snake_position()
    let x = game_over();

    if(x == true)
    {
        return;
    }

    clearscreen();
    spawn_snake();
    spawn_food();
    ;
    collision_detection();
    display_score();
    setTimeout(gameloop,1000/speed);

    if(score > 5 )
    {
        speed=10;
    }

    if(score > 10)
    {
        speed=12;
    }
}



function game_over()
{
    var test=false;

    if(xv == 0 && yv == 0)
    {
        return false;
    }


    if(x < 0)
    {
        test=true;
    }
    else if(x == count)
    {
        test=true;
    }
    else if(y < 0)
    {
        test=true;
    }
    else if(y == count)
    {
        test=true;
    }

    for(let i=0;i<parts.length;i++)
    {
        let part = parts[i];
        if(part.x == x && part.y ==y)
        {
            test=true;
            break;
        }
    }


    if(test == true)
    {
        ctx.fillStyle="white";
        ctx.font="50px verdana"
        ctx.fillText("game over !",canvas.width/3 -70 , canvas.height/2);
    }
    return test;
}



function spawn_snake()
{
    ctx.fillStyle="red";
    ctx.fillRect(x*count , y*count , count-1 , count-1);

    ctx.fillStyle="darkgreen";

    for(let i=0;i<parts.length;i++)
    {
        let part=parts[i];
        ctx.fillRect(part.x*count , part.y*count , count-1 , count-1);
    }

    parts.push(new snakePart(x,y));

    while(parts.length > tail)
    {
        parts.shift();
    }

}






function clearscreen()
{
    ctx.fillStyle="black";
    ctx.fillRect(0 , 0 , canvas.width , canvas.height);
}




document.body.addEventListener("keydown",key_pressed);






function change_snake_position()
{
    x+=xv;
    y+=yv;
}







function spawn_food()
{
    ctx.fillStyle="yellow";
    ctx.fillRect(xfood*count , yfood*count , count , count )
}






function collision_detection()
{
    if(x === xfood && y === yfood)
    {
        xfood=Math.floor(Math.random() * count);
        yfood=Math.floor(Math.random() * count);
        score++;
        tail++;
    }
}






function display_score()
{
    ctx.fillStyle="white";
    ctx.fillText("score = "+score ,canvas.width-50,15);
}





function key_pressed(event)
{
    if(event.keyCode == 37)
    {
        if(xv == 1)
            return;
        xv=-1;
        yv=0;
    }

    if(event.keyCode == 38)
    {   
        if(yv == 1)
            return;
        xv=0;
        yv=-1;
    }

    if(event.keyCode == 39)
    {
        if(xv == -1)
            return;
        xv=1;
        yv=0;
    }

    if(event.keyCode == 40)
    {
        if(yv == -1)
            return;
        yv=1;
        xv=0;
    }
}

gameloop();