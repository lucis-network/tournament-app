const { createServer } = require('https')
const fs = require('fs');
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

const httpsOptions = {
    key: fs.readFileSync('./cert/key.pem', 'utf8'),
    cert: fs.readFileSync('./cert/server.crt', 'utf8')
};


app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {

        const parsedUrl = parse(req.url, true)
        const { pathname, query } = parsedUrl

        if (pathname === '/a') {
            app.render(req, res, '/a', query)
        } else if (pathname === '/b') {
            app.render(req, res, '/b', query)
        } else {
            handle(req, res, parsedUrl)
        }
    }).listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on https://localhost:${port}`)
    })
})