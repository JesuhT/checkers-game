$(document).ready(function () {
  const board = $('#board');
  let redPlayerFichas = 12;
  let blackPlayerFichas = 12;

  // Crea las casillas del tablero
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = $('<div class="cell"></div>');

      // Agrega atributos de datos para la fila y la columna
      cell.data('row', row);
      cell.data('col', col);

      if ((row + col) % 2 === 0) {
        cell.addClass('black');
      }
      board.append(cell);
    }
  }
  // Crea las fichas iniciales
  function createPiece(color) {
    return $('<div class="piece ' + color + '"></div>');
  }

  for (let i = 0; i < 4; i++) {
    $('.cell.black').eq(i).append(createPiece('blackpiece'));
    $('.cell.black').eq(i + 4).append(createPiece('blackpiece'));
    $('.cell.black').eq(i + 8).append(createPiece('blackpiece'));
    $('.cell.black').eq(20 + i).append(createPiece('red'));
    $('.cell.black').eq(24 + i).append(createPiece('red'));
    $('.cell.black').eq(28 + i).append(createPiece('red'));
  }

  // Lógica para el movimiento de fichas
  let currentPlayer = 'red';
  let selectedPiece = null;

  // CLic a las fichas
  $('.piece').on('click', function () {
    // Verificar si es el turno del jugador actual
    if ($(this).hasClass(currentPlayer)) {
      // Deseleccionar cualquier ficha previamente seleccionada
      if (selectedPiece) {
        selectedPiece.removeClass('selected');
        selectedPiece = null;
        // Eliminar elementos circulares de las casillas disponibles
        $('.highlight').remove();
      }

      // Marcar la ficha como seleccionada
      selectedPiece = $(this);
      lastpiece = selectedPiece;
      selectedPiece.addClass('selected');

      // Mostrar casillas disponibles
      showAvailableMoves(selectedPiece);
    }
  });
  // Función para mostrar casillas disponibles
  function showAvailableMoves(piece) {
    const $cell = piece.parent(); // Obtén la casilla que contiene la ficha
    const row = $cell.data('row'); // Obtiene el valor de data-row de la casilla
    const col = $cell.data('col'); // Obtiene el valor de data-col de la casilla
    const pieceColor = selectedPiece.hasClass('blackpiece') ? 'blackpiece' : 'red';//obtine e color de la casilla actual

    // Definir las posiciones de las casillas diagonales
    if (currentPlayer == 'blackpiece') {
      if (selectedPiece.hasClass('kingblack')) {
        const diagonalsblack = [
          { row: row - 1, col: col - 1 },//Enfrente izquierda
          { row: row - 1, col: col + 1 },//Enfrente derecha
          { row: row + 1, col: col - 1 },//enfrente izquierda
          { row: row + 1, col: col + 1 }//enfrente derecha
        ];
        for (const diagonal of diagonalsblack) {
          const diagonalCell = board.find('.cell').filter(function () {
            return $(this).data('row') === diagonal.row && $(this).data('col') === diagonal.col;
          });
          console.log(diagonalCell);
          const isSameColor = diagonalCell.children().hasClass(pieceColor);
          if (diagonalCell.length) {
            const isOccupied = diagonalCell.children().hasClass('piece');
            if (!isOccupied) {
              // Agregar un elemento circular para mostrar la casilla disponible
              diagonalCell.append('<div class="highlight" style="z-index:999;"></div>');
              console.log('no ocupado');
            } else if (!isSameColor) {
              // Si hay una ficha en la casilla diagonal, verifica la siguiente casilla en la misma dirección
              const nextRow = 2 * diagonal.row - row;
              const nextCol = 2 * diagonal.col - col;
              const nextCell = board.find('.cell').eq(nextRow * 8 + nextCol);
              if (nextCell.length && !nextCell.children().hasClass('piece')) {
                // Agrega un elemento circular para mostrar la casilla disponible para saltar
                if (nextCell.hasClass('black')) {
                  nextCell.append('<div class="highlight" style="z-index:999;"></div>');
                  console.log("deberia");
                }
              }
            }
          }
        }
      } else {
        const diagonalsblack = [
          { row: row + 1, col: col - 1 },//enfrente izquierda
          { row: row + 1, col: col + 1 }//enfrente derecha
        ];
        // Recorrer las casillas diagonales
        for (const diagonal of diagonalsblack) {

          // const cell = board.find('.cell').eq(diagonal.row * 8 + diagonal.col);
          const diagonalCell = board.find('.cell').filter(function () {
            return $(this).data('row') === diagonal.row && $(this).data('col') === diagonal.col;
          });
          console.log(diagonalCell);
          const isSameColor = diagonalCell.children().hasClass(pieceColor);
          if (diagonalCell.length) {
            const isOccupied = diagonalCell.children().hasClass('piece');
            if (!isOccupied) {
              // Agregar un elemento circular para mostrar la casilla disponible
              diagonalCell.append('<div class="highlight" style="z-index:999;"></div>');
              console.log('no ocupado');
            } else if (!isSameColor) {
              // Si hay una ficha en la casilla diagonal, verifica la siguiente casilla en la misma dirección
              const nextRow = 2 * diagonal.row - row;
              const nextCol = 2 * diagonal.col - col;
              const nextCell = board.find('.cell').eq(nextRow * 8 + nextCol);
              if (nextCell.length && !nextCell.children().hasClass('piece')) {
                // Agrega un elemento circular para mostrar la casilla disponible para saltar
                if (nextCell.hasClass('black')) {
                  nextCell.append('<div class="highlight" style="z-index:999;"></div>');
                  console.log("deberia");
                }
              }
            }
          }
        }
      }
    } else {
      if (selectedPiece.hasClass('king')) {
        const diagonalsred = [
          { row: row - 1, col: col - 1 },//Enfrente izquierda
          { row: row - 1, col: col + 1 },//Enfrente derecha
          { row: row + 1, col: col - 1 },//enfrente izquierda
          { row: row + 1, col: col + 1 }//enfrente derecha
        ];
        for (const diagonal of diagonalsred) {
          const diagonalCell = board.find('.cell').filter(function () {
            return $(this).data('row') === diagonal.row && $(this).data('col') === diagonal.col;
          });
          console.log(diagonalCell);
          const isSameColor = diagonalCell.children().hasClass(pieceColor);
          if (diagonalCell.length) {
            const isOccupied = diagonalCell.children().hasClass('piece');
            if (!isOccupied) {
              // Agregar un elemento circular para mostrar la casilla disponible
              diagonalCell.append('<div class="highlight" style="z-index:999;"></div>');
              console.log('no ocupado');
            } else if (!isSameColor) {
              // Si hay una ficha en la casilla diagonal, verifica la siguiente casilla en la misma dirección
              const nextRow = 2 * diagonal.row - row;
              const nextCol = 2 * diagonal.col - col;
              const nextCell = board.find('.cell').eq(nextRow * 8 + nextCol);
              if (nextCell.length && !nextCell.children().hasClass('piece')) {
                // Agrega un elemento circular para mostrar la casilla disponible para saltar
                if (nextCell.hasClass('black')) {
                  nextCell.append('<div class="highlight" style="z-index:999;"></div>');
                  console.log("deberia");
                }
              }
            }
          }
        }
      } else {
        const diagonalsred = [
          { row: row - 1, col: col - 1 },//Enfrente izquierda
          { row: row - 1, col: col + 1 },//Enfrente derecha
        ];

        // Recorrer las casillas diagonales
        for (const diagonal of diagonalsred) {
          const diagonalCell = board.find('.cell').filter(function () {
            return $(this).data('row') === diagonal.row && $(this).data('col') === diagonal.col;
          });
          console.log(diagonalCell);
          const isSameColor = diagonalCell.children().hasClass(pieceColor);
          if (diagonalCell.length) {
            const isOccupied = diagonalCell.children().hasClass('piece');
            if (!isOccupied) {
              // Agregar un elemento circular para mostrar la casilla disponible
              diagonalCell.append('<div class="highlight" style="z-index:999;"></div>');
              console.log('no ocupado');
            } else if (!isSameColor) {
              // Si hay una ficha en la casilla diagonal, verifica la siguiente casilla en la misma dirección
              const nextRow = 2 * diagonal.row - row;
              const nextCol = 2 * diagonal.col - col;
              const nextCell = board.find('.cell').eq(nextRow * 8 + nextCol);
              if (nextCell.length && !nextCell.children().hasClass('piece')) {
                // Agrega un elemento circular para mostrar la casilla disponible para saltar
                if (nextCell.hasClass('black')) {
                  nextCell.append('<div class="highlight" style="z-index:999;"></div>');
                  console.log("deberia");
                }
              }
            }
          }
        }
      }
    }
  }

  const mover = $("#move")[0];
  const promote = $("#promote")[0];
  const capture = $("#capture")[0];
  // Agregar evento de clic a las casillas disponibles

  board.on('click', '.cell', function () {
    const targetCell = $(this);
    //ficha saltada
    const sourceCell = selectedPiece.parent();
    const sourceRow = sourceCell.data('row');
    const sourceCol = sourceCell.data('col');
    const targetRow = targetCell.data('row');
    const targetCol = targetCell.data('col');
    const jumpedRow = (sourceRow + targetRow) / 2; // Fila de la casilla intermedia
    const jumpedCol = (sourceCol + targetCol) / 2; // Columna de la casilla intermedia

    // Buscar y eliminar la ficha intermedia
    const jumpedCell = board.find('.cell').filter(function () {
      return $(this).data('row') === jumpedRow && $(this).data('col') === jumpedCol;
    });
    //comprobar que si haya piezas
    if (jumpedCell.children().hasClass('piece')) {
      if ((selectedPiece.hasClass('red') && jumpedCell.children().hasClass('blackpiece')) || (selectedPiece.hasClass('blackpiece') && jumpedCell.children().hasClass('red'))) {
        //Comprobar que no sean los mismos antes
        if ($(this).children().hasClass('highlight')) {//Comprobar que si haya una highlight para matar
          const jumpedPiece = jumpedCell.find('.piece');
          capture.play();
          jumpedPiece.remove();
          // Después de eliminar una ficha del tablero
          if (selectedPiece.hasClass('red')) {
            blackPlayerFichas--; // Decrementa el contador de fichas negras
            checkForWinner();
          } else if (selectedPiece.hasClass('blackpiece')) {
            redPlayerFichas--; // Decrementa el contador de fichas rojas
            checkForWinner();
          }

          console.log('Condición cumplida');
        }
      } else {
        console.log('Condición no cumplida');
      }
    }
    if ($(this).children().hasClass('highlight')) {
      // Mover la ficha seleccionada a la casilla disponible
      targetCell.append(selectedPiece);
      // Reproduce el sonido

      mover.play();
      if (selectedPiece.hasClass('red')) {
        if (targetRow === 0 && !selectedPiece.hasClass('king')) {
          promote.play();
          selectedPiece.addClass('king');
        }
      } else {
        if (targetRow === 7 && !selectedPiece.hasClass('kingblack')) {
          selectedPiece.addClass('kingblack');
          promote.play();
        }
      }
      // Deseleccionar la ficha
      selectedPiece.removeClass('selected');
      selectedPiece = null;
      //Buscar la ficha intermedia
      // Cambiar el turno del jugador
      currentPlayer = currentPlayer === 'blackpiece' ? 'red' : 'blackpiece';
      // Eliminar elementos circulares de las casillas disponibles
      $('.highlight').remove();
    }
  });
  const main=$('#main');
  function checkForWinner() {
    if (redPlayerFichas ) {
      // El jugador negro ha ganado
      const gameOverMessage = $('<div class="game-over"><div class="box-reset">¡El jugador <span style="color: #3e4147;" > negro</span> ha ganado! Haga clic en reiniciar para jugar de nuevo.<div id="restart-button">Reiniciar</div></div></div>');
      $('body').append(gameOverMessage);
      const reset = main.find('#restart-button');
      reset.on('click', function () {
        console.log("click en reset");
        var evento = new Event('nombreDelEvento');
        window.dispatchEvent(evento);
        location.reload();
      });
    } else if (blackPlayerFichas ) {
      // El jugador rojo ha ganado
      const gameOverMessage = $('<div class="game-over"><div class="box-reset">¡El jugador <span style="color:red;"> rojo</span> ha ganado! Haga clic en reiniciar para jugar de nuevo.<br><div id="restart-button">Reiniciar</div></div></div>');
      const reset = main.find('#restart-button');
      $('body').append(gameOverMessage);
      reset.on('click', function () {
        console.log("click en reset");
        var evento = new Event('nombreDelEvento');
        window.dispatchEvent(evento);
        location.reload();
      });
    }
  }
  


});
