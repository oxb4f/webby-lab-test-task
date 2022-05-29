import { errorResponseBuilderUtil, ErrorType } from "../utils/index.js";

export const errorMiddleware = (err, req, res, next) => {
  if (err.isJoi) {
    return res.json({
      status: 0,
      error: errorResponseBuilderUtil(ErrorType.VALIDATION, err),
    });
  }

  if (err.isUseCase) {
    return res.json({
      status: 0,
      error: errorResponseBuilderUtil(ErrorType.USECASE, err),
    });
  }

  console.error(err);

  return res.sendStatus(500);
};
