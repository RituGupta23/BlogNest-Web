import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import { BsPostcard } from "react-icons/bs";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useFetchData from "@/hooks/useFetchData";
import Dataloading from "@/components/Dataloading";

export default function Blog() {

    // pagination and search state
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [perPage] = useState(5);

    // fetch blogs form api endpoint with hooks
    const { alldata, loading } = useFetchData("/api/blogapi");

    // function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    
    const publishedBlogs = alldata.filter(ab => ab.status === 'publish');

    // search function
    const filteredBlog = searchQuery.trim() === '' ? publishedBlogs : publishedBlogs.filter(blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const indexOfFirstblog = (currentPage - 1) * perPage;
    const indexOfLastblog = currentPage * perPage;
    const currentBlogs = filteredBlog.slice(indexOfFirstblog, indexOfLastblog);

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(publishedBlogs.length / perPage); i++) {
        pageNumbers.push(i);
        //console.log(pageNumbers);
    }

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

    if (session) {
        return <>
            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div data-aos="fade-right">
                        <h2>All Published <span>Blogs</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb" data-aos="fade-left">
                        <BsPostcard /> <span>/</span> <span>Blogs</span>
                    </div>
                </div>

                <div className="blogstable" data-aos="fade-up">
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
                            {loading ? (
                                <>
                                    <tr>
                                        <td>
                                            <Dataloading />
                                        </td>
                                    </tr>
                                </>
                            ) : (
                                <>
                                    {publishedBlogs.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="text-center">No Published Blog</td>
                                        </tr>
                                    ) : (
                                        currentBlogs.map((blog, index) => (
                                            <tr key={blog._id}>
                                                <td>{indexOfFirstblog + index + 1}</td>
                                                <td><h3>{blog.title}</h3></td>
                                                <td><pre>{blog.slug}</pre></td>
                                                <td>
                                                    <div className="flex gap-2 flex-center">
                                                        <Link href={`/blogs/edit/${blog._id}`}><button title="edit"><FaEdit /></button></Link>
                                                        <Link href={`/blogs/delete/${blog._id}`}><button title="delete"><RiDeleteBin6Fill /></button></Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </>
                            )}
                        </tbody>
                    </table>

                    {publishedBlogs.length === 0 ? (
                        ''
                    ) : (
                        <div className="blogpagination">
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                Previous
                            </button>
                            {pageNumbers
                                .slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length))
                                .map(number => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        className={currentPage === number ? 'active' : ''}
                                    >
                                        {number}
                                    </button>
                                ))}
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage || currentPage === pageNumbers.length}>
                                Next
                            </button>
                        </div>

                    )}
                </div>
            </div>


        </>
    }


}
