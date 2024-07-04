import Link from "next/link";

export default function Footer() {
    return <>
    <div className="footer">
        <div className="container flex flex-sb flex-wrap flex-left">
            <div className="footer_logo">
                <h2>BLOGS</h2>
                <h4>&copy; 2024 All Rights Reserved.</h4>
                <h3>Coded By <span>@vbmcoder</span></h3>
            </div>
            <div className="q_links">
                <h3>Quick Links</h3>
                <ul>
                    <li><Link href="/">Advertise with us</Link></li>
                    <li><Link href="/about">About Us</Link></li>
                    <li><Link href="/contact">Contact Us</Link></li>
                </ul>
            </div>
            <div className="q_links">
                <h3>Legal Stuff Links</h3>
                <ul>
                    <li><Link href="/">Privacy Notice</Link></li>
                    <li><Link href="/">Cookie Policy</Link></li>
                    <li><Link href="/">Terms Of Use</Link></li>
                </ul>
            </div>
            <div className="q_links">
                <h3>Social Media</h3>
                <ul>
                    <li><Link href="/">Github</Link></li>
                    <li><Link href="/">Twitter</Link></li>
                    <li><Link href="/">Instagram</Link></li>
                </ul>
            </div>
        </div>
    </div>
    </>
}