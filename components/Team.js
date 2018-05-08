import Link from 'next/link';
import { teamLogo } from '../handlers';

const Team = props => {
  const { team, stats, setTeamId, ...extraProps } = props;
  const { stat } = stats.teams[0].teamStats[0].splits[0];

  return (
    <div className="team-card">
      <div
        className="team-card__heading"
        onClick={() => {
          setTeamId(team.id);
        }}
      >
        {teamLogo(team.id, '10px', '100px')}
        <h4>{team.name}</h4>
      </div>
      <p className="team-card__stats-line">
        GP: {stat.gamesPlayed} &nbsp; W: {stat.wins} &nbsp; L: {stat.losses} &nbsp; OTL: {stat.ot} &nbsp; PTS:{' '}
        {stat.pts}
      </p>
      <div className="team-card__links">
        <Link href={`/players?teamId=${team.id}`}>
          <a href="#">View Roster</a>
        </Link>
        <a href={team.officialSiteUrl} alt={`${team.name} official site`} target="_blank">
          {team.teamName} Official Website
        </a>
      </div>
    </div>
  );
};

export default Team;
