/**
  * Instead of using template engines like pug, we will just
  * generate HTML as dynamic strings.
  */
export default class HTMLService {
  // Navigation bar for the users list page and profile page.
  // It is only displayed when a user is logged in.
  static NAVBAR = `<header>
    <nav class="navbar">
      <h1><a href="/" id="logo">Space Travellers</a></h1>
      <ul>
        <li><a class="underline-text" href="/">Home</a></li>
        <li><a class="underline-text" href="/profile">Profile</a></li>
        <li><a class="underline-text" href="/auth/logout">Logout</a></li>
      </ul>
    </nav>
  </header>`;

  // Generates the HTML for logging in a user. If there is an
  // error with the login process, display the error in a <p> tag.
  static generateLogInHTML(error) {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <link rel="stylesheet" href="globals.css">
    <link rel="stylesheet" href="login.css">
    <link rel="stylesheet" href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'>
  </head>
  <body>
    <form action="/auth/login" method="post">  
      <div id="login-container">
        <!-- Title and Logo -->
        <i style="font-size: xxx-large;" class='bx bxs-planet'></i>
        <h1>Log In</h1>
    
        <!-- Username and password -->
        <input class="login-input" type="text" placeholder="Username" name="username" required>
        <input class="login-input" type="password" placeholder="Password" name="password" required>
    
        <!-- Submit button -->
        <button class="login-input" type="submit">Log In</button>
  
        ${error ? `<p class="error">${error}</p>`: ''}
    
        <!-- Switch to register -->
        <p>Don't have an account?<a href="/signup">Sign Up</a></p>
      </div>
    </form>
  </body>
  </html>`;
  }

  // Generates the HTML for signing up a user. If there is an
  // error with the signup process, display the error in a <p> tag.
  static generateSignUpHTML(error) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login Page</title>
      <link rel="stylesheet" href="globals.css">
      <link rel="stylesheet" href="login.css">
      <link rel="stylesheet" href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'>
    </head>
    <body>
      <form action="/auth/signup" method="post">  
        <div id="login-container">
          <!-- Title and Logo -->
          <i style="font-size: xxx-large;" class='bx bxs-planet'></i>
          <h1>Sign Up</h1>
      
          <!-- Username and password -->
          <input class="login-input" type="text" placeholder="Username" name="username" required>
          <input class="login-input" type="password" placeholder="Password" name="password" required>
      
          <!-- Submit button -->
          <button class="login-input" type="submit">Sign Up</button>

          ${error ? `<p class="error">${error}</p>`: ''}
      
          <!-- Switch to login -->
          <p>Already a member? <a href="/">Log In</a></p>
        </div>
      </form>
    </body>
    </html>`;
  }

  // Generates the HTML for displaying the registered users.
  // Each user is displayed in a <p> tag.
  static generateUsersHTML(users) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Users</title>
      <link rel="stylesheet" href="globals.css">
      <link rel="stylesheet" href="users.css">
      <link rel="stylesheet" href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'>
    </head>
    <body>
      ${HTMLService.NAVBAR}
      <h1>Registered Users</h1>
      <div id="users-container">
        ${users.map(u => `<p>${u.username}</p>`).join('')}
      </div>
    </body>
    </html>`;
  }

  // Generates the HTML for displaying the user profile.
  static generateProfileHTML(user) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Profile</title>
      <link rel="stylesheet" href="globals.css">
      <link rel="stylesheet" href="profile.css">
      <link rel="stylesheet" href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'>
    </head>
    <body>
      ${HTMLService.NAVBAR}
      <div id="profile-container">
        <i style="font-size: xxx-large;" class='bx bxs-planet'></i>
        <h1>Welcome ${user.username}!</h1>
        <h3>Date Joined: ${user.dateJoined}</h3>
      </div>
    </body>
    </html>`;
  }
}