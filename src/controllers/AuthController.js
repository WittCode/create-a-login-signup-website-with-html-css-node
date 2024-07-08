import express from 'express';
import AuthService from '../services/AuthService.js';

const AuthController = express.Router();

// Handle the login POST payload, username and password.
AuthController.post('/login', async (req, res) => {
  try {
    // Extract username and password from the request body
    const {username, password} = req.body;
    // Validate the user credentials
    const authService = new AuthService();
    const user = await authService.login(username, password);
    // If the credentials are invalid, redirect back to the login page
    // with an error
    if (!user) {
      return res.redirect('/?error=Invalid username or password');
    }
    // If successful, attach the user object to their session.
    // The presence of the user object tells us that the user is authenticated.
    req.session.user = {
      username: user.username,
      dateJoined: user.dateJoined
    };
    // Redirect them to the users page
    return res.redirect('/');
  } catch (err) {
    console.error('Error logging user in', err);
  }
});

// Handle the signup POST payload, username and password.
AuthController.post('/signup', async (req, res) => {
  try {
    // Extract username and password from the request body
    const {username, password} = req.body;
    // Add the user to list of users if they don't already exist
    const authService = new AuthService();
    const user = await authService.signup(username, password);
    // User already exists, redirect back to the signup page with an error
    if (!user) {
      return res.redirect('/signup?error=Username already taken');
    }
    // If successful, attach the user object to their session.
    // The presence of the user object tells us that the user is authenticated.
    req.session.user = {
      username: user.username,
      dateJoined: user.dateJoined
    };
    // Send them to the users page.
    return res.redirect('/');
  } catch (err) {
    console.error('Error signing user up', err);
  }
});

// Handle user logout.
AuthController.get('/logout', async (req, res) => {
  try {
    // Destroy the session and redirect them to the login page
    // Unsets the req.session property.
    req.session.destroy();
    return res.redirect('/');
  } catch (err) {
    console.error('Error logging user out', err);
  }
});

export default AuthController;