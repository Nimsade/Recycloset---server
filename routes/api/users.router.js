import express from "express";
import {
	getAllUsersController,
	deleteUserController,
	loginController,
	registerController,
	updateUserController,
	patchStatusController,
	getUserByIdController,
	
} from "../../controllers/users.controller.js";
import bodyValidationMiddleware from "../../middlewares/bodyValidation.mw.js";
import {
	loginValidation,
	registerValidation,
	editUserValidation,
} from "../../validation/validationAdapter.js";
import authMiddleware from "../../middlewares/auth.mw.js";
import adminOrOwn from "../../middlewares/adminOrOwn.mw.js";
import objectIdParamsValidationMiddleware from "../../middlewares/objectIdParamsValidation.mw.js";
import isAdminMiddleware from "../../middlewares/isAdmin.mw.js";
const router = express.Router();

router.get("/", getAllUsersController);

router.get(
	"/:id",
	authMiddleware,
	objectIdParamsValidationMiddleware,
	adminOrOwn,
	getUserByIdController
);

router.post(
	"/register",
	bodyValidationMiddleware(registerValidation),
	registerController
);

router.post("/login", loginValidation, loginController);

router.put(
	"/:id",
	authMiddleware,
	objectIdParamsValidationMiddleware,
	adminOrOwn,
	bodyValidationMiddleware(editUserValidation),
	updateUserController
);

 
router.patch(
	"/:id",
	authMiddleware,
	objectIdParamsValidationMiddleware,
	adminOrOwn,
	patchStatusController
);


router.delete(
	"/:id",
	authMiddleware,
	objectIdParamsValidationMiddleware,
	adminOrOwn,
	deleteUserController
);

export default router;
