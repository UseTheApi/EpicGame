define([
    'classy',
], function(
    Class
){
/*
 * Explosion Class
 * A class to create explosions on the HTML5 canvas.
 */

Math.randomFloat = function(min, max){
	return min + Math.random()*(max-min);
};

var ExplosionClass = Class.$extend({
	__init__: function(canvas, x, y, colors ) {
		this.fHz = 1000/60 // The update frequency
		this.particles = [] // List of particles in the explosion
		this.ctx = canvas// the canvas context to which the explosion will be drawn
		this._killed=false

		for (i = 0; i < colors.length; i++ ) {
			this.createExplosion(x, y, colors[i]);
		}
	},
	
	// Create an explosion for a particular color at the
	// the coordinates x and y.
	createExplosion: function(x, y, color) {
		// Number of particles to use
		var numParticles = 12;
		
		// Particle size parameters
		// Controls the size of the particle.
		var minSize = 5;
		var maxSize = 20;
		
		// Particle speed parameters
		// Controls how quickly the particle
		// speeds outwards from the blast center.
		var minSpeed = 60.0;
		var maxSpeed = 400.0;
		
		// Scaling speed parameters
		// Controls how quickly the particle shrinks.
		var minScaleSpeed = 1.0;
		var maxScaleSpeed = 4.0;

		// Uniformly distribute the particles in a circle
		for ( var angle=0; angle<360; angle += Math.round(360/numParticles) ) {
			
			// Create a new particle
			var particle = new ParticleClass(this);
			
			// Assign the parent for callback purposes
			//particle.parent = this;
			
			// Set the position of the particle
			particle.pos.x = x;
			particle.pos.y = y;
			
			// Set the particle size as a random value
			// between minSize and maxSize
			particle.radius = Math.randomFloat(minSize, maxSize);
			
			// Set the particle's color
			particle.color = color;

			// Set the scale speed. This is a random value
			// between minScaleSpeed and maxScaleSpeed
			particle.scaleSpeed = Math.randomFloat(minScaleSpeed, maxScaleSpeed);
			// Get a random speed value between minSpeed and maxSpeed
			var speed = Math.randomFloat(minSpeed, maxSpeed);
			
			// Set the velocity of the particle
			particle.velocity.x = speed * Math.cos(angle * Math.PI / 180.0);
			particle.velocity.y = speed * Math.sin(angle * Math.PI / 180.0);

			// Add the particle to the list of particles in the explosion
			this.particles.push(particle);
		}
	},
	
	// Remove a particle from the list of particles in the explosion.
	// The function is called by the particle's kill function.
	removeParticle: function(particle) {
		this.particles.slice(particle);
	},
	
	// Update all particles
	update: function() {
		if ( this.particles.length <= 0) {
			this.kill();
			return;	
		}
		
		for ( var i = 0; i < this.particles.length; i++) {
			this.particles[i].update();
		}
	},
	
	// Draw all particles
	draw: function() {
		for ( var i = 0; i < this.particles.length; i++) {
			this.particles[i].draw();
		}
	},
	
	// Destroy this explosion instance
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
	this.pos={x: 0, y: 0} // The coordinates of the particle.
	
	this.radius=20 // The radius of the particle.
	
	this.color="#000000" // RGB color value of particle (hexadecimal notation).
	
	this.scale=1.0  // Scaling value between 0.0 and 1.0, initialized to 1.0.
	this.scaleSpeed=0.5 // Amount per second to be deduced from the scale property.
	
	this.velocity={x: 0, y: 0} // Amount to be added per second to the particle’s position.
	
	this.parent = parent // The parent object controlling the explosion
	},
	// Update the size and position of the particle
	update: function() {
		var ms = this.parent.fHz;
		
		// Shrink the particle based on the scaleSpeed value
		this.scale -= this.scaleSpeed * ms / 1000.0;

		if (this.scale <= 0)
		{
			this.scale = 0;
			this.kill();
			return;
		}
		// moving away from explosion center
		this.pos.x += this.velocity.x * ms/1000.0;
		this.pos.y += this.velocity.y * ms/1000.0;
	},

	// Draws the particle on the canvas
	draw: function() {
		//var ctx = this.parent.ctx;
		var ctx = this.parent.ctx;
		
		// translating the 2D context to the particle coordinates
	//	ctx.translate(this.pos.x, this.pos.y);
	//	ctx.scale(this.scale, this.scale);

		// drawing a filled circle in the particle's local space
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.radius*this.scale, 0, Math.PI*2, true);
		ctx.closePath();

		ctx.fillStyle = this.color;
		ctx.fill();

		ctx.restore();
	},
	
	// Destroy the particle
	kill: function(){
		//this.parent.removeParticle(this);
	}
})
return ExplosionClass;
});