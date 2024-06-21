import Blog from "@/components/Blog";
import Loading from "@/components/Loading";
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsPostcard } from "react-icons/bs";

export default function DeleteBlog() {
    // login first
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

    // delete
    const { id } = router.query;

    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get(`/api/blogapi?id=${id}`).then(response => {
                setProductInfo(response.data);
            })
        }
    }, [id]);

    // for canceling => go back to home
    function goback() {
        router.push('/');
    }

    // delete the blog
    async function deleteOneblog() {
        await axios.delete(`/api/blogapi?id=${id}`);
        goback();
    }

    if (session) {
        return <>
            <Head>
                <title>Update Blog</title>
            </Head>

            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Delete <span>{productInfo?.title}</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <BsPostcard /> <span>/</span> <span>Delete Blogs</span>
                    </div>
                </div>

                <div className="deletesec flex flex-center wh_100">
                    <div className="deletecard">
                        <svg
                            viewBox="0 0 24 24"
                            fill="red"
                            height="6em"
                            width="6em">
                            <path d="M3 6h18v2H3V6zm3 3h12v12H6V9zm3-5h6v2H9V4zM5 9v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V9H5z" />
                        </svg>

                        <p className="cookieHeading"> Are you sure? </p>
                        <p className="cookieDescription"> If you delete this blog content it will permanently delete your blog </p>

                        <div className="buttonContainer">
                            <button onClick={deleteOneblog} className="acceptButton">Delete</button>
                            <button onClick={goback} className="declineButton">Cancel</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    }
}