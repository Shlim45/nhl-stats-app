const Team = props => {
    const { team, stats, setTeamId, ...extraProps } = props;
    const { stat } = stats.teams[0].teamStats[0].splits[0];
    return (
        <div className="col-xs-10 col-sm-6 col-xl-3 mx-auto" style={{ maxWidth: 320 + 'px' }}>
            <div
                className="card border-secondary mb-5"
                style={{ maxWidth: 20 + 'rem', width: 340 + 'px' }}
            >
                <div className="card-header">{team.name}</div>
                <div className="card-body">
                    <p className="card-text">
                        GP: {stat.gamesPlayed} &nbsp; W: {stat.wins} &nbsp; L: {stat.losses} &nbsp;
                        OTL: {stat.ot} &nbsp; PTS: {stat.pts}
                    </p>
                    <a
                        href="#"
                        onClick={() => {
                            setTeamId(team.id);
                        }}
                    >
                        View Player Stats
                    </a>
                    <a
                        href={team.officialSiteUrl}
                        alt={team.name + ' official site'}
                        target="_blank"
                    >
                        Official {team.teamName} Website
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Team;
