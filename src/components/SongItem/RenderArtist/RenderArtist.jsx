import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import styles from "./RenderArtist.module.scss";
const cx = classNames.bind(styles);

export default function RenderArtist({ dataArtist, role, classNames }) {
    console.log(classNames);
    const dataArtistsFilter = () => {
        return role ? dataArtist?.filter((a) => a.role === role) : dataArtist
    }
    return (
        <div className={cx("nameArtist", classNames)} >
            {
                dataArtistsFilter()?.length > 0 ? dataArtistsFilter()?.map((a, index) => {
                    return (
                        <NavLink key={index} to={`/artist/${a.name}`} style={{ color: 'unset' }}>
                            <p>{a.name}{index == dataArtistsFilter()?.length - 1 ? "" : ","} </p>
                        </NavLink>
                    )
                }) : ""}
        </div>
    )
}

RenderArtist.propTypes = {
    dataArtist: PropTypes.array,
    classNames: PropTypes.string,
    role: PropTypes.string
};