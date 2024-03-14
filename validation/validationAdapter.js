import registerSchemaValidation from "./joi/users/register.js";
import loginSchemaValidation from "./joi/users/login.js";
import editUserSchemaValidation from "./joi/users/editUser.js";
import validateObjectIdSchema from "./joi/objectId.js";
import createItemSchemaValidation from "./joi/items/item.validation.js";


const VALIDATION = "joi";

const registerValidation = async (req, res, next) => {
	const userInput = req.body;
	if (VALIDATION === "joi") {
		return await registerSchemaValidation(userInput);
	} else {
		throw new Error(`Validation ${VALIDATION} is not supported`);
	}
};

const loginValidation = async (req, res, next) => {
	if (VALIDATION === "joi") {
		try {
			await loginSchemaValidation(req.body);
			next();
		} catch (error) {
			res.status(400).json({ error: error.details[0].message });
		}
	} else {
		throw new Error(`Validation ${VALIDATION} is not supported`);
	}
};

const editUserValidation = async (userInput) => {
	if (VALIDATION === "joi") {
		return await editUserSchemaValidation(userInput);
	} else {
		throw new Error(`Validation ${VALIDATION} is not supported`);
	}
};

const objectIdValidation = async (id) => {
	if (VALIDATION === "joi") {
		return await validateObjectIdSchema(id);
	} else {
		throw new Error(`Validation ${VALIDATION} is not supported`);
	}
};

const createItemValidation = async (userInput) => {
	if (VALIDATION === "joi") {
		return await createItemSchemaValidation(userInput);
	} else {
		throw new Error(`Validation ${VALIDATION} is not supported`);
	}
};



export {
	registerValidation,
	loginValidation,
	editUserValidation,
	objectIdValidation,
	createItemValidation,

};
