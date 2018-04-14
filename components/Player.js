const Player = props => {
    const { player, clearPlayer } = props;
    const { stat } = player.stats[0];
    return (
        <div>
            <h1>Player Stats</h1>
            <p>under construction...</p>
            <a href="#" onClick={clearPlayer}>Clear Player</a>
            <hr />
            <p>
                {player.jerseyNumber} - {player.fullName}
            </p>
            <p>{player.primaryPosition.name}</p>
            {Object.getOwnPropertyNames(stat).map(val => <p key={val}>{val + ' -> ' + stat[val]}</p>)}
        </div>
    );
};

export default Player;
