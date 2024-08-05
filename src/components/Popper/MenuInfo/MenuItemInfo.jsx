import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './MenuInfo.module.scss';

const cx = classNames.bind(styles);

function MenuItemInfo({ data, className, onClick = function () { } }) {
    return (
        <div className={cx("menu-item", className)} onClick={onClick}>
            {data.leftIcon && <FontAwesomeIcon className={cx("icon")} icon={data.leftIcon} />}
            <span>{data.title}</span>
            {data.rightIcon && <FontAwesomeIcon className={cx("icon", "icon_sub_menu")} icon={data.rightIcon} />}
        </div>
    );
}

MenuItemInfo.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,

    className: PropTypes.string
};

export default MenuItemInfo;
