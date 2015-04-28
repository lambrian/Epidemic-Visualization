function simulate (cy, infectionRate, infectionDuration, mortalityRate, numberInitialInfected) {

  MAX_ITERATIONS = 100;
  // mark all as susceptible
  cy.nodes().forEach(function(u) {
    u.data('status', 'susceptible');
    u.data('infection', 0);
  });

  // mark random group of infected
  var numNodes = cy.nodes().size();
  var counter = 0;
  while (counter < numberInitialInfected) {
    var u = cy.$('#' + randomInt(0, numNodes));
    if (u.data('status') == 'susceptible') {
      u.data('status', 'infected');
      u.data('infection', infectionDuration)
      counter++;
    }
  }
  
  var iterationID = setInterval(function() { 
    if (!advance(cy, infectionRate, infectionDuration, mortalityRate)) {
      clearInterval(iterationID);
    }
  }, 1000);

  setTimeout (function() { clearInterval(iterationID); }, 1000 * MAX_ITERATIONS);
}

function advance(cy, infectionRate, infectionDuration, mortalityRate) {
  var infected = cy.filter('node[status = "infected"]');
  for (var uI = 0; uI < infected.length; uI++) {
    var u = infected[uI];
    var neighborhood = u.neighborhood();
    for (var vI = 0; vI < neighborhood.length; vI++) {
      var v = neighborhood[vI];
      if (randomBool(infectionRate) && v.data('status') == 'susceptible') {
        v.data('status', 'infected');
        v.data('infection', infectionDuration);
      }
    }
  }

  for (var uI = 0; uI < infected.length; uI++) {
    var u = infected[uI];
    u.data('infection', u.data('infection') - 1);
    if (u.data('infection') == 0) {
      if (randomBool(mortalityRate)) {
        u.data('status', 'dead');
      } else {
        u.data('status', 'susceptible');
      }
    }
  }

  return cy.filter('node[status = "infected"]').size();
}

// while (current-generation-infected is not empty || MAX_ITERATIONS):
// next-generation-infected = empty set
// for all current infected U
//    for all neighbors V
//        if randomBool (infectionRate) && isSusceptible(v):
//          add V to next generation infected with infectionRemaining = D
// 
// for all nodes U in current infected:
//    infection duration -= 1
//    if (infectionRemaining == 0):
//        if (randomBool (mortalityRate)):
//          insert into dead population
//        else:
//          insert into susceptible population
//    else:
//        insert into next generation current infected 
//  current-generation-infected = next-generation-infected