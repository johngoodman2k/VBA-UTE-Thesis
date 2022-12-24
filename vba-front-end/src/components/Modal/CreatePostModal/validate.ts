import validator from 'validator';
import toastNotify from '../../../utils/toast';



export const validate = (name:string,tinydes:string,description:string,image?:File) => {
	const namePost = validator.isEmpty(name);
	if (namePost) {
		toastNotify('Vui lòng nhập tên bài viết', 'error');
		return false;
	}

	if (!image) {
        toastNotify("Please choose your player image", "error");
        return false;
    }
	
	return {
		name,
		tinydes,
		description,
		image
	};
};

export default validate;
