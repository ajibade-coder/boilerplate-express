require('dotenv').config()
process.env.MESSAGE_STYLE="uppercase"

let express = require('express');
let app = express();
console.log("Hello World")

let bodyParser = require('body-parser')

// Use body-parser middleware to handle URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    // Log the request method, path, and IP address
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    
    // Pass control to the next middleware function
    next();
});



app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/json", function(req, res) {
  let message = 'Hello json'

  res.json({"message": process.env.MESSAGE_STYLE == "uppercase" ? message.toUpperCase() : message});
});

app.get('/now', (req, res, next)=>{
  req.time = new Date().toString();
  next();
}, (req, res)=>{
  res.json({time : req.time})
})

app.get('/:word/echo', (req, res) => {
  const word = req.params.word; // Extract the 'word' parameter from the route
  res.json({ echo: word }); // Respond with a JSON object
});

app.route('/name')
  .get((req, res) => {
    // Get first and last name from query parameters
    const firstName = req.query.first;
    const lastName = req.query.last;

    // Respond with JSON object
    if (firstName && lastName) {
      res.json({ name: `${firstName} ${lastName}` });
    } else {
      res.status(400).json({ error: 'Missing first or last name in query parameters' });
    }
  })
  .post((req, res) => {
    // Get first and last name from request body
    const { first, last } = req.body;

    // Respond with JSON object
    if (first && last) {
      res.json({ name: `${first} ${last}` });
    } else {
      res.status(400).json({ error: 'Missing first or last name in request body' });
    }
  });

app.use("/public", express.static(__dirname + "/public"));




































 module.exports = app;
