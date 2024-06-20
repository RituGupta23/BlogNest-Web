import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import { BsPostcard } from "react-icons/bs";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function Blog() {
    const [searchQuery, setSearchQuery] = useState('');

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
            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>All Published <span>Blogs</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <BsPostcard /> <span>/</span> <span>Blogs</span>
                    </div>
                </div>

                <div className="blogstable">
                    <div className="flex gap-2 mb-1">
                        <h2>Search Blogs: </h2>
                        <input type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="search by title" />
                    </div>

                    <table className="table table-styling">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Slug</th>
                                <th>Edit / Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>title of the blog</td>
                                <td>slug of the blog</td>
                                <td>
                                    <div className="flex gap-2 flex-center">
                                        <Link href="/blogs/edit/id"><button title="edit"><FaEdit/></button></Link>
                                        <Link href="/blogs/edit/id"><button title="edit"><RiDeleteBin6Fill/></button></Link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


        </>
    }


}
