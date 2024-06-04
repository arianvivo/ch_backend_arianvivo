console.log("JS Loaded")

const socket = io();
const productList = document.getElementById("productList")
const addForm = document.getElementById("addForm");
const deleteForm = document.getElementById("deleteForm")


productList.innerHTML = "<h3>Producteishons</h3>";

// Recibir productos, del emit de la vista

socket.on("products", (data) => {

    productList.innerHTML = "<h3>EeProducteishons</h3>";

    // productList.innerHTML = "";

    data.forEach( p => {
        const card = document.createElement("div");
        card.classList.add("card")
        card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${p.title}</p>
            <p class="card-text">${p.description}</p>
            <p class="card-text">${p.price}</p>
            <p class="card-text">${p.id}</p>
        </div>
        `;

        productList.appendChild(card)
        
    });

    console.log(data)

})


// Agregar


addForm.addEventListener("submit", async (e) => { // ASync porque va con fetch

    e.preventDefault();
    const title = document.getElementById("productName").value
    const price = Number(document.getElementById("productPrice").value)
    const description = document.getElementById("productDescription").value

    console.log(`Got: ${title}, ${price}, ${description}`)


    // POST
    await fetch("/realtimeproducts",  {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({title, price, description})

    })

    addForm.reset()
})

deleteForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("id").value

    await fetch("/realtimeproducts", {
        method: "DELETE",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({id})
    })

    deleteForm.reset();
})