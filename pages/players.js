import 'isomorphic-unfetch';

import Layout from '../components/Layout';
import PlayerStats from '../containers/PlayerStats';

const CURRENT_SEASON = '20172018';

const Players = props => {
    return (
        <Layout>
            <div>
                <h2 className="mb-5 mt-5">Player Statistics</h2>
                <PlayerStats {...props} players={props.players} playerStats={props.playerStats} />
            </div>
        </Layout>
    );
};

Players.getInitialProps = async function() {
    const URL = 'https://statsapi.web.nhl.com/api/v1/teams/';
    const statsParams =
        '?hydrate=franchise(roster(season=' +
        CURRENT_SEASON +
        ',person(name,stats(splits=[yearByYear]))))';
    try {
        const res = await fetch(URL);
        const data = await res.json();

        const promises = await data.teams.map(team =>
            fetch(URL + team.id + statsParams).then(res => res.json())
        );

        const results = await Promise.all(promises);

        const players = results[4].teams[0].franchise.roster.roster;

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
