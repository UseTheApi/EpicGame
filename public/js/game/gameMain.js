define([
    'classy',
    'game/util/utilites',
    'game/spaceship',
    'game/starsky'
], function(
    Class,
    Util,
    SpaceShip,
    StarSky
){

    var Game = Class.$extend({

        __init__ : function(canvas) {
            this.fps = 30;
            this.StarsAmount = 22;
            this.running = false;
            this.cnvs = canvas;
            this.test = 'fafd';
            this.ctx = this.cnvs.getContext("2d");
            this.ctx.fillRect(0, 0, this.cnvs.width, this.cnvs.height);

            this.Util = new Util(canvas);
            this.Util.greeting(this.ctx);
            this.SpaceShip = new SpaceShip(0, this.cnvs.height / 2, 'imgs/rocket.png'); // need resource handler
            this.StarSky = new StarSky(this.cnvs, this.StarsAmount);
           
            var game = this;

            $(window).bind("keypress", function() { 

                game.StarSky.createStars(this.StarsAmount);
                game.interval = setInterval(function() { game.render(); }, 1000/this.fps);
                $(window).unbind("keypress");
                $(document).on("keydown", function (e) {
                    game.keyHandler(e.which);
                });
                game.running = true;
            });
        },

        Stop : function() {
                if(this.running) {
                  $(window).unbind("keypress");
                  this.StarSky.deleteStars();
                  clearInterval(this.interval);
                  this.running = false;
                }
        },


        keyHandler : function(code) {

            switch(code) {
                case 38: // up
                   this.SpaceShip.direction = 'up';
                break;

                case 40: //down
                  this.SpaceShip.direction = 'down';
                break;

                case 37: // back
                  this.SpaceShip.direction = 'back';
                break;

                case 39: //forard
                  this.SpaceShip.direction = 'forward';
                break;
            }
        },


        render : function() {
            this.StarSky.draw(this.ctx);
            this.SpaceShip.draw(this.ctx);
        }

    });

    return Game;
});
