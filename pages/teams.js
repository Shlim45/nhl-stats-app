import 'isomorphic-unfetch';

import Layout from '../components/Layout';
import TeamStandings from '../components/TeamStandings';
import TeamList from '../containers/TeamList';

const CURRENT_SEASON = '20172018';

class Teams extends React.Component {
  static async getInitialProps() {
    const URL = 'https://statsapi.web.nhl.com/api/v1/teams/';
    const statsParams = `?expand=team.stats&season=${CURRENT_SEASON}`;
    try {
      const res = await fetch(URL);
      const data = await res.json();

      const promises = await data.teams.map(team => fetch(URL + team.id + statsParams).then(res => res.json()));

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
  }

  constructor(props) {
    super(props);

    this.state = {
      teamId: null,
      showStandings: false,
    };

    this.setTeamId = this.setTeamId.bind(this);
  }

  setTeamId = teamId => {
    this.setState({ teamId });
  };

  toggleStandings = e => {
    const showStandings = !this.state.showStandings;
    this.setState({ showStandings });
    if (showStandings) {
      e.target.textContent = 'View Teams';
    } else {
      e.target.textContent = 'View Standings';
    }
  };
  // TODO This is not what I want to do with TeamList...
  render() {
    return (
      <Layout>
        <div>
          <h2 className="mb-5 mt-5">NHL team statistics</h2>
          <button className="btn btn-secondary mb-5" onClick={this.toggleStandings}>
            View Standings
          </button>
          {this.state.showStandings ? (
            <TeamStandings {...this.props} teamStats={this.props.teamStats} />
          ) : (
            <TeamList {...this.props} setTeamId={this.setTeamId} />
          )}
        </div>
      </Layout>
    );
  }
}

export default Teams;
