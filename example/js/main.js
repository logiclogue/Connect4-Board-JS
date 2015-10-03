(function () {
	var board = new Connect4Board();

	board.setCanvas("board");
	board.game = "R333";
	board.cursor.last();
	board.draw();
}());