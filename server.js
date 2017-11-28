// Babel ES6/JSX Compiler
require('babel-register');

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var favicon = require('serve-favicon');
var logger = require('morgan');
var async = require('async');
var colors = require('colors');
var mongoose = require('mongoose');
var request = require('request');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var swig  = require('swig');
var xml2js = require('xml2js');
var _ = require('underscore');
const uuidv1 = require('uuid/v1');

var config = require('./config');
var routes = require('./app/routes');
var Website = require('./models/website');

var app = express();

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(express.static(path.join(__dirname, 'public')));


/**
 * POST /api/website
 * Adds new website to the database.
 */
app.post('/api/website', function(req, res, next) {
  var url = req.body.url;
  var websiteName = req.body.name;
  async.waterfall([
    function(callback) {
      try {
        var websiteId = uuidv1();

        Website.findOne({ websiteId: websiteId }, function(err, website) {
          if (err) return next(err);

          if (website) {
            return res.status(409).send({ message: website.websiteId + ' is already in the database.' });
          }

          callback(err, websiteId);
        });
      } catch (e) {
        return res.status(400).send({ message: 'XML Parse Error' });
      }
    },
    function(websiteId) {
      // var characterInfoUrl = 'https://api.eveonline.com/eve/CharacterInfo.xml.aspx?characterID=' + characterId;
      try {
        var website = new Website({
          websiteId: websiteId,
          name: websiteName,
          url: url
        });

        website.save(function(err) {
          if (err) return next(err);
          res.status(200).send({ message: websiteName + '  added success!' });
        });
      } catch (e) {
        res.status(404).send({ message: websiteName + ' is already added!' });
      }
      
    }
  ]);
});


/**
 * GET /api/websites
 * Return all websites. Filter by gender, race and bloodline.
 */
app.get('/api/websites', function(req, res, next) {
  var params = req.query;
  var conditions = {};

  // _.each(params, function(value, key) {
  //   conditions[key] = new RegExp('^' + value + '$', 'i');
  // });
 // .sort('-wins')
  Website
  .find({})
  .limit(1000)
  .exec(function(err, websites) {
      if (err) return next(err);
      return res.send(websites);
    });
});


/**
 * POST /api/delSite
 * Reports a character. Character is removed after 4 reports.
 */
app.post('/api/delSite', function(req, res, next) {
  // console.log(req.body.websiteId)
  var websiteId = req.body.websiteId;
  Website.findOne({ websiteId: websiteId }, function(err, website) {
    if (err) return next(err);

    if (!website) {
      return res.status(404).send({ message: 'Website not found.' });
    }

    if (website) {
      website.remove();
      return res.send({ message: website.name + ' has been deleted.' });
    }

  });
});

/**
 * PUT /api/updateSite
 * Update winning and losing count for both characters.
 */
app.put('/api/updateSite', function(req, res, next) {
  var siteId = req.body.websiteId;

  if (!siteId ) {
    return res.status(400).send({ message: 'updateSite requires at least one characters.' });
  }

  async.parallel([
      function(callback) {
        Website.findOne({ websiteId: siteId }, function(err, winner) {
          callback(err, winner);
        });
      }
    ],
    function(err, results) {
      if (err) return next(err);

      var site = results[0];

      if (!site) {
        return res.status(404).send({ message: 'One of the characters no longer exists.' });
      }

      async.parallel([
        function(callback) {
          site.valid = !site.valid;
          site.save(function(err) {
            callback(err);
          });
        }
      ], function(err) {
        if (err) return next(err);
        Website
        .find({})
        .limit(1000)
        .exec(function(err, websites) {
            if (err) return next(err);
            return res.send(websites);
          });
      });
    });
});


app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
        var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
        var page = swig.renderFile('views/index.html', { html: html });
        res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.use(function(err, req, res, next) {
  console.log(err.stack.red);
  res.status(err.status || 500);
  res.send({ message: err.message });
});

/**
 * Socket.io stuff.
 */
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
  onlineUsers++;

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
