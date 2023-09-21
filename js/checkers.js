$(document).ready(function () {
    const board = $('#board');

    // Crea las casillas del tablero
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const cell = $('<div class="cell"></div>');
            if ((i + j) % 2 === 0) {
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
            $('.cell.black').eq(28 + i).append(createPiece('red'));
            $('.cell.black').eq(i + 4).append(createPiece('blackpiece'));
            $('.cell.black').eq(24 + i).append(createPiece('red'));
        }
    }

    // Lógica para el movimiento de fichas
    let currentPlayer = 'blackpiece';
    let selectedPiece = null;

    // Agregar evento de clic a las fichas
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

    // Función para mostrar casillas disponibles
    function showAvailableMoves(piece) {
        const row = piece.parent().index();
        const col = piece.parent().index();

        // Definir las posiciones de las casillas diagonales
        const diagonals = [
            { row: row , col: col },
            { row: row , col: col },
            { row: row , col: col },
            { row: row , col: col }
        ];
        console.log(diagonals);

        // Recorrer las casillas diagonales
        for (const diagonal of diagonals) {
            const cell = board.find('.cell').eq(diagonal.row * 8 + diagonal.col);

            // Verificar si la casilla es válida y está vacía
            if (cell.length && !cell.children().hasClass('piece')) {
                // Agregar un elemento circular para mostrar la casilla disponible
                cell.append('<div class="highlight" style="z-index:999;"></div>');
            }
        }
    }

    // Agregar evento de clic a las casillas disponibles
    if($('.piece').hasClass(currentPlayer)){
        
    }
    board.on('click', '.highlight', function () {
        // Mover la ficha seleccionada a la casilla disponible
        const targetCell = $(this).parent();
        targetCell.append(selectedPiece);
        // Eliminar elementos circulares de las casillas disponibles
        $('.available').remove();
        // Deseleccionar la ficha
        selectedPiece.removeClass('selected');
        selectedPiece = null;

        // Cambiar el turno del jugador
        currentPlayer = currentPlayer === 'blackpiece' ? 'red' : 'blackpiece';
    });
});
