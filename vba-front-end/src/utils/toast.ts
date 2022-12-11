import { toast, ToastOptions } from "react-toastify";

const toastNotify = (content: string | undefined, value: string) => {
    const adjust: ToastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };
    switch (value) {
        case "error":
            return toast.error(content, adjust);
        case "success":
            return toast.success(content, adjust);
        case "warn":
            return toast.warn(content, adjust);
    }
};
export default toastNotify;
