import Team from '../components/Team';

const TeamList = props => {
    const {teams} = props.teams;
    return (
    <div className="team-list">
        {teams.map(team => <Team key={teams.id} team={team} />)
        }
    </div>
);
};

export default TeamList;
