
const express = 	require('express');
const mongoose = 	require('mongoose');

const config = 	require(`${__dirname}/config`);

require('./helpers/Logger'); // Register Logger into app

const app = express();

// Clean up the form
const bodyParser = 	require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Auth =  require('./helpers/verifytoken'); 

// Public Routes
app.get('/',	(req, res) => { res.status(200).send('Welcome to Fun With Twitter Api'); res.end(); });
app.use('/api/tweets', Auth,	require(`${config.routePath}/FavTweetRoutes`));
app.use('/api/user',require(`${config.routePath}/UserRoutes`));
// app.use('/api/test', require(config.routePath + '/Routs'));

// 404 Error
app.get('*', (req, res) => { res.status(404).send('404 Not Found.'); });

function connect() {
  mongoose.connect(config.databaseUri, config.databaseOptions);
  mongoose.Promise = global.Promise;

  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);

  // Connect to DB
  return mongoose.connection;
}

function listen() {
  const port = process.env.PORT || 8080;
  app.listen(port, () => console.log(`Listening to the port ${port} ...`));
}

// Bind connection to error event (to get notification of connection errors)
connect()
  .on('error', console.error.bind(console, 'MongoDB connection error:'))
  .on('disconnected', connect)
  .once('open', listen);
