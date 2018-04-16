import 'isomorphic-unfetch';

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
        const { player } = this.state;
        const { clearPlayer } = this.props;
        const { stat } = player.stats[0];
        return (
            <div>
                <h1>Player Stats</h1>
                <p>under construction...</p>
                <a href="#" onClick={clearPlayer}>
                    Clear Player
                </a>
                <hr />
                <img
                    src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${
                        player.id
                    }.png`}
                    alt={player.fullName}
                />
                <p>
                    {player.jerseyNumber} - {player.fullName}
                </p>
                <p>{player.primaryPosition.name}</p>
                {Object.getOwnPropertyNames(stat).map(val => (
                    <p key={val}>{val + ' -> ' + stat[val]}</p>
                ))}
            </div>
        );
    }
}

// https://statsapi.web.nhl.com/api/v1/people/${player.id}?expand=person.stats&stats=yearByYear,careerRegularSeason&expand=stats.team&site=en_nhl

export default Player;
