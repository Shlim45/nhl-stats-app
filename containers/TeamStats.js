const TeamStats = props => {
    const { teamStats } = props;
    const teams = teamStats.map(ts => ts.teams[0]);

    // sort by total points, desc
    teams.sort((a, b) => b.teamStats[0].splits[0].stat.pts - a.teamStats[0].splits[0].stat.pts);

    // TODO: formatting

    return (
        <ul className="team-list list-group">
            <li
                key={'team-list-heading'}
                className="list-group-item active d-flex justify-content-between align-items-center"
            >
                <span className="badge badge-secondary badge-pill">Rank</span>
                <span className="teamstats-team">Team Name</span>
                <span className="teamstats-team">Season</span>
                <span className="teamstats-team">GP</span>
                <span className="teamstats-team">W</span>
                <span className="teamstats-team">L</span>
                <span className="teamstats-team">OTL</span>
                <span className="teamstats-team">Pts</span>
            </li>
            {teams.map((team, i) => {
                const { stat } = team.teamStats[0].splits[0];
                return (
                    <li
                        key={team.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <span className="badge badge-secondary badge-pill">{i + 1}</span>
                        <span className="teamstats-team">{team.name}</span>
                        <span className="teamstats-team">2017-18</span>
                        <span className="teamstats-team">{stat.gamesPlayed}</span>
                        <span className="teamstats-team">{stat.wins}</span>
                        <span className="teamstats-team">{stat.losses}</span>
                        <span className="teamstats-team">{stat.ot}</span>
                        <span className="teamstats-team">{stat.pts}</span>
                    </li>
                );
            })}
        </ul>
    );
};

export default TeamStats;
