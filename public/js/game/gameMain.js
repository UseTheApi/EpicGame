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
    'views/gameover',
    'Connector'
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
    GOView,
    Connector
){


    function resizeGame() {
        var gameArea = document.getElementById('gameArea');
        var gameCanvas = document.getElementById('gameCanvas');
        var widthToHeight = 16 / 9;
        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;
        var newWidthToHeight = newWidth / newHeight;

        if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        document.getElementById('gameArea').style.height = newHeight + 'px';
        document.getElementById('gameArea').style.width = newWidth + 'px';
        } else {
        newHeight = newWidth / widthToHeight;
        document.getElementById('gameArea').style.width = newWidth + 'px';
        document.getElementById('gameArea').style.height = newHeight + 'px';
        }

        document.getElementById('gameArea').style.marginTop = (-newHeight / 2) + 'px';
        document.getElementById('gameArea').style.marginLeft = (-newWidth / 2) + 'px';

        var gameCanvas = document.getElementById('gameCanvas');
        document.getElementById('gameCanvas').width = newWidth;
        document.getElementById('gameCanvas').height = newHeight;
    }

    var Game = Class.$extend({

        __init__: function(canvas) {
            _.extend(this, Backbone.Events);

           this.message = document.getElementById('message');

           // this.server нужно сделать синглтоном, сейчас он создается каждый раз
           this.server = new Connector({
               server: ['getToken', 'bind'],
               remote: '/console'
           });

           this.initServer(this.server);

           

            resizeGame()
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
            this.haveTouch = false;
            this.gameoverView = new GOView();
            this.coldet = new CollisionDetector();
            this.on("SpaceShipCrash", function() {
                this.Stop(true);
            });

            this.keys = []; // keys pressed

            this.rotRateGamma = 0;
            this.rotRateAlpha = 0;
           
            var game = this;

            $(window).bind("resize", function() {
                resizeGame()
            });

            $(window).bind("keypress", function() {

                game.Start(game); // dirty 

            });
        },


        initToken : function(){
            console.log('initToken')
            this.message.innerHTML = 'ready';
            var self = this;
            // Если id нет
            if (!localStorage.getItem('consoleguid')){
                // Получаем токен
                this.server.getToken(function(token){   
                    $('#message').html('token: ' + token);
                });
            } else { // иначе
                // переподключаемся к уже созданной связке
                this.reconnect();
            }
        },
        // Переподключение
        reconnect : function(){
            console.log('reconnect')
            var self = this; // надо сохранять контекст

            // Используем сохранненный id связки
            this.server.bind({guid: localStorage.getItem('consoleguid')}, function(data){
                // Если все ок
                if (data.status == 'success'){
                    // Стартуем
                    console.log('starx');
                    self.start(data.guid);
                // Если связки уже нет
                } else if (data.status == 'undefined guid'){
                    // Начинаем все заново
                    localStorage.removeItem('consoleguid');
                    self.initToken();
                }
            });
        },


       start: function(guid){
           console.log('start from serv')

           // Сохраняем id связки
           localStorage.setItem('consoleguid', guid);
           $('#message').html('game');
           this.Start(this);
       },


        initServer: function() {            

            var self =  this;
            // На подключении игрока стартуем игру
            this.server.on('player-joined', function(data){
                // Передаем id связки консоль-джостик
                console.log('player join')
                self.start(data.guid);
            });

         
            this.server.on('reconnect', this.reconnect);
          

            this.initToken();

            // Обмен сообщениями
            this.server.on('message', function(data, answer){
                if(data.type == 'touch')
                {
                    self.haveTouch = true
                }
                if(data.type == 'rotate')
                {
                    self.rotRateAlpha = data.alpha
                    self.rotRateBeta = data.beta
                }
                answer('answer');
            });
        },

        Start: function(game) {
            console.log(this)

            game.AsteroidContainer = new AsteroidContainer(game.cnvs);

            game.EnemyContainer = new EnemyContainer(game.cnvs);

            game.StarSky.createStars(this.StarsAmount);

            game.AsteroidContainer.createAsteroids(this.AsteroidAmount);

            game.interval = setInterval(function() { game.render(); }, 1000/game.fps);

            game.scoreInterval = setInterval(function() {game.score +=1;}, 200)
            $(window).unbind("keypress");

            document.body.addEventListener("keydown", function (e) {
                game.keys[e.keyCode] = true;
            });
            document.body.addEventListener("keyup", function (e) {
                game.keys[e.keyCode] = false;
            });
            game.running = true;

        },

        Stop: function(gameover) {
                if(this.running) {
                  if(gameover) {
                    this.Util.clear(this.ctx);
                    this.gameoverView.show(this.score);
                  }
                  $(window).unbind("keypress");
                  $(window).unbind("resize");
                  $(window).unbind("ready");
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
