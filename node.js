function Node(val) {
  this.value = val;
  this.edges = [];
  this.queued = false;
  this.parent = null;
}

Node.prototype.addEdge = function(n){
  this.edges.push(n);
  n.edges.push(this);
}
