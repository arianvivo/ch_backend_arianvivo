import { request, response } from "express";
import productManager from "../productManager.js";

export const checkProductData = async (req = request,res = response ,next) => {   // Para que tome las propiedades de la peticion
    
    try {
        const { title, description, price, code, stock, category } = req.body     // Desestructuramos todas las variables del body
        const newProduct = {
            title,
            description,
            price,
            code,
            stock,
            category
        }

        const products = await productManager.getProducts();

        // Validar que no se repita código
        const productExists = products.find((prod) => prod.code === code)
        if (productExists) return res.status(400).json({ status: "error", msg: "Ya existe un producto con ese código"});

        const checkData = Object.values(newProduct).includes(undefined)     // Object.values retorna un ARRAY con todos los valores de un objeto JSON, includes se fija si existe un valor en un ARRAY.

        if (checkData) return res.status(400).json({ status: "error", msg: "Faltan datos del nuevo producto"});

        // Continuamos la ejecución del endpoint
        next();

    } catch (error) {
        console.log(error)
        res.status(500).json({status:"error", msg: "error al chequear el producto"})
    }
}