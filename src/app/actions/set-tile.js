import { SET_TILE } from '../constants/constants';

export const setTile = (i, j) => ({
	type: SET_TILE,
	payload: {
		i,
		j
	}
});
