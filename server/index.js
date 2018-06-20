require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const session = require('express-session');

const { checkForSession } = require('./middlewares/checkForSession');
const { read } = require('./controllers/swag_controller');
const { login, register, signout, getUser } = require('./controllers/auth_controller');
const { add, remove, checkout } = require('./controllers/cart_controller');
const { search } = require('./controllers/search_controller');

const app = express();

app.use(json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(checkForSession);
app.use(express.static(`${__dirname}/build`));

app.use((req, res, next) => {
  console.log('req.query: ', req.query);
  console.log('req.body: ', req.body);
  console.log('req.session: ', req.session);
  next();
});

// Swag
app.get('/api/swag', read);

// Auth
app.get('/api/user', getUser);
app.post('/api/register', register);
app.post('/api/login', login);
app.post('/api/signout', signout);

// Cart
app.post('/api/cart', add);
app.post('/api/cart/checkout', checkout);
app.delete('/api/cart', remove);

// Search
app.get('/api/search', search);

const port = process.env.PORT;
app.listen(port, () => { console.log(`Listening on port: ${ port }`) });