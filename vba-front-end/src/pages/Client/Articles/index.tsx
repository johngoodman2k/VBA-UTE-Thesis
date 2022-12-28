import React, { useEffect, useState } from 'react';
import styles from './articles.module.scss';
import classNames from 'classnames/bind';
import { Post } from '../../../Services/models';
import { vbaContext } from '../../../Services/services';
import { useParams } from 'react-router';
import { Loading } from '../../../components/Loading';
const cx = classNames.bind(styles);
const postServices = vbaContext.getPostServices();
export const Articles = () => {
	const [post, setPost] = useState<Post>();
	const [done, setDone] = useState(false);
	const [loading, setLoading] = useState(false);
	const params = useParams()
	useEffect(() => {
		(async () => {
			try {
				if (params.id) {
					const res = await postServices.getPostById(params.id)
					console.log('16', res)
					setPost(res)
					setLoading(true);
					setTimeout(() => {
						setDone(true);
					}, 1000);

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
			{!done ? (<Loading loading={loading}></Loading>) :
				<article>
					<div className={`${cx('__wrapper')}`}>
						<div className={`${cx('__layout')}`}>
							<div className={`${cx('__left')}`}>
								<div className={`${cx('__header')}`}>
									<figure className='md:mb-10'>
										{
											post?.image &&
											<img
												className='mb-1 m-auto'
												src={post?.image}></img>
										}
									</figure>

									<h1 className={`${cx('__header__text')}`}>
										{post?.name ?? ''}
									</h1>
									<div className={`${cx('__infor')}`}>
										<div className={`${cx('__infor__text')}`}>
											<div className='font-bold'>Admin</div>
										</div>
										<div className={`${cx('__infor__text')}`}>
											{/* <span>October 23,2022</span>
									<span className='ml-2'>12:16 AM EDT</span> */}
										</div>
									</div>
								</div>
								<div className={`${cx('__content')}`}>
									{post?.description && <div dangerouslySetInnerHTML={{ __html: post.description }} ></div>}
								</div>
							</div>
							<div className={`${cx('__right')}`}></div>
						</div>
					</div>
				</article>}

		</>
	);
};
