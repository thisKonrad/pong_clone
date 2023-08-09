/* :: pong clone main.JS :: */

(function(){

/* :: > get the canvas: */
const canvas = document.querySelector('#canvas_pong');
const ctx = canvas.getContext('2d');

let canvasWidth = 800;
let canvasHeight = 600;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

let canvasBackground = 'black';


let intervalID;


let playerOneDisplay = document.querySelector('#playerOne');
let playerTwoDisplay = document.querySelector('#playerTwo');

let playerOneScore = 0;
let playerTwoScore = 0;


/* :: ↓ paddel objects:  */
let paddleOneColor = 'white';
let paddleTwoColor = 'white';
let paddleSpeed = 50;

let paddleOne = {
    width: 25,
    height: 150,
    color: paddleOneColor,
    x: 0,
    y: 0
};

let paddleTwo = {
    width: 25,
    height: 150,
    color: paddleTwoColor,
    x: canvasWidth -25,
    y: canvasHeight -150
};

/* :: the ball values :: */
let ballSpeed = 1;
const ballRadius = 14.5;
let ballColor = 'white';
let ballX = canvasWidth / 2;
let ballY = canvasHeight / 2;
let ballDirectionX = 0;
let ballDirectionY = 0;


/* :: clear canvas after every animation frame :: */
function clearBoard(){
    ctx.fillStyle = canvasBackground;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};


function drawPaddles(){

    ctx.strokeStyle = paddleOneColor;
    ctx.lineWidth = 4;
    ctx.strokeRect(paddleOne.x +5, paddleOne.y, 
        paddleOne.width, paddleOne.height);

    ctx.strokeStyle = paddleTwoColor;
    ctx.lineWidth = 4;
    ctx.strokeRect( paddleTwo.x -5, paddleTwo.y, 
        paddleTwo.width, paddleTwo.height);

}
drawPaddles();


function drawCenterLine(){

    ctx.beginPath();
    ctx.moveTo( canvasWidth / 2, canvasHeight );
    ctx.lineTo( canvasWidth / 2, 0 );
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();

}
drawCenterLine();


function createBall(){

    ballSpeed = 1.6;

    let ballRandom = Math.round(Math.random());
    
    if( ballRandom === 1){  

        ballDirectionX = 1;
        ballDirectionY = 1;

    }
    else {

        ballDirectionX = -1;
        ballDirectionY = -1;
    }

    ballX = canvasWidth / 2;
    ballY = canvasHeight / 2;

    drawBall(ballX, ballY);
};


function moveBall(){

    ballX += (ballSpeed * ballDirectionX);
    ballY += (ballSpeed * ballDirectionY);

};


function drawBall(ballX, ballY){

    ctx.fillStyle = ballColor;
    ctx.strokeStyle = ballColor;
    ctx.lineWidth = 2;

    ctx.beginPath()
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

};


function checkCollison(){

    /* :: change direction on canvas collision :: */
    if( ballY <= 0 + ballRadius){
        ballDirectionY *= -1;  
    }
    if( ballY >= canvasHeight - ballRadius){
        ballDirectionY *= -1;
    }

    /* :: when ball get's out of the canvas ::*/
    if( ballX <= 0 ){
        playerTwoScore += 1;
        updateScore();
        createBall();
        return;
    }
    if( ballX >= canvasWidth){
        playerOneScore += 1;
        updateScore()
        createBall();
        return;
    };


    /* :: ↓ collision to the paddles ↓ :: */
     
    /** middle of paddle X against ballX position in
    /* the cordinate system of the canvas 
    /* same for the Y coordinates here in one nested if statement: */

    if( ballX <=(paddleOne.x + paddleOne.width + ballRadius)){

        if( ballY > paddleOne.y && ballY < paddleOne.y 
            + paddleOne.height) 
        
        /* the x,y coordinates match >> then the ball changes his
        /* direction and the speed increases by one. */

        ballDirectionX *= -1;
        ballSpeed +=1;

        paddleOneColor = 'yellow';
        setTimeout( () => { paddleOneColor = 'white'; }, 300);

    };

    if( ballX >=(paddleTwo.x - ballRadius)){

        if( ballY > paddleTwo.y && ballY < paddleTwo.y 
        + paddleTwo.height)

        ballDirectionX  *= -1;
        ballSpeed +=1;

        paddleTwoColor = 'aqua';
        setTimeout( () => { paddleTwoColor = 'white'; }, 300);
    };

};


function updateScore(){

    playerOneDisplay.textContent = `${playerOneScore}`; 
    playerTwoDisplay.textContent = `${playerTwoScore}`;

    if(playerOneScore >= 1){

        playerOneDisplay.style.color ='yellow';

    }else{

        playerOneDisplay.style.color ='white';
    }
    
    if(playerTwoScore >= 1){

        playerTwoDisplay.style.color ='aqua';

    }
    else{

        playerTwoDisplay.style.color ='white';
    }

};


/* basic animation function */
function update(){

    intervalID = setInterval(()=>{ 

        clearBoard();
        drawCenterLine();
        drawPaddles();
        moveBall();
        drawBall(ballX, ballY);
        checkCollison();

     },(1000 / 60));

};



function gameStart(){

    createBall();
    update();
    

};

function resetGame(){

    playerOneScore = 0;
    playerTwoScore = 0;

    clearBoard();

    paddleOne = {
        width: 25,
        height: 150,
        x: 0,
        y: 0
    }
    
    paddleTwo = {
        width: 25,
        height: 150,
        x: canvasWidth -25,
        y: canvasHeight -150
    }

    ballX, ballY = 0;
    ballDirectionX, ballDirectionY = 0;

    updateScore();
    clearInterval(intervalID);

    drawCenterLine();
    drawPaddles();
    
};


const reset = document.querySelector('#reset');
reset.addEventListener('click', resetGame);

const start = document.querySelector('#start');
start.addEventListener('click', gameStart);


/* :::: ↓ button controls for touch device ↓ :::: */
window.addEventListener('pointerdown', changeDirectionTouch);

const leftUpBtn = document.querySelector('#leftUp');
const leftDownBtn = document.querySelector('#leftDown');
const rightUpBtn = document.querySelector('#rightUp');
const rightDownBtn = document.querySelector('#rightDown');

function changeDirectionTouch(e){

    const pointerDown = e.target;

    const paddleOneUp = leftUpBtn;
    const paddleOneDown = leftDownBtn;
    const paddleTwoUp = rightUpBtn;
    const paddleTwoDown = rightDownBtn;   

    switch(pointerDown){

        case (paddleOneUp):

            if(paddleOne.y > 0){
                paddleOne.y -= paddleSpeed;}
            break;

        case (paddleOneDown):

            if(paddleOne.y < canvasHeight - paddleOne.height){
                paddleOne.y += paddleSpeed;}
            break;

        case(paddleTwoUp):

            if(paddleTwo.y > 0){
                paddleTwo.y -= paddleSpeed;}
            break;

        case(paddleTwoDown):

            if(paddleTwo.y < canvasHeight - paddleTwo.height){
                paddleTwo.y += paddleSpeed;}
            break;
    }

};


/* :::: ↓ keyboard controls ↓ :::: */
window.addEventListener('keydown', changeDirection);

function changeDirection(e){

    const keyPressed = e.keyCode;

    const paddleOneUp = 65;     // key: A

    const paddleOneDown = 89;   // key: Y

    const paddleTwoUp = 75;     // key: K

    const paddleTwoDown = 77;   // key: M

    switch(keyPressed){

        case (paddleOneUp):
            if(paddleOne.y > 0){
            paddleOne.y -= paddleSpeed;}

            leftUpBtn.style.color = 'yellow';
            setTimeout( () => { 
            leftUpBtn.style.color = 'white'; }, 300);

            break;

        case (paddleOneDown):
            if(paddleOne.y < canvasHeight - paddleOne.height){
            paddleOne.y += paddleSpeed;}

            leftDownBtn.style.color = 'yellow';
            setTimeout( () => { 
            leftDownBtn.style.color = 'white'; }, 300);

            break;

        case(paddleTwoUp):
            if(paddleTwo.y > 0){
            paddleTwo.y -= paddleSpeed;}

            rightUpBtn.style.color = 'aqua';
            setTimeout( () => { 
            rightUpBtn.style.color = 'white'; }, 300);

            break;

        case(paddleTwoDown):
            if(paddleTwo.y < canvasHeight - paddleTwo.height){
            paddleTwo.y += paddleSpeed;}

            rightDownBtn.style.color = 'aqua';
            setTimeout( () => { 
            rightDownBtn.style.color = 'white'; }, 300);

            break;
    }
    
};

})();
