import classNames from "classnames/bind";
import Loader4Doc from "../../../components/Loader1/Loader4Doc";
import styles from "./LoadingContainer.module.scss";
const cx = classNames.bind(styles);

export default function LoadingContainer() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("box")}>
                <div className={cx("doc_container")}>
                    <i>A</i>
                    <i>U</i>
                    <i>T</i>
                    <i>H</i>
                    <i>E</i>
                    <i>N</i>
                    <i>T</i>
                    <i>I</i>
                    <i>C</i>
                    <i>A</i>
                    <i>T</i>
                    <i>I</i>
                    <i>O</i>
                    <i>N</i>
                </div>
                <Loader4Doc />
            </div>
        </div>
    );
}