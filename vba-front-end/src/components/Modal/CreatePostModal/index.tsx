import React, { useState, useEffect } from 'react';
import styles from './modalAddPost.module.scss';
import classNames from 'classnames/bind';
import { ModalBlock } from '../ModalBlock';
import { vbaContext } from '../../../Services/services';
import { ReactComponent as Close } from '../../../assets/svg/close-com.svg';
import validate from './validate';
import toastNotify from '../../../utils/toast';
import { Player, Post } from '../../../Services/models';
import { checkDuplicateObject } from '../../../utils/checker';
import ReactFlagsSelect from "react-flags-select";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const imageMimeType = /image\/(png|jpg|jpeg)/i;

const cx = classNames.bind(styles);
const teamServices = vbaContext.getTeamServices();
const getPostServices = vbaContext.getPostServices();

type createPostModal = {
	title: string;
	handleCloseModal?: () => void;
	postId?: string;
	post?: Post;
	setReload?: React.Dispatch<React.SetStateAction<boolean>>;
	reload?: boolean;
};
export const CreatePostModal = (props: createPostModal) => {
	const [fileDataURL, setFileDataURL] = useState<any>(null);
	const [file, setFile] = useState<File | undefined>();
	const [countrySelected, setCountrySelected] = useState("");
	const [editorDesciption, setEditorDescription] = useState("");


	const modules = {
		toolbar: ['bold', 'italic', 'underline', 'link', { list: 'ordered' }, { list: 'bullet' }, { color: [] }]
	};
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


	const handleCreateOrEditPost = async (e: any) => {
		e.preventDefault();
		// console.log(96, props.postId)

		const name = e.target.name.value
		const tinydes = e.target.tinydes.value
		const des = editorDesciption
		const image = file
		const validata = validate(name, tinydes,des, image)


		try {
			if (validata) {
				const formData = new FormData()
				formData.append("name", validata.name)
				formData.append("tinydes", validata.tinydes)
				formData.append("description", validata.description)
				formData.append("image", validata.image)
				if (props.post && props.post.id) {
					if (checkDuplicateObject(props.post, validata)) {
						toastNotify('Bạn chưa thay đổi nội dung để cập nhật', 'warn');
					} else {
						// const res = await playerServices.updatePlayer(props.post.id, formData as Player);
						toastNotify("Bài viết đã được cập nhật thành công", "success")
					}

				} else {
					formData.append("owner", "1K1-DI-HD4wKhSWNbkEak-0QaS2")
					const res = await getPostServices.createPost(formData as Post);
					toastNotify("Tạo bài viết thành công", "success")

				}
				if (props.setReload)
					props.setReload(!props.reload)
				if (props.handleCloseModal) props.handleCloseModal()
			}
		} catch (e) {
			toastNotify("Create player and add to team failed", "error")
		}
	}

	return (
		<ModalBlock>
			<div className={cx('ModalTitle')}>
				{props.title}
				<div className='ml-auto text-right hover:cursor-pointer'>
					<Close onClick={props.handleCloseModal} className='w-[48px] h-[48px]'></Close>
				</div>
			</div>

			<form onSubmit={handleCreateOrEditPost}>
				<div className='flex flex-row'>
					<div className='basis-4/6 flex flex-wrap'>
						<div className='basis-1/2'>
							<div className={cx('TitleTop')}>Tên bài viết</div>
							<input id={props.title + "_name"} name="name" type='text' className={cx('Input', 'Input__Top')}></input>
						</div>

						<div className='basis-1/2'>
						<div className={cx('TitleTop')}>Mô tả ngắn gọn</div>
							<input id={props.title + "_tinydes"} name="tinydes" type='text' className={cx('Input', 'Input__Top')}></input>
						</div>
                      

						<div className=' mt-1.5 w-full'>
							<div className={cx('TitleTop')}>Mô tả chi tiết</div>
							<ReactQuill
									placeholder='Please enter campaign detail'
									modules={modules}
									value={editorDesciption}
									onChange={setEditorDescription}
									className={cx("ql-container","ql-toolbar")}
								/>						
						</div>

						

						{/* <div className={cx('TitleTop')}>Country</div>
							<input id={props.title+"_country"}  name="country" type='text' className={cx('Input', 'Input__Top', 'Input__Top--oneobject')}></input> */}


					</div>


					<div className='basis-2/6 flex flex-col '>
						<div className={cx('TitleTop')}>Hình ảnh</div>

						<div className='flex flex-col relative mt-4 h-full w-full rounded-md'>
							<div className='w-full h-full bg-white rounded-md'>
								<div className='w-full h-[162px]'>
									<img
										src={
											fileDataURL !== null ? fileDataURL : props.post?.image ? props.post?.image
												: 'https://th.bing.com/th/id/OIP.uQ03KuU1Jb_7HNs_We8__wAAAA?pid=ImgDet&rs=1'

										}
										alt='playerImage'
										className={cx('Input__Preview__Image')}></img>
								</div>
							</div>
							<div className={cx('ImageUploadWrap')}>
								<label className={cx('Input__ButtonLabel')} htmlFor={props.title ?? "upload_player"}>
									Upload image
								</label>
								<input
									id={props.title ?? "upload_player"}
									type='file'
									accept='image/*'
									onChange={onChangeImage}
									className={cx('Input', 'Input__Image')}></input>
								<div className={cx('Input__Preview', 'Input__Preview__TextBlock')}></div>
							</div>
						</div>
					</div>
				</div>
				<div className={cx('ModalFooter')}>
					<button type="submit" className={cx('ModalFooter__ButtonBlock')}>Submit</button>
				</div>
			</form>

		</ModalBlock>
	);
};
