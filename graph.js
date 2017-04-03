function Graph(){
  this.nodes = [];
  this.graph = {};
  this.start = null;
  this.end = null;
}

Graph.prototype.addNode = function(n){
  this.nodes.push(n);
  this.graph[n.value] = n;
}

Graph.prototype.getNode = function(actor) {
  var n = this.graph[actor];
  return n;
}

Graph.prototype.setStart = function(s) {
  this.start = this.graph[s];
  return this.start;
}

Graph.prototype.setEnd = function(e) {
  this.end = this.graph[e];
  return this.end;
}

Graph.prototype.reset = function(){
  for(i = 0 ; i < this.nodes.length ; i++){
    this.nodes[i].queued = false;
    this.nodes[i].parent = null;
  }
}
