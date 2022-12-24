import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './newsManager.module.scss';
import { ReactComponent as Plus } from '../../../assets/svg/plus-com.svg';
import { AdminTeamCard } from '../Components/AdminTeamCard';
import { AdminSeasonCard } from '../Components/AdminSeasonCard';
import { AdminPlayerCard } from '../Components/AdminPlayerCard';
import { CreateTeamModal } from '../../../components/Modal/CreateTeamModal';
import { Player, Post, Season, Team } from '../../../Services/models';
import { NoData } from '../Components/NoData';
import { useParams } from 'react-router-dom';
import { vbaContext } from '../../../Services/services';
import toastNotify from '../../../utils/toast';
import { SeasonServices } from '../../../Services';
import { NewsBlock } from '../../../components/News/NewsBlock';
import { PostCard } from '../Components/PostCard';
import { CreatePostModal } from '../../../components/Modal/CreatePostModal';
const cx = classNames.bind(styles);

const teamServices = vbaContext.getTeamServices()
const seasonServices = vbaContext.getSeasonServices()
const postServices = vbaContext.getPostServices()


export const NewsManager = () => {
	const [listPost, setListPost] = useState<Post[]>([])
	const [clicked, setClicked] = useState(false);
	const [reload, setReload] = useState(false);
	// const [season, setSeason] = useState<Season>()
	const handleCreate = () => {
		setClicked(!clicked);
	};
	const handleCloseModal = () => {
		setClicked(false);
	};

	useEffect(() => {
		(async () => {
			try {
					const res = await postServices.getAllPost();
                    console.log(res)
					// setListPost(res.list);
			
				console.log(listPost);
			} catch (err) {
				console.log(err);
				toastNotify('Error for get Team', 'error');
			}
		})()
	}, [reload]);
	return (
		<>
			<div className='border-b border-solid'>
				<p className='uppercase font-bold text-4xl  text-left p-4 mx-2 flex flex-col'>
					<div className=' block'>Quản lý bài viết</div>
					<div className='ml-auto text-right hover:cursor-pointer'>
						<Plus onClick={handleCreate} className='w-[48px] h-[48px]'></Plus>
					</div>
				</p>
			</div>
			<div className={clicked === true ? cx('__active') : cx('__inactive')}>
				<CreatePostModal title="Tạo bài viết" reload={reload} setReload={setReload} handleCloseModal={handleCloseModal}></CreatePostModal>
			</div>

			<div className='m-2 p-2 grid grid-cols-3 gap-[10rem]'>
				{listPost.length > 0 ? (
					listPost.map((post: Post, i: number) => <NewsBlock title={post.name} image={post.image}></NewsBlock>)
				) : (
					<NoData content='Không có dữ liệu bài viết' />
				)}
			</div>
		</>
	);
};
