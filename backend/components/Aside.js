import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { BsPostcardFill } from "react-icons/bs";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePending } from "react-icons/md";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';


export default function Aside() {
    
    const router = useRouter();
    const [clicked, setClicked] = useState(false);
    const [activeLink, setActiveLink] = useState('/');

    const handleClick = () => {
        setClicked(!clicked);
    }

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setClicked(false);
    }

    useEffect(() => {
        // update active link state when page is reloaded
        setActiveLink(router.pathname);
    }, [router.pathname]);

    return <>
    <aside className="asideleft">
        <ul>
            <Link href="/">
                <li className={activeLink === '/' ? 'navactive' : ''} 
                    onClick={() => handleLinkClick('/')}>
                    <IoHome />
                    <span>Dashboard</span>
                </li>
            </Link>
            <Link href="/blogs">
                <li className={activeLink === '/blogs' ? 'navactive' : ''} 
                    onClick={() => handleLinkClick('/blogs')}>
                    <BsPostcardFill />
                    <span>Blogs</span>
                </li>
            </Link>
            <Link href="/blogs/addblog">
                <li className={activeLink === '/blogs/addblog' ? 'navactive' : ''} 
                    onClick={() => handleLinkClick('/blogs/addblog')}>
                    <MdOutlineAddPhotoAlternate />
                    <span>AddBlog</span>
                </li>
            </Link>
            <Link href="/draft">
                <li className={activeLink === '/draft' ? 'navactive' : ''} 
                    onClick={() => handleLinkClick('/draft')}>
                    <IoHome />
                    <span>Pending</span>
                </li>
            </Link>
            <Link href="/setting">
                <li className={activeLink === '/settings' ? 'navactive' : ''} 
                    onClick={() => handleLinkClick('/setting')}>
                    <MdOutlinePending />
                    <span>Settings</span>
                </li>
            </Link>
        </ul>
    </aside>
    </>
}