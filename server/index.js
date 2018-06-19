require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const session = require('express-session');

const { checkForSession } = require('./middlewares/checkForSession');
const { read } = require('./controllers/swag_controller');

const app = express();

app.use(json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(checkForSession);

app.use((req, res, next) => {
  console.log(`req.body: ${ req.body }`);
  console.log(`req.session: ${ req.session }`);
  next();
});

app.get('/api/swag', read);

const port = process.env.PORT;
app.listen(port, () => { console.log(`Listening on port: ${ port }`) });