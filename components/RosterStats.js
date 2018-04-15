import { sortPlayers } from '../handlers/lists';
import { createPlayerList } from '../handlers';

// TODO fix bug with traded players not showing all stats (i.e. Riley Sheahan)
class RosterStats extends React.Component {
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
        const skaters = !this.state.skaters;
        if (!skaters) {
            const sortedBy = 'points';
            const newSorting = sortPlayers(this.state.players, sortedBy);
            this.setState({players: newSorting, skaters, sortedBy, asc: false});
        } else {
            const sortedBy = 'wins';
            const newSorting = sortPlayers(this.state.players, sortedBy);
            this.setState({players: newSorting, skaters, sortedBy, asc: false});
        }
    };

    render() {
        const { error, setPlayer } = this.props;

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

        return (
            <div className="container">
                <button className="btn btn-sm btn-secondary mb-5" onClick={this.togglePlayers}>
                    {this.state.skaters ? 'View Goalies' : 'View Skaters'}
                </button>
                {createPlayerList(players, this.state.skaters, this.handleSort, setPlayer)}
            </div>
        );
    }
}

export default RosterStats;
