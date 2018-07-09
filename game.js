function SnakeGame() {
	this.board = new Gameboard();
	this.snake = new Snake(this.board.width/2 - 1, this.board.height/2 - 1);
	this.candies = [new Candy().findNewSpot(this.board.width, this.board.height, this.snake.blocks)];

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

	reset: function() {
		this.snake = new Snake(this.board.width/2 - 1, this.board.height/2 - 1);
		this.candies = [new Candy().findNewSpot(this.board.width, this.board.height, this.snake.blocks)];
	},

	update: function() {
		if (!this.snake.dead) {
			this.snake.update();

			for (var i = 0; i < this.candies.length; ++i) {
				var candy = this.candies[i];
				if (this.snake.blocks[0].x === candy.x && this.snake.blocks[0].y === candy.y) {
					this.snake.length += 1;
					candy.findNewSpot(this.board.width, this.board.height, this.snake.blocks);
				}
			}
		}

		this.render();
	},

	render: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		for (var i = 0; i < this.candies.length; ++i) {
			var candy = this.candies[i];
			candy.render(this.context, this.blockSize);
		}

		this.snake.render(this.context, this.blockSize);

		if (this.snake.dead) {
			this.context.fillStyle = 'red';
			this.context.font = this.canvas.width/15 + 'px Courier New';
			this.context.fillText('Click to restart', this.canvas.width/6, this.canvas.height/3);
		}
	}
}