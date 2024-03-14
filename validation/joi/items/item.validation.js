import Joi from "joi";

const createItemSchema = Joi.object({
	title: Joi.string().min(2).max(256).required(),
	subtitle: Joi.string().min(2).max(256).required(),
	description: Joi.string().min(2).max(1024).required(),
	phone: Joi.string()
		.pattern(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
		.required(),
	price: Joi.number().min(1).max(9999999).required(),
	typeOfItem: Joi.string().min(2).max(256).required(),
	email: Joi.string()
		.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,})$/)
		.required(),
	web: Joi.string().uri({ scheme: ["http", "https"] }),
	image: Joi.object().keys({
		url: Joi.string().uri({ scheme: ["http", "https"] }),
		alt: Joi.string().min(2).max(256).allow(""),
	}),
	address: Joi.object()
		.keys({
			state: Joi.string().min(2).max(256).allow(""),
			country: Joi.string().min(2).max(256).required(),
			city: Joi.string().min(2).max(256).required(),
			street: Joi.string().min(2).max(256).required(),
			houseNumber: Joi.number().min(1).max(9999999).required(),
			zip: Joi.number().min(1).max(9999999).allow(""),
		})
		.required(),
});

const createItemSchemaValidation = (itemInput) => {
	return createItemSchema.validateAsync(itemInput);
};
export default createItemSchemaValidation;
