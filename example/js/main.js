(function () {
	var board = new Connect4Board();

	board.setCanvas("board");
	board.game = "R3434343";
	board.cursor.last();
	board.draw();
}());