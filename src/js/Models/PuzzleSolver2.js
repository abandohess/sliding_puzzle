

function start() {
   var init = new Node(0, [[6,4,7],[8,5,0],[3,2,1]], 1, 2, 0)
   var goal = new Node(0, [[1,2,3],[4,5,6],[7,8,0]], 2, 2, 0)

   var astar = new AStar(init, goal, 0)
   // To measure time taken by the algorithm
   var startTime = new Date()
   // Execute AStar
   var result = astar.execute()
   // To measure time taken by the algorithm
   var endTime = new Date()
   alert('Completed in: ' + (endTime - startTime) + ' milliseconds')

   var panel = document.getElementById('panel')
   panel.innerHTML = 'Solution: ' + result.path + ' Total steps: ' + result.path.length + '
'
   solution = result.path
}
