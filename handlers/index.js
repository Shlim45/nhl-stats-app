import { playerStatsToMap, goalieStatsToMap } from '../scripts/playerstats';

const createPlayerListHeaderItem = (id, onClick = () => {}, text = '', className = 'playerstats-stat') => (
  <button key={id} className={className} id={id} onClick={onClick}>
    {text}
  </button>
);

const createPlayerListHeader = (skaters = true, sortFn = () => {}) =>
  skaters ? (
    <li key="player-list-heading" className="list-group-item active d-flex justify-content-between align-items-center">
      <span className="badge badge-secondary badge-pill playerstats-rank">Rank</span>
      {createPlayerListHeaderItem('jerseyNumber', sortFn, '#', 'playerstats-stat')}
      {createPlayerListHeaderItem('lastName', sortFn, 'Player Name', 'playerstats-fullname')}
      {createPlayerListHeaderItem('primaryPosition', null, 'POS', 'playerstats-stat')}
      {createPlayerListHeaderItem('season', sortFn, 'Season', 'playerstats-season')}
      {playerStatsToMap.map(ps => createPlayerListHeaderItem(ps.id, sortFn, ps.text))}
    </li>
  ) : (
    <li key="player-list-heading" className="list-group-item active d-flex justify-content-between align-items-center">
      <span className="badge badge-secondary badge-pill playerstats-rank">Rank</span>
      {createPlayerListHeaderItem('jerseyNumber', sortFn, '#', 'playerstats-stat')}
      {createPlayerListHeaderItem('lastName', sortFn, 'Player Name', 'playerstats-fullname')}
      {createPlayerListHeaderItem('primaryPosition', null, 'POS', 'playerstats-stat')}
      <button className="playerstats-season" id="season" onClick={sortFn}>
        Season
      </button>
      {goalieStatsToMap.map(gs => createPlayerListHeaderItem(gs.id, sortFn, gs.text))}
    </li>
  );

export const createPlayerList = (playersArray, skaters = true, sortingFn = () => {}, setPlayer = () => {}) => {
  // clear out players on roster without stats
  const players = playersArray.filter(p => p.stats.length > 0);

  return (
    <ul className="player-list list-group mb-5">
      {createPlayerListHeader(skaters, sortingFn)}
      {players.map((player, i) => {
        const { stat } = player.stats[0];
        return skaters ? (
          <li key={player.fullName} className="list-group-item d-flex justify-content-between align-items-center">
            <span className="badge badge-secondary badge-pill playerstats-rank">{i + 1}</span>
            <span className="playerstats-stat">{player.jerseyNumber}</span>
            <span className="playerstats-fullname" onClick={() => setPlayer(player)}>
              {player.fullName}
            </span>
            <span className="playerstats-stat">{player.primaryPosition.abbreviation}</span>
            <span className="playerstats-season">2017-18</span>
            <span className="playerstats-stat">{stat.games}</span>
            <span className="playerstats-stat">{stat.goals}</span>
            <span className="playerstats-stat">{stat.assists}</span>
            <span className="playerstats-stat">{stat.points}</span>
            <span className="playerstats-stat">{stat.plusMinus}</span>
          </li>
        ) : (
          <li key={player.fullName} className="list-group-item d-flex justify-content-between align-items-center">
            <span className="badge badge-secondary badge-pill playerstats-rank">{i + 1}</span>
            <span className="playerstats-stat">{player.jerseyNumber}</span>
            <span className="playerstats-fullname" onClick={() => setPlayer(player)}>
              {player.fullName}
            </span>
            <span className="playerstats-stat">{player.primaryPosition.abbreviation}</span>
            <span className="playerstats-season">2017-18</span>
            <span className="playerstats-stat">{stat.games}</span>
            <span className="playerstats-stat">{stat.gamesStarted}</span>
            <span className="playerstats-stat">{stat.wins}</span>
            <span className="playerstats-stat">{stat.losses}</span>
            <span className="playerstats-stat">{stat.ot}</span>
            <span className="playerstats-stat">{stat.shotsAgainst}</span>
            <span className="playerstats-stat">{stat.saves}</span>
            <span className="playerstats-stat">{stat.goalsAgainst}</span>
            <span className="playerstats-stat">{stat.savePercentage}</span>
            <span className="playerstats-stat">{stat.goalAgainstAverage}</span>
          </li>
        );
      })}
    </ul>
  );
};

export const teamLogo = (teamId, margin, width, height = width) => {
  const logoURL = `https://www-league.nhlstatic.com/builds/site-core/86d4b76cc03a4d111ee0e20f9f62eb054eef3b74_1502985652/images/logos/team/current/team-${teamId}-dark.svg`;
  return (
    <img
      className="team-logo"
      src={logoURL}
      alt="team logo"
      style={{
        backgroundColor: 'white',
        margin: `${margin}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  );
};

export const playerPhoto = player => (
  <div className="player-stats__info--headshot">
    <img
      src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${player.id}.png`}
      alt={player.fullName}
      className="player-stats__info--headshot"
    />
    <style jsx>{`
      .player-stats__info--headshot {
        border-radius: 50%;
        height: 150px;
        width: 150px;
        background-color: white;
        box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.4);
        margin: 0 auto;
      }
    `}</style>
  </div>
);
