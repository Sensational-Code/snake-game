function Snake() {
	this.head = {};
	this.head.x = 0;
	this.head.y = 0;
	this.head.direction = 0; // 0: stop, -1: left, 1: right, -2: up, 2: down

	this.blocks = [];

	return this;
}

Snake.prototype = {
	update: function() {

		if (Math.abs(this.head.direction) === 1) {
			this.head.x += this.head.direction * 10;
		}
		else if (Math.abs(this.head.direction) === 2) {
			this.head.y += (this.head.direction/2) * 10;
		}

	},

	render: function(context, blockSize) {
		context.fillRect(this.head.x, this.head.y, blockSize, blockSize);
	}
}