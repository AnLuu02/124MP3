import { toast } from 'react-toastify';

let currentToast = {
    success: null,
    error: null,
    info: null,
    warning: null,
};

const showToast = (type, options) => {
    if (currentToast[type]) {
        toast.dismiss(currentToast[type]);
    }

    currentToast[type] = toast[type](options?.message ?? `${type.charAt(0).toUpperCase() + type.slice(1)} notification!`, {
        autoClose: options?.autoClose ?? 3000,
        hideProgressBar: options?.hideProgressBar ?? false,
        closeOnClick: options?.closeOnClick ?? true,
        pauseOnHover: options?.pauseOnHover ?? true,
        draggable: options?.draggable ?? true,
        progress: options?.progress ?? undefined,
    });
};

export const notifySuccess = (options) => {
    showToast('success', options);
};

export const notifyError = (options) => {
    showToast('error', options);
};

export const notifyInfo = (options) => {
    showToast('info', options);
};

export const notifyWarning = (options) => {
    showToast('warn', options);
};