export class SessionsController {
  constructor({ sessionsUseCase }) {
    this.sessionsUseCase = sessionsUseCase;
  }

  createSession = async (req, res) => {
    res.json({
      token: await this.sessionsUseCase.createSession(req.body),
      status: 1,
    });
  };
}
