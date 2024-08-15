import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePlaylist from "../../components/Modal/ModalCreatePlaylist/CreatePlaylist.jsx";
import ModalShowDesciptionArtist from "../../components/Modal/ModalShowDesciptionArtist/ModalShowDesciptionArtist.jsx";
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
    const dispath = useDispatch();
    const song = useSelector(state => state.song.song);
    const currentVolume = useSelector(state => state.song.volume);
    const listSong = useSelector(state => state.listSong.listSong);
    const indexSong = useSelector(state => state.song.indexSong);
    const isPlay = useSelector(state => state.song.isPlay)
    const isRepeat = useSelector(state => state.song.isRepeat)
    const isRandom = useSelector(state => state.song.isRandom)
    const typeModal = useSelector(state => state.modal.type);


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
        if (isPlay) {
            videoRef?.current?.play();
        }
        else {
            videoRef?.current?.pause();
        }
    }, [song.name, isPlay])
    useEffect(() => {
        if (videoRef && videoRef.current) {
            videoRef.current.volume = currentVolume;
        }
    }, [currentVolume])
    const handleMusicEnded = song => {
        if (isRepeat) {
            dispath(playSong({ song: song, indexSong: indexSong }));
        }
        else if (isRandom) {
            const randomMusic = listSong[Math.floor(Math.random() * listSong.length)];
            dispath(playSong({ song: randomMusic, indexSong: indexSong }));
        }
        else {
            dispath(endedSong(song));
        }
    }


    const handleTimeUpDateSong = () => {
        dispath(timeUpdateSong({ currentTime: videoRef.current.currentTime, durationTime: videoRef.current.duration }))
    }

    function renderModal() {
        if (typeModal === "CREATE_PLAYLIST") {
            return <CreatePlaylist />
        }
        if (typeModal === "SHOW_ALL_DESCRIPTION_ARTIST") {
            return <ModalShowDesciptionArtist />
        }
    }

    return (
        loading
            ?
            <LoadingContainer />
            :
            <>
                <div className={cx("wrapper")}>
                    <Video ref={videoRef} src={song ? song.src : ""} onEnded={() => handleMusicEnded(song)} onTimeUpdate={handleTimeUpDateSong} />
                    <Sidebar />
                    <div className={cx("main_right")}>
                        <main>
                            <Header />
                            {children}
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