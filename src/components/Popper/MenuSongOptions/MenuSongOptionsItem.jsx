import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { notifyError, notifySuccess } from '../../../utils/toastifyMessage';
import styles from './MenuSongOptions.module.scss';

const cx = classNames.bind(styles);

function MenuSongOptionsItem({ item, dataSong }) {

    const handleCopy = (link) => {
        navigator.clipboard.writeText(link)
            .then(() => {
                notifySuccess({ message: "Sao chép link thành công." });
            })
            .catch((error) => {
                notifyError({ message: "Sao chép link thất bại" + error });
            });
    };

    const baseUrl = import.meta.env.VITE_BASE_URL;

    return (
        <>
            <div className={cx("menu-item")}
                onClick={
                    () => item?.type === "copyLink" && handleCopy(`${baseUrl}album/${dataSong?.name}`)
                }
            >
                {item?.leftIcon && <FontAwesomeIcon className={cx("icon")} icon={item?.leftIcon} />}
                <span>{item?.title}</span>
                {item?.rightIcon && <FontAwesomeIcon className={cx("icon", "icon_sub_menu")} icon={item?.rightIcon} />}
            </div >

        </>
    );
}

MenuSongOptionsItem.propTypes = {
    item: PropTypes.object,
    dataSong: PropTypes.object,

};

export default MenuSongOptionsItem;
