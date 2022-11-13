import React, { useState, useEffect } from 'react';
import './style.scss';

import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import PieChart from '../Common/PieChart';
// import Preload from '../Common/Preload';
import { PostCard } from '../Components/PostCard';
import CardHoverType2 from '../Components/CardHoverType2';
import classNames from 'classnames/bind';
import styles from './dashBoard.module.scss';

const cx = classNames.bind(styles);
const CardHover = styled(CardHoverType2)`
	height: auto;
	width: 300px;
	border-radius: 5px;
	color: blue;
	background: linear-gradient(
			217deg,
			rgba(255, 0, 0, 0.8),
			rgba(255, 0, 0, 0) 70.71%
		),
		linear-gradient(127deg, rgba(0, 255, 0, 0.8), rgba(0, 255, 0, 0) 70.71%),
		linear-gradient(336deg, rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0) 70.71%);
`;

const Dashboard = () => {
	const [STATISTIC, setSTATISTIC] = useState({
		users: 0,
		videomusic: 0,
		song: 0,
		post: 0
	});
	const [POST, setPOST] = useState([]);
	const [loading, setLoading] = useState(false);
	const [completed, setCompleted] = useState(false);

	// useEffect(() => {
	//     setTimeout(() =>{
	//         (async () => {
	//             const res = await getStatisticApi();

	//             setSTATISTIC(res)
	//             const resPost = await getPostHipHopTopDayApi({page: 1, limit: 4});
	//             console.log(resPost)
	//             setPOST(resPost.post)

	//             setLoading(true)
	// 			  setTimeout(()=>{
	// 			  	setCompleted(true)
	// 			  },1000)

	//          })();
	//     },2000)

	//   }, []);

	return (
		<>
			{!completed ? (
				<>
					<Box sx={{ marginTop: '-155px' }}>
						{/* {!loading ? (
							<Preload type={1}></Preload>
						) : (
							<Preload type={3}></Preload>
						)} */}
					</Box>
				</>
			) : (
				<>
					<div className={`${cx('dashboard-wapper-container')}`}>
						<div className={`${cx('kzboxshadow')}`}>
							{/* <CardHover
								img='https://i.pinimg.com/564x/df/87/c8/df87c8599e33fe73c355de8f32bc1927.jpg'
								name='User'
								number={STATISTIC.users}
							/>
							<CardHover
								img='https://i.pinimg.com/564x/c7/73/48/c77348c169ea27d62d8fa4ae855f60b6.jpg'
								name='Video Music'
								number={STATISTIC.videomusic}
							/>
							<CardHover
								img='https://i.pinimg.com/564x/a5/21/7a/a5217a2d42a9a64a0077c5cad6dac7ec.jpg'
								name='Song'
								number={STATISTIC.song}
							/>

							<CardHover
								img='https://i.pinimg.com/564x/6e/40/e3/6e40e37f3f798cf02241f5ad1f59b33a.jpg'
								name='Post'
								number={STATISTIC.post}
							/> */}
						</div>
					</div>

					<div className={`${cx('dashboard-wapper-container-chart')}`}>
						<div className={`${cx('kzboxshadow-1')}`}>
							{/* <Carousel data={POST}></Carousel> */}
						</div>

						<div className={`${cx('kzboxshadow-2')}`}>
							{/* <PieChart {...STATISTIC}></PieChart> */}
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Dashboard;
