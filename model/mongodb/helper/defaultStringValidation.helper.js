const DEFAULT_STRING_VALIDATION = {
	type: String,
	minLength: 2,
	maxLength: 256,
	trim: true,
	allow: "",
};
const DEFAULT_REQUIRED_STRING_VALIDATION = {
	...DEFAULT_STRING_VALIDATION,
	required: true,
};

export { DEFAULT_STRING_VALIDATION, DEFAULT_REQUIRED_STRING_VALIDATION };
