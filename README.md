# Connect4Board.js

Embed a Connect 4 Board on your website with a few lines of code!


HTML:
```HTML
<canvas id="canvas-board" width="500" height="500"></canvas>

<script src="connect4board.js"></script>
<script src="main.js"></script>
```

main.js:
```JavaScript
var board = new Connect4Board();

board.setCanvas("canvas-board");
board.game = "R3434343";
board.cursor.last();
board.draw();
```