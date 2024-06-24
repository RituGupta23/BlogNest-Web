import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Home() {

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const { alldata, loading } = useFetchData('/api/getblog');

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }


  const indexOfLastblog = currentPage * perPage;
  const indexOfFirstblog = indexOfLastblog - perPage;
  const currentBlogs = alldata.slice(indexOfFirstblog, indexOfLastblog);

  const allblog = alldata.length;

  // filter publish data
  const publishedblogs = currentBlogs.filter(ab => ab.status === 'publish');

  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i + 1);
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

  return (
    <>
      <Head>
        <title>Blog Website</title>
        <meta name="description" content="Blog Website" />
        <meta name="viewport" content="width-device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="header_data_section">
        <div className="container flex flex-sb w-100">
          <div className="leftheader_info">
            <h1>Hi, I'm <span>Web Developer</span>.</h1>
            <h3>Specialized in JavaScript and Next Js</h3>
            <div className="flex gap-2">
              <Link href="/contact"><button>Contact Me</button></Link>
              <Link href="/about"><button>About Me</button></Link>
            </div>
          </div>
          <div className="rightheader_img">
            <div className="image_bg_top"></div>
            <div className="image_bg_top2"></div>
            <img src="/img/user.png"></img>
          </div>
        </div>
      </section>

      <section className="main_blog_section">
        <div className="container flex flex-sb flex-left flex-wrap">
          <div className="leftblog_sec">
            <h2>Recently Published</h2>
            <div className="blogs_sec">
              {loading ? <div className="wh_100 flex flex-center mt-2 pb-5">\
                <div className="loader"></div>
              </div> : <>
                {publishedblogs.map((blog) => {
                  // in the markdown content first image show here
                  const firstImageUrl = extractFirstImageUrl(blog.description);
                  return <div className="blog" key={blog._id}>
                    <div className="blogimg">
                      <Link href={`/blog/${blog.slug}`}>
                        <img src={firstImageUrl || "/img/noimage.png"} alt={blog.title} />
                      </Link>
                    </div>
                    <div className="bloginfo">
                      <Link href={`/tag/${blog.tags[0]}`}>
                        <div className="blogtag">{blog.tags[0]}</div>
                      </Link>
                      <Link href={`/blog/${blog.slug}`}><h3>{blog.title}</h3></Link>
                      <p>lorem csccscscscsonklncscioencjkc   gvghvhnbhbhjbhbhbh
                        cmcxvd,vjkdffffffffffffffffffffffffffffffffffffffffd kd
                      </p>

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
            <div className="pagination">
              {publishedblogs.length === 0 ? (
                ''
              ) : (
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
                  <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}>Next</button>
                </div>

              )}

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
