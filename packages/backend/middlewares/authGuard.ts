import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants/authConstants';
import user from '../models/user';
import { JwtPayload } from '@banga/types/auth';

function guardedRoute(options?: {
  adminOnly: boolean;
}): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
      return sendUnauthenticatedError(res);
    }

    const jwtToken = req.headers.authorization.split('Bearer ').at(-1)!;

    try {
      const jwtPayload = jwt.verify(jwtToken, JWT_SECRET) as JwtPayload;

      if (options?.adminOnly) {
        const userData = await user.findById(jwtPayload.userId);
        if (!userData!.isAdmin) return sendUnauthorizedError(res);
      }
    } catch (e) {
      console.log(e);
      return sendUnauthenticatedError(res);
    }

    next();
  };
}

function sendUnauthenticatedError(res: Response): void {
  res.status(401).json({ error: 'User not logged in.' });
}

function sendUnauthorizedError(res: Response): void {
  res.status(403).json({ error: 'User does not have access to this resource.' });
}

export { guardedRoute };
