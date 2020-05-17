function matchesWonByEachTeam(matches) {
  let result = {};
  for (let match of matches) {
    const season = match.season;
    const winner = match.winner;
    
        if (result[season]) {
          if (result[season][winner]) {
            result[season][winner] += 1;
          } else {
            result[season][winner] = 1;
          }
        } else {
          result[season] = {};
          result[season][winner] = 1;
        }
        
  }
  return result;
}

module.exports = matchesWonByEachTeam;
