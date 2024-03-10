// import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  payload: object,
  secret: Secret,
  expired: string,
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expired,
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
