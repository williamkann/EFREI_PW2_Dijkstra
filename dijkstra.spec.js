const sinon = require('sinon')
sinon.test = require('sinon-test')(sinon)
const { expect } = require('chai')
const { Dijkstra, Node } = require('./dijkstra.js')

function n (name) {
  return new Node(name)
}
/**
 * Please look at the [fixture-graph.odg](fixture-graph.odg) to understand the links
 * [Test Fixtures](https://github.com/junit-team/junit4/wiki/Test-fixtures)
 *
 * @returns {{ startNode: Node, endNode: Node, nodes: Node[][] }}
 */
function fixtureGenerator () {
  const nodes = [
    [n('1x1'), n('1x2'), n('1x3')],
    [n('2x1'), n('2x2'), n('3x3')],
    [n('3x1'), n('3x2'), n('4x3')],
  ]

  nodes[0][0].addNonOrientedPath(nodes[0][1], 2)
  nodes[0][0].addNonOrientedPath(nodes[1][0], 2)
  nodes[0][0].addNonOrientedPath(nodes[1][1], 4)

  nodes[0][1].addNonOrientedPath(nodes[0][2], 2)
  nodes[0][1].addNonOrientedPath(nodes[1][1], 3)
  nodes[0][1].addNonOrientedPath(nodes[1][0], 8)
  nodes[0][1].addNonOrientedPath(nodes[1][2], 4)

  nodes[0][2].addNonOrientedPath(nodes[1][1], 7)
  nodes[0][2].addNonOrientedPath(nodes[1][2], 2)

  nodes[1][0].addNonOrientedPath(nodes[2][0], 2)
  nodes[1][0].addNonOrientedPath(nodes[1][1], 1)
  nodes[1][0].addNonOrientedPath(nodes[2][1], 2)

  nodes[1][1].addNonOrientedPath(nodes[2][0], 4)
  nodes[1][1].addNonOrientedPath(nodes[2][1], 4)
  nodes[1][1].addNonOrientedPath(nodes[2][2], 2)
  nodes[1][1].addNonOrientedPath(nodes[1][2], 1)

  nodes[1][2].addNonOrientedPath(nodes[2][1], 5)
  nodes[1][2].addNonOrientedPath(nodes[2][2], 1)

  nodes[2][1].addNonOrientedPath(nodes[2][0], 2)
  nodes[2][1].addNonOrientedPath(nodes[2][2], 3)

  const startNode = nodes[0][1]
  const endNode = nodes[2][2]

  return { startNode, endNode, nodes }
}

describe('Dijkstra', () => {
  describe('#shortestPath', () => {
    it('should find the shortest path between two specified nodes', sinon.test(function () {
      const { startNode, endNode, nodes } = fixtureGenerator()

      const result = Dijkstra.shortestPathFirst(startNode, endNode)
    }))
  })
})
