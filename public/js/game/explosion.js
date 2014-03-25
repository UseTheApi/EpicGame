define([
    'classy',
], function(
    Class
){
/*
 * Explosion Class
 */

Math.randomFloat = function(min, max){
	return min + Math.random()*(max-min);
};

var ExplosionClass = Class.$extend({
	__init__: function(x, y, colors,numPart, maxSz, maxSp) {
		 // The update frequency
		this.particles = [] // List of particles in the explosion
		//this.ctx = canvas
		this._killed=false
		this.numPart = numPart
		this.maxSz = maxSz
		this.maxSp = maxSp

		for (i = 0; i < colors.length; i++ ) {
			this.createExplosion(x, y, colors[i], this.numPart, this.maxSz, this.maxSp);
		}
	},
	
	createExplosion: function(x, y, color, numPart, maxSz, maxSp) {

		var numParticles = numPart;
		
		// Particle size parameters
		var minSize = 1;
		var maxSize = maxSz;
		
		// Particle speed parameters
		// Controls how quickly the particle
		// speeds outwards from the blast center.
		var minSpeed = 100.0;
		var maxSpeed = maxSp;
		
		// Scaling speed parameters
		// Controls how quickly the particle shrinks.
		var minScaleSpeed = 0.3;
		var maxScaleSpeed = 1.0;

		// Uniformly distribute the particles in a circle
		for ( var angle=0; angle<360; angle += Math.round(360/numParticles) ) {

			var particle = new ParticleClass(this);

			particle.pos.x = x;
			particle.pos.y = y;
			
			// Set the particle size as a random value
			// between minSize and maxSize
			particle.radius = Math.randomFloat(minSize, maxSize);

			particle.color = color;

			// Set the scale speed. This is a random value
			// between minScaleSpeed and maxScaleSpeed
			particle.scaleSpeed = Math.randomFloat(minScaleSpeed, maxScaleSpeed);
			// Get a random speed value between minSpeed and maxSpeed
			var speed = Math.randomFloat(minSpeed, maxSpeed);
			
			// Set the velocity of the particle
			particle.velocity.x = speed * Math.cos(angle * Math.PI / 180.0);
			particle.velocity.y = speed * Math.sin(angle * Math.PI / 180.0);
			this.particles.push(particle);
		}
	},

	removeParticle: function(particle) {
		this.particles.slice(particle);
	},
	
	update: function(fps) {
		if ( this.particles.length <= 0) {
			this.kill();
			return;	
		}
		
		for ( var i = 0; i < this.particles.length; i++) {
			this.particles[i].update(fps);
		}
	},
	
	draw: function(ctx) {
		for ( var i = 0; i < this.particles.length; i++) {
			this.particles[i].draw(ctx);
		}
	},
	
	kill: function() {
		this._killed = true;
	}
});

/*
 * Particle Class
 * Represents a particle in an explosion. It includes functions to update
 * the state of the particle during the explosion.
 */
var ParticleClass = Class.$extend({

	__init__ : function(parent){
	this.pos={x: 0, y: 0}
	
	this.radius=20
	
	this.color="#000000"
	
	this.scale=1.0  // Scaling value between 0.0 and 1.0, initialized to 1.0.
	this.scaleSpeed=0.5 // Amount per second to be deduced from the scale property.
	
	this.velocity={x: 0, y: 0} // Amount to be added per second to the particle’s position.
	
	this.parent = parent // The parent object controlling the explosion
	},

	update: function(fps) {
		
		// Shrink the particle based on the scaleSpeed value
		this.scale -= this.scaleSpeed * fps / 1000.0;

		if (this.scale <= 0)
		{
			this.scale = 0;
			this.kill();
			return;
		}
		// moving away from explosion center
		this.pos.x += this.velocity.x * fps/1000.0;
		this.pos.y += this.velocity.y * fps/1000.0;
	},

	draw: function(ctx) {
		//var ctx = this.parent.ctx;

		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.radius*this.scale, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.restore();
	},

	kill: function(){
		this.parent.removeParticle(this);
	}
})
return ExplosionClass;
});