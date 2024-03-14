import mongoose from "mongoose";
import Image from "../users/Image.js";
import Address from "../users/Address.js";
import Joi from "joi";


const itemSchema = new mongoose.Schema({
	title: Joi.string().min(2).max(256).required(),
	subtitle: Joi.string().min(2).max(256).required(),
	description: {
		...Joi.string().min(2).max(256).required(),
		maxLength: 1024,
	},
	phone: 
		Joi.string()
    .pattern(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
    .required(),
	email: {
		type: String,
		required: true,
		trim: true,
		match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
	},
	typeOfItem: Joi.string().min(2).max(256).required(),
	image: Image,
	address: Address,
	likes: [String],
	createAt: {
		type: Date,
		default: Date.now,
	},
	price: {
		type: Number,
		required: true,
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
	},
});

const item = mongoose.model("item", itemSchema);

export default item;
