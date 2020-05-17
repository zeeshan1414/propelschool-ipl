function economicalBowler(matches, deliveries) {

    const result = {};

    const totalMatchesPlayedIn2015 = [];

    const economicBowlers = [];

    // Getting the match ids played in year 2015
    for(let match of matches) {
        const id = match.id;
        if(match.season == 2015) {
            totalMatchesPlayedIn2015.push(id);
        }
    }

    // getting the balls and runs by each bowler
    for(let delivery of deliveries) {
        const match_id = delivery.match_id;
        const total_runs = parseInt(delivery.total_runs);
        const extra_runs = parseInt(delivery.extra_runs);
        const bowler = delivery.bowler;
        if(totalMatchesPlayedIn2015.includes(match_id)) {
            if(result[bowler]) {
                result[bowler]['runs'] += total_runs;
                result[bowler]['balls'] += 1;
                if(extra_runs) result[bowler]['balls'] -= 1; // taking account for the extra balls
            } else {
                result[bowler] = {};
                result[bowler]['runs'] = total_runs;
                result[bowler]['balls'] = 1;
                if(extra_runs) result[bowler]['balls'] -= 1; // taking account for the extra balls
            }
        }
    }

    // calculating the economy for each bowler
    for(let bowler in result) {
        const runs = result[bowler].runs;
        const overs = result[bowler].balls/6;
        const economy = (runs/overs).toFixed(2);
        economicBowlers.push({ bowler, economy });
    }

    // returning only the top 10 economical bowlers
    return economicBowlers.sort((a,b) => parseFloat(a.economy) - parseFloat(b.economy)).slice(0,10)

}

module.exports = economicalBowler;