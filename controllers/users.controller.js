import {
	getAllUsers,
	getUserByEmail,
	createUser,
	updateUser,
	deleteUser,
	patchStatus,
	getUserById,
} from "../model/dbAdapter.js";
import handleError from "../service/handleError.js";
import { generateHash, cmpHash } from "../service/bcrypt.js";
import { generateToken } from "../token/jwt.js";
import { OAuth2Client } from "google-auth-library";

const getAllUsersController = async (req, res) => {
	try {
		let users = await getAllUsers();
		return res.json(users);
	} catch (err) {
		console.log(err);
	}
};

const getUserByIdController = async (req, res) => {
	try {
		let userFromDb = await getUserById(req.params.id);
		return res.json(userFromDb);
	} catch (error) {
		console.log(error);
		handleError(res, 400, error.message);
	}
};

const registerController = async (req, res) => {
	try {
		let userFromDb = await getUserByEmail(req.body.email);
		if (userFromDb) throw new Error("user already exists");
		let passwordHash = await generateHash(req.body.password);
		req.body.password = passwordHash;
		let newUser = await createUser(req.body);
		newUser.password = undefined;
		delete newUser.password;
		res.json(newUser);
	} catch (err) {
		handleError(res, 400, err.message);
	}
};

const loginController = async (req, res) => {
	try {
		let userFromDb = await getUserByEmail(req.body.email);
		console.log("email", userFromDb);
		if (!userFromDb) throw new Error("invalid email or password");

		if (userFromDb.lockUntil && userFromDb.lockUntil < new Date()) {
			await updateUser(userFromDb._id, {
				failedLoginAttempts: 0,
				lockUntil: null,
			});
		}

		if (userFromDb.lockUntil && userFromDb.lockUntil > new Date()) {
			throw new Error("Account is locked. Please try again later.");
		}

		let passwordMatch = await cmpHash(req.body.password, userFromDb.password);

		if (!passwordMatch) {
			const attempts = (userFromDb.failedLoginAttempts || 0) + 1;
			let updateData = { failedLoginAttempts: attempts };

			if (attempts >= 3) {
				updateData.lockUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); 
			}

			await updateUser(userFromDb._id, updateData);

			throw new Error("invalid email or password");
		} else if (passwordMatch) {
			await updateUser(userFromDb._id, {
				failedLoginAttempts: 0,
				lockUntil: null,
			});
		}

		let token = await generateToken({
			_id: userFromDb._id,
			isAdmin: userFromDb.isAdmin,
			isBusiness: userFromDb.isBusiness,
		});
		console.log(token);
		res.json(token);
	} catch (err) {
		handleError(res, 400, err.message);
	}
};

const handleGoogleOAuthUser = async (tokens, res) => {
	const client = new OAuth2Client(CONFIG.oauth2Credentials.client_id);
	const ticket = await client.verifyIdToken({
		idToken: tokens.id_token,
		audience: CONFIG.oauth2Credentials.client_id,
	});
	const payload = ticket.getPayload();

	let userFromDb = await getUserByEmail(req.body.email);
	if (!userFromDb) {
		const newUser = {
			email: req.body.email,
			name: req.body.name,
			password: null,
		};
		userFromDb = await createUser(newUser);
	}

	const token = await generateToken({
		_id: userFromDb._id,
		isAdmin: userFromDb.isAdmin,
		isRegistered: userFromDb.isRegistered,
	});
	res.json({ token });
};

const updateUserController = async (req, res) => {
	try {
		let userFromDb = await updateUser(req.params.id, req.body);
		userFromDb.password = undefined;
		res.json(userFromDb);
	} catch (err) {
		handleError(res, 400, err.message);
	}
};

const patchStatusController = async (req, res) => {
	try {
		let userFromDb = await patchStatus(req.params.id, req.body.isRegistered);
		userFromDb.password = undefined;
		res.json(userFromDb);
	} catch (err) {
		handleError(res, 400, err.message);
	}
};

const deleteUserController = async (req, res) => {
	try {
		let userFromDb = await deleteUser(req.params.id);
		userFromDb.password = undefined;
		res.json(userFromDb);
	} catch (err) {
		handleError(res, 400, err.message);
	}
};

export {
	getAllUsersController,
	loginController,
	registerController,
	updateUserController,
	deleteUserController,
	patchStatusController,
	handleGoogleOAuthUser,
	getUserByIdController,
};
