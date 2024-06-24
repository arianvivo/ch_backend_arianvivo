import { Router, json } from "express";
// import productManager from "../productManager.js";
import productDao from "../dao/mongoDB/product.dao.js";

const router = Router();

router.get("/", async (req,res) => {
    try {
        console.log("recbo product requersts")
        
        // const products = await productManager.getProducts();
        const products = await productDao.getAll();
        const p = JSON.parse(JSON.stringify(products))
        console.log(p)
        // Envía el objeto products al layout
        res.render("home", p);
    } catch (error) {
        console.log(error)
        res.status(500).json({status: "error", msg: "Views products: Internal server"})
    }
})

export default router;