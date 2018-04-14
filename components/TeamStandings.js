const TeamStandings = props => {
    const teams = props.teamStats.map(ts => ts.teams[0]);

    const { error } = props;

    if (error) {
        return (
            <div className="error">
                <h1>There was a problem with the request.</h1>
                <hr />
                {error.message && <p>{error.message}</p>}
            </div>
        );
    }

    // sort by total points, desc
    teams.sort((a, b) => b.teamStats[0].splits[0].stat.pts - a.teamStats[0].splits[0].stat.pts);

    // TODO: formatting

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
                <span className="teamstats-teamname">Team Name</span>
                <span className="teamstats-season">Season</span>
                <span className="teamstats-stat">GP</span>
                <span className="teamstats-stat">W</span>
                <span className="teamstats-stat">L</span>
                <span className="teamstats-stat">OTL</span>
                <span className="teamstats-stat">Pts</span>
            </li>
            {teams.map((team, i) => {
                const { stat } = team.teamStats[0].splits[0];
                return (
                    <li
                        key={team.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <span className="badge badge-secondary badge-pill teamstats-rank">
                            {i + 1}
                        </span>
                        <span className="teamstats-teamname">{team.name}</span>
                        <span className="teamstats-season">2017-18</span>
                        <span className="teamstats-stat">{stat.gamesPlayed}</span>
                        <span className="teamstats-stat">{stat.wins}</span>
                        <span className="teamstats-stat">{stat.losses}</span>
                        <span className="teamstats-stat">{stat.ot}</span>
                        <span className="teamstats-stat">{stat.pts}</span>
                    </li>
                );
            })}
        </ul>
    );
};

export default TeamStandings;