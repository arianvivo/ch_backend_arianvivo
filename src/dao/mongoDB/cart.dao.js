import { cartModel } from "./models/cart.model.js";
import { productModel } from "./models/product.model.js";

const getAll = async () => {
    const carts = await cartModel.find()
    return carts;
}

const getById = async (id) => {
    const cart = await cartModel.findById(id).populate("products.product"); // Popular es traer todos los valores de productos, ya que en cart solo guardamos el ID.
    return cart;
}

const create = async () => {
    const cart = await cartModel.create({})
    return cart;
}

const update = async (id, data) => {
    const cartUpdate = await cartModel.findByIdAndUpdate(id, data, {new: true});
    return cartUpdate;
}

const deleteOne = async (id) => {
    const cart = await cartModel.findByIdAndDelete({_id: id});
    return cart;
}

const addProductToCart = async (cid, pid) => {
    const cart = await cartModel.findById(cid);

    const productInCart = cart.products.find((e) => e.product === pid );
    
    productInCart ? productInCart.quantity++ : cart.products.push({product: pid, quantity: 1});

    await cart.save();
    return cart;
}

const deleteProductOfCart = async (pid, cid) => {
    const cart = await cartModel.findById(id);
    cart.products = cart.products.filter((e) => e.product != pid);

    await cart.save();

    return cart;
}

const updateQuantityProductInCart = async (pid,cid, quantity) => {
   
    const cart = await cartModel.findById(cid);
   
    const product = cart.products.find( e => e.product == pid)
    product.quantity = quantity;

    await cart.save();
    return cart;
}

const clearProductsOfCart = async (cid) => {
    const cart = await cartModel.findById(cid);
    cart.products = [];

    await cart.save()
}

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne,
    addProductToCart,
    deleteProductOfCart,
    updateQuantityProductInCart,
    clearProductsOfCart
}