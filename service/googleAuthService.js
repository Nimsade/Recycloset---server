
import { OAuth2Client } from "google-auth-library";
import CONFIG from "./config.js";

const { client_id, client_secret, redirect_uris } = CONFIG.oauth2Credentials;
const oauth2Client = new OAuth2Client(
	client_id,
	client_secret,
	redirect_uris[0]
);

export default oauth2Client;
