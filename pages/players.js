import 'isomorphic-unfetch';

import Layout from '../components/Layout';
import PlayerStats from '../containers/PlayerStats';

const CURRENT_SEASON = '20172018';
let teamId;

const Players = props => {
    console.log(props.players);
    return (
        <Layout>
            <div>
                <h2 className="mb-5 mt-5">Player Statistics</h2>
                <PlayerStats {...props} players={props.players} playerStats={props.playerStats} />
            </div>
        </Layout>
    );
};

Players.getInitialProps = async function(props) {
    teamId = props.query.teamId || 5; // Defaulting to Penguins for now, TODO change initial view

    const URL = 'https://statsapi.web.nhl.com/api/v1/teams/';
    const statsParams =
        '?hydrate=franchise(roster(season=' +
        CURRENT_SEASON +
        ',person(name,stats(splits=[yearByYear]))))';
    try {
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
    } catch (error) {
        console.error(error);
        return {
            error,
        };
    }
};

export default Players;
