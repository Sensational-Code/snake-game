var game = new SnakeGame();

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