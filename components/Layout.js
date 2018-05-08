import Head from 'next/head';
import Navbar from './Navbar';

const Layout = props => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>NHL Statistics</title>
      <link rel="stylesheet" href="https://bootswatch.com/4/darkly/bootstrap.min.css" />
      <link href="https://fonts.googleapis.com/css?family=Fira+Sans:400,400i,700" rel="stylesheet" />
    </Head>
    <Navbar />
    <div className="container" style={{ marginTop: `${125}px` }}>
      {props.children}
    </div>
    <footer className="container">
      <p>&copy; NHL. All information presented on this site is property of the National Hockey League.</p>
    </footer>
    <style jsx global>{`
      footer {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.4);
      }
      /* PAGES*/

      /* index */

      .wrapper {
        width: 60%;
        margin: 5vh auto;
      }
      .menu {
        display: flex;
        list-style: none;
        justify-content: center;
        margin: 2rem;
        -webkit-padding-start: 0;
      }
      .menu__item {
        width: 30%;
        height: 10vh;
        margin-right: 10px;
        display: flex;
        align-items: center;
      }
      @media screen and (max-width: 800px) {
        .wrapper {
          width: 95%;
        }
        .menu {
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 2rem;
        }
        .menu__item {
          width: 80%;
          height: 10vh;
          margin-right: 0;
          justify-content: center;
        }
      }

      /* CONTAINERS */

      /* PlayerStats */

      .player-list {
        max-width: 850px;
        min-width: 620px;
      }
      .player-list button {
        background-color: inherit;
        border: none;
        font: inherit;
        color: inherit;
      }
      .player-list button:hover {
        cursor: pointer;
      }
      .player-list > li > span {
        padding: 0 3px;
        transition: all 0.2s ease-out;
      }
      .player-list > li:nth-child(2n) {
        background-color: rgba(255, 255, 255, 0.11);
      }
      .player-list > li > span:hover {
        // background-color: #444;
        color: rgba(255, 255, 255, 0.7);
      }
      .playerstats-rank {
        width: 2.5rem;
      }
      .playerstats-fullname {
        width: 10rem;
        cursor: pointer;
      }
      .playerstats-season {
        width: 4rem;
      }
      .playerstats-stat {
        width: 2.75rem;
      }
      .playerstats__team-logo {
        width: 2.5rem;
      }

      /////////////////
      //* TeamStats *//
      /////////////////

      .team-card {
        display: flex;
        flex-direction: column;
        border-top: 3px solid #888;
        margin-top: 20px;
        padding: 20px 0;
      }

      .team-card__heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        padding: 0 20px;
        border: 2px solid rgba(0, 0, 0, 0.7);
        border-radius: 8px;
        background-color: #fff;
        color: #333;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
      }

      .team-card__heading:hover {
        border-color: rgba(0, 0, 0, 0.3);
      }

      .team-card__stats-line {
        text-align: center;
      }

      .team-card__links {
        display: flex;
        justify-content: space-around;
      }

      .team-list {
        display: flex;
        justify-content: center;
      }

      .team-list__conference {
        padding: 20px 50px;
        margin: 20px;
        border: 3px solid #303030;
        border-radius: 10px;
      }

      .teamstats-rank {
        width: 2.5rem;
      }
      .teamstats-teamname {
        width: 10rem;
      }
      .teamstats-season {
        width: 4rem;
      }
      .teamstats-stat {
        width: 2rem;
      }

      @media only screen and (max-width: 991px) {
        .team-list {
          flex-direction: column;
          max-width: 550px;
          margin: 0 auto;
        }
      }

      @media only screen and (max-width: 550px) {
        .team-list__conference {
          margin: 0;
          padding: 20px;
        }
        .team-card__heading {
          flex-direction: column;
          min-width: 259px;
        }
        .team-card__links {
          font-size: 14px;
        }
      }
    `}</style>
  </div>
);

export default Layout;
