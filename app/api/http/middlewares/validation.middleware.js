export const paramsValidationMiddleware = (schema) => {
  return (req, res, next) => {
    schema.validateAsync(req.params).then(
      (result) => {
        req.params = result;
        next();
      },
      (error) => next(error),
    );
  };
};

export const queryValidationMiddleware = (schema) => {
  return (req, res, next) => {
    schema.validateAsync(req.query).then(
      (result) => {
        req.query = result;
        next();
      },
      (error) => next(error),
    );
  };
};

export const bodyValidationMiddleware = (schema) => {
  return (req, res, next) => {
    schema.validateAsync(req.body).then(
      (result) => {
        req.body = result;
        next();
      },
      (error) => next(error),
    );
  };
};
