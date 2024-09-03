import classNames from "classnames/bind";
import Loader4Doc from "../../../components/Loader1/Loader4Doc";
import Logo from "../../Sidebar/Logo/Logo";
import styles from "./LoadingContainer.module.scss";
const cx = classNames.bind(styles);

export default function LoadingContainer() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("box")}>
                <div className={cx("doc_container")}>
                    <Logo notMobile={true} />
                </div>
                <Loader4Doc />
            </div>
            <div className={cx("owner")}>
                <div>by</div>
                <i>An Luu</i>
            </div>
        </div>
    );
}