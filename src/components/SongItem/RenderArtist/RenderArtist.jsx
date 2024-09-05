import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import styles from "./RenderArtist.module.scss";
const cx = classNames.bind(styles);

export default function RenderArtist({ dataArtist, classNames }) {
    return (
        <div className={cx("nameArtist", classNames)} >
            {dataArtist?.length > 0 ? dataArtist?.map((a, index) => {
                return (
                    <NavLink key={index} to={`/artist/${a.name}`} style={{ color: 'unset' }}>
                        <p>{a.name}{index == dataArtist?.length - 1 ? "" : ","} </p>
                    </NavLink>
                )
            }) : "Sơn Từng MaaaaaaaaaaaaaaaaaaaaaaaaTP.dddddddddd"}
        </div>
    )
}

RenderArtist.propTypes = {
    dataArtist: PropTypes.array,
    classNames: PropTypes.string
};