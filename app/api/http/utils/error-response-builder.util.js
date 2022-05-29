export const ErrorType = Object.freeze({
  VALIDATION: 0,
  USECASE: 1,
});

export const errorResponseBuilderUtil = (type, error) => {
  if (type === ErrorType.VALIDATION) {
    return {
      message: "validationError",
      fields: error.details.map(({ context }) => context.key).join(" "),
    };
  }

  if (type === ErrorType.USECASE) {
    return {
      message: error.message,
    };
  }

  throw new Error("invalid error type");
};
