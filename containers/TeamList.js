import Team from '../components/Team';

const TeamList = props => {
    const { teams } = props.teams;
    return (
        <div className="team-list row">{teams.map(team => <Team key={team.id} team={team} />)}</div>
    );
};

export default TeamList;
