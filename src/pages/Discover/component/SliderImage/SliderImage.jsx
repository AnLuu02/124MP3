import classNames from "classnames/bind";
import { useEffect, useRef } from "react";
import img_slide1 from "../../../assets/img/slide1.jpg";
import img_slide2 from "../../../assets/img/slide2.jpg";
import img_slide3 from "../../../assets/img/slide3.jpg";
import styles from "./SliderImage.module.scss";

const cx = classNames.bind(styles);
function SliderImage() {
    const refOther1 = useRef();
    const refOther2 = useRef();
    const refOther3 = useRef();
    useEffect(() => {
        let array = [1, 2, 3];
        const interval = setInterval(() => {
            const firstElement = array.shift();
            array.push(firstElement);
            const secondElement = array.shift();
            array.unshift(secondElement);
            if (refOther1.current && refOther2.current && refOther3.current) {
                refOther1.current.dataset.order = array[0];
                refOther2.current.dataset.order = array[1];
                refOther3.current.dataset.order = array[2];
            }
        }, 5000)
        return () => clearInterval(interval);
    });
    return (
        <div className={cx("all-slides")}>
            <div className={cx("single-slide")} data-order="3" ref={refOther3}>
                <img src={img_slide3} alt="1" />
            </div>
            <div className={cx("single-slide")} data-order="2" ref={refOther2}>
                <img src={img_slide2} alt="2" />
            </div>
            <div className={cx("single-slide")} data-order="1" ref={refOther1}>
                <img src={img_slide1} alt="3" />
            </div>
        </div>
    )
}
export default SliderImage;