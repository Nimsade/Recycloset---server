import handleError from "../service/handleError.js";

const adminOrRegisteredMiddleware =async (req, res, next) => {
	if (!req.userData) {
		throw new Error("you must be logged in");
	}
	if (req.userData.isAdmin || req.userData.isRegistered) {
		await next();
	} else {
		handleError(res, 401, "you not allowed to do this action");
	}
};
export default adminOrRegisteredMiddleware;
