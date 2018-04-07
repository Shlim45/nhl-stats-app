import Team from '../components/Team';

const TeamList = props => {
    const { teams } = props.teams;
    const { teamStats } = props;

    return (
        <div className="team-list row">
            {teams.map((team, i) => <Team key={team.id} team={team} stats={teamStats[i]} />)}
        </div>
    );
};

export default TeamList;
