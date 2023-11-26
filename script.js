score=0;
cross=true;
//to find the key codes
document.onkeydown= function(e){
    console.log("Key is : ",e.keyCode);
    //querySelector is used to fing the first element of a class
    if(e.keyCode==38){
        dino= document.querySelector('.dino');
        //this will create a class named animateDino and add it to dino
        dino.classList.add('animateDino');
        //this will give a function  a timeout
        setTimeout(()=>{
            //this will remove the class animateDino
            dino.classList.remove('animateDino')
        }, 700);
    }
    //this will move the dino sideways
    if(e.keyCode==39){
        dino= document.querySelector('.dino');
        dinoX=parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left= dinoX+ 112+ "px";
    }
    if(e.keyCode==37){
        dino= document.querySelector('.dino');
        dinoX=parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left= (dinoX- 112)+ "px";
    }
}

//this helps to do something after an interval
setInterval(() => {
    //this is to detect collision and display gaveOver
    dino= document.querySelector('.dino');
    gameOver= document.querySelector('.gameOver');
    obstacle= document.querySelector('.obstacle');

    dx=parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy=parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox=parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy=parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    //this will give the distance diff between two
    offsetX= Math.abs(dx-ox);
    offsetY= Math.abs(dy-oy);
    
    //thos will help to identify
    // console.log(offsetX, offsetY)

    //this will set the distance limit and condition
    if(offsetX<113 && offsetY<52){
        //this sets the visibility of gameOver
        gameOver.style.visibility= 'visible';
        //this removes the animation of obstacle
        obstacle.classList.remove('obstacleAni')
    }
    else if(offsetX<145 && cross){
        score+=1;
        updateScore(score);
        cross=false;
        setTimeout(()=>{
            cross=true;
        },1000);

        setTimeout(() => {
            //to fasten the black dino once score is increased
            aniDur= parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur= aniDur-0.1;
            obstacle.style.animationDuration= newDur+ 's';
        }, 500);
    }
}, 10);

function updateScore(score){
    scoreCount= document.querySelector('.scoreCount');
    scoreCount.innerHTML= "Your Score: "+score
}