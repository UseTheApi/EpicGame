define([
    'classy',
    'game/collisionCore'
], function(
    Class,
    Core
){


	function Asteroid(x,y,r,sp) {
	      this.x = x;
	      this.y = y;
	      this.radius = r;
	      this.speed = sp;
	      this.core = new Core()
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

		
		
		

		createAsteroids : function(amount, _pos) {
			for (i = 0; i < amount; i++) {
			    var x = _pos || Math.floor(Math.random() * this.cnvs.width*0.3) + this.cnvs.width*0.7
			    var y = Math.floor(Math.random() * this.cnvs.height)
			    var r = Math.floor(Math.random() * 26 + 25)
			    var sp = Math.floor(Math.random() * 5 + 2)
			    var asteroid = new Asteroid(x,y,r,sp)
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
			    ctx.fillStyle = "red"
			    ctx.beginPath()
			    ctx.arc(this.asteroids[i].x , this.asteroids[i].y, this.asteroids[i].radius, 0, Math.PI * 2, true)
			    ctx.closePath()
			    ctx.fill()
			}
		},
	})
	return AsteroidContainer
});