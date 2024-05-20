let products  = []

import fs from "fs"

const pathFile = "./src/data/products.json";

const getProducts = async (limit) => {
    const productsJSON = await fs.promises.readFile(pathFile, "utf8");      // Lee el archivo
    const productsParse = JSON.parse(productsJSON);                         // Parsea a un objeto
    // console.log(productsParse);

    products = productsParse || [] ;

    if (!limit) return products                                             // Devuelve todo si no llega un limite en el query

    return products.slice(0, limit);

}

const addProduct = async (product) => {
    await getProducts();                                                    // Obtener productos desde el archivo
    const {title, description, price, thumbnail, code, stock, category } = product;
    const newProduct = {
        id: products.length +1,
        title,
        description,
        price,
        thumbnail: thumbnail || [],
        code,
        stock,
        category,
        status : true
    };

    products.push(newProduct)

    await fs.promises.writeFile(pathFile, JSON.stringify(products));        // Guarda el producto nuevo en el archivo

    return product;
}

const getProductByID = async (pid) => {

    console.log(`Getting product by id ${pid}...`)
    products = await getProducts();

    const product = products.find( (p) => p.id === pid )

    return product;
}

const updateProduct = async (pid, newData ) => {
    
    products = await getProducts();

    const index = products.findIndex((prod) =>  prod.id === pid);

    console.log(`found index ${index}`)

    products[index] = {
        ...products[index],
        ...newData              // El spread acá actualiza los parametros que ya estan en el json y los inserta si no estan definidos
    }
    console.log(`Finished updating`)

    await fs.promises.writeFile(pathFile, JSON.stringify(products))
    console.log(`Wrote to file`)

    const product = await getProductByID(pid)
    return product


}

const deleteProduct = async (pid) => {
    
    await getProducts();
    
    // const index = products.findIndex((prod) => prod.id === pid)
    // products.splice(index, 1);

    const product = await getProductByID(pid)
    if (!product) return false

    products = products.filter((prod) => prod.id !== pid );
    await fs.promises.writeFile(pathFile, JSON.stringify(products))

    return true
}

// Export de todas las funciones para poder importarlas en nuestro otro archivo

export default {
    getProducts,
    addProduct,
    getProductByID,
    updateProduct,
    deleteProduct
}