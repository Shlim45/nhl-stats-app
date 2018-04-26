export function sortPlayers(players, sortBy, ascend = false) {
  let newSorting = [...players];
  newSorting = newSorting.filter(p => p.stats.length > 0); // remove players with no stats

  if (ascend) {
    return sortBy === 'lastName'
      ? newSorting.sort((a, b) => (a.lastName.toLowerCase() < b.lastName.toLowerCase() ? -1 : 1))
      : newSorting.sort((a, b) => a.stats[0].stat[sortBy] - b.stats[0].stat[sortBy]);
  }

  return sortBy === 'lastName'
    ? newSorting.sort((a, b) => (a.lastName.toLowerCase() < b.lastName.toLowerCase() ? 1 : -1))
    : newSorting.sort((a, b) => b.stats[0].stat[sortBy] - a.stats[0].stat[sortBy]);
}

export function filterStatsBySeason(stats, season) {
  if (season) {
    return stats.splits.filter(s => s.season === season);
  }
  return stats;
}

export function paginatePlayers(playersArray, perPage = 25) {
  const pagesArray = [];

  for (let i = 0, len = playersArray.length; i < len; i += perPage) {
    pagesArray.push(playersArray.slice(i, i + 25));
  }

  return pagesArray;
}

/**
 * Returns a thead HTML element with columns for Season, GP, etc. (differs for skaters and goalies)
 * @param {boolean} skater True for skaters, false for goalies
 */
const singlePlayerStatsTableHeading = skater =>
  skater ? (
    <thead>
      <tr>
        <th className="no-sort" data-index="0">
          <span>Season</span>
        </th>
        <th className="no-sort" data-index="1">
          <abbr title="Games Played">GP</abbr>
        </th>
        <th className="no-sort" data-index="2">
          <abbr title="Goals">G</abbr>
        </th>
        <th className="no-sort" data-index="3">
          <abbr title="Assists">A</abbr>
        </th>
        <th className="no-sort" data-index="4">
          <abbr title="Points">P</abbr>
        </th>
        <th className="no-sort" data-index="5">
          <abbr title="Plus/Minus">+/-</abbr>
        </th>
        <th className="no-sort" data-index="6">
          <abbr title="Penalty Minutes">PIM</abbr>
        </th>
        <th className="no-sort" data-index="7">
          <abbr title="Power Play Goals">PPG</abbr>
        </th>
        <th className="no-sort" data-index="8">
          <abbr title="Power Play Points">PPP</abbr>
        </th>
        <th className="no-sort" data-index="9">
          <abbr title="Shorthanded Goals">SHG</abbr>
        </th>
        <th className="no-sort" data-index="10">
          <abbr title="Shorthanded Points">SHP</abbr>
        </th>
        <th className="no-sort" data-index="11">
          <abbr title="Game Winning Goals">GWG</abbr>
        </th>
        <th className="no-sort" data-index="12">
          <abbr title="Overtime Goals">OTG</abbr>
        </th>
        <th className="no-sort" data-index="13">
          <abbr title="Shots">S</abbr>
        </th>
        <th className="no-sort" data-index="14">
          <abbr title="Shooting Percentage">S%</abbr>
        </th>
      </tr>

      <style jsx>{`
        th {
          padding-bottom: 20px;
          padding-left: 8px;
          padding-right: 8px;
          padding-top: 20px;
          display: table-cell;
          vertical-align: inherit;
          background-color: #222;
          color: white;
        }
        abbr {
          text-decoration: none;
          cursor: help;
        }
      `}</style>
    </thead>
  ) : null;

/**
 * Create a table row containing a season year, games, and stats like goals, assists, points, ... (skaters)
 * or wins, losses, ties... (goalies)
 *
 * @param {object} stats object containing player stats to display (must match the heading)
 * @param {boolean} isSkater skater or goalie
 * @param {boolean} seasonOnly season stats or career stats
 * @param {boolean} playoffs playoffs or regular season stats
 */
const singlePlayerStatsTableRow = (stats, isSkater, seasonOnly, playoffs = false) => {
  // const { stat } = seasonOnly ? player.stats[0] : player.stats[1];
  // const isSkater = player.primaryPosition.code !== 'G';

  // console.log({ player, stat });
  console.log({ stats });

  return isSkater ? (
    <tr data-index="2">
      <td data-col="0" data-row="2">
        <span>{seasonOnly ? '2017-2018' : 'Career Stats'}</span>
      </td>
      <td data-col="1" data-row="2">
        <span>{stats.games}</span>
      </td>
      <td data-col="2" data-row="2">
        <span>{stats.goals}</span>
      </td>
      <td data-col="3" data-row="2">
        <span>{stats.assists}</span>
      </td>
      <td data-col="4" data-row="2">
        <span>{stats.points}</span>
      </td>
      <td data-col="5" data-row="2">
        <span>{stats.plusMinus}</span>
      </td>
      <td data-col="6" data-row="2">
        <span>{stats.penaltyMinutes}</span>
      </td>
      <td data-col="7" data-row="2">
        <span>{stats.powerPlayGoals}</span>
      </td>
      <td data-col="8" data-row="2">
        <span>{stats.powerPlayPoints}</span>
      </td>
      <td data-col="9" data-row="2">
        <span>{stats.shortHandedGoals}</span>
      </td>
      <td data-col="10" data-row="2">
        <span>{stats.shortHandedPoints}</span>
      </td>
      <td data-col="11" data-row="2">
        <span>{stats.gameWinningGoals}</span>
      </td>
      <td data-col="12" data-row="2">
        <span>{stats.overTimeGoals}</span>
      </td>
      <td data-col="13" data-row="2">
        <span>{stats.shots}</span>
      </td>
      <td data-col="14" data-row="2">
        <span>{stats.shotPct}</span>
      </td>

      <style jsx>{`
        td {
          padding-bottom: 20px;
          padding-left: 8px;
          padding-right: 8px;
          padding-top: 20px;
          display: table-cell;
          vertical-align: inherit;
        }
        td:hover {
          background-color: #eee;
          cursor: default;
        }
      `}</style>
    </tr>
  ) : null;
};

export const singlePlayerStatsTable = (player, playerExpanded) => {
  // kludgy bandaid until i bring in the full player object
  const seasonStats = player.stats[0].stat;
  const careerStats = playerExpanded ? playerExpanded.stats[1].splits[0].stat : null;

  const isSkater = player.primaryPosition.code !== 'G';
  return (
    <div className="player-overview__stats">
      <div className="season-summary__table">
        <div className="responsive-datatable">
          <div className="responsive-datatable__inner">
            <div className="responsive-datatable__scrollable">
              <div>
                <table>
                  {singlePlayerStatsTableHeading(isSkater)}
                  <tbody>
                    {/* <span>2017-2018 Playoffs</span>
                        <span>Career Playoffs</span> */}
                    {/* current season stats */}
                    {singlePlayerStatsTableRow(seasonStats, true, true)}
                    {/* career stats */}
                    {careerStats ? singlePlayerStatsTableRow(careerStats, true, false) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        // td {
        //   padding-bottom: 20px;
        //   padding-left: 8px;
        //   padding-right: 8px;
        //   padding-top: 20px;
        //   display: table-cell;
        //   vertical-align: inherit;
        // }
        // td:hover {
        //   background-color: #eee;
        //   cursor: default;
        // }
        table {
          border: 1px solid #222;
          border-radius: 0 0 5px 5px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};
