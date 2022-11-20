import React from 'react';
import classNames from 'classnames/bind';
import styles from './standing.module.scss';
import { LilStanding } from '../../../components/LilStanding';

const cx = classNames.bind(styles);

const StandingPage = () => {
	return (
		<>
			<div className={`${cx('container', 'xxl:px-0', 'md:p-[1.75rem]')}`}>
				<section className={`${cx('standings-header')}`}>Ranking Rules</section>
				<div className={`${cx('standings-box')}`}>
					<div className={`${cx('standings-rules')}`}>
						<span className={`${cx('standings-rules--won')}`}>W</span>
						<span className={`${cx('standings-rules--drawn')}`}>D</span>
						<span className={`${cx('standings-rules--lost')}`}>L</span>
					</div>
					<table className='w-full text-center bg-white'>
						<thead>
							<tr>
								<th scope='col' className={`${cx('standings-text-centre')}`}>
									<div>Position</div>
								</th>
								<th scope='col' className={`${cx('standings-text-team')}`}>
									Team
								</th>
								<th>
									<div>Played</div>
								</th>
								<th>
									<div>Won</div>
								</th>
								<th>
									<div>Drawn</div>
								</th>
								<th>
									<div>Lost</div>
								</th>
								<th>
									<div>GF</div>
								</th>
								<th>
									<div>GA</div>
								</th>
								<th>
									<div>GD</div>
								</th>
								<th>
									<div>Points</div>
								</th>
								<th>
									<div>Form</div>
								</th>
							</tr>
						</thead>
						<tbody className={`${cx('standings-box-body')}`}>
							<tr>
								<td className={`${cx('standings-button__tooltip')}`}>
									<span className={`${cx('standings-position__value text-adjust')}`}>1</span>
									{/* <span
										className={`${cx('standings-position__before')}`}></span> */}
								</td>
								<td scope='row' className=''>
									<a>
										<span>
											<img
												src='https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg'
												className={`${cx('standings-team__pic', 'inline-block')}`}></img>
										</span>
										<span className={`${cx('standings-team__name')}`}>Miami Heat</span>
									</a>
								</td>
								<td className={cx('text-adjust')}>10</td>
								<td className={cx('text-adjust')}>10</td>
								<td className={cx('text-adjust')}>10</td>
								<td className={cx('text-adjust')}>10</td>
								<td className={cx('text-adjust')}>10</td>
								<td className={cx('text-adjust')}>10</td>
								<td className={cx('text-adjust')}>10</td>
								<td className={cx('text-adjust')}>10</td>

								<td className={`${cx('standings-form')}`}>
									<ul>
										<li className={`${cx('standings-form__won')}`}>W</li>
									</ul>
								</td>
							</tr>
							<tr>
								<td className={`${cx('standings-button_tooltip')}`}>
									<span className={`${cx('standings-position__value')}`}>2</span>
									{/* <span
										className={`${cx('standings-position__before')}`}></span> */}
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className={`${cx('_rules')}`}>
					<section>
						<p className='font-bold'>TIEBREAKER BASIS FOR TWO-WAY TIES:</p>
						<ul className='my-3 list-disc list-inside'>
							<li className=''>
								<span>(-) Tie breaker not needed (better overall winning percentage)</span>
							</li>
							<li className=''>
								<span>(1) Head-to-head won-lost percentage</span>
							</li>
							<li className=''>
								<span>(2) Division leader wins tie from team not leading a division</span>
							</li>
							<li className=''>
								<span>(3) Division won-lost percentage for teams in the same division</span>
							</li>
							<li className=''>
								<span>(4) Conference won-lost percentage</span>
							</li>
							<li className=''>
								<span>(5) W-L Percentage vs. Playoff teams, own conference</span>
							</li>
							<li className=''>
								<span>(6) W-L Percentage vs. Playoff teams, other conference</span>
							</li>
							<li className=''>
								<span>(7) Net Points, all games</span>
							</li>
						</ul>
					</section>
					<section>
						<p className='font-bold'>TIEBREAKER BASIS FOR MULTI-WAY TIES:</p>
						<ul className='my-3 list-disc list-inside'>
							<li className=''>
								<span>(-) Tie breaker not needed (better overall winning percentage)</span>
							</li>
							<li className=''>
								<span>(1) Head-to-head won-lost percentage</span>
							</li>
							<li className=''>
								<span>(2) Division leader wins tie from team not leading a division</span>
							</li>
							<li className=''>
								<span>(3) Division won-lost percentage for teams in the same division</span>
							</li>
							<li className=''>
								<span>(4) Conference won-lost percentage</span>
							</li>
							<li className=''>
								<span>(5) W-L Percentage vs. Playoff teams, own conference</span>
							</li>
							<li className=''>
								<span>(6) W-L Percentage vs. Playoff teams, other conference</span>
							</li>
							<li className=''>
								<span>(7) Net Points, all games</span>
							</li>
						</ul>
					</section>
					<section>
						<p className='font-bold'>Strength of Schedule:</p>
						<p>
							Looks at the opponents for your remaining games, their winning percentage on the road or at home, and
							whether or not either team is on the second night of a back to back. Ties for playoff positions (including
							division winners) will be broken utilizing the criteria set forth in subparagraph a. below (in the case of
							ties involving two teams) and subparagraph b. below (in the case of ties involving more than two teams),
							and the guidelines set forth in subparagraph c. below.
						</p>
						<p className='font-bold'>
							a. Two Teams Tied. In the case of a tie in regular-season records involving only two teams, the following
							criteria will be utilized in the following order:
						</p>
						<ul className='my-3 list-disc list-inside'>
							<li className=''>
								<span>(1) Better winning percentage in games against each other.</span>
							</li>
							<li className=''>
								<span>
									(2) Division winner (this criterion is applied regardless of whether the tied teams are in the same
									division).
								</span>
							</li>
							<li className=''>
								<span>
									(3) Better winning percentage against teams in own division (only if tied teams are in same division).
								</span>
							</li>
							<li className=''>
								<span>(4) Better winning percentage against teams in own conference.</span>
							</li>
							<li className=''>
								<span>
									(5) Better winning percentage against teams eligible for playoffs in own conference (including teams
									that finished the regular season tied for a playoff position).
								</span>
							</li>
							<li className=''>
								<span>
									(6) Better winning percentage against teams eligible for playoffs in opposite conference (including
									teams that finished the regular season tied for a playoff position).
								</span>
							</li>
							<li className=''>
								<span>
									(7) Better net result of total points scored less total points allowed against all opponents ("point
									differential").
								</span>
							</li>
						</ul>
					</section>

					<section>
						<p className='font-bold'>
							b. More Than Two Teams Tied. In the case of a tie in regular-season records involving more than two teams,
							the following criteria will be utilized in the following order:
						</p>
						<ul className='my-3 list-disc list-inside'>
							<li className=''>
								<span>
									(1) Division winner (this criterion is applied regardless of whether the tied teams are in the same
									division).
								</span>
							</li>
							<li className=''>
								<span>(2) Better winning percentage in all games among the tied teams.</span>
							</li>
							<li className=''>
								<span>
									(3) Better winning percentage against teams in own division (only if all tied teams are in same
									division).
								</span>
							</li>
							<li className=''>
								<span>(4) Better winning percentage against teams in own conference.</span>
							</li>
							<li className=''>
								<span>
									(5) Better winning percentage against teams eligible for playoffs in own conference (including teams
									that finished the regular season tied for a playoff position).
								</span>
							</li>
							<li className=''>
								<span>
									(6) Better net result of total points scored less total points allowed against all opponents ("point
									differential").
								</span>
							</li>
						</ul>
					</section>
					<section>
						<p className='font-bold'>
							c. Guidelines For Applying Tie-Break Criteria. The following guidelines shall be used when applying the
							above criteria to break ties for playoff positions
						</p>
						<ul className='my-3 list-disc list-inside'>
							<li className=''>
								<span>(1)(a) Ties to determine the division winners must be broken before any other ties.</span>
							</li>
							<li className=''>
								<span>
									(b) When a tie must be broken to determine a division winner, the results of the tie-break shall be
									used to determine only the division winner, and not for any other purpose.
								</span>
							</li>
							<li className=''>
								<span>
									(2) If a tie involves more than two teams, the tie-break criteria in subparagraph b. shall be applied
									in the order set forth therein until the first to occur of the following:
								</span>
							</li>
							<li className=''>
								<span>
									(a) Each of the tied teams has a different winning percentage or point differential under the
									applicable tie-break criterion (a “complete” breaking of the tie). In this circumstance, the team with
									the best winning percentage or point differential under the criterion will be awarded the best playoff
									position, the team with the next-best winning percentage or point differential will be awarded the
									next-best playoff position, and so on, and no further application of the tie-break criteria will be
									required.
								</span>
							</li>
							<li className=''>
								<span>-- OR --</span>
							</li>
							<li className=''>
								<span>
									(b) One or more (but not all) of the tied teams has a different winning percentage or point
									differential under the applicable tie-break criterion (a “partial” breaking of the tie). In this
									circumstance: (x) any team(s) that performed better under the applicable criterion than any other
									team(s) will be awarded a higher playoff position than such other team(s); and (y) teams that had
									equivalent performance under the applicable criterion will remain tied, and such remaining tie(s) will
									be broken by applying, from the beginning, the criteria in subparagraph a.(1)-(6) above (for any
									remaining tie involving only two teams) or subparagraph b.(1)-(5) above (for any remaining tie
									involving more than two teams) and the guidelines set forth in this subparagraph c.
								</span>
							</li>
							<li className=''>
								<span>
									(3) If application of the criteria in subparagraph a. or b. does not result in the breaking of a tie,
									the playoff positions of the tied teams will be determined by a random drawing.
								</span>
							</li>
						</ul>
					</section>
				</div>
				<LilStanding></LilStanding>
			</div>
		</>
	);
};

export default StandingPage;
