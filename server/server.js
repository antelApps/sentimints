var express = require('express');
var path = require('path');
var routes = express.Router();

var bodyParser = require('body-parser')

var port = 3000;
var publicPath = path.resolve(__dirname + '/../dist');
var url = require('url');



//
// API routes
//

routes.use('/api/mint',
  require('./review-api.js')
)

routes.get('/api/*', function(req, res) {
  res.status(404).send({ reason: 'No such API endpoint' })
})

var app = express();

// Parse request body as JSON
app.use( bodyParser.json() )

app.use (function (req, res, next) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  next();
});
//
// Static assets (html, etc.)
//

app.use(express.static(publicPath));


var userRouter = require('./review-api')
routes.use('/api/mint/', userRouter)

routes.get('/*', function(req, res){
  res.sendFile(publicPath + '/index.html')
});

// Mount our main router
app.use('/', routes)

app.listen(port, function(){
  console.log('Listening on port', port);
});
