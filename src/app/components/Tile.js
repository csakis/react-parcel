import React from 'react';
import { connect } from 'react-redux';
import { setTile } from '../actions/set-tile';
import { scoreBoard } from '../actions/score-board';
import { Card } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSquare, faCircle  } from '@fortawesome/free-solid-svg-icons'

import './Tile.css';

const Tile = (props) => {
	let icon = null;
	const value = props.board[props.i][props.j];
	switch (value) {
		case -1:
			icon = <FontAwesomeIcon icon={faTimes}  className="has-text-success"/>;
			break;
		case 0:
			icon = <FontAwesomeIcon icon={faSquare}  className='has-text-white'/>;
			break;
		case 1:
			icon = <FontAwesomeIcon icon={faCircle}  className="has-text-danger"/>;
			break;
		default:
			icon = <FontAwesomeIcon icon={faSquare} className='has-text-white'/>;
			break;
	}

	return (
		<Card onClick={() => props.onSetTile(props.i, props.j)}>
			<Card.Content className="has-text-centered">
				{icon}
			</Card.Content>
		</Card>
	);
};
const mapStateToProps = (state, ownProps) => {
	return {
		board: state.board.board,
		i: ownProps.position.i,
		j: ownProps.position.j
	};
};

const mapActionsToProps = (dispatch) => {
	return {
		onSetTile: (i, j) => {
			dispatch(setTile(i, j));
			dispatch(scoreBoard())
		}
	};
};

export default connect(mapStateToProps, mapActionsToProps)(Tile);
