import React, { useEffect, useState } from 'react';
import styles from './news.module.scss';
import classNames from 'classnames/bind';
import { NewsCard } from '../../../components/News/NewsCard';
import { NewsBlock } from '../../../components/News/NewsBlock';
import { Post } from '../../../Services/models';
import { vbaContext } from '../../../Services/services';
import { Link } from 'react-router-dom';
import { Loading } from '../../../components/Loading';
const cx = classNames.bind(styles);

const postServices = vbaContext.getPostServices();
export const News = () => {
	const [post, setPost] = useState<Post[]>([]);
	const [done, setDone] = useState(false);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		(async () => {
			try {
				const res1 = await postServices.getAllPost() as any
				setPost(res1.list)
				setLoading(true);
				setTimeout(() => {
					setDone(true);
				}, 1000);
				console.log('70', res1)
			}
			catch (e) {
				setLoading(true)
				setTimeout(() => {
					setDone(true);
				}, 1000);
			}


		})();
	}, []);
	return (
		<>
			{!done ? (<Loading loading={loading}></Loading>) : (<article className={`${cx('__container')}`}>
				<div className={`${cx('__wrapper')}`}>
					<div className='text-white text-6xl border-b border-solid border-third-color font-bold text-left uppercase p-4'>Tin tức</div>
					<div className={`${cx('__layout')}`}>

						<div className='grid grid-cols-3 gap-8 py-2 my-2'>
							{post.map((x: Post) =>
								<Link to={`/articles/${x.id}`}>
									<NewsBlock
										title={x.name}
										image={x.image}></NewsBlock>
								</Link>
							)}

						</div>
					</div>
				</div>
			</article>)}
		</>
	);
};
