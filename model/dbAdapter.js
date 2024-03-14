import connectToMongo from "./mongodb/dbConnect.js";
import {
	createUserMongo,
	deleteUserMongo,
	getUserByEmailMongo,
	patchStatusMongo,
	updateUserMongo,
	getAllUsersMongo,
	getUserByIdMongo,
} from "./mongodb/users/userService.js";
import {
	createItemMongo,
	getAllItemsMongo,
	getItemByIdMongo,
	getAllMyItemsMongo,
	updateItemMongo,
	updateLikeItemMongo,
	deleteItemMongo,
} from "./mongodb/items/itemService.js";
import normalizeUser from "./../normalize/user.normalize.js";
import normalizeItems from "../normalize/item.normalize.js";
import { generateHash } from "../service/bcrypt.js";

const DB = "mongo";

const connectToDb = async () => {
	if (DB === "mongo") {
		return await connectToMongo();
	}
};

const getAllUsers = async () => {
	if (DB === "mongo") {
		return await getAllUsersMongo();
	}
};

const getUserById = (id) => {
	if (DB === "mongo") {
		return getUserByIdMongo(id);
	}
};



const createUser = async (user) => {
	user = await normalizeUser(user);
	user.password = await generateHash(user.password);
	if (DB === "mongo") {
		const res = await createUserMongo(user);
		return await res.save();
	}
};

const updateUser = async (id, user) => {
	user = normalizeUser(user);
	if (DB === "mongo") {
		return await updateUserMongo(id, user);
	}
};

const getUserByEmail = async (email) => {
	if (DB === "mongo") {
		return await getUserByEmailMongo(email);
	}
};

const deleteUser = async (id) => {
	if (DB === "mongo") {
		return await deleteUserMongo(id);
	}
};

const patchStatus = async (id, isBusiness) => {
	if (DB === "mongo") {
		return await patchStatusMongo(id, isBusiness);
	}
};

const createItem = async (item) => {
	try {
			item = await normalizeItems(item);
		if (DB === "mongo") {
			return createItemMongo(item);
		}
	} catch (err) {
		return Promise.reject(err);
	}
};

const getAllItems = async () => {
	if (DB === "mongo") {
		return await getAllItemsMongo();
	}
};

const getItemById = async (id) => {
	if (DB === "mongo") {
		return await getItemByIdMongo(id);
	}
};

const getAllMyItems = async (user_id) => {
	if (DB === "mongo") {
		return await getAllMyItemsMongo(user_id);
	}
};

const updateItem = async (item_id, item) => {
	if (DB === "mongo") {
		return await updateItemMongo(item_id, item);
	}
};

const updateLikeItem = async (item_id, likes) => {
	if (DB === "mongo") {
		return await updateLikeItemMongo(item_id, likes);
	}
};

const patchPremiumNumber = async (item_id, premiumNumber) => {
	if (DB === "mongo") {
		return await patchPremiumNumberMongo(item_id, premiumNumber);
	}
};

const deleteItem = async (id) => {
	if (DB === "mongo") {
		return await deleteItemMongo(id);
	}
};

export default connectToDb;
export {
	createUser,
	createItem,
	getAllItems,
	getUserByEmail,
	updateUser,
	deleteUser,
	patchStatus,
	getItemById,
	getAllMyItems,
	updateItem,
	updateLikeItem,
	deleteItem,
	patchPremiumNumber,
	getAllUsers,
	getUserById,
};
