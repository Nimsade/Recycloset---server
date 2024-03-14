import handleError from "../../../service/handleError.js";
import User from "./User.js";

const createUserMongo = async (userData) => {
	let user = new User(userData);
	return await user.save();
};

const getAllUsersMongo = async () => {
	return await User.find({}, { password: 0 });
};

const getUserByIdMongo = async (id) => {
	return await User.findById(id, { password: 0 });
};

const updateUserMongo = async (id, userData) => {
	

	try {
		const updatedUser = await User.findByIdAndUpdate(id, userData, {
			new: true,
		}).exec(); 
		return updatedUser;
	} catch (err) {
			handleError(res, 400, err.message);
	}
};

const getUserByEmailMongo = async (email) => {
	try {
		const user = await User.findOne({ email });
		return user;
	} catch (err) {
			handleError(res, 400, err.message);
	}
};
const patchStatusMongo = async (id, isRegistered) => {
	return await User.updateOne({ _id: id }, { isRegistered: isRegistered });
};
const deleteUserMongo = async (id) => {
	return await User.findByIdAndDelete(id);
};
export {
	createUserMongo,
	getAllUsersMongo,
	getUserByIdMongo,
	getUserByEmailMongo,
	updateUserMongo,
	deleteUserMongo,
	patchStatusMongo,
};
