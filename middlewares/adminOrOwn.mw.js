import handleError from "../service/handleError.js";

const adminOrOwn =async (req, res, next) => {
	if (!req.userData) {
		throw new Error("you must be the owner of the item");
	}
	if (req.userData.isAdmin || req.userData._id === req.params.id) {
		await next();
	} else {
		handleError(res, 401, "you not allowed to do this action");
	}
};
export default adminOrOwn;
