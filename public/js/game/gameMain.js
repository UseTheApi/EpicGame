define([
], function(
){

    var fps = 60;
    var cnvs;
    var ctx;
    var stars = [];
    var numOfStars = 15;
    var interval;

    function gameInit(canvas) {
        cnvs = canvas;
        ctx = cnvs.getContext("2d");
        ctx.fillRect(0, 0, cnvs.width, cnvs.height);

        createStars(numOfStars);

        var backBtn =  document.getElementById("backBtn");
        backBtn.onclick = gameStop;

        window.onkeypress = gameStart;
        greeting();

    }
    function gameStart() {
        interval = setInterval(renderSky, 1000/fps);
    }

    function greeting() {
        ctx.font="30px Verdana";
        // Create gradient
        var gradient = ctx.createLinearGradient(0,0,cnvs.width,0);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1.0","red");
        // Fill with gradient
        ctx.fillStyle = gradient;
        ctx.fillText("To start game press anykey!",cnvs.width/2-200,cnvs.height/2); 
    }

    function gameStop() {
        deleteStars();
        clearInterval(interval);
    }


    function renderSky() {
         moveStars(); 
         ctx.fillStyle = "black";
         ctx.fillRect(0, 0, cnvs.width, cnvs.height);
         drawStars();
    }

    function Star(x,y,r) {
        this.x = x;
        this.y = y;
        this.radius = r;
    }

    function createStars(amount, _pos) {
        for (i = 0; i < amount; i++) {
            var x = _pos || Math.floor(Math.random() * cnvs.width)
            var y = Math.floor(Math.random() * cnvs.height)
            var r = Math.floor(Math.random() * 5 + 1)
            var star = new Star(x,y,r);
            stars.push(star);
        }
    }

    function deleteStars() {
        for(i = 0; i < stars.length; i++) {
            stars.splice(i,1);
        }
    }

    function moveStars(_speed) {
        for(i = 0; i < stars.length; i++) {
                stars[i].x -= (_speed || 3);
                if(stars[i].x <= 0 ) {
                    stars.splice(i, 1);
                    createStars(1,cnvs.width);
            }   
        }
    }

    function drawStars() {
        for(i = 0; i < stars.length; i++) {
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(stars[i].x , stars[i].y, stars[i].radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }
    }


    return gameInit;
});
