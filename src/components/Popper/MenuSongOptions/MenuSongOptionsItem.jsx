import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './MenuSongOptions.module.scss';

const cx = classNames.bind(styles);

function MenuSongOptionsItem({ item }) {
    return (
        <>
            <div className={cx("menu-item")} >
                {item?.leftIcon && <FontAwesomeIcon className={cx("icon")} icon={item?.leftIcon} />}
                <span>{item?.title}</span>
                {item?.rightIcon && <FontAwesomeIcon className={cx("icon", "icon_sub_menu")} icon={item?.rightIcon} />}
            </div>

        </>
    );
}

MenuSongOptionsItem.propTypes = {
    item: PropTypes.object,
    dataSong: PropTypes.object,

};

export default MenuSongOptionsItem;
