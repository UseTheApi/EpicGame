define([
    'classy',
    'game/collisionCore'
], function(
    Class,
    Core
){


	function Asteroid(x,y,r,sp) {
		var asteroid = this
	      this.x = x;
	      this.name = 'Asteroid'
	      this.y = y;
	      this.radius = r;
	      this.speed = sp;
	      this.core = new Core() // collision core	      
	      this.sWidth = 160;  //standart mesurements of image
		  this.sHeight = 160;
		  this.imgLoaded = false;
		  this.image = new Image();  
		  this.image.src = 'imgs/asteroid.png';
	      this.image.onload = function () { 
				asteroid.imgLoaded = true;
			},
			this.getCore = function() {
			return this.core
		},
			this.collisionReact = function(obj) {
				var objName = obj.getName()
				if(objName == 'SpaceShip')
					this.core.kill()
				else
					this.core.update()
			},
			this.getName = function() {
				return this.name
			}
	  }

	var AsteroidContainer = Class.$extend({
		__init__ : function(canvas) {
			this.name = 'AsteroidContainer'
			var astCont = this
			this.cnvs = canvas
			this.asteroids = []
			this.asteroidProbability = 0.2
			astCont.interval = setInterval(function() {
				var ps = Math.random()
				if(ps < astCont.asteroidProbability) {
					astCont.createAsteroids(astCont.cnvs.width)
				}
			}, 300)
		},

		getName: function() {
			return this.name
		},

		createAsteroids : function(_pos) {
				var r = Math.floor(Math.random() * 26 + 25)
			    var x = _pos || Math.floor(Math.random() * this.cnvs.width*0.3) + this.cnvs.width + r
			    var y = Math.floor(Math.random() * this.cnvs.height)
			    var sp = Math.floor(Math.random() * 5 + 2)
			    var asteroid = new Asteroid(x,y,r,sp)
			    asteroid.sWidth = asteroid.sHeight = r * 2;
			    this.asteroids.push(asteroid)
		},

		deleteAsteroids : function() {
			for(i = 0; i < this.asteroids.length; i++) {
			    this.asteroids.splice(i, 1)
			}
		},

		update: function() {
			for(i = 0; i < this.asteroids.length; i++) {
			        this.asteroids[i].x -= this.asteroids[i].speed
			        if(this.asteroids[i].core.isValid()) {
			        	this.asteroids[i].core.update(this.asteroids[i].x,
			            this.asteroids[i].y, this.asteroids[i].radius)
			        }
			        if(this.asteroids[i].x <= -this.asteroids[i].radius ) {
			            this.asteroids.splice(i, 1)
			           // this.createAsteroids(1,this.cnvs.width)
			    }   
			}

		},

		draw : function(ctx) {

			for(i = 0; i < this.asteroids.length; i++) {

				if(this.asteroids[i].imgLoaded) {

					ctx.drawImage(this.asteroids[i].image, 
						this.asteroids[i].x - this.asteroids[i].radius,  // find center of collision core
						this.asteroids[i].y - this.asteroids[i].radius, 
						this.asteroids[i].sWidth, 
						this.asteroids[i].sHeight)
				}
			}
		},
	})
	return AsteroidContainer
});