import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './landingPageScroll.module.scss';
import videoG2 from './../../videos/G2cut.mp4';
import { Power3, gsap, Expo } from 'gsap';
import CSSRulePlugin from 'gsap/CSSRulePlugin';
import { NavigationBar } from '../../components/Bar/NavigationBar';
import { SidebarFixture } from '../../components/LandingPage/SideBarFixtures';
import { NewsCard } from '../../components/News/NewsCard';
import { Slider2 } from '../../components/Slider/Slider2';
import PlayerCard1 from '../../components/Player/PlayerCard1';
import { PlayerCard } from '../../components/Player/PlayerCard';
import { RelatedNews } from '../../components/NewsDetail/RelatedNews';

const cx = classNames.bind(styles);

export const LandingPageScroll = () => {
	gsap.registerPlugin(CSSRulePlugin);
	let intro = useRef(null);
	let container = useRef(null);
	let title = useRef(null);
	let image = useRef(null);
	let header = useRef(null);
	let imageReveal = CSSRulePlugin.getRule(`${cx('__right__wrapper')}`);
	console.log('20', imageReveal);
	let tl = gsap.timeline();
	useEffect(() => {
		tl.to(title, {
			duration: 2,
			opacity: 0,

			ease: Power3.easeIn
		}).to(
			header,
			{
				duration: 1,
				opacity: 1,
				y: 50,
				ease: Power3.easeOut
			},
			'<1'
		);
	});
	// console.log("header", header);
	// useEffect(() => {
	//   gsap
	//     .to(title, {
	//       duration: 2,
	//       opacity: 1,
	//       y: -20,
	//       x: 300,
	//       ease: Power3.easeOut,
	//       // delay: 9000,
	//     })
	//     .delay(9);
	//   gsap
	//     .to(header, {
	//       duration: 2,
	//       opacity: 1,
	//       y: 50,

	//       ease: Power3.easeOut,
	//       // delay: 9000,
	//     })
	//     .delay(9);
	// }, []);

	// useEffect(() => {
	//   tl.to(container, { cssRule: { visibility: "visible" } }).to(imageReveal, {
	//     duration: 1.4,
	//     width: "0%",
	//     ease: Power3.easeInOut,
	//   });
	// });

	return (
		<>
			<div className={`w-full overflow-hidden ${cx('__wrapper')}`}>
				<section>
					<div className=' mx-auto text-center align-middle'>
						<div
							className={`relative ${cx('__header__block')}`}
							ref={(el: any) => {
								header = el;
							}}>
							<NavigationBar />
						</div>

						<div className={cx('__intro')}>
							{/* <video
								ref={(el: any) => {
									intro = el;
								}}
								src={videoG2}
								autoPlay
								muted></video> */}
							<div className={`${cx('__hero')}`}>
								<Slider2
									ref={(el: any) => {
										title = el;
									}}></Slider2>
								{/* <div className={`${cx("__left")} text-third-color`}>
                  <div
                    ref={(el: any) => {
                      title = el;
                    }}
                    className="opacity-0 absolute left-1/2 bottom-[10%] text-center"
                  >
                 
                    <h1 className={`${cx("__left__title")}`}>
                      WE ARE <br></br>
                      <span className="text-third-color">VBA</span>
                    </h1>
                    <div className={`${cx("__left__book")}`}></div>
                  </div>
                </div>

                <div className={cx("__right")}>
                  <div className={cx("__right__wrapper")}>
                    <figure
                      ref={(el: any) => (el = container)}
                      className={cx("__background-img")}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1531737212413-667205e1cda7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=734&q=80"
                        alt=""
                        ref={(el: any) => (image = el)}
                        className="w-full h-full"
                      />
                    </figure>
                  </div>
                </div> */}
							</div>
						</div>
					</div>
				</section>

				<section>
					<div className='container mx-auto px-4 w-full text-center align-middle text-third-color'>
						<div className='grid grid-cols-3'>
							<nav className={cx('__fixturesBlock')}>
								{/* <SidebarFixture></SidebarFixture> */}
							</nav>
							<div className='col-span-2'>
								<NewsCard
									heroImage='http://api-news.vba.vn/storage/images/Game-35-Nha-Trang-Dolphins-Danang-Dragons%20.JPG'
									heroTitle='DANANG DRAGONS KẾT THÚC HÀNH TRÌNH TẠI VBA 2022'
									heroType='News'
									heroDescription='Nha Trang Dolphins có chiến thắng đậm nhất trong lịch sử đội bóng. Đội chủ nhà chiếm ưu thế tuyệt đối và vượt qua Danang Dragons với tỷ số 76-41. Kết quả này giúp Dolphins vươn lên vị trí thứ 2 trên bảng xếp hạng với thành tích 6 thắng 4 bại. Chỉ cần thêm một chiến thắng, Nha Trang Dolphins sẽ lần đầu tiên lọt vào bán kết VBA.'
									firstContentDescription='Saigon Heat công thủ toàn diện, Coach Predrag Lukic rời sân'
									firstContentTitle='SAIGON HEAT XÂY VỮNG NGÔI ĐẦU BẢNG'
									firstContentImage='http://api-news.vba.vn/storage/images/Games-36-Saigon-Heat-Thang-Long-Warriors%20_3.JPG'
									secondContentTitle='THANG LONG WARRIORS VƯƠN LÊN TOP 5'
									secondContentImage='http://api-news.vba.vn/storage/images/Game-34-Ho-Chi-Minh-City-Wings-Thang-Long-Warriors%20_2.JPG'
									secondContentDescription='Thang Long Warriors chưa bỏ cuộc trong cuộc đua nước rút vào top 4. '></NewsCard>
							</div>
						</div>
					</div>
				</section>
				<section className='bg-red-100'>
					<div className={`${cx('__newsHeader')}`}>Realated News</div>
					<div className='grid grid-cols-6 align-middle'>
						<RelatedNews></RelatedNews>
						<RelatedNews></RelatedNews>
						<RelatedNews></RelatedNews>
						<RelatedNews></RelatedNews>
						<RelatedNews></RelatedNews>
						<RelatedNews></RelatedNews>
					</div>
					<div className='grid grid-cols-6 align-middle'>
						<RelatedNews></RelatedNews>
						<RelatedNews></RelatedNews>
						<RelatedNews></RelatedNews>
						<RelatedNews></RelatedNews>
						<RelatedNews></RelatedNews>
						<RelatedNews></RelatedNews>
					</div>
				</section>
				<section className='bg-amber-500'>
					<h1>Fourth Page</h1>
				</section>
				<section>
					<h1>Fifth Page</h1>
				</section>
			</div>
		</>
	);
};
