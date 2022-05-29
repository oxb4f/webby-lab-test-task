export const asyncHandlerWrapperUtil = (handler) => {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch((error) => next(error));
  };
};
