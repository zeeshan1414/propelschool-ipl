function fetchAndVisualizeData() {
  fetch("./data.json")
    .then(r => r.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

function visualizeData(data) {
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  visualizeMatchesWonByEachTeam(data.matchesWonByEachTeam);
  visualizeExtraRuns(data.extraRuns);
  visualizeTopBowler(data.topEconomicalBowlers);
  visualizeStadium(data.winningTeamByStadium);
  return;
}

function visualizeStadium(venue) {
  const seriesData = [];
  const stadiums = [];
  const teams = {};

  const entries = Object.entries(venue);

  for(let entry of entries) {
    const name = entry[0];
    stadiums.push(name);
    const obj = entry[1];
    for(let team in obj) {
      if(teams[team]) {
        teams[team].push(obj[team])
      } else {
        teams[team] = [];
        teams[team].push(obj[team])
      }
    }
    
  }
  for(let name in teams) {
    seriesData.push({ name, data: teams[name] })
  }
  
  Highcharts.chart('venue', {
    chart: {
        type: 'bar'
    },
    title: {
        text: '5. Story: Matches Won by each team per Stadium'
    },
    xAxis: {
        categories: stadiums
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total Venues'
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: seriesData
});

}

function visualizeTopBowler(topEconomicalBowlers) {
  const seriesData = [];

  for(let item of topEconomicalBowlers) {
    seriesData.push([item.bowler, parseFloat(item.economy)]);
  }

  Highcharts.chart('topBowlers', {
    chart: {
        type: 'column'
    },
    title: {
        text: '4. Top Economical Bowlers in 2015 season:'
    },
    subtitle: {
        text: 'Source: <a href="http://iplt20.com">ipl.com</a>'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Economy'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Economy: <b>{point.y:.2f}</b>'
    },
    series: [{
        name: 'Population',
        data: seriesData,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.2f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});
}

function visualizeExtraRuns(extraRunsByEachTeam) {
  const seriesData = Object.entries(extraRunsByEachTeam);
  Highcharts.chart('extraRuns', {
    chart: {
        type: 'column'
    },
    title: {
        text: '3. Extra runs conceded by each team in 2016:'
    },
    subtitle: {
        text: 'Source: <a href="http://iplt20.com">ipl.com</a>'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Extra Runs'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Extra runs: <b>{point.y:.1f}</b>'
    },
    series: [{
        name: 'Population',
        data: seriesData,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});
}

function visualizeMatchesWonByEachTeam(matchesWonByEachTeam) {
  const seriesData = [];
  const years = Object.keys(matchesWonByEachTeam)
  const teams = {};

  const entries = Object.entries(matchesWonByEachTeam)

  for(let item in matchesWonByEachTeam) {
    for (let team in matchesWonByEachTeam[item]) {
      teams[team] = [];
    }
  }

  for(let team in teams) {
    for(let entry of entries) {
      const obj = entry[1];
      if(team in obj) {
        teams[team].push(obj[team])
      } else {
        teams[team].push(0)
      }
    }
  }

  for(let name in teams) {
    const data = teams[name];
    seriesData.push({name, data});
  }

  Highcharts.chart('matches-won-by-each-team', {
    chart: {
        type: 'column'
    },
    title: {
        text: '2. Number of matches won by each team over all the years of IPL'
    },
    subtitle: {
        text: 'Source: iplt20.com'
    },
    xAxis: {
        categories: years,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Matches Won'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: seriesData
});
}

function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const seriesData = [];
  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }

  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column"
    },
    title: {
      text: "1. Matches Played Per Year"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Years",
        data: seriesData
      }
    ]
  });
}
