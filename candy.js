function Candy(x, y) {
	this.x = x || 0;
	this.y = y || 0;

	return this;
}

Candy.prototype = {
	findNewSpot: function(boardWidth, boardHeight, excludedBlocks) {
		this.x = randomIntBetween(0, boardWidth-1);
		this.y = randomIntBetween(0, boardHeight-1);

		for (var i = 0; i < excludedBlocks.length; ++i) {
			var block = excludedBlocks[i];
			if (this.x === block.x && this.y === block.y) {
				this.findNewSpot(boardWidth, boardHeight, excludedBlocks);
			}
		}

		return this;
	},

	render: function(context, blockSize) {
		context.fillStyle = 'yellow';
		context.fillRect(this.x * blockSize, this.y * blockSize, blockSize, blockSize);
	}
}