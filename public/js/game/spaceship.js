define([
	'classy',
	'game/util/utilites',
	'game/spaceGarbage',
	'game/explosion',
	'game/collisionCore',
	'game/attackLogic',
	'game/explosionManager'
], function(
	Class,
	Util,
	AsteroidContainer,
	ExplosionClass,
	Core,
	BulletContainer,
	ExplosionManager
){
	var SpaceShip = Class.$extend({
		__init__ : function(x,y,src,cnvs, ctx) {
			this.name = 'SpaceShip'
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
			this.dy = 3; 
			this.dx = 3;
			this.gravity = 0.025;
			this.vy = 0; // vertical speed
			this.vx = 0; // horizontal speed
			this.imgLoaded = false;
			this.image = new Image();
			this.image.src = src;
			this.im = new Image();
			this.im.src = 'imgs/fail_rocket.png'
			this.fail = false;
			//this.explosionManager = new ExplosionManager()
			this.bulletContainer = new BulletContainer(this.cnvs,this.ctx)
			this.explosionColors = ['#FF0533', '#EB0CA8', '#870515', '#CC5027', '#853707', '#FF6600'];
			this.image.onload = function () { 
				ship.imgLoaded = true;
			}
		},

		getName: function() {
			return this.name
		},

		getCore: function() {
			return this.core;
		},

		collisionReact: function(obj) {
			var objName = obj.getName()
			if((objName == 'Asteroid') || (objName == 'Enemy')) {
				var explosion = new ExplosionClass(this.x + this.collisionShiftX, 
					this.y + this.collisionShiftY, 
					this.explosionColors,
					55, 30, 800)
				ExplosionManager().$class.addExplosion(explosion)
				this.fail = true;
				this.core.kill();
			}
		},

		update : function(game) {

			if(!this.fail) {

				this.x += game.rotRateAlpha/10
				this.y += -game.rotRateBeta/10

				if(game.haveTouch)
				{
					this.bulletContainer.createBullet(this.x + this.sWidth, this.y + this.sHeight/2, this.ctx)
					game.haveTouch = false
				}
				this.bulletContainer.update();
			/*if(game.keys[38]) { // up
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
			if(game.keys[32]) { //attack with bullet
				//debugger
				this.bulletContainer.createBullet(this.x + this.sWidth, this.y + this.sHeight/2, this.ctx)
				game.keys[32] = false;
			}
			//this.vy += this.gravity; // need gravity or not?
			this.y += this.vy;
			this.x += this.vx;
			this.vy *= 0.98; // friction 
			this.vx *= 0.98;
			this.bulletContainer.update();*/
			}
			else {
				game.fps = 4;
				this.vy += this.gravity;
				this.y += this.vy;
			}
			if(this.core.isValid()) {
				this.core.update(this.x + this.collisionShiftX, 
					this.y + this.collisionShiftY, 
					this.collisionRadius);
			}

			if(this.out(game)) {
				game.trigger("SpaceShipCrash");
			}
		},

		out: function(game) {
			if(this.y > this.cnvs.width-178-22 || this.y < -this.sHeight) {
			 return true;
			}
			if(this.x>this.cnvs.width) this.x = -this.sWidth; 
			if(this.x<-this.sWidth) this.x = this.cnvs.width;
		},

		draw : function(ctx) {
			if(this.imgLoaded == true) {
				if(this.fail) {
					ctx.drawImage(this.im, this.x + this.sWidth/2, this.y, 
						this.sHeight, this.sWidth)
				}
				else {
   				    ctx.drawImage(this.image, this.x, this.y,
				    this.sWidth, this.sHeight);
				    this.bulletContainer.draw(ctx)
				}
				}
		}
	})
	return SpaceShip;
});