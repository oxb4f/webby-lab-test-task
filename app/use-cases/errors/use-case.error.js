export class UseCaseError extends Error {
  isUseCase = true;

  constructor(message) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UseCaseError);
    }

    this.name = "UseCaseError";
  }
}
