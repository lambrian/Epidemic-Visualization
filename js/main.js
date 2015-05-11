$(function() {
  var network = loadInitialNetwork(120);
});

function updateSIR() {

  statusCount = {};
  statusCount['susceptible'] = 0;
  statusCount['infected'] = 0;
  statusCount['dead'] = 0;

  cy.nodes().forEach(function(u) {
    statusCount[u.data('status')]++;
  });

  var numNodes = cy.nodes().length;
  $("#sir-susceptible").height(statusCount['susceptible'] / numNodes * 100 + '%');
  $("#sir-infected").height(statusCount['infected'] / numNodes * 100 + '%');
  $("#sir-dead").height(statusCount['dead'] / numNodes * 100 + '%');

}

$("#startSimulate").click(function() {
  beginSimulation($("#infection-rate").val(),
           $("#contagious").val(),
           $("#mortality-rate").val(),
           $("#initial-infected").val()
           );

  sirChart = setInterval(function () { updateSIR(); }, 1000);
});

$("#reset").click(function() {
  reset(cy);
  clearInterval(sirChart);
  updateSIR();
})


function beginSimulation (infectionRate, timeOfContagious, mortalityRate, initialInfected) {
  console.log(infectionRate, timeOfContagious, mortalityRate,
              initialInfected);
  simulate (cy, infectionRate, timeOfContagious, mortalityRate, initialInfected);
}
