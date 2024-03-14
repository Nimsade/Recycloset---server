import {
	createItem,
	deleteItem,
	getAllItems,
	getAllMyItems,
	getItemById,
	updateItem,
	updateLikeItem,
	patchPremiumNumber,
} from "../model/dbAdapter.js";
import handleError from "../service/handleError.js";

const getAllItemsController = async (req, res) => {
	try {
		let items = await getAllItems();
		res.json(items);
	} catch (err) {
		handleError(res, 400, err.message);
	}
};

const getItemByIdController = async (req, res) => {
	try {
		let item = await getItemById(req.params.id);
		res.json(item);
	} catch (err) {
		handleError(res, 400, err.message);
	}
};

const getMyItemsController = async (req, res) => {
	const userId = req.userData._id;
	try {
		let myItems = await getAllMyItems(userId);
		return res.json(myItems);
	} catch (err) {
		handleError(res, 400, err.message);
	}
};

const createItemController = async (req, res) => {

	try {
		const userId = req.userData._id;
		req.body.user_id = userId;
		let newItem = await createItem(req.body);
		return res.json(newItem);
	} catch (err) {
		handleError(res, 400, err.message);
	}
};

const updateItemController = async (req, res) => {
	try {
		const itemFromDb = await getItemById(req.params.id);
		let { user_id } = itemFromDb;
		user_id = user_id + "";
		if (!itemFromDb) {
			throw new Error("item not found");
		}
		if (req.userData.isRegistered && req.userData._id !== user_id) {
			throw new Error(
				"You are not allowed to update this item, you must be the owner of the item"
			);
		}
		const updatedItem = await updateItem(req.params.id, req.body);
		return res.json(updatedItem);
	} catch (err) {
		handleError(res, 400, err.message);
	}
};

const patchLikeController = async (req, res) => {
	try {
		const itemFromDb = await getItemById(req.params.id);
		if (!itemFromDb) {
			throw new Error("item not found");
		}
		let likes = [...itemFromDb.likes];
		if (likes.includes(req.userData._id)) {
			likes = likes.filter((id) => id !== req.userData._id);
		} else {
			likes.push(req.userData._id);
		}
		const updatedItemFromDb = await updateLikeItem(req.params.id, likes);
		console.log("updatedItemFromDb", updatedItemFromDb);
		return res.json(updatedItemFromDb);
	} catch (err) {
		handleError(res, 400, err.message);
	}
};

const patchPremiumNumberController = async (req, res) => {
	try {
		const itemFromDb = await getItemById(req.params.id);
		if (!itemFromDb) {
			throw new Error("item not found");
		}
		itemFromDb.premiumNumber = req.body.premiumNumber;
		const updatedItemFromDb = await patchPremiumNumber(
			req.params.id,
			itemFromDb
		);
		console.log("updatedItemFromDb", updatedItemFromDb);
		return res.json(updatedItemFromDb);
	} catch (err) {
		handleError(res, 400, err.message);
	}
};

const deleteItemController = async (req, res) => {
	try {
		const itemFromDb = await getItemById(req.params.id);
		if (!itemFromDb) {
			throw new Error("Item not found");
		}
		let { user_id } = itemFromDb;
		user_id = user_id + "";
		if (req.userData.isRegistered && req.userData._id !== user_id) {
			throw new Error(
				"You are not allowed to update this item, you must be the owner of the item"
			);
		}
		const itemAfterDeleteFromDb = await deleteItem(req.params.id);
		return res.json(itemAfterDeleteFromDb);
	} catch (err) {
		handleError(res, 400, err.message);
	}
};

export {
	getAllItemsController,
	getItemByIdController,
	getMyItemsController,
	createItemController,
	updateItemController,
	patchLikeController,
	patchPremiumNumberController,
	deleteItemController,
};
