// Require our node module dependencies express, body-parser, nunjucks + nexmo
const app = require('express')()
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const Nexmo = require('nexmo')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
nunjucks.configure('views', { express: app })

const nexmo = new Nexmo({
    apiKey: '9ebe1f14',
    apiSecret: 'Q1dfO7aEnojM9lUg'
})
// create view for the html form views/index
app.get('/', (req, res) => {
    res.render('index.html', {message: '2FactorAuth'})
})
// create post method for form
app.post('/verify', (req, res) => {
    nexmo.verify.request({
        number: req.body.number,
        // change your brand this will add your name to the text message with the code
        brand: 'Nick'
    }, (error, result) => {
        if (result.status != 0) {
            res.render('index.html', { message: result.error_text })
        } else {
            res.render('check.html', { requestId: result.request_id})
        }
    })
})

app.post('/check', (req, res) => {
    nexmo.verify.check({
        request_id: req.body.requestId,
        code: req.body.code
    }, (error, result) => {
        if (result.status != 0) {
            res.render('index.html', {message: result.error_text})
        } else {
            res.render('success.html')
        }
    })
})

// Listen on local host port 3000
app.listen(3000)