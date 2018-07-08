function SnakeGame() {
	this.board = new Gameboard();
	this.snake = new Snake();

	this.blockSize = 10;

	this.canvas = document.createElement('canvas');
	this.canvas.width = this.board.width * this.blockSize;
	this.canvas.height = this.board.height * this.blockSize;
	this.canvas.style.border = '1px solid';
	this.context = this.canvas.getContext('2d');

	return this;
}

SnakeGame.prototype = {
	init: function() {
		setInterval(this.update.bind(this), 120);
		document.body.appendChild(this.canvas);
	},

	update: function() {
		this.snake.update();

		this.render();
	},

	render: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.snake.render(this.context, this.blockSize);
	}
}