class Link {
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
   * @param {Array<Link>} paths
   */
  constructor (name, paths = []) {
    /** @member {String} */
    this.name = name
    /** @member {Array<Link>} paths */
    this.paths = paths
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
    this.paths.push(new Link(cost, node))
  }

  /**
   * @param {Node} node
   * @param {Number} cost
   */
  addNonOrientedPath (node, cost) {
    this.addOrientedPath(node, cost)
    node.addOrientedPath(this, cost)
  }
}

class Dijkstra {
  /**
   * Calculates the shortest path, and returns a list of nodes
   * that we need to go through
   * @param {Node} startNode
   * @param {Node} endNode
   * @returns {Array<Node>}
   */
  static shortestPathFirst (startNode, endNode) {
    
    return []
  }
}

module.exports = { Dijkstra, Link, Node }
