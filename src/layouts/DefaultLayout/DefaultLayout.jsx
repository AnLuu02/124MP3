import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePlaylist from "../../components/Modal/ModalCreatePlaylist/CreatePlaylist.jsx";
import ModalShowDesciptionArtist from "../../components/Modal/ModalShowDesciptionArtist/ModalShowDesciptionArtist.jsx";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute.jsx";
import Video from "../../components/Video/Video.jsx";
import { endedSong, playSong, timeUpdateSong } from "../../components/store/songReducer.js";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header";
import Modal from "../Modal/Modal.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";
import styles from "./DefaultLayout.module.scss";
import LoadingContainer from "./LoadingContainer/LoadingContainer.jsx";


const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const videoRef = useRef();
    const dispatch = useDispatch();
    const song = useSelector(state => state.song.song);
    const currentVolume = useSelector(state => state.song.volume);
    const listSong = useSelector(state => state.listSong.listSong);
    const indexSong = useSelector(state => state.song.indexSong);
    const isPlay = useSelector(state => state.song.isPlay)
    const isRepeat = useSelector(state => state.song.isRepeat)
    const isRandom = useSelector(state => state.song.isRandom)
    const typeModal = useSelector(state => state.modal.type);
    const objData = useSelector(state => state.modal.objData);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        var timer = setTimeout(() => {
            setLoading(false)
        }, 1000)
        return () => {
            clearTimeout(timer);
        }
    }, [])


    useEffect(() => {
        if (videoRef.current) {
            if (isPlay) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [song.name, isPlay]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = currentVolume;
        }
    }, [currentVolume]);

    const handleMusicEnded = useCallback(() => {
        if (isRepeat) {
            dispatch(playSong({ song, indexSong }));
        } else if (isRandom) {
            const randomMusic = listSong[Math.floor(Math.random() * listSong.length)];
            dispatch(playSong({ song: randomMusic, indexSong }));
        } else {
            dispatch(endedSong(song));
        }
    }, [dispatch, isRepeat, isRandom, listSong, song, indexSong]);



    const handleTimeUpDateSong = useCallback(() => {
        if (videoRef.current) {
            dispatch(timeUpdateSong({
                currentTime: videoRef.current.currentTime,
                durationTime: videoRef.current.duration
            }));
        }
    }, [dispatch]);

    const renderModal = useCallback(() => {
        switch (typeModal) {
            case "CREATE_PLAYLIST":
                return <CreatePlaylist />;
            case "SHOW_ALL_DESCRIPTION_ARTIST":
                return <ModalShowDesciptionArtist objData={objData} />;
            default:
                return null;
        }
    }, [typeModal]);

    return (
        loading
            ?
            <LoadingContainer />
            :
            <>
                <div className={cx("wrapper")}>
                    <Video ref={videoRef} src={song ? song.previewUrl : ""} onEnded={() => handleMusicEnded(song)} onTimeUpdate={handleTimeUpDateSong} />
                    <Sidebar />
                    <div className={cx("main_right", song.name ? "hasMusicFixed" : "")}>
                        <main>
                            <Header />
                            <PrivateRoute>{children}</PrivateRoute>
                        </main>
                        <Footer />
                    </div>
                </div>
                <Modal>
                    {renderModal()}
                </Modal>
            </>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;