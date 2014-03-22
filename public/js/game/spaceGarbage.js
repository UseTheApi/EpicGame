define([
    'classy',
], function(
    Class
){


	function Asteroid(x,y,r,sp) {
	      this.x = x;
	      this.y = y;
	      this.radius = r;
	      this.speed = sp;
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
			    var x = _pos || Math.floor(Math.random() * this.cnvs.width)
			    var y = Math.floor(Math.random() * this.cnvs.height)
			    var r = Math.floor(Math.random() * 10 + 20)
			    var sp = Math.floor(Math.random() * 3 + 1)
			    var asteroid = new Asteroid(x,y,r,sp)
			    this.asteroids.push(asteroid)
			}
		},


		deleteAsteroids : function() {
			for(i = 0; i < this.asteroids.length; i++) {
			    this.asteroids.splice(i, 1)
			}
		},

		draw : function(ctx) {

			for(i = 0; i < this.asteroids.length; i++) {
			        this.asteroids[i].x -= this.asteroids[i].speed
			        if(this.asteroids[i].x <= 0 ) {
			            this.asteroids.splice(i, 1)
			            this.createAsteroids(1,this.cnvs.width)
			    }   
			}

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