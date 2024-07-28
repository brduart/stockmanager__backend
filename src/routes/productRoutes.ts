import { Router } from "express";
import { protectedRoute } from "../middlewares/auth";
import { createProduct, deleteProductById, getAllProducts, getProductById, updateProduct } from "../controllers/productController";
import { upload } from "../config/multer";

const router = Router();

router.get("/product/:id", protectedRoute, getProductById);
router.get("/products", protectedRoute, getAllProducts);
router.post("/product", protectedRoute, upload.single("image"), createProduct);
router.put("/product/:id", protectedRoute, upload.single("image"), updateProduct);
router.delete("/product/:id", protectedRoute, deleteProductById);

export default router;
