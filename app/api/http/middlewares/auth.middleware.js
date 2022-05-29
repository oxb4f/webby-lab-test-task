import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  console.error("Jwt secret is not specified");

  process.exit(1);
}

export const jwtSecret = process.env.JWT_SECRET;

export const authMiddlewareFactory = ({ usersUseCase }) => {
  return (req, res, next) => {
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];

    if (!token) {
      return res.sendStatus(401);
    }

    jwt.verify(token, jwtSecret, (error, payload) => {
      if (error) {
        return res.sendStatus(401);
      }

      usersUseCase.getUserById({ userId: payload.userId }).then(
        (user) => {
          if (!user) {
            return res.sendStatus(401);
          }

          next();
        },
        (error) => {
          console.error(error);

          return res.sendStatus(401);
        },
      );
    });
  };
};
