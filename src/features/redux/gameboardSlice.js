import { createSlice } from '@reduxjs/toolkit'

const _evaluateBoard = (squares) => {
    for (let i = 0; i < 3; i++) {//check columns
        if (squares[i] && squares[i] === squares[i + 3] && squares[i] === squares[i + 6]) {
            return 'winner';
        }
    }
    for (let i = 0; i < 7; i += 3) { //check rows
        if (squares[i] && squares[i] === squares[i + 1] && squares[i] === squares[i + 2]) {
            return 'winner';
        }
    }
    if (squares[4]) { //check diagonals
        if (squares[4] === squares[0] && squares[4] === squares[8]) {
            return 'winner';
        } else if (squares[4] === squares[2] && squares[4] === squares[6]) {
            return 'winner'
        }
    }
    if (squares.every(square => square)) { //check draw
        return 'draw';
    }
    return null;
}


const gameboardSlice = createSlice({
    name: 'gameboard',
    initialState: {
        currentTurn: [],
        squares: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
        ],
        winner: null
    },
    reducers: {
        assignSquare: (state, action) => {
            if (state.squares[action.payload] || state.winner) {
                return;
            } else {
                if (state.currentTurn[state.currentTurn.length - 1] === 'X' || !state.currentTurn.length) {
                    state.squares[action.payload] = 'X';
                    state.currentTurn.push('O');
                } else {
                    state.squares[action.payload] = 'O';
                    state.currentTurn.push('X');
                }
            }

            switch (_evaluateBoard(state.squares)) {
                case 'winner':
                    state.winner = (state.currentTurn[state.currentTurn.length - 2]);
                    break;
                case 'draw':
                    state.winner = 'draw'
                    break;
                default: 
                    state.winner = null
            }   

        },
        resetBoard: (state) => {
            state.squares.fill(null);
            state.winner = null;
            state.currentTurn = [];
        }
    }
})

export const { assignSquare, resetBoard } = gameboardSlice.actions;

export default gameboardSlice.reducer;