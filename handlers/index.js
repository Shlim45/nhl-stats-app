import { playerStatsToMap, goalieStatsToMap } from '../scripts/playerstats';

export const createPlayerListHeaderItem = (
    id,
    onClick = () => {},
    text = '',
    className = 'playerstats-stat'
) => (
    <button key={id} className={className} id={id} onClick={onClick}>
        {text}
    </button>
);

export const createPlayerListHeader = (skaters = true, sortFn = () => {}) =>
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
