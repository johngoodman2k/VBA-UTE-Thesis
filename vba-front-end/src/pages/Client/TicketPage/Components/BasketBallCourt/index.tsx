import React from 'react';

export const BasketBallCourt = () => {
	return (
		<>
			<svg width='940' height='500'>
				<rect width='100%' height='100%' fill='#eac696' stroke='#5d5c63' stroke-width='2' />

				<line x1='50%' y1='0' x2='50%' y2='100%' stroke='#5d5c63' stroke-width='1' />
				<circle cx='50%' cy='50%' r='12%' fill='none' stroke='#5d5c63' stroke-width='1' />

				<line x1='0%' y1='6%' x2='14.89%' y2='6%' stroke='#5d5c63' stroke-width='1' />
				<line x1='0%' y1='94%' x2='14.89%' y2='94%' stroke='#5d5c63' stroke-width='1' />
				<path d='M 138.97 470.2 A 237.5 237.5 0 0 0 138.97 29.79' fill='none' stroke='#5d5c63' stroke-width='1.1' />

				<rect y='170' width='190' height='160' fill='#116cb6' stroke='#fff' stroke-width='1' />

				<line x1='40' y1='220' x2='40' y2='280' stroke='#b37336' stroke-width='1' />
				<circle cx='55' cy='250' r='15' fill='none' stroke='#b37336' stroke-width='1' />

				<path d='M 55 290 A 40 40 0 0 0 55 210' fill='none' stroke='#fff' stroke-width='1' />

				<path d='M 190 190 A 60 60 0 0 0 190 310' fill='none' stroke='#fff' stroke-width='1' stroke-dasharray='10,10' />
				<path d='M 190 310 A 60 60 0 0 0 190 190' fill='none' stroke='#fff' stroke-width='1' />

				<line x1='85.11%' y1='6%' x2='100%' y2='6%' stroke='#5d5c63' stroke-width='1' />
				<line x1='85.11%' y1='94%' x2='100%' y2='94%' stroke='#5d5c63' stroke-width='1' />
				<path d='M 801.03 29.79 A 237.5 237.5 0 0 0 801.03 470.21' fill='none' stroke='#5d5c63' stroke-width='1.1' />

				<rect x='750' y='170' width='190' height='160' fill='#116cb6' stroke='#fff' stroke-width='1' />

				<line x1='900' y1='220' x2='900' y2='280' stroke='#b37336' stroke-width='1' />
				<circle cx='885' cy='250' r='15' fill='none' stroke='#b37336' stroke-width='1' />

				<path d='M 885 210 A 40 40 0 0 0 885 290' fill='none' stroke='#fff' stroke-width='1' />

				<path d='M 750 310 A 60 60 0 0 0 750 190' fill='none' stroke='#fff' stroke-width='1' stroke-dasharray='10,10' />
				<path d='M 750 190 A 60 60 0 0 0 750 310' fill='none' stroke='#fff' stroke-width='1' />
			</svg>
		</>
	);
};
