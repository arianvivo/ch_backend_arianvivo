import { request, response } from "express"
import cartManager from "../cartManager.js"
import productManager from "../productManager.js";

export const checkAddProductToCart = async (req =request, res = response, next ) => {

    try {
        const { cid, pid } = req.params;
        const cart = await cartManager.getCart(Number(cid));
        if (!cart) return res.status(404).json({ status:"error", msg:"[Add] No se encontró un cart con ese ID"});
        
        const product = await productManager.getProductByID(Number(pid));
        
        if (!product) return res.status(404).json({status:"error", msg: "[Add] No se encontró el producto"});

        next();


    } catch (error) {
        console.log(error)
        res.status(500).json({status:"error", msg:"Error al chequear producto para agregar"})
    }

}