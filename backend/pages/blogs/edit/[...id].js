import Blog from "@/components/Blog";
import Loading from "@/components/Loading";
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsPostcard } from "react-icons/bs";

export default function EditBlog() {

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

    // edit blog

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

    if (session) {
        return <>
            <Head>
                <title>Update Blog</title>
            </Head>

            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Edit <span>{productInfo?.title}</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <BsPostcard /> <span>/</span> <span>Edit Blogs</span>
                    </div>
                </div>

                <div className="mt-3">
                    {
                        productInfo && (
                            <Blog {...productInfo}/>
                        )
                    }
                </div>
            </div>
        </>
    }
}