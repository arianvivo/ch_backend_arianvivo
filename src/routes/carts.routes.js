import { Router } from "express";
import cartManager from "../cartManager.js";
import { checkAddProductToCart } from "../middlewares/checkAddProductToCart.middleware.js";

const router = Router()


// La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
// Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
// products: Array que contendrá objetos que representen cada producto

router.post("/", async (req,res) => {
    try {
        
        const cart = await cartManager.newCart();

        res.status(201).json({status:"success", cart});


    } catch (error) {
        console.log(error)
        res.status(500).json({status: "error", msg : "error al crear carrito"})
    }
})

// La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.

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

// La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
// product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
// quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
// Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto. 

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