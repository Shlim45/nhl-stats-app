import { playerStatsToMap, goalieStatsToMap } from '../scripts/playerstats';

const createPlayerListHeaderItem = (
    id,
    onClick = () => {},
    text = '',
    className = 'playerstats-stat'
) => (
    <button key={id} className={className} id={id} onClick={onClick}>
        {text}
    </button>
);

const createPlayerListHeader = (skaters = true, sortFn = () => {}) =>
    skaters ? (
        <li
            key={'player-list-heading'}
            className="list-group-item active d-flex justify-content-between align-items-center"
        >
            <span className="badge badge-secondary badge-pill playerstats-rank">Rank</span>
            {createPlayerListHeaderItem('jerseyNumber', sortFn, '#', 'playerstats-stat')}
            {createPlayerListHeaderItem('lastName', sortFn, 'Player Name', 'playerstats-fullname')}
            {createPlayerListHeaderItem('primaryPosition', null, 'POS', 'playerstats-stat')}
            {createPlayerListHeaderItem('season', sortFn, 'Season', 'playerstats-season')}
            {playerStatsToMap.map(ps => createPlayerListHeaderItem(ps.id, sortFn, ps.text))}
        </li>
    ) : (
        <li
            key={'player-list-heading'}
            className="list-group-item active d-flex justify-content-between align-items-center"
        >
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

export const createPlayerList = (
    playersArray,
    skaters = true,
    sortingFn = () => {},
    setPlayer = () => {}
) => {
    // clear out players on roster without stats
    const players = playersArray.filter(p => p.stats.length > 0);

    return (
        <ul className="player-list list-group mb-5">
            {createPlayerListHeader(skaters, sortingFn)}
            {players.map((player, i) => {
                const { stat } = player.stats[0];
                return skaters ? (
                    <li
                        key={player.fullName}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <span className="badge badge-secondary badge-pill playerstats-rank">
                            {i + 1}
                        </span>
                        <span className="playerstats-stat">{player.jerseyNumber}</span>
                        <span className="playerstats-fullname" onClick={() => setPlayer(player)}>
                            {player.fullName}
                        </span>
                        <span className="playerstats-stat">
                            {player.primaryPosition.abbreviation}
                        </span>
                        <span className="playerstats-season">2017-18</span>
                        <span className="playerstats-stat">{stat.games}</span>
                        <span className="playerstats-stat">{stat.goals}</span>
                        <span className="playerstats-stat">{stat.assists}</span>
                        <span className="playerstats-stat">{stat.points}</span>
                        <span className="playerstats-stat">{stat.plusMinus}</span>
                    </li>
                ) : (
                    <li
                        key={player.fullName}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <span className="badge badge-secondary badge-pill playerstats-rank">
                            {i + 1}
                        </span>
                        <span className="playerstats-stat">{player.jerseyNumber}</span>
                        <span className="playerstats-fullname" onClick={() => setPlayer(player)}>
                            {player.fullName}
                        </span>
                        <span className="playerstats-stat">
                            {player.primaryPosition.abbreviation}
                        </span>
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
