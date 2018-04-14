export function sortPlayers(players, sortBy, ascend) {
    let newSorting = [...players];
    if (ascend) {
        if (sortBy === 'lastName') {
            return newSorting.sort(
                (a, b) => (a.lastName.toLowerCase() < b.lastName.toLowerCase() ? -1 : 1)
            );
        } else {
            return newSorting.sort((a, b) => {
                if (a.stats.length <= 0) {
                    return b;
                } else if (b.stats.length <= 0) {
                    return a;
                } else {
                    return a.stats[0].stat[sortBy] - b.stats[0].stat[sortBy];
                }
            });
        }
    } else {
        if (sortBy === 'lastName') {
            return newSorting.sort(
                (a, b) => (a.lastName.toLowerCase() < b.lastName.toLowerCase() ? 1 : -1)
            );
        } else {
            return newSorting.sort((a, b) => {
                if (a.stats.length <= 0) {
                    return b;
                } else if (b.stats.length <= 0) {
                    return a;
                } else {
                    return b.stats[0].stat[sortBy] - a.stats[0].stat[sortBy];
                }
            });
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
