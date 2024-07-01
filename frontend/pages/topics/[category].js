import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CategoryPage() {

    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(3);
    const [blog, setBlog] = useState([]);
    const router = useRouter();

    const { category } = router.query;

    useEffect(() => {
        // function to fetch blog data
        const fetchBlogdata = async () => {
            try {
                const res = await axios.get(`/api/getblog?blogcategory=${category}`);
                const alldata = res.data;
                //console.log(alldata);
                setBlog(alldata);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blog data', error);
                setLoading(false);
            }
        }

        // fetch blog data only if category exists
        if (category) {
            fetchBlogdata();
        } else {
            router.push('/404');
        }
    }, [category, router])

    // function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    // filter publish data
    const publishedblogs = blog.filter(ab => ab.status === 'publish');

    //console.log(publishedblogs.length);

    const indexOfLastblog = currentPage * perPage;
    const indexOfFirstblog = indexOfLastblog - perPage;
    const currentBlogs = publishedblogs.slice(indexOfFirstblog, indexOfLastblog);
    // console.log("Blog");
    // console.log(blog);
    // console.log("currentBlogs");
    // console.log(currentBlogs);

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(publishedblogs.length / perPage); i++) {
        pageNumbers.push(i);
    }

    function extractFirstImageUrl(markdownContent) {
        // check if markdowncontent is provided and non-empty
        if (!markdownContent || typeof markdownContent !== 'string') {
            return null;
        }

        // regular expression to match the first image url in markdown formet ![alt text](imageurl)
        const regex = /!\[.*?\]\((.*?)\)/;
        const match = markdownContent.match(regex);
        return match ? match[1] : null;
    }

    return <>
        <div className="blogpage">
            <div className="category_slug">
                <div className="container">
                    <div className="category_title">
                        <div className="flex gap-1">
                            <h1>{loading
                                ? <div>Loading...</div>
                                : category}</h1>
                            <span>{loading ? <div>0</div> : publishedblogs.length}</span>
                        </div>
                    </div>
                    <div className="category_blogs mt-3">
                        {loading ? <>
                            <div className="wh-100 flex flex-center mt-2 pb-5">\
                                <div className="loader"></div>
                            </div>
                        </> : <>
                            {currentBlogs.map((blog) => {
                                // in the markdown content first image show here
                                const firstImageUrl = extractFirstImageUrl(blog.description);
                                return <div className="cate_blog" key={blog._id}>
                                    <Link href={`/blog/${blog.slug}`}>
                                        <img src={firstImageUrl || "/img/noimage.png"} alt={blog.title} />
                                    </Link>

                                    <div className="bloginfo">
                                        <Link href={`/tag/${blog.tags[0]}`}>
                                            <div className="blogtag">{blog.tags[0]}</div>
                                        </Link>
                                        <Link href={`/blog/${blog.slug}`}><h3>{blog.title}</h3></Link>
                                        <div className="blogauthor flex gap-1">
                                            <div className="blogaimg">
                                                <img src="/img/user.png" alt="coder" />
                                            </div>
                                            <div className="flex flex-col flex-left gap-05">
                                                <h4>Coder</h4>
                                                <span>{new Date(blog.createdAt).toLocaleDateString('en-Us', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            })}
                        </>}
                    </div>

                    <div className="blogpagination">
                        <div className="blogpagination">
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
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
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage || currentPage === pageNumbers.length}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}