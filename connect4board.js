var Connect4Board = function() {
	var mod = {};


	var c, ctx, width, height, scale, contents = [];

	for (var x = 0; x < 7; x++) {
		contents[x] = [];
	}

	mod.game = "";
	mod.cursor = 0;
	mod.flip = false;
	mod.input = false;
	mod.slot = 7;
	mod.winner = 0;


	// colours
	var col = {
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
	
	// easier to draw circles
	var drawCircle = function(centreX, centreY, radius, colourFill, colourLine) {
		ctx.beginPath();
		ctx.arc(centreX, centreY, radius, 0, 2*Math.PI, false);
		ctx.fillStyle = colourFill;
		ctx.fill();
		ctx.lineWidth = width/100;
		ctx.strokeStyle = colourLine;
		ctx.stroke();
	};

	// updates the contents array
	var update = function() {
		var colour, colour1, colour2;

		for (var x = 0; x < 7; x++) {
			contents[x] = [];
		}

		if (mod.game.substring(0, 1) == "Y") {
			colour1 = "R";
			colour2 = "Y";
		} else {
			colour1 = "Y";
			colour2 = "R";
		}

		for (var i = 1; i < mod.cursor.pos+1; i++) {
			if (i % 2 == 0) colour = colour1;
			else colour = colour2;

			// select last piece placed
			if (i == mod.cursor.pos) colour += "s";

			var num = parseInt(mod.game.substring(i, i+1));
			contents[num].push(colour);
		}
	};
	
	var fillContents = function() {
		for (var x = 0; x < 7; x++) {
			for (var y = 0; y < 6; y++) {
				if (contents[x][y] == undefined) contents[x][y] = "  ";
			}
		}
	};

	// checks to see if there is a connect 4
	var checkWin = function(col) {
		// check horizontal
		for (var x = 0; x < 4; x++) {
			for (var y = 0; y < 6; y++) {
				if (contents[x][y].substring(0, 1) == col && contents[x+1][y].substring(0, 1) == col && contents[x+2][y].substring(0, 1) == col && contents[x+3][y].substring(0, 1) == col) {
					contents[x][y] += "s";
					contents[x+1][y] += "s";
					contents[x+2][y] += "s";
					contents[x+3][y] += "s";

					if (col == mod.game.substring(0, 1)) mod.winner = 1;
					else mod.winner = 2;
				}
			}
		}
		// check / diagonal
		for (var x = 0; x < 4; x++) {
			for (var y = 0; y < 3; y++) {
				if (contents[x][y].substring(0, 1) == col && contents[x+1][y+1].substring(0, 1) == col && contents[x+2][y+2].substring(0, 1) == col && contents[x+3][y+3].substring(0, 1) == col) {
					contents[x][y] += "s";
					contents[x+1][y+1] += "s";
					contents[x+2][y+2] += "s";
					contents[x+3][y+3] += "s";

					if (col == mod.game.substring(0, 1)) mod.winner = 1;
					else mod.winner = 2;

				}
			}
		}
		// check \ diagonal
		for (var x = 3; x < 7; x++) {
			for (var y = 0; y < 3; y++) {
				if (contents[x][y].substring(0, 1) == col && contents[x-1][y+1].substring(0, 1) == col && contents[x-2][y+2].substring(0, 1) == col && contents[x-3][y+3].substring(0, 1) == col) {
					contents[x][y] += "s";
					contents[x-1][y+1] += "s";
					contents[x-2][y+2] += "s";
					contents[x-3][y+3] += "s";

					if (col == mod.game.substring(0, 1)) mod.winner = 1;
					else mod.winner = 2;

				}
			}
		}
		// check vertical
		for (var x = 0; x < 7; x++) {
			for (var y = 0; y < 3; y++) {
				if (contents[x][y].substring(0, 1) == col && contents[x][y+1].substring(0, 1) == col && contents[x][y+2].substring(0, 1) == col && contents[x][y+3].substring(0, 1) == col) {
					contents[x][y] += "s";
					contents[x][y+1] += "s";
					contents[x][y+2] += "s";
					contents[x][y+3] += "s";

					if (col == mod.game.substring(0, 1)) mod.winner = 1;
					else mod.winner = 2;

				}
			}
		}

	};

	function click(e) {
		var rect = c.getBoundingClientRect();
		var x = e.clientX - rect.left;
		var y = e.clientY - rect.top;
		var slot = Math.floor((x / (rect.right - rect.left)) * 7);
		var colour1, colour2;

		if (mod.flip) mod.slot = 6-slot;
		else mod.slot = slot;

		if (!mod.input || contents[mod.slot][5] != "  ") mod.slot = slot = 7;

		if (mod.input) mod.draw();
	}

	


	// public methods
	mod.setCanvas = function(canvas) {
		c = document.getElementById(canvas);
		ctx = c.getContext("2d");
		width = c.width;
		height = c.height;
	
		c.addEventListener("mousemove", click);
	};

	// cursor position when playing back a game
	mod.cursor = function() {
		var mod_0 = {};

		
		mod_0.pos = 0;

		// cursor step forward
		mod_0.next = function() {
			if (mod_0.pos != mod.game.length - 1) mod_0.pos++;
		};

		// cursor step backward
		mod_0.back = function() {
			if (mod_0.pos != 0) mod_0.pos--;
		};

		// cursor jump to first
		mod_0.first = function() {
			mod_0.pos = 0;
		};

		// cursor jump to last
		mod_0.last = function() {
			mod_0.pos = mod.game.length - 1;
		};


		return mod_0;
	}();

	mod.draw = function() {
		update();
		fillContents();
		checkWin("R");
		checkWin("Y");

		ctx.clearRect(0, 0, width, height);
		// draw background
		ctx.fillStyle = col.blue;
		ctx.fillRect(0, height/7, width, (height/7)*6);
		
		var colour1, colour2, xt, yt;

		for (var x = 0; x < 7; x++) {
			for (var y = 0; y < 6; y++) {
				if (contents[x][y].substring(0, 1) == "R") { colour1 = col.red; colour2 = col.light_red; }
				else if (contents[x][y].substring(0, 1) == "Y") { colour1 = col.yellow; colour2 = col.light_yellow; }
				else { colour1 = col.white; colour2 = col.white; }

				yt = 5-y;
				if (mod.flip) xt = 6-x;
				else xt = x;

				drawCircle((width/7)*(xt+0.5), (height/7)*(yt+1.5), width/20, colour1, colour2);

				if (contents[x][y].substring(1, 2) == "s") drawCircle((width/7)*(xt+0.5), (height/7)*(yt+1.5), width/200, col.black, col.black);
			
				if ((mod.game.length % 2 == 0 && mod.game.substring(0, 1) == "R") || (mod.game.length % 2 != 0 && mod.game.substring(0, 1) == "Y")) { colour1 = col.yellow; colour2 = col.light_yellow; }
				else { colour1 = col.red; colour2 = col.light_red; }
				
				if (x == mod.slot && contents[x][5] == "  " && mod.input) drawCircle((width/7)*(xt+0.5), (height/7)*0.5, width/20, colour1, colour2);
			}
		}
	};


	return mod;
}