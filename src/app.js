import express, { urlencoded } from "express";
import routes from "./routes/index.js";
import handlebars from "express-handlebars"
import __dirname from "./dirname.js";
import { Server, Socket } from "socket.io";
import viewsRoutes from "./routes/views.routes.js"
import realTimeProducts from "./routes/realTimeProducts.routes.js"
import { connectMongoDB } from "./config/mongoDB.config.js";

const app = express();
connectMongoDB();
const PORT = 8080;

app.use(express.urlencoded({extended: true}))
app.use(express.json())


// Motor del view engine, sin esto no anda.
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.use(express.static("public"))

app.use("/api", routes);
app.use("/", viewsRoutes)
app.use("/realtimeproducts", realTimeProducts)

const httpServer =app.listen(PORT, () => {
    console.log(`Server port on ${PORT}`)
})

// Exportar para usar en otra parte de la aplicacion
export const socketServer = new Server(httpServer)

socketServer.on("connection", (socket) => {
    console.log("Nuevo usuario conectado")

})