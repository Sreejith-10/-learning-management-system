import express from "express";
import {
	adminLogin,
	createAdmin,
	googleLogin,
	googleSignUp,
	resetPassword,
	sendPasswordResetToEmail,
	userLogin,
	userLogut,
	userRegister,
	validateToken,
	verifyUser,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/logout", userLogut);
router.get("/verify-user/:token", verifyUser);
router.post("/login", userLogin);
router.post("/signup", userRegister);
router.post("/googlelogin", googleLogin);
router.post("/googlesignup", googleSignUp);
router.post("/verifyToken", validateToken);
router.post("/create-admin", createAdmin);
router.post("/admin-login", adminLogin);
router.post("/send-reset-email", sendPasswordResetToEmail);
router.post("/reset-password/:id/:token", resetPassword);

export {router as AuthRouter};
