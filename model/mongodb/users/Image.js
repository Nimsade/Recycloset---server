import mongoose from "mongoose";
import Joi from "joi";
import { DEFAULT_STRING_VALIDATION } from "../helper/defaultStringValidation.helper.js";
import URL from "../helper/urlStringValidation.js";

const Image = new mongoose.Schema({
	url: Joi.string()
		.uri({ scheme: ["http", "https"] })
		.allow(""),
	alt: Joi.string().min(2).max(256).allow(""),
});

export default Image;
