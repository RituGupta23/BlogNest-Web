import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IoHome } from "react-icons/io5";

export default function Home() {

  const { data: session } = useSession();

  const router = useRouter();

  // useEffect(() => {
  //   if (!session) {
  //     router.push('/login');
  //   }
  // }, [session, router]);

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
          <div className="titledashboard flex flex-sb">
            <div>
              <h2> Blogs <span>Dashboard</span> </h2>
              <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb">
              <IoHome /> <span>/</span> <span>Dashboard</span>
            </div>
          </div>

          {/* dashboard four cards */}

          <div className="topfourcards flex flex-sb">
            <div className="four_card">
              <h2>Total Blogs</h2>
              <span>10</span>
            </div>
            <div className="four_card">
              <h2>Total Topics</h2>
              <span>4</span>
            </div>
            <div className="four_card">
              <h2>Total Tags</h2>
              <span>6</span>
            </div>
            <div className="four_card">
              <h2>Draft Blogs</h2>
              <span>10</span>
            </div>
          </div>

          {/* year overview */}
          <div className="year_overview flex flex-sb">
            <div className="leftyearoverview">
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
                <h3 className="text-right"> 10 / 365 <br /> <span>Total Published</span></h3>
              </div>
              {/*chart pending........ */}
            </div>
            <div className="right_salescont">
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
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>Next Js, React Js</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>Database</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>Deployment</td>
                    <td>10</td>
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
            
            