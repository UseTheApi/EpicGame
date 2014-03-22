define([
	'classy',
	'game/util/utilites',
	'game/spaceGarbage'
], function(
	Class,
	Util,
	AsteroidContainer
){
	var SpaceShip = Class.$extend({
		__init__ : function(x,y,src,cnvs) {
			var ship = this;
			var game = game;
			this.direction = '';
			this.cnvs = cnvs;
			this.x = x;
			this.y = y;
			this.sWidth = 125; // spaceship width
			this.sHeight = 53; // spaceship height
			this.collisionRadius = this.sHeight/2 * 0.8;
			this.collisionShiftX = this.sWidth * 0.75;
			this.collisionShiftY = this.sHeight/2;
			this.dy = 2; 
			this.dx = 2;
			this.gravity = 0.01;
			this.vy = 0; // vertical speed
			this.vx = 0; // horizontal speed
			this.imgLoaded = false;
			this.image = new Image();
			this.image.src = src;
			this.bullets = []; // TODO ship can shoot bullets
			//this.Util = new Util(canvas)
			this.image.onload = function () { 
				ship.imgLoaded = true;
			}
		},

		update : function(game) {

			if(game.keys[38]) { // up
				this.vy = -this.dy; this.direction = ''; 
			}
			if(game.keys[40]) { //down
				this.vy = this.dy; this.direction = '';  

			}
			if(game.keys[37]) { // back
				this.vx = -this.dx; this.direction = ''; 

			}
			if(game.keys[39]) { // forward
				this.vx = this.dx; this.direction = ''; 
			}

			//this.vy += this.gravity; // need gravity or not?
			this.y += this.vy;
			this.x += this.vx;
			this.vy *= 0.98; // friction 
			this.vx *= 0.98;

			this.collisionCheck(game);
		
		},

		collisionCheck: function(game) {
			for (i in game.AsteroidContainer.asteroids)
			{
				//debugger
				if(game.Util.intersectCircles(
					this.x + this.collisionShiftX, 
					this.y + this.collisionShiftY, 
					this.collisionRadius,
					game.AsteroidContainer.asteroids[i].x, 
					game.AsteroidContainer.asteroids[i].y, 
					game.AsteroidContainer.asteroids[i].radius) == true)
				{
					game.trigger("SpaceShipCrash");
					break;
				}
				else {
				}
				
			}
			if(this.y > this.cnvs.width-178-22 || this.y < -10) {
			 game.trigger("SpaceShipCrash");
			}
			if(this.x>this.cnvs.width) this.x = -this.sWidth; 
			if(this.x<-this.sWidth) this.x = this.cnvs.width;
		},

		draw : function(ctx) {
			if(this.imgLoaded == true) ctx.drawImage(this.image, this.x, this.y, this.sWidth, this.sHeight);
			/*ctx.beginPath();
      		ctx.arc(this.x + this.collisionShiftX, this.y + this.collisionShiftY, this.collisionRadius, 0, 2 * Math.PI, false);
      		ctx.fillStyle = 'green';
      		ctx.fill();*/
		}
	})
	return SpaceShip;
});