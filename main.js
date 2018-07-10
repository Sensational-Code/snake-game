var game = new SnakeGame();

// I would add this to CanvasRenderingContext2D, but a wise man once said to never extend native objects
function fillRoundedRect(context, x, y, w, h, r){
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
}

function randomIntBetween(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

window.onload = function() {
	game.init();
}

window.onkeydown = function(event) {
	game.snake.newDirection = {
		37: -1, // left arrow
		39: 1, // right arrow
		38: -2, // up arrow
		40: 2 // down arrow
	}[event.keyCode] || game.snake.newDirection;

	console.log(game.snake.direction);
}

window.onclick = function() {
	if (game.snake.dead) {
		game.reset();
	}
}