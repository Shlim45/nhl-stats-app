import 'isomorphic-unfetch';

import { teamLogo, playerPhoto } from '../handlers';

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
    const { stat } = player.stats[0];
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
            {playerExpanded && teamLogo(playerExpanded.currentTeam.id, 5, 50)}
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
        {/* temporarily dump all stats onto page */}
        <section className="player-stats__stats">
          <div className="player-stats__stats-list player-stats__season-stats">
            <h2>Season Stats</h2>
            {Object.getOwnPropertyNames(stat).map(val => (
              <div className="player-stats__stats--stat-line" key={val}>
                <span className="player-stats__stats--stat-name">{val}</span>
                <span className="player-stats__stats--stat-value">{stat[val]}</span>
              </div>
            ))}
          </div>

          {playerExpanded && (
            <div className="player-stats__stats-list player-stats__career-stats">
              <h2>Career Stats</h2>
              {Object.getOwnPropertyNames(careerStats).map(val => (
                <div className="player-stats__stats--stat-line" key={val}>
                  <span className="player-stats__stats--stat-name">{val}</span>
                  <span className="player-stats__stats--stat-value">{careerStats[val]}</span>
                </div>
              ))}
            </div>
          )}
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
          // .player-stats__info--headshot {
          //     border-radius: 50%;
          //     border: 1px solid #222;
          //     height: 150px;
          //     width: 150px;
          // }
          .player-stats__info--hero {
            margin-top: -100px;
            text-align: center;
            font-size: 1.4rem;
            font-weight: bold;
            flex: 1;
            align-self: center;
          }
          // .player-stats__info--hero > img {
          //     background-color: white;
          //     box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.4);
          // }
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
          }
          .player-stats__stats-list {
            width: 300px;
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
