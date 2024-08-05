import { faArrowTrendUp, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [hintSearch, setHintSearch] = useState([]);
    const [showListSearch, setShowListSearch] = useState(false);
    const navigate = useNavigate();

    const inputRef = useRef();

    const chooseItemSearch = e => {
        e.preventDefault();
        // console.log(e.target.textContent);
        // if (e.target.closest(".music")) {
        //     console.log(e.target.textContent);
        // }
    }

    // const { get } = useFetch(
    //     "https://jsonplaceholder.typicode.com/"
    // );

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
            }
        }
        inputRef.current.addEventListener("keydown", handleEnterSearch);
        return () => {
            inputRef.current?.removeEventListener("keydown", handleEnterSearch);
        }
    })

    return (
        <div className={cx("search")}>
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
                    <FontAwesomeIcon onClick={() => { setSearchValue(''); inputRef.current.focus() }} id={cx("delSearch")} className={cx("same-icon-input")} icon={faXmark} />
                    :
                    ""
            }
            <div onMouseDown={chooseItemSearch} className={cx("same_list_music", "listSearch")} id={cx("listSearch")} style={{ display: (showListSearch ? "block" : "none") }}>
                <div className={cx("list_music_render")} >
                    {searchValue
                        ?
                        <div className={cx("titleSearch")}>Từ khóa liên quan</div>
                        :
                        <div className={cx("titleSearch")}>Đề xuất cho bạn</div>}


                    <ul className={cx("music")}>
                        <NavLink key={1} to={`/tim-kiem/tat-ca?q=nhạc tết`} style={{ color: "#fff" }}>

                            <li>
                                <FontAwesomeIcon className={cx("icon")} icon={faArrowTrendUp} />
                                nhạc tết
                            </li>

                        </NavLink>
                        <NavLink key={2} to={`/tim-kiem/tat-ca?q=nhạc tết`} style={{ color: "#fff" }}>

                            <li>
                                <FontAwesomeIcon className={cx("icon")} icon={faArrowTrendUp} />
                                nhạc tết
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
        </div >
    );
}

export default Search;
