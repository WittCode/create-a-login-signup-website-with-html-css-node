import bcrypt from 'bcrypt';
import UserDao from '../dao/UserDao.js';

/**
 * Service for handling authentication logic.
 */
export default class AuthService {
  // The higher the salt rounds, the more secure the password hash will be
  static SALT_ROUNDS = 12;

  // Work with the user DAO
  userDao;

  constructor() {
    this.userDao = new UserDao();
  }

  // Handle user login
  async login(username, password) {
    // Get the user using their username
    const user = this.userDao.getUser(username);
    // User doesn't exist
    if (!user) {
      return undefined;
    }
    // Verify the user by comparing their password to the stored password hash
    const verified = await bcrypt.compare(password, user.password);
    // Incorrect password provided
    if (!verified) {
      return undefined;
    }
    return user;
  }

  // Handle user signup
  async signup(username, password) {
    // Check if the username already exists
    const existingUser = this.userDao.getUser(username);
    if (existingUser) {
      return undefined;
    }
    // Generate a salt to hash the password with
    const salt = await bcrypt.genSalt(AuthService.SALT_ROUNDS);
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a user object
    const dateJoined = new Date();
    const newUser = {username, password: hashedPassword, dateJoined};
    // Add the user to the list of users
    this.userDao.insertUser(newUser);
    return newUser;
  }
}