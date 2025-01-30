import jwt from "jsonwebtoken";
import errorHander from "./error.js";

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  // console.log(token);
  if (!token) {
    return next(errorHander(401, "Unauthorised User"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return next(errorHander(401, "Unauthorised User"));
    }

    req.user = user;
    next();
  });
  // if(req.params.userId!==req.)
};

export default verifyToken;
