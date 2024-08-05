import classNames from "classnames/bind"
import styles from "./SongDetails.module.scss"
const cx = classNames.bind(styles)


export function SongDetails() {
    return (
        <>
            <h1 className={cx("custom")}>Song details</h1>
        </>
    )
} 