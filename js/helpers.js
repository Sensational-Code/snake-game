var helpers = {
	// I would add this to CanvasRenderingContext2D, but a wise man once said to never extend native objects
	fillRoundedRect: function(context, x, y, w, h, r){
		context.beginPath();
		context.moveTo(x+r, y);
		context.lineTo(x+w-r, y);
		context.quadraticCurveTo(x+w, y, x+w, y+r);
		context.lineTo(x+w, y+h-r);
		context.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
		context.lineTo(x+r, y+h);
		context.quadraticCurveTo(x, y+h, x, y+h-r);
		context.lineTo(x, y+r);
		context.quadraticCurveTo(x, y, x+r, y);
		context.fill();
	},

	randomIntBetween: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
}