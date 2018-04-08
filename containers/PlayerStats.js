import { sortPlayers } from '../handlers/sort';

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
        //TODO ascending/descending
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

        if (error) {
            return (
                <div className="error">
                    <h1>There was a problem with the request.</h1>
                    <hr />
                    {error.message && <p>{error.message}</p>}
                </div>
            );
        }

        // TODO: separation of skaters and goalies

        let { players } = this.state;

        if (this.state.skaters) {
            players = players.filter(p => p.primaryPosition.code !== 'G');
        } else {
            players = players.filter(p => p.primaryPosition.code === 'G');
        }

        return (
            <div className="container">
                <button className="btn btn-sm btn-secondary mb-5" onClick={this.togglePlayers}>
                    View Goalies
                </button>
                <ul className="player-list list-group mb-5">
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
                        <button className="playerstats-stat" id="games" onClick={this.handleSort}>
                            GP
                        </button>
                        <button className="playerstats-stat" id="goals" onClick={this.handleSort}>
                            G
                        </button>
                        <button className="playerstats-stat" id="assists" onClick={this.handleSort}>
                            A
                        </button>
                        <button
                            className="playerstats-stat desc"
                            id="points"
                            onClick={this.handleSort}
                        >
                            Pts
                        </button>
                        <button
                            className="playerstats-stat"
                            id="plusMinus"
                            onClick={this.handleSort}
                        >
                            +/-
                        </button>
                    </li>
                    {players.map((player, i) => {
                        const { stat } = player.stats[0];
                        return (
                            <li
                                key={player.jerseyNumber}
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
                        );
                    })}
                    <style jsx>{`
                        .player-list {
                            max-width: 850px;
                            min-width: 500px;
                        }

                        .player-list button {
                            background-color: inherit;
                            border: none;
                            font: inherit;
                            color: inherit;
                        }

                        .player-list button:hover {
                            cursor: pointer;
                        }

                        .playerstats-rank {
                            width: 2.5rem;
                        }

                        .playerstats-fullname {
                            width: 10rem;
                        }

                        .playerstats-season {
                            width: 4rem;
                        }

                        .playerstats-stat {
                            width: 2rem;
                        }
                    `}</style>
                </ul>
            </div>
        );
    }
}

export default PlayerStats;
