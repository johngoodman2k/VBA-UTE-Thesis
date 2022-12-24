import React from 'react';
import classNames from 'classnames/bind';
import styles from './newsCard.module.scss';
import { Link } from 'react-router-dom';
import { Post } from '../../../Services/models';
const cx = classNames.bind(styles);

type NewsCardProps = {
	post0?: Post;
	post1?: Post;
	post2?: Post;
	heroImage?: string;
	heroType?: string;
	heroTitle?: string;
	heroDescription?: string;
	firstContentImage?: string;
	firstContentTitle?: string;
	firstContentDescription?: string;
	secondContentImage?: string;
	secondContentTitle?: string;
	secondContentDescription?: string;
};
export const NewsCard = (props: NewsCardProps) => {

	return (
		<section className={cx('__hero')}>
			<div className={cx('__thumbnail')}>
				<Link to={`/articles/${props.post0 && props.post0.id && props.post0.id ? props.post0.id : ""}`}>
					<figure className={cx('__thumbnail__figure')}>

						<a className={cx('__thumbnail__image')}>
							{props.heroImage && <img
								className={cx('__thumbnail__image--adjust')}
								src={props.heroImage}></img>}

						</a>

						<figcaption className={cx('__hero__figcaption')}>
							<span className={cx('__hero__figcaption__span')}>
								{props.heroType}
							</span>
							<h4>
								<a className={cx('__hero__figcaption__title')}>
									{props.heroTitle}
								</a>
							</h4>
							<div className={cx('__hero__figcaption__desc', '!text-white')}>
								{props.heroDescription && <div dangerouslySetInnerHTML={{ __html: props.heroDescription }} ></div>}
							</div>

						</figcaption>

					</figure>
				</Link>
			</div>
			<div className={cx('__secondary')}>
				<div className={cx('__secondary__news')}>
					<Link to={`/articles/${props.post1 && props.post1.id && props.post1.id ? props.post1.id : ""}`}>
						<figure className={cx('__secondary__news--figure')}>

							<a className={cx('__secondary__pics')}>
								<img
									className={cx('__secondary__pics--adjust')}
									src={props.firstContentImage}></img>
							</a>

							<figcaption className={cx('__secondary__news--figcaption')}>
								<div className={cx('__secondary__news--figcaption--caption')}>
									{props.firstContentTitle}
								</div>
								<h4 className={cx('__secondary__news--figcaption--title')}>
									{props.firstContentDescription && <div dangerouslySetInnerHTML={{ __html: props.firstContentDescription }} ></div>}
								</h4>
							</figcaption>

						</figure>
					</Link>
				</div>
				<div className={cx('__secondary__news')}>
					<Link to={`/articles/${props.post2 && props.post2.id && props.post2.id ? props.post2.id : ""}`}>
						<figure className={cx('__secondary__news--figure')}>

							<a className={cx('__secondary__pics')}>
								<img
									className={cx('__secondary__pics--adjust')}
									src={props.secondContentImage}></img>
							</a>

							<figcaption className={cx('__secondary__news--figcaption')}>
								<div className={cx('__secondary__news--figcaption--caption')}>
									{props.secondContentTitle}
								</div>
								<h4 className={cx('__secondary__news--figcaption--title')}>
									{props.secondContentDescription && <div dangerouslySetInnerHTML={{ __html: props.secondContentDescription }} ></div>}
								</h4>
							</figcaption>

						</figure>
					</Link>
				</div>
			</div>
		</section>
	);
};
