let http = require('http');

let fs = require('fs')

let server = http.createServer()

let url = require('url')

server.on('request', function(request, response) {

    fs.readFile('index.html', (err, data) => {

        response.writeHead(200)

        let query = url.parse(request.url, true).query
        
        response.end('Bonjour' + query.name)


    })
})

        /*

        if (err) {
            response.writeHead(404)
            
            response.end("ce fichier n'existe pas")
        }

        response.writeHead(200)

        response.end(data)

   })
})

*/


server.listen('8080')
