import express from "express";
import {
	createItemController,
	deleteItemController,
	getAllItemsController,
	getItemByIdController,
	getMyItemsController,
	patchLikeController,
	patchPremiumNumberController,
	updateItemController,
} from "../../controllers/items.controller.js";
import objectIdParamsValidationMiddleware from "../../middlewares/objectIdParamsValidation.mw.js";
import authMiddleware from "../../middlewares/auth.mw.js";
import isRegisteredMiddleware from "../../middlewares/isRegistered.mw.js";
import bodyValidationMiddleware from "../../middlewares/bodyValidation.mw.js";
import { createItemValidation } from "../../validation/validationAdapter.js";
import adminOrRegistered from "../../middlewares/adminOrRegistered.mw.js";
import isAdminMiddleware from "../../middlewares/isAdmin.mw.js";
import adminOrRegisteredMiddleware from "../../middlewares/adminOrRegistered.mw.js";

const router = express.Router();

router.get("/", getAllItemsController);

router.get("/my-items", authMiddleware, getMyItemsController);

router.get("/:id", objectIdParamsValidationMiddleware, getItemByIdController);

router.post(
	"/",
	authMiddleware,
	adminOrRegisteredMiddleware,
	bodyValidationMiddleware(createItemValidation),
	createItemController
);

router.put(
	"/:id",
	authMiddleware,
	objectIdParamsValidationMiddleware,
	adminOrRegistered,
	bodyValidationMiddleware(createItemValidation),
	updateItemController
);

router.patch(
	"/:id",
	authMiddleware,
	objectIdParamsValidationMiddleware,
	patchLikeController
);



router.delete(
	"/:id",
	authMiddleware,
	objectIdParamsValidationMiddleware,
	adminOrRegistered,
	deleteItemController
);

export default router;
