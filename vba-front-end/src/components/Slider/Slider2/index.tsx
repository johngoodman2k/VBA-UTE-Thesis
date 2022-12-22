import React, { useEffect, useState, useRef } from 'react';
import styles from './slider2.module.scss';
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper';
import videoCTC from './../../../videos/cantho.mp4';
import videoSGH from './../../../videos/sgh.mp4';
import videoHNB from './../../../videos/hanoi.mp4';
import videoNTD from './../../../videos/nhatrang.mp4';
import videoDND from './../../../videos/danang.mp4';
import videoTLW from './../../../videos/thanglong.mp4';

import 'swiper/scss';
import { Season } from '../../../Services/models';
import { shortCutText } from '../../../utils/textCutting';

const cx = classNames.bind(styles);

const data = [
	{
		name: 'CanTho Catfish',
		video: videoHNB,
		des: 'Lê Hiếu Thành is good'
	},
	{
		name: 'SaiGon Heat',
		video: videoCTC,
		des: 'Khoa Pham is friendlys'
	},
	{
		name: 'NhaTrang Dolphins',
		video: videoSGH,
		des: 'Khoa Pham is friendlys'
	},
	{
		name: 'DaNang Dragon',
		video: videoDND,
		des: 'Trung Kien is god'
	},
	{
		name: 'Hanoi Buffaloes',
		video: videoTLW,
		des: 'Trung Kien is god'
	},
	{
		name: 'Thang Long Warriors',
		video: videoTLW,
		des: 'Trung Kien is god'
	}
];

type Slider2Props = {
	ref?: (el: any) => void;
	tournament?: Season;
};
export const Slider2 = (props: Slider2Props) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	console.log('57', props.tournament)
	// const imgRef = useRef<any>();

	const handleMouseOverImg = (index: number) => {
		setCurrentIndex(index);
	};

	return (
		<div ref={props.ref} className={` ${cx('Slider')}`}>
			<div className={`${cx('Slider__ImageBlock')}`}>
				<div className={`${cx('Slider__ImageBlock__Image')}`}>
					{data.map((item, index) => {
						return (
							<div className={cx('Slider__ImageBlock__Image__ImageFrame')}>
								<a
									href='/'
									className={cx(
										'Slider__ImageBlock__Image__ImageFrame__ImageChild'
									)}>
									<video
										loop
										autoPlay
										muted
										className={` ${cx(
											'Slider__ImageBlock__Image__ImageFrame__ImageChild__default',
											index === currentIndex
												? 'Slider__ImageBlock__Image__ImageFrame__ImageChild__default--active'
												: ''
										)}`}
										src={item.video}></video>
								</a>
							</div>
						);
					})}
				</div>
			</div>

			<div className={`${cx('Slider__DescriptionBlock')}`}>
				<div className={cx('Slider__DescriptionBlock__Driver')}></div>
				<div className={cx('Slider__DescriptionBlock__DescriptionFrame')}>
					{props.tournament && props.tournament.teams && props.tournament.teams.map((item, index) => {
						return (
							<div
								className={cx(
									'Slider__DescriptionBlock__DescriptionFrame__Description',
									index === currentIndex
										? 'Slider__DescriptionBlock__DescriptionFrame__Description--active'
										: ''
								)}>
								{shortCutText(item.description)}
							</div>
						);
					})}
				</div>
			</div>

			<div className={cx('Slider__Footer')}>
				<div className={cx('Slider__Footer__FooterWrap')}>
					<div className={cx('Slider__Footer__FooterWrap__CurrentNumber')}>
						{props.tournament && props.tournament.teams && props.tournament.teams.map((item, index) => {
							return (
								<div
									className={cx(
										'Slider__Footer__FooterWrap__CurrentNumber__Number',
										currentIndex === index
											? 'Slider__Footer__FooterWrap__CurrentNumber__Number--active'
											: ''
									)}>
									{currentIndex + 1 < 10
										? '0' + (currentIndex + 1)
										: currentIndex + 1}
								</div>
							);
						})}
					</div>
					<div className={cx('Slider__Footer__FooterWrap__Driver')}></div>
					<div className={cx('Slider__Footer__FooterWrap__TotalNumber')}>
						10
					</div>
				</div>
				{/* <div className={cx("Slider__Footer__DriverFrame")}>
          
        </div> */}
				{/* <div className={cx("Slider__Footer__TotalNumber")}>
          <div className={cx("Slider__Footer__TotalNumber__Number")}>10</div>
        </div> */}
			</div>

			{props.tournament && props.tournament.teams && <div className={`${cx('Slider__Swiper')}`}>
				<Swiper
					modules={[Mousewheel]}
					spaceBetween={0}
					slidesPerView='auto'
					grabCursor={true}
					// centeredSlides={true}
					onSlideChange={e => console.log('48', e)}
					onSwiper={swiper => console.log(swiper)}
					//   autoplay={{ delay: 10000 }}
					mousewheel
					loop={true}
					className='w-full h-full bg-transparent'>
					{props.tournament.teams.map((data, index) => (
						<SwiperSlide
							style={{ transform: 'translateX(2em)' }}
							className={` ${cx('Slider__Swiper__SwiperItem')} `}
							onMouseOver={() => {
								handleMouseOverImg(index);
							}}>
							{/* <a href="/" className="w-full h-full text-center"> */}
							<div
								data-number={index + 1 < 10 ? '0' + (index + 1) : index + 1}
								className={`${cx('Slider__Swiper__SwiperItem--titleItem')}`}>
								{data.teamname}
							</div>
							{/* </a> */}
						</SwiperSlide>
					))}
				</Swiper>
			</div>}
		</div>
	);
};
