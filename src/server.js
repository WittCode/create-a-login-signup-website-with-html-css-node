import express from 'express';
import session from 'express-session';
import path from 'path';
import AuthController from './controllers/AuthController.js';
import HTMLService from './services/HTMLService.js';
import UserService from './services/UserService.js';

// Capture environment variables in regular variables
const NODE_ENV = process.env.NODE_ENV;
const SECRET = process.env.SECRET;
const URL = process.env.URL;
const HOST = process.env.HOST;
const PORT = process.env.PORT;

const app = express();
// Handle JSON and URL encoded payloads
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Add logging middleware to see all requests
app.use((req, res, next) => {
  console.log('--------------------------------------------------------------------');
  console.log(`[${new Date().toISOString()}]: ${req.method} ${req.url} ${JSON.stringify(req.body)}`);
  return next();
});
// Set the location of our static content.
// For this application these are the CSS files and space image.
app.use(express.static(path.resolve(import.meta.dirname, 'public')));
// Set a session on the user in an HTTP only cookie.
app.use(session({
  name: 'sid',
  cookie: {
    httpOnly: true
  },
  // Sign the session with our secret.
  secret: SECRET,
  // Force the session to be saved back to the session store
  // even if it was never modified during the request.
  resave: true,
  // Save an uninitialized session to the store.
  // A session is uninitialized if it is new but not modified.
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  // User is authenticated, send them the users HTML page
  if (req.session.user) {
    const userService = new UserService();
    const users = userService.getUsers();
    const usersHTML = HTMLService.generateUsersHTML(users);
    return res.send(usersHTML);
  }
  // User is not authenticated, send them the login HTML page
  // If there is an error, such as invalid credentials, send an error message too.
  const loginHTML = HTMLService.generateLogInHTML(req.query.error);
  return res.send(loginHTML);
});

app.get('/signup', (req, res) => {
  // If the user is authenticated, send them to the users page
  if (req.session.user) {
    return res.redirect('/');
  }
  // If there is an error, such as the username is already taken,
  // send an error message.
  const signupHTML = HTMLService.generateSignUpHTML(req.query.error);
  return res.send(signupHTML);
});

// Handle log in and sign up payloads
app.use('/auth', AuthController);

app.use((req, res, next) => {
  // If the user is authenticated, allow them to continue
  // in the middleware stack
  if (req.session.user) {
    return next();
  }
  // User is not authenticated, send them back to the login page
  return res.redirect('/');
});

app.get('/profile', (req, res) => {
  // Generate the profile page HTML based on the user object
  const profileHTML = HTMLService.generateProfileHTML(req.session.user);
  return res.send(profileHTML);
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at ${URL} in ${NODE_ENV} mode!`);
});