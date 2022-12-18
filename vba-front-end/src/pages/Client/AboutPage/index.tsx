import React, { useEffect, useState } from 'react';
// import { context } from "../../../authentication/service";
import { ContentWrapper } from '../../../components/Container/ContentWrapper';
import classNames from 'classnames/bind';
import styles from './about.module.scss';
import { NavigationBar } from '../../../components/Bar/NavigationBar';
import { vbaContext } from '../../../Services/services';
import { Footer } from '../../../components/Footer';

const cx = classNames.bind(styles);

export const AboutPage = () => {
	return (
		<>
			<ContentWrapper>
				<NavigationBar></NavigationBar>
				<div className='container m-auto py-6'>
					<div className=''>
						<img className='w-full ' src='http://api-news.vba.vn/storage/images/1595241335_Picture1.png' alt='' />
					</div>
					<div className='iteams-center py-4'>
						<h1 className='uppercase text-5xl font-[Teko]'>ABOUT US </h1>
					</div>
					<div className='p-8 px-20 text-left'>
						<p className='my-2'>
							<strong>VBA - Giải Bóng rổ Chuyên nghiệp Việt Nam</strong> được thành lập vào tháng 7/2016. Là giải bóng
							rổ chuyên nghiệp đầu tiên trong cả nước, VBA được xây dựng theo mô hình Thể thao - Giải trí mang tiêu
							chuẩn quốc tế.
						</p>
						<p className='my-2'>
							Không chỉ tạo nên một giải đấu chuyên nghiệp mang tính cạnh tranh cao, VBA muốn mang bóng rổ đến gần hơn
							với mọi người, đặc biệt là truyền cảm hứng cho lối sống tích cực đến thế hệ trẻ, cũng như nâng cao sức
							khỏe cộng đồng. VBA tạo ra một sân chơi chuyên nghiệp cho các vận động viên Việt Nam để tham gia và phát
							triển. Sứ mệnh này được thực hiện mốt cách nghiêm túc qua phương thức hoạt động chuyên nghiệp, trình độ
							vận động viên, quy mô và hơn hết là những hoạt động mang tính giải trí cao, mang lại cho khán giả một trải
							nghiệm xem tuyệt vời.
						</p>
						<p className='my-2'>
							Năm 2016, VBA được bình chọn là <strong>một trong những sự kiện có sức ảnh hưởng đến đại chúng</strong>,
							sánh cùng các sự kiến lớn như Hoạt động gặp gỡ giới trẻ Việt của Tổng thống Obama hay Tuần lễ thời trang
							quốc tế Việt Nam.{' '}
						</p>
						<p className='my-2'>
							Đến với VBA, người hâm mộ thể thao nói chung và người đam mê bóng rổ nói riêng hay những người yêu thích
							sự giải trí đều sẽ có trải nghiệm tuyệt vời về một Giải đấu với mô hình mới lạ và cực kì hấp dẫn.
						</p>
					</div>
					<div className=''>
						<img className='w-full ' src='http://api-news.vba.vn/storage/images/vision-vba.png' alt='' />
					</div>

					<div className='iteams-center py-4'>
						<h1 className='uppercase text-5xl font-[Teko]'>VISION AND OUR DESTINY </h1>
						<div className='py-6 grid grid-cols-2 gap-14'>
							<div className='text-center grid grid-rows-3'>
								<div className=' w-full flex justify-center'>
									<img
										className='max-w-[84px] max-h-[84px]'
										src='http://api-news.vba.vn/storage/images/001-cardiogram.png'
										alt=''
									/>
								</div>
								<h1 className='font-bold text-2xl'>
									Tạo ra một Giải đấu Thể thao chuyên nghiệp và đem lại những giá trị tốt nhất cho người hâm mộ
								</h1>
								<p>
									VBA mang sứ mệnh đem lại cho người hâm mộ những trải nghiệm đặc biệt nhất khi theo dõi các trận đấu
									bóng rổ đỉnh cao. Ngoài việc xem những pha bóng mãn nhãn của những cầu thủ chuyên nghiệp, khán giả còn
									được tận hưởng những tiết mục trình diễn đầy tính giải trí.
								</p>
							</div>
							<div className='text-center grid grid-rows-3'>
								<div className=' w-full flex justify-center'>
									<img
										className='max-w-[84px] max-h-[84px]'
										src='http://api-news.vba.vn/storage/images/002-cardiogram.png'
										alt=''
									/>
								</div>
								<h1 className='font-bold text-2xl'>
									Xây dựng một hệ thống đào tạo chuyên nghiệp cho các cầu thủ bóng rổ tại Việt Nam phát triển
								</h1>
								<p>
									Là giải đấu bóng rổ chuyên nghiệp nhất Việt Nam, VBA quyết tâm đem lại những chương trình huấn luyện
									và đào tạo quốc tế với chất lượng cao nhất cho các cầu thủ địa phương nhằm nâng cao trình độ , chất
									lượng chuyên môn tại giải đấu. Qua đó, trở thành nơi có sức ảnh hưởng và tin tưởng nhất cho các cầu
									thủ Việt Nam trong việc phát triển sự nghiệp cũng như đạt được ước mơ thi đấu tầm cỡ quốc tế trong
									tương lai.
								</p>
							</div>
						</div>
						<div className='py-6 grid grid-cols-2 gap-14'>
							<div className='text-center grid grid-rows-3'>
								<div className=' w-full flex justify-center'>
									<img
										className='max-w-[84px] max-h-[84px]'
										src='http://api-news.vba.vn/storage/images/003-cardiogram.png'
										alt=''
									/>
								</div>
								<h1 className='font-bold text-2xl'>Xây dựng và phát huy văn hoá bóng rổ tại Việt Nam</h1>
								<p>
									VBA hướng tới việc xây dựng nền văn hóa bóng rổ trên khắp cả nước thông qua việc các đội bóng tham dự
									giải đấu được trải đều trên khắp các tỉnh thành từ Bắc tới Nam. Cùng với các hoạt động, phong cách
									riêng biệt của từng đội bóng & vận động viên, giải đấu mang nền văn hoá bóng rổ hiện đại, năng động,
									đồng đội và tích cực vào lối sống hằng ngày của thế hệ trẻ.
								</p>
							</div>
							<div className='text-center grid grid-rows-3'>
								<div className=' w-full flex justify-center'>
									<img
										className='max-w-[84px] max-h-[84px]'
										src='http://api-news.vba.vn/storage/images/004-cardiogram.png'
										alt=''
									/>
								</div>
								<h1 className='font-bold text-2xl'>Đem những điều tốt đẹp và giá trị nhân văn cho cộng đồng</h1>
								<p>
									Thông qua VBA Cares, giải đấu hứa hẹn sẽ tận dụng tiềm năng và sức mạnh của bóng rổ để chung tay phát
									triển cộng đồng qua những hành động ý nghĩa. Hơn hết, VBA hướng đến nâng cao lối sống lành mạnh của
									giới trẻ, góp phần phát triển đất nước.
								</p>
							</div>
						</div>
					</div>
				</div>
				<Footer></Footer>
			</ContentWrapper>
		</>
	);
};
