import { faShuffle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Skeleton } from '@mui/material';
import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from "./AlbumItemCircle.module.scss";
const cx = classNames.bind(styles);

function AlbumItemCircle({ data, loading, isFollowed }) {
    return (
        <>
            <li key={data?.id} className={cx("widgetItemCircle")}>
                <div className={cx("content")}>
                    {loading
                        ?
                        <div className={cx("thumbnail_skeleton")}>
                            <Skeleton variant="circular" animation="wave" sx={{ bgcolor: 'grey.800' }} width="100%" height="100%" />
                        </div>
                        :
                        <>
                            <div className={cx("thumbnail")}>
                                <img src={data?.profileImage} alt="" />
                            </div>

                            <div className={cx("hover_playlist")}>
                                <div className={cx("circleIcon")}>
                                    <FontAwesomeIcon icon={faShuffle} className={cx("icon")} />
                                </div>
                            </div>
                        </>
                    }
                </div>
                {loading
                    ?
                    <Skeleton variant="text" width={150} height={30} sx={{ bgcolor: 'grey.700' }} />
                    :
                    <NavLink to={`/artist/${data?.name}`} style={{ color: 'unset' }}>
                        <div className={cx("name_artist")}>{data?.name}</div>
                    </NavLink>}

                {!isFollowed ?
                    loading
                        ?
                        <Skeleton variant="text" width={70} height={30} sx={{ bgcolor: 'grey.700' }
                        } />
                        :
                        <div className={cx("care_artist")} >
                            <div className={cx("quantityCare")}>{data?.followers}</div>
                            <div> quan tâm</div>
                        </div>
                    : ""
                }
                {!isFollowed ?
                    loading ?
                        <Skeleton variant="text" width={120} height={30} sx={{ bgcolor: 'grey.700' }} />
                        : <div className={cx("follow_artist")} >
                            <FontAwesomeIcon icon={faUserPlus} className={cx("icon")} />
                            <div>QUAN TÂM</div>
                        </div>
                    : ""}
            </li>
        </>
    );
}
AlbumItemCircle.propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool
};
export default AlbumItemCircle;