var Connect4Board = function() {
	var self = this;


	var c,
		ctx,
		width,
		height,
		scale,
		board = [],
		col = {
			blue: "#4A89DC",
			green: "#8CC152",
			red: "#E9573F",
			yellow: "#F6BB42",
			white: "#FFFFFF",
			black: "#434A54",
			light_yellow: "#FFCE54",
			light_red: "#FC6E51",
			light_green: "#A0D468",
			light_blue: "#5D9CEC"
		};

	self.game = "";
	self.cursor = 0;
	self.flip = false;
	self.input = false;
	self.slot = 7;
	self.winner = 0;

	// make board a multidimentional array
	for (var x = 0; x < 7; x++) {
		board[x] = [];
	}
	
	
	// easier to draw circles
	var drawCircle = function (centreX, centreY, radius, colourFill, colourLine) {
		ctx.beginPath();
		ctx.arc(centreX, centreY, radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = colourFill;
		ctx.fill();
		ctx.lineWidth = width/100;
		ctx.strokeStyle = colourLine;
		ctx.stroke();
	};

	// updates the board array
	var update = function () {
		var colour,
			colour1,
			colour2,
			num;

		// reset board array
		for (var x = 0; x < 7; x++) {
			board[x] = [];
		}

		// find out starting colour
		if (self.game[0] === "Y") {
			colour1 = "R";
			colour2 = "Y";
		}
		else {
			colour1 = "Y";
			colour2 = "R";
		}

		// loop through game string
		for (var i = 1, max = self.cursor.pos; i <= max; i += 1) {
			// find out current colour
			if (i % 2 === 0) {
				colour = colour1;
			}
			else {
				colour = colour2;
			}

			// select last piece
			if (i === self.cursor.pos) {
				colour += "s";
			}

			// place the piece colour in the board array
			num = parseInt(self.game[i]);
			board[num].push(colour);
		}
	};
	
	var fillBoard = function () {
		for (var x = 0; x < 7; x++) {
			for (var y = 0; y < 6; y++) {
				// fill in undefined gaps
				if (board[x][y] === undefined) {
					board[x][y] = "  ";
				}
			}
		}
	};

	// check to see if there is a four in a row
	var checkWin = function (col) {
		// check horizontal
		for (var x = 0; x < 4; x += 1) {
			for (var y = 0; y < 6; y += 1) {
				if (board[x][y][0] === col && board[x+1][y][0] === col && board[x+2][y][0] === col && board[x+3][y][0] === col) {
					// select connected pieces
					board[x][y] += "s";
					board[x+1][y] += "s";
					board[x+2][y] += "s";
					board[x+3][y] += "s";

					// select winner
					if (col === self.game[0]) {
						self.winner = 1;
					}
					else {
						self.winner = 2;
					}
				}
			}
		}
		// check / diagonal
		for (var x = 0; x < 4; x += 1) {
			for (var y = 0; y < 3; y += 1) {
				if (board[x][y][0] === col && board[x+1][y+1][0] === col && board[x+2][y+2][0] === col && board[x+3][y+3][0] === col) {
					// select connected pieces
					board[x][y] += "s";
					board[x+1][y+1] += "s";
					board[x+2][y+2] += "s";
					board[x+3][y+3] += "s";

					// select winner
					if (col == self.game[0]) {
						self.winner = 1;
					}
					else {
						self.winner = 2;
					}
				}
			}
		}
		// check \ diagonal
		for (var x = 3; x < 7; x += 1) {
			for (var y = 0; y < 3; y += 1) {
				if (board[x][y][0] === col && board[x-1][y+1][0] === col && board[x-2][y+2][0] === col && board[x-3][y+3][0] === col) {
					// select connected pieces
					board[x][y] += "s";
					board[x-1][y+1] += "s";
					board[x-2][y+2] += "s";
					board[x-3][y+3] += "s";

					// select winner
					if (col === self.game[0]) {
						self.winner = 1;
					}
					else {
						self.winner = 2;
					}
				}
			}
		}
		// check vertical
		for (var x = 0; x < 7; x += 1) {
			for (var y = 0; y < 3; y += 1) {
				if (board[x][y][0] === col && board[x][y+1][0] === col && board[x][y+2][0] === col && board[x][y+3][0] === col) {
					// select connected pieces
					board[x][y] += "s";
					board[x][y+1] += "s";
					board[x][y+2] += "s";
					board[x][y+3] += "s";

					// select winner
					if (col === self.game[0]) {
						self.winner = 1;
					}
					else {
						self.winner = 2;
					}
				}
			}
		}

	};

	var click = function (e) {
		var rect = c.getBoundingClientRect(),
			x = e.clientX - rect.left,
			y = e.clientY - rect.top,
			slot = Math.floor((x / (rect.right - rect.left)) * 7),
			colour1,
			colour2;

		if (self.flip) {
			self.slot = 6 - slot;
		}
		else {
			self.slot = slot;
		}

		if (!self.input || board[self.slot][5] !== "  ") {
			self.slot = slot = 7;
		}

		if (self.input) {
			self.draw();
		}
	}

	


	// public methods

	// assigns canvas
	self.setCanvas = function (canvas) {
		c = document.getElementById(canvas);
		ctx = c.getContext("2d");
		width = c.width;
		height = c.height;
	
		c.addEventListener("mousemove", click);
	};

	// cursor position when playing back a game
	self.cursor = (function () {
		var mod = {};

		
		mod.pos = 0;

		// cursor step forward
		mod.next = function () {
			if (mod.pos !== self.game.length - 1) {
				mod.pos += 1;
			}
		};

		// cursor step backward
		mod.back = function () {
			if (mod.pos !== 0) {
				mod.pos -= 1;
			}
		};

		// cursor jump to first
		mod.first = function () {
			mod.pos = 0;
		};

		// cursor jump to last
		mod.last = function () {
			mod.pos = self.game.length - 1;
		};


		return mod;
	}());

	self.draw = function () {
		var colour1,
			colour2,
			xt,
			yt;

		// refill board then check win
		update();
		fillBoard();
		checkWin("R");
		checkWin("Y");

		// clear the canvas
		ctx.clearRect(0, 0, width, height);
		// draw background
		ctx.fillStyle = col.blue;
		ctx.fillRect(0, height/7, width, (height/7)*6);

		for (var x = 0; x < 7; x++) {
			for (var y = 0; y < 6; y++) {
				if (board[x][y][0] === "R") {
					colour1 = col.red;
					colour2 = col.light_red;
				}
				else if (board[x][y][0] == "Y") {
					colour1 = col.yellow;
					colour2 = col.light_yellow;
				}
				else {
					colour1 = col.white;
					colour2 = col.white;
				}

				yt = 5 - y;
				if (self.flip) {
					xt = 6 - x;
				}
				else {
					xt = x
				};

				drawCircle((width / 7) * (xt + 0.5), (height / 7) * (yt + 1.5), width / 20, colour1, colour2);

				if (board[x][y][1] === "s") {
					drawCircle((width / 7) * (xt + 0.5), (height / 7) * (yt + 1.5), width / 200, col.black, col.black);
				}
			
				if ((self.game.length % 2 === 0 && self.game[0] === "R") || (self.game.length % 2 !== 0 && self.game[0] === "Y")) {
					colour1 = col.yellow;
					colour2 = col.light_yellow;
				}
				else {
					colour1 = col.red;
					colour2 = col.light_red;
				}
				
				if (x === self.slot && board[x][5] === "  " && self.input) {
					drawCircle((width / 7) * (xt + 0.5), (height / 7) * 0.5, width / 20, colour1, colour2);
				}
			}
		}
	};

}