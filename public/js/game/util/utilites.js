define([
    'classy'
], function(
    Class
){

	var Util = Class.$extend({

		__init__ : function(canvas) {
			this.cnvs = canvas;
		},

		greeting : function(ctx, token) {
			ctx.font="30px Verdana";
			// Create gradient
			var gradient = ctx.createLinearGradient(0,0,this.cnvs.width,0);
			gradient.addColorStop("0","magenta");
			gradient.addColorStop("0.5","blue");
			gradient.addColorStop("1.0","red");
			// Fill with gradient
			ctx.fillStyle = gradient;
			ctx.fillText("To start game press anykey!",this.cnvs.width/2-200,this.cnvs.height/2); 
			ctx.fillText("you can use token: " + token, this.cnvs.width/2-200, this.cnvs.height/2 + 50)
		},

		drawscore: function(ctx, score) {
			ctx.font="15px Verdana";
			var gradient = ctx.createLinearGradient(0,0,this.cnvs.width,0);
			gradient.addColorStop("0","magenta");
			gradient.addColorStop("0.5","blue");
			gradient.addColorStop("1.0","red");
			ctx.fillStyle = gradient;
			ctx.fillText(score,this.cnvs.width-60,20); 
		},

		clear: function(ctx) {
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, this.cnvs.width, this.cnvs.height);
		}
	});

	return Util;
});