import { faDiscord, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { faArrowTrendUp, faCircleInfo, faCode, faFileContract, faPhone, faRectangleAd, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { forwardRef } from "react";
import stylesSong from "../../SongItem/Song/Song.module.scss";
import stylesSongFull from "../../SongItem/SongOptions/SongOptions.module.scss";

import styles from './MenuSetting.module.scss';
import MenuSettingHeader from './MenuSettingHeader';

import MenuSettingItem from "./MenuSettingItem";
const cx = classNames.bind(styles);
const cxSongFull = classNames.bind(stylesSongFull);
const cxSong = classNames.bind(stylesSong);

const subMenuSettingItemData = [
    {
        leftIcon: faFacebook,
        title: "Facebook"
    }, {
        leftIcon: faDiscord,
        title: "Discord"
    }, {
        leftIcon: faCode,
        title: "Mã nhúng"
    }
]
const MenuSettingItemData = [
    {
        leftIcon: faCircleInfo,
        title: "Giới thiệu",
        rightIcon: faArrowTrendUp
    },
    {
        leftIcon: faFileContract,
        title: "Thỏa thuận sử dụng",
        rightIcon: faArrowTrendUp

    },
    {
        leftIcon: faShieldHalved,
        title: "Chính sách bảo mật",
        rightIcon: faArrowTrendUp

    },
    {
        leftIcon: faFlag,
        title: "Báo cáo vi phạm",
        rightIcon: faArrowTrendUp

    },
    {
        leftIcon: faRectangleAd,
        title: "Quảng cáo",
        rightIcon: faArrowTrendUp

    },
    {
        leftIcon: faPhone,
        title: "Liên hệ",
        rightIcon: faArrowTrendUp

    }
]
const MenuSetting = forwardRef(function MenuSetting({ children, valueMenu }, ref) {
    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <div className={cx('wrapper', 'menu-popper')}>
                <MenuSettingHeader valueMenu={valueMenu} />
                <hr />
                <div className={cx("menu")}>
                    {MenuSettingItemData.map((item, index) => (
                        <MenuSettingItem className={cx("menu-item-custom")} key={index} data={item} />
                    ))}
                </div>
            </div>
        </div>
    );


    return (
        <Tippy
            interactive
            delay={[0, 100]}
            placement='bottom-start'
            render={renderResult}
            trigger="click"
            zIndex={105}
            onShow={() => {
                if (Array.isArray(ref)) {
                    ref.filter((item) => {
                        if (item?.current) {
                            item?.current?.classList?.add(cxSongFull("showMenu"));
                            item?.current?.classList?.add(cxSong("showMenu"));
                        }
                    })
                }

            }}
            onHide={() => {
                if (Array.isArray(ref)) {
                    ref.filter((item) => {
                        if (item?.current) {
                            if (item?.current?.classList?.contains(cxSongFull("showMenu"))) {
                                item?.current?.classList?.remove(cxSongFull("showMenu"));
                            }
                            if (item?.current?.classList?.contains(cxSong("showMenu"))) {
                                item?.current?.classList?.remove(cxSong("showMenu"));
                            }
                        }
                    })
                }
            }}
        >
            {children}
        </Tippy>
    );
})



MenuSetting.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    valueMenu: PropTypes.object,
    placement: PropTypes.string
};

export default MenuSetting;
