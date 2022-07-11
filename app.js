
require("dotenv").config()
const port = process.env.PORT || 3000

const express = require("express")
const app = express()

const connectDB = require("./db/connect")

const notFound = require("./middleware/not-found")
const errorHandler = require("./middleware/error-handler")

app.use(express.json())

app.get("/", (req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

app.use(notFound)
app.use(errorHandler)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listetning on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}
start()