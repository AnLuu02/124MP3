import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./SongSkeleton.module.scss";
const cx = classNames.bind(styles);

function SongSkeleton() {
    return (
        <ul className={cx("music", "listSongRender")}>
            <li className={cx("song", classNames,)} >
                <div className={cx("contentSong")}>
                    <div className={cx("skeleton_image")}></div>
                    <div className={cx("desSong")}>
                        <Skeleton sx={{ bgcolor: 'grey.400' }} />
                        <Skeleton width="60%" sx={{ bgcolor: 'grey.400' }} />
                    </div>
                </div>
            </li >
            <li className={cx("song", classNames,)} >
                <div className={cx("contentSong")}>
                    <div className={cx("skeleton_image")}></div>
                    <div className={cx("desSong")}>

                        <Skeleton sx={{ bgcolor: 'grey.400' }} />
                        <Skeleton width="60%" sx={{ bgcolor: 'grey.400' }} />
                    </div>
                </div>
            </li >
            <li className={cx("song", classNames,)} >
                <div className={cx("contentSong")}>
                    <div className={cx("skeleton_image")}></div>
                    <div className={cx("desSong")}>

                        <Skeleton sx={{ bgcolor: 'grey.400' }} />
                        <Skeleton width="60%" sx={{ bgcolor: 'grey.400' }} />
                    </div>
                </div>
            </li >
            <li className={cx("song", classNames,)} >
                <div className={cx("contentSong")}>
                    <div className={cx("skeleton_image")}></div>
                    <div className={cx("desSong")}>

                        <Skeleton sx={{ bgcolor: 'grey.400' }} />
                        <Skeleton width="60%" sx={{ bgcolor: 'grey.400' }} />
                    </div>
                </div>
            </li >
            <li className={cx("song", classNames,)} >
                <div className={cx("contentSong")}>
                    <div className={cx("skeleton_image")}></div>
                    <div className={cx("desSong")}>

                        <Skeleton sx={{ bgcolor: 'grey.400' }} />
                        <Skeleton width="60%" sx={{ bgcolor: 'grey.400' }} />
                    </div>
                </div>
            </li >
            <li className={cx("song", classNames,)} >
                <div className={cx("contentSong")}>
                    <div className={cx("skeleton_image")}></div>
                    <div className={cx("desSong")}>

                        <Skeleton sx={{ bgcolor: 'grey.400' }} />
                        <Skeleton width="60%" sx={{ bgcolor: 'grey.400' }} />
                    </div>
                </div>
            </li >
            <li className={cx("song", classNames,)} >
                <div className={cx("contentSong")}>
                    <div className={cx("skeleton_image")}></div>
                    <div className={cx("desSong")}>

                        <Skeleton sx={{ bgcolor: 'grey.400' }} />
                        <Skeleton width="60%" sx={{ bgcolor: 'grey.400' }} />
                    </div>
                </div>
            </li >
            <li className={cx("song", classNames,)} >
                <div className={cx("contentSong")}>
                    <div className={cx("skeleton_image")}></div>
                    <div className={cx("desSong")}>

                        <Skeleton sx={{ bgcolor: 'grey.400' }} />
                        <Skeleton width="60%" sx={{ bgcolor: 'grey.400' }} />
                    </div>
                </div>
            </li >
            <li className={cx("song", classNames,)} >
                <div className={cx("contentSong")}>
                    <div className={cx("skeleton_image")}></div>
                    <div className={cx("desSong")}>

                        <Skeleton sx={{ bgcolor: 'grey.400' }} />
                        <Skeleton width="60%" sx={{ bgcolor: 'grey.400' }} />
                    </div>
                </div>
            </li >
        </ul >

    );
}


export default SongSkeleton;