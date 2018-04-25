import 'isomorphic-unfetch';

import { Component } from 'react';
import Link from 'next/link';
import { teamLogo } from '../handlers';
import { filterStatsBySeason } from '../handlers/lists';
import Layout from '../components/Layout';
import Player from '../components/Player';
import PlayerStatsList from '../components/PlayerStatsList';

const CURRENT_SEASON = '20172018';
let teamId;

class Players extends Component {
  static getInitialProps = async function(props) {
    teamId = props.query.teamId;

    const URL = 'https://statsapi.web.nhl.com/api/v1/teams/';
    const statsParams = `?hydrate=franchise(roster(season=${CURRENT_SEASON},person(name,stats(splits=[yearByYear]))))`;
    try {
      if (teamId) {
        const res = await fetch(URL + teamId + statsParams);
        const data = await res.json();

        const players = data.teams[0].franchise.roster.roster;

        const playerStats = players.map(p => ({
          id: p.person.id,
          jerseyNumber: p.jerseyNumber,
          fullName: p.person.fullName,
          link: p.person.link,
          firstName: p.person.firstName,
          lastName: p.person.lastName,
          active: p.person.active,
          primaryPosition: p.person.primaryPosition,
          stats: filterStatsBySeason(p.person.stats[0], CURRENT_SEASON),
        }));

        return {
          players,
          playerStats,
        };
      }
      const res = await fetch(URL);
      const data = await res.json();

      const { teams } = data;

      return { teams };
    } catch (error) {
      console.error(error);
      return {
        error,
      };
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      player: null,
    };
  }

  setPlayer = player => {
    this.setState({ player });
  };

  clearPlayer = () => {
    this.setState({ player: null });
  };

  render() {
    const { props } = this;
    const { player } = this.state;

    return player ? (
      <Player player={player} clearPlayer={this.clearPlayer} />
    ) : props.players ? ( // show roster's stats
      <Layout>
        <div>
          <h2 className="mb-5 mt-5">Player Statistics</h2>
          {teamId ? teamLogo(teamId, 50, 200) : null}
          <PlayerStatsList
            {...props}
            players={props.players}
            playerStats={props.playerStats}
            setPlayer={this.setPlayer}
          />
        </div>
      </Layout>
    ) : (
      // show list of teams if no teamid in url query
      <Layout>
        <div>
          <h2 className="mb-5 mt-5">Team List</h2>
          {props.teams.map(team => (
            <Link key={team.id} href={`/players?teamId=${team.id}`}>
              <p>
                <a href="#">{team.name}</a>
              </p>
            </Link>
          ))}
        </div>
      </Layout>
    );
  }
}

export default Players;
