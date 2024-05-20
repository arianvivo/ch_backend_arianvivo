import { Router } from "express";
import cartManager from "../cartManager.js";
import { checkAddProductToCart } from "../middlewares/checkAddProductToCart.middleware.js";

const router = Router()

router.post("/", async (req,res) => {
    try {
        
        const cart = await cartManager.newCart();

        res.status(201).json({status:"success", cart});


    } catch (error) {
        console.log(error)
        res.status(500).json({status: "error", msg : "error al crear carrito"})
    }
})

router.get("/:cid", async (req,res) => {
    try {
        const {cid} = req.params;
        const cart = await cartManager.getCart(Number(cid))

        if (!cart) return res.status(404).json({status:"error", msg: "Carrito no encontrado"});

        res.status(200).json({status:"success", cart})

    } catch (error) {
        console.log(error)
        res.status(500).json({status: "error", msg : "error al obtener carrito"})
    }

})

router.post("/:cid/product/:pid", checkAddProductToCart, async (req,res) => {

    try {
        const { cid, pid } = req.params;
        
        const cart = await cartManager.addProductToCart(Number(cid), Number(pid));

        res.status(201).json({status:"success", cart})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({status: "error", msg : "error al agregar productos al carrito"})
    }
})

export default router;