import express from "express";
import usersRouter from "./api/users.router.js";
import itemsRouter from "./api/items.router.js";
import handleError from "../service/handleError.js";
const router = express.Router();

router.use("/users", usersRouter);

router.use("/items", itemsRouter);

router.get("/", (req, res) => {
	res.send("api sub route");
});

router.use((req, res) => {
	handleError(res, 404, "Page Not Found");
});

export default router;
