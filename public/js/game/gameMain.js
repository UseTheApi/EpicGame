define([
    'backbone',
    'classy',
    'game/util/utilites',
    'game/spaceship',
    'game/starsky',
    'views/gameover',
], function(
    Backbone,
    Class,
    Util,
    SpaceShip,
    StarSky,
    GOView
){

    var Game = Class.$extend({

        __init__ : function(canvas) {
            _.extend(this, Backbone.Events);
          
            this.fps = 10;
            this.StarsAmount = 22;
            this.running = false;
            this.cnvs = canvas;
            this.test = 'fafd';
            this.ctx = this.cnvs.getContext("2d");
            this.ctx.fillRect(0, 0, this.cnvs.width, this.cnvs.height);
            this.score = 0;

            this.Util = new Util(canvas);
            this.Util.greeting(this.ctx);
            this.SpaceShip = new SpaceShip(0, this.cnvs.height / 2, 'imgs/rocket.png',canvas); // need resource handler
            this.StarSky = new StarSky(this.cnvs, this.StarsAmount);

            this.gameoverView = new GOView();
            this.on("SpaceShipCrash", function() {
                this.Stop(true);
            });

            this.keys = []; // keys pressed
           
            var game = this;

            $(window).bind("keypress", function() { 

                game.StarSky.createStars(this.StarsAmount);
                
                game.interval = setInterval(function() { game.score +=1; game.render(); }, 1000/this.fps);
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

        Stop : function(gameover) {
                if(this.running) {
                  if(gameover) {
                    this.Util.clear(this.ctx);
                    this.Util.gameover(this.ctx,this.score);
                    this.gameoverView.show(this.score);
                  }
                  $(window).unbind("keypress");
                  this.StarSky.deleteStars();
                  clearInterval(this.interval);
                  this.running = false;
                }
        },


        render : function() {
            this.StarSky.draw(this.ctx);
            this.SpaceShip.draw(this.ctx);
            this.Util.drawscore(this.ctx,this.score);
            this.SpaceShip.update(this); // update pos of ship and etc..
        }

    });

    return Game;
});
