import React from 'react';
import classNames from 'classnames/bind';
import styles from './newsCard.module.scss';
const cx = classNames.bind(styles);

type NewsCardProps = {
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
				<figure className={cx('__thumbnail__figure')}>
					<a className={cx('__thumbnail__image')}>
						<img
							className={cx('__thumbnail__image--adjust')}
							src={props.heroImage}></img>
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
						<p className={cx('__hero__figcaption__desc')}>
							{props.heroDescription}
						</p>
					</figcaption>
				</figure>
			</div>
			<div className={cx('__secondary')}>
				<div className={cx('__secondary__news')}>
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
							<h4>
								<a className={cx('__secondary__news--figcaption--title')}>
									{props.firstContentDescription}
								</a>
							</h4>
						</figcaption>
					</figure>
				</div>
				<div className={cx('__secondary__news')}>
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
							<h4>
								<a className={cx('__secondary__news--figcaption--title')}>
									{props.secondContentDescription}
								</a>
							</h4>
						</figcaption>
					</figure>
				</div>
			</div>
		</section>
	);
};
