define([
], function(
){
	var Game = {
		fps : 60,
		context : null,
		canvas : null,
		run : function(canvas) {
			this.canvas = canvas;
			this.context = canvas.getContext("2d");
			this.context.fillRect(0, 0, canvas.width, canvas.height);
			this.context.fillStyle    = '#fff';			
			this.context.fillRect(0, 0, canvas.width/2, canvas.height/2);
			//this.context.fillRect(0, 0, canvas.width, canvas.height);
			this.greeting();

		},

		greeting : function() {
			this.context.fillStyle    = '#fff';
			this.context.font         = 'italic 30px sans-serif';
			this.context.textBaseline = 'top';
			this.context.font         = 'bold 30px sans-serif';
			this.context.strokeText('Hello world!', 0, 50);
		}
	};

	return Game;
});
