import { sortPlayers } from '../handlers/lists';

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

        if (this.state.skaters) {
            players = players.filter(p => p.primaryPosition.code !== 'G');
        } else {
            players = players.filter(p => p.primaryPosition.code === 'G');
        }

        // TODO figure out how to style this button
        function createButton(id, onClick = () => {}, text = '', className = 'playerstats-stat') {
            return (
                <button className={className} id={id} onClick={onClick}>
                    {text}
                </button>
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
                            <button
                                className="playerstats-stat"
                                id="games"
                                onClick={this.handleSort}
                            >
                                GP
                            </button>
                            <button
                                className="playerstats-stat"
                                id="goals"
                                onClick={this.handleSort}
                            >
                                G
                            </button>
                            <button
                                className="playerstats-stat"
                                id="assists"
                                onClick={this.handleSort}
                            >
                                A
                            </button>
                            <button
                                className="playerstats-stat"
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
                            <button
                                className="playerstats-stat"
                                id="games"
                                onClick={this.handleSort}
                            >
                                GP
                            </button>
                            <button
                                className="playerstats-stat"
                                id="gamesStarted"
                                onClick={this.handleSort}
                            >
                                GS
                            </button>
                            <button
                                className="playerstats-stat"
                                id="wins"
                                onClick={this.handleSort}
                            >
                                W
                            </button>
                            <button
                                className="playerstats-stat"
                                id="losses"
                                onClick={this.handleSort}
                            >
                                L
                            </button>
                            <button className="playerstats-stat" id="ot" onClick={this.handleSort}>
                                OTL
                            </button>
                            <button
                                className="playerstats-stat"
                                id="shotsAgainst"
                                onClick={this.handleSort}
                            >
                                SA
                            </button>
                            <button
                                className="playerstats-stat"
                                id="saves"
                                onClick={this.handleSort}
                            >
                                Svs
                            </button>
                            <button
                                className="playerstats-stat"
                                id="goalsAgainst"
                                onClick={this.handleSort}
                            >
                                GA
                            </button>
                            <button
                                className="playerstats-stat"
                                id="savePercentage"
                                onClick={this.handleSort}
                            >
                                Sv%
                            </button>
                            <button
                                className="playerstats-stat"
                                id="goalAgainstAverage"
                                onClick={this.handleSort}
                            >
                                GAA
                            </button>
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
