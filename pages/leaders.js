import 'isomorphic-unfetch';

import Layout from '../components/Layout';
import PlayerStats from '../containers/PlayerStats';

const CURRENT_SEASON = '20172018';

const Leaders = props => {
    return (
        <Layout>
            <div>
                <h2 className="mb-5 mt-5">League Leaders</h2>
                {props.playerStats ? (
                    <PlayerStats {...props} playerStats={props.playerStats} />
                ) : null}
            </div>
        </Layout>
    );
};

Leaders.getInitialProps = async function() {
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
        const rosters = results.map(r => r.teams[0].franchise.roster.roster);

        const players = rosters.reduce((acc, roster) => {
            return [...acc, ...roster];
        }, []);

        // sort results by points
        const playerStats = players
            .map(p => ({
                jerseyNumber: p.jerseyNumber,
                fullName: p.person.fullName,
                link: p.person.link,
                firstName: p.person.firstName,
                lastName: p.person.lastName,
                active: p.person.active,
                primaryPosition: p.person.primaryPosition,
                stats: p.person.stats[0].splits.filter(s => s.season === CURRENT_SEASON),
            }))
            .filter(p => p.stats.length > 0) // remove players with no stats
            .sort((a, b) => (a.stats[0].stat.points < b.stats[0].stat.points ? 1 : -1));

        return {
            playerStats,
        };
    } catch (error) {
        console.error(error);
        return {
            error,
        };
    }
};

export default Leaders;