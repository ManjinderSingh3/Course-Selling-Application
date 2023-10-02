"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUserJWT = exports.authenticateAdminJWT = exports.USER_JWT_SECRET = exports.ADMIN_JWT_SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.ADMIN_JWT_SECRET = "Admin";
exports.USER_JWT_SECRET = "User";
const authenticateAdminJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, exports.ADMIN_JWT_SECRET, (err, decryptedValue) => {
            if (err) {
                return res.sendStatus(403);
            }
            else {
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
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateAdminJWT = authenticateAdminJWT;
const authenticateUserJWT = (req, res, next) => {
    const authToken = req.headers.authorization;
    if (authToken) {
        const token = authToken.split(" ")[1];
        jsonwebtoken_1.default.verify(token, exports.USER_JWT_SECRET, (err, decryptedValue) => {
            if (err) {
                return res.sendStatus(403);
            }
            else {
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
    }
    else {
        res.sendStatus(403);
    }
};
exports.authenticateUserJWT = authenticateUserJWT;
