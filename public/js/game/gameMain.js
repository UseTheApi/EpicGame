define([

    'backbone',
    'classy',
    'game/explosion',
    'game/util/utilites',
    'game/spaceship',
    'game/starsky',
    'game/spaceGarbage',
    'game/collisionDetector',
    'views/gameover'
], function(
    Backbone,
    Class,
    ExplosionClass,
    Util,
    SpaceShip,
    StarSky,
    AsteroidContainer,
    CollisionDetector,
    GOView
){

    var Game = Class.$extend({

        __init__: function(canvas) {
            _.extend(this, Backbone.Events);
          
            this.fps = 10;
            this.StarsAmount = 22;
            this.AsteroidAmount = 5;
            this.running = false;
            this.cnvs = canvas;
            this.test = 'fafd';
            this.ctx = this.cnvs.getContext("2d");
            this.ctx.fillRect(0, 0, this.cnvs.width, this.cnvs.height);
            this.score = 0;
            this.Util = new Util(canvas);
            this.Util.greeting(this.ctx);
            this.SpaceShip = new SpaceShip(0, this.cnvs.height / 2, 'imgs/rocket.png',canvas, this.ctx); // need resource handler
            this.StarSky = new StarSky(this.cnvs, this.StarsAmount);
            this.AsteroidContainer = new AsteroidContainer(this.cnvs, this.AsteroidAmount);
            this.gameoverView = new GOView();
            this.coldet = new CollisionDetector();
            this.on("SpaceShipCrash", function() {
                this.Stop(true);
            });

            this.keys = []; // keys pressed
           
            var game = this;

            $(window).bind("keypress", function() { 

                game.StarSky.createStars(this.StarsAmount);

                game.AsteroidContainer.createAsteroids(this.AsteroidAmount);
                
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

        Stop: function(gameover) {
                if(this.running) {
                  if(gameover) {
                    this.Util.clear(this.ctx);
                    this.gameoverView.show(this.score);
                  }
                  $(window).unbind("keypress");
                  this.StarSky.deleteStars();
                  this.AsteroidContainer.deleteAsteroids();
                  clearInterval(this.interval);
                  this.clearcanvas(this.ctx); 
                  this.running = false;
                }
        },

        clearcanvas: function(ctx) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, this.cnvs.width, this.cnvs.height);
        },

        findCollision: function() {
           // debugger
            this.coldet.ObjectCollisionWithObjectArray(this.SpaceShip, this.AsteroidContainer.asteroids);
        },

        render: function() {
           // this.clearcanvas(this.ctx);
            this.StarSky.update();
            this.AsteroidContainer.update();
            this.SpaceShip.update(this);
            this.findCollision();
            this.clearcanvas(this.ctx);
            this.StarSky.draw(this.ctx)
            this.AsteroidContainer.draw(this.ctx);
            this.SpaceShip.draw(this.ctx);

            //this.Util.drawscore(this.ctx,this.score);
        }

    });

    return Game;
});
