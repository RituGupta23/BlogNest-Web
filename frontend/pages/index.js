import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaHtml5, FaInstagram, FaTwitter } from "react-icons/fa6";
import { TbBrandNextjs } from "react-icons/tb";
import { FiDatabase } from "react-icons/fi";
import { AiOutlineDeploymentUnit } from "react-icons/ai";

export default function Home() {

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(3);

  const { alldata, loading } = useFetchData('/api/getblog');

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  // filter publish data
  const publishedblogs = alldata.filter(ab => ab.status === 'publish');

  const indexOfLastblog = currentPage * perPage;
  const indexOfFirstblog = indexOfLastblog - perPage;
  const currentBlogs = publishedblogs.slice(indexOfFirstblog, indexOfLastblog);

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
                {currentBlogs.map((blog) => {
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
                      {/* <p>lorem csccscscscsonklncscioencjkc   gvghvhnbhbhjbhbhbh
                        cmcxvd,vjkdffffffffffffffffffffffffffffffffffffffffd kd
                      </p> */}

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
              {publishedblogs.length === 0 ? (
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

          <div className="rightblog_info">
            <div className="topics_sec">
              <h2>Topics</h2>
              <div className="topics_list">
                <Link href='/topics/htmlcssjs'>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FaHtml5 />
                    </div>
                    <h3>Html, Css & JavaScript</h3>
                  </div>
                </Link>
                <Link href='/topics/nextjs'>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <TbBrandNextjs />
                    </div>
                    <h3>Next js, React js</h3>
                  </div>
                </Link>
                <Link href='/topics/database'>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FiDatabase />
                    </div>
                    <h3>Database</h3>
                  </div>
                </Link>
                <Link href='/topics/deployment'>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <AiOutlineDeploymentUnit />
                    </div>
                    <h3>Deployment</h3>
                  </div>
                </Link>
              </div>
            </div>
            <div className="tags_sec mt-3">
              <h2>Tags</h2>
              <div className="tags_list">
                <Link href="/tag/html">#html</Link>
                <Link href="/tag/css">#css</Link>
                <Link href="/tag/javascript">#javascript</Link>
                <Link href="/tag/nextjs">#nextjs</Link>
                <Link href="/tag/reactjs">#reactjs</Link>
                <Link href="/tag/database">#database</Link>
              </div>
            </div>
            <div className="letstalk_sec mt-3">
              <h2>Let's Talk</h2>
              <div className="talk_sec">
                <h4>Want to find out how i can solve problems specific to your business? let's talk.</h4>
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
          </div>
        </div>
      </section>
    </>
  );
}
