import { sortPlayers, paginatePlayers } from '../handlers/lists';
import { createPlayerList } from '../handlers';

// TODO fix bug with traded players not showing all stats (i.e. Riley Sheahan)

const TogglePlayers = props => {
    const { skaters, handleClick } = props;
    return (
        <button className="btn btn-sm btn-secondary mb-5" onClick={handleClick}>
            {skaters ? 'View Goalies' : 'View Skaters'}
        </button>
    );
};

const PageController = props => {
    const { togglePages, currentPage } = props;
    return (
        <div className="page-controller">
            <button id="firstPage" onClick={togglePages}>
                {'<<'}
            </button>
            &nbsp;
            <button id="prevPage" onClick={togglePages}>
                {'<'}
            </button>
            &ensp;<span className="page-controller__current-page">{currentPage + 1}</span>&ensp;
            <button id="nextPage" onClick={togglePages}>
                {'>'}
            </button>
            &nbsp;
            <button id="lastPage" onClick={togglePages}>
                {'>>'}
            </button>
            <style jsx>{`
                .page-controller {
                    margin: 30px auto;
                }
                .page-controller > button {
                    width: 40px;
                    border: 0;
                    background-color: inherit;
                    color: inherit;
                    transition: all 0.2s ease-in-out;
                }
                .page-controller > button:hover {
                    background-color: #282828;
                    font-weight: bold;
                    cursor: pointer;
                }
                .page-controller__current-page {
                    width: 40px;
                    color: rgba(255, 255, 255, 0.7);
                }
            `}</style>
        </div>
    );
};
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
            pages: [],
        };
    }

    componentDidMount() {
        let { players, skaters } = this.state;
        players = skaters
            ? players.filter(p => p.primaryPosition.code !== 'G')
            : players.filter(p => p.primaryPosition.code === 'G' && p.stats[0].stat.shotsAgainst);
        const pages = paginatePlayers(players, this.state.perPage);
        this.setState({ pages });
    }

    handleSort = e => {
        const sortBy = e.target.id;
        const { players, sortedBy, asc } = this.state;
        // if sorting by same stat, toggle ascending
        const newAsc = sortedBy === sortBy ? !asc : sortBy === 'lastName' ? true : false;
        const newSorting = sortPlayers(players, sortBy, newAsc);

        const filteredPlayers = this.state.skaters
            ? newSorting.filter(p => p.primaryPosition.code !== 'G')
            : newSorting.filter(
                  p => p.primaryPosition.code === 'G' && p.stats[0].stat.shotsAgainst
              );
        const pages = paginatePlayers(filteredPlayers, this.state.perPage);

        this.setState({ players: newSorting, sortedBy: sortBy, asc: newAsc, pages });
    };

    togglePlayers = e => {
        const skaters = !this.state.skaters;
        if (!skaters) {
            const sortedBy = 'points';
            const newSorting = sortPlayers(this.state.players, sortedBy);
            const players = newSorting.filter(
                p => p.primaryPosition.code === 'G' && p.stats[0].stat.shotsAgainst
            );
            const pages = paginatePlayers(players, this.state.perPage);
            this.setState({
                players: newSorting,
                skaters,
                sortedBy,
                asc: false,
                pages,
                currentPage: 0,
            });
        } else {
            const sortedBy = 'wins';
            const newSorting = sortPlayers(this.state.players, sortedBy);
            const players = newSorting.filter(p => p.primaryPosition.code !== 'G');
            const pages = paginatePlayers(players, this.state.perPage);
            this.setState({
                players: newSorting,
                skaters,
                sortedBy,
                asc: false,
                pages,
                currentPage: 0,
            });
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
                if (this.state.currentPage < this.state.pages.length - 1) {
                    this.setState({ currentPage: this.state.currentPage + 1 });
                }
                break;
            case 'lastPage':
                this.setState({ currentPage: this.state.pages.length - 1 });
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
        const { skaters, pages } = this.state;
        players = skaters
            ? players.filter(p => p.primaryPosition.code !== 'G')
            : players.filter(p => p.primaryPosition.code === 'G' && p.stats[0].stat.shotsAgainst);

        return (
            <div className="container">
                <TogglePlayers skaters={skaters} handleClick={this.togglePlayers} />
                {pages.length > 1 && (
                    <PageController
                        togglePages={this.togglePages}
                        currentPage={this.state.currentPage}
                    />
                )}
                {pages.length > 0 &&
                    createPlayerList(
                        this.state.pages[this.state.currentPage],
                        skaters,
                        this.handleSort,
                        setPlayer
                    )}
                {pages.length > 1 && (
                    <PageController
                        togglePages={this.togglePages}
                        currentPage={this.state.currentPage}
                    />
                )}
            </div>
        );
    }
}

export default PlayerStatsList;
