import Loading from "@/components/Loading";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";

export default function Setting() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.push('/login');
        }
    }, [session, router]);

    if (status === "loading") {
        return (
            <div className="loadingdata flex flex-col flex-center wh_100">
                <Loading />
            </div>
        );
    }

    async function logout() {
        await signOut();
        await router.push('/login');
    }

    if (session) {
        return <>
            <div className="settingpage">
                <div className="titledashboard flex flex-sb">
                    <div data-aos="fade-right">
                        <h2>Admin <span>Settings</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb" data-aos="fade-left">
                        <IoSettingsOutline /> <span>/</span> <span>Settings</span>
                    </div>
                </div>
                <div className="profilesettings">
                    <div className="leftprofile_details flex" data-aos="fade-up">
                        <img src="/img/user.png" alt="coder" />
                        <div className="w_100">
                            <div className="flex flex-sb flex-left mt-2">
                                <h2>My Profile</h2>
                                <h3>Coder <br /> Web Developer</h3>
                            </div>
                            <div className="flex flex-sb mt-2">
                                <h3>Phone:</h3>
                                <input type="text" defaultValue="+91-1234567890" />
                            </div>
                            <div className="mt-2">
                                <input type="email" defaultValue="coderaddress123@gmail.com" />
                            </div>
                            <div className="flex flex-center w-100 mt-2">
                                <button>Save</button>
                            </div>
                        </div>
                    </div>

                    <div className="rightlogoutsec" data-aos="fade-up">
                        <div className="topaccoutnbox">
                            <h2 className="flex flex-sb">My Account <MdOutlineAccountCircle /></h2>
                            <hr />
                            <div className="flex flex-sb mt-1">
                                <h3>Active Account <br /> <span>Email</span></h3>
                                <button onClick={logout}>Log Out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }

}