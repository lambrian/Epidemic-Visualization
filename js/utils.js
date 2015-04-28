function randomBool(weightTrue) {
 return Math.random() < weightTrue;   
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomGraph(numNodes) {
  var graph = 
  {
    nodes: [],
    edges: []
  }

  for (var i = 0; i < numNodes; i++) {
    graph.nodes.push({data: { id: "" + i } });
  }

  for (var s = 0; s < numNodes; s++) {
    for (var t = 0; t < numNodes; t++) {
      var edgeProb = Math.floor(s/10) == Math.floor(t/10) ? 0.4 : 0.001;
      if (randomBool(edgeProb) && s != t && s < t) {
        var edgeData = { id : '' + s + t, weight: 1, source: '' + s, target: '' + t};
        graph.edges.push({data: edgeData});
      }
    }
  }

  return graph;
}
