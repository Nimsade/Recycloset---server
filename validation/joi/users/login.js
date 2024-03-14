import Joi from "joi";
import passwordRegex from "../../../service/passwordRegex.js";


const loginSchema = Joi.object({
	email: Joi.string()
		.pattern(
			RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,})$/)
		)

		.required(),
	password: Joi.string().pattern(passwordRegex).required().messages({
		"string.pattern.base":
			"Password must contain at least one uppercase, lowercase, special character(!@#$%^&*-), and number",
	}),
	failedLoginAttempts: { type: Number, default: 0 },
	lockUntil: { type: Date, default: null },
});

const loginSchemaValidation = async (userInput) => {
	return await loginSchema.validateAsync(userInput);
};
export default loginSchemaValidation;
