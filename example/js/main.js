(function () {
	var board = new Connect4Board();

	board.setCanvas("canvas-board");
	board.game = "R3434343";
	board.cursor.last();
	board.draw();
}());