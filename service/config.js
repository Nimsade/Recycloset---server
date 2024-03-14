const port = 3030;
const baseURL = `http://localhost:${port}`;

const CONFIG = {
	JWTsecret: "mysecret",
	baseURL: baseURL,
	port: port,
	oauth2Credentials: {
		client_id:
			"584560749305-59dko4g0nm3r3o1qp9vucf6l2c02gsno.apps.googleusercontent.com",
		client_secret: "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",
		redirect_uris: [`${baseURL}/auth_callback`],
		scopes: ["profile", "email"],
	},
};

export default CONFIG;
