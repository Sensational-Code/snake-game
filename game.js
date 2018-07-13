function SnakeGame() {
	this.board = new Gameboard();
	this.board.x = this.board.blockSize;
	this.board.y = this.board.blockSize * 2;

	this.snake = new Snake(this.board.width/2 - 1, this.board.height/2 - 1, this.board);
	this.candies = [new Candy(0, 0, this.board).findNewSpot(this.snake.blocks)];

	this.highScore = JSON.parse(localStorage.getItem('high-score')) || 0;

	this.canvas = document.createElement('canvas');
	this.canvas.width = (this.board.width+2) * this.board.blockSize;
	this.canvas.height = (this.board.height+3) * this.board.blockSize;
	this.context = this.canvas.getContext('2d');

	return this;
}

SnakeGame.prototype = {
	init: function() {
		setInterval(this.update.bind(this), 80);
		document.body.appendChild(this.canvas);
		this.addListeners();
	},

	addListeners: function() {
		window.addEventListener('keydown', this.handleKeyDown.bind(this));
		this.canvas.addEventListener('click', this.handleClick.bind(this));
	},

	handleKeyDown: function(event) {
		this.snake.newDirection = {
			37: -1, // left arrow
			39: 1, // right arrow
			38: -2, // up arrow
			40: 2 // down arrow
		}[event.keyCode] || this.snake.newDirection;

		// Make spacebar reset the game as a shortcut
		if (event.keyCode === 32 && this.snake.dead) {
				this.reset();
		}
		console.log(this.snake.direction);
	},

	handleClick: function(event) {
		if (this.snake.dead) {
			this.reset();
		}
	},

	reset: function() {
		this.snake = new Snake(this.board.width/2 - 1, this.board.height/2 - 1, this.board);
		this.candies = [new Candy(0, 0, this.board).findNewSpot(this.snake.blocks)];
	},

	updateHighScore: function() {
		if (this.snake.length-1 > this.highScore) {
			this.highScore = this.snake.length-1;
			localStorage.setItem('high-score', JSON.stringify(this.highScore));
		}
	},

	update: function() {
		if (!this.snake.dead) {
			this.snake.update();

			for (var i = 0; i < this.candies.length; ++i) {
				var candy = this.candies[i];
				if (this.snake.blocks[0].x === candy.x && this.snake.blocks[0].y === candy.y) {
					this.snake.length += 1;
					this.updateHighScore();
					candy.findNewSpot(this.snake.blocks);
				}
			}
		}

		this.render();
	},

	renderScores: function(context) {
		var blockSize = this.board.blockSize;

		context.fillStyle = '#FFFFFF';
		context.font = 'bold ' + (blockSize*1.1) + 'px Courier New';
		context.fillText('High Score: ' + this.highScore, blockSize, blockSize*1.3);

		// Make sure the score text is one block from the right no matter how high the score is
		var scoreText = 'Score: ' + (this.snake.length-1);
		var scoreWidth = context.measureText(scoreText).width;
		context.fillText(scoreText, context.canvas.width - scoreWidth - blockSize, blockSize*1.3);
	},

	render: function() {
		this.context.fillStyle = '#91A6FF';
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.board.render(this.context);

		for (var i = 0; i < this.candies.length; ++i) {
			var candy = this.candies[i];
			candy.render(this.context);
		}

		this.snake.render(this.context);
		this.renderScores(this.context);

		if (this.snake.dead) {
			this.context.fillStyle = '#EA9010';
			this.context.font = 'bold ' + this.canvas.width/15 + 'px Courier New';
			this.context.fillText('Click to restart', this.canvas.width/6, this.canvas.height/3);
		}
	}
}