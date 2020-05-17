function winningTeamByVenue(matches) {
    const res = {};
    for(let match of matches) {
        const winner = match.winner;
        const stadium = match.venue;

        if(res[stadium]) {
            if(res[stadium][winner]) {
                res[stadium][winner] += 1;
            } else {
                res[stadium][winner] = 1;
            }
        } else {
            res[stadium] = {};
            res[stadium][winner] = 1;
        }
    }
    return res;
}

module.exports = winningTeamByVenue;