import { useEffect, useRef, useState } from 'react';
import useFetch from '../../Custom hooks/useFetch';
import WidgetAlbum from '../WidgetAlbum/WidgetAlbum';

function LazyLoadComponent() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();

    useEffect(() => {
        console.log("0o");

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    console.log("0o");

                    setIsVisible(true);
                    observer.unobserve(ref.current); // Ngừng theo dõi sau khi phần tử xuất hiện
                }
            },
            {
                threshold: 0.1 // Phần tử cần ít nhất 10% xuất hiện trong viewport để kích hoạt
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div ref={ref}>
            {isVisible && <Content />}
        </div>
    );
}

function Content() {
    const [artists, setArtists] = useState([]);
    const { get, loading } = useFetch(import.meta.env.VITE_API_BASE_URL);
    useEffect(() => {
        console.log("Bat dau load artist");

        get("artist?limit=5")
            .then(data => setArtists(data))
            .catch(err => console.log(err))
    }, []);

    return <WidgetAlbum data={artists} artistWidget loading={loading} />
}

export default LazyLoadComponent;
