import React from 'react';
import styles from './summarizeBox.module.scss';
import classNames from 'classnames/bind';
import { Process } from '../../../Services/models';
const cx = classNames.bind(styles);
interface Result {
	q1: number;
	q2:number;
	q3: number;
	q4:number;
	final:number;
}

const addPoint = (process: Process,rs:Result, offset: number)=>{
	if(process.quater=== 'q1'){
		rs.q1 = rs.q1+offset
	}else if(process.quater=== 'q2'){
		rs.q2 = rs.q2+offset

	}else if(process.quater=== 'q3'){
		rs.q3 = rs.q3+offset

	}else if(process.quater=== 'q4'){
		rs.q4 = rs.q4+offset
	}
}

const pointerMapping = (process?: Process[]):{home:Result,away: Result} | undefined =>{
	if(!process || process.length === 0) return;
	let home = {q1: 0,q2: 0,q3: 0,q4: 0, final: 0}
	let away = {q1: 0,q2: 0,q3: 0,q4: 0, final: 0}

	for(const p of process){
		if(p.type === 'offensive'){
			if(p.side === "home"){
				if(p.option === '3PT'){
					addPoint(p,home,3)
				}
				else if(p.option === '2PT'){
					addPoint(p,home,2)
				}else {
					addPoint(p,home,1)
				}
			}else {
				if(p.option === '3PT'){
					addPoint(p,away,3)
				}
				else if(p.option === '2PT'){
					addPoint(p,away,2)
				}else {
					addPoint(p,away,1)
				}
			}	
		}
	}
	home.final = home.q1 + home.q2 + home.q3 + home.q4
	away.final = away.q1 + away.q2 + away.q3 + away.q4

	return {home, away}
}
type SummarizeBoxProps = {
	processes?: Process[],
	homeName?: string,
	awayName?: string,

}

export const SummarizeBox = ({processes,homeName,awayName}:SummarizeBoxProps) => {
	return (
		<div className='container p-7'>
			<section className='mb-6 rounded '>
				<div className='p-5'>
					<h2 className='p-2 uppercase text-left text-xl font-black flex flex-wrap md:flex-no-wrap justify-between'>
						<span className='flex-1 block w-1/2 '>April</span>
					</h2>
					<div className={`${cx('__container')} flex overflow-x-auto`}>
						<table className='border-collapse w-full'>
							<thead className='text-lg border-b border-third-color text-third-color'>
								<tr>
									<th>&nbsp;</th>
									<th className=' pb-2 font-normal text-right'>Q1</th>
									<th className=' pb-2 font-normal text-right'>Q2</th>
									<th className=' pb-2 font-normal text-right'>Q3</th>
									<th className=' pb-2 font-normal text-right'>Q4</th>
									<th className=' pb-2 font-normal text-right'>FINAL</th>
								</tr>
							</thead>
							<tbody className='text-lg text-left'>
								<tr className=''>
									<td>
										<span className='font-bold text-third-color'>{homeName??""}</span>
									</td>
									<td className='text-right'>{pointerMapping(processes)?.home.q1 ?? ""}</td>
									<td className='text-right'>{pointerMapping(processes)?.home.q2 ?? ""}</td>
									<td className='text-right'>{pointerMapping(processes)?.home.q3 ?? ""}</td>
									<td className='text-right'>{pointerMapping(processes)?.home.q4 ?? ""}</td>
									<td className='text-right'>{pointerMapping(processes)?.home.final ?? ""}</td>
								</tr>
								<tr className=''>
									<td>
										<span className='font-bold text-third-color'>{awayName ?? ""}</span>
									</td>
									<td className='text-right'>{pointerMapping(processes)?.away.q1 ?? ""}</td>
									<td className='text-right'>{pointerMapping(processes)?.away.q2 ?? ""}</td>
									<td className='text-right'>{pointerMapping(processes)?.away.q3 ?? ""}</td>
									<td className='text-right'>{pointerMapping(processes)?.away.q4 ?? ""}</td>
									<td className='text-right'>{pointerMapping(processes)?.away.final ?? ""}</td>
								</tr>
							</tbody>
						</table>
						<div className='h-full mx-8 border-r border-third-color'></div>
						{/* <div
							className={`${cx(
								'__boxes'
							)} mx-6 border border-white flex flex-shrink-0 `}>
							<div className='flex flex-col items-center justify-center flex-shrink-0 w-1/2 px-2 pt-2 border-r border-white'>
								<p className='text-sm leading-none text-center'>
									LEAD <br></br> CHANGES
								</p>
								<p className='text-6xl font-bold text-center'>1</p>
							</div>
							<div className='flex flex-col items-center justify-center flex-shrink-0 w-1/2 px-2 pt-2 '>
								<p className='text-sm leading-none text-center'>
									LEAD <br></br> CHANGES
								</p>
								<p className='text-6xl font-bold text-center'>1</p>
							</div>
						</div> */}
					</div>
				</div>
			</section>
		</div>
	);
};
