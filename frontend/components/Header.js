import { IoMoonSharp, IoSearch, IoSearchSharp } from "react-icons/io5";
import { HiBars3BottomRight } from "react-icons/hi2";
import Link from "next/link";


export default function Header() {

    return <>
        <div className="header_sec">
            <div className="container header">
                <div className="logo">
                    <Link href="/"><h1>Blogs</h1></Link>
                </div>
                <div className="searchbar">
                    <IoSearchSharp />
                    <input type="search" placeholder="Discover news, articles and more"/>
                </div>

                <div className="nav_list_dark">
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/">About Me</Link></li>
                        <li><Link href="/">Contact</Link></li>
                    </ul>

                    {/* for mobile users */}
                    <div className="navlist_mobile_ul">
                        <button><IoMoonSharp/></button>
                        <button><IoSearch/></button>
                        <button><HiBars3BottomRight/></button>
                    </div>
                    <div className="darkmode">
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider_header"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="search_click">
                <div className=""></div>
            </div>
        </div>
    </>
}