import jwt from "jsonwebtoken";
export const ADMIN_JWT_SECRET = "Admin";
export const USER_JWT_SECRET = "User";
import { Request, Response, NextFunction } from "express";

export const authenticateAdminJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, ADMIN_JWT_SECRET, (err, decryptedValue) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        // CASE-1 : When Token is undefined
        if (!decryptedValue) {
          return res.sendStatus(403);
        }
        // CASE-2 : When token/payload is of type String
        if (typeof decryptedValue === "string") {
          return res.sendStatus(403);
        }
        req.headers["userId"] = decryptedValue.id;

        // IMPORTANT!!! : In case of JS we were directly assigning a new key to 'req' object. Whereas in TS we cannot.
        // req.user = decryptedValue
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
};

export const authenticateUserJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;
  if (authToken) {
    const token = authToken.split(" ")[1];
    jwt.verify(token, USER_JWT_SECRET, (err, decryptedValue) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        if (!decryptedValue) {
          return res.sendStatus(403);
        }
        if (typeof decryptedValue === "string") {
          return res.sendStatus(403);
        }
        req.headers["userId"] = decryptedValue.id; // Decrypted value is a object and has couple of keys. We are using ID because we have assigned token to an 'id' key of the object. LINE#15 of user.ts file
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};
