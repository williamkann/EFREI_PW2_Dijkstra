class Path {
  constructor (cost, node) {
    /** @member {Number} cost */
    this.cost = cost
    /** @member {Node} node */
    this.node = node
  }
}

class Node {
  /**
   * @param {String} name
   * @param {Array<Path>} paths
   */
  constructor (name, paths = []) {
    /** @member {Boolean} */
    this.visited = false
    /** @member {String} */
    this.name = name
    /** @member {Array<Path>} paths */
    this.paths = paths
    /** @member {Number} totalCost */
    this.distance = Infinity
    /** @member {Node} visitedFrom */
    this.visitedFrom = null
  }

  /**
   * @param {Node} node
   * @param {Number} cost
   */
  addOrientedPath (node, cost) {
    const current = this.paths.findIndex(n => n.node === node)
    if (current !== -1) {
      this.paths.splice(current, 1)
    }
    this.paths.push(new Path(cost, node))
  }

  /**
   * @param {Node} node
   * @param {Number} cost
   */
  addNonOrientedPath (node, cost) {
    this.addOrientedPath(node, cost)
    node.addOrientedPath(this, cost)
  }

  /**
   * Calculates the new distance for each node
   * Already visited nodes shouldn't be updated
   * The {@link Node}s returned are the nodes which were never calculated before
   * @returns {Node[]|null}
   */
  calcNeighboursTentativeDistance () {
  }
}

class Dijkstra {
  /**
   * Calculates the shortest path, and returns a list of nodes
   * that we need to go through to have the path
   * @param {Node} startNode
   * @param {Node} endNode
   * @returns {Array<Node>}
   */
  static shortestPathFirst (startNode, endNode) {
  }

  /**
   * Generates the path from an endNode to the startNode
   * it uses the `visitedFrom` property to navigate backwards
   * to the starting point
   * @param {Node} endNode
   * @returns {Node[]}
   */
  static generatePath (endNode) {
  }

  /**
   * Print the path like a linked list
   * @param {Node[]} listOfNodes
   */
  /* istanbul ignore next */
  static printPath (listOfNodes) {
    let out = ''
    for (const n of listOfNodes) {
      out += `(${n.name}, ${n.distance}) => `
    }
    out += 'x'
    console.log(out)
  }
}

module.exports = { Dijkstra, Path, Node }
