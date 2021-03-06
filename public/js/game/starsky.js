define([
    'classy',
], function(
    Class
){


	function Star(x,y,r) {
	      this.x = x;
	      this.y = y;
	      this.radius = r;
	  }

	var StarSky = Class.$extend({
		__init__ : function(canvas, amount) {
			this.cnvs = canvas;
			this.speed = 1;
			this.stars = [];
			this.amount = amount;
			this.createStars(this.amount);
		},

		createStars : function(amount, _pos) {
			for (i = 0; i < amount; i++) {
			    var x = _pos || Math.floor(Math.random() * this.cnvs.width)
			    var y = Math.floor(Math.random() * this.cnvs.height)
			    var r = Math.floor(Math.random() * 5 + 1)
			    var star = new Star(x,y,r);
			    this.stars.push(star);
			}
		},


		deleteStars : function() {
			for(i = 0; i < this.stars.length; i++) {
			    this.stars.splice(i,1);
			}
		},

		draw : function(ctx) {

			for(i = 0; i < this.stars.length; i++) {
			        this.stars[i].x -= (this.speed || 3);
			        if(this.stars[i].x <= 0 ) {
			            this.stars.splice(i, 1);
			            this.createStars(1,this.cnvs.width);
			    }   
			}
			
			this.clearcanvas(ctx);

			for(i = 0; i < this.stars.length; i++) {
			    ctx.fillStyle = "white";
			    ctx.beginPath();
			    ctx.arc(this.stars[i].x , this.stars[i].y, this.stars[i].radius, 0, Math.PI * 2, true);
			    ctx.closePath();
			    ctx.fill();
			}
		},

		clearcanvas : function(ctx) {
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, this.cnvs.width, this.cnvs.height);
		}
	})
	return StarSky;
});


