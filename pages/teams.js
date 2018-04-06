import Layout from '../components/Layout';
import TeamList from '../containers/TeamList';

const Teams = props => (
    <Layout>
        <div>
            <h1>NHL Teams</h1>
            <TeamList teams={props.teams} />
        </div>
    </Layout>
);

Teams.getInitialProps = async function() {
    const res = await fetch('https://statsapi.web.nhl.com/api/v1/teams/');
    const data = await res.json();

    return {
        teams: data,
    };
};

export default Teams;
