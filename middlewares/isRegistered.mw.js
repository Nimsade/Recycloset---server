import handleError from "../service/handleError.js";
import authMiddleware from "./auth.mw.js";

const isRegisteredMiddleware = async (req, res, next) => {
	if (!req.userData) {
		throw new Error("error 0x19856");
	}
	if (!req.userData.isRegistered) {
		return handleError(res, 401, "You are not a Registered user");
	}
	next();
};
export default isRegisteredMiddleware;
