import jwt from "jsonwebtoken";

const generateToken = async (payload, expDate = "30d") => {
	return await new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			process.env.TOKEN_PRIVATE_KEY,
			{ expiresIn: expDate },
			(err, token) => {
				if (err) reject(err);
				else resolve(token);
			}
		);
	});
};

const verifyToken = async (token) => {
	return await new Promise((resolve, reject) => {
		jwt.verify(token, process.env.TOKEN_PRIVATE_KEY, (err, payload) => {
			if (err) reject(err);
			else resolve(payload);
		});
	});
};

export { generateToken, verifyToken };
