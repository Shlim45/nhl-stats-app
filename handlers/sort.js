export function sortPlayers(players, sortBy, ascend) {
    if (ascend) {
        switch (sortBy) {
            case 'lastName':
                return players.sort((a, b) => a.lastName > b.lastName);
            case 'games':
                return players.sort((a, b) => a.stats[0].stat.games - b.stats[0].stat.games);
            case 'goals':
                return players.sort((a, b) => a.stats[0].stat.goals - b.stats[0].stat.goals);
            case 'assists':
                return players.sort((a, b) => a.stats[0].stat.assists - b.stats[0].stat.assists);
            case 'points':
                return players.sort((a, b) => a.stats[0].stat.points - b.stats[0].stat.points);
            case 'plusMinus':
                return players.sort(
                    (a, b) => a.stats[0].stat.plusMinus - b.stats[0].stat.plusMinus
                );
            default:
                return players;
        }
    } else {
        switch (sortBy) {
            case 'lastName':
                return players.sort((a, b) => b.lastName < a.lastName);
            case 'games':
                return players.sort((a, b) => b.stats[0].stat.games - a.stats[0].stat.games);
            case 'goals':
                return players.sort((a, b) => b.stats[0].stat.goals - a.stats[0].stat.goals);
            case 'assists':
                return players.sort((a, b) => b.stats[0].stat.assists - a.stats[0].stat.assists);
            case 'points':
                return players.sort((a, b) => b.stats[0].stat.points - a.stats[0].stat.points);
            case 'plusMinus':
                return players.sort(
                    (a, b) => b.stats[0].stat.plusMinus - a.stats[0].stat.plusMinus
                );
            default:
                return players;
        }
    }
}
