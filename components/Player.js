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
        const { player, playerExpanded } = this.state;
        const { clearPlayer } = this.props;
        const { stat } = player.stats[0];
        const careerStats = playerExpanded ? playerExpanded.stats[1].splits[0].stat : null;

        return (
            <section className="player-stats">
                <header>
                    <h1>Player Stats</h1>
                    <p>under construction...</p>
                    <a href="#" onClick={clearPlayer}>
                        Clear Player
                    </a>
                </header>

                <hr />

                <div className="player-stats__info">
                    <img
                        src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${
                            player.id
                        }.png`}
                        alt={player.fullName}
                        className="player-stats__info--headshot"
                    />
                    {playerExpanded && (
                        <div className="player-stats__info--info">
                            <p>
                                {player.jerseyNumber} - {player.fullName}
                            </p>
                            <p>Position: {player.primaryPosition.name}</p>
                            <p>Age: {playerExpanded.currentAge}</p>
                            <p>DOB: {playerExpanded.birthDate}</p>
                            <p>
                                Birthplace:{' '}
                                {playerExpanded.birthCity +
                                    ', ' +
                                    playerExpanded.birthStateProvince}
                            </p>
                            <p>Nationality: {playerExpanded.birthCountry}</p>
                            <p>Height: {playerExpanded.height}</p>
                            <p>Weight: {playerExpanded.weight} lbs.</p>
                            <p>Shoots/Catches: {playerExpanded.shootsCatches}</p>
                        </div>
                    )}
                </div>

                <section className="player-stats__stats">
                    <div className="player-stats__season-stats">
                        <h2>Season Stats</h2>
                        {Object.getOwnPropertyNames(stat).map(val => (
                            <p key={val}>{val + ' -> ' + stat[val]}</p>
                        ))}
                    </div>

                    {playerExpanded && (
                        <div className="player-stats__career-stats">
                            <h2>Career Stats</h2>
                            {Object.getOwnPropertyNames(careerStats).map(val => (
                                <p key={val}>{val + ' -> ' + careerStats[val]}</p>
                            ))}
                        </div>
                    )}
                </section>

                <style jsx>{`
                    .player-stats {
                        width: 90%;
                        display: flex;
                        flex-direction: column;
                        margin: 10px auto;
                    }
                    .player-stats__info {
                        height: 200px;
                        display: flex;
                        justify-content: space-evenly;
                    }
                    .player-stats__info--headshot {
                        border-radius: 50%;
                        border: 1px solid #222;
                        height: 150px;
                        width: 150px;
                    }
                    .player-stats__info--info {
                        display: flex;
                        flex-direction: column;
                        flex-wrap: wrap;
                        justify-content: flex-start;
                        align-content: center;
                        line-height: 2;
                        letter-spacing: 0.5px;
                    }
                    .player-stats__info--info > p {
                        margin: 0;
                        padding-right: 25px;
                    }
                    .player-stats__stats {
                        display: flex;
                        justify-content: space-around;
                    }
                    .player-stats__stats h2 {
                        padding-bottom: 15px;
                        border-bottom: 3px solid #aaa;
                        width: 60%;
                    }
                `}</style>
            </section>
        );
    }
}

// https://statsapi.web.nhl.com/api/v1/people/${player.id}?expand=person.stats&stats=yearByYear,careerRegularSeason&expand=stats.team&site=en_nhl

export default Player;
