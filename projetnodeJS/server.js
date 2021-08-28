let http = require('http');

let fs = require('fs')

let server = http.createServer()

let url = require('url')


server.on('request', function(request, response) {

    let query = url.parse(request.url, true).query
    let name = query.name === undefined ? 'anonyme' : query.name
    
    fs.readFile('index.html','utf8', (err, data) => {




        if (err) {
            response.writeHead(404)
            
            response.end("ce fichier n'existe pas")
        }

        response.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })

        data = data.replace('{{ name }}', name)
        response.end(data)

  })
})




server.listen('8080')
