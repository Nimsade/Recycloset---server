import Joi from "joi";
import phoneRegex from "../../../service/phoneRegex.js";
import passwordRegex from "../../../service/passwordRegex.js";

const registerSchema = Joi.object({
	name: Joi.object()
		.keys({
			first: Joi.string().min(2).max(256).required(),
			middle: Joi.string().min(2).max(256).allow(""),
			last: Joi.string().min(2).max(256).required(),
		})
		.required(),
	phone: Joi.string().pattern(phoneRegex).required(),
	email: Joi.string()
		.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,})$/)
		.required(),
	password: Joi.string().pattern(passwordRegex).required().messages({
		"string.pattern.base":
			"Password must contain at least one uppercase, lowercase, special character(!@#$%^&*-), and number",
	}),
	image: Joi.object().keys({
		url: Joi.string()
			.uri({ scheme: ["http", "https"] })
			.allow(""),
		alt: Joi.string().min(2).max(256).allow("").when("url", {
			is: Joi.exist(),
			then: Joi.required(),
		}),
	}),
	address: Joi.object()
		.keys({
			state: Joi.string().min(2).max(256).allow(""),
			country: Joi.string().min(2).max(256).required(),
			city: Joi.string().min(2).max(256).required(),
			street: Joi.string().min(2).max(256).required(),
			houseNumber: Joi.number().min(2).max(256).required(),
			zip: Joi.number().min(10000).max(9999999).required(),
		})
		.required(),
	isRegistered: Joi.boolean().required(),
	
});

const registerSchemaValidation = async (userInput) => {
	return await registerSchema.validateAsync(userInput);
};

export default registerSchemaValidation;
