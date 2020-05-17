function extraRunsByEachTeam(matches, deliveries) {

    const result = {};
    const teams = {};

    for(let match of matches) {
      const id = match.id;
      const team1 = match.team1;
      const team2 = match.team2
      if(match.season == 2016) {
        teams[id] = {team1, team2};
      }
    }

    for(let delivery of deliveries) {
      const match_id = delivery.match_id;
      const extra_run = parseInt(delivery.extra_runs);
      const bowling_team = delivery.bowling_team;
      if(match_id in teams) {
        if(result[bowling_team]) {
          result[bowling_team] += extra_run;
        }
        else {
          result[bowling_team] = extra_run;
        }
      }
    }
    
    return result;
  }
  
  module.exports = extraRunsByEachTeam;
  