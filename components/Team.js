import Link from 'next/link';
import { teamLogo } from '../handlers';

const Team = props => {
  const { team, stats, setTeamId, ...extraProps } = props;
  const { stat } = stats.teams[0].teamStats[0].splits[0];
  // const logoURL = `https://www-league.nhlstatic.com/builds/site-core/86d4b76cc03a4d111ee0e20f9f62eb054eef3b74_1502985652/images/logos/team/current/team-${
  //     team.id
  // }-dark.svg`;
  return (
    <div className="col-xs-10 col-sm-6 col-xl-3 mx-auto" style={{ maxWidth: `${320}px` }}>
      <div className="card border-secondary mb-5" style={{ maxWidth: `${20}rem`, width: `${340}px` }}>
        <div className="card-header">{team.name}</div>
        <div className="card-body">
          <div className="text-center">
            {teamLogo(team.id, 25, 250)}

            <p className="card-text">
              GP: {stat.gamesPlayed} &nbsp; W: {stat.wins} &nbsp; L: {stat.losses} &nbsp; OTL: {stat.ot} &nbsp; PTS:{' '}
              {stat.pts}
            </p>
            <a
              href="#"
              onClick={() => {
                setTeamId(team.id);
              }}
            >
              Set Team ID (test)
            </a>
            <br />
            <Link href={`/players?teamId=${team.id}`}>
              <a href="#">View Player Stats</a>
            </Link>
            <br />
            <a href={team.officialSiteUrl} alt={`${team.name} official site`} target="_blank">
              Official {team.teamName} Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
