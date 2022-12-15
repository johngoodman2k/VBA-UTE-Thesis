import React, { useState } from 'react';
import { NavigationBar } from '../../../components/Bar/NavigationBar';
import { AdminSideBar } from '../Components/AdminSideBar';
import { ReactComponent as Hamburger } from '../../../assets/svg/hamburger-com.svg';
import classNames from 'classnames/bind';
import styles from './adminHomePage.module.scss';
import { TournamentManager } from '../TournamentManager';
import { SeasonManager } from '../SeasonManager';
import { TeamManager } from '../TeamManager';
import { PlayerManager } from '../PlayerManager';
const cx = classNames.bind(styles);

type AdminHomePageProps = {
	manager: 'tournaments' | 'seasons' | 'teams' | 'players';
};

export const AdminHomePage = ({ manager }: AdminHomePageProps) => {
	const [clicked, setClicked] = useState(false);

	const handleHamburger = () => {
		setClicked(!clicked);
	};
	console.log('12', clicked);
	return (
		<div className={`${cx('_container', 'text-center text-white')}`}>
			<div className='container text-center m-auto'>
				<header>
					<div className='w-full h-[174px] '>
						<div className='relative w-full h-full p-0 pl-[5%] pr-[5%] text-third-color flex justify-between items-center'>
							<div className='w-[48px] h-[48px] hover:cursor-pointer' onClick={handleHamburger}>
								<Hamburger className='w-full h-full'></Hamburger>
							</div>

							<div className='inline-block align-middle leading-4'>
								<a className='relative inline-block max-w-[100%] max-h-[130px] h-[128px]'>
									<img src='https://vba.vn/assets/img/svg/vba-logo.svg' className='m-center h-full w-auto'></img>
								</a>
							</div>
							<div className='w-[48px] h-[48px]'>
								<p></p>
							</div>
						</div>
					</div>
				</header>
				<AdminSideBar visible={clicked}></AdminSideBar>

				<section className='my-4 w-full  m-auto p-2'>
					{manager === 'tournaments' ? (
						<TournamentManager />
					) : manager === 'seasons' ? (
						<SeasonManager></SeasonManager>
					) : manager === 'teams' ? (
						<TeamManager></TeamManager>
					) : (
						<PlayerManager></PlayerManager>
					)}
				</section>
			</div>
		</div>
	);
};
