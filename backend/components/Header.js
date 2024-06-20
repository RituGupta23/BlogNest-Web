import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { GoScreenFull } from "react-icons/go";
import { IoNotifications } from "react-icons/io5";
import { RxExitFullScreen } from "react-icons/rx";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Header() {
    const { data: session } = useSession();

    const [isFullscreen, setisFullscreen] = useState(false);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                setisFullscreen(true);
            })
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().then(() => {
                    setisFullscreen(false);
                })
            }
        }
    }

    return <>
    <header className="header flex flex-sb">
        <div className="logo flex gap-2">
            <h1>ADMIN</h1>
            <div className="headerham flex flex-center">
                <HiOutlineBars3BottomLeft/>
            </div>
        </div>
        <div className="rightnav flex gap-2">
            <div onClick={toggleFullscreen}>
                {isFullscreen ? <RxExitFullScreen /> : <GoScreenFull />}
            </div>
            <div className="notification">
                <IoNotifications />
            </div>
            <div className="profilenav">
                {session ? <img width={10} height={60} src={session.user.image} alt="user"/> : <img src="" alt="user"/>}
            </div>
        </div>
        
    </header>
    </>
}