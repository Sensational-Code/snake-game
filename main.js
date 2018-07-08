var game = new SnakeGame();

window.onload = function() {
	game.init();
}

window.onkeydown = function(event) {
	game.snake.head.direction = {
		37: -1, // left arrow
		39: 1, // right arrow
		38: -2, // up arrow
		40: 2 // down arrow
	}[event.keyCode] || game.snake.head.direction;

	console.log(game.snake.head.direction);
}