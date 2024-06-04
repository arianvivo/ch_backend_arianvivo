import { Router } from "express";
import productManager from "../productManager.js";

const router = Router();

router.get("/", async (req,res) => {
    try {
        const products = await productManager.getProducts();
        // Envía el objeto products al layout
        res.render("home", {products});
    } catch (error) {
        console.log(error)
        res.status(500).json({status: "error", msg: "Views products: Internal server"})
    }
})

export default router;