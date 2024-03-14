'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.jwtHelpers = void 0;
// import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const createToken = (payload, secret, expired) => {
  return jsonwebtoken_1.default.sign(payload, secret, {
    expiresIn: expired,
  });
};
const verifyToken = (token, secret) => {
  return jsonwebtoken_1.default.verify(token, secret);
};
exports.jwtHelpers = {
  createToken,
  verifyToken,
};
