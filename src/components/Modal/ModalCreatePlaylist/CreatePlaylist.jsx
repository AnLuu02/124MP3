import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { notifyError, notifySuccess } from "../../../utils/toastifyMessage";
import { db } from "../../FireBase/firebaseConfig";
import { handleHideModal } from "../../store/ModalReducer/modalReducer";
import styles from "./CreatePlaylist.module.scss";
const cx = classNames.bind(styles);
export default function CreatePlaylist() {
    const [namePlaylist, setNamePlaylist] = useState("");
    const [publicPlaylist, setPublicPlaylist] = useState(false);
    const [randomPlaylist, setRandomPlaylist] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user.user);
    const inputRef = useRef();
    const dispatch = useDispatch();
    const onHideModal = (e) => {
        e.stopPropagation();
        dispatch(handleHideModal());
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000)
        console.log(user);

        return () => clearTimeout(timer)
    }, [loading])

    useEffect(() => {
        inputRef.current.focus()
    })
    const handleCreatePlaylist = async () => {
        try {
            if (!namePlaylist) {
                alert("Vui lòng nhập tên playlist.");

            } else {
                setLoading(true)
                await addDoc(collection(db, 'playlistCollection'), {
                    userId: user?.uid,
                    namePlaylist,
                    publicPlaylist,
                    randomPlaylist,
                    timestamp: new Date()
                });
                onHideModal()
                notifySuccess();
            }
        } catch (e) {
            console.error("Error adding document: ", e);
            notifyError();
        }
    }
    return (
        <div className={cx("createPlaylist")}>
            <div className={cx("header")}>
                <h3>Tạo playlist mới</h3>
                <FontAwesomeIcon className={cx("icon")} icon={faClose} onClick={onHideModal} />
            </div>
            <div className={cx("body")}>
                <div className={cx("inputName")}>
                    <input value={namePlaylist} ref={inputRef} type="text" placeholder="Nhập tên playlist" onChange={e => setNamePlaylist(e.target.value)} />
                </div>
                <div className={cx("statePlaylist")}>
                    <div className={cx("left")}>
                        <h4>Công khai</h4>
                        <p>Mọi người có thể nhìn thấy playlist này</p>
                    </div>
                    <div className={cx("right")}>
                        <div className={cx("toggle-button-demo")}>
                            <input className={cx("toggle", "toggle-ios")} id="toggle" type="checkbox" checked={publicPlaylist} onChange={() => setPublicPlaylist(!publicPlaylist)} />
                            <label className={cx("toggle-btn")} htmlFor="toggle"></label>
                        </div>
                    </div>
                </div>
                <div className={cx("modePlaylist")}>
                    <div className={cx("left")}>
                        <h4>Phát ngẫu nhiên</h4>
                        <p>Luôn phát ngẫu nhiên tất cả bài hát</p>
                    </div>
                    <div className={cx("right")}>
                        <div className={cx("toggle-button-demo")}>
                            <input className={cx("toggle", "toggle-ios")} id="toggle1" type="checkbox" checked={randomPlaylist} onChange={() => setRandomPlaylist(!randomPlaylist)} />
                            <label className={cx("toggle-btn")} htmlFor="toggle1"></label>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handleCreatePlaylist} className={cx({ "active": loading })} disabled={loading}>
                Tạo mới
                {loading &&
                    <Spinner animation="border" role="status" style={{ width: 20, height: 20, position: "absolute", left: "30%" }}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
            </button>
        </div>
    )
}
CreatePlaylist.propTypes = {}