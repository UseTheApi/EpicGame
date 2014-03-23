define([
	'classy',
	'game/util/utilites'
], function(
	Class,
	Util
){
	var Core = Class.$extend({
		__init__: function(){
			this.x
			this.y
			this.radius
			this.life = true;
		},

		isValid: function() {
			return(this.life)
		},

		kill: function() {
			this.life = false;
		},

		sqr: function(a) {
			return (a*a)
		},

		intersectCircles: function(x1,y1,r1,x2,y2,r2) {
			var hypotenuse = this.sqr(x1 - x2) + this.sqr(y1 - y2)
			var distance = this.sqr(r1 + r2);
			return(hypotenuse <= distance)
		},

		coreIntersect: function(core)
		{
			return this.intersectCircles(this.x, this.y, this.radius, 
				core.x, core.y, core.radius)
		},

		update: function(x, y, r) {
			this.x = x;
			this.y = y;
			this.radius = r;
			this.life = true;
		}
	})
	return Core;
});