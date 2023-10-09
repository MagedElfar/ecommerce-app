import { Router } from "express"
import authRoutes from "./auth.routes"
import userRoutes from "./user.routes"
import roleRoutes from "./role.routes"
import permissionRoutes from "./permission.routes";
import productRoutes from "./product.routes"
import unHandelRouter from "./unHandel.routes";
import rolePermissionController from "./rolePermission.routes"
import authMiddleware from "../middlewares/auth.middleware";
import categoryRouter from "./category.routes";
import productCategoryRouter from "./productCategory.routes";

const router = Router();

router.use("/auth", authRoutes)
router.use("/users", authMiddleware.authenticate, userRoutes)
router.use("/roles", authMiddleware.authenticate, roleRoutes)
router.use("/permissions", authMiddleware.authenticate, permissionRoutes)
router.use("/role_permission", authMiddleware.authenticate, rolePermissionController)
router.use("/categories", authMiddleware.authenticate, categoryRouter)
router.use("/products", authMiddleware.authenticate, productRoutes)
router.use("/product-categories", authMiddleware.authenticate, productCategoryRouter)
router.use("/*", unHandelRouter)

export default router;