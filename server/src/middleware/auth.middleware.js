import { Clerk } from '@clerk/clerk-sdk-node';
import User from '../models/User.js';
import logger from '../utils/logger.js';

const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    // Verify the token with Clerk's servers
    const session = await clerk.sessions.verifySession(token);
    if (!session) {
      return res.status(401).json({ message: 'Invalid or expired session' });
    }

    // Find the user in *our* database that matches
    const user = await User.findOne({ clerkId: session.userId });
    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'User not found or inactive' });
    }

    // Attach our local user to the request
    req.user = user;
    next();

  } catch (error) {
    logger.error('Auth Middleware Error:', error);
    res.status(401).json({ status: 'error', message: 'Not authorized' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: `Role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};