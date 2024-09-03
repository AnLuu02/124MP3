import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    const { pathname, search } = useLocation();


    useEffect(() => {
        const scrollToTop = () => {
            window.requestAnimationFrame(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        };

        scrollToTop();
    }, [search, pathname]);

    return null;
}

export default ScrollToTop;
