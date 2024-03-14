#!/usr/bin/env node

/**
 * Module dependencies.
 */

// var app = require('../app');
// var http = require('http');
import debug from "debug";
let log = debug("app:server");
import env from "dotenv";
env.config();
import app from "../app.js";
import connectToDb from "../model/dbAdapter.js";
import http from "http";
import chalk from "chalk";
import { initialUsers } from "../initialData/initalUsersService.js";
import { initialItems } from "../initialData/initialItemsService.js";

let port = normalizePort(process.env.PORT || "3030");
app.set("port", port);

let server = http.createServer(app);

server.listen(port);
server.on("error", onError);

server.on("listening", async () => await onListening());

function normalizePort(val) {
	let port = parseInt(val, 10);

	if (isNaN(port)) {
		return val;
	}

	if (port >= 0) {
		return port;
	}

	return false;
}

function onError(error) {
	if (error.syscall !== "listen") {
		throw error;
	}

	let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already in use");
			process.exit(1);
			break;
		default:
			throw error;
	}
}

async function onListening() {
	let addr = server.address();
	let bind = typeof addr === "string" ? addr : addr.port;
	console.log(chalk.green(`Listening on http://localhost:${bind}/`));
	await connectToDb().then(async () => {
		let itemId = await initialUsers();
		console.log(itemId);
		if (itemId) await initialItems(itemId);
	});
}
