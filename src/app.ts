import server from './server'

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Log: ~> app is up and running on ~> port-${port} on ENVIRONMENT ~> ${process.env.ENVIRONMENT}`)
})

module.exports = server
