import 'isomorphic-unfetch';

import { teamLogo, playerPhoto } from '../handlers';
import { singlePlayerStatsTable } from '../handlers/lists';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: this.props.player,
      playerExpanded: null,
    };
  }

  componentDidMount = async () => {
    const { player } = this.props;

    const URL = `https://statsapi.web.nhl.com/api/v1/people/${
      player.id
    }?expand=person.stats&stats=yearByYear,careerRegularSeason&expand=stats.team&site=en_nhl`;

    const res = await fetch(URL);
    const data = await res.json();

    const playerExpanded = data.people[0];

    this.setState({ playerExpanded });
  };

  render() {
    const { player, playerExpanded } = this.state;
    const { clearPlayer } = this.props;
    const careerStats = playerExpanded ? playerExpanded.stats[1].splits[0].stat : null;

    return (
      <section className="player-stats">
        <header>
          <h1>Player Stats</h1>
          <p>under construction...</p>
          <a href="#" onClick={clearPlayer}>
            Clear Player
          </a>
        </header>

        <hr />

        <div className="player-stats__info">
          <div className="player-stats__info--hero">
            {playerPhoto(player, 'player-stats__info--headshot')}
            <p>
              #{player.jerseyNumber} {player.fullName}
            </p>
            {playerExpanded && teamLogo(playerExpanded.currentTeam.id, '5px', '50px')}
          </div>
          {playerExpanded && (
            <div className="player-stats__info--info">
              <p>Position: {player.primaryPosition.name}</p>
              <p>Age: {playerExpanded.currentAge}</p>
              <p>DOB: {playerExpanded.birthDate}</p>
              <p>
                Birthplace:{' '}
                {`${playerExpanded.birthCity +
                  (playerExpanded.birthStateProvince ? `, ${playerExpanded.birthStateProvince}` : '')}, ${
                  playerExpanded.birthCountry
                }`}
              </p>
              <p>Height: {playerExpanded.height}</p>
              <p>Weight: {playerExpanded.weight} lbs.</p>
              <p>
                {player.primaryPosition.type === 'Goalie' ? 'Catches' : 'Shoots'}: {playerExpanded.shootsCatches}
              </p>
            </div>
          )}
        </div>

        <section className="player-stats__stats">
          <div className="player-stats__stats-list player-stats__season-stats">
            <h2>Player Statistics</h2>
            {singlePlayerStatsTable(player, playerExpanded)}
          </div>
        </section>

        <style jsx>{`
          .player-stats {
            font-family: 'Fira Sans', sans-serif;
            width: 60vw;
            min-width: 500px;
            display: flex;
            flex-direction: column;
            margin: 10px auto;
          }
          .player-stats__info {
            height: 320px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            padding: 40px 0;
            border-bottom: 4px solid grey;
          }
          .player-stats__info--hero {
            margin-top: -100px;
            text-align: center;
            font-size: 1.4rem;
            font-weight: bold;
            flex: 1;
            align-self: center;
          }
          .player-stats__info--info {
            flex: 1;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-content: center;
            line-height: 2;
            letter-spacing: 0.5px;
          }
          .player-stats__info--info > p {
            margin: 0;
            padding-right: 25px;
          }
          .player-stats__stats {
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            margin: 0 auto;
          }
          .player-stats__stats-list {
            width: 60vw;
          }
          .player-stats__stats--stat-line {
            display: flex;
            justify-content: space-between;
            padding-bottom: 10px;
          }
          .player-stats__stats--stat-line:hover {
            background-color: rgba(0, 0, 0, 0.05);
          }
          .player-stats__stats--stat-name {
            font-style: italic;
          }
          .player-stats__stats--stat-value {
            text-align: right;
          }
          .player-stats__stats h2 {
            padding-bottom: 15px;
            border-bottom: 3px solid #aaa;
            text-align: center;
            width: 60%;
            margin: 25px auto;
          }
        `}</style>
      </section>
    );
  }
}

export default Player;
