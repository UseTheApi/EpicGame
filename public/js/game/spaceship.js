define([
    'classy',
], function(
    Class
){

	var SpaceShip = Class.$extend({
		__init__ : function(x,y,src) {
			var ship = this;
			this.direction = '';
			this.x = x;
			this.y = y;
			this.dy = 1; 
			this.dx = 1.5;
			this.gravity = 0.01;
			this.vy = 0; // vertical speed
			this.vx = 0; // horizontal speed
			this.imgLoaded = false;
			this.image = new Image();
			this.image.src = src;
			this.image.onload = function () { 
            	ship.imgLoaded = true;
        	}
		},

		draw : function(ctx) {
			switch(this.direction) {
				case 'up' :
				  this.vy-= this.dy; this.direction = ''; 

				break;

				case 'down':
				  this.vy+= this.dy; this.direction = '';  

				break;

				case 'forward':
				  this.vx = this.dx; this.direction = ''; 
				break;

				case 'back':
				  this.vx = -this.dx; this.direction = ''; 
				break;

				default:
				
				break;
			}
				this.vy += this.gravity;
				this.y += this.vy;
				this.x += this.vx;
			if(this.imgLoaded == true) ctx.drawImage(this.image, this.x, this.y, 125, 53);
		}
	})


	return SpaceShip;
});