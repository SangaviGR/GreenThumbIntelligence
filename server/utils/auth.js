require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET; // Use secret from environment variable
const expiration = process.env.JWT_EXPIRATION || '2h'; // Use expiration from environment variable or default to '2h'

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    // If token is in the "Authorization" header, extract it
    if (token && token.startsWith('Bearer ')) {
      token = token.split(' ').pop().trim();  // Extract token from "Bearer <token>"
    }

    if (!token) {
      return req; // If no token, just return the request object
    }

    try {
      const { data } = jwt.verify(token, secret); // Verify token with the secret
      req.user = data; // Attach the user data to the request object
    } catch (err) {
      console.log('Invalid token');
    }

    return req; // Return the request with user data attached (if valid token)
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    // Sign the token with the payload, secret, and expiration time
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
