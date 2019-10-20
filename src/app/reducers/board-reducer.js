import { SET_TILE, SCORE_BOARD, RESET_GAME } from '../constants/constants';

const defaultState = {
	board: [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ],
	count: 0,
	winner: 0
};

export const boardReducer = (state = defaultState, { type, payload }) => {
	switch (type) {
		case SET_TILE: {
			const { i, j } = payload;
			const tempBoard = [ ...state.board ];
			let tempCount = state.count;
			if (state.count < 9 && state.winner === 0 && state.board[i][j] === 0) {
				tempBoard[i][j] = state.count % 2 === 0 ? 1 : -1;
				tempCount += 1;
			}
			return {
				...state,
				board: tempBoard,
				count: tempCount
			};
		}
		case SCORE_BOARD: {
			const b = [ ...state.board ];
			let winner = 0;
			[ ...Array(3).keys() ].map((i) => {
				let res1, res2, res3, res4;
				res1 = b[i][0] + b[i][1] + b[i][2];
				res2 = b[0][i] + b[1][i] + b[2][i];
				if (i === 0) {
					res3 = b[0][0] + b[1][1] + b[2][2];
					res4 = b[0][2] + b[1][1] + b[2][0];
				}
				if (res1 === 3 || res2 === 3 || res3 === 3 || res4 === 3) {
					winner = 1;
				}
				if (res1 === -3 || res2 === -3 || res3 === -3 || res4 === -3) {
					winner = -1;
				}
				return winner;
			});
			return {
				...state,
				winner
			};
		}
		case RESET_GAME: {
			return {
				...state,
				board: [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ],
				winner: 0,
				count: 0
			};
		}
		default:
			return { ...state };
	}
};
