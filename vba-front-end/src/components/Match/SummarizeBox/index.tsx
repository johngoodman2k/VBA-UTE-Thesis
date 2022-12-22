import React from 'react';
import styles from './summarizeBox.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export const SummarizeBox = () => {
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
							<tbody className='text-lg'>
								<tr className=''>
									<td>
										<span className='font-bold text-third-color'>HNB</span>
									</td>
									<td className='text-right'>23</td>
									<td className='text-right'>24</td>
									<td className='text-right'>22</td>
									<td className='text-right'>23</td>
									<td className='text-right'>113</td>
								</tr>
								<tr className=''>
									<td>
										<span className='font-bold text-third-color'>NTD</span>
									</td>
									<td className='text-right'>21</td>
									<td className='text-right'>12</td>
									<td className='text-right'>31</td>
									<td className='text-right'>12</td>
									<td className='text-right'>80</td>
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
