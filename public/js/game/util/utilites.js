define([
    'classy'
], function(
    Class
){

	var Util = Class.$extend({

		__init__ : function(canvas) {
			this.cnvs = canvas;
		},

		greeting : function(ctx) {
			ctx.font="30px Verdana";
			// Create gradient
			var gradient = ctx.createLinearGradient(0,0,this.cnvs.width,0);
			gradient.addColorStop("0","magenta");
			gradient.addColorStop("0.5","blue");
			gradient.addColorStop("1.0","red");
			// Fill with gradient
			ctx.fillStyle = gradient;
			ctx.fillText("To start game press anykey!",this.cnvs.width/2-200,this.cnvs.height/2); 
		}
	});

	return Util;
});