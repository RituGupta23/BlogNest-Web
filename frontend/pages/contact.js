import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa6";

export default function Contact() {
    return <>
        <section className="main_blog_section">
            <div className="letstalk_sec mt-3">
                <h2>Connect with me</h2>
                <h2>coder@gmail.com</h2>
                <div className="talk_sec">
                    <h4 className="text-center">Want to find out how i can solve problems specific to your business? let's talk.</h4>
                    <div className="social_talks flex flex-center gap-1 mt-2">
                        <div>Github</div>
                        <div>Twitter</div>
                        <div>Instagram</div>
                    </div>
                    <div className="social_talks flex flex-center gap-1 mt-2">
                        <div className="st_icon">
                            <FaGithub />
                        </div>
                        <div className="st_icon">
                            <FaTwitter />
                        </div>
                        <div className="st_icon">
                            <FaInstagram />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}