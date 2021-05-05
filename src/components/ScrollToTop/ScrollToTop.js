import React, { useState } from "react";
import './ScrollToTop.scss';

const ScrollToTop = () =>{
    const [showScroll, setShowScroll] = useState(false)

    const checkScrollTop = () => {
        // console.log(`checkScrollTop: ${window.pageYOffset}`);
        if (!showScroll && window.pageYOffset > 100){
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 100){
            setShowScroll(false)
        }
    };

    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    window.addEventListener('scroll', checkScrollTop)

    return (
        <input type="image" className="scrollTop" src={'./images/up192.png'} alt="Submit" onClick={scrollTop} style={{display: showScroll ? 'flex' : 'none'}}/>
    );
}

export default ScrollToTop;