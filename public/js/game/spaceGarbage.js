define([
    'classy',
    'game/collisionCore'
], function(
    Class,
    Core
){


	function Asteroid(x,y,r,sp,src, ctx) {
		var asteroid = this
		this.ctx = ctx;
	      this.x = x;
	      this.y = y;
	      this.radius = r;
	      this.speed = sp;
	      this.core = new Core() // collision core	      
	      this.sWidth = 160;  //standart mesurements of image
		  this.sHeight = 160;
		  this.imgLoaded = false;
		  this.image = new Image();
		  
		  this.image.src = src;
	      this.image.onload = function () { 
				asteroid.imgLoaded = true;
			},

	      
	      this.getCore = function() {
			return this.core
		},
			this.collisionReact = function() {
				this.core.kill()
			}
	  }

	var AsteroidContainer = Class.$extend({
		__init__ : function(canvas, amount) {
			this.cnvs = canvas
			this.asteroids = []
			this.amount = amount
			this.createAsteroids(this.amount)
		},

		createAsteroids : function(amount, ctx, _pos) {
			for (i = 0; i < amount; i++) {
			    var x = _pos || Math.floor(Math.random() * this.cnvs.width*0.3) + this.cnvs.width*0.7
			    var y = Math.floor(Math.random() * this.cnvs.height)
			    var r = Math.floor(Math.random() * 26 + 25)
			    var sp = Math.floor(Math.random() * 2 + 1)
			    var asteroid = new Asteroid(x,y,r,sp, 'imgs/asteroid.png')
			    asteroid.sWidth = asteroid.sHeight = r * 2;
			    this.asteroids.push(asteroid)
			}
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
			        if(this.asteroids[i].x <= 0 ) {
			            this.asteroids.splice(i, 1)
			            this.createAsteroids(1,this.cnvs.width)
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