import { faMagnifyingGlass, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import useDebounce from '../../Custom hooks/useDebounce';
import useFetch from '../../Custom hooks/useFetch';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showListSearch, setShowListSearch] = useState(false);
    const [loading, setLoading] = useState(false);


    function chooseItemSearch(e) {
        e.preventDefault();
        if (e.target.closest(".music")) {
            console.log(e.target.textContent);
        }
    }

    const debouncedValue = useDebounce(searchValue, 800);
    const { get } = useFetch(
        "https://jsonplaceholder.typicode.com/"
    );

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            setShowListSearch(false);
            setLoading(false);
            return;
        }
        setShowListSearch(true);
        setLoading(true);
        const fetchApi = async () => {
            setLoading(true);
            const result = await get("posts");
            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

    return (
        <div className={cx("search")}>
            <input
                value={searchValue}
                autoComplete='off'
                id={cx("searchInput")}
                placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát,..."
                onBlur={() => setShowListSearch(false)}
                onFocus={() => searchValue ? setShowListSearch(true) : ""}
                onChange={e => setSearchValue(e.target.value)}
            />
            <label htmlFor="searchInput">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </label>
            {loading
                ?
                <FontAwesomeIcon id={cx("loadVal")} className={cx("same-icon-input")} icon={faSpinner} />
                : ""
            }
            {
                !loading && searchValue
                    ?
                    < FontAwesomeIcon onClick={() => setSearchValue('')} id={cx("delSearch")} className={cx("same-icon-input")} icon={faXmark} />
                    :
                    ""
            }
            <div onMouseDown={chooseItemSearch} className={cx("same_list_music", "listSearch")} id={cx("listSearch")} style={{ display: (showListSearch ? "block" : "none") }}>
                <div className={cx("list_music_render")} >
                    <div className={cx("titleSearch")}>Gợi ý kết quả</div>
                    {console.log(searchResult.length)}
                    <ul className={cx("music")}>
                        {(searchResult && searchResult.length) ? searchResult.map(item => {
                            return <li key={item.id}>{item.title}</li>;
                        }) :
                            <li style={{ "display": "flex", "justify-content": "center", "align-items": "center" }}>Không tìm thấy kết quả.</li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Search;
