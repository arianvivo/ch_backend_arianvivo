import { Router } from "express";
import productManager from "../productManager.js";
import { socketServer } from "../app.js";

const router = Router();

router.get("/", async (req,res) => {

    try {
        const products =  await productManager.getProducts();

        console.log(products)
        res.render("realTimeProducts")

        socketServer.emit("products", products)



    } catch (error) {
        console.log(error)
        res.status(500).json({status: "error", msg: "RTP: Error interno."})
    }
})

router.post("/", async (req,res) => {
    try {

        const { title, price, description } = req.body;
        console.log(`Route: Got ${title}, ${price}, ${description}`)
        
        await productManager.addProduct({title,price,description})
        
        const products =  await productManager.getProducts();
        socketServer.emit("products", products)

        res.render("realTimeProducts");

    } catch (error) {
        console.log(error)
        res.status(500).json({status: "error", msg: "RTP: Error interno."})
    }
})

router.delete("/", async (req,res) => {
    try {
        
        const { id } = req.body;
        await productManager.deleteProduct(Number(id))

        const products =  await productManager.getProducts();
        socketServer.emit("products", products)

        res.render("realTimeProducts");

    } catch (error) {
        console.log(error)
        res.status(500).json({status: "error", msg: "RTP: Error interno."})
    }
})

export default router