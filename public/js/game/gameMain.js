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

            this.keys = []; // keys pressed
           
            var game = this;

            $(window).bind("keypress", function() { 

                game.StarSky.createStars(this.StarsAmount);
                game.interval = setInterval(function() { game.render(); }, 1000/this.fps);
                $(window).unbind("keypress");

                document.body.addEventListener("keydown", function (e) {
                    game.keys[e.keyCode] = true;
                });
                document.body.addEventListener("keyup", function (e) {
                    game.keys[e.keyCode] = false;
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


        render : function() {
            this.SpaceShip.update(this.keys); // update pos of ship and etc..
            this.StarSky.draw(this.ctx);
            this.SpaceShip.draw(this.ctx);
        }

    });

    return Game;
});
