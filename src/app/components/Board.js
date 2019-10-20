import React from 'react';
import Tile from './Tile';
import Status from './Status';
import { Columns } from 'react-bulma-components';

const Board = () => {
		let board = [ ...Array(3).keys() ].map((i) => {
			const row = [ ...Array(3).keys() ].map((j) => {
				return (
					<Columns.Column size="one-third" key={j}>
						<Tile position={{ i, j }} />
					</Columns.Column>
				);
			});
			return <Columns key={i}>{row}</Columns>;
		});
		return (
			<div>
				{board}
				<Columns>
					<Status />
				</Columns>
			</div>
		);
	}


export default Board;
