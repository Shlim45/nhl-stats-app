import Team from '../components/Team';
import { filterTeamsByDivision } from '../handlers/lists';

const TeamList = props => {
  const { teams } = props.teams;
  const { teamStats, setTeamId } = props;

  const pacificDiv = filterTeamsByDivision(teams, 'pacific');
  const centralDiv = filterTeamsByDivision(teams, 'central');
  const atlanticDiv = filterTeamsByDivision(teams, 'atlantic');
  const metropolitanDiv = filterTeamsByDivision(teams, 'metropolitan');

  /* FIX ISSUE WITH teamStats NOT MATCHING UP */

  return (
    <div className="team-list">
      <div className="team-list__conference">
        <h3>Western Conference</h3>
        <div className="team-list__conference--division">
          <h5>Pacific Division</h5>
          {pacificDiv.map((team, i) => <Team key={team.id} setTeamId={setTeamId} team={team} stats={teamStats[i]} />)}
        </div>
        <div className="team-list__conference--division">
          <h5>Central Division</h5>
          {centralDiv.map((team, i) => <Team key={team.id} setTeamId={setTeamId} team={team} stats={teamStats[i]} />)}
        </div>
      </div>
      <div className="team-list__conference">
        <h3>Eastern Conference</h3>
        <div className="team-list__conference--division">
          <h5>Atlantic Division</h5>
          {atlanticDiv.map((team, i) => <Team key={team.id} setTeamId={setTeamId} team={team} stats={teamStats[i]} />)}
        </div>
        <div className="team-list__conference--division">
          <h5>Metropolital Division</h5>
          {metropolitanDiv.map((team, i) => (
            <Team key={team.id} setTeamId={setTeamId} team={team} stats={teamStats[i]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamList;
