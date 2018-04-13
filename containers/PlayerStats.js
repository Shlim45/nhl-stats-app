import { sortPlayers } from '../handlers/lists';
import { createPlayerListHeaderItem } from '../handlers';

// TODO fix bug with traded players not showing all stats (i.e. Riley Sheahan)
class PlayerStats extends React.Component {
    constructor(props) {
        super(props);

        const { playerStats, ...extraProps } = props;
        const players = sortPlayers(playerStats, 'points', false);
        this.state = {
            players,
            skaters: true,
            sortedBy: 'points',
            asc: false,
        };
    }

    handleSort = e => {
        const sortBy = e.target.id;
        const { players, sortedBy, asc } = this.state;

        // if sorting by same stat, toggle ascending
        const newAsc = sortedBy === sortBy ? !asc : false;
        const newSorting = sortPlayers(players, sortBy, newAsc);

        this.setState({ players: newSorting, sortedBy: sortBy, asc: newAsc });
    };

    togglePlayers = e => {
        this.setState({ skaters: !this.state.skaters });
        if (!this.state.skaters) {
            e.target.textContent = 'View Goalies';
        } else {
            e.target.textContent = 'View Skaters';
        }
    };

    render() {
        const { error } = this.props;

        const playerStatsToMap = [
            {
                id: 'games',
                text: 'GP',
            },
            {
                id: 'goals',
                text: 'G',
            },
            {
                id: 'assists',
                text: 'A',
            },
            {
                id: 'points',
                text: 'P',
            },
            {
                id: 'plusMinus',
                text: '+/-',
            },
        ];
        const goalieStatsToMap = [
            {
                id: 'games',
                text: 'GP',
            },
            {
                id: 'gamesStarted',
                text: 'GS',
            },
            {
                id: 'wins',
                text: 'W',
            },
            {
                id: 'losses',
                text: 'L',
            },
            {
                id: 'ot',
                text: 'OTL',
            },
            {
                id: 'shotsAgainst',
                text: 'SA',
            },
            {
                id: 'saves',
                text: 'Svs',
            },
            {
                id: 'goalsAgainst',
                text: 'GA',
            },
            {
                id: 'savePercentage',
                text: 'Sv%',
            },
            {
                id: 'goalAgainstAverage',
                text: 'GAA',
            },
        ];

        if (error) {
            return (
                <div className="error">
                    <h1>There was a problem with the request.</h1>
                    <hr />
                    {error.message && <p>{error.message}</p>}
                </div>
            );
        }

        let { players } = this.state;

        // clear out players on roster without stats
        players = players.filter(p => p.stats.length > 0);

        if (this.state.skaters) {
            players = players.filter(p => p.primaryPosition.code !== 'G');
        } else {
            players = players.filter(
                p =>
                    p.primaryPosition.code === 'G' &&
                    p.stats[0].stat.games && // filter out occasions where players
                    p.stats[0].stat.shotsAgainst // who didnt play this season show up
            );
        }

        return (
            <div className="container">
                <button className="btn btn-sm btn-secondary mb-5" onClick={this.togglePlayers}>
                    View Goalies
                </button>
                <ul className="player-list list-group mb-5">
                    {this.state.skaters ? (
                        <li
                            key={'player-list-heading'}
                            className="list-group-item active d-flex justify-content-between align-items-center"
                        >
                            <span className="badge badge-secondary badge-pill playerstats-rank">
                                Rank
                            </span>
                            {createPlayerListHeaderItem(
                                'lastName',
                                this.handleSort,
                                'Player Name',
                                'playerstats-fullname'
                            )}
                            {createPlayerListHeaderItem(
                                'season',
                                this.handleSort,
                                'Season',
                                'playerstats-season'
                            )}
                            {playerStatsToMap.map(ps =>
                                createPlayerListHeaderItem(ps.id, this.handleSort, ps.text)
                            )}
                        </li>
                    ) : (
                        <li
                            key={'player-list-heading'}
                            className="list-group-item active d-flex justify-content-between align-items-center"
                        >
                            <span className="badge badge-secondary badge-pill playerstats-rank">
                                Rank
                            </span>
                            <button
                                className="playerstats-fullname"
                                id="lastName"
                                onClick={this.handleSort}
                            >
                                Player Name
                            </button>
                            <button
                                className="playerstats-season"
                                id="season"
                                onClick={this.handleSort}
                            >
                                Season
                            </button>
                            {goalieStatsToMap.map(gs =>
                                createPlayerListHeaderItem(gs.id, this.handleSort, gs.text)
                            )}
                        </li>
                    )}
                    {players.map((player, i) => {
                        const { stat } = player.stats[0];
                        return this.state.skaters ? (
                            <li
                                key={player.fullName}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <span className="badge badge-secondary badge-pill playerstats-rank">
                                    {i + 1}
                                </span>
                                <span className="playerstats-fullname">{player.fullName}</span>
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
                                <span className="playerstats-fullname">{player.fullName}</span>
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
            </div>
        );
    }
}

export default PlayerStats;
