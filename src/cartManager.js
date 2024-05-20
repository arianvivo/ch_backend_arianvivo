let carts = []

import fs from "fs"
import productManager from "./productManager.js";
import path from "path";

const pathFile = "./src/data/carrito.json";

const getCarts = async () => {
    const cartsJSON = await fs.promises.readFile(pathFile, "utf8");
    const cartsParse = JSON.parse(cartsJSON);

    carts = cartsParse || [];

    return carts;
}


const newCart = async () => {
    
    const carts = await getCarts();
    console.log("TIPO:")
    console.log(typeof(carts));
    console.log(carts)
    const nextID = carts.length + 1;

    const cart = {
        id : nextID,
        products : []
    };

    carts.push(cart);
    await fs.promises.writeFile(pathFile, JSON.stringify(carts));

    return cart;
}

const getCart = async (cid) => {
    const carts = await getCarts();

    const cart = carts.find( (c) => c.id === cid);

    return cart;

}

const addProductToCart = async (cid, pid) => {
    
    const carts = await getCarts();

    const product = {
        product : pid,
        quantity : 1
    };

    const index = carts.findIndex((c) => c.id === cid)
    carts[index].products.push(product);

    fs.promises.writeFile(pathFile, JSON.stringify(carts))

    return carts[index]

}

export default {
    getCarts,
    newCart,
    getCart,
    addProductToCart
}