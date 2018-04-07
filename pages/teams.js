import 'isomorphic-unfetch';

import Layout from '../components/Layout';
import TeamList from '../containers/TeamList';

const Teams = props => (
    <Layout>
        <div>
            <h1 className="mb-5">NHL Teams</h1>
            <TeamList teams={props.teams} teamStats={props.teamStats} />
        </div>
    </Layout>
);

Teams.getInitialProps = async function() {
    const URL = 'https://statsapi.web.nhl.com/api/v1/teams/';
    const statsParams = '?expand=team.stats&season=20172018';
    try {
        const res = await fetch(URL);
        const data = await res.json();

        const promises = await data.teams.map(team =>
            fetch(URL + team.id + statsParams).then(res => res.json())
        );

        const teamStats = await Promise.all(promises);

        return {
            teams: data,
            teamStats,
        };
    } catch (error) {
        console.error(error);
        return {
            error,
        };
    }
};

export default Teams;
