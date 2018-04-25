import 'isomorphic-unfetch';

import Layout from '../components/Layout';
import Player from '../components/Player';
import PlayerStatsList from '../components/PlayerStatsList';

const CURRENT_SEASON = '20172018';

class Leaders extends React.Component {
  static getInitialProps = async function() {
    const URL = 'https://statsapi.web.nhl.com/api/v1/teams/';
    const statsParams = `?hydrate=franchise(roster(season=${CURRENT_SEASON},person(name,stats(splits=[yearByYear]))))`;
    try {
      const res = await fetch(URL);
      const data = await res.json();

      const promises = await data.teams.map(team => fetch(URL + team.id + statsParams).then(res => res.json()));

      const results = await Promise.all(promises);
      const rosters = results.map(r => r.teams[0].franchise.roster.roster);

      const players = rosters.reduce((acc, roster) => [...acc, ...roster], []);

      // sort results by points
      const playerStats = players
        .map(p => ({
          id: p.person.id,
          jerseyNumber: p.jerseyNumber,
          fullName: p.person.fullName,
          link: p.person.link,
          firstName: p.person.firstName,
          lastName: p.person.lastName,
          active: p.person.active,
          currentTeam: p.person.currentTeam,
          primaryPosition: p.person.primaryPosition,
          stats: p.person.stats[0].splits.filter(s => s.season === CURRENT_SEASON),
        }))
        .filter(p => p.stats.length > 0) // remove players with no stats
        .sort((a, b) => (a.stats[0].stat.points < b.stats[0].stat.points ? 1 : -1));

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

  constructor(props) {
    super(props);

    this.state = {
      player: null,
    };
  }

  setPlayer = player => {
    this.setState({ player });
  };

  clearPlayer = () => {
    this.setState({ player: null });
  };

  render() {
    const { props } = this;
    const { player } = this.state;

    return player ? (
      <Player player={player} clearPlayer={this.clearPlayer} />
    ) : (
      <Layout>
        <div>
          <h2 className="mb-5 mt-5">League Leaders</h2>
          {props.playerStats ? (
            <PlayerStatsList
              {...props}
              players={props.players}
              playerStats={props.playerStats}
              setPlayer={this.setPlayer}
            />
          ) : null}
        </div>
      </Layout>
    );
  }
}

export default Leaders;
