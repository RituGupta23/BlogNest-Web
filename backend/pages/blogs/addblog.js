import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Blog from "@/components/Blog";

export default function AddBlog() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session && status !== "loading") {
            router.push('/login');
        }
    }, [session, status, router]);

    if (status === "loading") {
        return (
            <div className="loadingdata flex flex-col flex-center wh_100">
                <Loading />
            </div>
        );
    }

    if (session) {
        return <>
            <div className="addblogspage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Add <span>Blog</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <MdOutlineAddPhotoAlternate /> <span>/</span> <span>AddBlog</span>
                    </div>
                </div>

                <div className="blogsadd">
                    <Blog></Blog>
                </div>
            </div>
        </>
    }

}