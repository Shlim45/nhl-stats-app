export function sortPlayers(players, sortBy, ascend = false) {
    let newSorting = [...players];
    newSorting = newSorting.filter(p => p.stats.length > 0); // remove players with no stats
    if (ascend) {
        if (sortBy === 'lastName') {
            return newSorting.sort(
                (a, b) => (a.lastName.toLowerCase() < b.lastName.toLowerCase() ? -1 : 1)
            );
        } else {
            return newSorting.sort((a, b) => a.stats[0].stat[sortBy] - b.stats[0].stat[sortBy]);
        }
    } else {
        if (sortBy === 'lastName') {
            return newSorting.sort(
                (a, b) => (a.lastName.toLowerCase() < b.lastName.toLowerCase() ? 1 : -1)
            );
        } else {
            return newSorting.sort((a, b) => b.stats[0].stat[sortBy] - a.stats[0].stat[sortBy]);
        }
    }
}

export function filterStatsBySeason(stats, season) {
    if (season) {
        return stats.splits.filter(s => s.season === season);
    } else {
        return stats;
    }
}

export function paginatePlayers(playersArray, perPage = 25) {
    const pagesArray = [];

    for (let i = 0, len = playersArray.length; i < len; i += perPage) {
        pagesArray.push(playersArray.slice(i, i + 25));
    }

    return pagesArray;
}
