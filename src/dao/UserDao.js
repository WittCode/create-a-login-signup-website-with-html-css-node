export default class UserDao {
  // We won't use a database for this example.
  // Instead, we'll store users in memory in a static array.
  static USERS = [];

  // Add a user
  insertUser(user) {
    UserDao.USERS.push(user);
  }

  // Retrieve a user by their username
  getUser(username) {
    return UserDao.USERS.find(u => u.username === username);
  }

  // Get every user
  getUsers() {
    return UserDao.USERS;
  }
}