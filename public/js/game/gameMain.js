define([
], function(
){

    var fps = 60;
    var cnvs;
    var ctx;
    var stars = [];

    function gameInit(canvas) {
        cnvs = canvas;
        ctx = cnvs.getContext("2d");
        ctx.fillRect(0, 0, cnvs.width, cnvs.height);

        createStars(10);

        this.stop = function() { /* TODO stop rendering */

        }

        setInterval(renderSky, 1000/fps);
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

    function createStars(amount) {
        for (i = 0; i < amount; i++) {
            var x = Math.floor(Math.random() * cnvs.width)
            var y = Math.floor(Math.random() * cnvs.height)
            var r = Math.floor(Math.random() * 5 + 1)
            var star = new Star(x,y,r);
            stars.push(star);
        }
    }

    function moveStars() {
        for(i = 0; i < stars.length; i++) {
                stars[i].x -= stars[i].radius;
                if(stars[i].x <= 0 ) {
                    stars.splice(i, 1);
                    createStars(1);
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
