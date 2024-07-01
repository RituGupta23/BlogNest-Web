import { IoMoonSharp, IoSearch, IoSearchSharp } from "react-icons/io5";
import { HiBars3BottomRight } from "react-icons/hi2";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { LuSun } from "react-icons/lu";
import useFetchData from "@/hooks/useFetchData";

export default function Header() {

    // for search bar
    const [searchopen, setSearchopen] = useState(false);

    const openSearch = () => {
        setSearchopen(!searchopen);
    }

    const closeSearch = () => {
        setSearchopen(false);
    }

    // aside bar for mobile device

    const [aside, setAside] = useState(false);

    const asideOpen = () => {
        setAside(true);
    }

    const asideClose = () => {
        setAside(false);
    }

    // aside menu closes when any link inside it is clicked
    const handleLinkClick = () => {
        setAside(false);
    }

    // Dark mode
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // check local storage for darkmode preference on intial load
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);
    }, []);

    useEffect(() => {
        // apply dark mode styles when darkmode state changes
        if (darkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('darkMode', true);
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('darkMode', false);
        }
    }, [darkMode])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }



    // search data fetch
    const { alldata, loading } = useFetchData('/api/getblog');

    // filtering publish blog
    const publishedblogs = alldata.filter(ab => ab.status === "publish");

    const [searchQuery, setSearchQuery] = useState('');

    // filtering based on search query, search data from title
    const filteredBlogs = searchQuery.trim() === ''
        ? publishedblogs
        : publishedblogs.filter(blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return <>
        <div className="header_sec">
            <div className="container header">
                <div className="logo">
                    <Link href="/"><h1>Blogs</h1></Link>
                </div>
                <div className="searchbar">
                    <IoSearchSharp />
                    <input onClick={openSearch}
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Discover news, articles and more" />
                </div>

                <div className="nav_list_dark">
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About Me</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>

                    {/* for mobile users */}
                    <div className="navlist_mobile_ul">
                        <button onClick={toggleDarkMode}>{darkMode ? <IoMoonSharp /> : <LuSun />}</button>
                        <button onClick={openSearch}><IoSearch /></button>
                        <button onClick={asideOpen}><HiBars3BottomRight /></button>
                    </div>
                    <div className="darkmode">
                        <label className="switch">
                            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                            <span className="slider_header"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div className={`search_click ${searchopen ? 'open' : ''}`}>
                <div className="searchab_input">
                    <IoSearchSharp />
                    <input type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Discover news, articles and more" />
                </div>
                <div className="search_data text-center">
                    {loading ? <div className="wh_100 flex flex-center mt-2 pb-5">\
                        <div className="loader"></div>
                    </div> : <>
                        {searchQuery ? <>
                            {filteredBlogs.slice(0, 3).map((blog) => {
                                return <Link onClick={closeSearch} className="blog" key={blog._id} href={`/blog/${blog.slug}`}>
                                    <div className="blogInfo">
                                        <div><h3>{blog.slug}</h3></div>
                                    </div>
                                </Link>
                            })}</> : <div>No Search Result</div>}
                    </>}
                </div>
                <div onClick={closeSearch} className="exit_search">
                    <div><FaXmark /></div>
                    <h3>ESC</h3>
                </div>
            </div>

            <div className={aside ? 'navlist_mobile open' : 'navlist_mobile'}>
                <div className="navlist_m_title flex flex-sb">
                    <h1>Blogs</h1>
                    <button onClick={asideClose}><FaXmark /></button>
                </div>
                <hr />
                <h3 className="mt-3">Main Menu</h3>
                <ul onClick={handleLinkClick}>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About Me</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
                <hr />
                <h3 className="mt-3">Topics</h3>
                <ul onClick={handleLinkClick}>
                    <li><Link href="/topics/htmlcssjavascript">Html Css Js</Link></li>
                    <li><Link href="/topics/nextjs">Next Js</Link></li>
                    <li><Link href="/topic/database">Database</Link></li>
                    <li><Link href="/topisc/deployment">Deployment</Link></li>
                </ul>
            </div>
        </div>
    </>
}