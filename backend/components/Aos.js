import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css' // fix animation

export default function Aos({children}) {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            offset: 200,
            easing: 'ease',
            once: true, // animation => only once => while scrolling
        });
    }, []);

    return <div>{children}</div>
}