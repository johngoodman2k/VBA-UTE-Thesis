import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './pictureChoosing.module.scss';
const imageMimeType = /image\/(png|jpg|jpeg)/i;
const cx = classNames.bind(styles);
type PictureChoosingProps = {
	header: string;
};
export const PictureChoosing = (props: PictureChoosingProps) => {
	const [fileDataURL, setFileDataURL] = useState<any>(null);
	const [file, setFile] = useState(null);
	const onChangeImage = (e: any) => {
		const file = e.target.files[0];
		if (!file.type.match(imageMimeType)) return;
		setFile(file);
	};
	useEffect(() => {
		let isCancel = false;
		let fileReader = new FileReader();

		if (file) {
			fileReader.onload = (e: ProgressEvent<FileReader> | null) => {
				if (e && e.target) {
					const { result } = e.target;
					if (e.target.result && !isCancel) {
						setFileDataURL(result);
					}
				}
			};
			fileReader.readAsDataURL(file);
		}
		return () => {
			isCancel = true;
			if (fileReader && fileReader.readyState === 1) {
				fileReader.abort();
			}
		};
	}, [file]);
	return (
		<div className=''>
			<div className={cx('TitleTop')}>{props.header}</div>

			<div className='flex flex-col relative mt-4 h-full w-full rounded-md'>
				<div className='w-full h-full bg-white rounded-md'>
					<div className='w-full h-[162px]'>
						<img
							src={
								fileDataURL === null
									? 'https://th.bing.com/th/id/OIP.uQ03KuU1Jb_7HNs_We8__wAAAA?pid=ImgDet&rs=1'
									: fileDataURL
							}
							alt='playerImage'
							className={cx('Input__Preview__Image')}></img>
					</div>
				</div>
				<div className={cx('ImageUploadWrap')}>
					<label className={cx('Input__ButtonLabel')} htmlFor='upload'>
						Upload image
					</label>
					<input
						id='upload'
						type='file'
						accept='image/*'
						onChange={onChangeImage}
						className={cx('_Input', '_Input__Image')}></input>
					<div className={cx('Input__Preview', 'Input__Preview__TextBlock')}></div>
				</div>
			</div>
		</div>
	);
};
