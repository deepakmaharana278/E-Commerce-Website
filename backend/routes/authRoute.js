import express from "express";
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
    updateProfileController,
    getOrdersController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//Register || METHOD POST
router.post("/register", registerController);

// Login || POST
router.post("/login", loginController);

// forgot password || POST
router.post("/forgot-password", forgotPasswordController);

// test routes
router.get("/test", requireSignIn, isAdmin, testController);

// protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
router.put("/profile", requireSignIn, updateProfileController);

// orders
router.get("/orders",requireSignIn,getOrdersController)

export default router;
