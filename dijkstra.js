class Path {
  constructor (cost, node, moreinfo) {
    /** @member {Number} cost */
    this.cost = cost
    /** @member {Node} node */
    this.node = node
    // arbitrary field that you can add to debug your code
    /** @member {Object} moreinfo */
    this.moreinfo = moreinfo
  }
}

class Node {
  /**
   * @param {String} name
   * @param {Path[]} paths
   */
  constructor (name, paths = []) {
    /** @member {Boolean} visited */
    this.visited = false
    /** @member {String} name */
    this.name = name
    /** @member {Array<Path>} paths */
    this.paths = paths
    /** @member {Number} distance */
    this.distance = Infinity
    /** @member {Node} visitedFrom */
    this.visitedFrom = null
  }

  /**
   * @param {Node} node
   * @param {Number} cost
   * @param {Object} [moreinfo]
   */
  addOrientedPath (node, cost, moreinfo) {
    const current = this.paths.findIndex(n => n.node === node)
    if (current !== -1) {
      this.paths.splice(current, 1)
    }
    this.paths.push(new Path(cost, node, moreinfo))
  }

  /**
   * @param {Node} node
   * @param {Function} cost
   */
  addNonOrientedPath (node, cost) {
    this.addOrientedPath(node, cost)
    node.addOrientedPath(this, cost)
  }

  /**
   * Calculates the new distance for each node
   * Already visited nodes shouldn't be updated
   * The {@link Node}s returned are the nodes which were never calculated before
   * @returns {Node[]}
   */
  calcNeighboursTentativeDistance () {
    const self = this
    // Display startNode informations
    console.log(`We are at the node ${this.name}`)

    var newUnvisitedNodes = []
    this.paths.forEach(path => {
      if (path.node.visited === false) {
        console.log('\x1b[33m%s\x1b[0m', `Visiting neighbour : ${path.node.name}`)
        // should update not-visited neighbours which current distance is higher than the newly calculated one
        console.log('\x1b[33m%s\x1b[0m', `We compare ${path.node.distance} and ${this.distance + path.cost}`)
        if (path.node.distance > (this.distance + path.cost)) {
          if (path.node.distance === Infinity) {
            newUnvisitedNodes.push(path.node)
          }
          path.node.distance = this.distance + path.cost
          path.node.visitedFrom = self
        }
      }
    })
    console.log('NEW CALCULATED NODE : ', newUnvisitedNodes)
    return newUnvisitedNodes
  }
}

class Dijkstra {
  /**
   * Calculates the shortest path, and returns a list of nodes
   * that we need to go through to have the path
   * @param {Node} startNode
   * @param {Node} endNode
   * @returns {Node[]}
   */
  static shortestPathFirst (startNode, endNode) {
    if (startNode === endNode) {
      console.log('StartNode === EndNode')
      return []
    }

    // Set the distance value of startNode to 0
    startNode.distance = 0
    startNode.visited = true
    console.log(`StartNode: ${startNode.name} | Distance : ${startNode.distance} | Visited : ${startNode.visited}`)

    let currNode = startNode
    let result = []
    while (currNode !== endNode) {
      result = [...result, ...currNode.calcNeighboursTentativeDistance()]

      // Get the smallest distance
      result.sort((a, b) => {
        return a.distance - b.distance
      })

      currNode = result.shift()
      currNode.visited = true
      console.log('WE CHOOSE THE NODE : ', currNode)
    }

    return this.generatePath(endNode)
  }

  /**
   * Generates the path from an endNode to the startNode
   * it uses the `visitedFrom` property to navigate backwards
   * to the starting point
   * @param {Node} endNode
   * @returns {Node[]}
   */
  static generatePath (endNode) {
    var arrayPath = []
    arrayPath.unshift(endNode)
    while (endNode.visitedFrom !== null) {
      endNode = endNode.visitedFrom
      arrayPath.unshift(endNode)
    }
    this.printPath(arrayPath)
    return arrayPath
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
