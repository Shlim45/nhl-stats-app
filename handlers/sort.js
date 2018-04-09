export function sortPlayers(players, sortBy, ascend) {
    let newSorting = [...players];

    if (ascend) {
        if (sortBy === 'lastName') {
            return newSorting.sort((a, b) => a.lastName.toLowerCase() < b.lastName.toLowerCase() ? -1 : 1);
        } else {
            return newSorting.sort((a, b) => a.stats[0].stat[sortBy] - b.stats[0].stat[sortBy]);
        }
    } else {
        if (sortBy === 'lastName') {
            return newSorting.sort((a, b) => a.lastName.toLowerCase() < b.lastName.toLowerCase() ? 1 : -1);
        } else {
            return newSorting.sort((a, b) => b.stats[0].stat[sortBy] - a.stats[0].stat[sortBy]);
        }
    }
}
