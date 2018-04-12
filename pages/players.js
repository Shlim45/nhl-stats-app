import 'isomorphic-unfetch';

import Layout from '../components/Layout';
import PlayerStats from '../containers/PlayerStats';
import Link from 'next/link';

const CURRENT_SEASON = '20172018';
let teamId;

const Players = props =>
    props.players ? ( // show roster's stats
        <Layout>
            <div>
                <h2 className="mb-5 mt-5">Player Statistics</h2>
                <PlayerStats {...props} players={props.players} playerStats={props.playerStats} />
            </div>
        </Layout>
    ) : (
        // show list of teams if no teamid in url query
        <Layout>
            <div>
                <h2 className="mb-5 mt-5">Team List</h2>
                {props.teams.map(team => (
                    <Link key={team.id} href={`/players?teamId=${team.id}`}>
                        <p>
                            <a href="#">{team.name}</a>
                        </p>
                    </Link>
                ))}
            </div>
        </Layout>
    );

Players.getInitialProps = async function(props) {
    teamId = props.query.teamId;

    const URL = 'https://statsapi.web.nhl.com/api/v1/teams/';
    const statsParams =
        '?hydrate=franchise(roster(season=' +
        CURRENT_SEASON +
        ',person(name,stats(splits=[yearByYear]))))';
    try {
        if (teamId) {
            const res = await fetch(URL + teamId + statsParams);
            const data = await res.json();

            const players = data.teams[0].franchise.roster.roster;

            const playerStats = players.map(p => ({
                jerseyNumber: p.jerseyNumber,
                fullName: p.person.fullName,
                link: p.person.link,
                firstName: p.person.firstName,
                lastName: p.person.lastName,
                active: p.person.active,
                primaryPosition: p.person.primaryPosition,
                stats: p.person.stats[0].splits.filter(s => s.season === CURRENT_SEASON),
            }));

            return {
                players,
                playerStats,
            };
        } else {
            const res = await fetch(URL);
            const data = await res.json();

            const { teams } = data;

            return { teams };
        }
    } catch (error) {
        console.error(error);
        return {
            error,
        };
    }
};

export default Players;
