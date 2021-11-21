const http = require("http")
const createServer = require('github-webhook-handler')

const handle = createHandler({path:'/docker_deploy',secret:'myHashSecret'})

http.createServer((req,res) => {
    handler(req,res,err => {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(7777, () => {
    console.log('Webhook listen at 7777')
})
handler.on('error',err => {
console.error('Error',err.message)
})
handler.on('*',event => {
console.log('Received * ',event.payload)
})