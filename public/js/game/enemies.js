define([
    'classy',
    'game/collisionCore'
], function(
    Class,
    Core
){
	function Enemy(x,y,r,sp) {
		  var Enemy = this
		  this.name = 'Enemy'
	      this.x = x;
	      this.y = y;
	      this.radius = r;
	      this.speed = sp;
	      this.core = new Core() // collision core	      
	      this.sWidth = 170;  //standart mesurements of image
		  this.sHeight = 170;
		  this.imgLoaded = false;
		  this.lineOfLife = 30;
		  this.bulletDamage = 10;
		  this.image = new Image();  
		  this.image.src = 'imgs/enemy.png';
	      this.image.onload = function () { 
				Enemy.imgLoaded = true;
			},
			this.getCore = function() {
			return this.core
		},

			this.getName = function() {
				return this.name
			},

			this.collisionReact = function(obj) {
				var objName = obj.getName()
				if(objName == 'SpaceShip')
					this.core.kill()
				else if(objName == 'Bullet')
					this.lineOfLife -= this.bulletDamage
					if(this.lineOfLife == 0) {
						this.core.kill()
					}
			}
	  }

	var EnemyContainer = Class.$extend({
		__init__ : function(canvas) {
			var enCont = this
			this.cnvs = canvas
			this.enemies = []
			this.enemyProbability = 0.08
			enCont.interval = setInterval(function() {
				var ps = Math.random()
				if(ps < enCont.enemyProbability) {
					enCont.createEnemies(enCont.cnvs.width)
				}
			}, 300)
		},

		createEnemies : function(_pos) {
				var r = 55
			    var x = _pos ? (_pos+r) : Math.floor(Math.random() * this.cnvs.width*0.3) + this.cnvs.width
			    var y = Math.floor(Math.random() * this.cnvs.height)
			    var sp = Math.floor(Math.random() * 5 + 2)
			    var enemy = new Enemy(x,y,r,sp)
			    enemy.sWidth = enemy.sHeight = r * 2;
			    this.enemies.push(enemy)
		},

		deleteEnemy : function() {
			for(i = 0; i < this.enemies.length; i++) {
			    this.enemies.splice(i, 1)
			}
		},

		update: function() {
			for(i = 0; i < this.enemies.length; i++) {
				if(this.enemies[i].lineOfLife == 0) {
					this.enemies[i].y += this.enemies[i].speed * 3
					if(this.enemies[i].y >= this.cnvs.height)
					{
						this.enemies.splice(i, 1)
						console.log("enemy killed")
					}
				}
				else {
			        this.enemies[i].x -= this.enemies[i].speed

			        if(this.enemies[i].core.isValid()) {
			        	this.enemies[i].core.update(this.enemies[i].x,
			            this.enemies[i].y, this.enemies[i].radius)
			        }
			        if(this.enemies[i].x <= -this.enemies[i].radius ) {
			            this.enemies.splice(i, 1)
			    	}   
				}
			}

		},

		draw : function(ctx) {

			for(i = 0; i < this.enemies.length; i++) {

				if(this.enemies[i].imgLoaded) {

					ctx.drawImage(this.enemies[i].image, 
						this.enemies[i].x - this.enemies[i].radius,  // find center of collision core
						this.enemies[i].y - this.enemies[i].radius, 
						this.enemies[i].sWidth, 
						this.enemies[i].sHeight)
				}
			}
		},
	})
	return EnemyContainer
});