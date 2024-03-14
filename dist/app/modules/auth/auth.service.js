'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const jwtHelper_1 = require('../../../Helper/jwtHelper');
const config_1 = __importDefault(require('../../../config'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const user_model_1 = require('../user/user.model');
const createUser = user =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isEmailExist = yield user_model_1.User.findOne({ email: user.email });
    if (isEmailExist) {
      throw new ApiError_1.default(
        http_status_1.default.CONFLICT,
        'This email is already exist',
      );
    }
    const createdUser = yield user_model_1.User.create(user);
    if (!createdUser) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        `User not created`,
      );
    }
    const result = yield user_model_1.User.findById(createdUser._id);
    const token = jwtHelper_1.jwtHelpers.createToken(
      { email: result === null || result === void 0 ? void 0 : result.email },
      config_1.default.jwt.secret,
      config_1.default.jwt.expires_in,
    );
    return { result, token };
  });
const loginUser = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield user_model_1.User.isUserExist(email);
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'User does not exist',
      );
    }
    if (
      isUserExist.password &&
      !(yield user_model_1.User.isPasswordMatched(
        password,
        isUserExist === null || isUserExist === void 0
          ? void 0
          : isUserExist.password,
      ))
    ) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'Password not match',
      );
    }
    const { email: userEmail } = isUserExist;
    // create access token
    const token = jwtHelper_1.jwtHelpers.createToken(
      { email: userEmail },
      config_1.default.jwt.secret,
      config_1.default.jwt.expires_in,
    );
    return {
      token,
    };
  });
exports.AuthService = {
  createUser,
  loginUser,
};
