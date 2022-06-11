// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// API endpoint for dates
app.get('/api/:date', (req,res) => {
  const isoParsed = new Date(req.params.date);
  const unixParsed = new Date(Number(req.params.date));

  const dateParsed = isoParsed != 'Invalid Date' ? isoParsed : 
    ( unixParsed != 'Invalid Date' ? unixParsed
    : new Date());

  return res.json({
    unix : Date.parse(dateParsed),
    utc : dateParsed.toUTCString()
  });

});


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
