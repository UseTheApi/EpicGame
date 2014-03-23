define([
	'classy',
	'game/util/utilites',
	'game/spaceGarbage',
	'game/explosion',
	'game/collisionCore'
], function(
	Class,
	Util,
	AsteroidContainer,
	ExplosionClass,
	Core
){
	var SpaceShip = Class.$extend({
		__init__ : function(x,y,src,cnvs, ctx) {
			var ship = this;
			var game = game;
			this.direction = '';
			this.cnvs = cnvs;
			this.ctx = ctx;
			this.x = x;
			this.y = y;
			this.sWidth = 125; // spaceship width
			this.sHeight = 53; // spaceship height
			this.collisionRadius = this.sHeight/2 * 0.8;
			this.collisionShiftX = this.sWidth * 0.75;
			this.collisionShiftY = this.sHeight/2;
			this.core = new Core()
			this.dy = 2; 
			this.dx = 2;
			this.gravity = 0.025;
			this.vy = 0; // vertical speed
			this.vx = 0; // horizontal speed
			this.imgLoaded = false;
			this.image = new Image();
			this.image.src = src;
			this.explosion = 0;
			this.fail = false;
			this.bullets = []; // TODO ship can shoot bullets
			//this.Util = new Util(canvas)
			this.explosionColors = ['#FF0533', '#EB0CA8', '#870515', '#CC5027', '#853707'];
			this.image.onload = function () { 
				ship.imgLoaded = true;
			}
		},

		getCore: function() {
			return this.core;
		},

		collisionReact: function() {
				this.explosion = new ExplosionClass(this.ctx, 
					this.x + this.collisionShiftX, 
					this.y + this.collisionShiftY, 
					this.explosionColors)
				this.fail = true;
				this.core.kill();
		},

		update : function(game) {

			if(!this.fail) {
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
			}
			else {
				game.fps = 6;
				this.vy += this.gravity;
				this.y += this.vy;
			}
			if(this.core.isValid()) {
				this.core.update(this.x + this.collisionShiftX, 
					this.y + this.collisionShiftY, 
					this.collisionRadius);
			}
			if(this.explosion != 0) {
				this.explosion.update(game.fps);
			}

			if(this.out(game)) {
				game.trigger("SpaceShipCrash");
			}
		},

		out: function(game) {
			if(this.y > this.cnvs.width-178-22 || this.y < -10) {
			 return true;
			}
			if(this.x>this.cnvs.width) this.x = -this.sWidth; 
			if(this.x<-this.sWidth) this.x = this.cnvs.width;
		},

		draw : function(ctx) {
			if(this.imgLoaded == true) 
				if(this.fail) {
					this.image.src = 'imgs/fail_rocket.png'
					ctx.drawImage(this.image, this.x + this.sWidth/2, this.y, this.sHeight, this.sWidth);
					if(this.explosion!=0) {
                		this.explosion.draw();
                    }
				}
				else {
   				 ctx.drawImage(this.image, this.x, this.y,
				 this.sWidth, this.sHeight);
   				}
		}
	})
	return SpaceShip;
});