
    //canvas and canvas context 
    let canvas = document.getElementById('tennis');
    let context = canvas.getContext('2d');

    //canvas dimensions
    canvas.width = 900;
    canvas.height = 600;
    
    //paddles
    let paddle1Y = 250;
    let paddle2Y = 250;
    let PADDLE_HEIGHT = 100;
    const PADDLE_THICKNESS = 5;
    
    //ball position
    let ballX = canvas.width/2;
    let ballY = canvas.height/2;
    
    //ball speed
    let ballSpeedX = 10;
    let ballSpeedY = 5;

    //colors
    const PADDLE_COLOR = 
            BALL_COLOR = 
            TEXT_COLOR = 'white';

    // scores
    let player1Score = 0
    let player2Score = 0;
    const WINNING_SCORE = 3;
    
    
    //core function 
    window.onload = function(){
        let frameRate = 30;
        
        // Mouse movement moving paddle
        canvas.addEventListener('mousemove', 
        (e)=> {
            let mousePos = calculateMousePos(e);
            paddle1Y = mousePos.y-(PADDLE_HEIGHT/2)
        })

        //function that redraws canvas & things at intervals
        setInterval(function(){
            moveThings();
            // draw the main canvas
            drawRectangles(0,0,canvas.width,canvas.height, 'black');

            //draw the first paddle
            drawRectangles(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT, PADDLE_COLOR);

            //draw the second paddle
            drawRectangles(canvas.width-PADDLE_THICKNESS,paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, PADDLE_COLOR);

            drawBall(BALL_COLOR, ballX, ballY, 10);

            context.fillText(`${player1Score}`, 100, 100)
            context.fillText(`${player2Score}`, canvas.width-100, 100)
        }, 1000/frameRate)
    }

    const moveAI = () => {
        let center = paddle2Y + (PADDLE_HEIGHT/2);
        if (center<ballY-35) {
            paddle2Y+=6;
        }
        else if (center>ballY+35){
            paddle2Y-=6;
        }
    }
    
    //function for displacing position 
    const moveThings = () => {

        moveAI();
        ballX = ballX + ballSpeedX;
        ballY = ballY + ballSpeedY;
        // if (ballX > canvas.width) {
        //     ballSpeedX = -ballSpeedX
        // }
        if (ballX <0) {
            if (ballY > paddle1Y && 
                ballY < paddle1Y+PADDLE_HEIGHT){
                    ballSpeedX = -ballSpeedX;
                    let deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
                    ballSpeedY = deltaY *0.3;
                }
            else {
                player2Score++;
                ballReset();
                
            }
        }

        if (ballX > canvas.width){
            if(ballY > paddle2Y && 
            ballY < paddle2Y+PADDLE_HEIGHT){
                ballSpeedX = -ballSpeedX;
                let deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
                ballSpeedY = deltaY *0.3;
            }
            else{
                player1Score++;
                ballReset();
            }
        }
        if (ballY > canvas.height){
            ballSpeedY = -ballSpeedY
        }
        if (ballY < 0){
            ballSpeedY = -ballSpeedY
        }
    }
    
    //function that draws canvas and paddles
    const drawRectangles = (x, y, width, height, color) => {
        context.fillStyle = color;
        context.fillRect(x, y, width, height)
    }

    //function that draws the ball
    const drawBall = (color, x,y, radius) => {
        context.fillStyle = color;
        context.beginPath();
        context.arc(x,y,radius,0,Math.PI*2,false);
        context.fill();
    }

    const calculateMousePos = (e) => {
        let rect = canvas.getBoundingClientRect();
        let root = document.documentElement;
        let mouseX = e.clientX - rect.left - root.scrollLeft;
        let mouseY = e.clientY - rect.top - root.scrollTop;
        return {
            x:mouseX,
            y:mouseY
        }
    }

    const ballReset = () => {
        if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
            player2Score = 0;
            player1Score = 0;
        }
        ballSpeedX = -ballSpeedX
        ballX = canvas.width/2;
        ballY = canvas.height/2;
    }
