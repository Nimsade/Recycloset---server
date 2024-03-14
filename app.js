import express from "express";
import path from "node:path";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import logger from "./loggers/loggerAdapter.js";
import * as url from "url";
import cors from "cors";
import errorMiddleware from "./middlewares/error.mw.js";
import apiRouter from "./routes/api.router.js";
import createLogger from "./middlewares/createLogger.mw.js";
import  oauth2Client  from "./service/googleAuthService.js";

import CONFIG from "./service/config.js";


const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

let app = express();

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
  );
  next();
});
app.use(cors());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
);
app.use(compression());
app.use(logger());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(createLogger);
app.use("/api", apiRouter);
app.use(errorMiddleware);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.get("/auth/google", (req, res) => {
	const authUrl = oauth2Client.generateAuthUrl({
		access_type: "offline",
		scope: CONFIG.oauth2Credentials.scopes,
	});
	res.redirect(authUrl);
});
app.get("/auth_callback", async (req, res) => {
	const { code } = req.query;
	try {
		const { tokens } = await oauth2Client.getToken(code);
		oauth2Client.setCredentials(tokens);
		handleGoogleOAuthUser(tokens, res);
	} catch (error) {
		console.error("Error during Google OAuth callback:", error);
		res.status(500).send("Authentication failed");
	}
});
export default app;
