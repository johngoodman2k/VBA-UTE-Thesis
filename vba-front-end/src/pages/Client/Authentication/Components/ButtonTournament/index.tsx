import React from 'react';
import './buttonTournament.scss';
type ButtonTournamentProps = {
	onClick?: () => void;
	type: 'button' | 'submit' | 'reset' | undefined;
	name: string;
	style?: React.CSSProperties;
};
export default function ButtonTournament(props: ButtonTournamentProps) {
	return (
		
			<div style={props.style} className='buttonTournament-block'>
				<button type={props.type} className='buttonTournament' onClick={props.onClick}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					{props.name}
				</button>
			</div>
	
	);
}
