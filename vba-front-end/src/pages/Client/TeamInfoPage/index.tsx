import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './teamInfo.module.scss';
import { TeamInfoHeader } from './TeamInfoHeader';
import { TeamUpCommingGames } from './TeamUpComingGames';
import { TeamRoster } from './TeamRoster';
import { TeamProfile } from './TeamProfile';
import { vbaContext } from '../../../Services/services';
import { Player, Team } from '../../../Services/models';
import { useParams } from 'react-router-dom';
import { Loading } from '../../../components/Loading';
const cx = classNames.bind(styles);
const playerServices = vbaContext.getPlayerServices();
const teamServices = vbaContext.getTeamServices();

export const TeamInfoPage = () => {
	// const [players, setPlayers] = useState<Player[]>();
	const [team, setTeam] = useState<Team>();
	const [done, setDone] = useState(false);
	const [loading, setLoading] = useState(false);
	const param = useParams()
	useEffect(() => {
		(async () => {
			try {
				if (param.id) {
					const res1 = await teamServices.getTeamById(param.id);
					setTeam(res1);
					setLoading(true);
					setTimeout(() => {
						setDone(true);
					}, 1000);
					console.log(res1)
				}
			}
			catch (e) {
				setLoading(true);
				setTimeout(() => {
					setDone(true);
				}, 1000);
			}

		})();
	}, []);
	return (
		<>
			{!done ? (<Loading loading={loading}></Loading>) : (<div className={`${cx('__wrapper')}`}>
				<section>
					<TeamInfoHeader name={team?.teamname} image={team?.teamlogo as string} color={team?.color}></TeamInfoHeader>
				</section>
				<div className={`${cx('__displayAd')}`}></div>
				<div className={`${cx('__container')}`}>
					<div className={`${cx('__background')}`}>
						<div className={`${cx('__background__block')}`}>
							<img src={team?.teamlogo as string} className={`${cx('__background__block--adjust')}`} alt='' />
						</div>
					</div>
					<TeamUpCommingGames id={param.id} fixtures={team?.matches}></TeamUpCommingGames>
					<TeamRoster players={team?.players}></TeamRoster>
					<TeamProfile details={team}></TeamProfile>
				</div>
			</div >)}
		</>

	);
};
