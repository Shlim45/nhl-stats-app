export function sortPlayers(players, sortBy, ascend) {
    let newSorting = [...players];
    console.log({ newSorting });
    if (ascend) {
        switch (sortBy) {
            case 'lastName':
                return newSorting.sort((a, b) => a.lastName > b.lastName);
            case 'games':
                return newSorting.sort((a, b) => a.stats[0].stat.games - b.stats[0].stat.games);
            case 'goals':
                return newSorting.sort((a, b) => a.stats[0].stat.goals - b.stats[0].stat.goals);
            case 'assists':
                return newSorting.sort((a, b) => a.stats[0].stat.assists - b.stats[0].stat.assists);
            case 'points':
                return newSorting.sort((a, b) => a.stats[0].stat.points - b.stats[0].stat.points);
            case 'plusMinus':
                return newSorting.sort(
                    (a, b) => a.stats[0].stat.plusMinus - b.stats[0].stat.plusMinus
                );
            default:
                return newSorting;
        }
    } else {
        switch (sortBy) {
            case 'lastName':
                return newSorting.sort((a, b) => b.lastName < a.lastName);
            case 'games':
                return newSorting.sort((a, b) => b.stats[0].stat.games - a.stats[0].stat.games);
            case 'goals':
                return newSorting.sort((a, b) => b.stats[0].stat.goals - a.stats[0].stat.goals);
            case 'assists':
                return newSorting.sort((a, b) => b.stats[0].stat.assists - a.stats[0].stat.assists);
            case 'points':
                return newSorting.sort((a, b) => b.stats[0].stat.points - a.stats[0].stat.points);
            case 'plusMinus':
                return newSorting.sort(
                    (a, b) => b.stats[0].stat.plusMinus - a.stats[0].stat.plusMinus
                );
            default:
                return newSorting;
        }
    }
}
