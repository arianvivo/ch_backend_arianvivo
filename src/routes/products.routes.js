import { Router } from "express";
// import productManager from "../productManager.js"               // Trae las funcions que definimos en ese archivo
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import productDao from "../dao/mongoDB/product.dao.js"

const router = Router()


// Envolver el request en un async con try/catch
router.get("/", async (req,res) => {
    try {
        const { limit } = req.query;                            // expandir variables

        // const products = await productManager.getProducts(limit);     
        const products = await productDao.getAll()
        res.status(200).json({status: "Success", products})

    } catch (error) {
        console.log(error)
        res.status(500).json({status: "error", msg : "Error al realizar la peticion"})
    }
})

router.get("/:pid", async (req,res) => {

    try {
        
        const {pid} = req.params

        // const product = await productManager.getProductByID(Number(pid))
        const product = await productDao.getById(pid)

        if (!product) return res.status(404).json({ status :"error", msg : "Producto no encontrado"});

        res.status(200).json({ status:"success", product})

        
    } catch (error) {
        console.log(error)
        res.status(500).json({status:"error", msg:"Error al realizar la peticion"})
    }
})

router.post("/", checkProductData, async (req,res) => {     // incluimos el MIDDLEWARE antes de ejecutar este endpoint
 try {
    const body = req.body
    const product = await productManager.addProduct(body)
    
    res.status(201).json({status:"Success", product})

 } catch (error) {
    console.log(error)
    res.status(500).json({status: "error", msg: "Error al realizar la peticion"})
 }
})

router.put("/:pid", async (req,res) => {
    console.log(`got update request`)
    try {
        const { pid } =req.params
        console.log(`got update request of ${pid}`)
        const body = req.body
        const product = await productManager.updateProduct(Number(pid), body)
        if (!product) return res.status(404).json({status: "error", msg: "Update: Producto no encontrado"});

        res.status(201).json({status:"Success", product})

    } catch (error) {
        console.log(error)
        res.status(500).json({status:"error", msg:"Error al realizar la peticion"})
    }
})

router.delete("/:pid", async (req,res) => {
    console.log("Got delete request")
    try {

        const { pid } = req.params
        console.log(`Got delete request of pid: ${pid}`) 
        const deleted = await productManager.deleteProduct(Number(pid))
        
        if (!deleted) return res.status(400).json({status: "error", msg: "Delete: producto no encontrado"})
        
        res.status(201).json({status: "success", msg: "Producto borrado con éxito"})

            
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 500, msg: "Error al eliminar el producto"})
    }
})

export default router;