import  express  from "express"
import { DbConnect } from "./database"


const app = express()
const port = 3000
const host = "127.0.0.1"



DbConnect().then((res) => {
   app.listen(port, () => {
    console.log(`you are running on : http://${host}:${port}`)
})
}).catch((err) => {
    console.log("Error In Database Connection ")
})


app.get("/", (req, res) => {
    res.send("Hello This Is Typescript Backend")
})


