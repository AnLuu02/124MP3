import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { memo } from "react";
import { NavLink } from "react-router-dom";
import styles from "./RenderArtist.module.scss";
const cx = classNames.bind(styles);

function RenderArtist({ dataArtist, role, classNames }) {
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

const memoRenderArtist = memo(RenderArtist);
memoRenderArtist.displayName = 'RenderArtist';
export default memoRenderArtist;