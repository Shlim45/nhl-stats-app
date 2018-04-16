import { sortPlayers, paginatePlayers } from '../handlers/lists';
import { createPlayerList } from '../handlers';

// TODO fix bug with traded players not showing all stats (i.e. Riley Sheahan)
class PlayerStatsList extends React.Component {
    constructor(props) {
        super(props);

        const { playerStats, ...extraProps } = props;
        const players = sortPlayers(playerStats, 'points', false);

        this.state = {
            players,
            skaters: true,
            sortedBy: 'points',
            asc: false,
            currentPage: 0,
            perPage: 25,
            lastPage: Math.ceil(players.length / 25) - 1, // 0 based pages
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
            this.setState({ players: newSorting, skaters, sortedBy, asc: false });
        } else {
            const sortedBy = 'wins';
            const newSorting = sortPlayers(this.state.players, sortedBy);
            this.setState({ players: newSorting, skaters, sortedBy, asc: false });
        }
    };

    togglePages = e => {
        const { id } = e.target;
        switch (id) {
            case 'firstPage':
                this.setState({ currentPage: 0 });
                break;
            case 'prevPage':
                if (this.state.currentPage > 0) {
                    this.setState({ currentPage: this.state.currentPage - 1 });
                }
                break;
            case 'nextPage':
                if (this.state.currentPage < this.state.lastPage) {
                    this.setState({ currentPage: this.state.currentPage + 1 });
                }
                break;
            case 'lastPage':
                this.setState({ currentPage: this.state.lastPage });
                break;
            default:
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
                {createPlayerList(
                    paginatePlayers(players, this.state.currentPage, this.state.perPage),
                    this.state.skaters,
                    this.handleSort,
                    setPlayer
                )}
                <button
                    id="firstPage"
                    className="btn btn-sm btn-secondary"
                    onClick={this.togglePages}
                >
                    {'<<'}
                </button>
                &nbsp;
                <button
                    id="prevPage"
                    className="btn btn-sm btn-secondary"
                    onClick={this.togglePages}
                >
                    {'<'}
                </button>
                &ensp;
                <button
                    id="nextPage"
                    className="btn btn-sm btn-secondary"
                    onClick={this.togglePages}
                >
                    {'>'}
                </button>
                &nbsp;
                <button
                    id="lastPage"
                    className="btn btn-sm btn-secondary"
                    onClick={this.togglePages}
                >
                    {'>>'}
                </button>
            </div>
        );
    }
}

export default PlayerStatsList;
