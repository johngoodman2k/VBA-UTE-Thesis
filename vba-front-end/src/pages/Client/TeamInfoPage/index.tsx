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
const cx = classNames.bind(styles);
const playerServices = vbaContext.getPlayerServices();
const teamServices = vbaContext.getTeamServices();

export const TeamInfoPage = () => {
	const [players, setPlayers] = useState<Player[]>();
	const [team, setTeam] = useState<Team>();
	const param = useParams();
	useEffect(() => {
		(async () => {
			const res = await playerServices.getPlayersByTeamId(param.id);
			setPlayers(res);
			if (param.id) {
				const res1 = await teamServices.getTeamById(param.id);
				setTeam(res1);
			}
		})();
	}, []);
	return (
		<div className={`${cx('__wrapper')}`}>
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
				<TeamUpCommingGames></TeamUpCommingGames>
				<TeamRoster players={players}></TeamRoster>
				<TeamProfile></TeamProfile>
			</div>
		</div>
	);
};
