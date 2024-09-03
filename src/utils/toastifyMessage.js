import { toast } from "react-toastify";

export const notifySuccess = (options) => {
    toast.success("Success!" ?? options.message, {
        autoClose: options?.autoClose ?? 2000,
        hideProgressBar: options?.hideProgressBar ?? false,
        closeOnClick: options?.closeOnClick ?? true,
        pauseOnHover: options?.pauseOnHover ?? true,
        draggable: options?.draggable ?? true,
        progress: options?.draggable ?? undefined,
    });
};
export const notifyError = (options) => {
    toast.error(options.message ?? 'Error notification!', {
        autoClose: options?.autoClose ?? 3000,
        hideProgressBar: options?.hideProgressBar ?? false,
        closeOnClick: options?.closeOnClick ?? true,
        pauseOnHover: options?.pauseOnHover ?? true,
        draggable: options?.draggable ?? true,
        progress: options?.draggable ?? undefined,
    });
};

export const notifyInfo = (options) => {
    toast.info(options?.message ?? 'Info notification!', {
        autoClose: options?.autoClose ?? 3000,
        hideProgressBar: options?.hideProgressBar ?? false,
        closeOnClick: options?.closeOnClick ?? true,
        pauseOnHover: options?.pauseOnHover ?? true,
        draggable: options?.draggable ?? true,
        progress: options?.draggable ?? undefined,
    });
};

export const notifyWarning = (options) => {
    toast.warn(options?.message ?? 'Warning notification!', {
        autoClose: options?.autoClose ?? 3000,
        hideProgressBar: options?.hideProgressBar ?? false,
        closeOnClick: options?.closeOnClick ?? true,
        pauseOnHover: options?.pauseOnHover ?? true,
        draggable: options?.draggable ?? true,
        progress: options?.draggable ?? undefined,
    });
};