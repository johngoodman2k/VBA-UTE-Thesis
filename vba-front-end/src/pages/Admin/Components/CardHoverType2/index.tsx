import React from 'react';
import './style.scss';
type CardHoverType2Props = {
	className: any;
	img: any;
	name: any;
	number: any;
};

const CardHoverType2 = (props: CardHoverType2Props) => {
	return (
		<>
			<div className='kzcard 1'>
				<div className={props.className}>
					<div className='kzcard_image'>
						<img src={props.img} alt='img' />
					</div>
					<div className='kzcard_title kztitle-traiot'>
						<p>{props.name}</p>
						{props.number}
					</div>
				</div>
			</div>
		</>
	);
};

export default CardHoverType2;
