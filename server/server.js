import express from 'express';
import path from 'path';

const app = express();
const port = 3000;
var publicPath = path.resolve(__dirname, 'client');

app.use(express.static(publicPath));

app.listen(port, function(){
  console.log('Listening on port', port);
})