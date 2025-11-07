const fs = require('fs')
const path = require('path')

const routeTreePath = path.join(__dirname, '..', 'src', 'routeTree.gen.ts')

if (fs.existsSync(routeTreePath)) {
  fs.unlinkSync(routeTreePath)
  console.log('Cleaned routeTree.gen.ts')
}
