VONAGE API

Step1: First create account @ https://dashboard.nexmo.com/sign-up?utm_source=DEV_REL&utm_medium=github&utm_campaign=node-server-sdk

Step2: Create a package. json file to do this run 'npm init -y' in terminal

Step3: install the node_modules dependencies 'npm install express body-parser nunjucks nexmo'

step4: open up node_modules and look at nunjucks readme
        nunjucks allows data to be passed to templates using variable syntax

step5: create index.js

step 6: pase into index.js

// Require our node module dependencies express, body-parser, nunjucks + nexmo
const app = require('express')()
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const Nexmo = require('nexmo')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
nunjucks.configure('views', { express: app })

const nexmo = new Nexmo({
    apiKey: 'API KEY FROM VONAGE',
    apiSecret: 'API SECRET FROM VONAGE'
})

// Listen on local host port 3000
app.listen(3000)

step 7: create a views folder in the root folder vonage using 'mkdir views' in terminal

step8 : create an index.html file in views folder this will be the form


step9 : create html form 

<form method="post" action="verify">
    <input name="number" type="tel">
    <button>Get Code</button>
</form>

step 10: add to index.js file

// create view for views/index
app.get('/', (req, res) => {
    res.render('index.html', {message: '2FactorAuth'})
})

step 11: run 'node index.js' in terminal and open localhost:3000/ in browser

step 12: add post method under app.get in index.js

// create post method for form
app.post('/verify', (req, res) => {
    nexmo.verify.request({
        number: req.body.number,
        brand: 'ACME Corp'
    }, (error, result) => {
        if (result.status != 0) {
            res.render('index.html', { message: result.error_text })
        } else {
            res.render('check.html', { requestId: result.request_id})

step 13: create check.html in views folder

<form method="post" action="check">
    <input name="code" placeholder="Enter code">
    <input name="requestId" type="hidden" value="{{ requestId }}">
    <button>Verify</button>
</form>

step 14: create app.post for check index.js

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

step 15: create success.html
<h1>Success!</h1>

