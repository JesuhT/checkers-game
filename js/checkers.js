$(document).ready(function () {
    const board = $('#board');

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

    for (let i = 0; i < 12; i++) {
        if (i < 4) {
            $('.cell.black').eq(i).append(createPiece('blackpiece'));
            $('.cell.black').eq(i + 4).append(createPiece('blackpiece'));
            $('.cell.black').eq(i + 8).append(createPiece('blackpiece'));
            $('.cell.black').eq(20 + i).append(createPiece('red'));
            $('.cell.black').eq(24 + i).append(createPiece('red'));
            $('.cell.black').eq(28 + i).append(createPiece('red'));


        }
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
            selectedPiece.addClass('selected');

            // Mostrar casillas disponibles
            showAvailableMoves(selectedPiece);
        }

    });
    var jumped = 0;
    // Función para mostrar casillas disponibles
    function showAvailableMoves(piece) {
        const $cell = piece.parent(); // Obtén la casilla que contiene la ficha
        const row = $cell.data('row'); // Obtiene el valor de data-row de la casilla
        const col = $cell.data('col'); // Obtiene el valor de data-col de la casilla

        // Definir las posiciones de las casillas diagonales
        if (currentPlayer == 'blackpiece') {
            const diagonalsblack = [

                { row: row + 1, col: col - 1 },//enfrente izquierda

                { row: row + 1, col: col + 1 }//enfrente derecha
            ];

            // Recorrer las casillas diagonales
            for (const diagonal of diagonalsblack) {
                const cell = board.find('.cell').eq(diagonal.row * 8 + diagonal.col);

                // Verificar si la casilla es válida y está vacía
                if (cell.length && !cell.children().hasClass('piece')) {
                    // Agregar un elemento circular para mostrar la casilla disponible

                    cell.append('<div class="highlight" style="z-index:999;"></div>');
                } else if (cell.length) {
                    // Si hay una ficha en la casilla diagonal, verifica la siguiente casilla en la misma dirección
                    const nextRow = 2 * diagonal.row - row;
                    const nextCol = 2 * diagonal.col - col;
                    const nextCell = board.find('.cell').eq(nextRow * 8 + nextCol);

                    if (nextCell.length && !nextCell.children().hasClass('piece')) {
                        // Agrega un elemento circular para mostrar la casilla disponible para saltar
                        jumped = 1;
                        nextCell.append('<div class="highlight" style="z-index:999;"></div>');
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
                const cell = board.find('.cell').eq(diagonal.row * 8 + diagonal.col);

                // Verificar si la casilla es válida y está vacía
                if (cell.length && !cell.children().hasClass('piece')) {
                    // Agregar un elemento circular para mostrar la casilla disponible

                    cell.append('<div class="highlight" style="z-index:999;"></div>');
                } else if (cell.length) {
                    // Si hay una ficha en la casilla diagonal, verifica la siguiente casilla en la misma dirección
                    const nextRow = 2 * diagonal.row - row;
                    const nextCol = 2 * diagonal.col - col;
                    const nextCell = board.find('.cell').eq(nextRow * 8 + nextCol);

                    if (nextCell.length && !nextCell.children().hasClass('piece')) {
                        // Agrega un elemento circular para mostrar la casilla disponible para saltar
                        jumped = 1;
                        nextCell.append('<div class="highlight" style="z-index:999;"></div>');
                    }
                }

            }
        }

        console.log(diagonals);


    }

    // Agregar evento de clic a las casillas disponibles

    board.on('click', '.cell', function () {
        if ($(this).children().hasClass('highlight')) {
            // Mover la ficha seleccionada a la casilla disponible
            const targetCell = $(this);


            // Obtener las coordenadas de la casilla intermedia
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

            if (jumpedCell.children().hasClass('piece')) {
                const jumpedPiece = jumpedCell.find('.piece');
                jumpedPiece.remove();
            }

            //mover ficha
            targetCell.append(selectedPiece);

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
});
