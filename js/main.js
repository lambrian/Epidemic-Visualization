$(function() {
  var network = loadInitialNetwork(120);
});

$("#startSimulate").click(function() {
  beginSimulation($("#infection-rate").val(),
           $("#contagious").val(),
           $("#mortality-rate").val(),
           $("#initial-infected").val()
           );
});

$("#reset").click(function() {
  reset(cy);
})


function beginSimulation (infectionRate, timeOfContagious, mortalityRate, initialInfected) {
  console.log(infectionRate, timeOfContagious, mortalityRate,
              initialInfected);
  simulate (cy, infectionRate, timeOfContagious, mortalityRate, initialInfected);
}
