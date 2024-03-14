'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const zod_1 = require('zod');
const config_1 = __importDefault(require('../../config'));
const ApiError_1 = __importDefault(require('../../errors/ApiError'));
const handleCastError_1 = __importDefault(
  require('../../errors/handleCastError'),
);
const handleValidationError_1 = __importDefault(
  require('../../errors/handleValidationError'),
);
const handleZodError_1 = __importDefault(
  require('../../errors/handleZodError'),
);
const globalErrorHandler = (error, req, res, next) => {
  console.log(`Global error handler`, error);
  let statusCode = 500;
  let message = `Something went wrong`;
  let errorMessage = [];
  if (
    (error === null || error === void 0 ? void 0 : error.name) ===
    'ValidationError'
  ) {
    const simplifiedError = (0, handleValidationError_1.default)(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof zod_1.ZodError) {
    const simplifiedError = (0, handleZodError_1.default)(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (
    (error === null || error === void 0 ? void 0 : error.name) === 'CastError'
  ) {
    const simpliFiedError = (0, handleCastError_1.default)(error);
    statusCode = simpliFiedError.statusCode;
    message = simpliFiedError.message;
    errorMessage = simpliFiedError.errorMessage;
  } else if (error instanceof ApiError_1.default) {
    statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
    message = error === null || error === void 0 ? void 0 : error.message;
    errorMessage = (error === null || error === void 0 ? void 0 : error.message)
      ? [
          {
            path: '',
            message:
              error === null || error === void 0 ? void 0 : error.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error === null || error === void 0 ? void 0 : error.message;
    errorMessage = (error === null || error === void 0 ? void 0 : error.message)
      ? [
          {
            path: '',
            message:
              error === null || error === void 0 ? void 0 : error.message,
          },
        ]
      : [];
  }
  res.status(400).json({ err: error });
  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack:
      config_1.default.env !== 'production'
        ? error === null || error === void 0
          ? void 0
          : error.stack
        : undefined,
  });
  next();
};
exports.default = globalErrorHandler;
