$(function(){ // on dom ready

  var graph = generateRandomGraph(10);

  cy = cytoscape({
    container: document.getElementById('cy'),

    style: cytoscape.stylesheet()
    .selector('node')
    .css({
      'content': 'data(id)',
      'width' : 4,
      'height': 4

    })
    .selector('edge')
    .css({
      'width': 1,
      'line-color': '#ddd',
    })
    .selector('.highlighted')
    .css({
      'background-color': '#61bffc',
      'line-color': '#61bffc',
      'transition-property': 'background-color, line-color',
      'transition-duration': '0.1s'
    })
    .selector('[status = "susceptible"]')
    .css({
      'background-color': 'yellow'
    })
    .selector('[status = "infected"]')
    .css({
      'background-color': 'red'
    })
    .selector('[status = "immune"]')
    .css({
      'background-color': 'green'
    })
    .selector('node[status = "dead"]')
    .css({
      'background-color': 'black'
    }),

    elements: graph
  });

  var options = {
    name: 'cose',

  // Called on `layoutready`
  ready               : function() {},

  // Called on `layoutstop`
  stop                : function() {},

  // Whether to animate while running the layout
  animate             : true,

  // Number of iterations between consecutive screen positions update (0 -> only updated on the end)
  refresh             : 75,
  
  // Whether to fit the network view after when done
  fit                 : true, 

  // Padding on fit
  padding             : 30, 

  // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  boundingBox         : undefined,

  // Whether to randomize node positions on the beginning
  randomize           : true,
  
  // Whether to use the JS console to print debug messages
  debug               : false,

  // Node repulsion (non overlapping) multiplier
  nodeRepulsion       : 400000,
  
  // Node repulsion (overlapping) multiplier
  nodeOverlap         : 10,
  
  // Ideal edge (non nested) length
  idealEdgeLength     : 10,
  
  // Divisor to compute edge forces
  edgeElasticity      : 100,
  
  // Nesting factor (multiplier) to compute ideal edge length for nested edges
  nestingFactor       : 5, 
  
  // Gravity force (constant)
  gravity             : 250, 
  
  // Maximum number of iterations to perform
  numIter             : 100,
  
  // Initial temperature (maximum node displacement)
  initialTemp         : 200,
  
  // Cooling factor (how the temperature is reduced between consecutive iterations
    coolingFactor       : 0.95, 

  // Lower temperature threshold (below this point the layout will end)
  minTemp             : 1.0
};

cy.layout( options );
}); // on dom ready