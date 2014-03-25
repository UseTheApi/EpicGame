define([

    'backbone',
    'classy',
    'game/explosion',
    'game/util/utilites',
    'game/spaceship',
    'game/starsky',
    'game/spaceGarbage',
    'game/collisionDetector',
    'game/enemies',
    'game/explosionManager',
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
    EnemyContainer,
    ExplosionManager,
    GOView
){

    var Game = Class.$extend({

        __init__: function(canvas) {
            _.extend(this, Backbone.Events);
          
            this.fps = 60;
            this.StarsAmount = 22;
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
            this.AsteroidContainer = new AsteroidContainer(this.cnvs);
            this.EnemyContainer = new EnemyContainer(this.cnvs);
           // this.ExplosionManager = new ExplosionManager();
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
            this.coldet.ObjectCollisionWithObjectArray(this.SpaceShip, this.EnemyContainer.enemies);
            this.coldet.ObjectArrayCollisionWithObjectArray(this.SpaceShip.bulletContainer.bullets,
             this.EnemyContainer.enemies);
            this.coldet.ObjectArrayCollisionWithObjectArray(this.SpaceShip.bulletContainer.bullets,
             this.AsteroidContainer.asteroids);
        },

        render: function() {
           // this.clearcanvas(this.ctx);
            this.StarSky.update();
            this.AsteroidContainer.update();
            this.EnemyContainer.update();
            this.SpaceShip.update(this);
            ExplosionManager().$class.update(this.fps);
            this.findCollision();
            this.clearcanvas(this.ctx);
            this.StarSky.draw(this.ctx)
            this.AsteroidContainer.draw(this.ctx);
            this.EnemyContainer.draw(this.ctx);
            this.SpaceShip.draw(this.ctx);
            ExplosionManager().$class.draw(this.ctx);
            this.Util.drawscore(this.ctx,this.score);
        }

    });

    return Game;
});
