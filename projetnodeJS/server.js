let express = require('express')

let app = express()

let bodyParser = require('body-parser')

let session = require('express-session')

//moteur de tempalates
app.set('view engine', 'ejs')


// Midlleware

app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.use(session({
  secret: 'hdhhvcb',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(require('./middlewares/flash.js'))

// Routes

app.get('/', (request, response) =>{
    let Message = require('./models/message.js')

    Message.all(function(messages){
        response.render('pages/index.ejs', {messages: messages})
    })

})

app.post('/', (request, response) =>{
    if (request.body.message === undefined || request.body.message === ''){
        request.flash('error', "Vous n'avez pas posté de message")
        response.redirect('/')

        
    } else{

        let Message = require('./models/message')

                Message.create(request.body.message, function() {

                    request.flash('sucess',"Merci !")

                    response.redirect('/')

                })
    }
})


app.listen(8000)