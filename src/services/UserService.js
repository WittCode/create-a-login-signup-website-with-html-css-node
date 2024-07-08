import UserDao from '../dao/UserDao.js';

export default class UserService {

  // Handles database queries for user related tasks
  userDao;

  constructor() {
    this.userDao = new UserDao();
  }

  // Retrieve all users from the database
  getUsers() {
    return this.userDao.getUsers();
  }

  // Retrieve a specific user from the database using their username
  getUser(username) {
    return this.userDao.getUser(username);
  }
}