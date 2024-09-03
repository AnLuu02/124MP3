import { faUikit } from '@fortawesome/free-brands-svg-icons';
import { faAngleRight, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './MenuSetting.module.scss';
import MenuSettingItem from "./MenuSettingItem";
const cx = classNames.bind(styles);
const subMenuHeaderItemData = [
    {
        leftIcon: faCirclePlay,
        title: "Trình phát nhạc",
        rightIcon: faAngleRight
    },
    {
        leftIcon: faUikit,
        title: "Giao diện",
        rightIcon: faAngleRight

    },
]
function MenuSettingsHeader() {
    const renderSubResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <div className={cx('wrapper', 'menu-popper')}>
                <div className={cx("menu")}>
                    <li>111111111111</li>
                    <li>111111111111</li>
                    <li>111111111111</li>
                </div>

            </div>
        </div>
    );
    return (
        <header className={cx('header')}>
            <div className={cx("menu")}>
                {subMenuHeaderItemData.map((item, index) => (
                    <Tippy
                        key={index + 1}
                        interactive
                        delay={[0, 100]}
                        placement="right-end"
                        render={renderSubResult}
                        offset={[0, -10]}
                    >
                        <MenuSettingItem className={cx("menu-item-custom")} key={index} data={item} />
                    </Tippy>

                ))}
            </div>
        </header>
    );
}

MenuSettingsHeader.propTypes = {
    valueMenu: PropTypes.object
};

export default MenuSettingsHeader;
