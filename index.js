const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWonByEachTeam = require("./ipl/matchesWonByEachTeam");
const extraRunByEachTeam = require("./ipl/extraRunByEachTeam");
const economicalBowlers = require("./ipl/economicalBowlers");
const winningTeamByVenue = require("./ipl/winningTeamByVenue");

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";

async function main() {
  const matches = await csv().fromFile(MATCHES_FILE_PATH);

  const deliveries = await csv().fromFile(DELIVERIES_FILE_PATH);

  let result = matchesPlayedPerYear(matches);

  let matchesWon = matchesWonByEachTeam(matches);

  let extraRuns = extraRunByEachTeam(matches, deliveries);

  let topEconomicalBowlers = economicalBowlers(matches, deliveries);

  let winningTeamByStadium = winningTeamByVenue(matches);

  saveMatchesPlayedPerYear(result, matchesWon, extraRuns, topEconomicalBowlers, winningTeamByStadium);
}

function saveMatchesPlayedPerYear(result, matchesWon, extraRuns, topEconomicalBowlers, winningTeamByStadium) {
  const jsonData = {
    matchesPlayedPerYear: result,
    matchesWonByEachTeam: matchesWon,
    extraRuns,
    topEconomicalBowlers,
    winningTeamByStadium
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

main();
