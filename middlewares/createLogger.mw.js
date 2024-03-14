import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import handleError from "../service/handleError.js";

const loggerMiddleware = (req, res, next) => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const originalSend = res.send;
	res.send = function (body) {
		if (res.statusCode >= 400) {
			const now = new Date();
			const logFileName = `${now.toISOString().split("T")[0]}.log`;
			const logFilePath = path.join(__dirname, "..", "logs", logFileName);
			if (!fs.existsSync(logFilePath)) {
			}
			const logMessage = `${now.toISOString()} - Status Code: ${
				res.statusCode
			}, Error Message: ${body}\n`;
			const logsDir = path.dirname(logFilePath);
			if (!fs.existsSync(logsDir)) {
				fs.mkdirSync(logsDir, { recursive: true });
			}

			fs.appendFile(logFilePath, logMessage, (err) => {
				if (err) {
					handleError(res, 500, err.message);
				}
			});
		}
		originalSend.call(res, ...arguments);
	};
	next();
};

export default loggerMiddleware;
