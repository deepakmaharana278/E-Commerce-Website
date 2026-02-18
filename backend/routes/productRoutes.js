import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import {
  createPaymentIntentController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  relatedProductController,
  searchProductController,
  stripePaymentSuccessController,
  updateProductController,
} from "../controllers/productController.js";


const router = express.Router();

// routes
router.post("/create-product", requireSignIn, isAdmin, upload.single("photo"), createProductController);

// update product
router.put("/update-product/:pid", requireSignIn, isAdmin, upload.single("photo"), updateProductController);

// get products
router.get("/get-product", getProductController);

// single products
router.get("/get-product/:slug", getSingleProductController);


// delete product
router.delete("/delete-product/:pid", deleteProductController);

// filter product
router.post("/product-filters", productFilterController);

// product count
router.get("/product-count", productCountController);

// product per page
router.get("/product-list/:page", productListController);

// Search product
router.get("/search/:keyword", searchProductController)

// similar product
router.get("/related-product/:pid/:cid", relatedProductController)

// category wise product
router.get("/product-category/:slug", productCategoryController)

// stripe payment
router.post("/stripe/create-payment-intent", requireSignIn, createPaymentIntentController);

// payment success
router.post(
  "/stripe/payment-success",
  requireSignIn, 
  stripePaymentSuccessController
);

export default router;
