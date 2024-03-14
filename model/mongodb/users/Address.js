import mongoose from "mongoose";

const Address = new mongoose.Schema({
	state: {
		type: String,
		minLength: 2,
		maxLength: 256,
		trim: true,
		allow: "",
	},
	country: {
		type: String,
		minLength: 2,
		maxLength: 256,
		trim: true,
		required: true,
	},
	city: {
		type: String,
		minLength: 2,
		maxLength: 256,
		trim: true,
		required: true,
	},
	street: {
		type: String,
		minLength: 2,
		maxLength: 256,
		trim: true,
		required: true,
	},
	houseNumber: {
		type: Number,
		min: 1,
		max: 9999999,
		required: true,
	},
	zip: {
		type: Number,
		min: 1,
		max: 9999999,
		required: true,
		default: 10000,
	},
});

export default Address;
