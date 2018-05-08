import { filterTeamsByConference, filterTeamsByDivision } from '../handlers/lists';

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

  // Conferences
  const westernConference = filterTeamsByConference(teams, 'western');
  const easternConference = filterTeamsByConference(teams, 'eastern');

  // Divisions
  const pacificDivision = filterTeamsByDivision(teams, 'pacific');
  const centralDivision = filterTeamsByDivision(teams, 'central');
  const atlanticDivision = filterTeamsByDivision(teams, 'atlantic');
  const metropolitanDivision = filterTeamsByDivision(teams, 'metropolitan');

  // TODO: formatting

  return (
    <div className="team-standings">
      <div className="team-standings__conference-group">
        <h3 className="mb-4 text-center">Western Conference</h3>
        <h5 className="mb-2">Pacific Division</h5>
        <ul className="team-list list-group mb-5">
          <li
            key="team-list-heading"
            className="list-group-item active d-flex justify-content-between align-items-center"
          >
            <span className="badge badge-secondary badge-pill teamstats-rank" style={{ width: `${2.5}rem` }}>
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
          {pacificDivision.map((team, i) => {
            const { stat } = team.teamStats[0].splits[0];
            return (
              <li key={team.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span className="badge badge-secondary badge-pill teamstats-rank">{i + 1}</span>
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
        <h5 className="mb-2">Central Division</h5>
        <ul className="team-list list-group mb-5">
          <li
            key="team-list-heading"
            className="list-group-item active d-flex justify-content-between align-items-center"
          >
            <span className="badge badge-secondary badge-pill teamstats-rank" style={{ width: `${2.5}rem` }}>
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
          {centralDivision.map((team, i) => {
            const { stat } = team.teamStats[0].splits[0];
            return (
              <li key={team.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span className="badge badge-secondary badge-pill teamstats-rank">{i + 1}</span>
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
      </div>
      <hr />
      <div className="team-standings__conference-group">
        <h3 className="mb-4 text-center">Eastern Conference</h3>
        <h5 className="mb-2">Atlantic Division</h5>
        <ul className="team-list list-group mb-5">
          <li
            key="team-list-heading"
            className="list-group-item active d-flex justify-content-between align-items-center"
          >
            <span className="badge badge-secondary badge-pill teamstats-rank" style={{ width: `${2.5}rem` }}>
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
          {atlanticDivision.map((team, i) => {
            const { stat } = team.teamStats[0].splits[0];
            return (
              <li key={team.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span className="badge badge-secondary badge-pill teamstats-rank">{i + 1}</span>
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
        <h5 className="mb-2">Metropolitan Division</h5>
        <ul className="team-list list-group mb-5">
          <li
            key="team-list-heading"
            className="list-group-item active d-flex justify-content-between align-items-center"
          >
            <span className="badge badge-secondary badge-pill teamstats-rank" style={{ width: `${2.5}rem` }}>
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
          {metropolitanDivision.map((team, i) => {
            const { stat } = team.teamStats[0].splits[0];
            return (
              <li key={team.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span className="badge badge-secondary badge-pill teamstats-rank">{i + 1}</span>
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
      </div>
      <style jsx>{`
        .team-standings {
          display: flex;
          justify-content: space-evenly;
        }
        .team-standings__conference-group {
          border: 1px solid #555;
          border-radius: 5px;
          padding: 20px;
        }
        .team-standings__conference-group h5 {
          color: rgba(255, 255, 255, 0.85);
        }

        @media screen and (max-width: 1199px) {
          .team-standings {
            flex-direction: column;
            justify-content: center;
          }
          .team-standings__conference-group {
            min-width: 540px;
          }
        }
      `}</style>
    </div>
  );
};

export default TeamStandings;
