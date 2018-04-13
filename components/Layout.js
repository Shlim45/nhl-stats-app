import Head from 'next/head';
import Navbar from './Navbar';

const Layout = props => (
    <div>
        <Head>
            <title>NHL Statistics</title>
            <link rel="stylesheet" href="https://bootswatch.com/4/darkly/bootstrap.min.css" />
        </Head>
        <Navbar />
        <div className="container">{props.children}</div>
        <style jsx global>{`
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
                    width: 90%;
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
                min-width: 500px;
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
            .playerstats-rank {
                width: 2.5rem;
            }
            .playerstats-fullname {
                width: 10rem;
            }
            .playerstats-season {
                width: 4rem;
            }
            .playerstats-stat {
                width: 2rem;
            }

            /* TeamStats */

            .team-list {
                max-width: 850px;
                min-width: 500px;
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
        `}</style>
    </div>
);

export default Layout;
