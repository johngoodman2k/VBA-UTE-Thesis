import React from 'react';
import classNames from 'classnames/bind';
import styles from './adminSideBar.module.scss';
import { SidebarButton } from '../SidebarButton';
const cx = classNames.bind(styles);
type AdminSideBarProps = {
	visible: boolean;
};
export const AdminSideBar = (props: AdminSideBarProps) => {
	return (
		<section className={`${cx('_container', props.visible === true ? 'visible !right-0' : 'invisible')}`}>
			<div className='mb-0 shadow-none text-white'>
				<div className='w-[410px] h-[116px]'>
					<a href='' className='flex h-full items-center'>
						<img src='https://vba.vn/assets/img/svg/vba-logo.svg' alt='' className='h-full' />
						<span className='ml-8 font-bold text-4xl'>ADMIN PAGE</span>
					</a>
				</div>
			</div>
			<div className='w-full px-8'>
				<SidebarButton title='giải đấu' to='tournaments'></SidebarButton>
				<SidebarButton title='mùa giải' to='seasons'></SidebarButton>
				<SidebarButton title='đội' to='teams'></SidebarButton>
				<SidebarButton title='cầu thủ' to='players'></SidebarButton>
			</div>
		</section>
	);
};
