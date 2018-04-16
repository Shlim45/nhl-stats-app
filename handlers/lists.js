export function sortPlayers(players, sortBy, ascend = false) {
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

export function paginatePlayers(playersArray, pageNumber = 0, perPage = 25) {
    const numberOfPages = Math.ceil(playersArray.length / perPage) - 1; // 0 based pages

    let pageOfPlayers;
    if (perPage >= playersArray.length) {
        pageOfPlayers = playersArray;
    } else if (pageNumber >= numberOfPages) {
        pageOfPlayers = playersArray.slice((numberOfPages) * perPage, playersArray.length);
    } else {
        // if ((pageNumber + 1) * perPage >= playersArray.length) {
        //     pageOfPlayers = playersArray.slice(pageNumber * perPage, playersArray.length);
        // } else {
            pageOfPlayers = playersArray.slice(pageNumber * perPage, (pageNumber + 1) * perPage);
        // }
    }
    return pageOfPlayers;
}
