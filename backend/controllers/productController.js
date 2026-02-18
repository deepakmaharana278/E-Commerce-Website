import productModel from "../models/productModel.js";
import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import cloudinary from "../config/cloudinary.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Photo is required" });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "ecommerce_products",
          resource_type: "image",
          format: "jpg"
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const product = await productModel.create({
      name,
      slug: slugify(name),
      description,
      price,
      category,
      quantity,
      shipping,
      photo: uploadResult.secure_url
    });

    res.status(201).json({
      success: true,
      product
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};



// get all product
export const getProductController = async (req, res) => {
  try {
    const products = await productModel.find({}).populate("category").limit(12).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting Products",
    });
  }
};

// single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel.findOne({ slug: req.params.slug }).populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single Product",
      error,
    });
  }
};


// delete product
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

// update product
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.body;
    const file = req.file;

    const product = await productModel.findById(req.params.pid);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    let imageUrl = product.photo;

    if (file) {
      const uploadResult = await cloudinary.uploader.upload_stream(
        {
          folder: "ecommerce_products",
          resource_type: "image",
          format: "jpg"
        },
        async (error, result) => {
          if (error) {
            return res.status(500).send({ error: "Upload failed" });
          }

          imageUrl = result.secure_url;

          const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.pid,
            {
              name,
              slug: slugify(name),
              description,
              price,
              category,
              quantity,
              shipping,
              photo: imageUrl
            },
            { new: true }
          );

          res.status(200).send({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
          });
        }
      );

      uploadResult.end(file.buffer);

    } else {
      const updatedProduct = await productModel.findByIdAndUpdate(
        req.params.pid,
        {
          name,
          slug: slugify(name),
          description,
          price,
          category,
          quantity,
          shipping,
          photo: imageUrl
        },
        { new: true }
      );

      res.status(200).send({
        success: true,
        product: updatedProduct
      });
    }

  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};


// filter
export const productFilterController = async (req, res) => {
  try {
    const { checked = [], radio = [] } = req.body;
    let args = {};

    if (checked.length > 0) {
      args.category = { $in: checked };
    }

    if (radio.length > 0) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }

    const products = await productModel.find(args).populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while filtering products",
      error,
    });
  }
};

// product count(pagination)
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in per page count",
      error,
    });
  }
};

// Search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [{ name: { $regex: keyword, $options: "i" } }, { description: { $regex: keyword, $options: "i" } }],
      });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in search product api",
      error,
    });
  }
};

export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while geting related product",
      error,
    });
  }
};

// get product by category
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while geting product",
      error,
    });
  }
};


// Stripe payment controller
export const createPaymentIntentController = async (req, res) => {
  try {
    const { cart } = req.body;

    let total = 0;
    cart.forEach(item => {
      total += item.price * 100; 
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "inr",
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};


// Payment success
export const stripePaymentSuccessController = async (req, res) => {
  try {
    const { cart, paymentIntent } = req.body;

    // save order
    const order = await new orderModel({
      products: cart.map(item => item._id),
      payment: paymentIntent,
      buyer: req.user._id,
      status: "Processing"
    }).save();

    res.status(200).send({ success: true, order });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};