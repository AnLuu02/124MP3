import { faArrowTrendUp, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import { setStateSearchBox } from '../store/mobileReducer';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [showListSearch, setShowListSearch] = useState(false);
    const dispatch = useDispatch();

    //mobile
    const isShowSearchBox = useSelector(state => state.mobile.isShowSearchBox);
    const handleHideSearchBox = () => {
        dispatch(setStateSearchBox(false));
    }
    const navigate = useNavigate();

    const inputRef = useRef();
    const inputRefMobile = useRef();
    let currentInputValue = inputRef.current ?? inputRefMobile.current;


    const chooseItemSearch = e => {
        e.preventDefault();
        setShowListSearch(false);
        setSearchValue("");
        currentInputValue.blur();

    }

    // const { get }  = useFetch(import.meta.env.VITE_API_BASE_URL);

    // const fetchApiHintSearch = async () => {
    //     const result = await get("posts");
    //     setHintSearch(result);
    // };

    const handleFocusInput = () => {
        // fetchApiHintSearch();
        setShowListSearch(true)
    }

    useEffect(() => {
        const handleEnterSearch = e => {
            if (e.keyCode === 13) {
                navigate(`/tim-kiem/tat-ca?q=${searchValue}`);
                setShowListSearch(false);
                setSearchValue("");
                currentInputValue.blur();

            }
        }
        currentInputValue?.addEventListener("keydown", handleEnterSearch);
        return () => {
            currentInputValue?.removeEventListener("keydown", handleEnterSearch);
        }
    })


    return (
        <>
            <ScrollToTop />
            <div className={cx("search")}>
                <div className={cx("searchBox", "searchBoxMain")}>
                    <div className={cx("searchInput")}>
                        <input
                            ref={inputRef}
                            value={searchValue}
                            autoComplete='off'
                            id={cx("searchInput")}
                            placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát,..."
                            onChange={e => setSearchValue(e.target.value)}
                            onFocus={handleFocusInput}
                            onBlur={() => setShowListSearch(false)}
                        />
                        <label htmlFor="searchInput">
                            <FontAwesomeIcon style={{ fontSize: 23 }} icon={faSearch} />
                        </label>
                        {
                            searchValue
                                ?
                                <div className={cx("icon_delete_input")}>

                                    <FontAwesomeIcon onClick={() => { setSearchValue(''); inputRef.current.focus() }} className={cx("icon")} icon={faXmark} />
                                </div>
                                :
                                ""
                        }
                    </div>
                    <div onMouseDown={chooseItemSearch} className={cx("listSearch")} style={{ display: (showListSearch ? "block" : "none") }}>
                        <div className={cx("list_music_render")} >
                            {searchValue
                                ?
                                <div className={cx("titleSearch")}>Từ khóa liên quan</div>
                                :
                                <div className={cx("titleSearch")}>Đề xuất cho bạn</div>}

                            <ul className={cx("music")}>
                                <NavLink key={1} to={`/tim-kiem/tat-ca?q=nhạc tết`} style={{ color: "#fff" }} >
                                    <li>
                                        <FontAwesomeIcon className={cx("icon")} icon={faArrowTrendUp} />
                                        anh trai say hi
                                    </li>
                                </NavLink>
                                <NavLink key={2} to={`/tim-kiem/tat-ca?q=nhạc tết`} style={{ color: "#fff" }} >
                                    <li>
                                        <FontAwesomeIcon className={cx("icon")} icon={faArrowTrendUp} />
                                        anh trai vượt ngàn chông gai
                                    </li>
                                </NavLink>
                                <NavLink key={3} to={`/tim-kiem/tat-ca?q=nhạc tết`} style={{ color: "#fff" }} >
                                    <li>
                                        <FontAwesomeIcon className={cx("icon")} icon={faArrowTrendUp} />
                                        là tại anh sai
                                    </li>
                                </NavLink>
                                <NavLink key={4} to={`/tim-kiem/tat-ca?q=nhạc tết`} style={{ color: "#fff" }} >
                                    <li>
                                        <FontAwesomeIcon className={cx("icon")} icon={faArrowTrendUp} />
                                        vừa hận vừa yêu
                                    </li>
                                </NavLink>
                                <NavLink key={5} to={`/tim-kiem/tat-ca?q=nhạc tết`} style={{ color: "#fff" }} >
                                    <li>
                                        <FontAwesomeIcon className={cx("icon")} icon={faArrowTrendUp} />
                                        mộng yu
                                    </li>
                                </NavLink>
                                <NavLink key={6} to={`/tim-kiem/tat-ca?q=nhạc tết`} style={{ color: "#fff" }} >
                                    <li>
                                        <FontAwesomeIcon className={cx("icon")} icon={faArrowTrendUp} />
                                        #124Mp3chart
                                    </li>
                                </NavLink>
                                {/* {searchValue
                    ?
                    <li>
                        <FontAwesomeIcon className={cx("icon")} icon={faSearch} />
                        Tìm kiếm <q>{searchValue}</q>
                    </li>
                    :
                    hintSearch.length ? hintSearch.map((item, index) => {
                        return (
                            <NavLink key={index} to={`/tim-kiem/tat-ca?q=nhạc tết`} style={{ color: "#fff" }}>

                                <li>
                                    <FontAwesomeIcon className={cx("icon")} icon={faArrowTrendUp} />
                                    nhạc tết
                                </li>

                            </NavLink>)
                    }) : ""
                } */}

                            </ul>
                        </div>
                    </div>
                </div>
            </div >

            <div className={cx("searchBoxMobile", isShowSearchBox ? "active" : "")}>
                <div className={cx("search", "mobile")} >
                    <div className={cx("searchBox")}>
                        <div className={cx("searchInput")}>
                            <input
                                ref={inputRefMobile}
                                value={searchValue}
                                autoComplete='off'
                                id={cx("searchInput")}
                                placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát,..."
                                onChange={e => setSearchValue(e.target.value)}
                                onFocus={handleFocusInput}
                                onBlur={() => setShowListSearch(false)}
                            />
                            <label htmlFor="searchInput">
                                <FontAwesomeIcon style={{ fontSize: 23 }} icon={faSearch} />
                            </label>
                            {
                                searchValue
                                    ?
                                    <div className={cx("icon_delete_input")}>

                                        <FontAwesomeIcon onClick={() => { setSearchValue(''); inputRefMobile.current.focus() }} className={cx("icon")} icon={faXmark} />
                                    </div>
                                    :
                                    ""
                            }
                        </div>

                        <div onMouseDown={chooseItemSearch} className={cx("listSearch")} style={{ display: "block" }}>
                            <div className={cx("list_music_render")} >
                                {searchValue
                                    ?
                                    <div className={cx("titleSearch")}>Từ khóa liên quan</div>
                                    :
                                    <div className={cx("titleSearch")}>Đề xuất cho bạn</div>}

                                <ul className={cx("music")}>
                                    {[1, 2].map((item, index) => {
                                        return (<NavLink key={index} to={`/tim-kiem/tat-ca?q=nhạc tết${item + index + "An"}`} style={{ color: "#fff" }} onClick={handleHideSearchBox}>

                                            <li>
                                                <FontAwesomeIcon className={cx("icon")} icon={faArrowTrendUp} />
                                                nhạc tết {item}
                                            </li>

                                        </NavLink>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className={cx("overlay", isShowSearchBox ? "active" : "")} onClick={handleHideSearchBox}></div>

        </>
    );
}



export default Search;
