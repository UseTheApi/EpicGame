define([
    'classy',
    'game/collisionCore',
    'game/explosion',
    'game/explosionManager'
], function(
    Class,
    Core,
    ExplosionClass,
    ExplosionManager
){
	function Bullet(x,y,r,sp,ctx){
		this.name = 'Bullet'
		this.x = x
		this.y = y
		this.radius = r
		this.speed = sp
		this.ctx = ctx
		this.core = new Core()
		this.life = true
		this.explosionColors = ('#FF0533', '#EB0CA8')
		this.getCore = function(){
			return this.core
		},

		this.getName = function() {
			return this.name
		}
		this.collisionReact = function(obj){
			var objName = obj.getName()
			if((objName == 'Enemy') || (objName == 'Asteroid')) {
				var explosion = new ExplosionClass( 
					this.x, 
					this.y, 
					this.explosionColors,
					12, 10, 130)
				ExplosionManager().$class.addExplosion(explosion)
				this.core.kill()
				this.life = false
			}
			else {
				this.core.kill()
			}
		}
	}

	var BulletContainer = Class.$extend({
		__init__: function(canvas,ctx){
			this.cnvs = canvas
			this.bullets = []
		},

		createBullet: function(x,y,ctx){
			var x = x;
			var y = y;
			var radius = 4; // bullet radius hardcoded
			var speed = 5; // bullet speed hardcoded
			var bullet = new Bullet(x,y,radius,speed,ctx)
			this.bullets.push(bullet)
		},

		deleteBullet: function(i) {
			this.bullets.splice(i, 1)
		},

		update: function() {
			for (i in this.bullets)
			{
				this.bullets[i].x += this.bullets[i].speed
				if((this.bullets[i].x >= this.cnvs.width) || !this.bullets[i].life)
				{
					this.deleteBullet(i)
					continue
				}
				if(this.bullets[i].core.isValid()) {
				this.bullets[i].core.update(this.bullets[i].x, 
					this.bullets[i].y, 
					this.bullets[i].radius);
			}
			}
		},

		draw: function(ctx){
			for(i = 0; i < this.bullets.length; i++) {
			    ctx.fillStyle = "yellow";
			    ctx.beginPath();
			    ctx.arc(this.bullets[i].x , this.bullets[i].y, this.bullets[i].radius, 0, Math.PI * 2, true);
			    ctx.closePath();
			    ctx.fill();
			}
		}
	});
	return BulletContainer
 });