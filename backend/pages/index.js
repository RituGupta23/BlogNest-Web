import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoHome } from "react-icons/io5";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineController } from 'chart.js';
import { Bar } from "react-chartjs-2";
import Loading from "@/components/Loading";

export default function Home() {


  // {blogsData.filter(ab => ab.status === 'draft').length}

  const { data: session, status } = useSession();

  const router = useRouter();

  const [blogsData, setBlogsData] = useState([]);

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineController);

  // define options within the component scope

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Blogs Created Monthly By Year'
      }
    }
  }

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/blogapi');
        const data = await response.json();
        setBlogsData(data); // data is array of objects (object : each blog data)
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }

    fetchData();
  }, [])

  

  // Aggregate data by year and month
  const monthlydata = blogsData
    .filter(dat => dat.status === "publish")
    .reduce((acc, blog) => {
      const year = new Date(blog.createdAt).getFullYear(); // get the year
      const month = new Date(blog.createdAt).getMonth(); // get month (0 indexed)
      acc[year] = acc[year] || Array(12).fill(0); // initialise array for the year of not exists 

      acc[year][month]++; // increment count for the month
      return acc;
    }, {});

  // {
  //   2021: [0, 1, 2, 0, 0, 0, 1, 0, 2, 1, 0, 3],
  //   2022: [1, 0, 2, 1, 0, 0, 0, 1, 0, 0, 1, 0],
  // ... other years
  // }

  const currentYear = new Date().getFullYear(); // get the current year
  const years = Object.keys(monthlydata);
  const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const datasets = years.map(year => ({
    label: `${year}`,
    data: monthlydata[year] || Array.fill(0),
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`
  }))

  const data = {
    labels,
    datasets
  }

  if (status === "loading") {
    return <div className="loadingdata flex flex-col flex-center wh_100">
      <Loading />
    </div>
  }

  if (session) {
    return (
      <>
        <Head>
          <title>Admin Panel BlogApp</title>
          <meta name="description" content="admin dashboard next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="dashboard">
          {/* title dashboard */}
          <div className="titledashboard flex flex-sb" >
            <div data-aos="fade-right"> 
              <h2> Blogs <span>Dashboard</span> </h2>
              <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb" data-aos="fade-left">
              <IoHome /> <span>/</span> <span>Dashboard</span>
            </div>
          </div>

          {/* dashboard four cards */}

          <div className="topfourcards flex flex-sb">
            <div className="four_card" data-aos="fade-right">
              <h2>Total Blogs</h2>
              <span>{blogsData.filter(ab => ab.status === 'publish').length}</span>
            </div>
            <div className="four_card" data-aos="fade-right">
              <h2>Total Topics</h2>
              <span>4</span>
            </div>
            <div className="four_card" data-aos="fade-left">
              <h2>Total Tags</h2>
              <span>6</span>
            </div>
            <div className="four_card"data-aos="fade-left">
              <h2>Draft Blogs</h2>
              <span>{blogsData.filter(ab => ab.status === 'draft').length}</span>
            </div>
          </div>

          {/* year overview */}
          <div className="year_overview flex flex-sb">
            <div className="leftyearoverview" data-aos="fade-up">
              <div className="flex flex-sb">
                <h3>Year Overview</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
                <h3 className="text-right"> {blogsData.filter(ab => ab.status === 'publish').length} / 365 <br /> <span>Total Published</span></h3>
              </div>

              <Bar data={data} options={options} />

            </div>
            <div className="right_salescont" data-aos="fade-up">
              <div>
                <h3>Blogs by category</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
              </div>
              <div className="blogscategory flex flex-center">
                <table>
                  <thead>
                    <tr>
                      <td>Topics</td>
                      <td>Data</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Html, Css & Javascript</td>
                      <td>{blogsData.filter(ab => ab.status === "publish" && (ab.blogcategory || ab.blogcategory).includes("htmlcssjs")).length}</td>
                    </tr>
                    <tr>
                      <td>Next Js, React Js</td>
                      <td>{blogsData.filter(ab => ab.status === "publish" && (ab.blogcategory || ab.blogcategory).includes("nextjs")).length}</td>
                    </tr>
                    <tr>
                      <td>Database</td>
                      <td>{blogsData.filter(ab => ab.status === "publish" && (ab.blogcategory || ab.blogcategory).includes("database")).length}</td>
                    </tr>
                    <tr>
                      <td>Deployment</td>
                      <td>{blogsData.filter(ab => ab.status === "publish" && (ab.blogcategory || ab.blogcategory).includes("deployment")).length}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>


          </div>
        </div>
      </>
    );
  }

}

