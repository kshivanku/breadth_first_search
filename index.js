var data;
var graph;
var dropdown;

function preload(){
  data = loadJSON("kevinBacon.json");
}

function setup(){
  dropdown = createSelect();
  dropdown.changed(bfs);
  noCanvas();
  graph = new Graph();
  var movies = data.movies;
  for(var i = 0 ; i < movies.length ; i++){
    var movieNode = new Node(movies[i].title);
    graph.addNode(movieNode);
    for(var j = 0 ; j < movies[i].cast.length ; j++){
      var actorNode = graph.getNode(movies[i].cast[j]);
      if (actorNode == undefined){
        var actorNode = new Node(movies[i].cast[j]);
        graph.addNode(actorNode);
        dropdown.option(actorNode.value);
      }
      movieNode.addEdge(actorNode);
    }
  }
  console.log(graph);
}

function bfs(){
  graph.reset();
  var start = graph.setStart(dropdown.value());
  var end = graph.setEnd("Kevin Bacon");

  var queue = [];
  queue.push(start);
  start.queued = true;
  while(queue.length > 0) {
    var current = queue.shift();
    // console.log(current.value);
    if(current == end){
      console.log("found " + current.value);
      break;
    }
    var edges = current.edges;
    for (var i = 0 ; i < edges.length ; i++) {
      if(!edges[i].queued) {
        edges[i].parent = current;
        edges[i].queued = true;
        queue.push(edges[i]);
      }
    }
  }
  var path = [];
  path.push(end);
  var next = end.parent;
  while(next != null){
    path.push(next);
    next = next.parent;
  }

  var txt = '';
  for(var i = path.length -1 ; i >=0 ; i--){
    var n = path[i];
    txt += n.value;
    if(i != 0){
      txt += ' -->';
    }
  }
  createP(txt);
}
