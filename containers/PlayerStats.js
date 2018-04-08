const PlayerStats = props => {
    const players = props.playerStats;

    // sort by total points, desc
    players.sort((a, b) => b.stats[0].stat.points - a.stats[0].stat.points);

    // TODO: separation of skaters and goalies

    return (
        <ul className="team-list list-group mb-5">
            <li
                key={'team-list-heading'}
                className="list-group-item active d-flex justify-content-between align-items-center"
            >
                <span
                    className="badge badge-secondary badge-pill teamstats-rank"
                    style={{ width: 2.5 + 'rem' }}
                >
                    Rank
                </span>
                <span className="teamstats-teamname">Player Name</span>
                <span className="teamstats-season">Season</span>
                <span className="teamstats-stat">GP</span>
                <span className="teamstats-stat">G</span>
                <span className="teamstats-stat">A</span>
                <span className="teamstats-stat">Pts</span>
                <span className="teamstats-stat">+/-</span>
            </li>
            {players.map((player, i) => {
                const { stat } = player.stats[0];
                return (
                    <li
                        key={player.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <span className="badge badge-secondary badge-pill teamstats-rank">
                            {i + 1}
                        </span>
                        <span className="teamstats-teamname">{player.fullName}</span>
                        <span className="teamstats-season">2017-18</span>
                        <span className="teamstats-stat">{stat.games}</span>
                        <span className="teamstats-stat">{stat.goals}</span>
                        <span className="teamstats-stat">{stat.assists}</span>
                        <span className="teamstats-stat">{stat.points}</span>
                        <span className="teamstats-stat">{stat.plusMinus}</span>
                    </li>
                );
            })}
            <style jsx>{`
                .team-list {
                    max-width: 850px;
                    min-width: 500px;
                }

                .teamstats-rank {
                    width: 2.5rem;
                }

                .teamstats-teamname {
                    width: 10rem;
                }

                .teamstats-season {
                    width: 4rem;
                }

                .teamstats-stat {
                    width: 2rem;
                }
            `}</style>
        </ul>
    );
};

export default PlayerStats;
