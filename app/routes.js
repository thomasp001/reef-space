// app/routes.js
var fs = require('fs');
var ocean_temp;
fs.readFile(__dirname + '/data/ocean_temp.json', "utf8", function (err, data) {
  ocean_temp = JSON.parse(data);
});
// grab the chicken model we just created

module.exports = function (app) {
  // server routes ===========================================================
  // handle things like api calls
  // authentication routes
  // sample api route
  app.get('/api/chickens', function (req, res) {
    // use mongoose to get all chickens in the database
    Chicken.find(function (err, chooks) {
      // if there is an error retrieving, send the error. 
      // nothing after res.send(err) will execute
      if (err) return console.error(err);
      res.json(chooks); // return all chickens in JSON format
    });
  });

  // route to handle creating goes here (app.post)
  app.post('/api/chickens', function (req, res) {
    // Save new chook in the database
    var myChook = new Chicken({
      name: req.body.name,
      breed: req.body.breed,
      laying: req.body.laying
    });
    myChook.save(function (err, myChook) {
      if (err) return console.error(err);
      myChook.speak();
    })
    res.end();
  });

  // route to handle delete goes here (app.delete)

  // frontend routes =========================================================
  // route to handle all angular requests
  /*app.get('*', function (req, res) {
  res.sendFile('/public/views/index.html', {
  root: (__dirname + '/..')
  }); // load our public/index.html file
  });*/

  app.get('/', function (req, res) {
    res.render('home');
  });

  app.get('/gbr', function (req, res) {
    res.render('gbr');
  });
  app.get('/sources', function (req, res) {
    res.render('sources');
  });
  app.get('/about', function (req, res) {
    res.render('about');
  });
  app.get('/data/waveData.json', function (req, res) {
    res.json(ocean_temp[req.query.site]);
  });
  app.use(function (req, res, next) {
    res.status(404);
    // respond with html page
    if (req.accepts('html')) {
      res.render('404');
      return;
    };
  });
};
